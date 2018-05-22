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
    .explain{
        font-size: 14px;
        text-align: left;
        margin: 20px 10px;
    }
    .explain .title{
        font-size: 16px;
        margin-bottom: 10px;
    }

    .add-btn {
	    position: fixed;
	    bottom: 60px;
	    right: 20px;
	    width: 60px;
	    border-radius: 30px;
	    height: 60px;
	    /*line-height: 60px;*/
	    background-color: #ef1d12;
	    text-align: center;
	    color: #ffffff;
    }
    .pay-btn{
	    background-color: #409EFF;
	    opacity:0.8;
    }
    .txt{
	    position: absolute;
	    top: 10px;
	    left: 16px;
    }
</style>

<template>
    <section>
        <mt-header fixed title="新手教程">
        </mt-header>
        <div class="top need-top">
	        <div class="layout bootom-video">
		        <div class="new-user">
			        <!--<iframe style="width: 7.5rem; height: 4.8rem" frameborder="0"  src="https://v.qq.com/iframe/player.html?vid=g0638xbe6et&tiny=0&auto=0" allowfullscreen></iframe>-->
			        <iframe  style="width: 7.5rem; height: 4.8rem" :src="videoUrl" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
			        <!--<embed src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=g0638xbe6et&auto=0" allowFullScreen="true" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>-->
		        </div>
	        </div>
        </div>
	    <div class="add-btn pay-btn">
		    <label class="txt" @click="toHome()">
			    <div>返回</div>
			    <div>首页</div>
		    </label>
	    </div>

    </section>
</template>
<script>
    // import { Loadmore } from 'mint-ui'
    import {mapState, mapGetters, mapActions} from 'vuex'
    import * as types from '@/store/types'
    export default {
        data() {
            return {
	            videoUrl: 'https://jqaaa.com/jx.php?url=https://v.qq.com/x/page/p06402qwss3.html',
                tapName: 'share',
                inviteCode: '',
            }
        },
        mounted() {
	        this.$store.commit('setTop', 1);
            this.$store.commit(types.TITLE, '新手教程');
        },
        methods: {
	        toHome(){
		        this.$router.replace({
			        path: '/',
		        });
	        },
        },
        created() {
            console.log(this.$store.state)
        },
        computed: {}

    }
</script>
