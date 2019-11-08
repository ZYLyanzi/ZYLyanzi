<!-- 系统首页 -->
<template>
  <div>
    <div class="dash_head">
      <img :src="imgUrl" class="user-avator" @error="imgError()" alt />
      <div class="user-info-cont">
        <div class="user-info-name">{{name}}</div>
        <div class="dash-role">{{role}}</div>
      </div>
      <div class="user-info-list">
        本次登录时间：
        <span>{{nowTime}}</span>
      </div>
      <div class="user-info-list-address">
        本次登录地点：
        <span>{{address}}</span>
      </div>
    </div>
    <div class="dash_headRow">
      <el-row :gutter="20">
        <!-- <el-col :span="17"> -->
        <el-row :gutter="24" class="mgb20">
          <el-col :span="6">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-lx-notice grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num_sign">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-4">
                <i class="el-icon-s-help grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num_sign">1234</div>
                  <div>App用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num_sign">5000</div>
                  <div>用户数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-order grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num_sign">5000</div>
                  <div>教材数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- </el-col> -->
      </el-row>
    </div>
  </div>
</template>

<script>
import Schart from "vue-schart";
import bus from "../common/bus";
import { setInterval } from "timers";
export default {
  name: "dashboard",
  data() {
    return {
      name: localStorage.getItem("ms_username"),
      dfsServer: "",
      userId: "",
      smsServer: "", //正式环境,赛名师服务器地址前缀
      imgUrl: "",
      nowTime: "",
      address: "深圳",
      options2: {
        fillColor: "#FC6FA1",
        axisColor: "#008ACD"
      }
    };
  },
  components: {
    Schart
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  },
  created() {
    this.nowTimes();
    //调用全局
    this.$store.commit("user");
    if (localStorage.getItem("imgUrl")) {
      this.imgUrl = localStorage.getItem("imgUrl");
    } else {
      this.imgUrl = this.$store.state.imgUrl;
    }
    if (localStorage.getItem("dfsServer")) {
      this.dfsServer = localStorage.getItem("dfsServer");
    } else {
      this.dfsServer = this.$store.state.dfsServer;
    }
    if (localStorage.getItem("smsServer")) {
      this.smsServer = localStorage.getItem("smsServer");
    } else {
      this.dfsServer = this.$store.state.smsServer;
    }
    if (localStorage.getItem("userId")) {
      this.userId = localStorage.getItem("userId");
    } else {
      this.userId = this.$store.state.userId;
    }
  },
  activated() {},
  methods: {
    //图片没有加载出来，显示默认图片
    imgError() {
      this.imgUrl = require("../../assets/img/logo-default-img.jpg");
    },
    // 获取当前时间函数
    timeFormate(timeStamp) {
      let year = timeStamp.getFullYear();
      let month =
        timeStamp.getMonth() + 1 < 10
          ? "0" + (timeStamp.getMonth() + 1)
          : timeStamp.getMonth() + 1;
      let date =
        timeStamp.getDate() < 10
          ? "0" + timeStamp.getDate()
          : timeStamp.getDate();
      let hh =
        timeStamp.getHours() < 10
          ? "0" + timeStamp.getHours()
          : timeStamp.getHours();
      let mm =
        timeStamp.getMinutes() < 10
          ? "0" + timeStamp.getMinutes()
          : timeStamp.getMinutes();
      let ss =
        timeStamp.getSeconds() < 10
          ? "0" + timeStamp.getSeconds()
          : timeStamp.getSeconds();
      this.nowTime =
        year +
        "年" +
        month +
        "月" +
        date +
        "日" +
        " " +
        hh +
        ":" +
        mm +
        ":" +
        ss;
    },
    // 定时器函数
    nowTimes() {
      var that = this;
      that.timeFormate(new Date());
      this.timer = setInterval(function() {
        var newTime = new Date();
        that.timeFormate(newTime);
      }, 1000);
    },
    clear() {
      var that = this;
      clearInterval(this.timer);
    }
  }
};
</script>


<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num_sign {
  font-size: 30px;
  font-weight: bold;
}

.mgb20 .grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num_sign {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num_sign {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num_sign {
  color: rgb(242, 94, 67);
}

.grid-con-4 .grid-con-icon {
  background: rgb(162, 209, 51);
}

.grid-con-4 .grid-num_sign {
  color: rgb(162, 209, 51);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin: 12px 0px 12px 12px;
}

.user-info-cont {
  padding-left: 175px;
  flex: 1;
  font-size: 14px;
  color: #999;
  margin: -115px 0px 0px -6px;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 15px;
  color: #999;
  margin: 15px 0px 0px 169px;
}
.user-info-list-address {
  font-size: 15px;
  color: #999;
  margin: -19px 0px -30px 562px;
}
.user-info-list span {
  margin-left: 50px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.schart {
  width: 100%;
  height: 300px;
}
.dash-role {
  margin: -28px 0px 11px 160px;
  height: 20px;
  width: 105px;
  border: 1px solid;
  border-radius: 5px;
  text-align: center;
}
.dash_head {
  height: 153px;
  width: 99%;
  margin: 5px 0px 30px 13px;
  background-color: rgb(229, 236, 240);
}
.dash_headRow {
  margin: 0px 0px 30px 12px;
}
</style>
