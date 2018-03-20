<template>
	<section>
		{{detail.name}}

		<button @click="getToCart(detail)">添加到购物车</button>
	</section>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
	data() {
		return {
			
		}
	},
	created() {
		const id = this.$route.params.id
		this.getInfo(id)
	},
	methods: {
		...mapActions({
			getInfo:'product/getInfo'
		}),
		...mapMutations({
			getToCart:'cart/addProduct'
		})
	},
	computed:{
	    ...mapGetters({
			detail: 'product/currentDetail'
		})
	}
	
}
</script>