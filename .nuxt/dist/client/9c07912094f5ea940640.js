(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{212:function(t,e,o){var content=o(228);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(17).default)("254abe95",content,!0,{sourceMap:!1})},227:function(t,e,o){"use strict";var n=o(212);o.n(n).a},228:function(t,e,o){(t.exports=o(16)(!1)).push([t.i,'[data-v-2a05fc2f]:root{--text-color:red}.book-list-layout[data-v-2a05fc2f]{padding:20px}.book-item-layout[data-v-2a05fc2f]{padding:10px;border-radius:5px;border:1px solid #e1e4e8;display:inline-block;margin-right:20px;text-align:center;font-size:17px;position:relative;vertical-align:top;height:110px;margin-bottom:20px}.book-item-layout .book-item-layout-edit[data-v-2a05fc2f]{position:absolute;width:100%;height:30px;line-height:30px;text-align:center;font-size:14px;bottom:0;left:0;cursor:pointer;overflow:hidden}.book-item-layout .book-item-layout-edit .book-item-layout-in-edit[data-v-2a05fc2f]{height:100%;background:rgba(0,0,0,.5);color:#fff;-webkit-transform:translateY(100%);transform:translateY(100%);transition:.2s}.book-item-layout.act[data-v-2a05fc2f]{border:1px solid #398dee}.book-item-layout:hover .book-item-layout-in-edit[data-v-2a05fc2f]{-webkit-transform:translateY(0);transform:translateY(0)}.book-item-layout:hover .book-item-delete[data-v-2a05fc2f]{display:block}.book-iconfont[data-v-2a05fc2f]{font-size:60px}.book-item-delete[data-v-2a05fc2f]{right:-5px;top:-5px;position:absolute;display:none}.book-item-layout-add[data-v-2a05fc2f]{position:absolute;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.3);color:#fff;padding-top:25px;cursor:pointer}.book-item-layout-add[data-v-2a05fc2f]:after{width:50px;height:4px}.book-item-layout-add[data-v-2a05fc2f]:after,.book-item-layout-add[data-v-2a05fc2f]:before{content:"";position:absolute;background:#fff;top:50%;left:50%;border-radius:2px;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.book-item-layout-add[data-v-2a05fc2f]:before{width:4px;height:50px}',""])},438:function(t,e,o){"use strict";o.r(e);o(44),o(22);var n=o(2),r=(o(23),o(12),o(64),o(4)),c=o(24),d=o(6),l=o(3),f={data:function(){return{editBookName:"",showModal:!1,curId:"",isPrivate:0,originData:""}},computed:Object(r.a)({},Object(c.e)({bookList:function(t){return Object.values(t.books.list)},curBook:function(t){return t.books.curBook}}),{disableBtn:function(){return!(!this.curId||this.originData!=="".concat(this.editBookName).concat(this.isPrivate))||!this.curId&&!this.editBookName}}),methods:Object(r.a)({},Object(c.d)("books",[d.BOOK_CUR_UPDATE]),Object(c.b)("books",[l.BOOK_LIST_GET,l.BOOK_LIST_PUT,l.BOOK_LIST_POST,l.BOOK_LIST_DELETE]),{todoSetCurBook:function(t){this[d.BOOK_CUR_UPDATE](t._id)},getData:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e,o=arguments;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=!(o.length>0&&void 0!==o[0])||o[0],t.next=3,this[l.BOOK_LIST_GET]({force:e});case 3:t.sent;case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),init:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.$showLoading(),t.next=3,this.getData(!1);case 3:this.$hideLoading();case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),todoDeleteBook:function(t){var e=this;this.$alert({content:'你确认要删除"'.concat(t.name,'"'),showCancel:!1}).then(function(){var o=Object(n.a)(regeneratorRuntime.mark(function o(n){return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:n&&e.doDeleteBook(t);case 1:case"end":return o.stop()}},o)}));return function(t){return o.apply(this,arguments)}}())},doDeleteBook:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(e){var o;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.$showLoading(),t.next=3,this[l.BOOK_LIST_DELETE]({_id:e._id});case 3:if(o=t.sent,this.$hideLoading(),o.err){t.next=9;break}return this.$toast({title:"删除成功"}),t.next=9,this.getData();case 9:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),doCloseModal:function(){this.curId="",this.editBookName="",this.showModal=!1},todoAddBook:function(){this.curId="",this.showModal=!0},todoEditBook:function(t){this.curId=t._id,this.editBookName=t.name,this.showModal=!0,this.isPrivate=t.isPrivate,this.originData="".concat(t.name).concat(t.isPrivate)},doSaveBook:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e,o;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.disableBtn){t.next=2;break}return t.abrupt("return");case 2:if(this.editBookName){t.next=5;break}return this.$alert({content:"名称不能为空"}),t.abrupt("return");case 5:if(this.curId){t.next=11;break}return t.next=8,this[l.BOOK_LIST_POST]({name:this.editBookName,isPrivate:this.isPrivate});case 8:e=t.sent,t.next=14;break;case 11:return t.next=13,this[l.BOOK_LIST_PUT]({_id:this.curId,name:this.editBookName,isPrivate:this.isPrivate});case 13:e=t.sent;case 14:if(this.$showLoading(),e.err){t.next=20;break}return o=this.curId?"修改成功":"添加成功",this.$toast({title:o}),t.next=20,this.getData();case 20:this.$hideLoading(),this.doCloseModal();case 22:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}),mounted:function(){var t=this;this.$nextTick(function(){t.$nuxt.$loading.start(),setTimeout(function(){return t.$nuxt.$loading.finish()},500)}),this.init()}},v=(o(227),o(9)),component=Object(v.a)(f,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"book-list-layout"},[t._l(t.bookList,function(e,n){return o("div",{key:n,staticClass:"book-item-layout",class:{act:e._id===t.curBook},on:{click:function(o){return o.stopPropagation(),t.todoSetCurBook(e)}}},["default"!==e._id?o("div",{staticClass:"delete-icon book-item-delete",on:{click:function(o){return o.stopPropagation(),t.todoDeleteBook(e)}}}):t._e(),t._v(" "),o("div",[o("svg",{staticClass:"icon book-iconfont",attrs:{"aria-hidden":"true"}},[o("use",{attrs:{"xlink:href":"#icon-wenjianjia1"}})])]),t._v("\n      "+t._s(e.name)+"\n      "),o("div",{staticClass:"book-item-layout-edit"},[o("div",{staticClass:"book-item-layout-in-edit",on:{click:function(o){return o.stopPropagation(),t.todoEditBook(e)}}},[t._v("编辑")])])])}),t._v(" "),o("div",{staticClass:"book-item-layout",staticStyle:{"padding-top":"25px"}},[o("div",{staticClass:"book-item-layout-add",on:{click:t.todoAddBook}}),t._v(" "),o("div",[o("svg",{staticClass:"icon book-iconfont",attrs:{"aria-hidden":"true"}},[o("use",{attrs:{"xlink:href":"#icon-wenjianjia1"}})])])])],2),t._v(" "),t.showModal?o("div",{staticClass:"modal-mark-bg"},[o("div",{staticClass:"modal-layout"},[o("div",{staticClass:"modal-title"},[t._v(t._s(t.curId?"编辑":"添加")+" "),o("div",{staticClass:"modal-title-close",on:{click:t.doCloseModal}})]),t._v(" "),o("div",{staticClass:"form-bg bg-fff"},[o("div",{staticClass:"form-layout"},[o("div",{staticClass:"form-group flex"},[o("div",{staticClass:"form-label-layout"},[t._v("\n              名称：\n            ")]),t._v(" "),o("div",{staticClass:"flex flex-1 align-items-center"},[o("input",{directives:[{name:"model",rawName:"v-model.strim",value:t.editBookName,expression:"editBookName",modifiers:{strim:!0}}],staticClass:"form-input",domProps:{value:t.editBookName},on:{input:function(e){e.target.composing||(t.editBookName=e.target.value)}}})])]),t._v(" "),o("div",{staticClass:"form-group flex"},[o("div",{staticClass:"form-label-layout"},[t._v("\n              公开：\n            ")]),t._v(" "),o("div",{staticClass:"flex flex-1 align-items-center"},[o("div",{staticClass:"switch-layout",class:{act:t.isPrivate}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.isPrivate,expression:"isPrivate"}],staticClass:"form-radio",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.isPrivate)?t._i(t.isPrivate,null)>-1:t.isPrivate},on:{change:function(e){var o=t.isPrivate,n=e.target,r=!!n.checked;if(Array.isArray(o)){var c=t._i(o,null);n.checked?c<0&&(t.isPrivate=o.concat([null])):c>-1&&(t.isPrivate=o.slice(0,c).concat(o.slice(c+1)))}else t.isPrivate=r}}})])])])])]),t._v(" "),o("div",{staticClass:"modal-operate"},[o("div",{staticClass:"btn",class:{"disable-btn":t.disableBtn},on:{click:t.doSaveBook}},[t._v("确定")]),t._v(" "),o("div",{staticClass:"btn second-btn",on:{click:t.doCloseModal}},[t._v("取消")])])])]):t._e()])},[],!1,null,"2a05fc2f",null);e.default=component.exports}}]);