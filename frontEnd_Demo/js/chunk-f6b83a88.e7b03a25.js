(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f6b83a88"],{5849:function(t,n,i){},8660:function(t,n,i){},"88d5":function(t,n,i){"use strict";i.r(n);var e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"content"},[i("list",{attrs:{shuju:t.shuju},on:{edit:t.edit,del:t.del}})],1)},u=[],o=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",[i("table",{staticClass:"tb"},[t._m(0),i("tbody",t._l(t.shuju,(function(n,e){return i("tr",{key:e},[i("th",[t._v(t._s(n.Park_id))]),i("th",[t._v(t._s(n.isfixd))]),i("th",[t._v(t._s(n.is_occupied))]),i("th",[t._v(t._s(n.ID_num))]),i("th",[i("button",{on:{click:function(n){return t.editClick(e)}}},[t._v("edit")])]),i("th",[i("button",{on:{click:function(n){return t.delClick(e)}}},[t._v("del")])])])})),0)])])},s=[function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("thead",[i("tr",[i("th",[t._v("Park_id")]),i("th",[t._v("isfixd")]),i("th",[t._v("is_occupied")]),i("th",[t._v("ID_num")])])])}],c={name:"list",props:{shuju:{type:Array,default:function(){return[]}}},data:function(){return{}},methods:{editClick:function(t){console.log(t),this.$emit("edit",t)},delClick:function(t){console.log(t),this.$emit("del",t)}}},d=c,l=(i("a02b"),i("2877")),r=Object(l["a"])(d,o,s,!1,null,null,null),_=r.exports,a={name:"carmanage",components:{list:_},data:function(){return{shuju:[{key:"1",Park_id:121241313,isfixd:"no",is_occupied:"no",ID_num:"陕A10086"},{key:"1",Park_id:1213124113,isfixd:"no",is_occupied:"no",ID_num:"陕A10085"},{key:"1",Park_id:121141313,isfixd:"no",is_occupied:"no",ID_num:"陕A10084"},{key:"1",Park_id:121314113,isfixd:"no",is_occupied:"no",ID_num:"陕A10083"},{key:"1",Park_id:121311231243,isfixd:"no",is_occupied:"no",ID_num:"陕A10082"}]}},methods:{edit:function(t){console.log(t),this.shuju[t].tel+=100},del:function(t){console.log(t),this.shuju[t].tel-=100}}},f=a,h=(i("f060"),Object(l["a"])(f,e,u,!1,null,"eb7f146a",null));n["default"]=h.exports},a02b:function(t,n,i){"use strict";i("5849")},f060:function(t,n,i){"use strict";i("8660")}}]);
//# sourceMappingURL=chunk-f6b83a88.e7b03a25.js.map