<style scoped>
  .rw-swipe {
    width: 100%;
    height: 3rem;
    background-color: #ffd705;
  }
  .new-user{
    width: 100%;
    height: 800px;
    background: #ffd705;
  }
  .get-task{
    margin: 20px 0;
  }
  .line {
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
      <!--<mt-swipe :auto="3000" class="rw-swipe">-->
        <!--<mt-swipe-item class="rw-swipe-item">新手教程1</mt-swipe-item>-->
        <!--<mt-swipe-item class="rw-swipe-item">新手教程2</mt-swipe-item>-->
        <!--<mt-swipe-item class="rw-swipe-item">新手教程3</mt-swipe-item>-->
      <!--</mt-swipe>-->


      <div class="layout">

        <div class="get-task" @click="toDetail()">
          <mt-button type="danger">开始赚钱</mt-button>
        </div>

        <div class="new-user">新手教程</div>

      </div>


    </div>
    <bootomTap :tapName="tapName"></bootomTap>
  </section>
</template>
<script>
  import task from '@/resources/task'

  import bootomTap from '@/common/components/bootom_tap.vue'

  export default {
    components: {bootomTap},
    data() {
      return {
        allLoaded: false,
        tapName: 'home',
        taskList: [
          {
            taskId: 10,
            taskName: '任务名称任务名称任务名称任务名称任务名称',
            taskTypeName: '任务类型'
          }
        ],
        page: 1,
        pageSize: 20,
      }
    },
    methods: {
      toDetail() {
        this.$router.push({
          path: '/task/dist_detail/'
        })
      }
    },
    create() {
      // this.getList('top');
    }
  }
</script>
<style scoped>

</style>
