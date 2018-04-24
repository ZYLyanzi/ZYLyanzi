<template>
	<div></div>
</template>
<script>
	import task from '@/resources/task'
	import user from '@/resources/user'
	import * as types from '@/store/types'
	export default {
		data() {
			return {
				userId: '',
				firstLogin: '',

			}
		},
		methods: {
			getUserInfo(){
				let vm = this;
				let para2 = {
					userId: vm.userId,
				}

				user.queryUserInfo(para2).then((res2) => {
					console.log("queryUserInfo")
					if (res2.msgCode == 1) {
						vm.$store.commit('setUserInfo', res2.user);


						if (vm.firstLogin == 0){
							vm.$router.replace({
								path: '/user/fill_code',
								query: {isFirst: 0}
							})
						}else if (vm.firstLogin == 1){
							vm.$router.replace({
								path: '/'
							})
						}
					}
				});
			}

		},
        mounted() {
	        this.$store.commit('setTop', 1);
            this.$store.commit(types.TITLE, '互帮宝');
        },
		created() {
			console.log("creatTiaozhuan");
            alert("tiaozhuandizhi"+location.href);
            alert("tiaozhuandizhi"+JSON.stringify(this.$route.query));
            alert("tiaozhuandizhi"+(this.$route.query.nickname));

				let vm = this;
				if (this.$route.query){
					let res = this.$route.query;

					console.log("creatTiaozhuan", res);
					let para = {
						nickName: res.nickname,
						unionid: res.unionid,
						headImgurl: res.head_imgurl,
						openid: res.openid,
					};

					user.userOpenidLogin(para).then((res1) => {
						if (res1.msgCode == 1) {

							vm.firstLogin = res1.firstLogin;
							vm.userId = res1.userId;
							vm.$store.commit(types.LOGIN, res1.token);

                            alert("userOpenidLogin返回参数"+JSON.stringify(res1))
							vm.getUserInfo()
						}
					});
				}


		}
	}
</script>
<style scoped>

</style>
