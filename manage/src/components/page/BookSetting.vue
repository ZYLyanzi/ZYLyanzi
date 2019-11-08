<!-- 相关推荐 -->
<template>
  <div class="table">
    <div class="crumbs">
      <span>共设置了{{this.count}}本相关推荐教材</span>
      <div class="saveConfig">
        <el-button
          class="butSaveConfig"
          type="primary"
          icon="el-icon-plus"
          @click="listConfigFile()"
        >添加配置</el-button>
      </div>
    </div>

    <div class="container">
      <!--表格列-->
      <el-table
        height="430"
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" prop="number" label="编号" width="50%"></el-table-column>
        <el-table-column prop="name" label="推荐教材名称"></el-table-column>
        <el-table-column label="操作" width="200%" align="center">
          <template scope="scope" style="width: 100%">
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete-solid"
              @click="delConfigFile(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 删除提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="delVisible"
      :close-on-click-modal="false"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加推荐 -->
    <el-dialog
      title="相关推荐"
      class="dialog_se"
      :visible.sync="rvVisible"
      :close-on-click-modal="false"
      width="80%"
    >
      <div class="form_dialog_setting">
        <el-form :inline="true" :model="formInline">
          <div class="bo_inputSelect">
            <el-input placeholder="请输入内容" v-model="formInline.textbookName">
              <el-button
                class="but-setting-search"
                slot="append"
                icon="el-icon-search"
                @click="listConfigFile()"
              ></el-button>
            </el-input>
          </div>
        </el-form>
      </div>
      <!-- 表单 -->
      <div class="tableRvVisible">
        <el-table
          @row-click="rowClick_se"
          ref="multipleTable_se"
          :data="tableChartletDate"
          border
          :header-cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column align="center" prop="name" label="教材名称" width="210"></el-table-column>
          <el-table-column align="center" prop="categoryName" label="教材分类" width="310"></el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :page-size="this.pageSize"
            :total="this.total"
          ></el-pagination>
        </div>
      </div>

      <div class="tableRvVisible">
        <el-table
          height="280"
          :data="tableRvVisibleDate"
          border
          ref="multipleTable"
          :header-cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="title" :label="titleTips" width="490">
            <el-table-column align="center" prop="name" label="教材名称" width="205"></el-table-column>
            <el-table-column align="center" prop="categoryName" label="教材分类" width="255"></el-table-column>
            <el-table-column label="操作" width="72" align="center">
              <template scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="seRecomandDel(scope.$index,tableRvVisibleDate)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer-table">
        <el-button @click="rvVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTextbookReference()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      titleTips: "",
      tableData: [], //表单
      createUserId: null, // 用户ID
      referenceIds: [], //选项存储textBookId
      tableChartletDate: [], //表单
      tableRvVisibleDate: [],
      tableRvDate: [], //分页进行赋值
      delVisible: false, //操作
      rvVisible: false, //相关推荐
      count: 0, //计数
      tenantId: null, //租户ID
      //分页属性
      pageSize: 6, //页面大小
      pageNum: 1, //当前页数
      total_pages: 0, //总页数
      total: 0, //总条数
      idx: -1,
      id: -1,
      //表单
      formInline: {
        publishStatus: 1
      }
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
  watch: {
    tableRvVisibleDate(newVal, oldVal) {
      this.titleTips =
        "请选择需要相关推荐的教材/已选择" +
        this.tableRvVisibleDate.length +
        " 本相关推荐教材";
    }
  },

  mounted() {
    this.titleTips =
      "请选择需要相关推荐的教材/已选择" +
      this.tableRvVisibleDate.length +
      " 本相关推荐教材";
    this.listTextbookReference();
  },
  methods: {
    //选项
    rowClick_se: function(row, event) {
      var that = this;
      let tableRvVisibleDate = []; //列表
      let contentArr = []; //合并
      let value = [];
      value.push(row); //objec 转数组
      //校验
      tableRvVisibleDate[0] = {};
      //获取ID
      that.referenceIds.push(value[value.length - 1].textbookId);
      if (value[value.length - 1].categoryList != null) {
        //获取分类
        for (let k = 0; k < value[value.length - 1].categoryList.length; k++) {
          contentArr.push(
            value[value.length - 1].categoryList[k].categoryName + ">"
          );
          tableRvVisibleDate[0].categoryName = contentArr;
        }
      }
      tableRvVisibleDate[0].name = value[value.length - 1].name;
      that.tableRvVisibleDate = that.tableRvVisibleDate.concat(
        tableRvVisibleDate
      );
    },
    // 分页导航
    handleCurrentChange(val) {
      this.pageNum = val;
      this.listConfigFile();
    },
    //相关推荐列表
    listTextbookReference() {
      var that = this;
      this.$axios({
        method: "get",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/textbookReference/listTextbookReference",
        params: {
          textbookId: that.$route.query.textbookId
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          var tableData = result.data.data;
          for (var i = 0; i < tableData.length; i++) {
            tableData[i].number = i + 1;
            this.count = tableData[i].number;
          }
          that.tableData = tableData;
          // that.tableRvVisibleDate =tableData;
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
    //删除教材
    handleDelete() {
      var that = this;
      var index = that.recomandIndex;
      var textbookReferenceId = that.tableData[index].textbookReferenceId;
      this.$axios({
        method: "delete",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/textbookReference/deleteTextbookReference?textbookReferenceId=" +
          textbookReferenceId
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
    //添加配置文件-查询列表
    listConfigFile() {
      var that = this;
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/ar-textbook/textbook/listTextbook",
        data: {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          tenantId: this.tenantId,
          textbookName: this.formInline.textbookName,
          publishStatus: this.formInline.publishStatus
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          var tableChartletDate = result.data.data.content;
          that.total = Number(result.data.data.total);
          for (let k = 0; k < tableChartletDate.length; k++) {
            let contentArr = [];
            if (tableChartletDate[k].categoryList != null) {
              for (
                let i = 0;
                i < tableChartletDate[k].categoryList.length;
                i++
              ) {
                contentArr.push(
                  tableChartletDate[k].categoryList[i].categoryName + ">"
                );
                tableChartletDate[k].categoryName = contentArr;
              }             
            }
          }
          that.tableChartletDate = tableChartletDate;
        } else if (
          result.data.returnCode === 500 ||
          result.data.returnCode === 50001
        ) {
          alert("异常:" + result.data.returnCode);
        } else {
          alert(result.data.returnMsg);
        }
      });
      this.rvVisible = true;
    },
    //添加推荐
    addTextbookReference() {
      var that = this;
      var date = that.tableRvVisibleDate;
      if (!date.length) {
        this.$message.error("请选择数据!");
        return false;
      }
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/textbookReference/addTextbookReference",
        data: {
          referenceIds: that.referenceIds,
          tenantId: that.tenantId,
          textbookId: that.$route.query.textbookId,
          userId: that.createUserId
        }
      })
        .then(result => {
          if (result.data.returnMsg === "请求成功") {
            this.$message.success("添加成功!");
            this.listTextbookReference();
          } else if (result.data.returnCode === 50001) {
            alert("服务端异常, 请联系开发人员！");
          } else {
            alert("获取数据失败");
          }
        })
        .catch(reject => {
          console.log(reject);
        });
      this.rvVisible = false;
    },
    //选项移除
    seRecomandDel(index, rows) {
      var that = this;
      that.referenceIds.splice(index, 1);
      rows.splice(index, 1);
    },
    //删除确定
    deleteRow() {
      this.$message.success("删除成功!");
      this.delVisible = false;
      this.listTextbookReference();
    },
    //删除-索引传参
    delConfigFile(index, row) {
      this.recomandIndex = index;
      this.delVisible = true;
    },
    //val 为表单选中数据的集合
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.saveConfig {
  float: right;
}
.butSaveConfig {
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
.del-dialog-cnt {
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
.tableRvVisible {
  float: left;
  margin: 0px 25px 10px 0px;
}
.dialog-footer-table {
  padding: 10px 28px 60px;
}

.table .but-setting-search .el-button--small {
  padding: 9px 11px;
}

.form_dialog_setting {
  margin: -32px 288px 18px 282px;
}
</style>
<style >
/*全局 有好处*/
.dialog_se .el-dialog {
  position: absolute !important;
  margin-left: 50%;
  width: 82% !important;
  transform: translateX(-50%);
}
</style>
