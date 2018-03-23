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
		width: 15%;
		color: #333333;
	}

	.rw-value {
		margin-left: 10px;
		width: 82%;
		color: #888888;
	}
</style>
<template>
	<section>
		<mt-header title="开始任务">
			<router-link to="/user" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="layout">
			任务图片
		</div>
		<div class="layout">
			<el-upload
				class="upload-demo"
				action="https://jsonplaceholder.typicode.com/posts/"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:file-list="fileList2"
				list-type="picture">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</div>

		<div class="detail-btn">
			<div class="bootom">
				<div class="sub-btn">
					<label>提交任务</label>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

	export default {
		data() {
			return {
				id: 0,
				fileList2: [
					{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
					{name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
			}
		},
		created() {
			const id = this.$route.params.id
			this.getInfo(id)
		},
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			...mapActions({
				getInfo: 'product/getInfo'
			}),
			...mapMutations({
				getToCart: 'cart/addProduct'
			})
		},
		computed: {
			...mapGetters({
				detail: 'product/currentDetail'
			})
		}

	}
</script>
