<!-- 教材表单 -->
<template>
  <div>
    <div class="form-box">
      <!-- 表单start disabled="disabled"-->
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-row :gutter="150" style="width:980px;">
          <el-col class="book-el-col" :span="12">
            <el-form-item label="教材标题" prop="name">
              <el-input v-model="form.name" style="width:320px" placeholder="必填项,长度1~20字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="book-el-col" :span="12">
            <el-form-item label="分类" prop="categoryId">
              <el-cascader
                :options="optionsCategory"
                v-model="form.categoryId"
                style="width:320px"
                :props="optionProps"
              >
                <template slot-scope="{ node, data }">
                  <span>{{ data.name }}</span>
                  <span v-if="!node.isLeaf">({{ data.listCategoryResponseList.length }})</span>
                </template>
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 出版时间 -->
        <el-row :gutter="150" style="width:980px;">
          <el-col class="book-el-col" :span="12">
            <el-form-item label="出版时间" prop="publishDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                v-model="form.publishDate"
                style="width:323px"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="book-el-col" :span="12">
            <el-form-item label="教材标签">
              <el-select v-model="labelDTOListValue" multiple placeholder="请选择" style="width:320px">
                <el-option-group
                  v-for="group in labelDTOList"
                  :key="group.labelGroupId"
                  :label="group.name"
                >
                  <el-option
                    v-for="item in group.labelDTOList"
                    :key="item.labelId"
                    :label="item.name"
                    :value="item.labelId"
                  ></el-option>
                </el-option-group>
              </el-select>
              <div class="el-info-selectLabel">最多可关联20个标签</div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 教材封面  this.$store.state.baseUrl + base -->
        <el-row :gutter="150" style="width:980px;">
          <el-col class="book-el-col" :span="12">
            <el-form-item label="教材封面" prop="filePathUrl" ref="filePathUrl">
              <el-upload
                :action="base"
                multiple
                accept="image/png, image/jpeg"
                list-type="picture-card"
                :class="{disabled:uploadDisabled}"
                :file-list="editFiles"
                :before-upload="beforeUploadPicture"
                :on-preview="handlePictureCardPreview"
                :on-progress="uploadProgress"
                :on-remove="handleRemove"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :show-file-list="true"
              >
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">*支持jpg/png,建议图片大小不超过10MB</div>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col class="book-el-col" :span="12">
            <el-form-item label="作者" prop="author">
              <el-input v-model="form.author" style="width:320px" placeholder="必填项,长度1~20字符"></el-input>
            </el-form-item>
            <el-form-item label="主编" prop="chiefEditor">
              <el-input v-model="form.chiefEditor" style="width:320px" placeholder="长度不超过20字符"></el-input>
            </el-form-item>
            <el-form-item label="参编" prop="coedit">
              <el-input v-model="form.coedit" style="width:320px" placeholder="长度不超过20字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="150" style="width:980px;">
          <el-col class="book-el-col" :span="12">
            <el-form-item label="出版社" prop="publishHouse">
              <el-input v-model="form.publishHouse" style="width:325px" placeholder="长度不超过20字符"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="book-el-col" :span="12">
            <el-form-item label="副主编" prop="associateEditor">
              <el-input v-model="form.associateEditor" style="width:320px" placeholder="长度不超过20字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="150" style="width:980px;">
          <el-col class="book-el-col" :span="12">
            <el-form-item label="教材简介" prop="description">
              <div class="bookTextarea">
                <el-input
                  style="width:325px"
                  type="textarea"
                  :rows="5"
                  placeholder="必填项,长度1~500字符"
                  v-model="form.description"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col class="book-el-col" :span="12">
            <el-form-item label="ISBN" prop="isbn">
              <el-input
                v-model="form.isbn"
                placeholder="必填项纯数字,ISBN不能超过13位,"
                class="innerbox"
                style="width:320px"
                type="number"
                onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="infoForm">
          <el-button type="primary" @click="bookSave('form')">表单提交</el-button>
          <el-button @click="goBack">取消</el-button>
        </div>
      </el-form>
    </div>

    <!-- 教材URL this.$router.push("bookInfo");-->
    <el-dialog class="preview-modal" :visible.sync="imgVisible" append-to-body>
      <img width="100%" :src="filePath" alt="filePathUrl" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data: function() {
    //教材名称
    const regularBookName = (rule, value, callback) => {
      //支持中文、字母、数字,长度1~20字符
      // const regularTagName = /^([\u4e00-\u9fa5\a-zA-Z0-9]){1,20}$/gi;
      //长度1~20字符(需求改变)
      const regularTagName = /^.{1,20}$/;
      if (!regularTagName.test(value)) {
        callback(new Error("教材名称不能超过20位"));
      } else {
        callback();
      }
    };
    //ISBN
    const regularIsNum = (rule, value, callback) => {
      const age = /^[0-9]{1,13}$/;
      if (!age.test(value)) {
        callback(new Error("必填项,ISBN值不能超过13位"));
      } else {
        callback();
      }
    };
    //作者名称
    const regularAuthor = (rule, value, callback) => {
      const regularTagAuthor = /^.{1,20}$/;
      if (!regularTagAuthor.test(value)) {
        callback(new Error("作者名称不能超过20位"));
      } else {
        callback();
      }
    };
    //出版社
    const regularPublishHouse = (rule, value, callback) => {
      const regularTagPublishHouse = /^.{0,20}$/;
      if (!regularTagPublishHouse.test(value)) {
        callback(new Error("出版社名称不能超过20位"));
      } else {
        callback();
      }
    };
    //主编
    const regularChiefEditor = (rule, value, callback) => {
      const regularTagChiefEditor = /^.{0,20}$/;
      if (!regularTagChiefEditor.test(value)) {
        callback(new Error("主编名称不能超过20位"));
      } else {
        callback();
      }
    };
    //参编
    const regularCoedit = (rule, value, callback) => {
      const regularTagCoedit = /^.{0,20}$/;
      if (!regularTagCoedit.test(value)) {
        callback(new Error("参编名称不能超过20位"));
      } else {
        callback();
      }
    };
    //副主编
    const regularAssociateEditor = (rule, value, callback) => {
      const regularTagAssociateEditor = /^.{0,20}$/;
      if (!regularTagAssociateEditor.test(value)) {
        callback(new Error("副主编名称不能超过20位"));
      } else {
        callback();
      }
    };
    //教材简介
    const regularDescription = (rule, value, callback) => {
      const regularTagDescription = /^.{1,500}$/;
      if (!regularTagDescription.test(value)) {
        callback(new Error("必填项,教材简介内容不能超过500位"));
      } else {
        callback();
      }
    };
    return {
      // 字段校验
      rules: {
        //名称
        name: [
          { required: true, message: "请输入教材名称", trigger: "blur" },
          { validator: regularBookName, trigger: "blur" }
        ],
        //idbn
        isbn: [
          { required: true, message: "请输入正确的ISBN值", trigger: "blur" },
          { validator: regularIsNum, trigger: "blur" }
        ],
        //作者
        author: [
          { required: true, message: "请输入作者名称", trigger: "blur" },
          { validator: regularAuthor, trigger: "blur" }
        ],
        //出版社
        publishHouse: [
          // { required: true, message: "请输入出版社名称", trigger: "blur" },
          { validator: regularPublishHouse, trigger: "blur" }
        ],
        //分类
        categoryId: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ],
        //出版时间
        publishDate: [
          { required: true, message: "请输入出版时间", trigger: "blur" }
        ],
        //主编
        chiefEditor: [
          // { required: true, message: "请输入主编名称", trigger: "blur" },
          { validator: regularChiefEditor, trigger: "blur" }
        ],
        //参编
        coedit: [
          // { required: true, message: "请输入参编名称", trigger: "blur" },
          { validator: regularCoedit, trigger: "blur" }
        ],
        //副主编
        associateEditor: [
          // { required: true, message: "请输入副主编名称", trigger: "blur" },
          { validator: regularAssociateEditor, trigger: "blur" }
        ],
        //教材简介
        description: [
          { required: true, message: "请输入教材简介内容", trigger: "blur" },
          { validator: regularDescription, trigger: "blur" }
        ]
      },
      children: [],
      tenantId: null, //租户ID
      uploadComplete: true, // 图片上传完成状态
      imgVisible: false, // 上传图片预览框
      filePath: null, //图片预览,教材封面
      filePathUrl: null, //文件路径地址
      base: this.$store.state.baseUrl + this.$store.state.uploadFileUrl, //请求前缀+后缀地址
      dfsServer: null, // dfs访问前缀地址
      uploadDisabled: false, //upload隐藏上传框
      publishDate: null,
      editFiles: [], // 编辑时已上传图片初始化
      //分类
      //指定选项的值为选项对象的某个属性值 listCategoryResponseList
      optionProps: {
        value: "categoryId",
        label: "name",
        children: "listCategoryResponseList"
      },
      optionsCategory: [],
      //资源标签
      labelDTOList: [],
      labelDTOListValue: [],
      form: {
        name: null, //教材名称
        isbn: null, //isbn
        filePathUrl: null //教材封面验证
      }
    };
  },
  created() {
    //调用全局
    this.$store.commit("user");
    if (localStorage.getItem("dfsServer")) {
      this.dfsServer = localStorage.getItem("dfsServer");
    } else {
      this.dfsServer = this.$store.state.dfsServer;
    }
    if (localStorage.getItem("tenantId")) {
      this.tenantId = localStorage.getItem("tenantId");
    } else {
      this.tenantId = this.$store.state.tenantId;
    }
  },
  computed: {},
  mounted() {
    this.getTextbook(); //表单信息
    this.listLabelGroupAndLabel(); //资源组信息
    this.listCategory(); //分类列表
  },
  methods: {
    goBack() {
      //取消:1.需要知道当前标签的index位置,关闭bookCommon小标签。
      this.$router.push("/bookInfo");
      // this.$router.go(-1);
    },
    handleClick(tab, event) {
      console.log("tab:" + tab, "event:" + event);
    },
    //格式化Sat Oct 14 2017 00:00:00 GMT+0800 (中国标准时间) 为正常时间
    formartDate(inputTime) {
      //转换日期格式yyyy-MM-dd HH:mm:ss
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
    // 上传图片前调用方法
    beforeUploadPicture(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isLt2M;
    },
    // 上传图片时调用
    uploadProgress(event, file, fileList) {
      this.uploadComplete = false;
    },
    // 上传图片成功
    uploadSuccess(res, file, fileList) {
      //访问图片: 前缀+filePath
      this.form.filePath = res.data;
      this.uploadComplete = true;
      this.fileChange(fileList);
    },
    // 上传图片出错
    uploadError(err, file, fileList) {
      this.$message.error("上传出错");
    },
    // 移除图片
    handleRemove(file, fileList) {
      //需求明确,在做文件服务删除。
      var that = this;
      that.form.filePath = null;
      that.fileChange(fileList)
      this.$message.success("教材封面移除!");
      that.$forceUpdate();
      /*       this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + that.$store.state.delFile,
        data: {
          fileId: that.form.filePath //文件ID
        }
      })
        .then(result => {
          if (result.data.returnMsg === "请求成功") {
            this.fileChange(fileList);
            that.form.filePath = null;
            this.$message.success("教材封面移除!");
          } else if (result.data.returnCode === 50001) {
            console.log(result.data.returnCode);
            alert("异常" + result.data.returnCode);
          } else {
            console.log(result.data.returnMsg);
            alert(result.data.returnMsg);
          }
        })
        .catch(reject => {
          console.log(reject);
        }); */
    },
    // 图片预览 1920*1080 效果展示
    handlePictureCardPreview(file) {
      this.filePath = file.url;
      this.imgVisible = true;
    },
    // 设置filePathImg值,当上传图片大于0时进行隐藏。
    // 同时触发disabled .el-upload--picture-card。
    fileChange(fileList) {
      if (fileList.length > 0) {
        this.uploadDisabled = true;
      } else {
        this.uploadDisabled = false;
      }
    },
    //分类列表
    listCategory() {
      var that = this;
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/architecture/category/listCategory",
        data: {
          //类型：0教材分类列表  1资源分类列表
          type: 0,
          tenantId: that.tenantId
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          that.optionsCategory = result.data.data;
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
    //教材标签(标签组和标签列表)
    listLabelGroupAndLabel() {
      var that = this;
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl +
          "/architecture/label/listLabelGroupAndLabel",
        data: {
          //用于：0教材列表，1:资源列表，2用户列表(单选)
          useOn: 0,
          tenantId: that.tenantId
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          that.labelDTOList = result.data.data;
          /*  this.labelDTOList.map(item => {
            that.labelIds += item.labelDTOList[0].labelId + ",";
          });
          if (that.labelIds.length > 0) {
            that.labelIds = that.labelIds.substr(0, that.labelIds.length - 1);
          } */
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
    //新增教材--> 教材表单(获取)
    getTextbook() {
      var that = this;
      this.$axios({
        method: "get",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/textbook/getTextbookDetails",
        params: {
          textbookId: that.$route.query.textbookId
        }
      })
        .then(result => {
          if (result.data.returnMsg === "请求成功") {
            var data = result.data.data;
            if (!!data.categoryId) {
              that.categoryId = data.categoryId.split();
            }
            if (!!data.labelIds) {
              that.labelDTOListValue = data.labelIds.split(",");
            }
            that.form = data;
            if (!!data.filePath) {
              //图片
              that.editFiles = [
                { name: "", url: that.dfsServer + data.filePath }
              ];
              //隐藏事件调用
              this.fileChange(that.editFiles);
            }
          } else if (result.data.returnCode === 50001) {
            console.log(result.data.returnCode);
            alert("服务端异常, 请联系开发人员！");
          } else {
            console.log(result.data.returnCode);
            alert("获取数据失败");
          }
        })
        .catch(reject => {
          console.log(reject);
        });
    },
    //新增教材--> 教材表单(新增+编辑)
    bookSave(formName) {
      var that = this;
      if (that.labelDTOListValue != null) {
        if (that.labelDTOListValue.length > 20) {
          that.$message.error(
            "已经添加" + that.labelDTOListValue.length + "个标签!"
          );
          return;
        }
      }
      if (!that.uploadComplete) {
        this.$message.error("图片正在上传，请稍等");
        return;
      }
      if (!that.form.filePath || that.form.filePath === null) {
        this.$message.error("必须上传教材封面");
        return;
      }
      var categoryId = null;
      that.$refs[formName].validate(valid => {
        //校验的同时,取最后一位。
        if (that.form.categoryId.splice != null) {
          if (that.form.categoryId.length > 1) {
            categoryId = that.form.categoryId[that.form.categoryId.length - 1];
          } else if (that.form.categoryId.length == 1) {
            categoryId = that.form.categoryId[0];
          }
        }
        if (valid) {
          this.$axios({
            method: "post",
            url:
              that.$store.state.baseUrl + "/ar-textbook/textbook/editTextbook",
            data: {
              textbookId: that.$route.query.textbookId, //教材ID*
              name: that.form.name, //教材标题*
              filePath: that.form.filePath, //教材封面*
              publishDate: that.formartDate(that.form.publishDate), //出版时间*
              publishHouse: that.form.publishHouse, //出版社*
              description: that.form.description, //教材简介*
              isbn: Number(that.form.isbn), //ISBN*
              author: that.form.author, //作者*
              chiefEditor: that.form.chiefEditor, //主编*
              coedit: that.form.coedit, //参编*
              associateEditor: that.form.associateEditor, //副主编*
              publishStatus: 0, //发布状态 默认为0
              categoryId: categoryId, //分类*(数组最后的元素)
              labelIds: that.labelDTOListValue.toString() //标签(已切换字符串)
            }
          })
            .then(result => {
              if (result.data.returnMsg === "请求成功") {
                /* this.dialogFormVisible = false; */
                /* this.$router.push("bookInfo"); */
                this.$message.success("提交成功!");
              } else if (result.data.returnCode === 50001) {
                console.log(result.data.returnCode);
                alert("异常" + result.data.returnCode);
              } else {
                console.log(result.data.returnCode);
                alert(result.data.returnCode);
              }
            })
            .catch(reject => {
              console.log(reject);
            });
        } else {
          console.log("error validate submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
.form-box {
  margin: 10px 0px 37px 23px;
  width: 100%;
}
.book-el-col {
  float: left;
  box-sizing: border-box;
  margin: 0px -102px 7px 3px;
}
.book_form_right {
  float: right;
  width: 100px;
  height: 100px;
}
.el-upload__tip {
  color: rgb(224, 24, 67);
}
.disabled .el-upload--picture-card {
  display: none;
}
.form-box .el-col-12 {
  width: 60%;
}
.el-info-selectLabel {
  color: rgb(137, 144, 146);
  font-size: 12px;
}
.infoForm {
  padding: 20px 0px 0px 8px;
}
</style>
