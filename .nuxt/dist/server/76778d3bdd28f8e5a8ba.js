exports.ids=[2,1],exports.modules={100:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,'[data-v-6fbbc2ce]:root{--text-color:red}#codeMirror[data-v-6fbbc2ce],.showCompileMarkdownBox[data-v-6fbbc2ce]{width:100%;height:100%}.code-mirror .demo-split-pane[data-v-6fbbc2ce]{padding:10px;overflow:auto}.code-mirror .showCompileMarkdownBox[data-v-6fbbc2ce]{padding:0 7px;overflow:auto;word-break:break-all}.code-mirror .ivu-split-horizontal[data-v-6fbbc2ce]{height:100%}.code-mirror .code-mirror-tags[data-v-6fbbc2ce]{background:#202020;position:relative}.code-mirror .code-mirror-tags .tags-item[data-v-6fbbc2ce]{border-bottom:1px solid #fff;position:relative;display:inline-block;padding:12px 15px;cursor:pointer}.code-mirror .code-mirror-tags .tags-item.act[data-v-6fbbc2ce]{color:#515a6e;background:#fff;z-index:2}.code-mirror .code-mirror-tags .tags-item[data-v-6fbbc2ce]:hover{color:#000}.code-mirror .code-mirror-tags .tags-item-2[data-v-6fbbc2ce]{display:inline-block;float:right;cursor:pointer}.code-mirror .code-mirror-tags .tags-item-2.act[data-v-6fbbc2ce]{background:#313131;color:#fff}.code-mirror .code-mirror-tags[data-v-6fbbc2ce]:after{content:"";height:1px;background:#e1e4e8;position:absolute;width:100%;left:0;z-index:1;bottom:0}.markdown-layout .markdown-edit-box[data-v-6fbbc2ce]{width:100%;height:100%;overflow:auto;padding:20px;background:#202020;color:#919191;border:none;outline:none;font-size:14px}.markdown-layout .md-body-layout[data-v-6fbbc2ce]{overflow:auto;background:#fff;padding:0;box-shadow:inset 0 0 4px 1px #e7eaef}.markdown-layout .markdown-operate-layout[data-v-6fbbc2ce]{position:absolute;z-index:2;right:20px;top:10px;color:#fff}.markdown-layout .markdown-operate-layout .icon-layout[data-v-6fbbc2ce]{display:inline-block;background:rgba(0,0,0,.7);padding:3px 5px;cursor:pointer;border-radius:3px;text-align:center}.markdown-layout .markdown-operate-layout .icon-layout.act[data-v-6fbbc2ce]{background:rgba(57,141,238,.7)}',""])},101:function(t,e,o){"use strict";o.r(e);var r=o(94),n=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,function(){return r[t]})}(d);e.default=n.a},102:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,"[data-v-bd510b56]:root{--text-color:red}.controller-layout-fixed[data-v-bd510b56]{position:fixed;bottom:50px;left:0;z-index:10}.controller-layout-fixed .controller-layout-item[data-v-bd510b56]{width:30px;height:30px;line-height:30px;cursor:pointer;background:#919191;border-radius:0 20px 20px 0;margin-bottom:10px;text-align:center}.controller-layout-fixed .iconfont[data-v-bd510b56]{font-size:18px}.controller-layout-fixed .controller-layout-item.act[data-v-bd510b56]{background:#fff}",""])},103:function(t,e,o){"use strict";function r(t,e){return e?"root"===t?`${e}_root`:t:t.indexOf("root")>-1?"root":t}o.d(e,"a",function(){return r})},104:function(t,e,o){var content=o(125);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(7).default;t.exports.__inject__=function(t){r("2cd04a4d",content,!0,t)}},105:function(t,e,o){var content=o(127);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(7).default;t.exports.__inject__=function(t){r("0b4b81de",content,!0,t)}},106:function(t,e,o){"use strict";var r=o(5),n=o(8),d=o(2),c=o(0),l=o(31),f={name:"TreeItem",props:{curNode:{type:Object,require:!0},isNewDir:{type:Boolean,default:function(){return!1}}},data:()=>({renameCatalog:!1,operateMenuStyle:{left:-1,top:"50%"},renameValue:"",newDir:{parentId:"",name:"新建文件夹",show:!1,isNew:!0}}),computed:{...Object(r.mapState)({catalogs:t=>t.catalogs.list,catalogsIsOpen:t=>t.catalogs.isOpen,actCatalog:t=>t.catalogs.curCatalog,schemaList:t=>Object.values(t.schema.list).filter(t=>t.fields.length),curBook:t=>t.books.curBook}),...Object(r.mapGetters)("catalogs",["treeChainList"]),hasChild(){return this.catalogs[this.curNode._id]&&this.catalogs[this.curNode._id].childNodes&&this.catalogs[this.curNode._id].childNodes.length},isOpen(){const t=this.curNode._id;return this.catalogsIsOpen.indexOf(t)>-1}},watch:{curNode:{handler(){},deep:!0}},methods:{...Object(r.mapMutations)("catalogs",[d.CATALOGS_CUR_SAVE,d.CATALOGS_TEMPLATE_CREATE,d.CATALOGS_OPEN_TOGGLE,d.CATALOGS_OPEN_RESET]),...Object(r.mapActions)("catalogs",[c.CATALOGS_GET,c.CATALOGS_PUT,c.CATALOGS_POST,c.CATALOGS_DELETE]),...Object(r.mapActions)("articles",[c.ARTICLE_RECENTLY_LIST_GET]),toggleOpenDir(t=!1,e){console.log("data",t),this[d.CATALOGS_OPEN_TOGGLE]({id:e||this.curNode._id,force:t})},async chooseCatalog(t){this.toggleOpenDir(!0),this[d.CATALOGS_CUR_SAVE](this.curNode._id),l.a.$emit("emitFromCatalog",t||{...this.curNode,catalogId:this.curNode._id})},async getRecentlyArticles(){this.$showLoading(),await this[c.ARTICLE_RECENTLY_LIST_GET](),this.$hideLoading(),this[d.CATALOGS_CUR_SAVE]("recently")},showOperateMenu(t){if(this.curNode.icon)return;const{clientX:e,clientY:o}=t;this.operateMenuStyle={top:`${o}px`,left:`${e}px`}},closeMenu(){this.operateMenuStyle.left=-1},todoRename(){this.renameValue=this.curNode.name,this.closeMenu(),this.renameCatalog=!0},todoCreateFile(){this.chooseCatalog({catalogId:this.curNode._id,isNew:!0}),this.closeMenu()},todoDelete(){this.closeMenu(),this.$alert({title:`你确认要删除"${this.curNode.name}"`}).then(async t=>{this.doDeleteCatalog()})},async doDeleteCatalog(){this.$showLoading();const t=await this[c.CATALOGS_DELETE]({_id:this.curNode._id});this.$hideLoading(),t.err||(this.$toast({title:"删除成功"}),await this.getDate(this.curNode,!0,!0))},doRename(){this.renameCatalog=!1,this.isNewDir?this.addCatalog(this.renameValue,this.curNode.parentId):this.renameValue&&this.renameValue!==this.curNode.name&&this.modifyCatalogName(this.renameValue,this.curNode)},submitCatalogName(t,e){const{isNew:o}=e;o?this.addCatalog(t,e):this.modifyCatalogName(t,e)},async modifyCatalogName(t,e){const{_id:o,parentId:r}=e;(await this[c.CATALOGS_PUT]({_id:o,name:t,parentId:r})).err||this.getDate(e,!0,!0)},async addCatalog(t,e){await this[c.CATALOGS_POST]({parentId:e,name:t,bookId:this.curBook});this.$emit("emitExitNewDir")},exitNewDir(){this.getDate(this.curNode,!0,!0),this.newDir.parentId=""},doCreateTemDir(){this.toggleOpenDir(!0),this.closeMenu(),this.newDir.parentId=this.curNode._id,this.newDir.parentParentId=this.curNode.parentId},async getDate(t,e,o){const r=t||this.curNode;await this[c.CATALOGS_GET]({parentId:e?r.parentId||"root":r._id,bookId:this.curBook,force:o})},initOpenCatalog(){this.toggleOpenDir(!0,this.curNode.parentId)},init(){const{catalogId:t}=$nuxt._route.params;t===this.curNode._id&&(this.initOpenCatalog(),this.$emit("toInitOpenCatalog")),this.isNewDir&&this.todoRename(),document.addEventListener("click",t=>{this.$el.contains(t.target)})}},mounted(){this.init()}},h=o(4);var m={name:"Tree",data:()=>({}),components:{TreeItem:Object(h.a)(f,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"catalogs-layout"},[t._ssrNode("<div"+t._ssrClass("flex align-items-center catalogs-item-layout",{act:t.actCatalog===t.curNode._id||t.curNode._id.indexOf(t.actCatalog)>-1,"catalogs-item-hover":!(t.isNewDir||t.renameCatalog)})+" data-v-907b8f0e>","</div>",[t._ssrNode((t.catalogs[t.curNode._id]&&t.hasChild?"<div"+t._ssrClass("has-child",{"in-chain":t.isOpen||t.isOpen&&t.hasChild&&t.treeChainList&&t.treeChainList.indexOf(t.curNode._id)>-1})+" data-v-907b8f0e></div>":"\x3c!----\x3e")+" "+(t.curNode.icon?"<i"+t._ssrAttr("id",t.curNode._id)+t._ssrClass("iconfont",t.curNode.icon)+" data-v-907b8f0e></i>":t.treeChainList&&t.treeChainList.indexOf(t.curNode._id)>-1?"<i"+t._ssrAttr("id",t.curNode._id)+t._ssrClass("iconfont icon-wenjianjia",t.curNode.icon)+" data-v-907b8f0e></i>":"<i"+t._ssrAttr("id",t.curNode._id)+' class="iconfont icon-wendang1" data-v-907b8f0e></i>')+" "),t.curNode.isNew||t.renameCatalog?o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.renameValue,expression:"renameValue",modifiers:{trim:!0}},{name:"focus",rawName:"v-focus:select",arg:"select"}],staticClass:"edit-catalogs-input line-ellipsis",domProps:{value:t.renameValue},on:{blur:[t.doRename,function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||(t.renameValue=e.target.value.trim())}}},[]):t._ssrNode('<div class="catalogs-name line-ellipsis" data-v-907b8f0e>'+t._ssrEscape(t._s(t.curNode.name))+"</div>"),t._ssrNode(" "+(t.curNode.icon?"\x3c!----\x3e":'<div class="operate-triangle-btn" data-v-907b8f0e><i class="iconfont icon-tianjiajiahaowubiankuang" data-v-907b8f0e></i></div>')+" "),-1!==t.operateMenuStyle.left?o("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.closeMenu,expression:"closeMenu"}],staticClass:"catalog-operate-layout",style:t.operateMenuStyle},[t._ssrNode('<div class="catalog-operate-item" data-v-907b8f0e>\n        新建笔记\n      </div> <div class="catalog-operate-item" data-v-907b8f0e>新建文件夹</div> '+("root"!==t.curNode._id?'<div class="catalog-operate-item" data-v-907b8f0e>重命名</div>':"\x3c!----\x3e")+" "+("root"!==t.curNode._id?'<div class="catalog-operate-item" data-v-907b8f0e>删除</div>':"\x3c!----\x3e"))]):t._e()],2),t._ssrNode(" "),t.catalogs[t.curNode._id]&&t.catalogs[t.curNode._id].childNodes&&t.catalogs[t.curNode._id].childNodes.length?t._ssrNode("<div data-v-907b8f0e>","</div>",t._l(t.catalogs[t.curNode._id].childNodes,function(e,r){return o("TreeItem",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}],key:r,attrs:{curNode:e},on:{toInitOpenCatalog:t.initOpenCatalog}})}),1):t._e(),t._ssrNode(" "),t.newDir.parentId===t.curNode._id?o("TreeItem",{attrs:{curNode:t.newDir,isNewDir:t.newDir.parentId===t.curNode._id},on:{emitExitNewDir:t.exitNewDir}}):t._e()],2)},[],!1,function(t){var e=o(97);e.__inject__&&e.__inject__(t)},"907b8f0e","52ebc2f5").exports},computed:{...Object(r.mapState)({curBook:t=>t.books.curBook}),catalogList(){return[{_id:n.a.recentlyArticlesKey,name:"最近文档",hasChild:!1,icon:"icon-wendang"},{_id:this.curBook+"_root",name:"我的文件夹",hasChild:!0}]}}};var v=Object(h.a)(m,function(){var t=this.$createElement,e=this._self._c||t;return e("div",this._l(this.catalogList,function(t,o){return e("TreeItem",{key:t._id,attrs:{curNode:t,treeChain:[t._id]}})}),1)},[],!1,function(t){},"67b6efb0","106400fe");e.a=v.exports},107:function(t,e,o){"use strict";var r=o(5),n=o(2),d={name:"articleFixed",computed:{...Object(r.mapState)({showDir:t=>t.config.showDir,showBrief:t=>t.config.showBrief})},methods:{...Object(r.mapMutations)("config",[n.CONFIG_TOGGLE_SAVE]),doSetConfig(t){this[n.CONFIG_TOGGLE_SAVE]({tar:t,val:!this[t]})}},mounted(){}},c=o(4);var component=Object(c.a)(d,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"controller-layout-fixed"},[this._ssrNode("<div"+this._ssrClass("controller-layout-item",{act:this.showDir})+' data-v-bd510b56><i class="iconfont icon-neirong" data-v-bd510b56></i></div> <div'+this._ssrClass("controller-layout-item",{act:this.showBrief})+' data-v-bd510b56><i class="iconfont icon-shujia1" data-v-bd510b56></i></div>')])},[],!1,function(t){var e=o(101);e.__inject__&&e.__inject__(t)},"bd510b56","40b97ea4");e.a=component.exports},108:function(t,e,o){"use strict";var r=o(90),n=o.n(r),d=o(91),c=o.n(d);const l=new n.a.Renderer;function f(text){return text.replace(/C\(N\)/g,'<span class="marked-checkBox"></span>').replace(/C\(Y\)/g,'<span class="marked-checkBox"><i class="iconfont icon-gou1"></i></span>')}n.a.setOptions({renderer:l,gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!0,smartypants:!1,highlight:function(code){return c.a.highlightAuto(code).value}});var h={model:{prop:"data",event:"update"},props:{data:String,onlyView:{default:()=>!0}},data(){return{split:.5,markDownValue:"",editMode:1,isEdit:!1,isPreview:!0,markdownHTML:f(n()(this.data))||""}},watch:{data:function(t){this.markDownValue=this.data||""},markDownValue:function(t){this.isPreview&&(clearTimeout(this.timeOut),this.timeOut=setTimeout(()=>{this.markdownHTML=f(n()(t))},500)),this.$emit("update",t)}},methods:{toggleEdit(){this.isEdit=!this.isEdit,this.isEdit||(this.isPreview=!0)},togglePreview(){this.isPreview=!this.isPreview,this.isPreview||(this.isEdit=!0)}},mounted(){this.markDownValue=this.data||"",this.isEdit&&(this.isEdit=!1)}},m=o(4);var component=Object(m.a)(h,function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"code-mirror absolute-full flex direction-column markdown-layout"},[t._ssrNode("<div"+t._ssrClass("flex-1 flex absolute-full",{hideSplit:3!==t.editMode})+" data-v-6fbbc2ce>"+(t.onlyView?"\x3c!----\x3e":'<div class="markdown-operate-layout" data-v-6fbbc2ce><div'+t._ssrClass("icon-layout",{act:t.isEdit})+' data-v-6fbbc2ce><i class="iconfont icon-bianji2" data-v-6fbbc2ce></i></div> <div'+t._ssrClass("icon-layout",{act:t.isPreview})+' data-v-6fbbc2ce><i class="iconfont icon-yulan" data-v-6fbbc2ce></i></div></div>')+" "+(t.isEdit?'<div class="flex-1 relative" data-v-6fbbc2ce><textarea class="markdown-edit-box box-shadow-inset" data-v-6fbbc2ce>'+t._ssrEscape(t._s(t.markDownValue))+"</textarea></div>":"\x3c!----\x3e")+" "+(t.isPreview?'<div class="flex-1 md-body-layout edit-layout relative" data-v-6fbbc2ce><div'+t._ssrClass("markdown-style",{"black-theme":t.onlyView})+" data-v-6fbbc2ce>"+t._s(t.markdownHTML)+"</div></div>":"\x3c!----\x3e")+"</div>")])},[],!1,function(t){var e=o(99);e.__inject__&&e.__inject__(t)},"6fbbc2ce","52af9afa");e.a=component.exports},109:function(t,e,o){"use strict";o.r(e);var r=o(95),n=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,function(){return r[t]})}(d);e.default=n.a},110:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,'[data-v-7f07d36a]:root{--text-color:red}.article-item[data-v-7f07d36a]{padding:10px 20px;width:100%;cursor:pointer;position:relative;border-bottom:1px solid #000}.article-item .article-item-title[data-v-7f07d36a]{font-size:17px;color:#ddd}.article-item .article-item-mark[data-v-7f07d36a]{margin-top:7px;font-size:12px}.article-item .operate-icon[data-v-7f07d36a]{width:30px;height:30px;border-radius:50%;right:7px;top:7px;position:absolute;z-index:1;background:#5f5f5f;opacity:0;-webkit-transform:scale(0);transform:scale(0);transition:.3s;text-align:center;line-height:30px;color:#19181d}.article-item .operate-icon .iconfont[data-v-7f07d36a]{font-size:18px}.article-item .operate-icon[data-v-7f07d36a]:hover{background:#f4606c;color:#fff}.article-item:hover .operate-icon[data-v-7f07d36a]{opacity:1;-webkit-transform:scale(1);transform:scale(1)}.article-item.act[data-v-7f07d36a]{background:#19181d}.article-item.act[data-v-7f07d36a]:after{content:"";position:absolute;width:4px;height:100%;left:0;top:0;background:#afb0b1}.article-layout[data-v-7f07d36a]{padding:15px 0;background:#2d2d2d;color:#919191;max-width:500px;transition:.3s}.article-layout .article-min-width[data-v-7f07d36a]{min-width:200px}.article-layout.hidden-article[data-v-7f07d36a]{max-width:0;overflow:hidden}.article-layout-input-box[data-v-7f07d36a]{background:#5f5f5f;color:#ddd;width:90%;height:40px;padding:0 10px;position:relative;margin:0 auto 10px}.article-layout-input-box .iconfont[data-v-7f07d36a]{display:block;position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.article-layout-input[data-v-7f07d36a]{height:100%;border:none;background:transparent;display:inline-block;color:#ddd;outline:#fff;padding-right:46px}.article-label[data-v-7f07d36a]{margin:7px 0}.article-label-item[data-v-7f07d36a]{display:inline-block;padding:2px 5px;background:#5f5f5f;color:#202020;border-radius:2px;margin-bottom:3px;font-size:12px}.article-item-box[data-v-7f07d36a]{overflow-y:auto;overflow-x:hidden}.shortcut-add-layout[data-v-7f07d36a]{position:absolute;bottom:10px;right:10px;background:#398dee;z-index:5;width:42px;height:42px;border-radius:42px;cursor:pointer;text-align:center;line-height:44px}.shortcut-add-layout .iconfont[data-v-7f07d36a]{font-size:30px;color:#2d2d2d}',""])},111:function(t,e,o){"use strict";o.r(e);var r=o(96),n=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,function(){return r[t]})}(d);e.default=n.a},112:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,"[data-v-ce72d4fe]:root{--text-color:red}.article-layout[data-v-ce72d4fe]{background:#eee;position:relative}.article-layout .form-label-layout[data-v-ce72d4fe]{width:100%;text-align:left;font-size:12px;color:#adabab;padding-left:0}.article-layout .form-content-layout[data-v-ce72d4fe]{background:#fff;padding:7px 20px}.article-layout .add-options-item[data-v-ce72d4fe]{margin:5px}.article-layout .form-input[data-v-ce72d4fe],.article-layout .from-select[data-v-ce72d4fe]{border:none;outline:none;padding:0}.article-layout .form-group[data-v-ce72d4fe]:not(:first-child){margin:0}.article-layout .form-content-layout-select[data-v-ce72d4fe]{padding-top:18px;padding-bottom:18px}.article-layout .markdown-layout[data-v-ce72d4fe]{min-height:500px;padding:10px}.article-layout-theme1 .article-content[data-v-ce72d4fe]{padding:40px}.article-layout-theme1 .form-label-layout[data-v-ce72d4fe]{display:none}.article-layout-theme1 .form-input[data-v-ce72d4fe],.article-layout-theme1 .from-select[data-v-ce72d4fe]{border:none;outline:none;font-size:20px}.article-title[data-v-ce72d4fe]{border-bottom:1px solid #e1e4e8;background:#fff;height:45px;line-height:45px;padding:0 15px}.article-title .operate-list-operate .iconfont[data-v-ce72d4fe]{font-size:20px;cursor:pointer}.article-title .operate-list-operate .icon-box[data-v-ce72d4fe]{border:1px solid #919191;border-radius:50%;width:30px;height:30px;line-height:30px;text-align:center;display:inline-block}.article-title .operate-list-operate .icon-box.act[data-v-ce72d4fe]{background:#398dee;color:#fff}.article-content[data-v-ce72d4fe]{padding:7px}.full-input[data-v-ce72d4fe]{font-size:17px;outline:none;color:#5f5f5f}.markdown .form-label-layout[data-v-ce72d4fe]{display:none}.markdown .article-content[data-v-ce72d4fe],.markdown .markdown-layout[data-v-ce72d4fe]{padding:0}.markdown .scroll-box[data-v-ce72d4fe]{overflow:hidden}.markdown .form-group[data-v-ce72d4fe],.markdown .form-layout[data-v-ce72d4fe]{height:100%}.article-content.noSave[data-v-ce72d4fe]{border:1px solid #f4606c}.schema-operate-btn[data-v-ce72d4fe]{height:30px;line-height:30px;width:80px;text-align:center;background:#202020;color:#fff;display:inline-block;border-radius:2px;font-size:14px;cursor:pointer}",""])},113:function(t,e,o){"use strict";var r=o(5),n=o(2),d=o(0),c=o(108),l={props:{curNote:{type:Object},createToCatalogId:{type:String},curNoteContent:{type:Object}},data:function(){const{title:title="未命名",content:content=""}=this.curNoteContent||{};return{articleName:title,cacheName:title,content:content,editId:"new",schemaId:"",catalogId:"",test:"123",fields:[],contentList:[],cacheContent:"",isEditContents:!1,showList:!1,showEditContent:!1}},components:{MarkdownEdit:c.a},computed:{...Object(r.mapState)({catalogs:t=>t.catalogs.list,bookList:t=>t.books.list,articles:t=>t.articles.list}),...Object(r.mapGetters)("user",["isVisitor"]),dataHasChange(){return JSON.stringify(this.content)!==JSON.stringify(this.cacheContent)}},watch:{curNote:{handler:function(t){this.setContent(t)},immediate:!0},editId:function(t){this[n.ARTICLE_CUS_SAVE](t)}},methods:{...Object(r.mapMutations)("articles",[n.ARTICLE_CUS_SAVE]),...Object(r.mapMutations)("books",[n.BOOK_CUR_UPDATE]),...Object(r.mapActions)("articles",[d.ARTICLE_DES_GET,d.ARTICLE_POST,d.ARTICLE_PUT,d.ARTICLE_CONTENT_PUT,d.ARTICLE_CONTENT_POST,d.ARTICLE_CONTENT_DELETE]),...Object(r.mapActions)("notes",[d.NOTE_POST,d.NOTE_PUT,d.NOTE_DELETE]),setContent(t={}){t._id?(this.cacheContent=this.content=t.content||"",this.cacheName=this.articleName=t.title||"未命名"):this.$alert({title:"setContent",content:"val值不正确"})},async todoEdit(t=!1){(t||"new"!==this.curNote._id&&this.articleName&&this.cacheName!==this.articleName)&&this.doPutNote()},async todoSave(){if(!this.articleName)return;this.$showLoading();const t=await this[d.NOTE_POST]({content:this.content,title:this.articleName,catalogId:this.createToCatalogId});if(!t.err){this.$toast({title:"添加成功"});const e=t.data.id;this.$emit("emitUpdateNote",{id:e,force:!0})}this.$hideLoading()},async getData(t,e=!1){this.editId=t,this.$showLoading();const o=await this[d.ARTICLE_DES_GET]({_id:t,force:e});if(!o.err){const{bookId:t,catalogId:e}=o.data,{MOCK:r}=process.env;r||this[n.BOOK_CUR_UPDATE](t)}this.$hideLoading()},async toDoPutNote(){this.isVisitor||this.dataHasChange&&"new"!==this.curNote._id&&this.doPutNote()},async doPutNote(){this.isEditContents=!1,this.$showLoading();const t=await this[d.NOTE_PUT]({_id:this.curNote._id,title:this.articleName,content:this.content});this.$hideLoading(),t.err||this.$toast({title:"修改成功"}),this.cacheName=this.articleName,this.cacheContent=this.content,this.$emit("emitUpdateNote",{force:!0})},async init(){const{id:t}=this.$route.params;t&&(this.editId=t,await this.getData(t))}},mounted(){this.init()}},f=o(4);var component=Object(f.a)(l,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"article-layout flex direction-column flex-1 markdown"},[t._ssrNode('<div class="article-title flex " data-v-ce72d4fe><div class="flex-1 schema-title-layout relative" data-v-ce72d4fe>'+(t.isVisitor?'<div class="full-input" data-v-ce72d4fe>'+t._ssrEscape(t._s(t.articleName))+"</div>":"<input"+t._ssrAttr("value",t.articleName)+' class="full-input" data-v-ce72d4fe>')+"</div> "+(t.isVisitor?"\x3c!----\x3e":'<div class="schema-operate" data-v-ce72d4fe><span'+t._ssrClass("schema-operate-btn",{"disable-btn":!1})+t._ssrStyle(null,null,{display:"new"===t.curNote._id?"":"none"})+" data-v-ce72d4fe>保存</span></div>")+"</div> "),t._ssrNode('<div class="flex-1 flex" data-v-ce72d4fe>',"</div>",[o("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.toDoPutNote,expression:"toDoPutNote"}],staticClass:"article-content relative flex-1 flex",class:{noSave:t.dataHasChange},on:{click:function(e){t.isEditContents=!0},keydown:function(e){return(e.type.indexOf("key")||83===e.keyCode)&&e.ctrlKey?e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.toDoPutNote(e)):null}}},[t._ssrNode('<div class="flex-1 relative" data-v-ce72d4fe>',"</div>",[t._ssrNode('<div class="form-layout theme-1" data-v-ce72d4fe>',"</div>",[o("markdown-edit",{attrs:{onlyView:t.isVisitor},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)])])])],2)},[],!1,function(t){var e=o(111);e.__inject__&&e.__inject__(t)},"ce72d4fe","2c3d3940");e.a=component.exports},114:function(t,e,o){"use strict";var r=o(5),n=o(2),d=o(0),c=(o(31),o(8),o(103)),l={props:{list:{type:Array,default:()=>[]}},data:()=>({filterKeys:""}),computed:{...Object(r.mapState)({curCatalog:t=>t.catalogs.curCatalog,showBrief:t=>t.config.showBrief,bookList:t=>t.books.list,schemaList:t=>t.schema.list,curNote:t=>t.notes.curNote,notesMap:t=>t.notes.notesMap,filterList:function(){return this.filterKeys?this.list.filter(t=>t.title.indexOf(this.filterKeys)>-1):this.list}}),...Object(r.mapGetters)("user",["isVisitor"])},watch:{list:function(t){t.length&&(!this.curNode||this.curNode)}},filters:{getBookName:function(t,e){return e[t]?e[t].name:""},getCatalogsName:function(t,e){return e[t]?e[t].name:""}},methods:{...Object(r.mapActions)("notes",[d.NOTE_DELETE]),...Object(r.mapMutations)("notes",[n.NOTE_CUR_UPDATE]),chooseNote:function(t){this.$router.push(`/${t.bookId}/${Object(c.a)(this.curCatalog)}/${t._id}`)},todoDelete(t){this.$alert({title:`你确认要删除"${t.title}"`}).then(async e=>{e&&this.doDeleteNote(t)})},async doDeleteNote(t={}){this.$showLoading();const e=await this[d.NOTE_DELETE]({_id:t._id});this.$hideLoading(),e.err||this.$toast({title:"删除成功"}),this.curNote===t._id&&this[n.NOTE_CUR_UPDATE](""),this.$emit("emitUpdateNote",{force:!0})},shortcutAdd(){const t=this.notesMap[this.curNote].catalogId;t?this.$emit("emitToCreateNote",{_id:"new",catalogId:t}):this.$alert({title:"shortcutAdd",content:"缺少catalogId，无法创建笔记"})}}},f=o(4);var component=Object(f.a)(l,function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"article-layout box-shadow flex direction-column",class:{"hidden-article":!t.showBrief}},[t._ssrNode('<div class="flex-1 flex direction-column article-min-width relative" data-v-7f07d36a><div class="article-layout-input-box align-items-center" data-v-7f07d36a><input type="text"'+t._ssrAttr("value",t.filterKeys)+' class="article-layout-input" data-v-7f07d36a> <i class="iconfont icon-sousuo" data-v-7f07d36a></i></div> <div class="flex-1 relative" data-v-7f07d36a><div class="absolute-full article-item-box" data-v-7f07d36a>'+t._ssrList(t.filterList,function(e,o){return"<div"+t._ssrClass("article-item",{act:e._id===t.curNote})+' data-v-7f07d36a><div class="article-item-title" data-v-7f07d36a>'+t._ssrEscape(t._s(e.title))+'</div> <div class="article-label" data-v-7f07d36a><span class="article-label-item" data-v-7f07d36a>'+t._ssrEscape(t._s(t._f("getBookName")(e.bookId,t.bookList)))+'</span></div> <div class="article-item-mark" data-v-7f07d36a>'+t._ssrEscape(t._s(t._f("timestampToBriefTime")(e.createTime))+"~"+t._s(t._f("timestampToBriefTime")(e.updateTime)))+'</div> <div class="operate-icon" data-v-7f07d36a><i class="iconfont icon-shanchu1" data-v-7f07d36a></i></div></div>'})+"</div></div> "+(t.notesMap[t.curNote]&&!t.isVisitor?'<div class="shortcut-add-layout" data-v-7f07d36a><i class="iconfont icon-tianjiawenjian" data-v-7f07d36a></i></div>':"\x3c!----\x3e")+"</div>")])},[],!1,function(t){var e=o(109);e.__inject__&&e.__inject__(t)},"7f07d36a","a99767f0");e.a=component.exports},124:function(t,e,o){"use strict";o.r(e);var r=o(104),n=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,function(){return r[t]})}(d);e.default=n.a},125:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,"[data-v-699d600d]:root{--text-color:red}.no-data[data-v-699d600d]{flex:1;font-size:20px;padding:20px;color:#7e8896;background:#faf9f9}.no-data .iconfont[data-v-699d600d]{font-size:100px}.no-data .create-btn[data-v-699d600d]{color:#398dee;cursor:pointer}",""])},126:function(t,e,o){"use strict";o.r(e);var r=o(105),n=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,function(){return r[t]})}(d);e.default=n.a},127:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,"[data-v-62579351]:root{--text-color:red}.book-slider-layout[data-v-62579351]{padding:15px;background:#2d2d2d}.book-layout[data-v-62579351]{margin-top:40px;width:38px;height:38px;cursor:pointer;position:relative;z-index:1}.book-layout .book-icon-layout[data-v-62579351]{line-height:38px;width:100%;height:100%;text-align:center;border-radius:50%;background:#fff;overflow:hidden;position:relative}.book-layout .iconfont[data-v-62579351]{font-size:26px}.book-layout .book-list-layout[data-v-62579351]{max-width:300px;padding:7px 20px;background:#2d2d2d;position:absolute;left:100%;top:0;transition:.3s;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:0 15px;transform-origin:0 15px}.book-layout .book-list-layout .book-list-item-layout[data-v-62579351]{color:#fff;text-align:center}.book-layout .book-list-layout .book-list-item-layout .icon[data-v-62579351]{width:25px;height:25px;line-height:22px;border:1px solid #fff;border-radius:50%}.book-layout .book-list-layout .book-list-item-layout .icon .iconfont[data-v-62579351]{font-size:16px}.book-layout .book-list-layout .book-list-item-layout .book-name[data-v-62579351]{font-size:12px;margin-left:10px}.book-layout .book-list-layout .book-list-item-layout[data-v-62579351]:not(:last-child){margin-bottom:10px}.book-layout .book-list-layout .book-list-item-layout.act .icon[data-v-62579351]{border:1px solid #398dee;background:#398dee}.show-book-list:hover .book-list-layout[data-v-62579351]{-webkit-transform:scale(1);transform:scale(1)}.book-layout.act[data-v-62579351]{-webkit-transform:scale(1.2);transform:scale(1.2)}.book-layout.act .book-icon-layout[data-v-62579351]{background:#398dee}.book-layout.act .book-icon-layout .iconfont[data-v-62579351]{color:#fff}.book-layout[data-v-62579351]:not(:last-child){margin-bottom:10px}.catalog-layout[data-v-62579351]{padding:15px 2px;overflow:auto;background:#202020;color:#919191;width:200px;max-width:200px;transition:.3s}.hidden-catalog[data-v-62579351]{padding:15px 0;max-width:0;overflow:hidden}",""])},128:function(t,e,o){"use strict";o.r(e);var r=o(5),n=o(2),d=o(0),c=o(31),l=o(106),f=o(114),h=o(113),m=o(8),v={data:()=>({isRecently:""}),methods:{toCreateNote(t){const{bookId:e,catalogId:o}=$nuxt._route.params;this.$router.push(`/${e}/${o}/new`)}},mounted(){const{catalogId:t}=$nuxt._route.params;this.isRecently=t===m.a.recentlyArticlesKey}},_=o(4);var x=Object(_.a)(v,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"no-data flex direction-column justify-content-center align-items-center"},[this._ssrNode('<i class="iconfont icon-wushuju" data-v-699d600d></i> <div data-v-699d600d>还没任何有笔记'+(this.isRecently?"\x3c!----\x3e":'<span data-v-699d600d>，<span class="create-btn" data-v-699d600d>快速创建</span></span>')+"</div>")])},[],!1,function(t){var e=o(124);e.__inject__&&e.__inject__(t)},"699d600d","240b9c00").exports,y=o(107),N=o(103),k=(o(3),{async fetch({store:t,params:e}){const{noteId:o,bookId:r,catalogId:n}=e;if(t.commit("books/BOOK_CUR_UPDATE",r),t.commit("catalogs/CATALOGS_CUR_SAVE",n),t.commit("notes/NOTE_CUR_UPDATE",o),t.state.notes.list[`${r}_${n}`])return;const d=await t.dispatch("notes/NOTE_GET_BY_ID",{id:o,bookId:r,catalogId:n}),{extend:c}=d.data;c&&c.user&&t.commit("user/CUR_USER_INFO_SAVE",c.user)},components:{TreeItem:l.a,NoteBrief:f.a,noteDes:h.a,articleFixed:y.a,bookId:"",catalogId:"",noteId:"",noNotes:x},data:function(){return{createToCatalogId:"",noData:!1,curNoteContent:{}}},computed:{...Object(r.mapState)({schemaList:t=>t.schema.list,noteList:t=>t.notes.list,curBook:t=>t.books.curBook,curNote:t=>t.notes.curNote,showDir:t=>t.config.showDir,curCatalog:t=>t.catalogs.curCatalog}),...Object(r.mapGetters)("catalogs",["treeChainList"]),...Object(r.mapGetters)("user",["isVisitor"]),curNoteList:function(){return this.curCatalog&&this.noteList&&this.curBook&&this.noteList[this.curBook+"_"+this.curCatalog]||[]},curEditNote:function(){const t=this.curNoteList.find(t=>t._id===this.curNote);return t||{_id:"new"}}},methods:{...Object(r.mapMutations)("catalogs",[n.CATALOGS_CUR_SAVE]),...Object(r.mapMutations)("notes",[n.NOTE_CUR_UPDATE]),...Object(r.mapMutations)("books",[n.BOOK_CUR_UPDATE]),...Object(r.mapActions)("books",[d.BOOK_LIST_GET]),...Object(r.mapActions)("notes",[d.NOTES_RECENTLY_GET,d.NOTES_GET,d.NOTE_DES_GET]),...Object(r.mapActions)("catalogs",[d.CATALOGS_GET]),...Object(r.mapActions)("user",[d.USER_INFO_GET]),async getNoteData(){const t=this.catalogId===m.a.recentlyArticlesKey?this[d.NOTES_RECENTLY_GET]():this[d.NOTES_GET]();Promise.all([t,this[d.BOOK_LIST_GET](),this[d.CATALOGS_GET]()]).then(t=>{const data=t[0].data.list;data.length&&!this.noteId?this.$router.push(`/${this.bookId}/${this.catalogId}/${data[0]._id}`):this.noteId||(this.noData=!0)}).catch(t=>{this.$alert({title:"getBookData",content:t.message})})},toCreateNote(t){this.$router.push(`/${this.curBook}/${Object(N.a)(t.catalogId)}/new`)},async doUpdateNote(t={}){const{id:e,force:o,catalogId:r}=t;let n="",c=e;(n=this.curCatalog===m.a.recentlyArticlesKey?await this[d.NOTES_RECENTLY_GET]({force:o}):await this[d.NOTES_GET]({force:o})).data.list.length&&!c&&(c=n.data.list[0]._id),this.$router.push(`/${this.curBook}/${Object(N.a)(r||this.curCatalog)}/${c||""}`)},initEmitOn(){c.a.$off("emitToCreateArticle"),c.a.$off("updateCurBooks"),c.a.$off("emitFromCatalog"),c.a.$on("emitToCreateArticle",t=>{this.toCreateNote(t)}),c.a.$on("emitFromCatalog",t=>{const{isNew:e}=t;e?this.toCreateNote({catalogId:t.catalogId}):this.doUpdateNote(t)}),c.a.$on("updateCurBooks",()=>{this[n.CATALOGS_CUR_SAVE](m.a.recentlyArticlesKey),this.getNoteData()})},async init(){this.isVisitor&&this.noteId||(this.getNoteData(),this.initEmitOn())},async dealParams(){const{bookId:t,catalogId:e,noteId:o}=$nuxt._route.params;this.bookId=t,this.catalogId=e,this.noteId=o,this.createToCatalogId=e,this.init()}},mounted(){this.dealParams()}});var w=Object(_.a)(k,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"flex flex-1"},[t.isVisitor?t._e():t._ssrNode("<div"+t._ssrClass("catalog-layout box-shadow",{"hidden-catalog":!t.showDir})+" data-v-62579351>","</div>",[o("TreeItem")],1),t._ssrNode(" "),o("NoteBrief",{attrs:{list:t.curNoteList},on:{emitToCreateNote:t.toCreateNote,emitUpdateNote:t.doUpdateNote}}),t._ssrNode(" "),t.noData?o("noNotes"):o("note-des",{attrs:{curNote:t.curEditNote,createToCatalogId:t.createToCatalogId,curNoteContent:t.curNoteContent},on:{emitUpdateNote:t.doUpdateNote}}),t._ssrNode(" "),t.isVisitor?t._e():o("articleFixed")],2)},[],!1,function(t){var e=o(126);e.__inject__&&e.__inject__(t)},"62579351","74f9d250");e.default=w.exports},149:function(t,e,o){"use strict";o.r(e);var r={components:{notedCom:o(128).default}},n=o(4);var component=Object(n.a)(r,function(){var t=this.$createElement;return(this._self._c||t)("notedCom")},[],!1,function(t){},"575e19b4","9041ca30");e.default=component.exports},92:function(t,e,o){var content=o(98);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(7).default;t.exports.__inject__=function(t){r("20a7dab0",content,!0,t)}},93:function(t,e,o){var content=o(100);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(7).default;t.exports.__inject__=function(t){r("614a4b95",content,!0,t)}},94:function(t,e,o){var content=o(102);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(7).default;t.exports.__inject__=function(t){r("d707c14c",content,!0,t)}},95:function(t,e,o){var content=o(110);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(7).default;t.exports.__inject__=function(t){r("008ea0ee",content,!0,t)}},96:function(t,e,o){var content=o(112);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(7).default;t.exports.__inject__=function(t){r("ae7d4386",content,!0,t)}},97:function(t,e,o){"use strict";o.r(e);var r=o(92),n=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,function(){return r[t]})}(d);e.default=n.a},98:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,'[data-v-907b8f0e]:root{--text-color:red}.catalogs-layout .catalogs-layout[data-v-907b8f0e]{padding-left:20px}.iconfont[data-v-907b8f0e]{font-size:25px;position:relative}.catalogs-item-layout[data-v-907b8f0e]{cursor:pointer;padding:7px 25px;position:relative;transition:.3s}.catalogs-item-layout .icon-open[data-v-907b8f0e]{display:none}.catalogs-item-layout .icon-close[data-v-907b8f0e]{display:block}.catalogs-item-layout[data-v-907b8f0e]:after{content:"";background:transparent;position:absolute;top:0;width:100%;height:100%;left:-100%;transition:.3s}.operate-triangle-btn[data-v-907b8f0e]{display:none;position:absolute;width:16px;height:16px;right:12px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.operate-triangle-btn .iconfont[data-v-907b8f0e]{font-size:15px}.catalogs-item-layout .has-child[data-v-907b8f0e]{position:absolute;border-left:6px solid #919191;border-top:5px solid transparent;border-bottom:5px solid transparent;width:0;height:0;left:12px;top:50%;-webkit-transform:translateY(-6px);transform:translateY(-6px);transition:.2s}.catalogs-item-layout .has-child[data-v-907b8f0e]:after{content:"";width:20px;height:20px;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.catalogs-item-layout .has-child.in-chain[data-v-907b8f0e]{-webkit-transform:translateY(-6px) rotate(90deg);transform:translateY(-6px) rotate(90deg)}.catalogs-item-hover[data-v-907b8f0e]:hover{background:#404040;color:#ddd}.catalogs-item-hover:hover .operate-triangle-btn[data-v-907b8f0e]{display:block;color:#ddd}.catalogs-item-hover[data-v-907b8f0e]:hover:after{background:#404040}.catalogs-item-layout.act[data-v-907b8f0e]{background:#5f5f5f;color:#ddd}.catalogs-item-layout.act .icon-open[data-v-907b8f0e]{display:block}.catalogs-item-layout.act .icon-close[data-v-907b8f0e]{display:none}.catalogs-item-layout.act[data-v-907b8f0e]:after,.catalogs-item-layout.act[data-v-907b8f0e]:hover,.catalogs-item-layout.act[data-v-907b8f0e]:hover:after{background:#5f5f5f}.catalogs-name[data-v-907b8f0e],.edit-catalogs-input[data-v-907b8f0e]{position:relative;max-width:150px;padding:0 5px}.edit-catalogs-input[data-v-907b8f0e]{z-index:1;background:transparent;vertical-align:bottom;border:none;color:inherit;font-size:inherit;height:25px}.catalog-operate-layout[data-v-907b8f0e]{position:fixed;background:rgba(0,0,0,.8);left:50%;top:50%;color:#fff;z-index:999;border-radius:5px}.catalog-operate-layout .catalog-operate-item[data-v-907b8f0e]{width:150px;padding:10px 20px;position:relative}.catalog-operate-layout .catalog-operate-item[data-v-907b8f0e]:not(:last-child){border-bottom:1px solid hsla(0,0%,100%,.2)}.catalog-operate-layout .catalog-operate-item.hadChild[data-v-907b8f0e]:after{content:"";position:absolute;border-left:4px solid #fff;border-top:4px solid transparent;border-bottom:4px solid transparent;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.catalog-operate-layout .catalog-operate-item:hover .operate-item-child[data-v-907b8f0e]{display:block}.catalog-operate-layout .operate-item-child[data-v-907b8f0e]{position:absolute;left:100%;top:0;width:100%;border-radius:0 5px 5px 0;background:rgba(0,0,0,.8);border-left:1px solid hsla(0,0%,100%,.2);display:none}.catalog-operate-layout .catalog-operate-item.builtIn[data-v-907b8f0e]{border-bottom:1px solid hsla(0,0%,100%,.6)}#hello_recent[data-v-907b8f0e]{font-size:24px}',""])},99:function(t,e,o){"use strict";o.r(e);var r=o(93),n=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,function(){return r[t]})}(d);e.default=n.a}};
//# sourceMappingURL=76778d3bdd28f8e5a8ba.js.map