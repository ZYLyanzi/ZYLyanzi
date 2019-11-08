<!-- 教材推荐 -->
<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>&nbsp;教材推荐
        </el-breadcrumb-item>
      </el-breadcrumb>
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
        <el-table-column align="center" prop="number" label="编号" width="60"></el-table-column>
        <el-table-column align="center" prop="textbookName" label="教材名称"></el-table-column>
        <el-table-column align="center" prop="createUserName" label="创建者"></el-table-column>
        <el-table-column align="center" prop="recommendTime" label="推荐时间"></el-table-column>
        <el-table-column label="操作" width="400" align="center">
          <template scope="scope" style="width: 100%">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="serialNumberEdit(scope.$index, scope.row)"
            >设置序号</el-button>
            <el-button
              type="success"
              size="small"
              @click="doRecomandTwo(scope.$index, scope.row)"
              icon="el-icon-star-off"
            >取消推荐</el-button>
          </template>
        </el-table-column>
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
    <!-- 推荐弹出框  -->
    <el-dialog
      title="设置序号"
      :visible.sync="recommendStatusVisible"
      :close-on-click-modal="false"
      width="30%"
      size="tiny"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="70px">
        <el-form-item label="序列号" prop="sort">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recommendStatusVisible = false">取 消</el-button>
        <el-button type="primary" @click="SetserialNumber('form')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 取消推荐提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="recommendDelVisible"
      :close-on-click-modal="false"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">是否取消推荐？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recommendDelVisible = false">取 消</el-button>
        <el-button type="primary" @click="cancelRecommend">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data: function() {
    const isNum = (rule, value, callback) => {
      const num = /^[0-9]*$/;
      if (!num.test(value)) {
        callback(new Error("{   推荐序列号只能为数字   }"));
      } else {
        callback();
      }
    };
    return {
      //校验推荐序列号
      rules: {
        sort: [
          { required: true, message: "推荐序列号不能为空", trigger: "blur" },
          { validator: isNum, trigger: "blur" }
        ]
      },
      tenantId: null, //租户ID
      recomandIndex: 0, //公共索引
      recommendTextbookId: 0, //推荐教材表ID
      tableData: [], //推荐列表
      pageSize: this.$store.state.pageSize, //页面大小
      pageNum: 1, //当前页数
      total_pages: 0, //总页数
      total: 0, //总条数
      //弹窗属性设置
      recommendStatusVisible: false, //设置推荐
      recommendDelVisible: false, //取消推荐
      form: {
        sort: null
      }
    };
  },
  created() {
    //调用全局
    this.$store.commit("user");
    //页面监控使用localStorage对住户ID进行刷新赋值。
    if (localStorage.getItem("tenantId")) {
      this.tenantId = localStorage.getItem("tenantId");
    } else {
      this.tenantId = this.$store.state.tenantId;
    }
  },
  mounted() {
    this.listRecommend();
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.pageNum = val;
      this.listRecommend();
    },
    //推荐列表
    listRecommend() {
      var that = this;
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/recommendTextbook/listRecommendTextbook",
        data: {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          tenantId: this.tenantId
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          var tableData = result.data.data.content;
          that.total = Number(result.data.data.total);
          for (var i = 0; i < tableData.length; i++) {
            tableData[i].number = i + 1;
          }
          that.tableData = tableData;
        } else if (
          result.data.returnCode === 50001 ||
          result.data.returnCode === 500
        ) {
          alert("异常:" + result.data.returnMsg);
        } else {
          alert(result.data.returnMsg);
        }
      });
    },
    //设置序号
    SetserialNumber(formName) {
      var that = this;
      var index = that.recomandIndex;
      var recommendTextbookId = that.tableData[index].recommendTextbookId;
      that.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url:
              that.$store.state.baseUrl +
              "/ar-textbook/recommendTextbook/editRecommendTextbook",
            data: {
              sort: that.form.sort,
              recommendTextbookId: recommendTextbookId
            }
          })
            .then(result => {
              if (result.data.returnMsg === "请求成功") {
                this.recommendStatusRow();
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
        } else {
          console.log("error validate submit!!");
          return false;
        }
      });
    },
    //取消推荐
    cancelRecommend() {
      var that = this;
      var index = that.recomandIndex;
      var recommendTextbookId = that.tableData[index].recommendTextbookId;
      this.$axios({
        method: "delete",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/recommendTextbook/deleteRecommendTextbook?recommendTextbookId=" +
          recommendTextbookId
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          this.doRecomandTwoRow();
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
    //val 为表单选中数据的集合
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //设置推荐-索引传参
    serialNumberEdit(index, row) {
      this.form.sort = this.tableData[index].sort; //输入框赋值
      this.recomandIndex = index;
      this.recommendStatusVisible = true;
    },
    //推荐-确定
    recommendStatusRow() {
      this.$message.success("设置推荐成功!");
      this.recommendStatusVisible = false;
      this.listRecommend();
    },
    //取消推荐-索引传参
    doRecomandTwo(index, row) {
      this.recomandIndex = index;
      this.recommendDelVisible = true;
    },
    //取消推荐-确定
    doRecomandTwoRow() {
      this.$message.success("取消成功!");
      this.recommendDelVisible = false;
      this.listRecommend();
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  font-size: 14px;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>
