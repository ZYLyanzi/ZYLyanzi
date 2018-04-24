<style scoped>
    section{
        height: 100%;
        background: #ffffff;
    }
    .top {
        height: 6rem;
        background: #ffffff;
        width: 100%;
        display: flex;
        flex-direction: column;

        justify-content: center;
    }

    .top .code-img img{
        width: 4rem;

    }
    .top .text{
        margin-top: 0.2rem;
    }
    .top .text div{
        margin-top: 0.2rem;
    }
    .top .text .des{
        color: #999999;
        font-size: 0.32rem;
    }
    .top .text .code{
        color: #555555;
        font-size: 0.56rem;
        text-decoration: underline;
    }
    .footer {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .footer img{
        width: 2.8rem;
        margin: 0.4rem;
    }
</style>

<template>
    <section>
        <mt-header fixed title="邀请">
        </mt-header>
        <div class="top need-top">
            <div class="code-img">
                <img src="../../../static/img/erweima.png"/>
            </div>
            <div class="text">
                <div class="des">分享，邀请码</div>
                <div class="code">{{inviteCode}}</div>
            </div>
        </div>
        <div class="footer">
            <!--<div class="share"   @click='toShare(1)'>-->
                <!--<img src="../../../static/img/share_qq.png"/>-->
            <!--</div>-->
            <div class="share"  @click="toShare(2)">
                <img src="../../../static/img/share_wexin.png"/>
            </div>

        </div>


        <bootomTap :tapName="tapName"></bootomTap>
    </section>
</template>
<script>
    // import { Loadmore } from 'mint-ui'
    import user from '@/resources/user'
    import {mapState, mapGetters, mapActions} from 'vuex'
    import bootomTap from '@/common/components/bootom_tap.vue'
    import * as types from '@/store/types'
    export default {
        components: {bootomTap},
        data() {
            return {
                tapName: 'share',
                inviteCode: '',
            }
        },
        mounted() {
	        this.$store.commit('setTop', 0);
            this.$store.commit(types.TITLE, '邀请');
        },
        methods: {
            toShare(type){
                let type1 = 'QQ';
                if (type == 2) {
                    type1 = 'WEIXIN';
                }
                const content = '办事不求人，赚钱快过人，我的邀请码'+this.inviteCode;
                BSL.ShareImgWithTxt(type1, content,'', 'http://www.daren11.com/dist/download/index.html','互帮宝','')
            },

            // toShare1(){
            //     const content = '办事不求人，赚钱快过人，我的邀请码'+this.inviteCode
            //     BSL.ShareImgWithTxt('QQ',content,'', 'http://www.appbsl.cn/demo/','互帮宝','')
            // },
            //
            // toShare2(){
            //     // const content = '办事不求人，赚钱快过人，我的邀请码'+this.inviteCode
            //     BSL.ShareImgWithTxt('QQ','办事不求人，赚钱快过人，我的邀请码'+this.inviteCode,'', 'http://www.appbsl.cn/demo/','互帮宝','')
            // }
        },
        created() {
            console.log(this.$store.state)
            this.inviteCode = this.$store.state.inviteCode;
        },
        computed: {}

    }
</script>
