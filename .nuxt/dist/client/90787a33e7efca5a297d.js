(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{262:function(t,e,o){var content=o(489);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(12).default)("16b7ae1b",content,!0,{sourceMap:!1})},488:function(t,e,o){"use strict";var n=o(262);o.n(n).a},489:function(t,e,o){(t.exports=o(11)(!1)).push([t.i,"[data-v-40b1ee19]:root{--text-color:red}.book-slider-layout[data-v-40b1ee19]{padding:15px;background:#2d2d2d}.book-layout[data-v-40b1ee19]{margin-top:40px;width:38px;height:38px;cursor:pointer;position:relative;z-index:1}.book-layout .book-icon-layout[data-v-40b1ee19]{line-height:38px;width:100%;height:100%;text-align:center;border-radius:50%;background:#fff;overflow:hidden;position:relative}.book-layout .iconfont[data-v-40b1ee19]{font-size:26px}.book-layout .book-list-layout[data-v-40b1ee19]{max-width:300px;padding:7px 20px;background:#2d2d2d;position:absolute;left:100%;top:0;transition:.3s;transform:scale(0);transform-origin:0 15px}.book-layout .book-list-layout .book-list-item-layout[data-v-40b1ee19]{color:#fff;text-align:center}.book-layout .book-list-layout .book-list-item-layout .icon[data-v-40b1ee19]{width:25px;height:25px;line-height:22px;border:1px solid #fff;border-radius:50%}.book-layout .book-list-layout .book-list-item-layout .icon .iconfont[data-v-40b1ee19]{font-size:16px}.book-layout .book-list-layout .book-list-item-layout .book-name[data-v-40b1ee19]{font-size:12px;margin-left:10px}.book-layout .book-list-layout .book-list-item-layout[data-v-40b1ee19]:not(:last-child){margin-bottom:10px}.book-layout .book-list-layout .book-list-item-layout.act .icon[data-v-40b1ee19]{border:1px solid #398dee;background:#398dee}.show-book-list:hover .book-list-layout[data-v-40b1ee19]{transform:scale(1)}.book-layout.act[data-v-40b1ee19]{transform:scale(1.2)}.book-layout.act .book-icon-layout[data-v-40b1ee19]{background:#398dee}.book-layout.act .book-icon-layout .iconfont[data-v-40b1ee19]{color:#fff}.book-layout[data-v-40b1ee19]:not(:last-child){margin-bottom:10px}.catalog-layout[data-v-40b1ee19]{padding:15px 2px;overflow:auto;background:#2d2d2d;color:#919191;width:200px;max-width:200px;transition:.3s}.hidden-catalog[data-v-40b1ee19]{padding:15px 0;max-width:0;overflow:hidden}.no-data[data-v-40b1ee19]{flex:1;font-size:20px;padding:20px;color:#7e8896;background:#faf9f9}.no-data .iconfont[data-v-40b1ee19]{font-size:100px}.no-data .create-btn[data-v-40b1ee19]{color:#398dee;cursor:pointer}",""])},496:function(t,e,o){"use strict";o.r(e);o(17),o(15),o(13),o(10),o(9),o(80),o(19);var n=o(2),r=(o(240),o(0)),c=o(8),l=o(1),d=o(3),f=o(130),h=o(244),k=o(267),y=o(268),m=o(245),v=o(27);function x(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable})),e.push.apply(e,o)}return e}function O(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?x(source,!0).forEach(function(e){Object(r.a)(t,e,source[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):x(source).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))})}return t}var _,w,T,E,C={components:{TreeItem:h.a,NoteBrief:k.a,noteDes:y.a,articleFixed:m.a},data:function(){return{createToCatalogId:""}},computed:O({},Object(c.e)({schemaList:function(t){return t.schema.list},noteList:function(t){return t.notes.list},curBook:function(t){return t.books.curBook},curNote:function(t){return t.notes.curNote},showDir:function(t){return t.config.showDir},curCatalog:function(t){return t.catalogs.curCatalog}}),{},Object(c.c)("catalogs",["treeChainList"]),{curNoteList:function(){return this.curCatalog&&this.noteList&&this.curBook&&this.noteList[this.curBook+"_"+this.curCatalog]||[]},curEditNote:function(){var t=this,e=this.curNoteList.find(function(e){return e._id===t.curNote});return e||{_id:"new"}}}),methods:O({},Object(c.d)("catalogs",[l.CATALOGS_CUR_SAVE]),{},Object(c.d)("notes",[l.NOTE_CUR_UPDATE]),{},Object(c.b)("books",[d.BOOK_LIST_GET]),{},Object(c.b)("notes",[d.NOTES_RECENTLY_GET,d.NOTES_GET]),{},Object(c.b)("catalogs",[d.CATALOGS_GET]),{getNoteData:(E=Object(n.a)(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:Promise.all([this[d.BOOK_LIST_GET](),this[d.CATALOGS_GET]({parentId:"root",bookId:this.curBook})]).then(function(){e[d.NOTES_RECENTLY_GET]()}).catch(function(t){console.log("err",t),e.$alert({title:"getBookData",content:t.message})});case 1:case"end":return t.stop()}},t,this)})),function(){return E.apply(this,arguments)}),chooseCurNote:(T=Object(n.a)(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this[l.NOTE_CUR_UPDATE](e._id);case 1:case"end":return t.stop()}},t,this)})),function(t){return T.apply(this,arguments)}),toCreateNote:function(t){this.createToCatalogId=t.catalogId,this.chooseCurNote({_id:"new"})},doUpdateNote:(w=Object(n.a)(regeneratorRuntime.mark(function t(){var e,o,n,r=arguments;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=r.length>0&&void 0!==r[0]?r[0]:{},o=e.id,n=e.force,this.curCatalog!==v.a.recentlyArticlesKey){t.next=7;break}return t.next=5,this[d.NOTES_RECENTLY_GET]({force:n});case 5:t.next=9;break;case 7:return t.next=9,this[d.NOTES_GET]({force:n});case 9:o&&this.chooseCurNote({_id:o});case 10:case"end":return t.stop()}},t,this)})),function(){return w.apply(this,arguments)}),init:(_=Object(n.a)(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.getNoteData(),f.a.$on("emitToCreateArticle",function(t){e.toCreateNote(t)}),f.a.$on("emitFromCatalog",function(t){t.isNew?e.toCreateNote({catalogId:t.catalogId}):e.doUpdateNote(t)}),f.a.$on("updateCurBooks",function(){e[l.CATALOGS_CUR_SAVE](v.a.recentlyArticlesKey),e.getNoteData()});case 4:case"end":return t.stop()}},t,this)})),function(){return _.apply(this,arguments)})}),mounted:function(){this[d.BOOK_LIST_GET]()}},N=(o(488),o(7)),component=Object(N.a)(C,function(){var t=this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex flex-1 no-data flex direction-column justify-content-center align-items-center"},[e("i",{staticClass:"iconfont icon-jingdian"}),this._v(" "),e("div",[this._v("从左侧选择你的书架")])])}],!1,null,"40b1ee19",null);e.default=component.exports}}]);