<style scoped>
  .layout {
    background-color: #ffffff;
    margin-top: 10px;
    padding: 10px;
    padding-left: 15px;
  }

  .layout .item {
    display: flex;
    flex-direction: row;
    padding-left: 10px;
    text-align: left;
    margin-bottom: 15px;
  }

  .rw-feild {
    margin-bottom: 10px;
    width: 25%;
    color: #333333;
  }

  .rw-value {
    margin-left: 10px;
    width: 82%;
    color: #888888;
  }

  .detail-btn {
    margin: 20px 0;
      font-size: 16px;
  }

  .detail-btn .mint-button {
    margin: 10px;
    font-size: 0.32rem;
  }
	.value-img{
		width: 70%;
	}
</style>
<template>
  <section>
    <!--<mt-header fixed title="任务详情">-->
      <!--<router-link to="/task/list" slot="left">-->
        <!--<mt-button icon="back"></mt-button>-->
      <!--</router-link>-->
    <!--</mt-header>-->
    <div class="layout">
      <div class="item">
        <div class="rw-feild">任务名称</div>
        <div class="rw-value">{{taskDetail.taskName}}</div>
      </div>
      <div class="item">
        <div class="rw-feild">任务号</div>
        <div class="rw-value">{{taskDetail.taskId}}</div>
      </div>
      <div class="item">
        <div class="rw-feild">任务类型</div>
        <div class="rw-value">{{taskDetail.taskTypeName}}</div>
      </div>
      <div class="item">
        <div class="rw-feild">单价</div>
        <div class="rw-value">{{taskDetail.unitPrice}}</div>
      </div>
      <div class="item">
        <div class="rw-feild">置顶加价</div>
        <div class="rw-value">{{taskDetail.markupPrice}}</div>
      </div>
      <div class="item">
        <div class="rw-feild">数量</div>
        <div class="rw-value">{{taskDetail.totalSum}}</div>
      </div>
      <div class="item">
        <div class="rw-feild">总价</div>
        <div class="rw-value">{{taskDetail.totalPrice}}</div>
      </div>

      <div class="item">
        <div class="rw-feild">限速</div>
        <div class="rw-value">{{taskDetail.limitSpeed}}</div>
      </div>
      <div class="item">
        <div class="rw-feild">备注</div>
        <div class="rw-value">{{taskDetail.remark}}</div>
      </div>


      <div class="item" v-for="item in taskDetail.taskTypeAttrs">
        <div class="rw-feild">{{item.fieldCname}}</div>

        <div class="rw-value" v-if="item.formType == 'text' ">{{item.fieldContent}}</div>
        <div class="rw-value" v-if="item.formType == 'img' ">
          <img  class="value-img" v-for="item in JSON.parse(item.fieldContent)" :src="item"/>
        </div>
      </div>
    </div>


    <div class="detail-btn">
      <mt-button type="danger" @click="toEdit(1)">审核提交任务</mt-button>
      <mt-button type="default" @click="toEdit(2)">编辑任务</mt-button>

    </div>

  </section>
</template>
<script>
  import task from '@/resources/task'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import * as types from '@/store/types'
  export default {
    data() {
      return {
        id: 0,
        taskDetail: {},
      }
    },
    created() {
      this.id = this.$route.params.id
      this.getInfo()
    },
      mounted() {
	      this.$store.commit('setTop', 1);
          this.$store.commit(types.TITLE, '任务详情');
      },
    methods: {
      getInfo() {
        let vm = this;
        let para = {
          taskId: vm.id
        };

        task.taskDesc(para).then((res) => {
          if (res.msgCode == 1) {
            vm.taskDetail = res.task;

          }
        });

      },
      toEdit(type) {
        if (type == 1) {
          this.$router.push({
            path: '/task/check/' + this.id,
          });
        } else if (type == 2) {
          this.$router.push({
            path: '/task/add/' + this.id,
          });
        }

      }
    },


  }
</script>
