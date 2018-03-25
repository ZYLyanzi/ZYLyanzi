<style scoped>
  .layout{
    background-color: #ffffff;
    margin-top: 10px;
    padding: 10px;
    padding-left: 15px;
  }
  .layout .item{
    display: flex;
    flex-direction: row;
    padding-left: 10px;
    text-align: left;
    margin-bottom: 15px;
  }
  .mint-field .mint-cell-title{
    width: 75px !important;
  }
</style>
<template>
	<section>
    <mt-header title="提交任务">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="layout">
      <mt-field label="备注" placeholder="请输入备注" type="textarea" maxlength="100" v-model="taskParms.remark"></mt-field>
    </div>


    <div class="layout">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :limit="5"
        :file-list="fileList2"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>


    <div class="detail-btn">
      <div class="bootom" @click="toSubmit()">
        <div class="sub-btn">
          <label >提交任务</label>
        </div>
      </div>
    </div>
	</section>
</template>
<script>
  import task from '@/resources/task'
  import { Toast } from 'mint-ui';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
	data() {
		return {
      taskParms: {
        id: 0,
        remark: ''
      },

      fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]

		}
	},
	created() {
		this.taskParms.id = this.$route.params.id
		// this.getInfo()
	},
	methods: {
    getInfo(){
      let vm = this;
      let para = {
        taskId: vm.id
      }
      task.taskDesc( para).then((res) => {
        if (res.msgCode == 1){
          vm.taskDetail = res.task;

        }
      });
    },
    toSubmit(){
      let vm = this;
      let para = {
        taskId: vm.id
      }
      task.submitDistributeTask(vm.taskParms).then((res) => {
        if (res.msgCode == 1){
          Toast({
            message: '提交成功',
            iconClass: 'icon icon-success'
          });

        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }

	},


}
</script>
