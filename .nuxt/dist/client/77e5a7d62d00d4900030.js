(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{249:function(t,e,o){"use strict";function n(t,e){return e?"root"===t?"".concat(e,"_root"):t:t.indexOf("root")>-1?"root":t}o.d(e,"a",function(){return n})},250:function(t,e,o){var content=o(473);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(12).default)("803425ec",content,!0,{sourceMap:!1})},251:function(t,e,o){var content=o(475);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(12).default)("38eb59bb",content,!0,{sourceMap:!1})},257:function(t,e,o){"use strict";o(16);var n=o(3),r=(o(45),o(5)),c=o(8),l=o(1),d=o(2),f=(o(125),o(25),o(249)),h={props:{list:{type:Array,default:function(){return[]}}},data:function(){return{filterKeys:""}},computed:Object(r.a)({},Object(c.e)({curCatalog:function(t){return t.catalogs.curCatalog},showBrief:function(t){return t.config.showBrief},bookList:function(t){return t.books.list},schemaList:function(t){return t.schema.list},curNote:function(t){return t.notes.curNote},notesMap:function(t){return t.notes.notesMap},filterList:function(){var t=this;return this.filterKeys?this.list.filter(function(e){return e.title.indexOf(t.filterKeys)>-1}):this.list}}),Object(c.c)("user",["isVisitor"])),watch:{list:function(t){t.length&&(!this.curNode||this.curNode)}},filters:{getBookName:function(t,e){return e[t]?e[t].name:""},getCatalogsName:function(t,e){return e[t]?e[t].name:""}},methods:Object(r.a)({},Object(c.b)("notes",[d.NOTE_DELETE]),Object(c.d)("notes",[l.NOTE_CUR_UPDATE]),{chooseNote:function(t){this.$router.push("/".concat(t.bookId,"/").concat(Object(f.a)(this.curCatalog),"/").concat(t._id))},todoDelete:function(t){var e=this;this.$alert({title:'你确认要删除"'.concat(t.title,'"')}).then(function(){var o=Object(n.a)(regeneratorRuntime.mark(function o(n){return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:n&&e.doDeleteNote(t);case 1:case"end":return o.stop()}},o)}));return function(t){return o.apply(this,arguments)}}())},doDeleteNote:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e,o,n=arguments;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=n.length>0&&void 0!==n[0]?n[0]:{},this.$showLoading(),t.next=4,this[d.NOTE_DELETE]({_id:e._id});case 4:o=t.sent,this.$hideLoading(),o.err||this.$toast({title:"删除成功"}),this.curNote===e._id&&this[l.NOTE_CUR_UPDATE](""),this.$emit("emitUpdateNote",{force:!0});case 9:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),shortcutAdd:function(){var t=this.notesMap[this.curNote].catalogId;t?this.$emit("emitToCreateNote",{_id:"new",catalogId:t}):this.$alert({title:"shortcutAdd",content:"缺少catalogId，无法创建笔记"})}})},m=(o(472),o(9)),component=Object(m.a)(h,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"article-layout box-shadow flex direction-column",class:{"hidden-article":!t.showBrief}},[o("div",{staticClass:"flex-1 flex direction-column article-min-width relative"},[o("div",{staticClass:"article-layout-input-box align-items-center"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.filterKeys,expression:"filterKeys"}],staticClass:"article-layout-input",attrs:{type:"text"},domProps:{value:t.filterKeys},on:{input:function(e){e.target.composing||(t.filterKeys=e.target.value)}}}),t._v(" "),o("i",{staticClass:"iconfont icon-sousuo"})]),t._v(" "),o("div",{staticClass:"flex-1 relative"},[o("div",{staticClass:"absolute-full article-item-box",attrs:{id:"article-item-box"}},t._l(t.filterList,function(e,n){return o("div",{key:n,staticClass:"article-item",class:{act:e._id===t.curNote},attrs:{id:e._id},on:{click:function(o){return t.chooseNote(e)}}},[o("div",{staticClass:"article-item-title"},[t._v(t._s(e.title))]),t._v(" "),o("div",{staticClass:"article-label"},[o("span",{staticClass:"article-label-item"},[t._v(t._s(t._f("getBookName")(e.bookId,t.bookList)))])]),t._v(" "),o("div",{staticClass:"article-item-mark"},[t._v(t._s(t._f("timestampToBriefTime")(e.createTime))+"~"+t._s(t._f("timestampToBriefTime")(e.updateTime)))]),t._v(" "),o("div",{staticClass:"operate-icon",on:{click:function(o){return o.stopPropagation(),t.todoDelete(e)}}},[o("i",{staticClass:"iconfont icon-shanchu1"})])])}),0)]),t._v(" "),t.notesMap[t.curNote]&&!t.isVisitor?o("div",{staticClass:"shortcut-add-layout",on:{click:t.shortcutAdd}},[o("i",{staticClass:"iconfont icon-tianjiawenjian"})]):t._e()])])},[],!1,null,"9527bd9e",null);e.a=component.exports},258:function(t,e,o){"use strict";o(16);var n=o(3),r=o(5),c=o(8),l=o(1),d=o(2),f=o(262),h={props:{curNote:{type:Object},createToCatalogId:{type:String},curNoteContent:{type:Object}},data:function(){var t=this.curNoteContent||{},e=t.title,title=void 0===e?"未命名":e,o=t.content;return{articleName:title,cacheName:title,content:void 0===o?"":o,editId:"new",schemaId:"",catalogId:"",test:"123",fields:[],contentList:[],cacheContent:"",isEditContents:!1,showList:!1,showEditContent:!1}},components:{MarkdownEdit:f.a},computed:Object(r.a)({},Object(c.e)({catalogs:function(t){return t.catalogs.list},bookList:function(t){return t.books.list},articles:function(t){return t.articles.list}}),Object(c.c)("user",["isVisitor"]),{dataHasChange:function(){return JSON.stringify(this.content)!==JSON.stringify(this.cacheContent)}}),watch:{curNote:{handler:function(t){this.setContent(t)},immediate:!0},editId:function(t){this[l.ARTICLE_CUS_SAVE](t)}},methods:Object(r.a)({},Object(c.d)("articles",[l.ARTICLE_CUS_SAVE]),Object(c.d)("books",[l.BOOK_CUR_UPDATE]),Object(c.b)("articles",[d.ARTICLE_DES_GET,d.ARTICLE_POST,d.ARTICLE_PUT,d.ARTICLE_CONTENT_PUT,d.ARTICLE_CONTENT_POST,d.ARTICLE_CONTENT_DELETE]),Object(c.b)("notes",[d.NOTE_POST,d.NOTE_PUT,d.NOTE_DELETE]),{setContent:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t._id?(this.cacheContent=this.content=t.content||"",this.cacheName=this.articleName=t.title||"未命名"):this.$alert({title:"setContent",content:"val值不正确"})},todoEdit:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e=arguments;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.length>0&&void 0!==e[0]&&e[0]){t.next=4;break}if("new"!==this.curNote._id&&this.articleName&&this.cacheName!==this.articleName){t.next=4;break}return t.abrupt("return");case 4:this.doPutNote();case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),todoSave:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e,o;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.articleName){t.next=2;break}return t.abrupt("return");case 2:return this.$showLoading(),t.next=5,this[d.NOTE_POST]({content:this.content,title:this.articleName,catalogId:this.createToCatalogId});case 5:(e=t.sent).err||(this.$toast({title:"添加成功"}),o=e.data.id,this.$emit("emitUpdateNote",{id:o,force:!0})),this.$hideLoading();case 8:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getData:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(e){var o,n,r,c,f=arguments;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=f.length>1&&void 0!==f[1]&&f[1],this.editId=e,this.$showLoading(),t.next=5,this[d.ARTICLE_DES_GET]({_id:e,force:o});case 5:(n=t.sent).err||(r=n.data,c=r.bookId,r.catalogId,void 0,this[l.BOOK_CUR_UPDATE](c)),this.$hideLoading();case 8:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),toDoPutNote:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.isVisitor){t.next=2;break}return t.abrupt("return");case 2:if(this.dataHasChange&&"new"!==this.curNote._id){t.next=4;break}return t.abrupt("return");case 4:this.doPutNote();case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),doPutNote:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.isEditContents=!1,this.$showLoading(),t.next=4,this[d.NOTE_PUT]({_id:this.curNote._id,title:this.articleName,content:this.content});case 4:e=t.sent,this.$hideLoading(),e.err||this.$toast({title:"修改成功"}),this.cacheName=this.articleName,this.cacheContent=this.content,this.$emit("emitUpdateNote",{force:!0});case 10:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),init:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e=this.$route.params.id)){t.next=5;break}return this.editId=e,t.next=5,this.getData(e);case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}),mounted:function(){this.init()}},m=(o(474),o(9)),component=Object(m.a)(h,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"article-layout flex direction-column flex-1 markdown"},[o("div",{staticClass:"article-title flex "},[o("div",{staticClass:"flex-1 schema-title-layout relative"},[t.isVisitor?o("div",{staticClass:"full-input"},[t._v(t._s(t.articleName))]):o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.articleName,expression:"articleName",modifiers:{trim:!0}}],staticClass:"full-input",domProps:{value:t.articleName},on:{blur:[function(e){return t.todoEdit(!1)},function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||(t.articleName=e.target.value.trim())}}})]),t._v(" "),t.isVisitor?t._e():o("div",{staticClass:"schema-operate"},[o("span",{directives:[{name:"show",rawName:"v-show",value:"new"===t.curNote._id,expression:"curNote._id==='new'"}],staticClass:"schema-operate-btn",class:{"disable-btn":!1},on:{click:t.todoSave}},[t._v("保存")])])]),t._v(" "),o("div",{staticClass:"flex-1 flex"},[o("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.toDoPutNote,expression:"toDoPutNote"}],staticClass:"article-content relative flex-1 flex",class:{noSave:t.dataHasChange},on:{click:function(e){t.isEditContents=!0},keydown:function(e){return(e.type.indexOf("key")||83===e.keyCode)&&e.ctrlKey?e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.toDoPutNote(e)):null}}},[o("div",{staticClass:"flex-1 relative"},[o("div",{staticClass:"form-layout theme-1"},[o("markdown-edit",{attrs:{onlyView:t.isVisitor,showEdit:"new"===t.curNote._id},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)])])])])},[],!1,null,"7b6faa0c",null);e.a=component.exports},472:function(t,e,o){"use strict";var n=o(250);o.n(n).a},473:function(t,e,o){(t.exports=o(11)(!1)).push([t.i,'[data-v-9527bd9e]:root{--text-color:red}.article-item[data-v-9527bd9e]{padding:10px 20px;width:100%;cursor:pointer;position:relative;border-bottom:1px solid #000}.article-item .article-item-title[data-v-9527bd9e]{font-size:17px;color:#ddd}.article-item .article-item-mark[data-v-9527bd9e]{margin-top:7px;font-size:12px}.article-item .operate-icon[data-v-9527bd9e]{width:30px;height:30px;border-radius:50%;right:7px;top:7px;position:absolute;z-index:1;background:#5f5f5f;opacity:0;-webkit-transform:scale(0);transform:scale(0);transition:.3s;text-align:center;line-height:30px;color:#19181d}.article-item .operate-icon .iconfont[data-v-9527bd9e]{font-size:18px}.article-item .operate-icon[data-v-9527bd9e]:hover{background:#f4606c;color:#fff}.article-item:hover .operate-icon[data-v-9527bd9e]{opacity:1;-webkit-transform:scale(1);transform:scale(1)}.article-item.act[data-v-9527bd9e]{background:#19181d}.article-item.act[data-v-9527bd9e]:after{content:"";position:absolute;width:4px;height:100%;left:0;top:0;background:#afb0b1}.article-layout[data-v-9527bd9e]{padding:15px 0;background:#2d2d2d;color:#919191;max-width:500px;transition:.3s}.article-layout .article-min-width[data-v-9527bd9e]{min-width:200px}.article-layout.hidden-article[data-v-9527bd9e]{max-width:0;overflow:hidden}.article-layout-input-box[data-v-9527bd9e]{background:#5f5f5f;color:#ddd;width:90%;height:40px;padding:0 10px;position:relative;margin:0 auto 10px}.article-layout-input-box .iconfont[data-v-9527bd9e]{display:block;position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.article-layout-input[data-v-9527bd9e]{height:100%;border:none;background:transparent;display:inline-block;color:#ddd;outline:#fff;padding-right:46px}.article-label[data-v-9527bd9e]{margin:7px 0}.article-label-item[data-v-9527bd9e]{display:inline-block;padding:2px 5px;background:#5f5f5f;color:#202020;border-radius:2px;margin-bottom:3px;font-size:12px}.article-item-box[data-v-9527bd9e]{overflow-y:auto;overflow-x:hidden}.shortcut-add-layout[data-v-9527bd9e]{position:absolute;bottom:10px;right:10px;background:#398dee;z-index:5;width:42px;height:42px;border-radius:42px;cursor:pointer;text-align:center;line-height:44px}.shortcut-add-layout .iconfont[data-v-9527bd9e]{font-size:30px;color:#2d2d2d}',""])},474:function(t,e,o){"use strict";var n=o(251);o.n(n).a},475:function(t,e,o){(t.exports=o(11)(!1)).push([t.i,"[data-v-7b6faa0c]:root{--text-color:red}.article-layout[data-v-7b6faa0c]{background:#eee;position:relative}.article-layout .form-label-layout[data-v-7b6faa0c]{width:100%;text-align:left;font-size:12px;color:#adabab;padding-left:0}.article-layout .form-content-layout[data-v-7b6faa0c]{background:#fff;padding:7px 20px}.article-layout .add-options-item[data-v-7b6faa0c]{margin:5px}.article-layout .form-input[data-v-7b6faa0c],.article-layout .from-select[data-v-7b6faa0c]{border:none;outline:none;padding:0}.article-layout .form-group[data-v-7b6faa0c]:not(:first-child){margin:0}.article-layout .form-content-layout-select[data-v-7b6faa0c]{padding-top:18px;padding-bottom:18px}.article-layout .markdown-layout[data-v-7b6faa0c]{min-height:500px;padding:10px}.article-layout-theme1 .article-content[data-v-7b6faa0c]{padding:40px}.article-layout-theme1 .form-label-layout[data-v-7b6faa0c]{display:none}.article-layout-theme1 .form-input[data-v-7b6faa0c],.article-layout-theme1 .from-select[data-v-7b6faa0c]{border:none;outline:none;font-size:20px}.article-title[data-v-7b6faa0c]{border-bottom:1px solid #e1e4e8;background:#fff;height:45px;line-height:45px;padding:0 15px}.article-title .operate-list-operate .iconfont[data-v-7b6faa0c]{font-size:20px;cursor:pointer}.article-title .operate-list-operate .icon-box[data-v-7b6faa0c]{border:1px solid #919191;border-radius:50%;width:30px;height:30px;line-height:30px;text-align:center;display:inline-block}.article-title .operate-list-operate .icon-box.act[data-v-7b6faa0c]{background:#398dee;color:#fff}.article-content[data-v-7b6faa0c]{padding:7px}.full-input[data-v-7b6faa0c]{font-size:17px;outline:none;color:#5f5f5f}.markdown .form-label-layout[data-v-7b6faa0c]{display:none}.markdown .article-content[data-v-7b6faa0c],.markdown .markdown-layout[data-v-7b6faa0c]{padding:0}.markdown .scroll-box[data-v-7b6faa0c]{overflow:hidden}.markdown .form-group[data-v-7b6faa0c],.markdown .form-layout[data-v-7b6faa0c]{height:100%}.article-content.noSave[data-v-7b6faa0c]{border:1px solid #f4606c}.schema-operate-btn[data-v-7b6faa0c]{height:30px;line-height:30px;width:80px;text-align:center;background:#202020;color:#fff;display:inline-block;border-radius:2px;font-size:14px;cursor:pointer}",""])}}]);