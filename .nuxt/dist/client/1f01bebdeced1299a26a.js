(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{212:function(t,e,o){"use strict";var r=o(6),n=o(12),c=o(22),l=(o(40),o(19),o(2)),d=(o(11),o(62),o(4)),f=o(3),h=o(114),m={name:"TreeItem",props:{curNode:{type:Object,require:!0},isNewDir:{type:Boolean,default:function(){return!1}}},data:function(){return{renameCatalog:!1,operateMenuStyle:{left:-1,top:"50%"},renameValue:"",newDir:{parentId:"",name:"新建文件夹",show:!1,isNew:!0}}},computed:Object(r.a)({},Object(n.e)({catalogs:function(t){return t.catalogs.list},catalogsIsOpen:function(t){return t.catalogs.isOpen},actCatalog:function(t){return t.catalogs.curCatalog},schemaList:function(t){return Object.values(t.schema.list).filter(function(t){return t.fields.length})},curBook:function(t){return t.books.curBook}}),Object(n.c)("catalogs",["treeChainList"]),{hasChild:function(){return this.catalogs[this.curNode._id]&&this.catalogs[this.curNode._id].childNodes&&this.catalogs[this.curNode._id].childNodes.length},isOpen:function(){var t=this.curNode._id;return this.catalogsIsOpen.indexOf(t)>-1}}),watch:{curNode:{handler:function(){},deep:!0}},methods:Object(r.a)({},Object(n.d)("catalogs",[d.CATALOGS_CUR_SAVE,d.CATALOGS_TEMPLATE_CREATE,d.CATALOGS_OPEN_TOGGLE,d.CATALOGS_OPEN_RESET]),Object(n.b)("catalogs",[f.CATALOGS_GET,f.CATALOGS_PUT,f.CATALOGS_POST,f.CATALOGS_DELETE]),Object(n.b)("articles",[f.ARTICLE_RECENTLY_LIST_GET]),{toggleOpenDir:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1?arguments[1]:void 0;console.log("data",t),this[d.CATALOGS_OPEN_TOGGLE]({id:e||this.curNode._id,force:t})},chooseCatalog:function(){var t=Object(l.a)(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.toggleOpenDir(!0),this[d.CATALOGS_CUR_SAVE](this.curNode._id),h.a.$emit("emitFromCatalog",e||Object(r.a)({},this.curNode,{catalogId:this.curNode._id}));case 3:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),getRecentlyArticles:function(){var t=Object(l.a)(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.$showLoading(),t.next=3,this[f.ARTICLE_RECENTLY_LIST_GET]();case 3:this.$hideLoading(),this[d.CATALOGS_CUR_SAVE]("recently");case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),showOperateMenu:function(t){if(!this.curNode.icon){var e=t.clientX,o=t.clientY;this.operateMenuStyle={top:"".concat(o,"px"),left:"".concat(e,"px")}}},closeMenu:function(){this.operateMenuStyle.left=-1},todoRename:function(){this.renameValue=this.curNode.name,this.closeMenu(),this.renameCatalog=!0},todoCreateFile:function(){this.chooseCatalog({catalogId:this.curNode._id,isNew:!0}),this.closeMenu()},todoDelete:function(){var t=this;this.closeMenu(),this.$alert({title:'你确认要删除"'.concat(this.curNode.name,'"')}).then(function(){var e=Object(l.a)(regeneratorRuntime.mark(function e(o){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.doDeleteCatalog();case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())},doDeleteCatalog:function(){var t=Object(l.a)(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.$showLoading(),t.next=3,this[f.CATALOGS_DELETE]({_id:this.curNode._id});case 3:if(e=t.sent,this.$hideLoading(),e.err){t.next=9;break}return this.$toast({title:"删除成功"}),t.next=9,this.getDate(this.curNode,!0,!0);case 9:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),doRename:function(){this.renameCatalog=!1,this.isNewDir?this.addCatalog(this.renameValue,this.curNode.parentId):this.renameValue&&this.renameValue!==this.curNode.name&&this.modifyCatalogName(this.renameValue,this.curNode)},submitCatalogName:function(t,e){e.isNew?this.addCatalog(t,e):this.modifyCatalogName(t,e)},modifyCatalogName:function(){var t=Object(l.a)(regeneratorRuntime.mark(function t(e,o){var r,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=o._id,n=o.parentId,t.next=3,this[f.CATALOGS_PUT]({_id:r,name:e,parentId:n});case 3:t.sent.err||this.getDate(o,!0,!0);case 5:case"end":return t.stop()}},t,this)}));return function(e,o){return t.apply(this,arguments)}}(),addCatalog:function(){var t=Object(l.a)(regeneratorRuntime.mark(function t(e,o){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this[f.CATALOGS_POST]({parentId:o,name:e,bookId:this.curBook});case 2:t.sent,this.$emit("emitExitNewDir");case 4:case"end":return t.stop()}},t,this)}));return function(e,o){return t.apply(this,arguments)}}(),exitNewDir:function(){this.getDate(this.curNode,!0,!0),this.newDir.parentId=""},doCreateTemDir:function(){this.toggleOpenDir(!0),this.closeMenu(),this.newDir.parentId=this.curNode._id,this.newDir.parentParentId=this.curNode.parentId},getDate:function(){var t=Object(l.a)(regeneratorRuntime.mark(function t(e,o,r){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e||this.curNode,t.next=3,this[f.CATALOGS_GET]({parentId:o?n.parentId||"root":n._id,bookId:this.curBook,force:r});case 3:case"end":return t.stop()}},t,this)}));return function(e,o,r){return t.apply(this,arguments)}}(),initOpenCatalog:function(){this.toggleOpenDir(!0,this.curNode.parentId)},init:function(){var t=this;$nuxt._route.params.catalogId===this.curNode._id&&(this.initOpenCatalog(),this.$emit("toInitOpenCatalog")),this.isNewDir&&this.todoRename(),document.addEventListener("click",function(e){t.$el.contains(e.target)})}}),mounted:function(){this.init()}},v=(o(239),o(8)),w={name:"Tree",data:function(){return{}},components:{TreeItem:Object(v.a)(m,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"catalogs-layout"},[o("div",{staticClass:"flex align-items-center catalogs-item-layout",class:{act:t.actCatalog===t.curNode._id||t.curNode._id.indexOf(t.actCatalog)>-1,"catalogs-item-hover":!(t.isNewDir||t.renameCatalog)},on:{click:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])?null:"button"in e&&0!==e.button?null:t.chooseCatalog(null)},contextmenu:function(e){return e.stopPropagation(),e.preventDefault(),o=e,t.showOperateMenu(o);var o}}},[t.catalogs[t.curNode._id]&&t.hasChild?o("div",{staticClass:"has-child",class:{"in-chain":t.isOpen||t.isOpen&&t.hasChild&&t.treeChainList&&t.treeChainList.indexOf(t.curNode._id)>-1},on:{click:function(e){return e.stopPropagation(),t.toggleOpenDir(!1)}}}):t._e(),t._v(" "),t.curNode.icon?o("i",{staticClass:"iconfont",class:t.curNode.icon,attrs:{id:t.curNode._id}}):t.treeChainList&&t.treeChainList.indexOf(t.curNode._id)>-1?o("i",{staticClass:"iconfont icon-wenjianjia",class:t.curNode.icon,attrs:{id:t.curNode._id}}):o("i",{staticClass:"iconfont icon-wendang1",attrs:{id:t.curNode._id}}),t._v(" "),t.curNode.isNew||t.renameCatalog?o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.renameValue,expression:"renameValue",modifiers:{trim:!0}},{name:"focus",rawName:"v-focus:select",arg:"select"}],staticClass:"edit-catalogs-input line-ellipsis",domProps:{value:t.renameValue},on:{blur:[t.doRename,function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||(t.renameValue=e.target.value.trim())}}}):o("div",{staticClass:"catalogs-name line-ellipsis"},[t._v(t._s(t.curNode.name))]),t._v(" "),t.curNode.icon?t._e():o("div",{staticClass:"operate-triangle-btn",on:{click:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])?null:"button"in e&&0!==e.button?null:(e.stopPropagation(),o=e,t.showOperateMenu(o));var o}}},[o("i",{staticClass:"iconfont icon-tianjiajiahaowubiankuang"})]),t._v(" "),-1!==t.operateMenuStyle.left?o("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.closeMenu,expression:"closeMenu"}],staticClass:"catalog-operate-layout",style:t.operateMenuStyle},[o("div",{staticClass:"catalog-operate-item",on:{click:function(e){return e.stopPropagation(),t.todoCreateFile()}}},[t._v("\n        新建笔记\n      ")]),t._v(" "),o("div",{staticClass:"catalog-operate-item",on:{click:function(e){return e.stopPropagation(),t.doCreateTemDir(e)}}},[t._v("新建文件夹")]),t._v(" "),"root"!==t.curNode._id?o("div",{staticClass:"catalog-operate-item",on:{click:function(e){return e.stopPropagation(),t.todoRename(e)}}},[t._v("重命名")]):t._e(),t._v(" "),"root"!==t.curNode._id?o("div",{staticClass:"catalog-operate-item",on:{click:function(e){return e.stopPropagation(),t.todoDelete(e)}}},[t._v("删除")]):t._e()]):t._e()]),t._v(" "),t.catalogs[t.curNode._id]&&t.catalogs[t.curNode._id].childNodes&&t.catalogs[t.curNode._id].childNodes.length?o("div",t._l(t.catalogs[t.curNode._id].childNodes,function(e,r){return o("TreeItem",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}],key:r,attrs:{curNode:e},on:{toInitOpenCatalog:t.initOpenCatalog}})}),1):t._e(),t._v(" "),t.newDir.parentId===t.curNode._id?o("TreeItem",{attrs:{curNode:t.newDir,isNewDir:t.newDir.parentId===t.curNode._id},on:{emitExitNewDir:t.exitNewDir}}):t._e()],1)},[],!1,null,"907b8f0e",null).exports},computed:Object(r.a)({},Object(n.e)({curBook:function(t){return t.books.curBook}}),{catalogList:function(){return[{_id:c.a.recentlyArticlesKey,name:"最近文档",hasChild:!1,icon:"icon-wendang"},{_id:this.curBook+"_root",name:"我的文件夹",hasChild:!0}]}})},x=Object(v.a)(w,function(){var t=this.$createElement,e=this._self._c||t;return e("div",this._l(this.catalogList,function(t,o){return e("TreeItem",{key:t._id,attrs:{curNode:t,treeChain:[t._id]}})}),1)},[],!1,null,"67b6efb0",null);e.a=x.exports},213:function(t,e,o){"use strict";var r=o(6),n=o(12),c=o(4),l={name:"articleFixed",computed:Object(r.a)({},Object(n.e)({showDir:function(t){return t.config.showDir},showBrief:function(t){return t.config.showBrief}})),methods:Object(r.a)({},Object(n.d)("config",[c.CONFIG_TOGGLE_SAVE]),{doSetConfig:function(t){this[c.CONFIG_TOGGLE_SAVE]({tar:t,val:!this[t]})}}),mounted:function(){window.localStorage.getItem("showDir"),window.localStorage.getItem("showBrief")}},d=(o(435),o(8)),component=Object(d.a)(l,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"controller-layout-fixed"},[o("div",{staticClass:"controller-layout-item",class:{act:t.showDir},on:{click:function(e){return e.stopPropagation(),t.doSetConfig("showDir",!t.showDir)}}},[o("i",{staticClass:"iconfont icon-neirong"})]),t._v(" "),o("div",{staticClass:"controller-layout-item",class:{act:t.showBrief},on:{click:function(e){return e.stopPropagation(),t.doSetConfig("showBrief",!t.showBrief)}}},[o("i",{staticClass:"iconfont icon-shujia1"})])])},[],!1,null,"bd510b56",null);e.a=component.exports},214:function(t,e,o){var content=o(240);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(18).default)("20a7dab0",content,!0,{sourceMap:!1})},217:function(t,e,o){var content=o(432);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(18).default)("614a4b95",content,!0,{sourceMap:!1})},219:function(t,e,o){var content=o(436);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(18).default)("d707c14c",content,!0,{sourceMap:!1})},238:function(t,e,o){"use strict";o(41);var r=o(235),n=o.n(r),c=o(236),l=o.n(c),d=new n.a.Renderer;function f(text){return text.replace(/C\(N\)/g,'<span class="marked-checkBox"></span>').replace(/C\(Y\)/g,'<span class="marked-checkBox"><i class="iconfont icon-gou1"></i></span>')}n.a.setOptions({renderer:d,gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!0,smartypants:!1,highlight:function(code){return l.a.highlightAuto(code).value}});var h={model:{prop:"data",event:"update"},props:{data:String,onlyView:{default:function(){return!0}}},data:function(){return{split:.5,markDownValue:"",editMode:1,isEdit:!1,isPreview:!0,markdownHTML:f(n()(this.data))||""}},watch:{data:function(t){this.markDownValue=this.data||""},markDownValue:function(t){var e=this;this.isPreview&&(clearTimeout(this.timeOut),this.timeOut=setTimeout(function(){e.markdownHTML=f(n()(t))},500)),this.$emit("update",t)}},methods:{toggleEdit:function(){this.isEdit=!this.isEdit,this.isEdit||(this.isPreview=!0)},togglePreview:function(){this.isPreview=!this.isPreview,this.isPreview||(this.isEdit=!0)}},mounted:function(){this.markDownValue=this.data||"",this.isEdit&&(this.isEdit=!1)}},m=(o(431),o(8)),component=Object(m.a)(h,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"code-mirror absolute-full flex direction-column markdown-layout"},[o("div",{staticClass:"flex-1 flex absolute-full",class:{hideSplit:3!==t.editMode}},[t.onlyView?t._e():o("div",{staticClass:"markdown-operate-layout"},[o("div",{staticClass:"icon-layout",class:{act:t.isEdit},on:{click:t.toggleEdit}},[o("i",{staticClass:"iconfont icon-bianji2"})]),t._v(" "),o("div",{staticClass:"icon-layout",class:{act:t.isPreview},on:{click:t.togglePreview}},[o("i",{staticClass:"iconfont icon-yulan"})])]),t._v(" "),t.isEdit?o("div",{staticClass:"flex-1 relative"},[o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.markDownValue,expression:"markDownValue"}],staticClass:"markdown-edit-box box-shadow-inset",domProps:{value:t.markDownValue},on:{input:function(e){e.target.composing||(t.markDownValue=e.target.value)}}})]):t._e(),t._v(" "),t.isPreview?o("div",{staticClass:"flex-1 md-body-layout edit-layout relative"},[o("div",{staticClass:"markdown-style",class:{"black-theme":t.onlyView},domProps:{innerHTML:t._s(t.markdownHTML)}})]):t._e()])])},[],!1,null,"6fbbc2ce",null);e.a=component.exports},239:function(t,e,o){"use strict";var r=o(214);o.n(r).a},240:function(t,e,o){(t.exports=o(17)(!1)).push([t.i,'[data-v-907b8f0e]:root{--text-color:red}.catalogs-layout .catalogs-layout[data-v-907b8f0e]{padding-left:20px}.iconfont[data-v-907b8f0e]{font-size:25px;position:relative}.catalogs-item-layout[data-v-907b8f0e]{cursor:pointer;padding:7px 25px;position:relative;transition:.3s}.catalogs-item-layout .icon-open[data-v-907b8f0e]{display:none}.catalogs-item-layout .icon-close[data-v-907b8f0e]{display:block}.catalogs-item-layout[data-v-907b8f0e]:after{content:"";background:transparent;position:absolute;top:0;width:100%;height:100%;left:-100%;transition:.3s}.operate-triangle-btn[data-v-907b8f0e]{display:none;position:absolute;width:16px;height:16px;right:12px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.operate-triangle-btn .iconfont[data-v-907b8f0e]{font-size:15px}.catalogs-item-layout .has-child[data-v-907b8f0e]{position:absolute;border-left:6px solid #919191;border-top:5px solid transparent;border-bottom:5px solid transparent;width:0;height:0;left:12px;top:50%;-webkit-transform:translateY(-6px);transform:translateY(-6px);transition:.2s}.catalogs-item-layout .has-child[data-v-907b8f0e]:after{content:"";width:20px;height:20px;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.catalogs-item-layout .has-child.in-chain[data-v-907b8f0e]{-webkit-transform:translateY(-6px) rotate(90deg);transform:translateY(-6px) rotate(90deg)}.catalogs-item-hover[data-v-907b8f0e]:hover{background:#404040;color:#ddd}.catalogs-item-hover:hover .operate-triangle-btn[data-v-907b8f0e]{display:block;color:#ddd}.catalogs-item-hover[data-v-907b8f0e]:hover:after{background:#404040}.catalogs-item-layout.act[data-v-907b8f0e]{background:#5f5f5f;color:#ddd}.catalogs-item-layout.act .icon-open[data-v-907b8f0e]{display:block}.catalogs-item-layout.act .icon-close[data-v-907b8f0e]{display:none}.catalogs-item-layout.act[data-v-907b8f0e]:after,.catalogs-item-layout.act[data-v-907b8f0e]:hover,.catalogs-item-layout.act[data-v-907b8f0e]:hover:after{background:#5f5f5f}.catalogs-name[data-v-907b8f0e],.edit-catalogs-input[data-v-907b8f0e]{position:relative;max-width:150px;padding:0 5px}.edit-catalogs-input[data-v-907b8f0e]{z-index:1;background:transparent;vertical-align:bottom;border:none;color:inherit;font-size:inherit;height:25px}.catalog-operate-layout[data-v-907b8f0e]{position:fixed;background:rgba(0,0,0,.8);left:50%;top:50%;color:#fff;z-index:999;border-radius:5px}.catalog-operate-layout .catalog-operate-item[data-v-907b8f0e]{width:150px;padding:10px 20px;position:relative}.catalog-operate-layout .catalog-operate-item[data-v-907b8f0e]:not(:last-child){border-bottom:1px solid hsla(0,0%,100%,.2)}.catalog-operate-layout .catalog-operate-item.hadChild[data-v-907b8f0e]:after{content:"";position:absolute;border-left:4px solid #fff;border-top:4px solid transparent;border-bottom:4px solid transparent;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.catalog-operate-layout .catalog-operate-item:hover .operate-item-child[data-v-907b8f0e]{display:block}.catalog-operate-layout .operate-item-child[data-v-907b8f0e]{position:absolute;left:100%;top:0;width:100%;border-radius:0 5px 5px 0;background:rgba(0,0,0,.8);border-left:1px solid hsla(0,0%,100%,.2);display:none}.catalog-operate-layout .catalog-operate-item.builtIn[data-v-907b8f0e]{border-bottom:1px solid hsla(0,0%,100%,.6)}#hello_recent[data-v-907b8f0e]{font-size:24px}',""])},431:function(t,e,o){"use strict";var r=o(217);o.n(r).a},432:function(t,e,o){(t.exports=o(17)(!1)).push([t.i,'[data-v-6fbbc2ce]:root{--text-color:red}#codeMirror[data-v-6fbbc2ce],.showCompileMarkdownBox[data-v-6fbbc2ce]{width:100%;height:100%}.code-mirror .demo-split-pane[data-v-6fbbc2ce]{padding:10px;overflow:auto}.code-mirror .showCompileMarkdownBox[data-v-6fbbc2ce]{padding:0 7px;overflow:auto;word-break:break-all}.code-mirror .ivu-split-horizontal[data-v-6fbbc2ce]{height:100%}.code-mirror .code-mirror-tags[data-v-6fbbc2ce]{background:#202020;position:relative}.code-mirror .code-mirror-tags .tags-item[data-v-6fbbc2ce]{border-bottom:1px solid #fff;position:relative;display:inline-block;padding:12px 15px;cursor:pointer}.code-mirror .code-mirror-tags .tags-item.act[data-v-6fbbc2ce]{color:#515a6e;background:#fff;z-index:2}.code-mirror .code-mirror-tags .tags-item[data-v-6fbbc2ce]:hover{color:#000}.code-mirror .code-mirror-tags .tags-item-2[data-v-6fbbc2ce]{display:inline-block;float:right;cursor:pointer}.code-mirror .code-mirror-tags .tags-item-2.act[data-v-6fbbc2ce]{background:#313131;color:#fff}.code-mirror .code-mirror-tags[data-v-6fbbc2ce]:after{content:"";height:1px;background:#e1e4e8;position:absolute;width:100%;left:0;z-index:1;bottom:0}.markdown-layout .markdown-edit-box[data-v-6fbbc2ce]{width:100%;height:100%;overflow:auto;padding:20px;background:#202020;color:#919191;border:none;outline:none;font-size:14px}.markdown-layout .md-body-layout[data-v-6fbbc2ce]{overflow:auto;background:#fff;padding:0;box-shadow:inset 0 0 4px 1px #e7eaef}.markdown-layout .markdown-operate-layout[data-v-6fbbc2ce]{position:absolute;z-index:2;right:20px;top:10px;color:#fff}.markdown-layout .markdown-operate-layout .icon-layout[data-v-6fbbc2ce]{display:inline-block;background:rgba(0,0,0,.7);padding:3px 5px;cursor:pointer;border-radius:3px;text-align:center}.markdown-layout .markdown-operate-layout .icon-layout.act[data-v-6fbbc2ce]{background:rgba(57,141,238,.7)}',""])},435:function(t,e,o){"use strict";var r=o(219);o.n(r).a},436:function(t,e,o){(t.exports=o(17)(!1)).push([t.i,"[data-v-bd510b56]:root{--text-color:red}.controller-layout-fixed[data-v-bd510b56]{position:fixed;bottom:50px;left:0;z-index:10}.controller-layout-fixed .controller-layout-item[data-v-bd510b56]{width:30px;height:30px;line-height:30px;cursor:pointer;background:#919191;border-radius:0 20px 20px 0;margin-bottom:10px;text-align:center}.controller-layout-fixed .iconfont[data-v-bd510b56]{font-size:18px}.controller-layout-fixed .controller-layout-item.act[data-v-bd510b56]{background:#fff}",""])}}]);