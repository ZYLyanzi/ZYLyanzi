webpackJsonp([12],{"0zQH":function(t,s){},nrt7:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a("g7Rx"),e=(a("NYxO"),{data:function(){return{id:0,taskDetail:{}}},created:function(){this.id=this.$route.params.id,this.getInfo()},methods:{getInfo:function(){var t=this,s={taskId:t.id};i.a.taskDesc(s).then(function(s){1==s.msgCode&&(t.taskDetail=s.task)})},toEdit:function(t){1==t?this.$router.replace({path:"/task/check/"+this.id}):2==t&&this.$router.replace({path:"/task/add/"+this.id})}}}),l={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("section",[a("mt-header",{attrs:{title:"任务详情"}},[a("router-link",{attrs:{slot:"left",to:"/task/list"},slot:"left"},[a("mt-button",{attrs:{icon:"back"}})],1)],1),t._v(" "),a("div",{staticClass:"layout"},[a("div",{staticClass:"item"},[a("div",{staticClass:"rw-feild"},[t._v("任务名称")]),t._v(" "),a("div",{staticClass:"rw-value"},[t._v(t._s(t.taskDetail.taskName))])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"rw-feild"},[t._v("任务类型")]),t._v(" "),a("div",{staticClass:"rw-value"},[t._v(t._s(t.taskDetail.taskTypeName))])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"rw-feild"},[t._v("单价")]),t._v(" "),a("div",{staticClass:"rw-value"},[t._v(t._s(t.taskDetail.unitPrice))])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"rw-feild"},[t._v("置顶加价")]),t._v(" "),a("div",{staticClass:"rw-value"},[t._v(t._s(t.taskDetail.markupPrice))])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"rw-feild"},[t._v("数量")]),t._v(" "),a("div",{staticClass:"rw-value"},[t._v(t._s(t.taskDetail.totalSum))])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"rw-feild"},[t._v("总价")]),t._v(" "),a("div",{staticClass:"rw-value"},[t._v(t._s(t.taskDetail.totalPrice))])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"rw-feild"},[t._v("限速")]),t._v(" "),a("div",{staticClass:"rw-value"},[t._v(t._s(t.taskDetail.limitSpeed))])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"rw-feild"},[t._v("备注")]),t._v(" "),a("div",{staticClass:"rw-value"},[t._v(t._s(t.taskDetail.remark))])]),t._v(" "),t._l(t.taskDetail.taskTypeAttrs,function(s){return a("div",{staticClass:"item"},[a("div",{staticClass:"rw-feild"},[t._v(t._s(s.fieldCname))]),t._v(" "),"text"==s.formType?a("div",{staticClass:"rw-value"},[t._v(t._s(s.fieldContent)+"11")]):t._e(),t._v(" "),"img"==s.fieldType?a("div",{staticClass:"rw-value"},t._l(s.fieldConten,function(t){return a("img",{attrs:{src:t}})})):t._e()])})],2),t._v(" "),a("div",{staticClass:"detail-btn"},[a("mt-button",{attrs:{type:"danger"},on:{click:function(s){t.toEdit(1)}}},[t._v("审核提交任务")]),t._v(" "),a("mt-button",{attrs:{type:"default"},on:{click:function(s){t.toEdit(2)}}},[t._v("编辑任务")])],1)],1)},staticRenderFns:[]};var v=a("VU/8")(e,l,!1,function(t){a("0zQH")},"data-v-40434aae",null);s.default=v.exports}});