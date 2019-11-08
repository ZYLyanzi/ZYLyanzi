<!-- 教材效果动图 -->
<template>
  <div>
    <div class="moving_graph" v-for="(item,index) in textList2">
      <div @mousedown="getIndex(index)">
        <el-form :model="form" label-width="120px">
          <div class="div_top">
            <div align="left" style="float:left">封面动图{{index + 1}}</div>
            <div align="right" class="radio_class">
              <el-radio v-model="item.openStatus" :label="0">开启</el-radio>
              <el-radio v-model="item.openStatus" :label="1">关闭</el-radio>
            </div>
            <div class="book_delBox">
              <el-button
                class="book_but_delBox"
                title="删除"
                type="text"
                size="mini"
                @click="delBox(item,index)"
              >
                <i class="el-icon-delete-solid"></i>
              </el-button>
            </div>
          </div>
          <el-form-item prop="filePathUrl" ref="filePathUrl">
            <el-upload
              :action="base"
              multiple
              ref="uploadFile"
              accept="image/*"
              list-type="picture-card"
              :class="{disabled:item.uploadDisabled}"
              :file-list="item.fileArray"
              :before-upload="beforeUploadPicture"
              :on-preview="handlePictureCardPreview"
              :on-progress="uploadProgress"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :show-file-list="true"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <div class="book_jump_link">
            <div align="left" style="float:left">
              <el-input v-model="item.resourceName" disabled="disabled" placeholder="请选择内容"></el-input>
            </div>
            <div align="right">
              <el-button @click="listTextbookResource(index)">教材资源</el-button>
            </div>
          </div>
        </el-form>
        <el-dialog class="preview-modal" :visible.sync="imgVisible" append-to-body>
          <img width="100%" :src="filePath2" alt="filePathUrl" />
        </el-dialog>
      </div>
    </div>
    <!-- 教材资源列表弹窗 -->
    <el-dialog
      title="教材资源"
      :visible.sync="dialogListResource"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form :inline="true" :model="formInline">
        <div class="re_inputSelect">
          <el-input placeholder="请输入内容" v-model="formInline.resourceName" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="listTextbookResource(codeIndex)"></el-button>
          </el-input>
        </div>
      </el-form>
      <!-- 列表 -->
      <el-table
        @row-click="rowClick"
        :data="tableChartletDate"
        border
        class="table"
        ref="moviesTable"
        @select="onTableSelect"
        @selection-change="handleSelectionChange"
        :header-cell-style="{'text-align':'center'}"
      >
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column
          align="center"
          prop="resourceName"
          label="资源名称"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="resourceType"
          label="类型"
          width="150%"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- 0视频，1模型，2图片,3PPT,4文档,5音频,6FLASH,7其他 -->
            <label v-if="scope.row.resourceType === 0">视频</label>
            <label v-else-if="scope.row.resourceType === 1">模型</label>
            <label v-else-if="scope.row.resourceType === 2">图片</label>
            <label v-else-if="scope.row.resourceType === 3">PPT</label>
            <label v-else-if="scope.row.resourceType === 4">文档</label>
            <label v-else-if="scope.row.resourceType === 5">音频</label>
            <label v-else-if="scope.row.resourceType === 6">FLASH</label>
            <label v-else>其他</label>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="resourceSize"
          label="大小(MB)"
          width="150%"
          show-overflow-tooltip
        />
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogListResource = false">取 消</el-button>
        <el-button type="primary" @click="sureResource">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  name: "child",
  props: {
    textList: {
      type: Array,
      default: Array
    }
  },
  name: "BookView",
  data() {
    return {
      codeIndex: null,
      textIndex: null, //索引
      mySelected: false,
      myResourceId: 0,
      textList2: [],
      textbookId: null, //教材ID
      bannerId: null, // 添加时没有就传空
      linkAddress: null, //外部链接 (默认null,只需要传resourceId)
      type: 0, //banner类型(0资源，1教材，2外部链接,默认0)
      filePath: null, //Banner图路径
      filePath2:null,
      resourceId: 0, //资源ID
      resourceName: null, //资源名称
      tenantId: null, //首页banner传tenantId，教材详情banner传textbookId
      textbookName: null, //教材名称
      openStatus: 0, //开启状态：0开启，1关闭(默认0)
      value: true,
      uploadDisabled: false, //隐藏事件 // 编辑时已上传图片初始化
      fileArray: [], //拼接地址(回显图片不需要拼接,查询获取地址需要拼接)
      imgVisible: false, // 上传图片预览框
      base: this.$store.state.baseUrl + this.$store.state.uploadFileUrl, //上传地址,
      optionResourceName: null, //选项资源名称
      optionresourceId: 0, //选项资源ID
      optionIndex: 0, //选项索引
      //资源列表
      tableChartletDate: [], //资源列表
      dialogListResource: false, //资源列表弹窗
      sourceMaterial: null, //素材
      textbookResourceId: null, //教材资源表ID
      fileName: null, //源文件名称
      resourceType: null, //资源类型(资源类型(0视频，1模型，2图片，3PPT，4文档,5音频，6FLASH，7其他)
      createTime: null, //上传时间
      useStatus: null, //使用情况(0未使用,1已使用)
      pageSize: 6, //dialog-页面大小
      pageNum: 1, //dialog-当前页数
      total_pages: 0, //总页数
      total: 0, //总条数
      formInline: {
        resourceName: null
      },
      idx: -1,
      id: -1,
      //表单tableChartletDate
      form: {}
    };
  },
  mounted() {},
  watch: {
    textList: {
      handler(newV, oldV) {
        if (newV.length !== 0) {
          this.textList2 = newV;
        }
      },
      deep: true
    },
    textList2: {
      handler(newV, oldV) {
        this.$emit("uploadData", { index: this.index, data: newV });
      },
      deep: true
    }
  },
  methods: {
    //进行选项
    rowClick: function(row, event) {
      var that = this;
      that.$refs.moviesTable.toggleRowSelection(row);
      if (that.myResourceId == row.resourceId) {
        this.mySelected = !this.mySelected;
      } else {
        this.mySelected = true;
      }
    },
    handleSelectionChange(val) {
      var that = this;
      try {
        that.optionResourceName = val[0].resourceName;
        that.optionResourceId = val[0].resourceId;
      } catch (e) {}
      if (val.length > 1) {
        that.$refs.moviesTable.toggleRowSelection(val[0], false);
      }
    },
    onTableSelect(rows, row) {
      // true 或者 false(0)
      this.mySelected = rows.length && rows.indexOf(row) !== -1;
      this.myResourceId = row.resourceId;
    },
    //教材资源列表
    listTextbookResource(index) {
      var that = this;
      that.codeIndex = index;
      that.optionIndex = index; //选项索引
      that.mySelected = false; //点开页面的时候mySelected默认false;
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/textbook/listTextbookResource",
        data: {
          pageSize: that.pageSize,
          pageNum: that.pageNum,
          textbookId: that.$route.query.textbookId, //没有章节资源,列表无数据.
          resourceName: that.formInline.resourceName
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          var tableChartletDate = result.data.data.content;
          that.total = Number(result.data.data.total);
          for (var i = 0; i < tableChartletDate.length; i++) {
            //toFixed 取小数位, Bytes 后台定义 B转MB
            tableChartletDate[i].number = i + 1;
            tableChartletDate[i].resourceSize = (
              tableChartletDate[i].resourceSize /
              1024 /
              1024
            ).toFixed(0);
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
      this.dialogListResource = true;
    },
    //确定
    sureResource() {
      if (this.mySelected === false || this.mySelected === 0) {
        this.$message.error("资源列未选取,无法确定!");
        return;
      }
      this.textList2[this.optionIndex].resourceName = this.optionResourceName;
      this.textList2[this.optionIndex].resourceId = this.optionResourceId;
      this.dialogListResource = false;
    },
    //删除控件与Banner
    delBox(item, index) {
      var that = this;
      if (!item.bannerId) {
        that.$refs.uploadFile[index].handleRemove();
        that.deleteBoxEvent(index);
        return false;
      }
      var bannerIds = item.bannerId;
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl + "/architecture/banner/batchDeleteBanner",
        data: {
          bannerIds: [bannerIds]
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          this.deleteBoxEvent(index);
          this.$message.success("删除成功!");
          this.$parent.bookListBanner();
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
    //删除 事件
    deleteBoxEvent(index) {
      this.$emit("deleteIndex", index);
    },
    // 上传图片成功
    uploadSuccess(res, file, fileList) {
      //根据鼠标悬浮事件,拿到当前索引进行渲染
      var textIndex = this.textIndex;
      //图片
      if (this.textList2.length) {
        this.textList2[textIndex].filePath = res.data;
        this.uploadComplete = true;
      }
    },
    //拿索引id
    getIndex(index) {
      this.textIndex = index;
    },
    // 上传图片时调用
    uploadProgress(event, file, fileList) {
      // 渲染进度条,同时根据索引进行隐藏
      this.videoUploadPercent = file.percentage.toFixed(0);
      if (this.videoUploadPercent == 0) {
        var index = this.textIndex;
        this.textList2[index].uploadDisabled = true;
        this.uploadComplete = false;
        this.$forceUpdate();
      }
    },
    // 上传图片前调用方法
    beforeUploadPicture(file) {
      /*   const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M; */
    },
    //隐藏事件
    fileChange(fileList) {
      if (fileList.length > 0) {
        this.uploadDisabled = true;
      } else {
        this.uploadDisabled = false;
      }
    },
    // 移除图片
    handleRemove(file, fileList) {
      var that = this;
      var index = that.textIndex;
      that.textList2[index].filePath = null;
      that.textList2[index].uploadDisabled = false;
      that.$forceUpdate();
    },
    // 上传图片出错
    uploadError(err, file, fileList) {
      this.$message.error("上传出错");
    },
    // 图片预览
    handlePictureCardPreview(file) {
      var that = this;
      var index = that.textIndex;
      that.textList2[index].filePath = file.url;
      this.filePath2 = file.url;
      that.imgVisible = true;
    },
    // 分页导航
    handleCurrentChange(val) {
      this.pageNum = val;
      this.listTextbookResource(this.optionIndex);
    }
  }
};
</script>

<style>
.book_jump_link .el-input.is-disabled .el-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: rgb(99, 141, 226);
  cursor: not-allowed;
}
.moving_graph .el-button--small {
  padding: 9px 9px;
}
.moving_graph .el-input__inner {
  padding: 0 11px;
}

.book_jump_link .el-input.is-disabled .input-with-select {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: rgb(99, 141, 226);
  cursor: not-allowed;
}
.re_inputSelect .el-input--small .input-with-select {
  height: 38px;
  width: 370px;
}

.input-with-select {
  width: 348px;
}
.re_inputSelect {
  margin: -33px 0px 8px 160px;
}
.book_delBox {
  margin-left: 207px;
  margin-top: -28px;
}

.moving_graph {
  width: 270px;
  height: 230px;
  border: 1px dashed rgb(202, 202, 202);
  padding: 0px 0px 0px 10px;
  float: left;
  margin-left: 20px;
  margin-top: 17px;
}

.moving_graph element.style {
  padding-left: 0px;
  padding-right: 0px;
}
.moving_graph .el-upload--picture-card i {
  font-size: 38px;
  color: #8c939d;
  margin: 50px 0px 0px 0px;
}
.moving_graph .el-row {
  box-sizing: border-box;
  margin: 13px 0px 0px 0px;
}

.moving_graph .el-upload--picture-card {
  background-color: #d5dde4;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 260px;
  height: 147px;
  line-height: 146px;
  vertical-align: top;
  margin-left: -119px;
}

.moving_graph .el-upload-list--picture-card .el-upload-list__item {
  overflow: hidden;
  background-color: #d5dde4;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 260px;
  height: 147px;
  vertical-align: top;
  margin-left: -119px;
}

.disabled .el-upload--picture-card {
  display: none;
}
.moving_graph .radio_class {
  margin: 0px 45px 0px 0px;
}
.moving_graph .el-radio__label {
  font-size: 14px;
  padding-left: 5px;
}
.moving_graph .el-radio {
  color: #606266;
  cursor: pointer;
  margin-right: 17px;
}
.disabled {
  height: 146px;
}
.book_jump_link {
  height: 43px;
  width: 97%;
  line-height: 32px;
  margin: -13px 0px 0px 0px;
}

.div_top {
  height: 26px;
  width: 97%;
  margin: 10px 0px 0px 0px;
  font-size: 14px;
}
.el-upload-list__item {
  transition: all 0s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>