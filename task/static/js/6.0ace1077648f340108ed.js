webpackJsonp([6],{EiCE:function(t,a){},k5nZ:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=s("g7Rx"),e=(s("NYxO"),{data:function(){return{id:0,taskDetail:{}}},created:function(){this.getInfo()},methods:{getInfo:function(){var t=this;i.a.distributeTask().then(function(a){1==a.msgCode&&(t.taskDetail=a.task)})},toStart:function(t){var a=this,s=this,e={taskId:s.taskDetail.id,state:t};i.a.replyDistributeTask(e).then(function(i){1==i.msgCode&&(1==t?a.$router.replace({path:"/task/start/"+s.taskDetail.id}):2==t&&s.getInfo())})}}}),l={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("section",[s("mt-header",{attrs:{title:"派发任务详情"}},[s("router-link",{attrs:{slot:"left",to:"/"},slot:"left"},[s("mt-button",{attrs:{icon:"back"}})],1)],1),t._v(" "),s("div",{staticClass:"layout"},[s("div",{staticClass:"item"},[s("div",{staticClass:"rw-feild"},[t._v("任务名称")]),t._v(" "),s("div",{staticClass:"rw-value"},[t._v(t._s(t.taskDetail.taskName))])]),t._v(" "),s("div",{staticClass:"item"},[s("div",{staticClass:"rw-feild"},[t._v("任务类型")]),t._v(" "),s("div",{staticClass:"rw-value"},[t._v(t._s(t.taskDetail.taskTypeName))])]),t._v(" "),s("div",{staticClass:"item"},[s("div",{staticClass:"rw-feild"},[t._v("积分")]),t._v(" "),s("div",{staticClass:"rw-value"},[t._v(t._s(t.taskDetail.unitPrice))])]),t._v(" "),t._l(t.taskDetail.taskTypeAttrs,function(a){return s("div",{staticClass:"item"},[s("div",{staticClass:"rw-feild"},[t._v(t._s(a.fieldCname))]),t._v(" "),"text"==a.fieldType?s("div",{staticClass:"rw-value"},[t._v(t._s(a.fieldConten))]):t._e(),t._v(" "),"img"==a.fieldType?s("div",{staticClass:"rw-value"},t._l(a.fieldConten,function(t){return s("img",{attrs:{src:t}})})):t._e()])}),t._v(" "),s("div",{staticClass:"item"},[t.taskDetail.remark?s("div",{staticClass:"rw-feild"},[t._v("说明")]):t._e(),t._v(" "),s("div",{staticClass:"rw-value"},[t._v(t._s(t.taskDetail.remark))])])],2),t._v(" "),s("div",{staticClass:"detail-btn"},[s("mt-button",{attrs:{type:"danger"},on:{click:function(a){t.toStart(1)}}},[t._v("接受任务")]),t._v(" "),s("mt-button",{attrs:{type:"default"},on:{click:function(a){t.toStart(2)}}},[t._v("放弃任务")])],1)],1)},staticRenderFns:[]};var n=s("VU/8")(e,l,!1,function(t){s("EiCE")},"data-v-ec9fa5f2",null);a.default=n.exports}});