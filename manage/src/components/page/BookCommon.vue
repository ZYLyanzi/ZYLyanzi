<!-- 选项卡公共页面 -->
<template>
  <div>
    <div>
      <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
        <el-tab-pane label="教材表单" name="first">
          <div>
            <book-add-info v-if="this.activeName == 'first'"></book-add-info>
          </div>
        </el-tab-pane>
        <el-tab-pane label="教材章节" name="second">
          <div>
            <book-chapter v-if="this.activeName == 'second'"></book-chapter>
          </div>
        </el-tab-pane>
        <el-tab-pane label="相关推荐" name="third">
          <div>
            <book-setting v-if="this.activeName == 'third'"></book-setting>
          </div>
        </el-tab-pane>
        <el-tab-pane label="封面动图" name="fourth">
          <div>
            <book-view-page v-if="this.activeName == 'fourth'"></book-view-page>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { debuglog } from "util";
import bookAddInfo from "./BookAddInfo.vue";
import bookChapter from "./BookChapter.vue";
import bookSetting from "./BookSetting.vue";
import bookViewPage from "./BookViewPage.vue";

export default {
  data: function() {
    return {
      activeName: "first"
    };
  },
  components: {
    "book-add-info": bookAddInfo, //教材表单
    "book-chapter": bookChapter, //教材章节
    "book-setting": bookSetting, //相关推荐
    "book-view-page": bookViewPage //封面动图
  },
  created() {
    //钩子函数
  },
  methods: {
    handleClick() {}
  }
};
</script>

<style>
</style>