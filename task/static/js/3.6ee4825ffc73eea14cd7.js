webpackJsonp([3],{"0vKQ":function(t,e){},"12H5":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("MS2J"),a=s("ahCv"),i=s("NC6I"),o=s.n(i),n=s("5reh"),l=s("Au9i"),u={data:function(){return{validCount:0,userName:"",password:"",confirmPassword:"",rules:{userName:{itRequried:{reg:!0,msg:""},itType:{reg:"",msg:""},itLen:{reg:20,msg:""},itState:"",itMsg:""},password:{itRequried:{reg:!0,msg:""},itType:{reg:"",msg:""},itLen:{reg:8,msg:""},itState:"",itMsg:""},confirmPassword:{itRequried:{reg:!0,msg:""},itType:{reg:"",msg:""},itLen:{reg:8,msg:""},itState:"",itMsg:""}}}},mounted:function(){},methods:{toRegist:function(){for(var t in this.validCount=0,this.rules)this.validCount+=r.a.byOneValid(this[t],this.rules[t]);if(this.validCount>0);else{var e=this;if(e.password!==e.confirmPassword)Object(l.Toast)({message:"两次密码输入不一致",position:"middle",duration:2e3});else{var s={userName:e.userName,password:o()(e.password)};a.a.userRegister(s).then(function(t){if(1==t.msgCode){e.$store.commit(n.a,t.token);var s=t.userId;a.a.queryUserInfo(s).then(function(t){1==t.msgCode&&e.$store.commit("setUserInfo",t.user)})}})}}},toLogin:function(){this.$router.replace({path:"/login"})}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",[s("mt-header",{attrs:{title:"免费注册"}},[s("router-link",{attrs:{slot:"left",to:"/login"},slot:"left"},[s("mt-button",{attrs:{icon:"back"}})],1)],1),t._v(" "),s("div",{staticClass:"page-part"},[s("mt-field",{attrs:{label:"账号",placeholder:"请输入账号",attr:{maxlength:20},state:t.rules.userName.itState},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}}),t._v(" "),s("mt-field",{attrs:{label:"密码",placeholder:"请输入密码",type:"password",attr:{maxlength:20},state:t.rules.password.itState},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),s("mt-field",{attrs:{label:"确认密码",placeholder:"请确认密码",type:"password",attr:{maxlength:20},state:t.rules.confirmPassword.itState},model:{value:t.confirmPassword,callback:function(e){t.confirmPassword=e},expression:"confirmPassword"}})],1),t._v(" "),s("div",{staticClass:"login-bottom"},[s("mt-button",{staticClass:"login-btn-login",attrs:{size:"large",type:"primary"},on:{click:t.toRegist}},[t._v("免费注册")]),t._v(" "),s("div",{staticClass:"line"},[t._v("----------------已有账号---------------")]),t._v(" "),s("mt-button",{staticClass:"login-btn-login login-btn-zhuce",attrs:{size:"large",type:"primary"},on:{click:t.toLogin}},[t._v("立即登录")])],1)],1)},staticRenderFns:[]};var d=s("VU/8")(u,c,!1,function(t){s("LiG1"),s("0vKQ")},null,null);e.default=d.exports},LiG1:function(t,e){}});