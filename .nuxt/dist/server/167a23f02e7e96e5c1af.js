exports.ids=[6],exports.modules={100:function(t,e,o){"use strict";function r(t,e){return e?"root"===t?`${e}_root`:t:t.indexOf("root")>-1?"root":t}function n(t=""){return`${t}-黑洞笔记-BlackHook`}o.d(e,"a",function(){return r}),o.d(e,"b",function(){return n})},103:function(t,e,o){"use strict";var r=o(5),n=o(8),d=o(0),c=o(1),l=o(34),f={name:"TreeItem",props:{curNode:{type:Object,require:!0},isNewDir:{type:Boolean,default:function(){return!1}}},data:()=>({renameCatalog:!1,operateMenuStyle:{left:-1,top:"50%"},renameValue:"",newDir:{parentId:"",name:"新建文件夹",show:!1,isNew:!0}}),computed:{...Object(r.mapState)({catalogs:t=>t.catalogs.list,catalogsIsOpen:t=>t.catalogs.isOpen,actCatalog:t=>t.catalogs.curCatalog,schemaList:t=>Object.values(t.schema.list).filter(t=>t.fields.length),curBook:t=>t.books.curBook}),...Object(r.mapGetters)("catalogs",["treeChainList"]),hasChild(){return this.catalogs[this.curNode._id]&&this.catalogs[this.curNode._id].childNodes&&this.catalogs[this.curNode._id].childNodes.length},isOpen(){const t=this.curNode._id;return this.catalogsIsOpen.indexOf(t)>-1}},watch:{curNode:{handler(){},deep:!0}},methods:{...Object(r.mapMutations)("catalogs",[d.CATALOGS_CUR_SAVE,d.CATALOGS_TEMPLATE_CREATE,d.CATALOGS_OPEN_TOGGLE,d.CATALOGS_OPEN_RESET]),...Object(r.mapActions)("catalogs",[c.CATALOGS_GET,c.CATALOGS_PUT,c.CATALOGS_POST,c.CATALOGS_DELETE]),...Object(r.mapActions)("articles",[c.ARTICLE_RECENTLY_LIST_GET]),toggleOpenDir(t=!1,e){this[d.CATALOGS_OPEN_TOGGLE]({id:e||this.curNode._id,force:t})},async chooseCatalog(t){this.toggleOpenDir(!0),this[d.CATALOGS_CUR_SAVE](this.curNode._id),l.a.$emit("emitFromCatalog",t||{...this.curNode,catalogId:this.curNode._id})},async getRecentlyArticles(){this.$showLoading(),await this[c.ARTICLE_RECENTLY_LIST_GET](),this.$hideLoading(),this[d.CATALOGS_CUR_SAVE]("recently")},showOperateMenu(t){if(this.curNode.icon)return;const{clientX:e,clientY:o}=t;this.operateMenuStyle={top:`${o}px`,left:`${e}px`}},closeMenu(){this.operateMenuStyle.left=-1},todoRename(){this.renameValue=this.curNode.name,this.closeMenu(),this.renameCatalog=!0},todoCreateFile(){this.chooseCatalog({catalogId:this.curNode._id,isNew:!0}),this.closeMenu()},todoDelete(){this.closeMenu(),this.$alert({title:`你确认要删除"${this.curNode.name}"`}).then(async t=>{this.doDeleteCatalog()})},async doDeleteCatalog(){this.$showLoading();const t=await this[c.CATALOGS_DELETE]({_id:this.curNode._id});this.$hideLoading(),t.err||(this.$toast({title:"删除成功"}),await this.getDate(this.curNode,!0,!0))},doRename(){this.renameCatalog=!1,this.isNewDir?this.addCatalog(this.renameValue,this.curNode.parentId):this.renameValue&&this.renameValue!==this.curNode.name&&this.modifyCatalogName(this.renameValue,this.curNode)},submitCatalogName(t,e){const{isNew:o}=e;o?this.addCatalog(t,e):this.modifyCatalogName(t,e)},async modifyCatalogName(t,e){const{_id:o,parentId:r}=e;(await this[c.CATALOGS_PUT]({_id:o,name:t,parentId:r})).err||this.getDate(e,!0,!0)},async addCatalog(t,e){await this[c.CATALOGS_POST]({parentId:e.indexOf("root")>-1?"root":e,name:t,bookId:this.curBook});this.$emit("emitExitNewDir")},exitNewDir(){this.getDate(this.curNode,!0,!0),this.newDir.parentId=""},doCreateTemDir(){this.toggleOpenDir(!0),this.closeMenu(),this.newDir.parentId=this.curNode._id,this.newDir.parentParentId=this.curNode.parentId},async getDate(t,e,o){const r=t||this.curNode;await this[c.CATALOGS_GET]({parentId:e?r.parentId||"root":r._id,bookId:this.curBook,force:o})},initOpenCatalog(){this.toggleOpenDir(!0,this.curNode.parentId)},init(){const{catalogId:t}=$nuxt._route.params;t===this.curNode._id&&(this.initOpenCatalog(),this.$emit("toInitOpenCatalog")),this.isNewDir&&this.todoRename(),document.addEventListener("click",t=>{this.$el.contains(t.target)})}},mounted(){this.init()}},h=o(4);var m={name:"Tree",data:()=>({}),components:{TreeItem:Object(h.a)(f,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"catalogs-layout"},[t._ssrNode("<div"+t._ssrClass("flex align-items-center catalogs-item-layout",{act:t.actCatalog===t.curNode._id||t.curNode._id&&t.curNode._id.indexOf(t.actCatalog)>-1,"catalogs-item-hover":!(t.isNewDir||t.renameCatalog)})+" data-v-c48f35b2>","</div>",[t._ssrNode((t.catalogs[t.curNode._id]&&t.hasChild?"<div"+t._ssrClass("has-child",{"in-chain":t.isOpen||t.isOpen&&t.hasChild&&t.treeChainList&&t.treeChainList.indexOf(t.curNode._id)>-1})+" data-v-c48f35b2></div>":"\x3c!----\x3e")+" "+(t.curNode.icon?"<i"+t._ssrAttr("id",t.curNode._id)+t._ssrClass("iconfont",t.curNode.icon)+" data-v-c48f35b2></i>":t.treeChainList&&t.treeChainList.indexOf(t.curNode._id)>-1?"<i"+t._ssrAttr("id",t.curNode._id)+t._ssrClass("iconfont icon-wenjianjia",t.curNode.icon)+" data-v-c48f35b2></i>":"<i"+t._ssrAttr("id",t.curNode._id)+' class="iconfont icon-wendang1" data-v-c48f35b2></i>')+" "),t.curNode.isNew||t.renameCatalog?o("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.renameValue,expression:"renameValue",modifiers:{trim:!0}},{name:"focus",rawName:"v-focus:select",arg:"select"}],staticClass:"edit-catalogs-input line-ellipsis",domProps:{value:t.renameValue},on:{blur:[t.doRename,function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||(t.renameValue=e.target.value.trim())}}},[]):t._ssrNode('<div class="catalogs-name line-ellipsis" data-v-c48f35b2>'+t._ssrEscape(t._s(t.curNode.name))+"</div>"),t._ssrNode(" "+(t.curNode.icon?"\x3c!----\x3e":'<div class="operate-triangle-btn" data-v-c48f35b2><i class="iconfont icon-tianjiajiahaowubiankuang" data-v-c48f35b2></i></div>')+" "),-1!==t.operateMenuStyle.left?o("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.closeMenu,expression:"closeMenu"}],staticClass:"catalog-operate-layout",style:t.operateMenuStyle},[t._ssrNode('<div class="catalog-operate-item" data-v-c48f35b2>\n        新建笔记\n      </div> <div class="catalog-operate-item" data-v-c48f35b2>新建文件夹</div> '+("root"!==t.curNode._id?'<div class="catalog-operate-item" data-v-c48f35b2>重命名</div>':"\x3c!----\x3e")+" "+("root"!==t.curNode._id?'<div class="catalog-operate-item" data-v-c48f35b2>删除</div>':"\x3c!----\x3e"))]):t._e()],2),t._ssrNode(" "),t.catalogs[t.curNode._id]&&t.catalogs[t.curNode._id].childNodes&&t.catalogs[t.curNode._id].childNodes.length?t._ssrNode("<div data-v-c48f35b2>","</div>",t._l(t.catalogs[t.curNode._id].childNodes,function(e,r){return o("TreeItem",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}],key:r,attrs:{curNode:e},on:{toInitOpenCatalog:t.initOpenCatalog}})}),1):t._e(),t._ssrNode(" "),t.newDir.parentId===t.curNode._id?o("TreeItem",{attrs:{curNode:t.newDir,isNewDir:t.newDir.parentId===t.curNode._id},on:{emitExitNewDir:t.exitNewDir}}):t._e()],2)},[],!1,function(t){var e=o(94);e.__inject__&&e.__inject__(t)},"c48f35b2","52ebc2f5").exports},computed:{...Object(r.mapState)({curBook:t=>t.books.curBook}),catalogList(){return[{_id:n.a.recentlyArticlesKey,name:"最近文档",hasChild:!1,icon:"icon-wendang"},{_id:this.curBook+"_root",name:"我的文件夹",hasChild:!0}]}}};var v=Object(h.a)(m,function(){var t=this.$createElement,e=this._self._c||t;return e("div",this._l(this.catalogList,function(t,o){return e("TreeItem",{key:t._id,attrs:{curNode:t,treeChain:[t._id]}})}),1)},[],!1,function(t){},"1f0f6ca2","106400fe");e.a=v.exports},104:function(t,e,o){"use strict";var r=o(5),n=o(0),d={name:"articleFixed",computed:{...Object(r.mapState)({showDir:t=>t.config.showDir,showBrief:t=>t.config.showBrief})},methods:{...Object(r.mapMutations)("config",[n.CONFIG_TOGGLE_SAVE]),doSetConfig(t){this[n.CONFIG_TOGGLE_SAVE]({tar:t,val:!this[t]})}},mounted(){}},c=o(4);var component=Object(c.a)(d,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"controller-layout-fixed"},[this._ssrNode("<div"+this._ssrClass("controller-layout-item",{act:this.showDir})+' data-v-bd510b56><i class="iconfont icon-neirong" data-v-bd510b56></i></div> <div'+this._ssrClass("controller-layout-item",{act:this.showBrief})+' data-v-bd510b56><i class="iconfont icon-shujia1" data-v-bd510b56></i></div>')])},[],!1,function(t){var e=o(98);e.__inject__&&e.__inject__(t)},"bd510b56","40b97ea4");e.a=component.exports},105:function(t,e,o){"use strict";var r=o(87),n=o.n(r);const d=new n.a.Renderer;function c(text){return text.replace(/C\(N\)/g,'<span class="marked-checkBox"></span>').replace(/C\(Y\)/g,'<span class="marked-checkBox"><i class="iconfont icon-gou1"></i></span>').replace(/\((.*?)\)\?(\((.*?)\))?/g,function(t,e,o,r){return r?`<div class="marked-issue">${e}<i class="iconfont icon-wenhao color"> <span class="marked-issue-tip">${r}</span></i> </div>`:`<div class="marked-issue">${e}<i class="iconfont icon-wenhao"></i></div>`}).replace(/(<a .*?<\/a>)/g,function(t,e,o,r){return`${e}<span class="marked-iconfont-link">(<i class="iconfont icon-lianjie2"></i>)</span>`})}n.a.setOptions({renderer:d,gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!0,smartypants:!1,highlight:function(code){}});var l={model:{prop:"data",event:"update"},props:{data:String,showEdit:{default:()=>!1},onlyView:{default:()=>!0}},data(){const t=c(n()(this.data));return{split:.5,markDownValue:"",editMode:1,isEdit:this.showEdit,isPreview:!0,markdownHTML:t||""}},watch:{data:function(t){this.markDownValue=this.data||""},markDownValue:function(t){this.isPreview&&(clearTimeout(this.timeOut),this.timeOut=setTimeout(()=>{this.markdownHTML=c(n()(t))},500)),this.$emit("update",t)}},methods:{toggleEdit(){this.isEdit=!this.isEdit,this.isEdit||(this.isPreview=!0),window&&(window._markdownEdit=this.isEdit)},togglePreview(){this.isPreview=!this.isPreview,this.isPreview||(this.isEdit=!0),window&&(window._markdownEdit=this.isEdit)}},mounted(){window._markdownEdit&&(this.isEdit=!0),this.markDownValue=this.data||""}},f=o(4);var component=Object(f.a)(l,function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"code-mirror absolute-full flex direction-column markdown-layout"},[t._ssrNode("<div"+t._ssrClass("flex-1 flex absolute-full",{hideSplit:3!==t.editMode})+" data-v-68298b1c>"+(t.onlyView?"\x3c!----\x3e":'<div class="markdown-operate-layout" data-v-68298b1c><div'+t._ssrClass("icon-layout",{act:t.isEdit})+' data-v-68298b1c><i class="iconfont icon-bianji2" data-v-68298b1c></i></div> <div'+t._ssrClass("icon-layout",{act:t.isPreview})+' data-v-68298b1c><i class="iconfont icon-yulan" data-v-68298b1c></i></div></div>')+" "+(t.isEdit?'<div class="flex-1 relative" data-v-68298b1c><textarea class="markdown-edit-box box-shadow-inset" data-v-68298b1c>'+t._ssrEscape(t._s(t.markDownValue))+"</textarea></div>":"\x3c!----\x3e")+" "+(t.isPreview?'<div class="flex-1 md-body-layout edit-layout relative" data-v-68298b1c><div'+t._ssrClass("absolute-full markdown-style",{"black-theme":t.onlyView})+' data-v-68298b1c><div class="markdown-content-style" data-v-68298b1c>'+t._s(t.markdownHTML)+"</div></div></div>":"\x3c!----\x3e")+"</div>")])},[],!1,function(t){var e=o(96);e.__inject__&&e.__inject__(t)},"68298b1c","52af9afa");e.a=component.exports},106:function(t,e,o){"use strict";o.r(e);var r=o(92),n=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,function(){return r[t]})}(d);e.default=n.a},107:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,'[data-v-720dfc83]:root{--text-color:red}.article-item[data-v-720dfc83]{padding:10px 20px;width:100%;cursor:pointer;position:relative;border-bottom:1px solid #000}.article-item .article-item-title[data-v-720dfc83]{font-size:17px;color:#ddd}.article-item .article-item-mark[data-v-720dfc83]{margin-top:7px;font-size:12px}.article-item .operate-icon[data-v-720dfc83]{width:30px;height:30px;border-radius:50%;position:absolute;z-index:1;background:#5f5f5f;opacity:0;transform:scale(0);transition:.3s;text-align:center;line-height:30px;color:#19181d}.article-item .operate-icon .iconfont[data-v-720dfc83]{font-size:18px}.article-item .operate-icon-delete[data-v-720dfc83]{right:7px;top:7px}.article-item .operate-icon-sort[data-v-720dfc83]{right:7px;bottom:7px;cursor:move}.article-item .operate-icon-delete[data-v-720dfc83]:hover{background:#f4606c;color:#fff}.article-item .operate-icon-sort[data-v-720dfc83]:hover{background:#398dee;color:#fff}.article-item:hover .operate-icon[data-v-720dfc83]{opacity:1;transform:scale(1)}.article-item.act[data-v-720dfc83]{background:#19181d}.article-item.act[data-v-720dfc83]:after{content:"";position:absolute;width:4px;height:100%;left:0;top:0;background:#afb0b1}.article-layout[data-v-720dfc83]{padding:15px 0;background:#2d2d2d;color:#919191;max-width:500px;transition:.3s}.article-layout .article-min-width[data-v-720dfc83]{min-width:200px}.article-layout.hidden-article[data-v-720dfc83]{max-width:0;overflow:hidden}.article-layout-input-box[data-v-720dfc83]{background:#5f5f5f;color:#ddd;width:90%;height:40px;padding:0 10px;position:relative;margin:0 auto 10px}.article-layout-input-box .iconfont[data-v-720dfc83]{display:block;position:absolute;right:10px;top:50%;transform:translateY(-50%)}.article-layout-input[data-v-720dfc83]{height:100%;border:none;background:transparent;display:inline-block;color:#ddd;outline:#fff;padding-right:46px}.article-label[data-v-720dfc83]{margin:7px 0}.article-label-item[data-v-720dfc83]{display:inline-block;padding:2px 5px;background:#5f5f5f;color:#202020;border-radius:2px;margin-bottom:3px;font-size:12px}.article-item-box[data-v-720dfc83]{overflow-y:auto;overflow-x:hidden}.shortcut-add-layout[data-v-720dfc83]{position:absolute;bottom:10px;right:10px;background:#398dee;z-index:5;width:42px;height:42px;border-radius:42px;cursor:pointer;text-align:center;line-height:44px}.shortcut-add-layout .iconfont[data-v-720dfc83]{font-size:30px;color:#2d2d2d}.flip-list-move[data-v-720dfc83]{transition:transform .5s}.no-move[data-v-720dfc83]{transition:transform 0s}.ghost[data-v-720dfc83]{opacity:.5;background:#c8ebfb}',""])},108:function(t,e,o){"use strict";o.r(e);var r=o(93),n=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,function(){return r[t]})}(d);e.default=n.a},109:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,"[data-v-3c55dda7]:root{--text-color:red}.article-layout[data-v-3c55dda7]{background:#eee;position:relative}.article-layout .form-label-layout[data-v-3c55dda7]{width:100%;text-align:left;font-size:12px;color:#adabab;padding-left:0}.article-layout .form-content-layout[data-v-3c55dda7]{background:#fff;padding:7px 20px}.article-layout .add-options-item[data-v-3c55dda7]{margin:5px}.article-layout .form-input[data-v-3c55dda7],.article-layout .from-select[data-v-3c55dda7]{border:none;outline:none;padding:0}.article-layout .form-group[data-v-3c55dda7]:not(:first-child){margin:0}.article-layout .form-content-layout-select[data-v-3c55dda7]{padding-top:18px;padding-bottom:18px}.article-layout .markdown-layout[data-v-3c55dda7]{min-height:500px;padding:10px}.article-layout-theme1 .article-content[data-v-3c55dda7]{padding:40px}.article-layout-theme1 .form-label-layout[data-v-3c55dda7]{display:none}.article-layout-theme1 .form-input[data-v-3c55dda7],.article-layout-theme1 .from-select[data-v-3c55dda7]{border:none;outline:none;font-size:20px}.article-title[data-v-3c55dda7]{border-bottom:1px solid #e1e4e8;background:#fff;height:45px;line-height:45px;padding:0 15px}.article-title .operate-list-operate .iconfont[data-v-3c55dda7]{font-size:20px;cursor:pointer}.article-title .operate-list-operate .icon-box[data-v-3c55dda7]{border:1px solid #919191;border-radius:50%;width:30px;height:30px;line-height:30px;text-align:center;display:inline-block}.article-title .operate-list-operate .icon-box.act[data-v-3c55dda7]{background:#398dee;color:#fff}.article-content[data-v-3c55dda7]{padding:7px}.full-input[data-v-3c55dda7]{font-size:17px;outline:none;color:#5f5f5f}.markdown .form-label-layout[data-v-3c55dda7]{display:none}.markdown .article-content[data-v-3c55dda7],.markdown .markdown-layout[data-v-3c55dda7]{padding:0}.markdown .scroll-box[data-v-3c55dda7]{overflow:hidden}.markdown .form-group[data-v-3c55dda7],.markdown .form-layout[data-v-3c55dda7]{height:100%}.article-content.noSave[data-v-3c55dda7]{border:1px solid #f4606c}.schema-operate-btn[data-v-3c55dda7]{height:30px;line-height:30px;width:80px;text-align:center;background:#202020;color:#fff;display:inline-block;border-radius:2px;font-size:14px;cursor:pointer}",""])},110:function(t,e,o){"use strict";var r=o(5),n=o(88),d=o.n(n),c=o(0),l=o(1),f=(o(34),o(8),o(100)),h={props:{list:{type:Array,default:()=>[]}},data:()=>({filterKeys:"",filterList:[],drag:!1}),components:{draggable:d.a},computed:{...Object(r.mapState)({curCatalog:t=>t.catalogs.curCatalog,showBrief:t=>t.config.showBrief,bookList:t=>t.books.list,schemaList:t=>t.schema.list,curNote:t=>t.notes.curNote,notesMap:t=>t.notes.notesMap}),...Object(r.mapGetters)("user",["isVisitor"]),dragOptions:()=>({animation:200,group:"description",disabled:!1,ghostClass:"ghost"})},watch:{list:function(t){t.length&&(!this.curNode||this.curNode)},filterKeys:function(t){this.getList()}},filters:{getBookName:function(t,e){return e[t]?e[t].name:""},getCatalogsName:function(t,e){return e[t]?e[t].name:""}},methods:{...Object(r.mapActions)("notes",[l.NOTE_DELETE]),...Object(r.mapMutations)("notes",[c.NOTE_CUR_UPDATE]),chooseNote:function(t){this.$router.push(`/${t.bookId}/${Object(f.a)(this.curCatalog)}/${t._id}`)},todoDelete(t){this.$alert({title:`你确认要删除"${t.title}"`}).then(async e=>{e&&this.doDeleteNote(t)})},async doDeleteNote(t={}){this.$showLoading();const e=await this[l.NOTE_DELETE]({_id:t._id});this.$hideLoading(),e.err||this.$toast({title:"删除成功"}),this.curNote===t._id&&this[c.NOTE_CUR_UPDATE](""),this.$emit("emitUpdateNote",{force:!0})},shortcutAdd(){const t=this.notesMap[this.curNote].catalogId;t?this.$emit("emitToCreateNote",{_id:"new",catalogId:t}):this.$alert({title:"shortcutAdd",content:"缺少catalogId，无法创建笔记"})},dragEnd(){this.drag=!1,console.log(this.filterList)},getList(){this.filterKeys||(this.filterList=this.list),this.filterList=this.list.filter(t=>t.title.indexOf(this.filterKeys)>-1)}},mounted(){this.getList()}},m=o(4);var component=Object(m.a)(h,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"article-layout box-shadow flex direction-column",class:{"hidden-article":!t.showBrief}},[t._ssrNode('<div class="flex-1 flex direction-column article-min-width relative" data-v-720dfc83>',"</div>",[t._ssrNode('<div class="article-layout-input-box align-items-center" data-v-720dfc83><input type="text"'+t._ssrAttr("value",t.filterKeys)+' class="article-layout-input" data-v-720dfc83> <i class="iconfont icon-sousuo" data-v-720dfc83></i></div> '),t._ssrNode('<div class="flex-1 relative" data-v-720dfc83>',"</div>",[t._ssrNode('<div id="article-item-box" class="absolute-full article-item-box" data-v-720dfc83>',"</div>",[o("draggable",t._b({attrs:{group:"people",handle:".operate-icon-sort"},on:{start:function(e){t.drag=!0},end:t.dragEnd},model:{value:t.filterList,callback:function(e){t.filterList=e},expression:"filterList"}},"draggable",t.dragOptions,!1),[o("transition-group",{attrs:{type:"transition",name:t.drag?null:"flip-list"}},t._l(t.filterList,function(e,r){return o("div",{key:e._id,staticClass:"article-item",class:{act:e._id===t.curNote},attrs:{id:e._id},on:{click:function(o){return t.chooseNote(e)}}},[o("div",{staticClass:"article-item-title"},[t._v(t._s(e.title))]),t._v(" "),o("div",{staticClass:"article-label"},[o("span",{staticClass:"article-label-item"},[t._v(t._s(t._f("getBookName")(e.bookId,t.bookList)))])]),t._v(" "),o("div",{staticClass:"article-item-mark"},[t._v(t._s(t._f("timestampToBriefTime")(e.createTime))+"~"+t._s(t._f("timestampToBriefTime")(e.updateTime)))]),t._v(" "),o("div",{staticClass:"operate-icon operate-icon-delete",on:{click:function(o){return o.stopPropagation(),t.todoDelete(e)}}},[o("i",{staticClass:"iconfont icon-shanchu1"})]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:!t.filterKeys,expression:"!filterKeys"}],staticClass:"operate-icon operate-icon-sort",on:{click:function(o){return o.stopPropagation(),t.todoDelete(e)}}},[o("i",{staticClass:"iconfont icon-paixu"})])])}),0)],1)],1)]),t._ssrNode(" "+(t.notesMap[t.curNote]&&!t.isVisitor?'<div class="shortcut-add-layout" data-v-720dfc83><i class="iconfont icon-tianjiawenjian" data-v-720dfc83></i></div>':"\x3c!----\x3e"))],2)])},[],!1,function(t){var e=o(106);e.__inject__&&e.__inject__(t)},"720dfc83","a99767f0");e.a=component.exports},111:function(t,e,o){"use strict";var r=o(5),n=o(0),d=o(1),c=o(105),l={props:{curNote:{type:Object},createToCatalogId:{type:String},curNoteContent:{type:Object}},data:function(){const{title:title="未命名",content:content=""}=this.curNoteContent||{};return{articleName:title,cacheName:title,content:content,editId:"new",schemaId:"",catalogId:"",test:"123",fields:[],contentList:[],cacheContent:"",isEditContents:!1,showList:!1,showEditContent:!1}},components:{MarkdownEdit:c.a},computed:{...Object(r.mapState)({catalogs:t=>t.catalogs.list,bookList:t=>t.books.list,articles:t=>t.articles.list}),...Object(r.mapGetters)("user",["isVisitor"]),dataHasChange(){return JSON.stringify(this.content)!==JSON.stringify(this.cacheContent)}},watch:{curNote:{handler:function(t){this.setContent(t)},immediate:!0},editId:function(t){this[n.ARTICLE_CUS_SAVE](t)}},methods:{...Object(r.mapMutations)("articles",[n.ARTICLE_CUS_SAVE]),...Object(r.mapMutations)("books",[n.BOOK_CUR_UPDATE]),...Object(r.mapActions)("articles",[d.ARTICLE_DES_GET,d.ARTICLE_POST,d.ARTICLE_PUT,d.ARTICLE_CONTENT_PUT,d.ARTICLE_CONTENT_POST,d.ARTICLE_CONTENT_DELETE]),...Object(r.mapActions)("notes",[d.NOTE_POST,d.NOTE_PUT,d.NOTE_DELETE]),setContent(t={}){t._id?(this.cacheContent=this.content=t.content||"",this.cacheName=this.articleName=t.title||"未命名"):this.$alert({title:"setContent",content:"val值不正确"})},async todoEdit(t=!1){(t||"new"!==this.curNote._id&&this.articleName&&this.cacheName!==this.articleName)&&this.doPutNote()},async todoSave(){if(!this.articleName)return;this.$showLoading();const t=await this[d.NOTE_POST]({content:this.content,title:this.articleName,catalogId:this.createToCatalogId});if(!t.err){this.$toast({title:"添加成功"});const e=t.data.id;this.$emit("emitUpdateNote",{id:e,force:!0})}this.$hideLoading()},async getData(t,e=!1){this.editId=t,this.$showLoading();const o=await this[d.ARTICLE_DES_GET]({_id:t,force:e});if(!o.err){const{bookId:t,catalogId:e}=o.data,{MOCK:r}=process.env;r||this[n.BOOK_CUR_UPDATE](t)}this.$hideLoading()},async toDoPutNote(){this.isVisitor||this.dataHasChange&&"new"!==this.curNote._id&&this.doPutNote()},async doPutNote(){this.isEditContents=!1,this.$showLoading();const t=await this[d.NOTE_PUT]({_id:this.curNote._id,title:this.articleName,content:this.content});this.$hideLoading(),t.err||this.$toast({title:"修改成功"}),this.cacheName=this.articleName,this.cacheContent=this.content,this.$emit("emitUpdateNote",{force:!0,id:this.curNote._id})},async init(){const{id:t}=this.$route.params;t&&(this.editId=t,await this.getData(t))}},mounted(){this.init()}},f=o(4);var component=Object(f.a)(l,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"article-layout flex direction-column flex-1 markdown"},[t._ssrNode('<div class="article-title flex " data-v-3c55dda7><div class="flex-1 schema-title-layout relative" data-v-3c55dda7>'+(t.isVisitor?'<div class="full-input" data-v-3c55dda7>'+t._ssrEscape(t._s(t.articleName))+"</div>":"<input"+t._ssrAttr("value",t.articleName)+' class="full-input" data-v-3c55dda7>')+"</div> "+(t.isVisitor?"\x3c!----\x3e":'<div class="schema-operate" data-v-3c55dda7><span'+t._ssrClass("schema-operate-btn",{"disable-btn":!1})+t._ssrStyle(null,null,{display:"new"===t.curNote._id?"":"none"})+" data-v-3c55dda7>保存</span></div>")+"</div> "),t._ssrNode('<div class="flex-1 flex" data-v-3c55dda7>',"</div>",[o("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.toDoPutNote,expression:"toDoPutNote"}],staticClass:"article-content relative flex-1 flex",class:{noSave:t.dataHasChange},on:{click:function(e){t.isEditContents=!0},keydown:function(e){return(e.type.indexOf("key")||83===e.keyCode)&&e.ctrlKey?e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.toDoPutNote(e)):null}}},[t._ssrNode('<div class="flex-1 relative" data-v-3c55dda7>',"</div>",[t._ssrNode('<div class="form-layout theme-1" data-v-3c55dda7>',"</div>",[o("markdown-edit",{attrs:{onlyView:t.isVisitor,showEdit:"new"===t.curNote._id},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)])])])],2)},[],!1,function(t){var e=o(108);e.__inject__&&e.__inject__(t)},"3c55dda7","2c3d3940");e.a=component.exports},120:function(t,e,o){var content=o(143);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(7).default;t.exports.__inject__=function(t){r("16b7ae1b",content,!0,t)}},142:function(t,e,o){"use strict";o.r(e);var r=o(120),n=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,function(){return r[t]})}(d);e.default=n.a},143:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,"[data-v-40b1ee19]:root{--text-color:red}.book-slider-layout[data-v-40b1ee19]{padding:15px;background:#2d2d2d}.book-layout[data-v-40b1ee19]{margin-top:40px;width:38px;height:38px;cursor:pointer;position:relative;z-index:1}.book-layout .book-icon-layout[data-v-40b1ee19]{line-height:38px;width:100%;height:100%;text-align:center;border-radius:50%;background:#fff;overflow:hidden;position:relative}.book-layout .iconfont[data-v-40b1ee19]{font-size:26px}.book-layout .book-list-layout[data-v-40b1ee19]{max-width:300px;padding:7px 20px;background:#2d2d2d;position:absolute;left:100%;top:0;transition:.3s;transform:scale(0);transform-origin:0 15px}.book-layout .book-list-layout .book-list-item-layout[data-v-40b1ee19]{color:#fff;text-align:center}.book-layout .book-list-layout .book-list-item-layout .icon[data-v-40b1ee19]{width:25px;height:25px;line-height:22px;border:1px solid #fff;border-radius:50%}.book-layout .book-list-layout .book-list-item-layout .icon .iconfont[data-v-40b1ee19]{font-size:16px}.book-layout .book-list-layout .book-list-item-layout .book-name[data-v-40b1ee19]{font-size:12px;margin-left:10px}.book-layout .book-list-layout .book-list-item-layout[data-v-40b1ee19]:not(:last-child){margin-bottom:10px}.book-layout .book-list-layout .book-list-item-layout.act .icon[data-v-40b1ee19]{border:1px solid #398dee;background:#398dee}.show-book-list:hover .book-list-layout[data-v-40b1ee19]{transform:scale(1)}.book-layout.act[data-v-40b1ee19]{transform:scale(1.2)}.book-layout.act .book-icon-layout[data-v-40b1ee19]{background:#398dee}.book-layout.act .book-icon-layout .iconfont[data-v-40b1ee19]{color:#fff}.book-layout[data-v-40b1ee19]:not(:last-child){margin-bottom:10px}.catalog-layout[data-v-40b1ee19]{padding:15px 2px;overflow:auto;background:#2d2d2d;color:#919191;width:200px;max-width:200px;transition:.3s}.hidden-catalog[data-v-40b1ee19]{padding:15px 0;max-width:0;overflow:hidden}.no-data[data-v-40b1ee19]{flex:1;font-size:20px;padding:20px;color:#7e8896;background:#faf9f9}.no-data .iconfont[data-v-40b1ee19]{font-size:100px}.no-data .create-btn[data-v-40b1ee19]{color:#398dee;cursor:pointer}",""])},148:function(t,e,o){"use strict";o.r(e);var r=o(5),n=o(0),d=o(1),c=o(34),l=o(103),f=o(110),h=o(111),m=o(104),v=o(8),_={components:{TreeItem:l.a,NoteBrief:f.a,noteDes:h.a,articleFixed:m.a},data:function(){return{createToCatalogId:""}},computed:{...Object(r.mapState)({schemaList:t=>t.schema.list,noteList:t=>t.notes.list,curBook:t=>t.books.curBook,curNote:t=>t.notes.curNote,showDir:t=>t.config.showDir,curCatalog:t=>t.catalogs.curCatalog}),...Object(r.mapGetters)("catalogs",["treeChainList"]),curNoteList:function(){return this.curCatalog&&this.noteList&&this.curBook&&this.noteList[this.curBook+"_"+this.curCatalog]||[]},curEditNote:function(){const t=this.curNoteList.find(t=>t._id===this.curNote);return t||{_id:"new"}}},methods:{...Object(r.mapMutations)("catalogs",[n.CATALOGS_CUR_SAVE]),...Object(r.mapMutations)("notes",[n.NOTE_CUR_UPDATE]),...Object(r.mapActions)("books",[d.BOOK_LIST_GET]),...Object(r.mapActions)("notes",[d.NOTES_RECENTLY_GET,d.NOTES_GET]),...Object(r.mapActions)("catalogs",[d.CATALOGS_GET]),async getNoteData(){Promise.all([this[d.BOOK_LIST_GET](),this[d.CATALOGS_GET]({parentId:"root",bookId:this.curBook})]).then(()=>{this[d.NOTES_RECENTLY_GET]()}).catch(t=>{console.log("err",t),this.$alert({title:"getBookData",content:t.message})})},async chooseCurNote(t){this[n.NOTE_CUR_UPDATE](t._id)},toCreateNote(t){this.createToCatalogId=t.catalogId,this.chooseCurNote({_id:"new"})},async doUpdateNote(t={}){const{id:e,force:o}=t;this.curCatalog===v.a.recentlyArticlesKey?await this[d.NOTES_RECENTLY_GET]({force:o}):await this[d.NOTES_GET]({force:o}),e&&this.chooseCurNote({_id:e})},async init(){this.getNoteData(),c.a.$on("emitToCreateArticle",t=>{this.toCreateNote(t)}),c.a.$on("emitFromCatalog",t=>{const{isNew:e}=t;e?this.toCreateNote({catalogId:t.catalogId}):this.doUpdateNote(t)}),c.a.$on("updateCurBooks",()=>{this[n.CATALOGS_CUR_SAVE](v.a.recentlyArticlesKey),this.getNoteData()})}},mounted(){this[d.BOOK_LIST_GET]()}},x=o(4);var component=Object(x.a)(_,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"flex flex-1 no-data flex direction-column justify-content-center align-items-center"},[this._ssrNode('<i class="iconfont icon-jingdian" data-v-40b1ee19></i> <div data-v-40b1ee19>从左侧选择你的书架</div>')])},[],!1,function(t){var e=o(142);e.__inject__&&e.__inject__(t)},"40b1ee19","aeae91c4");e.default=component.exports},89:function(t,e,o){var content=o(95);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(7).default;t.exports.__inject__=function(t){r("00002bc2",content,!0,t)}},90:function(t,e,o){var content=o(97);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(7).default;t.exports.__inject__=function(t){r("591aa9ca",content,!0,t)}},91:function(t,e,o){var content=o(99);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(7).default;t.exports.__inject__=function(t){r("2010b058",content,!0,t)}},92:function(t,e,o){var content=o(107);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(7).default;t.exports.__inject__=function(t){r("9fd8ec10",content,!0,t)}},93:function(t,e,o){var content=o(109);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var r=o(7).default;t.exports.__inject__=function(t){r("5fdb5f2e",content,!0,t)}},94:function(t,e,o){"use strict";o.r(e);var r=o(89),n=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,function(){return r[t]})}(d);e.default=n.a},95:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,'[data-v-c48f35b2]:root{--text-color:red}.catalogs-layout .catalogs-layout[data-v-c48f35b2]{padding-left:20px}.iconfont[data-v-c48f35b2]{font-size:25px;position:relative}.catalogs-item-layout[data-v-c48f35b2]{cursor:pointer;padding:7px 25px;position:relative;transition:.3s}.catalogs-item-layout .icon-open[data-v-c48f35b2]{display:none}.catalogs-item-layout .icon-close[data-v-c48f35b2]{display:block}.catalogs-item-layout[data-v-c48f35b2]:after{content:"";background:transparent;position:absolute;top:0;width:100%;height:100%;left:-100%;transition:.3s}.operate-triangle-btn[data-v-c48f35b2]{display:none;position:absolute;width:16px;height:16px;right:12px;top:50%;transform:translateY(-50%)}.operate-triangle-btn .iconfont[data-v-c48f35b2]{font-size:15px}.catalogs-item-layout .has-child[data-v-c48f35b2]{position:absolute;border-left:6px solid #919191;border-top:5px solid transparent;border-bottom:5px solid transparent;width:0;height:0;left:12px;top:50%;transform:translateY(-6px);transition:.2s}.catalogs-item-layout .has-child[data-v-c48f35b2]:after{content:"";width:20px;height:20px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.catalogs-item-layout .has-child.in-chain[data-v-c48f35b2]{transform:translateY(-6px) rotate(90deg)}.catalogs-item-hover[data-v-c48f35b2]:hover{background:#404040;color:#ddd}.catalogs-item-hover:hover .operate-triangle-btn[data-v-c48f35b2]{display:block;color:#ddd}.catalogs-item-hover[data-v-c48f35b2]:hover:after{background:#404040}.catalogs-item-layout.act[data-v-c48f35b2]{background:#5f5f5f;color:#ddd}.catalogs-item-layout.act .icon-open[data-v-c48f35b2]{display:block}.catalogs-item-layout.act .icon-close[data-v-c48f35b2]{display:none}.catalogs-item-layout.act[data-v-c48f35b2]:after,.catalogs-item-layout.act[data-v-c48f35b2]:hover,.catalogs-item-layout.act[data-v-c48f35b2]:hover:after{background:#5f5f5f}.catalogs-name[data-v-c48f35b2],.edit-catalogs-input[data-v-c48f35b2]{position:relative;max-width:150px;padding:0 5px}.edit-catalogs-input[data-v-c48f35b2]{z-index:1;background:transparent;vertical-align:bottom;border:none;color:inherit;font-size:inherit;height:25px}.catalog-operate-layout[data-v-c48f35b2]{position:fixed;background:rgba(0,0,0,.8);left:50%;top:50%;color:#fff;z-index:999;border-radius:5px}.catalog-operate-layout .catalog-operate-item[data-v-c48f35b2]{width:150px;padding:10px 20px;position:relative}.catalog-operate-layout .catalog-operate-item[data-v-c48f35b2]:not(:last-child){border-bottom:1px solid hsla(0,0%,100%,.2)}.catalog-operate-layout .catalog-operate-item.hadChild[data-v-c48f35b2]:after{content:"";position:absolute;border-left:4px solid #fff;border-top:4px solid transparent;border-bottom:4px solid transparent;right:10px;top:50%;transform:translateY(-50%)}.catalog-operate-layout .catalog-operate-item:hover .operate-item-child[data-v-c48f35b2]{display:block}.catalog-operate-layout .operate-item-child[data-v-c48f35b2]{position:absolute;left:100%;top:0;width:100%;border-radius:0 5px 5px 0;background:rgba(0,0,0,.8);border-left:1px solid hsla(0,0%,100%,.2);display:none}.catalog-operate-layout .catalog-operate-item.builtIn[data-v-c48f35b2]{border-bottom:1px solid hsla(0,0%,100%,.6)}#hello_recent[data-v-c48f35b2]{font-size:24px}',""])},96:function(t,e,o){"use strict";o.r(e);var r=o(90),n=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,function(){return r[t]})}(d);e.default=n.a},97:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,'[data-v-68298b1c]:root{--text-color:red}#codeMirror[data-v-68298b1c],.showCompileMarkdownBox[data-v-68298b1c]{width:100%;height:100%}.code-mirror .demo-split-pane[data-v-68298b1c]{padding:10px;overflow:auto}.code-mirror .showCompileMarkdownBox[data-v-68298b1c]{padding:0 7px;overflow:auto;word-break:break-all}.code-mirror .ivu-split-horizontal[data-v-68298b1c]{height:100%}.code-mirror .code-mirror-tags[data-v-68298b1c]{background:#202020;position:relative}.code-mirror .code-mirror-tags .tags-item[data-v-68298b1c]{border-bottom:1px solid #fff;position:relative;display:inline-block;padding:12px 15px;cursor:pointer}.code-mirror .code-mirror-tags .tags-item.act[data-v-68298b1c]{color:#515a6e;background:#fff;z-index:2}.code-mirror .code-mirror-tags .tags-item[data-v-68298b1c]:hover{color:#000}.code-mirror .code-mirror-tags .tags-item-2[data-v-68298b1c]{display:inline-block;float:right;cursor:pointer}.code-mirror .code-mirror-tags .tags-item-2.act[data-v-68298b1c]{background:#313131;color:#fff}.code-mirror .code-mirror-tags[data-v-68298b1c]:after{content:"";height:1px;background:#e1e4e8;position:absolute;width:100%;left:0;z-index:1;bottom:0}.markdown-layout .markdown-edit-box[data-v-68298b1c]{width:100%;height:100%;overflow:auto;padding:20px;background:#202020;color:#919191;border:none;outline:none;font-size:14px}.markdown-layout .md-body-layout[data-v-68298b1c]{overflow:auto;background:#fff;padding:0;box-shadow:inset 0 0 4px 1px #e7eaef}.markdown-layout .markdown-operate-layout[data-v-68298b1c]{position:absolute;z-index:2;right:20px;top:10px;color:#fff}.markdown-layout .markdown-operate-layout .icon-layout[data-v-68298b1c]{display:inline-block;background:rgba(0,0,0,.7);padding:3px 5px;cursor:pointer;border-radius:3px;text-align:center}.markdown-layout .markdown-operate-layout .icon-layout.act[data-v-68298b1c]{background:rgba(57,141,238,.7)}',""])},98:function(t,e,o){"use strict";o.r(e);var r=o(91),n=o.n(r);for(var d in r)"default"!==d&&function(t){o.d(e,t,function(){return r[t]})}(d);e.default=n.a},99:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,"[data-v-bd510b56]:root{--text-color:red}.controller-layout-fixed[data-v-bd510b56]{position:fixed;bottom:50px;left:0;z-index:10}.controller-layout-fixed .controller-layout-item[data-v-bd510b56]{width:30px;height:30px;line-height:30px;cursor:pointer;background:#919191;border-radius:0 20px 20px 0;margin-bottom:10px;text-align:center}.controller-layout-fixed .iconfont[data-v-bd510b56]{font-size:18px}.controller-layout-fixed .controller-layout-item.act[data-v-bd510b56]{background:#fff}",""])}};
//# sourceMappingURL=167a23f02e7e96e5c1af.js.map