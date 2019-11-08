import Vue from 'vue';
import Vuex from 'vuex'

// 落地部署地址使用动态IP
// let protocol = window.location.protocol
// let host = window.location.hostname;
// var baseUrl=protocol + "//" + host  +":8200";

Vue.use(Vuex)
var store= new Vuex.Store({
    state: {
        //开发
        baseUrl:'http://10.1.137.172:7666/backen',
        //测试
        // baseUrl:'http://10.1.137.172:7555/backen',
        //内网正式
        // baseUrl:'http://10.1.137.165:8400',
        //外网正式
        // baseUrl:'http://113.98.59.233:7888/backen',
        //动态IP
        // baseUrl:baseUrl,

        //拼接+用户
        userId:'',   //用户ID
        tenantId:'', //租户ID
        imgUrl:'', //头像路径，为主站的相对路径;
        dfsServer:'', //文件服务器地址前缀
        smsServer:'',//赛名师服务器地址前缀
        count:1,

        //分页
        pageSize: 5, //默认每页页面总记录数

        //资源上传
        uploadFileUrl:'/dfs/upload/v1/uploadFile',//上传文件后缀地址
        addResource:'/resource/resource/addResource',//保存，添加资源
        delFile:'/dfs/upload/v1/delFile',//移除图片后缀地址
        editConfigration:'/architecture/configration/editConfigration',//编辑配置
        addConfigration:'/architecture/configration/addConfigration',//增加配置
        //分类
        listCategory:'/architecture/category/listCategory',//分类列表
        addCategory:'/architecture/category/addCategory',//添加分类列表
        editCategory:'/architecture/category/editCategory',//编辑分类列表
        deleteCategory:'/architecture/category/deleteCategory',//删除分类
    },
    getters:{
        uploadPath(state){
            return state.baseUrl + state.uploadFileUrl
        },
        addResourcePath(state){//保存资源路径
            return state.baseUrl + state.addResource
        },
        listCategoryPath(state){//分类列表路径
            return state.baseUrl + state.listCategory
        },
        addCategoryPath(state){//添加分类列表
            return state.baseUrl + state.addCategory
        },
        editCategoryPath(state){//编辑分类列表
            return state.baseUrl + state.editCategory
        },
        deleteCategoryPath(state){//删除分类
            return state.baseUrl + state.deleteCategory
        },
    },
    mutations:  {
        user(state){
            state.dfsServer=state.dfsServer;
            state.smsServer=state.smsServer;
            state.imgUrl=state.imgUrl;
            state.userId=state.userId;
            state.tenantId=state.tenantId;
        },
        increment (state,payload) {
            state.count = payload;
        }
    },
})
export default  store;