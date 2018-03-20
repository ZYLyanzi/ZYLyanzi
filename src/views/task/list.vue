<template>
	<section>
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
		  	<ul>
				<li v-for="d in list" @click="detail(d.product_id)">{{d.name}}</li>
			</ul>
			<ul>
				<li v-for="d in hot" @click="detail(d.product_id)">{{d.name}}</li>
			</ul>
		</mt-loadmore>
		
	</section>
</template>
<script>
// import { Loadmore } from 'mint-ui'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
	data() {
		return {
			allLoaded:false,
			list:[],
			hot:[]
		}
	},
	created() {
		let vm = this
		vm.getList({
			type:'123',
			pageNum:1,
			callback:function(res) {
				vm.list = res
			}
		})
		vm.getList({
			type:'1qwe',
			pageNum:1,
			callback:function(res) {
				vm.hot = res
			}
		})
	},
	methods: {
		loadTop() {

		},
		loadBottom() {

		},
		detail(id) {
			this.$router.push({path:'/product/detail/'+id})
		},
		...mapActions({
			getList:'product/getList'
		})
	},
	computed:{
	}
	
}
</script>