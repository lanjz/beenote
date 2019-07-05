exports.ids=[8],exports.modules={154:function(t,e,d){var content=d(175);"string"==typeof content&&(content=[[t.id,content,""]]),content.locals&&(t.exports=content.locals);var n=d(7).default;t.exports.__inject__=function(t){n("93fac67e",content,!0,t)}},155:function(t,e,d){var content=d(177);"string"==typeof content&&(content=[[t.id,content,""]]),content.locals&&(t.exports=content.locals);var n=d(7).default;t.exports.__inject__=function(t){n("21b6b37b",content,!0,t)}},174:function(t,e,d){"use strict";d.r(e);var n=d(154),o=d.n(n);for(var l in n)"default"!==l&&function(t){d.d(e,t,function(){return n[t]})}(l);e.default=o.a},175:function(t,e,d){(t.exports=d(6)(!1)).push([t.id,"[data-v-44b2bc19]:root{--text-color:red}.field-layout[data-v-44b2bc19]{padding:0 7px}.field-title[data-v-44b2bc19]{border-bottom:1px solid #e1e4e8;padding:15px;font-size:18px}.field-content[data-v-44b2bc19]{padding:15px}.add-options-item[data-v-44b2bc19]{padding:4px 12px;display:inline-block;color:#fff;background:#24292e;border-radius:2px;margin-right:7px;margin-bottom:7px;position:relative}.add-options-item.act[data-v-44b2bc19]{background:#398dee}.add-options-btn[data-v-44b2bc19]{margin:0;transition:.4s;cursor:pointer}.add-options-input[data-v-44b2bc19]{width:140px;margin-right:10px}.form-content[data-v-44b2bc19]{max-width:500px}.form-bg[data-v-44b2bc19]{padding:10px}.submit-layout[data-v-44b2bc19]{text-align:right;width:350px}",""])},176:function(t,e,d){"use strict";d.r(e);var n=d(155),o=d.n(n);for(var l in n)"default"!==l&&function(t){d.d(e,t,function(){return n[t]})}(l);e.default=o.a},177:function(t,e,d){(t.exports=d(6)(!1)).push([t.id,'[data-v-2e1433d9]:root{--text-color:red}.schema-title[data-v-2e1433d9]{border-bottom:1px solid #e1e4e8;padding:15px;font-size:18px}.schema-content[data-v-2e1433d9]{padding:15px;background:#f2f2f2}.catalogs-layout[data-v-2e1433d9]{width:200px;border-right:1px solid #e1e4e8}.catalogs-item-layout[data-v-2e1433d9]{padding:10px 20px;cursor:pointer;font-size:14px;position:relative}.catalogs-item-layout .iconfont[data-v-2e1433d9]{margin-right:2px;font-size:22px}.catalogs-item-layout.act[data-v-2e1433d9]{background:#f2f2f2}.catalogs-item-layout.act .iconfont[data-v-2e1433d9]{color:#398dee}.catalogs-item-layout.act[data-v-2e1433d9]:after{content:"";background:#398dee;position:absolute;height:100%;width:4px;right:0;top:0}.schema-operate[data-v-2e1433d9]{font-size:15px}.schema-title-layout[data-v-2e1433d9]{padding:0 10px}.add-catalogs-layout[data-v-2e1433d9]{border-bottom:5px solid #f2f2f2;padding:16px 20px}.add-catalogs-layout .iconfont[data-v-2e1433d9]{margin-right:2px;font-size:25px;color:#398dee}',""])},181:function(t,e,d){"use strict";d.r(e);var n=d(5),o=(d(0),d(1));const l={type:"input",name:"",options:[],default:"",arrDefault:[],isDone:""};var c={props:{curField:{type:Object,default:function(){return{}}},curSchemataInfo:{type:Object,default:function(){return{}}},hasDone:{default:function(){return null}}},data:()=>({field:{...l},optionsIdAsc:0,typeList:[{alias:"单行文本",name:"input",type:"String"},{alias:"多行文本",name:"textarea",type:"String"},{alias:"markdown",name:"markdown",type:"markdown"},{alias:"单选",name:"radio",type:"String"},{alias:"多选",name:"select",type:"Array"}],newOptionValue:"",originData:JSON.stringify(l)}),computed:{disableBtn:function(){return!this.field.name||JSON.stringify(this.field)===this.originData}},methods:{...Object(n.mapActions)("schema",[o.SCHEMA_FIELD_POST,o.SCHEMA_FIELD_PUT]),doClearSchemaDefault(t){this.field.default="",this.field.arrDefault=[]},doAddSchemaOption(){if(!this.newOptionValue)return;if(this.field.options.findIndex(t=>t.name===this.newOptionValue)>-1)return void window.alert(`${this.newOptionValue}已存在`);let t=this.optionsIdAsc+1,e=`option_${t}`;for(;this.field.options.findIndex(t=>t.id===e)>-1;)e=`option_${t+=1}`;this.field.options.push({name:this.newOptionValue,id:e}),this.newOptionValue=""},todoSaveSchema(){if(this.disableBtn)return;if(!this.field.name)return void window.alert("请输入别名");"select"===this.field.type&&(this.field.default=this.field.arrDefault);let t=null;const e=Object.prototype.toString.call(this.field.default);switch(this.field.type){case"input":case"textarea":case"markdown":case"time":case"radio":this.field.default&&"[object String]"!==e&&(t=new TypeError("类型值不是String类型")),this.field.isDone&&"[object String]"!==e&&(t=new TypeError("类型值不是String类型"));break;case"select":this.field.default&&"[object Array]"!==e&&(t=new TypeError("类型值不是Array类型"))}t?this.$alert({title:t.message}):JSON.stringify(this.field)!==this.originData?this.doSaveSchema():this.todoCloseEdit()},async doSaveSchema(){let t=null;if(this.$showLoading(),t=this.field._id?await this[o.SCHEMA_FIELD_PUT]({schemataId:this.curSchemataInfo._id,_id:this.field._id,field:this.field}):await this[o.SCHEMA_FIELD_POST]({schemataId:this.curSchemataInfo._id,field:this.field}),this.$hideLoading(),t.err)return void this.$alert({title:t.err.message});const e=this.field._id?"修改成功":"添加成功";this.$toast({title:e}),this.todoCloseEdit(!0)},todoCloseEdit(t=!1){this.$emit("emitCloseEdit",t),this.options=[]},todoOptionRename(t,e){this.field.options[e].name=t.target.innerText}},mounted(){this.curField._id?(this.field={...this.field,...this.curField},this.originData=JSON.stringify(this.field)):(this.field={...l},this.field.options=[],this.field.arrDefault=[])}},r=d(4);var v={components:{EditField:Object(r.a)(c,function(){var t=this,e=t.$createElement,d=t._self._c||e;return d("div",{staticClass:"flex"},[t._ssrNode('<div class="flex flex-1 direction-column" data-v-44b2bc19>',"</div>",[t._ssrNode('<div class="flex-1 form-bg bg-fff" data-v-44b2bc19>',"</div>",[t._ssrNode('<div class="form-layout" data-v-44b2bc19>',"</div>",[t._ssrNode('<div class="form-group flex" data-v-44b2bc19><div class="form-label-layout" data-v-44b2bc19>\n            别名：\n          </div> <div class="flex flex-1 align-items-center" data-v-44b2bc19><input'+t._ssrAttr("value",t.field.name)+' class="form-input" data-v-44b2bc19></div></div> '),t._ssrNode('<div class="form-group flex" data-v-44b2bc19>',"</div>",[t._ssrNode('<div class="form-label-layout" data-v-44b2bc19>\n            类型：\n          </div> '),t._ssrNode('<div class="flex flex-1 align-items-center" data-v-44b2bc19>',"</div>",[d("select",{directives:[{name:"model",rawName:"v-model",value:t.field.type,expression:"field.type"}],staticClass:"from-select",on:{change:[function(e){var d=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.field,"type",e.target.multiple?d:d[0])},t.doClearSchemaDefault]}},t._l(t.typeList,function(e,n){return d("option",{domProps:{value:e.name}},[t._v(t._s(e.alias)+"\n              ")])}),0)])],2),t._ssrNode(" "),"radio"===t.field.type||"select"===t.field.type?t._ssrNode('<div class="form-group flex" data-v-44b2bc19>',"</div>",[t._ssrNode('<div class="form-label-layout" data-v-44b2bc19>\n            选项：\n          </div> '),t._ssrNode('<div class="flex flex-1 form-content wrap direction-column" data-v-44b2bc19>',"</div>",[t._ssrNode('<div class="flex align-items-center wrap" data-v-44b2bc19>'+t._ssrList(t.field.options,function(e,d){return'<div contenteditable="true" class="add-options-item" data-v-44b2bc19>'+t._ssrEscape("\n                "+t._s(e.name)+"\n              ")+"</div>"})+"</div> "),t._ssrNode('<div class="flex align-items-center wrap" data-v-44b2bc19>',"</div>",[d("input",{directives:[{name:"focus",rawName:"v-focus:select",arg:"select"},{name:"model",rawName:"v-model",value:t.newOptionValue,expression:"newOptionValue"}],staticClass:"form-input add-options-input",attrs:{type:"text"},domProps:{value:t.newOptionValue},on:{input:function(e){e.target.composing||(t.newOptionValue=e.target.value)}}},[]),t._ssrNode(" <div"+t._ssrClass("add-options-item add-options-btn",{"disable-btn":!t.newOptionValue})+" data-v-44b2bc19>\n                add\n              </div>")],2)],2)],2):t._e(),t._ssrNode(" "+("input"===t.field.type?'<div class="form-group flex" data-v-44b2bc19><div class="form-label-layout" data-v-44b2bc19>\n            默认值：\n          </div> <div class="flex flex-1 align-items-center" data-v-44b2bc19><input type="text"'+t._ssrAttr("value",t.field.default)+' class="form-input" data-v-44b2bc19></div></div>':"\x3c!----\x3e")+" "+("textarea"===t.field.type||"markdown"===t.field.type?'<div class="form-group flex" data-v-44b2bc19><div class="form-label-layout" data-v-44b2bc19>\n            默认值：\n          </div> <div class="flex flex-1 align-items-center" data-v-44b2bc19><textarea type="text" class="form-input" data-v-44b2bc19>'+t._ssrEscape(t._s(t.field.default))+"</textarea></div></div>":"\x3c!----\x3e")+" "+("radio"===t.field.type&&t.field.options.length?'<div class="form-group flex" data-v-44b2bc19><div class="form-label-layout" data-v-44b2bc19>\n            默认值：\n          </div> <div class="flex flex-1 align-items-center" data-v-44b2bc19><div'+t._ssrClass("radio-style",{act:!t.field.default})+" data-v-44b2bc19>\n              无\n            </div> "+t._ssrList(t.field.options,function(e,d){return"<div"+t._ssrClass("radio-style",{act:e.id===t.field.default})+' data-v-44b2bc19><input type="radio"'+t._ssrAttr("value",e.id)+t._ssrAttr("checked",t._q(t.field.default,e.id))+' class="form-radio" data-v-44b2bc19>'+t._ssrEscape(t._s(e.name)+"\n            ")+"</div>"})+"</div></div>":"\x3c!----\x3e")+" "+(!t.hasDone&&"radio"===t.field.type&&t.field.options.length||t.hasDone&&t.hasDone._id===t.field._id?'<div class="form-group flex" data-v-44b2bc19><div class="form-label-layout" data-v-44b2bc19>\n            完成标识：\n          </div> <div class="flex flex-1 align-items-center" data-v-44b2bc19><div'+t._ssrClass("radio-style",{act:!t.field.isDone})+" data-v-44b2bc19>\n              无\n            </div> "+t._ssrList(t.field.options,function(e,d){return"<div"+t._ssrClass("radio-style",{act:e.id===t.field.isDone})+' data-v-44b2bc19><input type="radio"'+t._ssrAttr("value",e.id)+t._ssrAttr("checked",t._q(t.field.isDone,e.id))+' class="form-radio" data-v-44b2bc19>'+t._ssrEscape(t._s(e.name)+"\n            ")+"</div>"})+"</div></div>":"\x3c!----\x3e")+" "+("select"===t.field.type&&t.field.options.length?'<div class="form-group flex" data-v-44b2bc19><div class="form-label-layout" data-v-44b2bc19>\n            默认值：\n          </div> <div class="flex flex-1 align-items-center" data-v-44b2bc19>'+t._ssrList(t.field.options,function(e,d){return"<div"+t._ssrClass("add-options-item cursor",{act:t.field.arrDefault.indexOf(e.id)>-1})+' data-v-44b2bc19><input type="checkbox"'+t._ssrAttr("value",e.id)+t._ssrAttr("checked",Array.isArray(t.field.arrDefault)?t._i(t.field.arrDefault,e.id)>-1:t.field.arrDefault)+' class="form-radio" data-v-44b2bc19>'+t._ssrEscape(t._s(e.name)+"\n            ")+"</div>"})+"</div></div>":"\x3c!----\x3e")+' <div class="form-group submit-layout" data-v-44b2bc19><div'+t._ssrClass("btn",{"disable-btn":t.disableBtn})+' data-v-44b2bc19>提交</div> <div class="btn second-btn" data-v-44b2bc19>返回</div></div>')],2)])])])},[],!1,function(t){var e=d(174);e.__inject__&&e.__inject__(t)},"44b2bc19","ed783128").exports},data:()=>({actSchema:"",curField:null,cacheName:"",showAddInput:!1,newSchemaName:""}),computed:{...Object(n.mapState)({schemaList:t=>t.schema.list}),schemaListArr:function(){return Object.values(this.schemaList).filter(t=>"markdown"!==t._id)},actSchemaObj:function(){return this.schemaList[this.actSchema]||{}},hasDone:function(){return this.actSchemaObj.fields.find(t=>"radio"===t.type&&t.isDone)}},methods:{...Object(n.mapActions)("schema",[o.SCHEMA_LIST_GET,o.SCHEMA_PUT,o.SCHEMA_POST,o.SCHEMA_DELETE,o.SCHEMA_FIELD_DELETE]),todoAddSchema(){let t="",i=0;do{t="未命名"+ ++i}while(this.schemaListArr.find(e=>e.name===t));this.newSchemaName=t,this.showAddInput=!0},async toAddSchema(){if(this.schemaListArr.find(t=>t.name===this.newSchemaName))return void this.$alert({title:`${this.newSchemaName}不存在`});this.$showLoading();const t=await this[o.SCHEMA_POST]({name:this.newSchemaName});this.$hideLoading(),t.err||(this.$toast({title:"添加成功"}),await this.getData(),this.initCurSchema()),this.showAddInput=!1,this.newSchemaName=""},initCurSchema(){this.schemaListArr.length?(this.actSchema=this.schemaListArr[0]._id,this.cacheName=this.schemaListArr[0].name):this.actSchema=""},async getData(t=!0){await this[o.SCHEMA_LIST_GET]({force:t})},doShowEdit(t){this.curField=JSON.parse(JSON.stringify(t))||{}},doHideEdit(t){this.curField=null,this.getData(t)},chooseSchema(t){this.actSchema=t._id,this.cacheName=t.name},async todoSchemaRename(){if(!this.cacheName)return void(this.cacheName=this.actSchemaObj.name);if(this.actSchemaObj.name===this.cacheName)return;let t=!1;if(this.schemaListArr.some((e,d)=>e._id!==this.actSchemaObj._id&&e.name===this.cacheName&&(alert(`${this.cacheName}已存在`),t=!0,!0)),t)return void(this.cacheName=this.actSchemaObj.name);this.$showLoading();const e=await this[o.SCHEMA_PUT]({_id:this.actSchemaObj._id,name:this.cacheName});await this.getData(),e.err||(this.$toast({title:"修改成功"}),this.$hideLoading())},async init(){this.$showLoading(),await this.getData(!1),this.initCurSchema(),this.$hideLoading()},todoDelete(){this.$alert({title:`你确认要删除"${this.cacheName}"`}).then(async t=>{t&&this.doDeleteSchema()})},async doDeleteSchema(){this.$showLoading();const t=await this[o.SCHEMA_DELETE]({_id:this.actSchemaObj._id});this.initCurSchema(),t.err||(this.$toast({title:"删除成功"}),await this.getData(!0)),this.$hideLoading()},todoDeleteField(t){this.$alert({title:"你确认要删除此字段",showCancel:!1}).then(e=>{e&&this.doDeleteField(t)})},async doDeleteField(t){this.$showLoading();const e=this[o.SCHEMA_FIELD_DELETE]({schemataId:this.actSchemaObj._id,fieldId:t._id});this.$hideLoading(),e.err||(this.$toast({title:"删除成功"}),await this.getData(!0))}},mounted(){this.init()}};var h=Object(r.a)(v,function(){var t=this,e=t.$createElement,d=t._self._c||e;return d("div",{staticClass:"flex flex-1"},[t._ssrNode('<div class="catalogs-layout" data-v-2e1433d9>',"</div>",[t._ssrNode('<div class="flex align-items-center catalogs-item-layout add-catalogs-layout" data-v-2e1433d9><i class="iconfont icon-tianjiajiahaowubiankuang" data-v-2e1433d9></i> <div class="catalogs-name line-ellipsis" data-v-2e1433d9>新建字段组</div></div> '),t.showAddInput?t._ssrNode('<div class="flex align-items-center catalogs-item-layout" data-v-2e1433d9>',"</div>",[d("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.newSchemaName,expression:"newSchemaName",modifiers:{trim:!0}},{name:"focus",rawName:"v-focus:select",arg:"select"}],staticClass:"edit-catalogs-input line-ellipsis",domProps:{value:t.newSchemaName},on:{blur:[t.toAddSchema,function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||(t.newSchemaName=e.target.value.trim())}}},[])]):t._e(),t._ssrNode(" "+t._ssrList(t.schemaListArr,function(e,d){return"<div"+t._ssrClass("flex align-items-center catalogs-item-layout",{act:t.actSchema===e._id})+' data-v-2e1433d9><div class="iconfont" data-v-2e1433d9><i class="iconfont icon-ziduan" data-v-2e1433d9></i></div> <div class="catalogs-name line-ellipsis" data-v-2e1433d9>'+t._ssrEscape(t._s(e.name))+"</div></div>"}))],2),t._ssrNode(" "),t.actSchema?t._ssrNode('<div class="flex flex-1 direction-column" data-v-2e1433d9>',"</div>",[t._ssrNode('<div class="schema-title flex justify-content-space-between" data-v-2e1433d9><div class="flex-1 schema-title-layout relative" data-v-2e1433d9><input'+t._ssrAttr("value",t.cacheName)+' class="full-input" data-v-2e1433d9></div> '+(t.actSchema?'<div class="schema-operate" data-v-2e1433d9>'+(t.curField?"\x3c!----\x3e":'<span class="btn" data-v-2e1433d9>添加</span>')+' <span class="btn warn" data-v-2e1433d9>删除</span></div>':"\x3c!----\x3e")+"</div> "),t.actSchemaObj?t._ssrNode('<div class="schema-content flex-1 flex" data-v-2e1433d9>',"</div>",[t._ssrNode((t.curField?"\x3c!----\x3e":'<div class="panel-bg flex-1 flex" data-v-2e1433d9>'+(t.actSchemaObj.fields?'<table class="table-layout" data-v-2e1433d9><thead data-v-2e1433d9><tr data-v-2e1433d9><th data-v-2e1433d9><div class="th-p" data-v-2e1433d9>别名</div></th> <th data-v-2e1433d9><div class="th-p" data-v-2e1433d9>类型</div></th> <th data-v-2e1433d9><div class="th-p" data-v-2e1433d9>默认值</div></th> <th data-v-2e1433d9><div class="th-p" data-v-2e1433d9>选项</div></th> <th data-v-2e1433d9><div class="th-p" data-v-2e1433d9>完成标识</div></th> <th style="width: 150px" data-v-2e1433d9><div class="th-p" data-v-2e1433d9></div></th></tr></thead> <tbody data-v-2e1433d9>'+t._ssrList(t.actSchemaObj.fields,function(e,d){return'<tr data-v-2e1433d9><td data-v-2e1433d9><div class="td-p" data-v-2e1433d9>'+t._ssrEscape(t._s(e.name))+'</div></td> <td data-v-2e1433d9><div class="td-p" data-v-2e1433d9>'+t._ssrEscape(t._s(e.type))+'</div></td> <td data-v-2e1433d9><div class="td-p" data-v-2e1433d9>'+t._ssrEscape(t._s(e.default||"-"))+"</div></td> <td data-v-2e1433d9>"+(e.options&&e.options.length?'<div class="td-p" data-v-2e1433d9>'+t._ssrList(e.options,function(e,d){return'<span class="option-label" data-v-2e1433d9>'+t._ssrEscape("\n                  "+t._s(e.name)+"\n                ")+"</span>"})+"</div>":'<div class="td-p" data-v-2e1433d9>-</div>')+'</td> <td data-v-2e1433d9><div class="td-p" data-v-2e1433d9>'+t._ssrEscape(t._s(e.isDone||"-"))+'</div></td> <td data-v-2e1433d9><div class="td-p" data-v-2e1433d9><span class="table-btn" data-v-2e1433d9>编辑</span> <span class="table-btn warn" data-v-2e1433d9>删除</span></div></td></tr>'})+"</tbody></table>":"\x3c!----\x3e")+"</div>")+" "),t.curField?t._ssrNode('<div class="panel-bg flex flex-1" data-v-2e1433d9>',"</div>",[d("EditField",{attrs:{curField:t.curField,curSchemataInfo:t.actSchemaObj,hasDone:t.hasDone},on:{emitCloseEdit:t.doHideEdit}})],1):t._e()],2):t._e()],2):t._ssrNode('<div class="flex flex-1 direction-column align-items-center justify-content-center no-data-cue-bg" data-v-2e1433d9><div class="no-data-cue" data-v-2e1433d9>暂无数据</div></div>')],2)},[],!1,function(t){var e=d(176);e.__inject__&&e.__inject__(t)},"2e1433d9","27c93185");e.default=h.exports}};
//# sourceMappingURL=27f66611a41ba6695ccd.js.map