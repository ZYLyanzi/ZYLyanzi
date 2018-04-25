<style scoped>
	.rw-swipe {
		width: 100%;
		height: 3rem;
		background-color: #ffd705;
	}

	.new-user {
		width: 100%;
		height: 150px;
		background: #ffd705;
	}

	.get-task {
		margin: 20px 0;
	}

	.line {
		color: #8e8e8e;
		font-size: 0.32rem;
		height: 0.9rem;
		line-height: 0.9rem;
	}

	.row {
		display: flex;
		flex-direction: row;
		/*justify-content: space-between;*/
	}

	.center {
		margin: 0.2rem 0;
	}

	.box {
		width: 45%;
		height: 2rem;
		margin-top: 3.333%;
		margin-left: 3.333%;
	}

	.box .text {
		font-size: 0.40rem;
		font-weight: bold;
		color: #ffffff;
		height: 2rem;
		line-height: 2rem;
	}

	.part1 {
		background-color: #289bef
	}

	.part2 {
		background-color: #6b6396
	}

	.part3 {
		background-color: #38b58c
	}

	.part4 {
		background-color: #ef6b52
	}

	.new-user {
		margin-top: 0.4rem;
	}
	.swip-img{
		height: 3rem;
	}

</style>
<template>
	<section>
		<mt-header fixed title="互帮宝">
		</mt-header>
		<div class="main need-top">
			<mt-swipe :auto="3000" class="rw-swipe">
				<mt-swipe-item class="rw-swipe-item" v-for="(item, index) in carousels" :key="index" @click="toPage(item)">
					<img  class="swip-img" :src="item.picture"/>{{item.picture}}
				</mt-swipe-item>
			</mt-swipe>
			<div class="layout center">
				<div class="row">
					<div class="box part1" @click="toDetail(1)">
						<div class="text">接单赚钱</div>
					</div>
					<div class="box part2" @click="toDetail(2)">
						<div class="text">我的任务</div>
					</div>
				</div>
				<div class="row">
					<div class="box part3" @click="toDetail(3)">
						<div class="text">邀请</div>
					</div>
					<div class="box part4" @click="toDetail(4)">
						<div class="text">积分明细</div>
					</div>
				</div>
			</div>

			<div class="layout">

				<!--<div class="get-task" @click="toDetail()">-->
				<!--<mt-button type="danger">开始赚钱</mt-button>-->
				<!--</div>-->

				<div class="new-user">新手教程</div>

			</div>


		</div>
		<bootomTap :tapName="tapName"></bootomTap>
	</section>
</template>
<script>
	import task from '@/resources/task'
    import user from '@/resources/user'
	import bootomTap from '@/common/components/bootom_tap.vue'
    import * as types from '@/store/types'

	export default {
		components: {bootomTap},
		data() {
			return {
				allLoaded: false,
				tapName: 'home',
				carousels: [
				],
				taskList: [
					{
						taskId: 10,
						taskName: '任务名称任务名称任务名称任务名称任务名称',
						taskTypeName: '任务类型'
					}
				],
				page: 1,
				pageSize: 100,
				firstLogin: '',
			}
		},
		methods: {
            getQueryString(name) {
                let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	            let URL =  decodeURI(window.location.search);
	            let r = URL.substr(1).match(reg);
                if(r!=null){
                    //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
                    return  decodeURI(r[2]);
                };
                return null;

            },

            getUserInfo(){
                let vm = this;
                let para2 = {
                    userId: vm.userId,
                }
	            task.carousel().then((r) => {
			            vm.carousels = r.carousels
			            console.log("carousels",  vm.carousels);
//						alert("获取carousels")
			            user.queryUserInfo(para2).then((res2) => {
				            console.log("queryUserInfo")
//				            alert("获取UserInfo")
				            if (res2.msgCode == 1) {
					            vm.$store.commit('setUserInfo', res2.user);
					            if (vm.firstLogin === 0){
						            vm.$router.replace({
							            path: '/user/fill_code',
							            query: {isFirst: 0}
						            })
					            }else if (vm.firstLogin === 1){
						            vm.$router.replace({
							            path: '/'
						            })
					            }
				            }
			            });

	            });

            },
			toDetail(id) {
				if (id == 1) {
					this.$router.push({
						path: '/task/dist_detail/'
					})
				}
				if (id == 2) {
					this.$router.push({
						path: '/set_list'

					})
				}
				if (id == 3) {
                    this.$router.replace({
                        path: '/yaoqing_code',
                    });
				}
				if (id == 4) {
					this.$router.push({
						path: '/task/reward'
					})
				}
			},
			toPage(item){
				this.$router.push({
					path: item.openUrl
				})
			}
		},
		created() {
			let vm = this;
			vm.$store.commit('setTop', 0);
			vm.$store.commit(types.TITLE, '互帮宝');

			if (localStorage.token && localStorage.userId){
//				alert("有token"+localStorage.token+"和userId"+localStorage.userId)
				vm.getUserInfo()
			}else {
//				alert("URL"+window.location.search);
				let nickName = this.getQueryString('nickname');
				let unionid = this.getQueryString('unionid');
				let head_imgurl = this.getQueryString('head_imgurl');
				let openid = this.getQueryString('openid');

//				alert("nickName"+nickName)
//				alert("unionid"+unionid)
//				alert("head_imgurl"+head_imgurl)
// 				alert("openid"+openid)

				if (openid){
					let para = {
						nickName: nickName,
						unionid: unionid,
						headImgurl: head_imgurl,
						openid: openid,
					};

					user.userOpenidLogin(para).then((res1) => {
//						 alert("userOpenidLogin"+JSON.stringify(res1));

						if (res1.msgCode == 1) {
							vm.firstLogin = res1.firstLogin;
							vm.userId = res1.userId;
							vm.$store.commit(types.LOGIN, res1.token);
							vm.getUserInfo()
						}
					});
				}else {
					this.$router.replace({
						path: '/login'
					});
				}
			}



		}
	}
</script>
<style scoped>

</style>
