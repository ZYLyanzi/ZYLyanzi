<!-- 首页Banner -->
<template>
  <!-- 添加首页Banner -->
  <div class="view">
    <div>
      <p class="basucs_p">
        <i class="el-icon-warning"></i>共上传了{{this.count}}个首页轮播图,
        banner支持jpg,png,bmp等格式,宽高比建议为16:9
        <el-button class="butAddView" type="primary" size="medium" @click="addFrame()">添加</el-button>
        <el-button
          class="butAddView"
          type="primary"
          size="medium"
          @click.stop="homePageSaveBanner()"
        >保存</el-button>
      </p>
    </div>
    <my-text :textList="textList" @deleteIndex="del" @uploadData="addTextList"></my-text>
    <child ref="mychild"></child>
  </div>
</template>
<script>
import mytext from "./BasicsSetUpBanner.vue";
import BasicsSetUpBanner from "./BasicsSetUpBanner.vue";
export default {
  name: "parent",
  //调用子组件定义
  components: {
    child: BasicsSetUpBanner,
    "my-text": mytext
  },
  data() {
    return {
      textList: [],
      count: 0, //计数
      items: "",
      addText: "",
      dfsServer: "", // dfs访问前缀地址
      tenantId: "" //租户ID
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
  mounted() {
    this.homePageBannerList();
  },
  methods: {
    //获取最新的列表数据
    addTextList(val) {
      var that = this;
      var newTextList = val.data;
      that.textList = newTextList;
    },
    //获取列表
    homePageBannerList() {
      var that = this;
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/architecture/banner/listBanner",
        data: {
          tenantId: that.tenantId
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          var tableData = result.data.data;
          this.count = tableData.length;
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
    //解析列表数据
    exchaneTextList(textList) {
      var that = this;
      var newTextList = [];
      for (var i = 0; i < this.textList.length; i++) {
        newTextList[i] = {};
        newTextList[i].bannerId = textList[i].bannerId;
        newTextList[i].filePath = textList[i].filePath;
        newTextList[i].linkAddress = textList[i].linkAddress;
        newTextList[i].openStatus = textList[i].openStatus;
        newTextList[i].resourceId = textList[i].resourceId;
        newTextList[i].textbookId = textList[i].textbookId;
        newTextList[i].tenantId = that.tenantId;
        newTextList[i].resourceName = textList[i].resourceName;
        newTextList[i].textbookName = textList[i].textbookName;
        newTextList[i].type = textList[i].type;
      }
      return newTextList;
    },
    //保存
    homePageSaveBanner() {
      var that = this;
      var textList = that.textList;
      if (!textList.length) {
        this.$message.error("请添加上传数据");
        return false;
      }
      //校验图片(允许资源，教材，链接不选)
      for (var i = 0; i < textList.length; i++) {
        if (!that.textList[i].filePath || that.textList[i].filePath === null) {
          this.$message.error("包含未上传轮播动图!");
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
          this.homePageBannerList();
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
        textbookId: null, //教材ID
        linkAddress: null, //外部链接
        openStatus: 0, //开启状态：0开启，1关闭
        filePath: null, //Banner图路径
        type: 0, //banner类型（0资源，1教材，2外部链接）
        resourceId: null, //资源ID
        tenantId: this.textList.tenantId, //首页banner传tenantId，教材详情banner传textbookId
        uploadDisabled: false //隐藏
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
.but_frame .button_save {
  position: absolute;
  margin-top: -130px;
  margin-left: 305px;
}

.but_frame--el-icon-plus {
  margin: 50px 0px 0px 0px;
}
.but_frame {
  font-size: 38px;
  color: #8c939d;
  margin: 0px 0px 1px 0px;
  text-align: center;
  line-height: 223px;
  width: 285px;
  height: 321px;
  border: 1px solid rgb(202, 202, 202);
  padding: 0px 0px 0px 10px;
  float: left;
  margin-left: 20px;
  margin-top: 17px;
}

.basucs_p {
  font-family: "微软雅黑";
  letter-spacing: 1pt; /*字间距离*/
  color: cadetblue;
  font-size: 20px;
}
.butAddView {
  padding: 4px 21px;
  font-size: 16px;
  border-radius: 18px;
  margin: 0px 10px 0px 30px;
}
</style>
