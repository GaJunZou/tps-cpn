(window.webpackJsonp=window.webpackJsonp||[]).push([[4,6],{513:function(t,n,e){},514:function(t,n,e){"use strict";e(513)},534:function(t,n,e){"use strict";e.r(n);var o={props:{params:{},close:null},methods:{ok:function(){console.log("点击确定"),this.close()},cancel:function(){this.close()}}},c=(e(514),e(5)),i=Object(c.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("ul",[e("li",[t._v("名字: "+t._s(t.params.name))]),t._v(" "),e("li",[t._v("身高: "+t._s(t.params.height))]),t._v(" "),e("li",[t._v("体重: "+t._s(t.params.weight))])]),t._v(" "),e("div",{staticClass:"btn-container"},[e("el-button",{staticClass:"cu-btn",attrs:{type:"primary"},on:{click:t.ok}},[t._v("确定")]),t._v(" "),e("el-button",{staticClass:"cu-btn",attrs:{type:"plain"},on:{click:t.cancel}},[t._v("取消")])],1)])}),[],!1,null,"56346a0b",null);n.default=i.exports},578:function(t,n,e){"use strict";e.r(n);var o=e(534),c={components:{cpn:o.default},data:function(){return{type:"使用普通文字"}},methods:{useType:function(t){this.$createElement;switch(t){case 1:this.type="使用普通文字";break;case 2:this.type=o.default;break;case 3:this.type=function(t){return t("h1",{style:{color:"#f56c6c"},domProps:{innerHTML:"这是使用渲染函数打开的dialog"}})};break;case 4:this.type=function(t){return t("ul",[t("li",["1"]),t("li",["2"]),t("li",["3"])])}}this.openDialog()},openDialog:function(){this.tpsCreateDialog({title:"服务式弹窗基本使用",content:this.type,params:{name:"loki",height:"179cm",weight:"60kg"},footer:!1,onConfirm:function(t){console.log("点击确认时回调"),inst.close()},onCancel:function(t){console.log("点击取消时回调"),inst.close()},closed:function(){console.log("弹窗关闭后回调")}})}}},i=e(5),s=Object(i.a)(c,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("ul",[e("el-button",{on:{click:function(n){return t.useType(1)}}},[t._v("普通文字")]),t._v(" "),e("el-button",{on:{click:function(n){return t.useType(2)}}},[t._v("组件")]),t._v(" "),e("el-button",{on:{click:function(n){return t.useType(3)}}},[t._v("渲染函数")]),t._v(" "),e("el-button",{on:{click:function(n){return t.useType(4)}}},[t._v("JSX")])],1)])}),[],!1,null,null,null);n.default=s.exports}}]);