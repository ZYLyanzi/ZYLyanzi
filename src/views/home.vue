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
  .list{
    background-color: #ffffff;
  }
  .list-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    padding: 0.16rem;
    height: 1.9rem;

  }
  .list-item .desc{
    width: 75%;
    color: #333333;
    text-align: left;
  }
  .list-item .desc .title{
    font-size: 0.28rem;
  }
  .list-item .desc .time{
    font-size: 0.24rem;
    color: #8e8e8e;
    margin: 0.16rem 0;
  }
  .list-item .desc .price{
    font-size: 0.40rem;
    color: #ef4f4f;
    font-weight: bold;
  }
  .list-item .btn{
    width: 25%;
    height: 1.9rem;
    line-height: 1.9rem;
  }

</style>
<template>
  <section>
    <mt-header title="首页">

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
        <!---->
        <!--</mt-loadmore>-->
        <ul>
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

      </div>
    </div>
    <bootomTap></bootomTap>
  </section>
</template>
<script>
  import bootomTap from '@/common/components/bootom_tap.vue'
  export default {
    components: {bootomTap},
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
      tochangeTab(id){
        let vm = this;
        if(id == 1){
          vm.$router.push({
            path: '/list'
          })
        }
        switch(id){
          case 1:
            vm.$router.push({
              path: '/'
            })
            break;
          case 2:
            vm.$router.push({
              path: '/list'
            })
            break;
          case 3:
            vm.$router.push({
              path: '/list'
            })
            break;

        }
      },
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
