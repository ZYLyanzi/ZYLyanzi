import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
/* 模板加载地址 */
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'   //首页
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    /* 模板小标签名称设置 */
                    meta: { title: '系统首页' }
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/bookInfo',
                    component: resolve => require(['../components/page/BookInfo.vue'], resolve),
                    meta: { title: '教材信息' }
                },
                {
                    path: '/basicsBookClassify',
                    component: resolve => require(['../components/page/BasicsBookClassify'], resolve),
                    meta: { title: '教材分类' }
                },
                /* {
                    path: '/bookRecommend',
                    component: resolve => require(['../components/page/BookRecommend.vue'], resolve),
                    meta: { title: '最新推荐' }
                }, */
                {
                    path: '/resource',
                    component: resolve => require(['../components/page/Resource.vue'], resolve),
                    meta: { title: '资源信息' }
                },
                {
                    path: '/basicsResourceClassify',
                    component: resolve => require(['../components/page/BasicsResourceClassify'], resolve),
                    meta: { title: '资源分类' }
                },
                {
                    path: '/resourceUpload',
                    component: resolve => require(['../components/page/ResourceUpload.vue'], resolve),
                    meta: { title: '资源上传' }
                },
                {
                    path: '/basicsSetUpBannerPage',
                    component: resolve => require(['../components/page/BasicsSetUpBannerPage.vue'], resolve),
                    meta: { title: '首页BANNER' }
                },
                {
                    path: '/basicsConfigFile',
                    component: resolve => require(['../components/page/BasicsConfigFile.vue'], resolve),
                    meta: { title: '配置文件' }
                },
                {
                    path: '/basicsLabelGroupmag',
                    component: resolve => require(['../components/page/BasicsLabelGroupmag.vue'], resolve),
                    meta: { title: '标签组管理' }
                },
                {
                    path: '/basicsLabelmag',
                    component: resolve => require(['../components/page/BasicsLabelmag.vue'], resolve),
                    meta: { title: '标签管理' }
                },
                {
                    path: '/bookCommon',
                    component: resolve => require(['../components/page/BookCommon.vue'], resolve),
                    props: route => ({
                        textbookId: route.query.textbookId,
                    }),
                    meta: { title: '教材导航' }
                },
                //窗口页面跳转
                {
                    path: '/addBookInfo',
                    component: resolve => require(['../components/page/BookAddInfo.vue'], resolve),
                    props: route => ({
                        textbookId: route.query.textbookId,
                    }),
                    meta: { title: '教材表单' }
                },
                {
                    path: '/bookChapter',
                    component: resolve => require(['../components/page/BookChapter.vue'], resolve),
                    meta: { title: '教材章节' }
                },
                {
                    path: '/bookSetting',
                    component: resolve => require(['../components/page/BookSetting.vue'], resolve),
                    meta: { title: '相关推荐' }
                },
                {
                    path: '/bookViewPage',
                    component: resolve => require(['../components/page/BookViewPage.vue'], resolve),
                    meta: { title: '封面动图' }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
