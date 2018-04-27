<style scoped>
    .page-part {
        text-align: center;
        margin-top: 20px;
    }

    .mint-field .mint-cell-title {
        width: 1.5rem;
    }

    .login-bottom {
        margin-top: 60px;
        width: 100%;
        height: 50px;
        text-align: center;
    }

    .login-bottom .login-btn-login {
        margin-top: 0.6rem;
        color: #ffffff;
        font-size: 0.36rem;
        display: block;
        text-align: center;
        width: 94%;
        margin-left: 3%;
        height: 0.8rem;
        line-height: 0.8rem;
        border-radius: 4px;
    }

    .login-bottom .login-btn-zhuce {
        margin-top: 0.3rem;
        background-color: #fff;
        color: #26a2ff;
    }

    .line {
        text-align: center;
        margin-top: 0.3rem;
        color: #8e8e8e;
    }

    .kuaijie {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .kuaijie img {
        width: 1rem;
        margin: 0.2rem;
    }

    /*.qq{*/
    /*margin-right: 0.3rem;*/
    /*}*/
    /*.weixin{*/
    /*margin-left: 0.3rem;*/
    /*}*/
    .kuaijie .text {
        text-align: center;
        color: #999999;
    }
</style>
<template>
    <section>
        <mt-header fixed title="登录">
        </mt-header>
        <div class="page-part">
            <mt-field label="账号" placeholder="请输入用户名" :attr="{maxlength:20}" v-model="userName"
                      :state='rules.userName.itState'></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" :attr="{maxlength:8}" v-model="password"
                      :state='rules.password.itState'></mt-field>
        </div>
        <div class="login-bottom need-top">
            <mt-button size="large" type="primary" class="login-btn-login" @click="toLogin">登录</mt-button>

            <div class="line">----------------快速登录---------------</div>


            <div class="kuaijie">

                <!--<div class="iocn-login" onclick="BSL.Login('QQ','http://www.daren11.com/dist/', '')">-->
                    <!--<img class="qq" src="../../../static/img/qq.png"/>-->
                    <!--<div class="text">QQ</div>-->
                <!--</div>-->

                <!--<div class="iocn-login" onclick="BSL.Login('WEIXIN', 'http://47.106.112.59/dist/', '')">-->
                <div class="iocn-login" onclick="BSL.Login('WEIXIN', 'http://www.daren11.com/dist/', '')">
                    <img class="weixin" src="../../../static/img/weixin.png"/>
                    <div class="text">微信</div>
                </div>

                <!--<div class="iocn-login" onclick="BSL.Login('QQ','http://www.daren11.com/disttest/', '')">-->
                    <!--<img class="qq" src="../../../static/img/qq.png"/>-->
                    <!--<div class="text">QQ</div>-->
                <!--</div>-->

                <!--<div class="iocn-login" onclick="BSL.Login('WEIXIN', 'http://www.daren11.com/disttest/', '')">-->
                    <!--<img class="weixin" src="../../../static/img/weixin.png"/>-->
                    <!--<div class="text">微信</div>-->
                <!--</div>-->

            </div>


            <!--<div class="line">&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;还没有账号-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</div>-->
            <!--<mt-button size="large" type="primary" class="login-btn-login login-btn-zhuce" @click="toRegist">注册-->
            <!--</mt-button>-->

        </div>
    </section>
</template>

<script>
    import util from '@/common/utils/util'
    import user from '@/resources/user'
    import md5 from 'js-md5';
    import * as types from '@/store/types'

    export default {
        data() {
            return {

                validCount: 0,
                userName: '',
                password: '',
                token: '12345678',
                rules: {
                    userName: {
                        itRequried: {reg: true, msg: ''},
                        itType: {reg: '', msg: ''},
                        itLen: {reg: 20, msg: ''},
                        itState: '',
                        itMsg: '',
                    },
                    password: {
                        itRequried: {reg: true, msg: ''},
                        itType: {reg: '', msg: ''},
                        itLen: {reg: 8, msg: ''},
                        itState: '',
                        itMsg: '',
                    },
                }
            }
        },
        mounted() {
            this.$store.commit(types.TITLE, '登录');
            this.$store.commit('setTop', 0);
        },
        created(){

        },
        methods: {

            toTiaozhuan() {
                location.href = 'http://120.78.203.150:8080/dist/#/tiaozhuan'
            },

            toLogin() {
                this.validCount = 0;
                for (let objElem in this.rules) {
                    this.validCount += util.byOneValid(this[objElem], this.rules[objElem]);
                }
                if (this.validCount > 0) {
//          alert("校验不通过")
                } else {
                    let vm = this;
                    let para = {
                        userName: vm.userName,
                        password: md5(vm.password)
                    };

                    // 请求
                    user.userLogin(para).then((res) => {
                        if (res.msgCode == 1) {
                            vm.$store.commit(types.LOGIN, res.token);
                            let para = {
                                userId: res.userId
                            }
                            user.queryUserInfo(para).then((res) => {
                                if (res.msgCode == 1) {
                                    vm.$store.commit('setUserInfo', res.user);
                                    vm.$router.replace({
                                        path: '/'
                                    })

                                }
                            });
                        }
                    });


                }
            },
            toRegist() {
                this.$router.push({
                    path: '/register'
                })
            }
        }
    }
</script>

<style>
</style>
