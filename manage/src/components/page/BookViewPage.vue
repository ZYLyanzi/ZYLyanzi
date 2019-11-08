<!-- 教材添加动图 -->
<template>
  <div class="view">
    <p class="text">封面动图支持jpg,png,bmp、视频、GIF、SWF等格式，宽高比建议为16:9。</p>
    <my-text :textList="textList" @deleteIndex="del" @uploadData="addTextList"></my-text>
    <div class="book_but_frame" @click="addFrame()">
      <i class="el-icon-plus"></i>
      <div class="button_save">
        <el-button type="primary" size="medium" @click.stop="bookSaveBanner()">保存</el-button>
      </div>
    </div>
    <child ref="mychild"></child>
  </div>
</template>
<script>
import mytext from "./BookView.vue";
import BookView from "./BookView.vue";
export default {
  name: "parent",
  components: {
    child: BookView,
    "my-text": mytext
  },
  data() {
    return {
      textList: [],
      textList2: [],
      items: "",
      addText: "",
      dfsServer: "" // dfs访问前缀地址
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
  },
  mounted() {
    this.bookListBanner();
  },
  methods: {
    //获取最新的列表数据
    addTextList(val) {
      var newTextList = val.data;
      this.textList2 = newTextList;
    },
    //动图列表
    bookListBanner() {
      var that = this;
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/architecture/banner/listBanner",
        data: {
          tenantId: that.$route.query.textbookId //教材ID
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          var tableData = result.data.data;
          that.textList = tableData;
          if (!!tableData) {
            for (var i = 0; i < tableData.length; i++) {
              var fileArray = [
                { name: "", url: that.dfsServer + tableData[i].filePath }
              ];
              that.textList[i].fileArray = fileArray;
              that.textList[i].uploadDisabled = true;
            }
            if (!!that.textList[0]) {
              if (!!that.textList[0].filePath) {
                // 父组件触发子组件方法进行当前列表动图隐藏。
                that.$refs.mychild.fileChange(that.textList[0].fileArray, "");
              }
            }
          }
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
    exchaneTextList(textList) {
      //转换列表数据
      var that = this;
      var newTextList = [];
      for (var i = 0; i < this.textList.length; i++) {
        newTextList[i] = {};
        newTextList[i].bannerId = textList[i].bannerId;
        newTextList[i].filePath = textList[i].filePath;
        newTextList[i].resourceName = textList[i].resourceName;
        newTextList[i].openStatus = textList[i].openStatus;
        newTextList[i].resourceId = textList[i].resourceId;
        newTextList[i].tenantId = that.$route.query.textbookId;
        newTextList[i].textbookId = textList[i].textbookId;
        newTextList[i].type = textList[i].type;
      }
      return newTextList;
    },
    //保存动图
    bookSaveBanner() {
      var that = this;
      var textList = that.textList2;
      if (!textList.length) {
        this.$message.error("请上传数据!");
        return false;
      }
      //校验状态,图片,资源名称 (资源名称与状态定义默认值)
      for (var i = 0; i < textList.length; i++) {
        if (!that.textList[i].filePath || that.textList[i].filePath === null) {
          this.$message.error("包含未上传封面动图!");
          return;
        }
        if (!that.textList[i].resourceName || that.textList[i].resourceName === null) {
          this.$message.error("包含教材资源未选择!");
          return;
        }
      }
      var resultList = this.exchaneTextList(textList);
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/architecture/banner/addBanner",
        data: resultList
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          this.$message.success("保存成功!");
          this.bookListBanner();
        } else if (result.data.returnCode === 50001) {
          console.log(result.data.returnCode);
          alert("异常" + result.data.returnCode);
        } else {
          console.log(result.data.returnCode);
          alert(result.data.returnCode);
        }
      });
    },
    //添加事件框
    addFrame() {
      this.textList.push({
        bannerId: null, // 添加时没有就传空
        openStatus: 0, //开启状态：0开启，1关闭
        filePath: null, //Banner图路径
        type: 0, //banner类型（0资源，1教材，2外部链接）
        textbookId: null,
        resourceId: null, //资源ID
        tenantId: this.textList.textbookId, //首页banner传tenantId，教材详情banner传textbookId
        uploadDisabled: false
      });
    },
    //删除事件框
    del: function(index) {
      if (index + 1 !== 0) {
        this.textList.splice(index, 1);
      }
    }
  }
};
</script>

<style>
.book_but_frame .button_save {
  position: absolute;
  margin-top: -130px;
  margin-left: 305px;
}

.book_but_frame--el-icon-plus {
  margin: 50px 0px 0px 0px;
}

.book_but_frame {
  font-size: 38px;
  color: #8c939d;
  margin: 0px 0px 1px 0px;
  text-align: center;
  line-height: 223px;
  width: 270px;
  height: 230px;
  border: 1px solid rgb(202, 202, 202);
  padding: 0px 0px 0px 10px;
  float: left;
  margin-left: 20px;
  margin-top: 17px;
}

.text {
  font-family: "微软雅黑";
  letter-spacing: 1pt; /*字间距离*/
  font-size: xx-small;
  color: cadetblue;
}
</style>
