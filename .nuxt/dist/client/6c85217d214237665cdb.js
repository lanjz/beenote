(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{223:function(t,e,n){var content=n(445);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("d4e9ec7e",content,!0,{sourceMap:!1})},224:function(t,e,n){var content=n(447);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("0ac72014",content,!0,{sourceMap:!1})},443:function(t,e,n){"use strict";var r=n(12),o=n(116)(6),c="findIndex",l=!0;c in[]&&Array(1)[c](function(){l=!1}),r(r.P+r.F*l,"Array",{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),n(65)(c)},444:function(t,e,n){"use strict";var r=n(223);n.n(r).a},445:function(t,e,n){(t.exports=n(16)(!1)).push([t.i,"[data-v-210efe06]:root{--text-color:red}.field-layout[data-v-210efe06]{padding:0 7px}.field-title[data-v-210efe06]{border-bottom:1px solid #e1e4e8;padding:15px;font-size:18px}.field-content[data-v-210efe06]{padding:15px}.add-options-item[data-v-210efe06]{padding:4px 12px;display:inline-block;color:#fff;background:#24292e;border-radius:2px;margin-right:7px;margin-bottom:7px;position:relative}.add-options-item.act[data-v-210efe06]{background:#398dee}.add-options-btn[data-v-210efe06]{margin:0;transition:.4s;cursor:pointer}.add-options-input[data-v-210efe06]{width:140px;margin-right:10px}.form-content[data-v-210efe06]{max-width:500px}.form-bg[data-v-210efe06]{padding:10px}.submit-layout[data-v-210efe06]{text-align:right;width:350px}",""])},446:function(t,e,n){"use strict";var r=n(224);n.n(r).a},447:function(t,e,n){(t.exports=n(16)(!1)).push([t.i,'[data-v-d6db7272]:root{--text-color:red}.schema-title[data-v-d6db7272]{border-bottom:1px solid #e1e4e8;padding:15px;font-size:18px}.schema-content[data-v-d6db7272]{padding:15px;background:#f2f2f2}.catalogs-layout[data-v-d6db7272]{width:200px;border-right:1px solid #e1e4e8}.catalogs-item-layout[data-v-d6db7272]{padding:10px 20px;cursor:pointer;font-size:14px;position:relative}.catalogs-item-layout .iconfont[data-v-d6db7272]{margin-right:2px;font-size:22px}.catalogs-item-layout.act[data-v-d6db7272]{background:#f2f2f2}.catalogs-item-layout.act .iconfont[data-v-d6db7272]{color:#398dee}.catalogs-item-layout.act[data-v-d6db7272]:after{content:"";background:#398dee;position:absolute;height:100%;width:4px;right:0;top:0}.schema-operate[data-v-d6db7272]{font-size:15px}.schema-title-layout[data-v-d6db7272]{padding:0 10px}.add-catalogs-layout[data-v-d6db7272]{border-bottom:5px solid #f2f2f2;padding:16px 20px}.add-catalogs-layout .iconfont[data-v-d6db7272]{margin-right:2px;font-size:25px;color:#398dee}',""])},455:function(t,e,n){"use strict";n.r(e);n(18);var r=n(2),o=(n(40),n(115),n(11),n(62),n(6)),c=n(21),l=(n(4),n(3)),d=(n(63),n(64),n(443),{type:"input",name:"",options:[],default:"",arrDefault:[],isDone:""}),f={props:{curField:{type:Object,default:function(){return{}}},curSchemataInfo:{type:Object,default:function(){return{}}},hasDone:{default:function(){return null}}},data:function(){return{field:Object(o.a)({},d),optionsIdAsc:0,typeList:[{alias:"单行文本",name:"input",type:"String"},{alias:"多行文本",name:"textarea",type:"String"},{alias:"markdown",name:"markdown",type:"markdown"},{alias:"单选",name:"radio",type:"String"},{alias:"多选",name:"select",type:"Array"}],newOptionValue:"",originData:JSON.stringify(d)}},computed:{disableBtn:function(){return!this.field.name||JSON.stringify(this.field)===this.originData}},methods:Object(o.a)({},Object(c.b)("schema",[l.SCHEMA_FIELD_POST,l.SCHEMA_FIELD_PUT]),{doClearSchemaDefault:function(t){this.field.default="",this.field.arrDefault=[]},doAddSchemaOption:function(){var t=this;if(this.newOptionValue)if(this.field.options.findIndex(function(e){return e.name===t.newOptionValue})>-1)window.alert("".concat(this.newOptionValue,"已存在"));else{for(var e=this.optionsIdAsc+1,n="option_".concat(e);this.field.options.findIndex(function(t){return t.id===n})>-1;)n="option_".concat(e+=1);this.field.options.push({name:this.newOptionValue,id:n}),this.newOptionValue=""}},todoSaveSchema:function(){if(!this.disableBtn)if(this.field.name){"select"===this.field.type&&(this.field.default=this.field.arrDefault);var t=null,e=Object.prototype.toString.call(this.field.default);switch(this.field.type){case"input":case"textarea":case"markdown":case"time":case"radio":this.field.default&&"[object String]"!==e&&(t=new TypeError("类型值不是String类型")),this.field.isDone&&"[object String]"!==e&&(t=new TypeError("类型值不是String类型"));break;case"select":this.field.default&&"[object Array]"!==e&&(t=new TypeError("类型值不是Array类型"))}t?this.$alert({title:t.message}):JSON.stringify(this.field)!==this.originData?this.doSaveSchema():this.todoCloseEdit()}else window.alert("请输入别名")},doSaveSchema:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=null,this.$showLoading(),!this.field._id){t.next=8;break}return t.next=5,this[l.SCHEMA_FIELD_PUT]({schemataId:this.curSchemataInfo._id,_id:this.field._id,field:this.field});case 5:e=t.sent,t.next=11;break;case 8:return t.next=10,this[l.SCHEMA_FIELD_POST]({schemataId:this.curSchemataInfo._id,field:this.field});case 10:e=t.sent;case 11:if(this.$hideLoading(),!e.err){t.next=15;break}return this.$alert({title:e.err.message}),t.abrupt("return");case 15:n=this.field._id?"修改成功":"添加成功",this.$toast({title:n}),this.todoCloseEdit(!0);case 18:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),todoCloseEdit:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.$emit("emitCloseEdit",t),this.options=[]},todoOptionRename:function(t,e){this.field.options[e].name=t.target.innerText}}),mounted:function(){this.curField._id?(this.field=Object(o.a)({},this.field,this.curField),this.originData=JSON.stringify(this.field)):(this.field=Object(o.a)({},d),this.field.options=[],this.field.arrDefault=[])}},h=(n(444),n(8)),m={components:{EditField:Object(h.a)(f,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex"},[n("div",{staticClass:"flex flex-1 direction-column"},[n("div",{staticClass:"flex-1 form-bg bg-fff"},[n("div",{staticClass:"form-layout"},[n("div",{staticClass:"form-group flex"},[n("div",{staticClass:"form-label-layout"},[t._v("\n            别名：\n          ")]),t._v(" "),n("div",{staticClass:"flex flex-1 align-items-center"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.field.name,expression:"field.name"}],staticClass:"form-input",domProps:{value:t.field.name},on:{input:function(e){e.target.composing||t.$set(t.field,"name",e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"form-group flex"},[n("div",{staticClass:"form-label-layout"},[t._v("\n            类型：\n          ")]),t._v(" "),n("div",{staticClass:"flex flex-1 align-items-center"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.field.type,expression:"field.type"}],staticClass:"from-select",on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.field,"type",e.target.multiple?n:n[0])},t.doClearSchemaDefault]}},t._l(t.typeList,function(e,r){return n("option",{domProps:{value:e.name}},[t._v(t._s(e.alias)+"\n              ")])}),0)])]),t._v(" "),"radio"===t.field.type||"select"===t.field.type?n("div",{staticClass:"form-group flex"},[n("div",{staticClass:"form-label-layout"},[t._v("\n            选项：\n          ")]),t._v(" "),n("div",{staticClass:"flex flex-1 form-content wrap direction-column"},[n("div",{staticClass:"flex align-items-center wrap"},t._l(t.field.options,function(e,r){return n("div",{staticClass:"add-options-item",attrs:{contenteditable:"true"},on:{blur:function(e){return t.todoOptionRename(e,r)}}},[t._v("\n                "+t._s(e.name)+"\n              ")])}),0),t._v(" "),n("div",{staticClass:"flex align-items-center wrap"},[n("input",{directives:[{name:"focus",rawName:"v-focus:select",arg:"select"},{name:"model",rawName:"v-model",value:t.newOptionValue,expression:"newOptionValue"}],staticClass:"form-input add-options-input",attrs:{type:"text"},domProps:{value:t.newOptionValue},on:{input:function(e){e.target.composing||(t.newOptionValue=e.target.value)}}}),t._v(" "),n("div",{staticClass:"add-options-item add-options-btn",class:{"disable-btn":!t.newOptionValue},on:{click:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"trim",void 0,e.key,void 0)?null:t.doAddSchemaOption(e)}}},[t._v("\n                add\n              ")])])])]):t._e(),t._v(" "),"input"===t.field.type?n("div",{staticClass:"form-group flex"},[n("div",{staticClass:"form-label-layout"},[t._v("\n            默认值：\n          ")]),t._v(" "),n("div",{staticClass:"flex flex-1 align-items-center"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.field.default,expression:"field.default"}],staticClass:"form-input",attrs:{type:"text"},domProps:{value:t.field.default},on:{input:function(e){e.target.composing||t.$set(t.field,"default",e.target.value)}}})])]):t._e(),t._v(" "),"textarea"===t.field.type||"markdown"===t.field.type?n("div",{staticClass:"form-group flex"},[n("div",{staticClass:"form-label-layout"},[t._v("\n            默认值：\n          ")]),t._v(" "),n("div",{staticClass:"flex flex-1 align-items-center"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.field.default,expression:"field.default"}],staticClass:"form-input",attrs:{type:"text"},domProps:{value:t.field.default},on:{input:function(e){e.target.composing||t.$set(t.field,"default",e.target.value)}}})])]):t._e(),t._v(" "),"radio"===t.field.type&&t.field.options.length?n("div",{staticClass:"form-group flex"},[n("div",{staticClass:"form-label-layout"},[t._v("\n            默认值：\n          ")]),t._v(" "),n("div",{staticClass:"flex flex-1 align-items-center"},[n("div",{staticClass:"radio-style",class:{act:!t.field.default},on:{click:function(e){t.field.default=""}}},[t._v("\n              无\n            ")]),t._v(" "),t._l(t.field.options,function(e,r){return n("div",{staticClass:"radio-style",class:{act:e.id===t.field.default}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.field.default,expression:"field.default"}],key:e.id,staticClass:"form-radio",attrs:{type:"radio"},domProps:{value:e.id,checked:t._q(t.field.default,e.id)},on:{change:function(n){return t.$set(t.field,"default",e.id)}}}),t._v(t._s(e.name)+"\n            ")])})],2)]):t._e(),t._v(" "),!t.hasDone&&"radio"===t.field.type&&t.field.options.length||t.hasDone&&t.hasDone._id===t.field._id?n("div",{staticClass:"form-group flex"},[n("div",{staticClass:"form-label-layout"},[t._v("\n            完成标识：\n          ")]),t._v(" "),n("div",{staticClass:"flex flex-1 align-items-center"},[n("div",{staticClass:"radio-style",class:{act:!t.field.isDone},on:{click:function(e){t.field.isDone=""}}},[t._v("\n              无\n            ")]),t._v(" "),t._l(t.field.options,function(e,r){return n("div",{staticClass:"radio-style",class:{act:e.id===t.field.isDone}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.field.isDone,expression:"field.isDone"}],key:e.id,staticClass:"form-radio",attrs:{type:"radio"},domProps:{value:e.id,checked:t._q(t.field.isDone,e.id)},on:{change:function(n){return t.$set(t.field,"isDone",e.id)}}}),t._v(t._s(e.name)+"\n            ")])})],2)]):t._e(),t._v(" "),"select"===t.field.type&&t.field.options.length?n("div",{staticClass:"form-group flex"},[n("div",{staticClass:"form-label-layout"},[t._v("\n            默认值：\n          ")]),t._v(" "),n("div",{staticClass:"flex flex-1 align-items-center"},t._l(t.field.options,function(e,r){return n("div",{staticClass:"add-options-item cursor",class:{act:t.field.arrDefault.indexOf(e.id)>-1}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.field.arrDefault,expression:"field.arrDefault"}],key:e.id,staticClass:"form-radio",attrs:{type:"checkbox"},domProps:{value:e.id,checked:Array.isArray(t.field.arrDefault)?t._i(t.field.arrDefault,e.id)>-1:t.field.arrDefault},on:{change:function(n){var r=t.field.arrDefault,o=n.target,c=!!o.checked;if(Array.isArray(r)){var l=e.id,d=t._i(r,l);o.checked?d<0&&t.$set(t.field,"arrDefault",r.concat([l])):d>-1&&t.$set(t.field,"arrDefault",r.slice(0,d).concat(r.slice(d+1)))}else t.$set(t.field,"arrDefault",c)}}}),t._v(t._s(e.name)+"\n            ")])}),0)]):t._e(),t._v(" "),n("div",{staticClass:"form-group submit-layout"},[n("div",{staticClass:"btn",class:{"disable-btn":t.disableBtn},on:{click:t.todoSaveSchema}},[t._v("提交")]),t._v(" "),n("div",{staticClass:"btn second-btn",on:{click:function(e){return t.todoCloseEdit(!1)}}},[t._v("返回")])])])])])])},[],!1,null,"210efe06",null).exports},data:function(){return{actSchema:"",curField:null,cacheName:"",showAddInput:!1,newSchemaName:""}},computed:Object(o.a)({},Object(c.e)({schemaList:function(t){return t.schema.list}}),{schemaListArr:function(){return Object.values(this.schemaList).filter(function(t){return"markdown"!==t._id})},actSchemaObj:function(){return this.schemaList[this.actSchema]||{}},hasDone:function(){return this.actSchemaObj.fields.find(function(t){return"radio"===t.type&&t.isDone})}}),methods:Object(o.a)({},Object(c.b)("schema",[l.SCHEMA_LIST_GET,l.SCHEMA_PUT,l.SCHEMA_POST,l.SCHEMA_DELETE,l.SCHEMA_FIELD_DELETE]),{todoAddSchema:function(){var t="",i=0;do{t="未命名"+ ++i}while(this.schemaListArr.find(function(e){return e.name===t}));this.newSchemaName=t,this.showAddInput=!0},toAddSchema:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e,n=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.schemaListArr.find(function(t){return t.name===n.newSchemaName})){t.next=4;break}return this.$alert({title:"".concat(this.newSchemaName,"不存在")}),t.abrupt("return");case 4:return this.$showLoading(),t.next=7,this[l.SCHEMA_POST]({name:this.newSchemaName});case 7:if(e=t.sent,this.$hideLoading(),e.err){t.next=14;break}return this.$toast({title:"添加成功"}),t.next=13,this.getData();case 13:this.initCurSchema();case 14:this.showAddInput=!1,this.newSchemaName="";case 16:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),initCurSchema:function(){this.schemaListArr.length?(this.actSchema=this.schemaListArr[0]._id,this.cacheName=this.schemaListArr[0].name):this.actSchema=""},getData:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e,n=arguments;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=!(n.length>0&&void 0!==n[0])||n[0],t.next=3,this[l.SCHEMA_LIST_GET]({force:e});case 3:t.sent;case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),doShowEdit:function(t){this.curField=JSON.parse(JSON.stringify(t))||{}},doHideEdit:function(t){this.curField=null,this.getData(t)},chooseSchema:function(t){this.actSchema=t._id,this.cacheName=t.name},todoSchemaRename:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e,n,r=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.cacheName){t.next=3;break}return this.cacheName=this.actSchemaObj.name,t.abrupt("return");case 3:if(this.actSchemaObj.name!==this.cacheName){t.next=5;break}return t.abrupt("return");case 5:if(e=!1,this.schemaListArr.some(function(t,n){return t._id!==r.actSchemaObj._id&&t.name===r.cacheName&&(alert("".concat(r.cacheName,"已存在")),e=!0,!0)}),!e){t.next=10;break}return this.cacheName=this.actSchemaObj.name,t.abrupt("return");case 10:return this.$showLoading(),t.next=13,this[l.SCHEMA_PUT]({_id:this.actSchemaObj._id,name:this.cacheName});case 13:return n=t.sent,t.next=16,this.getData();case 16:if(!n.err){t.next=18;break}return t.abrupt("return");case 18:this.$toast({title:"修改成功"}),this.$hideLoading();case 20:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),init:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.$showLoading(),t.next=3,this.getData(!1);case 3:this.initCurSchema(),this.$hideLoading();case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),todoDelete:function(){var t=this;this.$alert({title:'你确认要删除"'.concat(this.cacheName,'"')}).then(function(){var e=Object(r.a)(regeneratorRuntime.mark(function e(n){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n&&t.doDeleteSchema();case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())},doDeleteSchema:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.$showLoading(),t.next=3,this[l.SCHEMA_DELETE]({_id:this.actSchemaObj._id});case 3:if(e=t.sent,this.initCurSchema(),e.err){t.next=9;break}return this.$toast({title:"删除成功"}),t.next=9,this.getData(!0);case 9:this.$hideLoading();case 10:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),todoDeleteField:function(t){var e=this;this.$alert({title:"你确认要删除此字段",showCancel:!1}).then(function(n){n&&e.doDeleteField(t)})},doDeleteField:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.$showLoading(),n=this[l.SCHEMA_FIELD_DELETE]({schemataId:this.actSchemaObj._id,fieldId:e._id}),this.$hideLoading(),n.err){t.next=7;break}return this.$toast({title:"删除成功"}),t.next=7,this.getData(!0);case 7:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()}),mounted:function(){this.init()}},v=(n(446),Object(h.a)(m,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex flex-1"},[n("div",{staticClass:"catalogs-layout"},[n("div",{staticClass:"flex align-items-center catalogs-item-layout add-catalogs-layout",on:{click:t.todoAddSchema}},[n("i",{staticClass:"iconfont icon-tianjiajiahaowubiankuang"}),t._v(" "),n("div",{staticClass:"catalogs-name line-ellipsis"},[t._v("新建字段组")])]),t._v(" "),t.showAddInput?n("div",{staticClass:"flex align-items-center catalogs-item-layout"},[n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.newSchemaName,expression:"newSchemaName",modifiers:{trim:!0}},{name:"focus",rawName:"v-focus:select",arg:"select"}],staticClass:"edit-catalogs-input line-ellipsis",domProps:{value:t.newSchemaName},on:{blur:[t.toAddSchema,function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||(t.newSchemaName=e.target.value.trim())}}})]):t._e(),t._v(" "),t._l(t.schemaListArr,function(e,r){return n("div",{staticClass:"flex align-items-center catalogs-item-layout",class:{act:t.actSchema===e._id},on:{click:function(n){return t.chooseSchema(e)}}},[t._m(0,!0),t._v(" "),n("div",{staticClass:"catalogs-name line-ellipsis"},[t._v(t._s(e.name))])])})],2),t._v(" "),t.actSchema?n("div",{staticClass:"flex flex-1 direction-column"},[n("div",{staticClass:"schema-title flex justify-content-space-between"},[n("div",{staticClass:"flex-1 schema-title-layout relative"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.cacheName,expression:"cacheName"}],staticClass:"full-input",domProps:{value:t.cacheName},on:{blur:t.todoSchemaRename,input:function(e){e.target.composing||(t.cacheName=e.target.value)}}})]),t._v(" "),t.actSchema?n("div",{staticClass:"schema-operate"},[t.curField?t._e():n("span",{staticClass:"btn",on:{click:function(e){return t.doShowEdit(null)}}},[t._v("添加")]),t._v(" "),n("span",{staticClass:"btn warn",on:{click:t.todoDelete}},[t._v("删除")])]):t._e()]),t._v(" "),t.actSchemaObj?n("div",{staticClass:"schema-content flex-1 flex"},[t.curField?t._e():n("div",{staticClass:"panel-bg flex-1 flex"},[t.actSchemaObj.fields?n("table",{staticClass:"table-layout"},[t._m(1),t._v(" "),n("tbody",t._l(t.actSchemaObj.fields,function(e,r){return n("tr",[n("td",[n("div",{staticClass:"td-p"},[t._v(t._s(e.name))])]),t._v(" "),n("td",[n("div",{staticClass:"td-p"},[t._v(t._s(e.type))])]),t._v(" "),n("td",[n("div",{staticClass:"td-p"},[t._v(t._s(e.default||"-"))])]),t._v(" "),n("td",[e.options&&e.options.length?n("div",{staticClass:"td-p"},t._l(e.options,function(e,r){return n("span",{staticClass:"option-label"},[t._v("\n                  "+t._s(e.name)+"\n                ")])}),0):n("div",{staticClass:"td-p"},[t._v("-")])]),t._v(" "),n("td",[n("div",{staticClass:"td-p"},[t._v(t._s(e.isDone||"-"))])]),t._v(" "),n("td",[n("div",{staticClass:"td-p"},[n("span",{staticClass:"table-btn",on:{click:function(n){return t.doShowEdit(e)}}},[t._v("编辑")]),t._v(" "),n("span",{staticClass:"table-btn warn",on:{click:function(n){return t.todoDeleteField(e)}}},[t._v("删除")])])])])}),0)]):t._e()]),t._v(" "),t.curField?n("div",{staticClass:"panel-bg flex flex-1"},[n("EditField",{attrs:{curField:t.curField,curSchemataInfo:t.actSchemaObj,hasDone:t.hasDone},on:{emitCloseEdit:t.doHideEdit}})],1):t._e()]):t._e()]):n("div",{staticClass:"flex flex-1 direction-column align-items-center justify-content-center no-data-cue-bg"},[n("div",{staticClass:"no-data-cue"},[t._v("暂无数据")])])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"iconfont"},[e("i",{staticClass:"iconfont icon-ziduan"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[n("div",{staticClass:"th-p"},[t._v("别名")])]),t._v(" "),n("th",[n("div",{staticClass:"th-p"},[t._v("类型")])]),t._v(" "),n("th",[n("div",{staticClass:"th-p"},[t._v("默认值")])]),t._v(" "),n("th",[n("div",{staticClass:"th-p"},[t._v("选项")])]),t._v(" "),n("th",[n("div",{staticClass:"th-p"},[t._v("完成标识")])]),t._v(" "),n("th",{staticStyle:{width:"150px"}},[n("div",{staticClass:"th-p"})])])])}],!1,null,"d6db7272",null));e.default=v.exports}}]);