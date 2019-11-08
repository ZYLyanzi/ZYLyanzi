<template>
  <div class="container">
    <div class="header-wrap">
      <!--<div class="header-label">资源库 > 本地上传</div>-->
      <ul class="menu-wrap">
        <li class="refrence">
          <el-button type="text">上传说明</el-button>
        </li>
        <!--上传组件  上传普通资源-->
        <li id="global-uploader">
          <!--:file="file"-->
          <uploader
            :options="options"
            class="uploader-example"
            @upload-start="uploadStart"
            @files-submitted="submitted"
            @file-progress="onFileProgress"
            @file-success="onFileSuccess"
          >
            <uploader-unsupport></uploader-unsupport>
            <uploader-drop>
              <!--<p>Drop files here to upload or</p>-->
              <uploader-btn class="uploader-item">上传普通资源</uploader-btn>
            </uploader-drop>
            <!--<uploader-list></uploader-list>-->
            <uploader-list style="display: none;"></uploader-list>
          </uploader>
        </li>
        <!--上传组件 AR模型资源-->
        <li id="global-uploader2">
          <uploader
            ref="uploadmodel"
            :file="file"
            :options="options"
            class="uploader-example"
            @upload-start="uploadStart"
            @files-submitted="submitted2"
            @file-progress="onFileProgress"
            @file-success="onFileSuccess2"
          >
            <!--@file-error="onFileError2"-->
            <!--:file-status-text="statusText"-->
            <uploader-unsupport></uploader-unsupport>
            <uploader-drop>
              <uploader-btn class="uploader-item">上传AR资源</uploader-btn>
            </uploader-drop>
            <!--<uploader-list ></uploader-list>-->
            <uploader-list style="display: none;"></uploader-list>
          </uploader>
        </li>
        <li>
 <!-- <el-upload
  class="upload-demo"
  action="http://113.98.59.233:7888/backen/dfs/upload/v1/uploadFile"
  :on-preview="handlePreview2"
  :on-remove="handleRemove2"
  :before-remove="beforeRemove2"
  multiple
  :limit="3"
  :on-exceed="handleExceed2"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
 </el-upload> -->
        </li>
        <li class="save-files" @click="saveFiles">
          <el-button type="primary" icon="el-icon-upload2">保存</el-button>
        </li>
      </ul>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="resourceName" label="资源名称" width="300">
          <template scope="scope">
            <span v-if="!scope.row.editeFlag">{{ scope.row.resourceName }}</span>
            <span v-if=" scope.row.editeFlag" class="cell-edit-input">
              <el-input @blur="saveInput(scope.$index,scope.row)" v-model="scope.row.resourceName"></el-input>
            </span>
            <span
              v-if=" !scope.row.editeFlag"
              style="margin-left:10px;"
              class="cell-icon"
              @click="handleEdit(scope.$index,scope.row)"
            >
              <i v-if="scope.row.index" class="el-icon-edit"></i>
            </span>
            <!--<span v-if="scope.row.editeFlag"  style="margin-left:10px;"  class="cell-icon"  @click="handleSave(scope.$index,scope.row)">  <i class="el-icon-document"></i> </span>-->
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="源文件名称"></el-table-column>
        <el-table-column prop="progress" label="状态">
          <template slot-scope="scope">
            <el-progress
              :stroke-width="4"
              :key="scope.row.id"
              v-if="scope.row.id"
              type="line"
              :text-inside="false"
              :percentage="scope.row.progress"
              :color="scope.row.color"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="resourceSize" label="大小"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope" @mousedown="getTableIndex(scope.$index,scope.row)">
            <el-button v-if="scope.row.id" @click="delResourse(scope.$index,scope.row)">删除</el-button>
            <div v-if="!scope.row.id">
              <!--<div v-if="!scope.row.id" @mouseup="getTableIndex(scope.$index,scope.row)">-->
              <uploader
                ref="uploadmodel"
                :file="file"
                :options="options3"
                class="uploader-example3"
                @upload-start="uploadStart(scope.$index,scope.row)"
                @files-submitted="submitted3"
                @file-progress="onFileProgress3"
                @file-success="onFileSuccess2"
              >
                <!--@file-removed="removeFiles"-->
                <!--@file-error="onFileError2"-->
                <!--:file-status-text="statusText"-->
                <uploader-unsupport></uploader-unsupport>
                <uploader-drop>
                  <uploader-btn class="uploader-item">上传</uploader-btn>
                </uploader-drop>
                <uploader-list style="display: none;"></uploader-list>
              </uploader>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
/* import { fetchData } from '../../api/index'; */
import VueCropper from "vue-cropperjs";
import { log, debuglog } from "util";
import { mapGetters } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "ResourceUpload",
  data() {
    return {
      fileList: [],
      tempIndex: null,
      tempTableIndex: null,
      tempTableObj: null,
      showEdit: [], //显示编辑框
      ARList: [], //保存的AR资源数据
      addResourceRequestList: [], //保存的普通资源数据
      addResourceRequestList2: [], //保存的整合资源数据
      tableData: [],
      hasModelFiles: false, //判断是否有模型资源
      inputColumn1: "", //第一列的输入框
      file: {},
      fileList: [],
      options: {
        //simple-uploader.js上传组件参数配置
        target: "",
        autoStart: false,
        allowDuplicateUploads: 1,
        // allowDuplicateUploads:true,
        testChunks: false,
        chunkSize: 1000 * 1024 * 1024
      },
      options3: {
        //simple-uploader.js上传组件参数配置2
        target: "",
        // target: this.uploadPath,
        testChunks: false,
        autoStart: false,
        singleFile: true,
        allowDuplicateUploads: true
      },
      attrs: {
        accept: "image/*"
      },
      _prevProgress: null //上传进度条
      // statusText: {
      //     success: '成功了',
      //     error: '出错了',
      //     uploading: '上传中',
      //     paused: '暂停中',
      //     waiting: '等待中'
      // }
    }; //return end
  },
  watch: {
    tableData: {
      handler(newName, oldName) {
        this.tableData = newName;
        this.$forceUpdate();
      },
      immediate: true,
      deep: true
    },
    ARList: {
      handler(newName, oldName) {
        this.$forceUpdate();
      },
      immediate: true,
      deep: true
    }
  },
  computed: mapGetters(["uploadPath", "addResourcePath"]),
  created() {
    this.options.target =
      this.$store.state.baseUrl + this.$store.state.uploadFileUrl;
    this.options3.target =
      this.$store.state.baseUrl + this.$store.state.uploadFileUrl;
  },
  mounted() {
    // console.log(this.$store.getters.uploadPath)
  },

  methods: {
    getTableIndex(index, rowVal) {
      //获取表格索引
    },

    uploadStart(e, rowVal, index) {
      //文件上传时触发
      try {
        this.tempIndex = rowVal.tempIndex;
        this.tempTableIndex = e;
      } catch (e) {}
    },
    submitted(rootFile) {
      //文件添加到上传队列时触发--普通资源
      for (let i = 0; i < rootFile.length; i++) {
        var that = this;
        var formObj = {}; //用于列表渲染
        var formObj2 = {}; //用于递交数据
        formObj.editeFlag = false; //上传文件对应的id
        formObj.id = rootFile[i].id; //上传文件对应的id
        formObj2.id = rootFile[i].id; //上传文件对应的id
        formObj2.addResourceVersionDTOList = [{}];
        formObj.fileName = rootFile[i].name; //源文件名collect.png
        formObj2.addResourceVersionDTOList[0].fileName = rootFile[i].name; //源文件名collect.png

        formObj2.createUserId = localStorage.getItem("userId"); //用户id
        formObj2.tenantId = localStorage.getItem("tenantId"); //tenantId1
        // formObj2.tenantId =that.$store.state.tenantId;//tenantId1
        var resourceName = rootFile[i].name; //源文件名collect.png
        formObj.resourceName = resourceName; //源文件名collect.png
        formObj2.resourceName = resourceName; //源文件名collect.png
        formObj.progress = 0; //进度条
        formObj.color = "#409EFF;"; //进度条
        var resourceSize = rootFile[i].size; //大小
        if (resourceSize < 104857) {
          //小于0.1M
          formObj.resourceSize = (rootFile[i].size / 1024).toFixed(0) + `KB`; //大小
        } else {
          formObj.resourceSize =
            (rootFile[i].size / 1024 / 1024).toFixed(1) + `M`; //大小
        }
        formObj2.resourceSize = rootFile[i].size; //大小
        formObj.resourceReferenceIds = []; //空
        formObj2.resourceReferenceIds = []; //空
        //判断资源类型  0视频，1模型，2图片，3PPT，4文档,5音频，6FLASH，7其他
        var getType = resourceName.substr(resourceName.indexOf("."));
        getType = getType.toLowerCase(); //转成小写字母
        if (/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(getType)) {
          formObj.resourceType = 2;
          formObj2.resourceType = 2;
        } else if (
          /.(mp4|rmvb|avi|ts|rm|flv|3gp|mov|asf|mpeg|wmv|navi|mkv|f4v)$/.test(
            getType
          )
        ) {
          formObj.resourceType = 0;
          formObj2.resourceType = 0;
        } else if (/_(android.zip|ios.zip)$/.test(resourceName)) {
          // this.$message.error("不能穿AR模型资源文件");
          // return false;
          formObj2.resourceType = 1;
          formObj.resourceType = 1;
          // formObj2.resourceType = 1;
        } else if (/.(ppt|pptx)$/.test(getType)) {
          formObj.resourceType = 3;
          formObj2.resourceType = 3;
        } else if (/.(doc|docx|txt|pdf|html|md|xls|xlsx)$/.test(getType)) {
          formObj.resourceType = 4;
          formObj2.resourceType = 4;
        } else if (
          /.(mp3|cda|WAV|ape|flac|acc|midi|wma|ra|rm|ram|rmx|vqf|wave|mod|md|ogg|rtp|atf|au|aac)$/.test(
            getType
          )
        ) {
          formObj.resourceType = 5;
          formObj2.resourceType = 5;
        } else if (/.(swf|flv|f4v|fla)$/.test(getType)) {
          formObj.resourceType = 6;
        } else {
          formObj.resourceType = 7;
          formObj2.resourceType = 7;
        }
        var index = that.addResourceRequestList.length + that.ARList.length + 1; //需要的添加
        formObj.index = index;
        // 列表添加一组文件对象
        that.tableData.push(formObj);
        that.addResourceRequestList.push(formObj2);
      } //for end
    },

    submitted2(rootFile) {
      //文件添加到上传队列时触发--AR资源
      var that = this;
      if (rootFile.length > 3) {
        alert("最多只能上传三个文件");
        return;
      }
      var index = that.addResourceRequestList.length + that.ARList.length + 1; //表格的需要索引
      that.hasModelFiles = true;
      var formObj2 = {}; //用于递交数据处理
      formObj2.createUserId = localStorage.getItem("userId"); //用户id
      formObj2.tenantId = localStorage.getItem("tenantId"); //tenantId1

      // formObj2.createUserId =that.$store.state.userId;//用户id
      //      formObj2.tenantId =that.$store.state.tenantId;//tenantId1
      //
      formObj2.resourceReferenceIds = []; //空
      formObj2.addResourceVersionDTOList = [];
      formObj2.resourceType = 1; //资源类型为模型
      var resourceName = rootFile[0].name; //源文件名collect.png
      for (let i = 0; i < rootFile.length; i++) {
        //要上传的AR资源
        var resourceName2 = rootFile[i].name; //源文件名collect.png
        if (/_(android.zip|ios.zip)$/.test(resourceName2)) {
          formObj2.addResourceVersionDTOList[i] = {};
          formObj2.addResourceVersionDTOList[i].id = rootFile[i].id; //上传文件对应的id
          formObj2.addResourceVersionDTOList[i].fileName = rootFile[i].name; //源文件名collect.png
          formObj2.resourceSize = rootFile[i].size; //大小，应该取平均值
        } else if (/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(resourceName2)) {
          formObj2.thumbnailName = rootFile[i].name; //缩略图名称
        } else {
          this.$message.error(
            "模型资源类型只能是图片或者android.zip/ios.zip格式"
          );
          return;
        }
      }

      for (var i = 0; i < 3; i++) {
        var formObj = {}; //用于列表渲染
        if (i == 0) {
          formObj.index = index;
          formObj2.index = index;
          formObj2.resourceName = resourceName; //源文件名collect.png
          formObj.resourceName = resourceName; //源文件名collect.png
        }
        if (!!rootFile[i]) {
          formObj.tempIndex = index;
          formObj.resourceType = 1; //资源类型为模型
          formObj.id = rootFile[i].id; //上传文件对应的id
          formObj.editeFlag = false; //默认不编辑状态
          formObj.fileName = rootFile[i].name; //源文件名collect.png
          formObj.progress = 0; //进度条
          formObj.color = "#409EFF;"; //进度条
          var resourceSize = rootFile[i].size; //大小
          if (resourceSize < 104857) {
            //小于0.1M
            formObj.resourceSize = (rootFile[i].size / 1024).toFixed(0) + `KB`; //大小
          } else {
            formObj.resourceSize =
              (rootFile[i].size / 1024 / 1024).toFixed(1) + `M`; //大小
          }
          formObj.resourceReferenceIds = []; //空
          // 列表添加一组文件对象
          that.tableData.push(formObj);
        } else {
          //if(!rootFile[i])
          that.tableData.push({ tempIndex: index });
        }
      } //for end
      that.ARList.push(formObj2);
    },

    // 单文件上传数据处理
    submitted3(rootFile) {
      //文件添加到上传队列时触发--AR资源
      var that = this;
      var tempIndex = this.tempIndex;
      var tempTableIndex = this.tempTableIndex;
      var resourceName = rootFile[0].name; //源文件名collect.png
      var resourceName2 = rootFile[0].name; //源文件名collect.png
      that.ARList.findIndex(function(value, index, arr) {
        if (value.index == tempIndex) {
          if (/_(android.zip|ios.zip)$/.test(resourceName2)) {
            var addResourceObj = {};
            addResourceObj.id = rootFile[0].id; //上传文件对应的id
            addResourceObj.fileName = rootFile[0].name; //源文件名collect.png
            value.addResourceVersionDTOList.push(addResourceObj);
            value.resourceSize = rootFile[0].size; //大小，应该取平均值
          } else if (/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(resourceName2)) {
            value.thumbnailName = rootFile[0].name; //缩略图名称
          } else {
            this.$message.error(
              "模型资源类型只能是图片或者android.zip/ios.zip格式"
            );
          }
        }
      });
      var tempTableObj = {};
      tempTableObj.tempIndex = tempIndex;
      // // that.tableData[tempTableIndex].resourceName = resourceName;//源文件名collect.png
      // //  if (!!rootFile[0]) {
      tempTableObj.resourceType = 1; //资源类型为模型
      tempTableObj.id = rootFile[0].id; //上传文件对应的id
      tempTableObj.editeFlag = false; //默认不编辑状态
      tempTableObj.fileName = rootFile[0].name; //源文件名collect.png
      tempTableObj.progress = 0; //进度条
      tempTableObj.color = "#409EFF;"; //进度条
      var resourceSize = rootFile[0].size; //大小
      if (resourceSize < 104857) {
        //小于0.1M
        tempTableObj.resourceSize = (rootFile[0].size / 1024).toFixed(0) + `KB`; //大小
      } else {
        tempTableObj.resourceSize =
          (rootFile[0].size / 1024 / 1024).toFixed(1) + `M`; //大小
      }
      tempTableObj.resourceReferenceIds = []; //空
      // 列表添加一组文件对象

      that.tableData[tempTableIndex] = tempTableObj;
      that.tempTableObj = tempTableObj;
    },
    onFileProgress(rootFile) {
      //上传进度状态调用
      var that = this;
      that.tableData.findIndex(function(value, index, arr) {
        if (value.id == rootFile.id) {
          //进度条
          value.progress = rootFile._prevProgress.toFixed(0) * 100;
        }
      });
      that.$forceUpdate(); //强制渲染

      that._prevProgress = rootFile._prevProgress; //储存进度条的进度变量
    },
    onFileProgress3(rootFile) {
      //上传进度状态调用
      var that = this;
      that.tableData.splice(that.tempTableIndex, 1, that.tempTableObj);

      that.tableData.findIndex(function(value, index, arr) {
        if (value.id == rootFile.id) {
          //进度条
          value.progress = rootFile._prevProgress.toFixed(0) * 100;
        }
      });
      that.$forceUpdate(); //强制渲染
    },
    onFileSuccess(rootFile, file, message, chunk) {
      //上传成功调用
      var that = this;
      // 存储为对象
      that.addResourceRequestList.findIndex(function(value, index, arr) {
        if (value.id == rootFile.id) {
          var resourcePath = JSON.parse(message).data;
          value.addResourceVersionDTOList[0].resourcePath = resourcePath;
        }
      });
    },

    onFileSuccess2(rootFile, file, message, chunk) {
      //上传成功——AR资源调用
      var that = this;
      // 存储为对象
      var ARList = that.ARList;
      if (that.verifyType(rootFile.name) == 1) {
        //模型资源路径保存
        ARList[ARList.length - 1].addResourceVersionDTOList.findIndex(function(
          value,
          index,
          arr
        ) {
          if (value.id == rootFile.id) {
            var resourcePath = JSON.parse(message).data;
            value.resourcePath = resourcePath;
          }
        });
      } else if (that.verifyType(rootFile.name) == 2) {
        //缩略图路径保存
        var resourcePath = JSON.parse(message).data;
        ARList[ARList.length - 1].thumbnailPath = resourcePath;
      }

      that.tableData.findIndex(function(value, index, arr) {
        if (value.id == rootFile.id) {
          //进度条
          value.progress = rootFile._prevProgress.toFixed(0) * 100;
        }
      });
      that.$forceUpdate(); //强制渲染
      that.$forceUpdate(); //强制渲染
      that.$refs.uploadmodel.fileRemoved();
    },

    fileRemoved(file) {
      this.files = this.uploader.files;
      this.fileList = this.uploader.fileList;
    },
    onFileError() {
      //上传错误处理方法
    },
    onFileError2() {
      //上传错误处理方法
    },
    removeFiles(files) {
      //移除文件
      this.files = this.uploader.files;
      this.fileList = this.uploader.fileList;
    },

    //保存数据接口
    saveFiles() {
      var that = this;
      if (that._prevProgress !== 1) {
        //资料上传结束前不允许保存
        that.$message.error("资料正在上传");
        return;
      }

      // 对AR资源数据进行处理
      var ARList = that.ARList;
      //判断是否上传获取到上传路径之后才能按保存操作

      for (let i = 0; i < ARList.length; i++) {
        var addResourceVersionDTOList = ARList[i].addResourceVersionDTOList;
        if (ARList[i].addResourceVersionDTOList.length !== 2) {
          this.$message.error(
            "一份AR模型资源必须是包含一个android.zip文件和一个ios.zip文件"
          );
          return;
        }
        var androidNum = 0;
        var iosNum = 0;
        for (let j = 0; j < addResourceVersionDTOList.length; j++) {
          delete addResourceVersionDTOList[j].id; //删除id属性
          // 验证安卓和ios资源啊数目
          if (that.verifyAndroid(addResourceVersionDTOList[j].fileName)) {
            androidNum++;
          } else if (that.verifyIOS(addResourceVersionDTOList[j].fileName)) {
            iosNum++;
          }
        } //for end
        if (androidNum !== 1 || androidNum !== 1) {
          this.$message.error("一份模型资源只能为一个android和一个ios文件");
          return;
        }
      } //for end

      // 对普通资源数据进行处理
      var addResourceRequestList = that.addResourceRequestList;
      for (let i = 0; i < addResourceRequestList.length; i++) {
        delete addResourceRequestList[i].id; //删除id属性
      }

      // 资源数据合并
      var addResourceRequestList2 = that.addResourceRequestList2;
      addResourceRequestList2 = addResourceRequestList2
        .concat(addResourceRequestList)
        .concat(ARList);
      // 提交接口
      this.$axios({
        method: "post",
        url: that.addResourcePath,
        data: addResourceRequestList2
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          this.$message.success("保存成功!");
          that.tableData = [];
         that.addResourceRequestList=[];
         that.addResourceRequestList2=[];
          setTimeout(function() {
            that.$router.push("/resource");
          }, 300);
        } else if (result.data.returnCode === 50001) {
          alert("异常" + result.data.returnCode);
        } else {
        }
      });
    },
    handleEdit: function(index, row) {
      //遍历数组改变editeFlag
      this.tableData[index].editeFlag = true;
    },
    saveInput: function(index, row) {
      var that = this;
      //保存数据，向后台取数据
      if (row.resourceType == 1) {
        //AR模型资源改名称
        var ARList = this.ARList;
        for (let i = 0, len = ARList.length; i < len; i++) {
          that.ARList[i].addResourceVersionDTOList.findIndex(function(
            value,
            index,
            arr
          ) {
            if (value.id == row.id) {
              //修改对应一行资源的名称
              that.ARList[i].resourceName = row.resourceName;
            }
          });
        }
      } else {
        //赋值给上传列表的resourceName
        this.addResourceRequestList.findIndex(function(value, index, arr) {
          if (value.id == row.id) {
            //修改对应一行资源的名称
            value.resourceName = row.resourceName;
          }
        });
      }
      this.tableData[index].editeFlag = false;
    },
    //验证android.zip的数目
    verifyAndroid(getType) {
      if (/_(android.zip)$/.test(getType)) {
        return 1;
      }
    },
    //验证ios.zip的数目
    verifyIOS(getType) {
      if (/_(ios.zip)$/.test(getType)) {
        return 1;
      }
    },
    //验证资源类型
    verifyType(getType) {
      var getType = getType.toLowerCase(); //转成小写字母
      if (
        /.(mp4|rmvb|avi|ts|rm|flv|3gp|mov|asf|mpeg|wmv|navi|mkv|f4v)$/.test(
          getType
        )
      ) {
        return 0;
      } else if (/_(android.zip|ios.zip)$/.test(getType)) {
        return 1;
      } else if (/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(getType)) {
        return 2;
      } else if (/.(ppt|pptx)$/.test(getType)) {
        return 3;
      } else if (/.(doc|docx|txt|pdf|html|md|xls|xlsx)$/.test(getType)) {
        return 4;
      } else if (
        /.(mp3|cda|WAV|ape|flac|acc|midi|wma|ra|rm|ram|rmx|vqf|wave|mod|md|ogg|rtp|atf|au|aac)$/.test(
          getType
        )
      ) {
        return 5;
      } else if (/.(swf|flv|f4v|fla)$/.test(getType)) {
        return 6;
      } else {
        return 7;
      }
    },
    // 删除资源功能
    delResourse(tableIndex, row) {
      var that = this;
      // 删除AR模型资源功能
      if (row.resourceType == 1) {
        var ARList = that.ARList;
        if (row.index) {
          //带有表格编号的一行的删除功能，删除一份资源数据
          this.tableData.splice(tableIndex, 3); //表格的删除
          for (let i = 0, len = ARList.length; i < len; i++) {
            ARList[i].addResourceVersionDTOList.findIndex(function(
              value,
              index,
              arr
            ) {
              if (value.id == row.id) {
                //修改对应一行资源的名称
                that.ARList.splice(i, 1);
              }
            });
          }
        } else {
          //不带有表格编号的行的删除功能
          that.tableData.splice(tableIndex, 1, { tempIndex: row.tempIndex }); //以空数组进行替换
          // 判断删除的资源是模型还是缩略图，如果删除模型时
          if (row.resourceType == 1) {
            for (let i = 0, len = ARList.length; i < len; i++) {
              that.ARList[i].addResourceVersionDTOList.findIndex(function(
                value,
                index,
                arr
              ) {
                if (value.id == row.id) {
                  //修改其中一份模型数据
                  arr.splice(index, 1);
                }
              });
            } //for end
          } else {
            //删除缩略图时，可以不做处理
          }
        } //不带有表格编号的行的删除功能--end
      } else {
        // 删除普通资源功能
        this.tableData.splice(tableIndex, 1);
        this.addResourceRequestList.findIndex(function(val, index, arr) {
          if (val.id == row.id) {
            that.addResourceRequestList.splice(index, 1); //删除指定的对象元素
          }
        });
      }
    },

    handleRemove2(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview2(file) {
      // console.log(file);
    },
    handleExceed2(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove2(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style scoped>
#global-uploader {
  /*float: right;*/
  background: rgba(255, 255, 255, 0);
  border: none;
}
.uploader-drop {
  position: relative;
  overflow: hidden;
  border: 0px solid #ccc;
  background-color: transparent;
  padding: 0 !important;
  transition: all 0.8s;
}
.uploader-item[data-v-d21e5422] {
  padding: 7px 16px;
}
.uploader-example {
  float: right;
  background: rgba(255, 255, 255, 0);
  padding: 15px;
  border: none !important;
  font-size: 12px;
  margin-top: -14px;
}
.uploader-example3 {
  width: 100px;
  background: rgba(255, 255, 255, 0);
  border: none !important;
  font-size: 12px;
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

.header-wrap {
  margin-bottom: 20px;
}

.header-label {
  display: block;
  float: left;
  width: 200px;
}

.menu-wrap {
  display: inline-block;
  float: right;
  margin-right: 120px;
  margin-bottom: 50px;
  margin-top: 30px;
}

.menu-wrap li {
  display: inline-block;
  float: left;
  text-decoration: none;
  margin-right: 20px;
}

.refrence .el-button {
  color: #999;
}
</style>