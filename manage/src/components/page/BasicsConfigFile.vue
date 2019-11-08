<!-- 配置文件 -->
<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>&nbsp;配置文件
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="saveConfig">
        <el-button
          class="butSaveConfig"
          type="primary"
          icon="el-icon-plus"
          @click="bookAddConfig()"
        >添加配置</el-button>
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
        <el-table-column align="center" prop="configrationName" label="配置名称"></el-table-column>
        <el-table-column align="center" prop="fileName" label="源文件名称"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新时间" width="240%"></el-table-column>
        <el-table-column align="center" prop="updatePolicy" label="更新策略" width="210%">
          <!-- 0不更新，1建议更新，2强制更新 -->
          <template slot-scope="scope">
            <label v-if="scope.row.updatePolicy === '0'">不更新</label>
            <label v-if="scope.row.updatePolicy === '1'" style="color:#1169dd">建议更新</label>
            <label v-if="scope.row.updatePolicy === '2'" style="color:#ff0000">强制更新</label>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220%" align="center">
          <template scope="scope" style="width: 100%">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="editConfigFile(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete-solid"
              @click="delConfigFile(scope.$index, scope.row)"
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
      <div class="del-dialog-cnt">是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑功能对话框 -->
    <el-dialog
      class="uploader-content"
      title="上传/编辑配置文件"
      :visible.sync="editVisible"
      :before-close="handleClose"
      width="58%"
      height="60%"
    >
      <!-- 列表  -->
      <el-table class="upload-wrap" :data="ResourceRequestList" style="width: 100%">
        <el-table-column prop="configrationName" label="文件名称">
          <template scope="scope">
            <span v-if="!editeFlag">{{ scope.row.configrationName}}</span>
            <span v-if="editeFlag" class="cell-edit-input">
              <el-input
                @blur="saveInput(scope.$index,scope.row)"
                v-model="scope.row.configrationName"
              ></el-input>
            </span>
            <span
              v-if="!editeFlag"
              style="margin-left:10px;"
              class="cell-icon"
              @click="handleEdit(scope.$index,scope.row)"
            >
              <i class="el-icon-edit"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="源文件名称"></el-table-column>
        <el-table-column prop="progress" label="状态">
          <template slot-scope="scope">
            <el-progress
              :stroke-width="4"
              :key="scope.row.fileName"
              type="line"
              :text-inside="false"
              :percentage="scope.row.progress"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="fileSize2" label="大小" width="80"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <!--<el-button @click="doUpload(scope.row)" type="text" size="small"></el-button>-->
            <div class="ik">
              <uploader
                ref="uploadmodel"
                :file="file"
                :options="options"
                class="uploader-example"
                @files-submitted="submitted"
                @file-progress="onFileProgress"
                @file-success="onFileSuccess"
              >
                <!--@file-error="onFileError2"-->
                <!--:file-status-text="statusText"-->
                <uploader-unsupport></uploader-unsupport>

                <uploader-drop>
                  <uploader-btn class="uploader-item">上传</uploader-btn>
                </uploader-drop>
                <!--<uploader-list ></uploader-list>-->
                <uploader-list style="display: none;"></uploader-list>
              </uploader>
              <!-- 取消上传 -->
              <el-button type="text" @click="cancelUpload(scope.row)" size="small">取消上传</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="update-policy-wrap">
        <span class="update-policy-label">更新策略</span>
        <el-radio v-model="updatePolicy" label="1">推荐更新</el-radio>
        <el-radio v-model="updatePolicy" label="2">强制更新</el-radio>
      </el-row>
      <el-row class="update-policy-wrap2">
        <span class="update-policy-label2">更新说明</span>
        <el-input
          class="remark-item"
          type="textarea"
          :rows="10"
          placeholder="请输入内容，不超过20字"
          v-model="remark"
        ></el-input>
      </el-row>

      <span slot="footer" class="config-dialog-footer">
        <el-button @click="cancelUploadDialog">取 消</el-button>
        <el-button type="primary" @click="confirmUploadDialog">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加配置功能对话框 -->
    <el-dialog
      class="uploader-content"
      title="上传/编辑配置文件"
      :visible.sync="editVisible2"
      :before-close="handleClose"
      width="58%"
      height="60%"
    >
      <!-- 列表  -->
      <el-table class="upload-wrap" :data="ResourceRequestList2" style="width: 100%">
        <el-table-column prop="configrationName" label="文件名称">
          <template scope="scope">
            <span v-if="!editeFlag">{{ scope.row.configrationName}}</span>
            <span v-if="editeFlag" class="cell-edit-input">
              <el-input
                @blur="saveInput(scope.$index,scope.row)"
                v-model="scope.row.configrationName"
              ></el-input>
            </span>
            <span
              v-if="!editeFlag"
              style="margin-left:10px;"
              class="cell-icon"
              @click="handleEdit(scope.$index,scope.row)"
            >
              <i class="el-icon-edit"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="源文件名称"></el-table-column>
        <el-table-column prop="progress" label="状态" width="150">
          <template slot-scope="scope">
            <el-progress
              v-if="scope.row.progress"
              :stroke-width="4"
              :key="scope.row.fileName"
              type="line"
              :text-inside="false"
              :percentage="scope.row.progress"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="fileSize2" label="大小" width="80"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--<el-button @click="doUpload(scope.row)" type="text" size="small"></el-button>-->
            <div class="ik">
              <uploader
                ref="uploadmodel2"
                :file="file"
                :options="options"
                class="uploader-example"
                @files-submitted="submitted2"
                @file-progress="onFileProgress2"
                @file-success="onFileSuccess2"
              >
                <uploader-unsupport></uploader-unsupport>
                <uploader-drop>
                  <uploader-btn class="uploader-item">上传</uploader-btn>
                </uploader-drop>
                <!--<uploader-list ></uploader-list>-->
                <uploader-list style="display: none;"></uploader-list>
              </uploader>
              <!-- 取消上传 -->
              <el-button type="text" @click="cancelUpload_2(scope.row)" size="small">取消上传</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="update-policy-wrap">
        <span class="update-policy-label">更新策略</span>
        <el-radio v-model="updatePolicy_2" label="1">推荐更新</el-radio>
        <el-radio v-model="updatePolicy_2" label="2">强制更新</el-radio>
      </el-row>
      <el-row class="update-policy-wrap2">
        <span class="update-policy-label2">更新说明</span>
        <el-input
          class="remark-item"
          type="textarea"
          :rows="10"
          placeholder="请输入内容，不超过20字"
          v-model="remark_2"
        ></el-input>
      </el-row>
      <span slot="footer" class="config-dialog-footer">
        <el-button @click="cancelUploadDialog_2">取 消</el-button>
        <el-button type="primary" @click="confirmUploadDialog_2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { debuglog } from "util";
import { SSL_OP_MSIE_SSLV2_RSA_PADDING } from "constants";
export default {
  name: "basetable",
  data() {
    return {
      tableData: [],
      recomandIndex: 0, //公共索引
      tenantId: "", //租户ID
      configrationId: 0, //配置ID
      configrationName: "", //配置名称
      fileName: "", //源文件名称
      filePath: "", //文件路径
      fileSize: "", //配置大小
      remark: "", //更新说明
      remark_2: "", //更新说明
      updatePolicy: "", //更新策略(0不更新，1建议更新，2强制更新)
      updatePolicy_2: "1", //更新策略(0不更新，1建议更新，2强制更新)
      updateTime: "", //更新时间
      updateUserId: null, //更新人ID
      //弹窗属性设置
      delVisible: false, //删除提示框
      editVisible: false, //编辑提示框
      editVisible2: false, //编辑提示框
      //分页
      pagination: {
        totalRows: 0, //总条数
        pageSize: 5, //每页显示条数 this.$store.state.pageSize
        pageSizes: [5, 20, 50], //设置多少条一页
        pageNumber: 1, //当前页数
        layout: "total, sizes, prev, pager, next, jumper"
      },
      //分页属性
      idx: -1,
      id: -1,
      ResourceRequestList: [], //资源数据属性
      ResourceRequestList2: [
        {
          configrationName: "",
          fileName: "",
          fileSize2: null,
          progress: null
        }
      ], //资源数据属性--添加配置
      tempResourceRequestList: [], //缓存资源数据属性
      tempResourceRequestList2: [], //缓存资源数据属性--添加配置
      editeFlag: false, //资源数据属性
      file: {},
      fileList: [], //上传文件数组
      options: {
        //simple-uploader.js上传组件参数配置
        target: "",
        singleFile: true,
        autoStart: false,
        allowDuplicateUploads: 1,
        // allowDuplicateUploads:true,
        testChunks: false,
        chunkSize: 1000 * 1024 * 1024
      },
      editConfigrationUrl: "", //编辑配置路径
      addConfigrationUrl: "" //添加配置路径
    };
  },
  created() {
    //调用全局
    this.$store.commit("user");
    if (localStorage.getItem("tenantId")) {
      this.tenantId = localStorage.getItem("tenantId");
    } else {
      this.tenantId = this.$store.state.tenantId;
    }
    this.options.target =
      this.$store.state.baseUrl + this.$store.state.uploadFileUrl;
    this.editConfigrationUrl =
      this.$store.state.baseUrl + this.$store.state.editConfigration; //编辑配置路径
    this.addConfigrationUrl =
      this.$store.state.baseUrl + this.$store.state.addConfigration; //添加配置路径
  },

  mounted() {
    this.listConfigFile(); //获取配置文件列表
  },
  methods: {
    formartDate(inputTime) {
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    // 分页导航
    currentChange(val) {
      this.pagination.pageNumber = val;
      this.listConfigFile();
    },
    //设置分页大小
    sizeChange(val) {
      this.pagination.pageSize = val;
      this.listConfigFile();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    //配置列表
    listConfigFile() {
      var that = this;
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl +
          "/architecture/configration/listConfigration",
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
    //删除配置
    handleDelete() {
      var that = this;
      var index = that.recomandIndex;
      var configrationId = that.tableData[index].configrationId;
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl +
          "/architecture/configration/deleteConfigration",
        params: {
          configrationId: configrationId
        }
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
    //添加配置文件
    bookAddConfig() {
      var that = this;
      that.editVisible2 = true;
    },
    //编辑
    editConfigFile(index, row) {
      var that = this;
      this.editVisible = true;
      var ResourceRequestList = {}; //数据列表
      //
      ResourceRequestList.updateUserId = row.updateUserId; //上传用户id
      ResourceRequestList.configrationId = row.configrationId; //资源id
      ResourceRequestList.configrationName = row.configrationName; //文件名称
      ResourceRequestList.fileName = row.fileName; //源文件名称
      ResourceRequestList.filePath = row.filePath; //文件路径
      ResourceRequestList.number = row.number; //更新策略
      ResourceRequestList.remark = row.remark; //修改说明
      that.remark = row.remark;
      ResourceRequestList.updatePolicy = row.updatePolicy; //更新策略
      that.updatePolicy = row.updatePolicy;
      ResourceRequestList.progress = 100;
      var fileSize = row.fileSize; //文件大小
      ResourceRequestList.fileSize = fileSize; //文件大小1
      if (fileSize < 104857) {
        //小于0.1M
        ResourceRequestList.fileSize2 = (fileSize / 1024).toFixed(0) + `KB`; //大小2
      } else {
        ResourceRequestList.fileSize2 =
          (fileSize / 1024 / 1024).toFixed(1) + `M`; //大小2
      }
      that.ResourceRequestList.push(ResourceRequestList);
      that.tempResourceRequestList.push(row); //缓存数据
      that.tempResourceRequestList[0].progress = 100;
    },
    //保存输入的名称
    saveInput: function(index, row) {
      var that = this;
      //赋值给上传列表的resourceName
      that.ResourceRequestList[0].configrationName = row.configrationName;
      this.editeFlag = false;
    },
    handleEdit: function() {
      //遍历数组改变editeFlag
      this.editeFlag = true;
    },

    //关闭编辑提示框
    handleClose(done) {
      var that = this;
      this.$confirm("确认关闭？")
        .then(_ => {
          that.ResourceRequestList = [];
          (that.ResourceRequestList2 = [
            {
              configrationName: "",
              fileName: "",
              fileSize2: null,
              progress: null
            }
          ]), //资源数据属性--添加配置
            done();
        })
        .catch(_ => {});
    },

    //确定弹框
    confirmUploadDialog() {
      var that = this;
      that.editVisible = false;
      var ResourceRequestObj = that.ResourceRequestList[0];
      ResourceRequestObj.remark = that.remark; //重新获取remak
      ResourceRequestObj.updatePolicy = that.updatePolicy; //重新获取更新策略updatePolicy
      if (
        ResourceRequestObj.fileName ==
          that.tempResourceRequestList[0].fileName &&
        ResourceRequestObj.updatePolicy ==
          that.tempResourceRequestList[0].updatePolicy &&
        ResourceRequestObj.remark == that.tempResourceRequestList[0].remark
      ) {
        //
        that.ResourceRequestList = [];
        that.tempResourceRequestList = []; //清除缓存数据
        return;
      }
      delete ResourceRequestObj.progress;
      delete ResourceRequestObj.fileSize2;
      // delete ResourceRequestList.fileSize
      // 提交接口
      this.$axios({
        method: "post",
        url: that.editConfigrationUrl,
        data: ResourceRequestObj
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          this.$message.success("保存成功!");
          that.listConfigFile(); //重新获取资源列表
        } else if (result.data.returnCode === 50001) {
          this.$message.error("异常" + result.data.returnCode);
        } else {
        }
      });
      that.ResourceRequestList = [];
      that.tempResourceRequestList = []; //清除缓存数据
    },
    //确定弹框——添加配置
    confirmUploadDialog_2() {
      var that = this;
      var ResourceRequestList = that.ResourceRequestList2[0];
      ResourceRequestList.remark = that.remark_2; //重新获取remak
      ResourceRequestList.updatePolicy = that.updatePolicy_2; //重新获取更新策略updatePolicy
      ResourceRequestList.tenantId = localStorage.getItem("tenantId"); //重新获取tenantId
      ResourceRequestList.createUserId = localStorage.getItem("userId"); //用户id;
      delete ResourceRequestList.progress;
      delete ResourceRequestList.fileSize2;
      if (!ResourceRequestList.fileName) {
        that.$message.error("未添加配置文件");
        return;
      }
      that.editVisible2 = false;
      // 提交接口
      this.$axios({
        method: "post",
        url: that.addConfigrationUrl,
        data: ResourceRequestList
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          this.$message.success("保存成功!");
          that.listConfigFile(); //重新获取资源列表
        } else if (result.data.returnCode === 50001) {
          this.$message.error("异常" + result.data.returnCode);
        } else {
        }
      });
      this.ResourceRequestList2 = [
        {
          configrationName: "",
          fileName: "",
          fileSize2: null,
          progress: null
        }
      ];
      that.tempResourceRequestList2 = []; //清除缓存数据
    },
    //取消弹框
    cancelUploadDialog() {
      this.editVisible = false;
      this.ResourceRequestList = [];
      this.tempResourceRequestList = []; //清除缓存数据
    },
    //取消弹框——添加配置
    cancelUploadDialog_2() {
      this.editVisible2 = false;
      this.ResourceRequestList2 = [{}];
      this.tempResourceRequestList2 = []; //清除缓存数据
    },
    //取消上传
    cancelUpload(row) {
      this.ResourceRequestList = this.tempResourceRequestList; //恢复开始存储的数据
      this.ResourceRequestList[0].fileSize2 = `0k`;
    },
    //取消上传
    cancelUpload_2(row) {
      this.ResourceRequestList2 = [
        {
          configrationName: "",
          fileName: "",
          fileSize2: null,
          progress: null
        }
      ]; //资源数据属性--添加配置
    },
    //删除确定
    deleteRow() {
      this.$message.success("删除成功!");
      this.delVisible = false;
      this.listConfigFile();
    },
    // 刚上传时
    submitted(rootFile) {
      //文件添加到上传队列时触发--AR资源
      var that = this;
      that.ResourceRequestList[0].configrationName = rootFile[0].name; //文件名称
      that.ResourceRequestList[0].fileName = rootFile[0].name; //源文件名称
      that.ResourceRequestList[0].progress = 0; //进度条为0;
      var fileSize = rootFile[0].size; //源文件名称
      that.ResourceRequestList[0].fileSize = fileSize;
      if (fileSize < 104857) {
        //小于0.1M
        that.ResourceRequestList[0].fileSize2 =
          (fileSize / 1024).toFixed(0) + `KB`; //大小
      } else {
        that.ResourceRequestList[0].fileSize2 =
          (fileSize / 1024 / 1024).toFixed(1) + `M`; //大小
      }
    },
    // 刚上传时——添加配置模块
    submitted2(rootFile) {
      //文件添加到上传队列时触发--AR资源
      var that = this;
      that.ResourceRequestList2[0].configrationName = rootFile[0].name; //文件名称
      that.ResourceRequestList2[0].fileName = rootFile[0].name; //源文件名称
      that.ResourceRequestList2[0].progress = 0; //进度条为0;
      var fileSize = rootFile[0].size; //源文件名称
      that.ResourceRequestList2[0].fileSize = fileSize; //大小
      if (fileSize < 104857) {
        //小于0.1M
        that.ResourceRequestList2[0].fileSize2 =
          (fileSize / 1024).toFixed(0) + `KB`; //大小
      } else {
        that.ResourceRequestList2[0].fileSize2 =
          (fileSize / 1024 / 1024).toFixed(1) + `M`; //大小
      }
      that.$forceUpdate(); //强制渲染
    },
    // 上传进度
    onFileProgress(rootFile) {
      //上传进度状态调用
      var that = this;
      //进度条
      that.ResourceRequestList[0].progress =
        rootFile._prevProgress.toFixed(0) * 100;
      that.$forceUpdate(); //强制渲染
    },
    // 上传进度——添加配置模块
    onFileProgress2(rootFile) {
      //上传进度状态调用
      var that = this;
      //进度条
      that.ResourceRequestList2[0].progress =
        rootFile._prevProgress.toFixed(0) * 100;
      that.ResourceRequestList2[0].progress2 =
        rootFile._prevProgress.toFixed(0) * 100;
      that.$forceUpdate(); //强制渲染
    },
    // 上传成功时
    onFileSuccess(rootFile, file, message, chunk) {
      //上传成功调用
      var that = this;
      var resourcePath = JSON.parse(message).data;
      that.ResourceRequestList[0].filePath = resourcePath;
      that.$refs.uploadmodel.fileRemoved(); //可上传重复文件
    },
    // 上传成功时——添加配置模块
    onFileSuccess2(rootFile, file, message, chunk) {
      //上传成功调用
      var that = this;
      var resourcePath = JSON.parse(message).data;
      that.ResourceRequestList2[0].filePath = resourcePath;
      that.$refs.uploadmodel2.fileRemoved(); //可上传重复文件
      that.$forceUpdate(); //强制渲染
    },
    // 移除缓存
    fileRemoved(file) {
      this.files = this.uploader.files;
      this.fileList = this.uploader.fileList;
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
  margin-top: -23px;
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
.update-policy-wrap {
  margin-top: 30px;
}
.update-policy-wrap2 {
  margin-top: 30px;
}
.remark-item {
  width: 99%;
  display: block;
  float: left;
  padding: 11px 12px 6px 0px;
}
.update-policy-label {
  margin-right: 30px;
}
.update-policy-label2 {
  margin-right: 30px;
  float: left;
}
.uploader-example {
  float: left;
  background: rgba(255, 255, 255, 0);
  padding: 15px;
  border: none !important;
  font-size: 12px;
  margin-top: -14px;
}
.uploader-item {
  background: #409eff;
  color: #fff;
  border: #409eff;
}

.uploader-item:hover {
  background: #409eff;
  color: #fff;
  border: #409eff;
}

.uploader-example .uploader-btn {
  margin-right: 5px;
}

.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
.uploader-drop {
  position: relative;
  overflow: hidden;
  border: 0px solid #ccc;
  background-color: transparent;
  padding: 0 !important;
  transition: all 0.8s;
}
.config-dialog-footer {
  padding: 10px 6px 21px;
  text-align: right;
  box-sizing: border-box;
}
.ik {
  margin: 12px 0px -3px -15px;
}
</style>
<style>
.el-upload--text {
  background-color: #fff;
  /* border: 1px dashed #d9d9d9; */
  border-radius: 6px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>