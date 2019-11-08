<!-- 标签组管理 -->
<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>&nbsp;标签组管理
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="saveLabelClass">
        <el-button
          class="butSaveLabelClass"
          type="primary"
          icon="el-icon-plus"
          @click="saveLabelGroup(1)"
        >新建标签组</el-button>
      </div>
    </div>
    <div class="container">
      <!--表格列-->
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        :header-cell-style="{'text-align':'center'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="number" label="编号" width="50%"></el-table-column>
        <el-table-column align="center" prop="name" label="标签组名称" width="250%"></el-table-column>
        <el-table-column align="center" prop="labelNumber" label="包含标签" width="90%"></el-table-column>
        <el-table-column align="center" prop="useOn" label="应用于" width="385%">
          <template slot-scope="scope">
            <label>{{ useOnValue(scope.row.useOn) }}</label>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column label="操作" width="250%" align="center">
          <template scope="scope" style="width: 100%">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="editLabelGroup(scope.$index, 2)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete-solid"
              @click="delLabelGroup(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          :page-size="pagination.pageSize"
          @current-change="currentChange"
          :current-page="pagination.pageNumber"
          :page-sizes="pagination.pageSizes"
          :total="pagination.totalRows"
          :layout="pagination.layout"
          @size-change="sizeChange"
        ></el-pagination>
      </div>
    </div>
    <!-- 删除提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="delVisible"
      :close-on-click-modal="false"
      width="300px"
      center
    >
      <div class="del-dialog-label">是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureDelLabelGroup">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加弹出框 -->
    <el-dialog
      title="新建/编辑标签组"
      :visible.sync="dialogAddLabelGroup"
      :close-on-click-modal="false"
      width="48%"
      height="60%"
    >
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <div class="el-input-div">
          <el-form-item label="标签组名称" prop="name">
            <el-col class="labelGroup-dialog-col" :span="18">
              <el-input
                v-model="form.name"
                @keyup.enter.native="editAddLabelGroup('form')"
                placeholder="标签名称为必填项,仅支持中文、字母、数字，长度2~10字符"
              ></el-input>
            </el-col>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="应用于">
            <el-checkbox-group v-model="form.checkList">
              <el-checkbox label="教材列表搜索"></el-checkbox>
              <el-checkbox label="资源列表搜索"></el-checkbox>
              <el-checkbox label="用户列表搜索"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <!-- 存放标签 -->
        <div class="relationLabel">
          <el-form-item label="包含标签">
            <el-select
              v-model="labelDTOList"
              multiple
              placeholder="请选择"
              class="labelGroup-dialog-select"
            >
              <el-option
                v-for="item in options"
                :key="item.labelId"
                :label="item.name"
                :value="item.labelId"
              ></el-option>
            </el-select>
            <div class="el-selectLabel">最多可包含30个标签</div>
          </el-form-item>
        </div>
      </el-form>
      <div class="dialog-footer-div">
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogAddLabelGroup = false">取 消</el-button>
          <el-button type="primary" @click="editAddLabelGroup('form')">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data: function() {
    //正则
    const regular = (rule, value, callback) => {
      //支持中文、字母、数字，长度2~10字符
      const regularTagName = /^([\u4e00-\u9fa5\a-zA-Z0-9]){2,10}$/gi;
      if (!regularTagName.test(value)) {
        callback(new Error("请输入正确的标签名称!"));
      } else {
        callback();
      }
    };
    return {
      //校验标签名称
      rules: {
        name: [
          { required: true, message: "标签名称不能为空", trigger: "blur" },
          { validator: regular, trigger: "blur" }
        ]
      },
      value: false, //关联标签组
      tableData: [],
      recomandIndex: 0, //公共索引
      tenantId: null, //租户ID
      createUserId: null, // 用户ID
      configrationId: 0, //配置ID
      configrationName: null, //配置名称
      updateTime: null, //更新时间
      updateUserId: null, //更新人ID
      //弹窗属性设置
      delVisible: false, //删除提示框
      dialogAddLabelGroup: false, //添加
      //分页
      pagination: {
        totalRows: 0, //总条数
        pageSize: 5, //每页显示条数
        pageSizes: [5, 10, 50, 100], //设置多少条一页
        pageNumber: 1, //当前页数
        layout: "total, sizes, prev, pager, next, jumper"
      },
      //标签组弹窗
      labelDTOList: [], //选择标签
      selectionFlag: null, //选择操作标识
      form: {
        name: null, //标签组名称
        checkList: [] //多选框组
      },
      options: [] //下拉关联标签组
    };
  },
  created() {
    //调用全局
    this.$store.commit("user");
    if (localStorage.getItem("userId")) {
      this.createUserId = localStorage.getItem("userId");
    } else {
      this.createUserId = this.$store.state.userId;
    }
    if (localStorage.getItem("tenantId")) {
      this.tenantId = localStorage.getItem("tenantId");
    } else {
      this.tenantId = this.$store.state.tenantId;
    }
  },
  mounted() {
    this.listLabelGroup();
  },
  methods: {
    //数据拼接 (也可以indexOf(1) >= 0)
    useOnValue(agr) {
      var rows = ["教材列表搜索", "资源列表搜索", "用户列表搜索"],
        result = [],
        a = agr.split(",");
      result = a.map(function(item) {
        return rows[item];
      });
      return result.join(" / ");
    },

    //标签组列表
    listLabelGroup() {
      var that = this;
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl + "/architecture/LabelGroup/listLabelGroup",
        data: {
          pageSize: this.pagination.pageSize,
          pageNum: this.pagination.pageNumber,
          tenantId: this.tenantId
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          var tableData = result.data.data.content;
          that.pagination.totalRows = Number(result.data.data.total);
          for (var i = 0; i < tableData.length; i++) {
            tableData[i].number = i + 1;
          }
          that.tableData = tableData;
        } else if (
          result.data.returnCode === 500 ||
          result.data.returnCode === 50001
        ) {
          alert("异常:" + result.data.returnCode);
        } else {
          alert(result.data.returnMsg);
        }
      });
    },
    //删除标签
    sureDelLabelGroup() {
      var that = this;
      var index = that.recomandIndex;
      var labelGroupId = that.tableData[index].labelGroupId;
      this.$axios({
        method: "delete",
        url:
          that.$store.state.baseUrl +
          "/architecture/LabelGroup/deleteLabelGroup?labelGroupId=" +
          labelGroupId
      })
        .then(result => {
          if (result.data.returnMsg === "请求成功") {
            this.deleteRow();
          } else if (
            result.data.returnCode === 500 ||
            result.data.returnCode === 50001
          ) {
            alert("异常:" + result.data.returnMsg);
          } else {
            alert(result.data.returnMsg);
          }
        })
        .catch(reject => {
          console.log("catch:" + reject);
        });
    },
    //下拉标签
    listLabel() {
      var that = this;
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/architecture/label/listLabel",
        data: {
          pageSize: 9999,
          pageNum: 1,
          tenantId: that.tenantId
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          var options = result.data.data.content;
          that.options = options;
        } else if (
          result.data.returnCode === 500 ||
          result.data.returnCode === 50001
        ) {
          alert("异常:" + result.data.returnCode);
        } else {
          alert(result.data.returnMsg);
        }
      });
    },
    //新增标签组
    addLabelGroupSure(formValue) {
      var that = this;
      var useOn = "";
      if (that.labelDTOList.length > 30) {
        that.$message.error(
          "已经添加" + that.labelDTOList.length + "个标签组!"
        );
        return;
      }
      //新增处理
      //注意:后台写的是字符串格式,所以多选项这里需要进行处理。
      for (var i = 0; i < that.form.checkList.length; i++) {
        if (that.form.checkList[i] === "教材列表搜索") {
          useOn += 0 + ",";
        } else if (that.form.checkList[i] === "资源列表搜索") {
          useOn += 1 + ",";
        } else if (that.form.checkList[i] === "用户列表搜索") {
          useOn += 2 + ",";
          //数组为空转成空字符串
        } else if (
          that.form.checkList[i].length < 0 ||
          that.form.checkList[i] == undefined
        ) {
          useOn = checkList[i].toString();
        }
      }
      //去掉最后一个逗号(如果不需要去掉,就不用写)
      if (useOn.length > 0) {
        useOn = useOn.substr(0, useOn.length - 1);
      }
      that.$refs[formValue].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url:
              that.$store.state.baseUrl +
              "/architecture/LabelGroup/addLabelGroup",
            data: {
              createUserId: that.createUserId,
              labelIds: that.labelDTOList,
              name: that.form.name,
              useOn: useOn,
              tenantId: that.tenantId
            }
          }).then(result => {
            if (result.data.returnMsg === "请求成功") {
              that.$message.success("添加成功!");
              that.dialogAddLabelGroup = false;
              that.listLabelGroup();
            } else if (
              result.data.returnCode === 500 ||
              result.data.returnCode === 50001
            ) {
              alert("异常:" + result.data.returnCode);
            } else {
              alert(result.data.returnMsg);
            }
          });
        } else {
          console.log("error validate submit!!");
          return false;
        }
      });
    },
    //编辑标签
    editLabelSure(formValue) {
      var that = this;
      var useOn = "";
      if (that.labelDTOList.length > 30) {
        that.$message.error(
          "已经添加" + that.labelDTOList.length + "个标签组!"
        );
        return;
      }
      //编辑处理
      for (var i = 0; i < that.form.checkList.length; i++) {
        if (that.form.checkList[i] === "教材列表搜索") {
          useOn += 0 + ",";
        } else if (that.form.checkList[i] === "资源列表搜索") {
          useOn += 1 + ",";
        } else if (that.form.checkList[i] === "用户列表搜索") {
          useOn += 2 + ",";
          //数组为空转成空字符串
        } else if (
          that.form.checkList[i].length < 0 ||
          that.form.checkList[i] == undefined
        ) {
          useOn = checkList[i].toString();
        }
      }
      if (useOn.length > 0) {
        useOn = useOn.substr(0, useOn.length - 1);
      }
      var index = that.recomandIndex;
      var labelGroupId = that.tableData[index].labelGroupId;
      that.$refs[formValue].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url:
              that.$store.state.baseUrl +
              "/architecture/LabelGroup/editLabelGroup",
            data: {
              updateUserId: that.createUserId,
              labelIds: that.labelDTOList,
              labelGroupId: labelGroupId,
              name: that.form.name,
              useOn: useOn
            }
          }).then(result => {
            if (result.data.returnMsg === "请求成功") {
              that.$message.success("编辑成功");
              that.dialogAddLabelGroup = false;
              that.listLabelGroup();
            } else if (
              result.data.returnCode === 500 ||
              result.data.returnCode === 50001
            ) {
              alert("异常:" + result.data.returnCode);
            } else {
              alert(result.data.returnMsg);
            }
          });
        } else {
          console.log("error validate submit!!");
          return false;
        }
      });
    },
    //编辑和新增.
    editAddLabelGroup(form) {
      var that = this;
      //新增操作
      if (that.selectionFlag == 1) {
        that.addLabelGroupSure(form);
        //编辑操作
      } else if (that.selectionFlag == 2) {
        that.editLabelSure(form);
      } else {
        alert("异常,请联系开发人员");
      }
    },
    //编辑
    editLabelGroup(index, editLabelFlag) {
      var that = this;
      that.recomandIndex = index;
      that.labelDTOList = [];
      //标识
      that.selectionFlag = editLabelFlag;
      //名称
      that.form.name = that.tableData[index].name;
      var valueCheckList = that.tableData[index].useOn;
      //拼接多选
      var rows = ["教材列表搜索", "资源列表搜索", "用户列表搜索"];
      var checkList = valueCheckList.split(",");
      var result = checkList.map(function(item) {
        return rows[item];
      });
      //赋值
      that.form.checkList = result;
      //选择标签
      for (var i = 0; i < that.tableData[index].labelDTOList.length; i++) {
        that.labelDTOList.push(that.tableData[index].labelDTOList[i].labelId);
      }
      //标签组下拉
      that.listLabel();
      that.dialogAddLabelGroup = true;
    },
    //新增
    saveLabelGroup(addLabelFlag) {
      var that = this;
      that.selectionFlag = addLabelFlag;
      //初始化
      that.form.name = "";
      that.labelDTOList = [];
      that.form.checkList = [];
      //标签下拉
      that.listLabel();
      that.dialogAddLabelGroup = true;
    },
    //删除确定
    deleteRow() {
      this.$message.success("删除成功!");
      this.delVisible = false;
      this.listLabelGroup();
    },
    //删除-索引传参
    delLabelGroup(index, row) {
      this.recomandIndex = index;
      this.delVisible = true;
    },
    // 分页导航
    currentChange(val) {
      this.pagination.pageNumber = val;
      this.listLabelGroup();
    },
    //设置分页大小
    sizeChange(val) {
      this.pagination.pageSize = val;
      this.listLabelGroup();
    },
    //val 为表单选中数据的集合
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.saveLabelClass {
  float: right;
  margin-top: -23px;
}
.butSaveLabelClass {
  padding: 9px 28px;
}
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-label {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.label-publish {
  height: 32px;
  width: 85px;
  margin-right: 10px;
}
.el-input-div {
  margin: 0px 0px 35px 0px;
}
.el-selectLabel {
  color: rgb(137, 144, 146);
  font-size: 12px;
}
.relationLabel {
  margin: 15px 0px 0px 0px;
}
.dialog-footer-div {
  margin: 230px 0px 0px 480px;
}
.labelGroup-dialog-col {
  width: 92%;
}
.labelGroup-dialog-select {
  width: 92%;
}
</style>