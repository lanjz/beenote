(window.webpackJsonp=window.webpackJsonp||[]).push([[7,6],{241:function(t,o,e){var content=e(264);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(12).default)("7fbc4b3a",content,!0,{sourceMap:!1})},242:function(t,o,e){var content=e(266);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(12).default)("0de2891f",content,!0,{sourceMap:!1})},263:function(t,o,e){"use strict";var n=e(241);e.n(n).a},264:function(t,o,e){(t.exports=e(11)(!1)).push([t.i,"[data-v-1f7e2c91]:root{--text-color:red}.no-data[data-v-1f7e2c91]{flex:1;font-size:20px;padding:20px;color:#7e8896;background:#faf9f9}.no-data .iconfont[data-v-1f7e2c91]{font-size:100px}.no-data .create-btn[data-v-1f7e2c91]{color:#398dee;cursor:pointer}",""])},265:function(t,o,e){"use strict";var n=e(242);e.n(n).a},266:function(t,o,e){(t.exports=e(11)(!1)).push([t.i,"[data-v-605d6676]:root{--text-color:red}.book-slider-layout[data-v-605d6676]{padding:15px;background:#2d2d2d}.book-layout[data-v-605d6676]{margin-top:40px;width:38px;height:38px;cursor:pointer;position:relative;z-index:1}.book-layout .book-icon-layout[data-v-605d6676]{line-height:38px;width:100%;height:100%;text-align:center;border-radius:50%;background:#fff;overflow:hidden;position:relative}.book-layout .iconfont[data-v-605d6676]{font-size:26px}.book-layout .book-list-layout[data-v-605d6676]{max-width:300px;padding:7px 20px;background:#2d2d2d;position:absolute;left:100%;top:0;transition:.3s;transform:scale(0);transform-origin:0 15px}.book-layout .book-list-layout .book-list-item-layout[data-v-605d6676]{color:#fff;text-align:center}.book-layout .book-list-layout .book-list-item-layout .icon[data-v-605d6676]{width:25px;height:25px;line-height:22px;border:1px solid #fff;border-radius:50%}.book-layout .book-list-layout .book-list-item-layout .icon .iconfont[data-v-605d6676]{font-size:16px}.book-layout .book-list-layout .book-list-item-layout .book-name[data-v-605d6676]{font-size:12px;margin-left:10px}.book-layout .book-list-layout .book-list-item-layout[data-v-605d6676]:not(:last-child){margin-bottom:10px}.book-layout .book-list-layout .book-list-item-layout.act .icon[data-v-605d6676]{border:1px solid #398dee;background:#398dee}.show-book-list:hover .book-list-layout[data-v-605d6676]{transform:scale(1)}.book-layout.act[data-v-605d6676]{transform:scale(1.2)}.book-layout.act .book-icon-layout[data-v-605d6676]{background:#398dee}.book-layout.act .book-icon-layout .iconfont[data-v-605d6676]{color:#fff}.book-layout[data-v-605d6676]:not(:last-child){margin-bottom:10px}.catalog-layout[data-v-605d6676]{padding:15px 2px;overflow:auto;background:#202020;color:#919191;width:200px;max-width:200px;transition:.3s}.hidden-catalog[data-v-605d6676]{padding:15px 0;max-width:0;overflow:hidden}",""])},271:function(t,o,e){"use strict";e.r(o);e(17),e(15),e(13),e(10),e(9),e(80),e(240);var n=e(0),r=e(51),c=(e(19),e(2)),d=e(8),l=e(1),f=e(3),h=e(130),m=e(244),k=e(267),v=e(268),x=e(27),O={data:function(){return{isRecently:""}},methods:{toCreateNote:function(t){var o=$nuxt._route.params,e=o.bookId,n=o.catalogId;this.$router.push("/".concat(e,"/").concat(n,"/new"))}},mounted:function(){var t=$nuxt._route.params.catalogId;this.isRecently=t===x.a.recentlyArticlesKey}},_=(e(263),e(7)),y=Object(_.a)(O,function(){var t=this.$createElement,o=this._self._c||t;return o("div",{staticClass:"no-data flex direction-column justify-content-center align-items-center"},[o("i",{staticClass:"iconfont icon-wushuju"}),this._v(" "),o("div",[this._v("还没任何有笔记"),this.isRecently?this._e():o("span",[this._v("，"),o("span",{staticClass:"create-btn",on:{click:this.toCreateNote}},[this._v("快速创建")])])])])},[],!1,null,"1f7e2c91",null).exports,E=e(245),C=e(259);e(6);function N(object,t){var o=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter(function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable})),o.push.apply(o,e)}return o}function T(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?N(source,!0).forEach(function(o){Object(n.a)(t,o,source[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):N(source).forEach(function(o){Object.defineProperty(t,o,Object.getOwnPropertyDescriptor(source,o))})}return t}var I,w,j,A,R,S={fetch:(R=Object(c.a)(regeneratorRuntime.mark(function t(o){var e,n,r,c,d,l,f;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=o.store,n=o.params,r=n.noteId,c=n.bookId,d=n.catalogId,e.commit("books/BOOK_CUR_UPDATE",c),e.commit("catalogs/CATALOGS_CUR_SAVE",d),e.commit("notes/NOTE_CUR_UPDATE",r),!e.state.notes.list["".concat(c,"_").concat(d)]){t.next=7;break}return t.abrupt("return");case 7:return t.next=9,e.dispatch("notes/NOTE_GET_BY_ID",{id:r,bookId:c,catalogId:d});case 9:l=t.sent,(f=l.data.extend)&&f.user&&e.commit("user/CUR_USER_INFO_SAVE",f.user),f&&f.books&&e.commit("books/BOOK_LIST_SAVE",{data:f.books,start:0}),f&&f.catalogMap&&e.commit("config/CONFIG_EXTEND_SAVE",{tar:"catalogMap",val:f.catalogMap});case 14:case"end":return t.stop()}},t)})),function(t){return R.apply(this,arguments)}),components:{TreeItem:m.a,NoteBrief:k.a,noteDes:v.a,articleFixed:E.a,bookId:"",catalogId:"",noteId:"",noNotes:y},data:function(){return{createToCatalogId:"",noData:!1,curNoteContent:{}}},head:function(){var t=[this.curEditNote.title];this.pageExtend.catalogMap&&(t=[].concat(Object(r.a)(t),[this.pageExtend.catalogMap]));var o=[].concat(Object(r.a)(t),[this.curUserInfo.username]),e="";return this.curEditNote.content&&(e=this.curEditNote.content.slice(0,150)),{title:Object(C.b)(o.join("-")),meta:[{hid:"keywords",name:"keywords",content:t.join(",")},{hid:"description",name:"description",content:e}]}},computed:T({},Object(d.e)({schemaList:function(t){return t.schema.list},noteList:function(t){return t.notes.list},curBook:function(t){return t.books.curBook},curNote:function(t){return t.notes.curNote},showDir:function(t){return t.config.showDir},curCatalog:function(t){return t.catalogs.curCatalog},curUserInfo:function(t){return t.user.curUserInfo},pageExtend:function(t){return t.config.extend}}),{},Object(d.c)("catalogs",["treeChainList"]),{},Object(d.c)("user",["isVisitor"]),{curNoteList:function(){return this.curCatalog&&this.noteList&&this.curBook&&this.noteList[this.curBook+"_"+this.curCatalog]||[]},curEditNote:function(){var t=this,o=this.curNoteList.find(function(o){return o._id===t.curNote});return o||{_id:"new"}}}),methods:T({},Object(d.d)("catalogs",[l.CATALOGS_CUR_SAVE]),{},Object(d.d)("notes",[l.NOTE_CUR_UPDATE]),{},Object(d.d)("books",[l.BOOK_CUR_UPDATE]),{},Object(d.b)("books",[f.BOOK_LIST_GET]),{},Object(d.b)("notes",[f.NOTES_RECENTLY_GET,f.NOTES_GET,f.NOTE_DES_GET]),{},Object(d.b)("catalogs",[f.CATALOGS_GET]),{},Object(d.b)("user",[f.USER_INFO_GET]),{getNoteData:(A=Object(c.a)(regeneratorRuntime.mark(function t(){var o,e=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:o=this.catalogId===x.a.recentlyArticlesKey?this[f.NOTES_RECENTLY_GET]():this[f.NOTES_GET](),Promise.all([o,this[f.BOOK_LIST_GET](),this[f.CATALOGS_GET]()]).then(function(t){var data=t[0].data.list;data.length&&!e.noteId?e.$router.push("/".concat(e.bookId,"/").concat(e.catalogId,"/").concat(data[0]._id)):e.noteId||(e.noData=!0),e.noteId&&e.$nextTick(function(){var t=document.getElementById(e.noteId),o=document.getElementById("article-item-box");if(t&&o){var n=t.offsetTop+t.clientHeight-o.clientHeight;n&&(o.scrollTop=2*n)}})}).catch(function(t){e.$alert({title:"getBookData",content:t.message})});case 2:case"end":return t.stop()}},t,this)})),function(){return A.apply(this,arguments)}),toCreateNote:function(t){this.$router.push("/".concat(this.curBook,"/").concat(Object(C.a)(t.catalogId),"/new"))},doUpdateNote:(j=Object(c.a)(regeneratorRuntime.mark(function t(){var o,e,n,r,c,d,l=arguments;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(o=l.length>0&&void 0!==l[0]?l[0]:{},e=o.id,n=o.force,r=o.catalogId,c="",this.curCatalog!==x.a.recentlyArticlesKey){t.next=9;break}return t.next=6,this[f.NOTES_RECENTLY_GET]({force:n});case 6:c=t.sent,t.next=12;break;case 9:return t.next=11,this[f.NOTES_GET]({force:n});case 11:c=t.sent;case 12:d=e,c.data.list.length&&!d&&(d=c.data.list[0]._id),this.$router.push("/".concat(this.curBook,"/").concat(Object(C.a)(r||this.curCatalog),"/").concat(d||""));case 15:case"end":return t.stop()}},t,this)})),function(){return j.apply(this,arguments)}),initEmitOn:function(){var t=this;h.a.$off("emitToCreateArticle"),h.a.$off("updateCurBooks"),h.a.$off("emitFromCatalog"),h.a.$on("emitToCreateArticle",function(o){t.toCreateNote(o)}),h.a.$on("emitFromCatalog",function(o){o.isNew?t.toCreateNote({catalogId:o.catalogId}):t.doUpdateNote(o)}),h.a.$on("updateCurBooks",function(){t[l.CATALOGS_CUR_SAVE](x.a.recentlyArticlesKey),t.getNoteData()})},init:(w=Object(c.a)(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.isVisitor||!this.noteId){t.next=2;break}return t.abrupt("return");case 2:this[l.BOOK_CUR_UPDATE](this.bookId),this[l.CATALOGS_CUR_SAVE](this.catalogId),this.getNoteData(),this.initEmitOn();case 6:case"end":return t.stop()}},t,this)})),function(){return w.apply(this,arguments)}),dealParams:(I=Object(c.a)(regeneratorRuntime.mark(function t(){var o,e,n,r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:o=$nuxt._route.params,e=o.bookId,n=o.catalogId,r=o.noteId,this.bookId=e,this.catalogId=n,this.noteId=r,this.createToCatalogId=n,this.init();case 6:case"end":return t.stop()}},t,this)})),function(){return I.apply(this,arguments)})}),mounted:function(){this.dealParams()}},U=(e(265),Object(_.a)(S,function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"flex flex-1"},[t.isVisitor?t._e():e("div",{staticClass:"catalog-layout box-shadow",class:{"hidden-catalog":!t.showDir}},[e("TreeItem")],1),t._v(" "),e("NoteBrief",{attrs:{list:t.curNoteList},on:{emitToCreateNote:t.toCreateNote,emitUpdateNote:t.doUpdateNote}}),t._v(" "),t.noData?e("noNotes"):e("note-des",{attrs:{curNote:t.curEditNote,createToCatalogId:t.createToCatalogId,curNoteContent:t.curNoteContent},on:{emitUpdateNote:t.doUpdateNote}}),t._v(" "),t.isVisitor?t._e():e("articleFixed")],1)},[],!1,null,"605d6676",null));o.default=U.exports},494:function(t,o,e){"use strict";e.r(o);var n={components:{notedCom:e(271).default}},r=e(7),component=Object(r.a)(n,function(){var t=this.$createElement;return(this._self._c||t)("notedCom")},[],!1,null,"575e19b4",null);o.default=component.exports}}]);