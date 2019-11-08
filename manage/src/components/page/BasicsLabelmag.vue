<!-- 标签管理 -->
<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>&nbsp;标签管理
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="saveLabelClass">
        <el-button
          class="butSaveLabelClass"
          type="primary"
          icon="el-icon-plus"
          @click="saveLabel(1)"
        >新建标签</el-button>
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
        <el-table-column align="center" prop="number" label="编号" width="60%"></el-table-column>
        <el-table-column align="center" prop="name" label="标签名称" width="300%"></el-table-column>
        <el-table-column align="center" prop="labelGroupNumber" label="关联标签组" width="300%"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column label="操作" width="300%" align="center">
          <template scope="scope" style="width: 100%">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="editLabel(scope.$index, 2)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete-solid"
              @click="delLabel(scope.$index, scope.row)"
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
        <el-button type="primary" @click="sureDelLabel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加弹出框 -->
    <el-dialog
      class="addDialogLabel"
      title="新建/编辑标签"
      :visible.sync="dialogAddLabel"
      :close-on-click-modal="false"
      width="48%"
      height="60%"
    >
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <div class="el-input-div">
          <el-form-item label="标签名称" prop="name">
            <el-col class="label-dialog-col" :span="18">
              <el-input
                v-model="form.name"
                @keyup.enter.native="editAddLabel('form')"
                placeholder="标签名称为必填项,仅支持中文、字母、数字，长度2~10字符"
              ></el-input>
            </el-col>
          </el-form-item>
        </div>
        <!-- 存放标签 -->
        <div class="relationLabel">
          <el-form-item label="关联标签组">
            <el-select
              v-model="labelGroupDTOList"
              multiple
              placeholder="请选择"
              class="label-dialog-select"
            >
              <el-option
                v-for="item in options"
                :key="item.labelGroupId"
                :label="item.name"
                :value="item.labelGroupId"
              ></el-option>
            </el-select>
            <div class="el-selectLabel">最多可关联10个标签组</div>
          </el-form-item>
        </div>
      </el-form>
      <div class="dialogForm">
        <span slot="footer">
          <el-button @click="dialogAddLabel = false">取 消</el-button>
          <el-button type="primary" @click="editAddLabel('form')">确 定</el-button>
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
      dialogAddLabel: false, //添加
      //分页
      pagination: {
        totalRows: 0, //总条数
        pageSize: 5, //每页显示条数 this.$store.state.pageSize
        pageSizes: [5, 10, 50, 100], //设置多少条一页
        pageNumber: 1, //当前页数
        layout: "total, sizes, prev, pager, next, jumper"
      },
      //标签弹窗
      labelGroupDTOList: [], //选择标签组
      selectionFlag: null, //选择操作标识
      form: {
        name: null
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
    this.listLabel();
  },
  methods: {
    //标签列表
    listLabel() {
      var that = this;
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/architecture/label/listLabel",
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
          //   console.log(JSON.stringify(that.tableData));
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
    sureDelLabel() {
      var that = this;
      var index = that.recomandIndex;
      var labelId = that.tableData[index].labelId;
      this.$axios({
        method: "delete",
        url:
          that.$store.state.baseUrl +
          "/architecture/label/deleteLabel?labelId=" +
          labelId
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
    //下拉标签组
    listLabelGroup() {
      var that = this;
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl + "/architecture/LabelGroup/listLabelGroup",
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
    //新增标签
    addLabelSure(formValue) {
      var that = this;
      if (that.labelGroupDTOList.length > 10) {
        that.$message.error(
          "已经添加" + that.labelGroupDTOList.length + "个标签组!"
        );
        return;
      }
      that.$refs[formValue].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url: that.$store.state.baseUrl + "/architecture/label/addLabel",
            data: {
              createUserId: that.createUserId,
              labelGroupIds: that.labelGroupDTOList,
              name: that.form.name,
              tenantId: that.tenantId
            }
          }).then(result => {
            if (result.data.returnMsg === "请求成功") {
              that.$message.success("添加成功!");
              that.dialogAddLabel = false;
              that.listLabel();
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
      if (that.labelGroupDTOList.length > 10) {
        that.$message.error(
          "已经添加" + that.labelGroupDTOList.length + "个标签组!"
        );
        return;
      }
      var index = that.recomandIndex;
      var labelId = that.tableData[index].labelId;
      that.$refs[formValue].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url: that.$store.state.baseUrl + "/architecture/label/editLabel",
            data: {
              updateUserId: that.createUserId,
              labelGroupIds: that.labelGroupDTOList,
              labelId: labelId,
              name: that.form.name
            }
          }).then(result => {
            if (result.data.returnMsg === "请求成功") {
              that.$message.success("编辑成功");
              that.dialogAddLabel = false;
              that.listLabel();
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
    //判断编辑还是新增.(接口2个/页面同一个)
    editAddLabel(form) {
      var that = this;
      //新增操作
      if (that.selectionFlag == 1) {
        that.addLabelSure(form);
        //编辑操作
      } else if (that.selectionFlag == 2) {
        that.editLabelSure(form);
      } else {
        alert("异常,请联系开发人员");
      }
    },
    //编辑:传值与查询
    editLabel(index, editLabelFlag) {
      var that = this;
      that.labelGroupDTOList = [];
      that.recomandIndex = index;
      //标识
      that.selectionFlag = editLabelFlag;
      //名称
      that.form.name = that.tableData[index].name;
      //选择标签组
      if (!!that.tableData[index].labelGroupDTOList) {
        for (
          var i = 0;
          i < that.tableData[index].labelGroupDTOList.length;
          i++
        ) {
          that.labelGroupDTOList.push(
            that.tableData[index].labelGroupDTOList[i].labelGroupId
          );
        }
      }
      //标签组下拉
      that.listLabelGroup();
      that.dialogAddLabel = true;
    },
    //新增事件:清空
    saveLabel(addLabelFlag) {
      var that = this;
      that.selectionFlag = addLabelFlag;
      that.form.name = "";
      that.labelGroupDTOList = "";
      //标签组下拉
      that.listLabelGroup();
      that.dialogAddLabel = true;
    },
    //删除确定
    deleteRow() {
      this.$message.success("删除成功!");
      this.delVisible = false;
      this.listLabel();
    },
    //删除-索引传参
    delLabel(index, row) {
      this.recomandIndex = index;
      this.delVisible = true;
    },
    // 分页导航
    currentChange(val) {
      this.pagination.pageNumber = val;
      this.listLabel();
    },
    //设置分页大小
    sizeChange(val) {
      this.pagination.pageSize = val;
      this.listLabel();
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
.label-dialog-select {
  width: 92%;
}
.label-dialog-col {
  width: 92%;
}
.el-selectLabel {
  color: rgb(137, 144, 146);
  font-size: 12px;
}
.relationLabel {
  margin: 15px 0px 0px 0px;
}
.table .dialogForm {
  margin: 230px 0px 0px 480px;
}
</style>   