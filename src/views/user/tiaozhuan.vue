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
//			getUrlParam(name) {
//				let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
//				let r = window.location.search.substr(1).match(reg);  //匹配目标参数
//				if (r != null) return unescape(r[2]); return null; //返回参数值
//			}
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
		created() {
			console.log("creatTiaozhuan");
			alert('返回参数'+this.$route.query);
		
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
							vm.getUserInfo()
						}
					});
				}


		}
	}
</script>
<style scoped>

</style>
