<style scoped>
  .rw-swipe{
    width: 100%;
    height: 3rem;
    background-color: #ffd705;
  }
  .line{
    color: #8e8e8e;
    font-size: 0.32rem;
    height: 0.9rem;
    line-height: 0.9rem;
  }
</style>
<template>
  <section>
    <mt-header title="商品详情">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="main">
      <mt-swipe :auto="3000" class="rw-swipe">
        <mt-swipe-item class="rw-swipe-item">新手教程1</mt-swipe-item>
        <mt-swipe-item class="rw-swipe-item">新手教程2</mt-swipe-item>
        <mt-swipe-item class="rw-swipe-item">新手教程3</mt-swipe-item>
      </mt-swipe>
      <div class="line">----------------任务列表---------------</div>

      <div class="list">
        <!--<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">-->
          <ul>
            <li>
              <div class="list-item" @click="toDetail(2)">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
                <div class="time">时间: 3/19-3/28</div>
                <div class="price">￥15</div>
              </span>
                <span class="btn">
                <mt-button plain type="danger" size="small">马上抢</mt-button>
              </span>
              </div>

            </li>
            <li>
              <div class="list-item">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
                <div class="time">时间: 3/19-3/28</div>
                <div class="price">￥15</div>
              </span>
                <span class="btn">
                <mt-button plain type="danger" size="small">马上抢</mt-button>
              </span>
              </div>
            </li>
            <li>
              <div class="list-item">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
                <div class="time">时间: 3/19-3/28</div>
                <div class="price">￥15</div>
              </span>
                <span class="btn">
                <mt-button plain type="danger" size="small">马上抢</mt-button>
              </span>
              </div>

            </li>
            <li>
              <div class="list-item">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
                <div class="time">时间: 3/19-3/28</div>
                <div class="price">￥15</div>
              </span>
                <span class="btn">
                <mt-button plain type="danger" size="small">马上抢</mt-button>
              </span>
              </div>

            </li>
            <li>
              <div class="list-item">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
                <div class="time">时间: 3/19-3/28</div>
                <div class="price">￥15</div>
              </span>
                <span class="btn">
                <mt-button plain type="danger" size="small">马上抢</mt-button>
              </span>
              </div>
            </li>
            <li>
              <div class="list-item">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
                <div class="time">时间: 3/19-3/28</div>
                <div class="price">￥15</div>
              </span>
                <span class="btn">
                <mt-button plain type="danger" size="small">马上抢</mt-button>
              </span>
              </div>

            </li>
          </ul>
        <!--</mt-loadmore>-->


      </div>
    </div>
    <bootomTap :tapName="tapName"></bootomTap>
  </section>
</template>
<script>
  import bootomTap from '@/common/components/bootom_tap.vue'
  export default {
    components: {bootomTap},
    data() {
      return {
        tapName: 'home',
      }
    },
    created() {
    },
    methods: {
      toDetail(id){
        this.$router.push({
          path: '/task/detail/'+id
        })
      }
      // loadTop() {
      // ...// 加载更多数据
      //   this.$refs.loadmore.onTopLoaded();
      // },
      // loadBottom() {
      // ...// 加载更多数据
      //   this.allLoaded = true;// 若数据已全部获取完毕
      //   this.$refs.loadmore.onBottomLoaded();
      // }
    },
  }
</script>
<style scoped>

</style>
