<!-- 首页效果动图 -->
<template>
  <div>
    <div class="basics_box" v-for="(item,index) in textList2">
      <div @mousedown="getIndex(index)">
        <el-form :model="form" label-width="120px">
          <div class="div_top">
            <div align="left" style="float:left">轮播图{{index + 1}}</div>
            <div align="right" class="radio_class">
              <el-radio v-model="item.openStatus" :label="0">开启</el-radio>
              <el-radio v-model="item.openStatus" :label="1">关闭</el-radio>
            </div>
            <div class="delBox">
              <el-button
                class="but_delBox"
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
          <div class="jump_link">
            <div>
              <el-radio v-model="item.type" :label="0" border>
                <div class="jump_input">
                  <el-input
                    :class="item.type=='0'?'colourBlue':'colourAsh'"
                    :disabled="item.type=='0'?true:true"
                    v-model="item.resourceName"
                    placeholder="请选择内容"
                  ></el-input>
                </div>
                <div align="right" class="jump_button_div">
                  <el-button
                    :disabled="item.type=='0'?false:true"
                    class="jump_button"
                    @click="listResource(index)"
                  >资源库</el-button>
                </div>
              </el-radio>
            </div>
            <div>
              <el-radio v-model="item.type" :label="1" border>
                <div class="jump_input">
                  <el-input
                    :class="item.type=='1'?'colourBlue':'colourAsh'"
                    :disabled="item.type=='1'?true:true"
                    v-model="item.textbookName"
                    placeholder="请选择内容"
                  ></el-input>
                </div>
                <div align="right" class="jump_button_div">
                  <el-button
                    :disabled="item.type=='1'?false:true"
                    class="jump_button"
                    @click="listTextBook(index)"
                  >教 材</el-button>
                </div>
              </el-radio>
            </div>
            <div>
              <el-radio v-model="item.type" :label="2" border>
                <div class="jump_input">
                  <el-input
                    :class="item.type=='2'?'colourBlue':'colourAsh'"
                    :disabled="item.type=='2'?true:true"
                    v-model="item.linkAddress"
                    placeholder="请选择内容"
                  ></el-input>
                </div>
                <div align="right" class="jump_button_div">
                  <el-button
                    :disabled="item.type=='2'?false:true"
                    class="jump_button"
                    @click="linkAddressValue(index)"
                  >外部链接</el-button>
                </div>
              </el-radio>
            </div>
          </div>
        </el-form>
        <el-dialog class="preview-modal" :visible.sync="imgVisible" append-to-body>
          <img width="100%" :src="filePath2" alt="filePathUrl" />
          <!-- <span style.opacity="0">{{item.filePath}}</span> -->
        </el-dialog>
      </div>
    </div>

    <!-- 资源库 -->
    <el-dialog
      title="资源库"
      :visible.sync="dialogRepository"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form :inline="true" :model="formInline">
        <!-- 资源类型 -->
        <div class="form_dialog_resourceType">
          <el-form-item label="资源类型">
            <el-select v-model="formInline.resourceType" placeholder="请选择" style="width: 150px;">
              <el-option
                v-for="item in optionResourceType"
                :key="item.resourceType"
                :label="item.label"
                :value="item.resourceType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="请输入内容"
              v-model="formInline.resourceName"
              class="ba-input-select1"
            >
              <el-button
                class="but-re-search"
                slot="append"
                icon="el-icon-search"
                @click="listResource(codeIndex)"
              ></el-button>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <!-- 列表 -->
      <el-table
        @row-click="rowClick_re"
        :data="tableChartletDate"
        border
        class="table"
        ref="moviesTable_re"
        @select="onTableSelect_re"
        @selection-change="handleSelectionChange_re"
        :header-cell-style="{'text-align':'center'}"
      >
        <el-table-column align="center" type="selection" width="55%"></el-table-column>
        <el-table-column align="center" prop="resourceName" label="资源名称" show-overflow-tooltip />
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
          width="140%"
          show-overflow-tooltip
        />
      </el-table>
      <!-- 资源库分页组件 -->
      <div class="pagination">
        <el-pagination
          background
          @current-change="resourceHandleCurrentChange"
          layout="prev, pager, next"
          :page-size="this.pageSize"
          :total="this.resource_total"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRepository = false">取 消</el-button>
        <el-button type="primary" @click="confirmResource">确定</el-button>
      </span>
    </el-dialog>

    <!-- 教材列表弹窗 -->
    <el-dialog title="教材" :visible.sync="dialogListBook" :close-on-click-modal="false" width="50%">
      <div class="form_dialog_BookType">
        <el-form :inline="true" :model="formInline">
          <div class="bo_inputSelect">
            <el-input placeholder="请输入内容" v-model="formInline.textbookName">
              <el-button
                class="but-bo-search"
                slot="append"
                icon="el-icon-search"
                @click="listTextBook(codeIndex)"
              ></el-button>
            </el-input>
          </div>
        </el-form>
      </div>
      <el-table
        @row-click="rowClick_bo"
        :data="tableChartletDate"
        border
        class="table"
        ref="moviesTable_bo"
        @select="onTableSelect_bo"
        @selection-change="handleSelectionChange_bo"
        :header-cell-style="{'text-align':'center'}"
      >
        <el-table-column align="center" type="selection" width="55%"></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="教材名称"
          width="285px"
          show-overflow-tooltip
        />
        <el-table-column align="center" prop="categoryName" label="教材分类" show-overflow-tooltip></el-table-column>
      </el-table>
      <!-- 教材分页组件 -->
      <div class="pagination">
        <el-pagination
          background
          @current-change="bookHandleCurrentChange"
          layout="prev, pager, next"
          :page-size="this.pageSize"
          :total="this.book_total"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogListBook = false">取 消</el-button>
        <el-button type="primary" @click="confirmBook">确定</el-button>
      </span>
    </el-dialog>
    <!-- 外部链接 -->
    <el-dialog
      title="外部链接"
      :visible.sync="dialogLinkAddress"
      :close-on-click-modal="false"
      width="40%"
      size="tiny"
    >
      <el-form ref="form" :model="formInline" label-width="70px" :rules="rules">
        <el-form-item label="链接地址" prop="linkAddress">
          <el-input v-model="formInline.linkAddress" @keyup.enter.native="linkAddressSave('form')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogLinkAddress = false">取 消</el-button>
        <el-button type="primary" @click="linkAddressSave('form')">确 定</el-button>
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
  name: "BasicsSetUpBanner",
  //校验
  data: function() {
    const isLinkAddress = (rule, value, callback) => {
      //严格
      // const linkUrl = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
      //标准
      const linkUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
      if (!linkUrl.test(value)) {
        callback(new Error("请输入正确的网址"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        linkAddress: [{ validator: isLinkAddress, trigger: "blur" }]
      },
      //资源类型
      optionResourceType: [
        {
          resourceType: null,
          label: "全部"
        },
        {
          resourceType: 0,
          label: "视频"
        },
        {
          resourceType: 1,
          label: "模型"
        },
        {
          resourceType: 2,
          label: "图片"
        },
        {
          resourceType: 3,
          label: "PPT"
        },
        {
          resourceType: 4,
          label: "文档"
        },
        {
          resourceType: 5,
          label: "音频"
        },
        {
          resourceType: 6,
          label: "FLASH"
        },
        {
          resourceType: 7,
          label: "其他"
        }
      ],
      item: {},
      //页面
      codeIndex: null,
      type: 0, //banner类型(0资源，1教材，2外部链接,默认0)
      tableChartletDate: [],
      textIndex: null, //索引
      textList2: [], //动态列表
      openStatus: 0, //开启状态：0开启，1关闭(默认0)
      dialogLinkAddress: false, //链接框
      dialogRepository: false, //资源框
      dialogListBook: false, //教材框
      //资源
      textbookId: null, //教材ID
      bannerId: null, // 添加时没有就传空
      linkAddress: null, //外部链接 (默认null,只需要传resourceId)
      filePath: null, //Banner图路径
      filePath2: null, //Banner图路径
      resourceId: 0, //资源ID
      resourceName: null, //资源名称
      tenantId: null, //首页banner传tenantId，教材详情banner传textbookId
      //教材
      textbookName: null, //教材名称
      //2组选项
      mySelected1: false,
      myResourceId: 0,
      optionResourceName: "", //选项资源名称
      optionResourceId: 0, //选项资源ID
      optionResourceIndex: 0, //选项索引
      mySelected2: false,
      myTextbookId: 0,
      optionBookName: "", //选项教材名称
      optionBookId: 0, //选项教材ID
      optionBookIndex: 0, //选项教材索引
      optionLinkIndex: 0, //选项链接索引
      //上传
      uploadDisabled: false, //隐藏事件 // 编辑时已上传图片初始化
      fileArray: [], //拼接地址(回显图片不需要拼接,查询获取地址需要拼接)
      imgVisible: false, // 上传图片预览框
      base: this.$store.state.baseUrl + this.$store.state.uploadFileUrl, //上传地址,
      pageSize: 6, //dialog-页面大小
      resource_pageNum: 1, //dialog-当前页数
      total_pages: 0, //总页数
      resource_total: 0, //总条数
      book_pageNum: 1, //dialog-当前页数
      book_total: 0, //总条数
      //表单
      formInline: {
        resourceName: null,
        resourceType: null,
        linkAddress: null
      },
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.$store.commit("user");
    if (localStorage.getItem("tenantId")) {
      this.tenantId = localStorage.getItem("tenantId");
    } else {
      this.tenantId = this.$store.state.tenantId;
    }
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
        this.textList2 = newV;
      },
      deep: true
    }
  },
  methods: {
    //选项
    rowClick_re: function(row, event) {
      var that = this;
      that.$refs.moviesTable_re.toggleRowSelection(row);
      if (that.myResourceId == row.resourceId) {
        this.mySelected1 = !this.mySelected1;
      } else {
        this.mySelected1 = true;
      }
    },
    handleSelectionChange_re(val) {
      var that = this;
      try {
        that.optionResourceName = val[0].resourceName;
        that.optionResourceId = val[0].resourceId;
      } catch (e) {}
      if (val.length > 1) {
        that.$refs.moviesTable_re.toggleRowSelection(val[0], false);
      }
    },
    onTableSelect_re(rows, row) {
      this.mySelected1 = rows.length && rows.indexOf(row) !== -1;
      this.myResourceId = row.resourceId;
    },
    //资源库列表
    listResource(index) {
      var that = this;
      that.codeIndex = index;
      that.optionResourceIndex = index;
      that.mySelected1 = false; //点开页面的时候mySelected默认false;
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/resource/resource/listResource",
        data: {
          pageSize: that.pageSize,
          pageNum: that.resource_pageNum,
          tenantId: that.tenantId,
          resourceName: that.formInline.resourceName,
          resourceType: that.formInline.resourceType
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          var tableChartletDate = result.data.data.content;
          that.resource_total = Number(result.data.data.total);
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
      this.dialogRepository = true;
    },
    //教材列表
    listTextBook(index) {
      var that = this;
      that.codeIndex = index;
      that.optionBookIndex = index;
      that.mySelected2 = false;
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/ar-textbook/textbook/listTextbook",
        data: {
          pageSize: that.pageSize,
          pageNum: that.book_pageNum,
          tenantId: that.tenantId,
          textbookName: that.formInline.textbookName
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          var tableChartletDate = result.data.data.content;
          that.book_total = Number(result.data.data.total);
          let contentArr = [];
          for (let k = 0; k < tableChartletDate.length; k++) {
            if (tableChartletDate[k].categoryList != null) {
              for (
                let i = 0;
                i < tableChartletDate[k].categoryList.length;
                i++
              ) {
                contentArr.push(
                  tableChartletDate[k].categoryList[i].categoryName + ">"
                );
              }
              tableChartletDate[k].categoryName = contentArr;
              contentArr = [];
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
      this.dialogListBook = true;
    },
    //选项
    rowClick_bo: function(row, event) {
      var that = this;
      that.$refs.moviesTable_bo.toggleRowSelection(row);
      if (that.myTextbookId == row.textbookId) {
        this.mySelected2 = !this.mySelected2;
      } else {
        this.mySelected2 = true;
      }
    },
    handleSelectionChange_bo(val) {
      var that = this;
      try {
        that.optionBookName = val[0].name;
        that.optionBookId = val[0].textbookId;
      } catch (e) {}
      if (val.length > 1) {
        that.$refs.moviesTable_bo.toggleRowSelection(val[0], false);
      }
    },
    onTableSelect_bo(rows, row) {
      this.mySelected2 = rows.length && rows.indexOf(row) !== -1;
      this.myTextbookId = row.textbookId;
    },
    //链接
    linkAddressValue(index) {
      var that = this;
      that.optionLinkIndex = index;
      that.formInline.linkAddress =
        that.textList2[that.optionLinkIndex].linkAddress;
      that.dialogLinkAddress = true;
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
          this.$parent.homePageBannerList();
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
    //确定
    confirmResource() {
      if (this.mySelected1 === false || this.mySelected1 === 0) {
        this.$message.error("资源列未选取,无法确定!");
        return;
      }
      this.textList2[
        this.optionResourceIndex
      ].resourceName = this.optionResourceName;
      this.textList2[
        this.optionResourceIndex
      ].resourceId = this.optionResourceId;
      this.dialogRepository = false;
    },
    confirmBook() {
      if (this.mySelected2 === false || this.mySelected2 === 0) {
        this.$message.error("教材列未选取,无法确定!");
        return;
      }
      this.textList2[this.optionBookIndex].textbookName = this.optionBookName;
      this.textList2[this.optionBookIndex].textbookId = this.optionBookId;
      this.dialogListBook = false;
    },
    linkAddressSave(formValue) {
      //校验
      var that = this;
      that.$refs[formValue].validate(valid => {
        if (valid) {
          that.textList2[that.optionLinkIndex].linkAddress =
            that.formInline.linkAddress;
          that.dialogLinkAddress = false;
        } else {
          console.log("error validate submit!!");
          return false;
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
      this.videoUploadPercent = 0;
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
    // 上传图片时调用(渲染进度条,同时根据索引进行隐藏)
    uploadProgress(event, file, fileList) {
      //获取进度值
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
      var index = this.textIndex;
      this.textList2[index].filePath = file.url;
      this.filePath2 = file.url;
      this.imgVisible = true;
    },
    // 分页导航
    resourceHandleCurrentChange(val) {
      this.resource_pageNum = val;
      this.listResource(this.optionResourceIndex);
    },
    bookHandleCurrentChange(val) {
      this.book_pageNum = val;
      this.listTextBook(this.optionBookIndex);
    }
  }
};
</script>

<style>
.colourBlue.is-disabled .el-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: rgb(99, 141, 226);
  font-family: "微软雅黑";
  cursor: not-allowed;
}
.colourAsh.is-disabled .el-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: rgb(146, 152, 163);
  cursor: not-allowed;
}
.form_dialog_resourceType {
  margin: -22px 0px 0px 56px;
}
.form_dialog_BookType {
  margin: -33px 83px 12px 100px;
}
.jump_button {
  height: 32px;
  width: 72px;
}
.jump_input .el-input .el-input__inner {
  position: relative;
  font-size: 12px;
  display: inline-block;
  width: 100%;
  margin: -8px 0px 0px 5px;
}
.el-input--small .ba-input-select1 {
  height: 38px;
  width: 370px;
}
.ba-input-select1 {
  width: 348px;
}

.ba-input-select2 {
  width: 348px;
}

.el-input--small .ba-input-select2 {
  height: 38px;
  width: 370px;
}

.delBox {
  margin-left: 220px;
  margin-top: -28px;
}
.el-button--text {
  background: 0 0;
  padding-left: 30px;
  padding-right: 35;
  font-size: x-large;
}

.basics_box {
  width: 285px;
  height: 321px;
  border: 1px dashed rgb(202, 202, 202);
  padding: 0px 0px 0px 10px;
  float: left;
  margin-left: 20px;
  margin-top: 17px;
}

element.style {
  padding-left: 0px;
  padding-right: 0px;
}
.basics_box .el-upload--picture-card i {
  font-size: 38px;
  color: #8c939d;
  margin: 50px 0px 0px 0px;
}
.basics_box .el-row {
  box-sizing: border-box;
  margin: 13px 0px 0px 0px;
}

.basics_box .el-upload--picture-card {
  background-color: #d5dde4;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 273px;
  height: 147px;
  line-height: 146px;
  vertical-align: top;
  margin-left: -119px;
}

.basics_box .el-upload-list--picture-card .el-upload-list__item {
  overflow: hidden;
  background-color: #d5dde4;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 273px;
  height: 147px;
  vertical-align: top;
  margin-left: -119px;
}

.disabled .el-upload--picture-card {
  display: none;
}
.radio_class {
  margin: 0px 45px 0px 0px;
}
.el-radio__label {
  font-size: 14px;
  padding-left: 5px;
}
.el-radio {
  color: #606266;
  cursor: pointer;
  margin-right: 17px;
}
.disabled {
  height: 146px;
}
.basics_box .el-input--small .el-input__inner {
  height: 32px;
  width: 174px;
}
.div_top {
  height: 26px;
  width: 97%;
  margin: 10px 0px 0px 0px;
  font-size: 14px;
}
.el-radio--small.is-bordered {
  padding: 11px 0px 0px 0px;
  border-radius: 7px;
  height: 40px;
  width: 275px;
}
.el-radio--small.is-bordered .el-radio__inner {
  height: 15px;
  width: 15px;
  margin: 0px 0px 0px 5px;
}
.el-radio__input {
  cursor: pointer;
  vertical-align: middle;
  float: left;
}
.basics_box .but-bo-search .el-button--small {
  padding: 9px 11px;
}
.basics_box .but-re-search .el-button--small {
  padding: 9px 11px;
}
.basics_box .el-input__inner {
  padding: 0 11px;
}

.jump_link {
  height: 43px;
  width: 97%;
  line-height: 0px;
  margin: -13px 0px 0px 0px;
}
.jump_input {
  float: left;
}
.jump_button_div {
  margin: -22px 3px 0px 191px;
}
.el-upload-list__item {
  transition: all 0s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>