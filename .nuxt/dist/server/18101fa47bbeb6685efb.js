exports.ids=[7],exports.modules={115:function(e,t,c){var content=c(135);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);var r=c(6).default;e.exports.__inject__=function(e){r("d1352a14",content,!0,e)}},134:function(e,t,c){"use strict";c.r(t);var r=c(115),d=c.n(r);for(var o in r)"default"!==o&&function(e){c.d(t,e,function(){return r[e]})}(o);t.default=d.a},135:function(e,t,c){(e.exports=c(5)(!1)).push([e.i,"[data-v-2ce6c166]:root{--text-color:red}.login-title[data-v-2ce6c166]{text-align:center;padding:0 0 10px;font-size:18px}.login-layout[data-v-2ce6c166]{background:#fff;padding:40px;display:inline-block;text-align:left;border:1px solid #e1e4e8;margin:60px auto 0}.login-bg[data-v-2ce6c166]{text-align:center;margin:0 auto}.login-bg .submit-layout[data-v-2ce6c166]{text-align:right}.register-layout[data-v-2ce6c166]{padding-top:20px}.login-btn[data-v-2ce6c166]{width:200px;line-height:40px;color:#fff;background:#398dee;text-align:center;font-size:18px;margin:20px auto;cursor:pointer;border-radius:4px}.show-err[data-v-2ce6c166]{color:#f4606c;text-align:right}.other-label[data-v-2ce6c166]{margin-top:20px;color:#398dee;cursor:pointer}",""])},145:function(e,t,c){"use strict";c.r(t);var r=c(7),d=(c(2),c(1));const o={nickname:"",email:"",username:"",password:"",rePassword:"",sex:1,avatar:"",isLogin:!0};var l={data:()=>({...o,errMsg:""}),methods:{...Object(r.mapActions)("user",[d.LOGIN_POST,d.USER_POST]),todoRegister(){this.username?this.nickname?this.password?this.password===this.rePassword?this.doRegister():this.errMsg="再次密码输入不一致":this.errMsg="密码不能为空":this.errMsg="昵称不能为空":this.errMsg="用户名不能为空"},async doRegister(){const data={};Object.keys(o).forEach(e=>{data[e]=this[e]}),this.$showLoading();const e=await this[d.USER_POST](data);this.$hideLoading(),e.err||this.$router.push("/")},async todoLogin(data){if(!this.username)return void(this.errMsg="用户名不能为空");if(!this.password)return void(this.errMsg="密码不能为空");this.$showLoading();const e=await this[d.LOGIN_POST]({username:this.username,password:this.password});this.$hideLoading(),e.err||this.$router.push("/")},doReset(){Object.keys(o).forEach(e=>{this[e]=""})},toggleTag(e){this.isLogin=e}}},v=c(4);var component=Object(v.a)(l,function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"login-bg"},[e._ssrNode('<div class="flex flex-1 form-bg bg-fff login-layout" data-v-2ce6c166><div class="form-layout" data-v-2ce6c166><div class="login-title" data-v-2ce6c166>'+e._ssrEscape(e._s(e.isLogin?"登录":"注册"))+'</div> <div class="form-group flex" data-v-2ce6c166><div class="form-label-layout" data-v-2ce6c166>\n          用户名：\n        </div> <div class="flex flex-1 align-items-center" data-v-2ce6c166><input'+e._ssrAttr("value",e.username)+' class="form-input" data-v-2ce6c166></div></div> <div class="form-group flex" data-v-2ce6c166><div class="form-label-layout" data-v-2ce6c166>\n          密码：\n        </div> <div class="flex flex-1 align-items-center" data-v-2ce6c166><input type="password"'+e._ssrAttr("value",e.password)+' class="form-input" data-v-2ce6c166></div></div> '+(e.isLogin?'<div data-v-2ce6c166><div class="form-group flex" data-v-2ce6c166><div class="form-label-layout" data-v-2ce6c166></div> <div class="flex flex-1 align-items-center other-label" data-v-2ce6c166>注册</div></div> <div class="form-group" data-v-2ce6c166><div class="login-btn" data-v-2ce6c166>登录</div></div></div>':'<div class="register-layout" data-v-2ce6c166><div class="form-group flex" data-v-2ce6c166><div class="form-label-layout" data-v-2ce6c166>\n            确认密码：\n          </div> <div class="flex flex-1 align-items-center" data-v-2ce6c166><input type="password"'+e._ssrAttr("value",e.rePassword)+' class="form-input" data-v-2ce6c166></div></div> <div class="form-group flex" data-v-2ce6c166><div class="form-label-layout" data-v-2ce6c166>\n            昵称：\n          </div> <div class="flex flex-1 align-items-center" data-v-2ce6c166><input'+e._ssrAttr("value",e.nickname)+' class="form-input" data-v-2ce6c166></div></div> <div class="form-group flex" data-v-2ce6c166><div class="form-label-layout" data-v-2ce6c166>\n            邮箱：\n          </div> <div class="flex flex-1 align-items-center" data-v-2ce6c166><input'+e._ssrAttr("value",e.email)+' class="form-input" data-v-2ce6c166></div></div> <div class="form-group flex" data-v-2ce6c166><div class="form-label-layout" data-v-2ce6c166>\n            性别：\n          </div> <div class="flex flex-1 align-items-center" data-v-2ce6c166><div'+e._ssrClass("add-options-item radio-style",{act:1===e.sex})+' data-v-2ce6c166><input type="radio"'+e._ssrAttr("value",1)+e._ssrAttr("checked",e._q(e.sex,1))+' class="form-radio" data-v-2ce6c166>男\n            </div> <div'+e._ssrClass("add-options-item radio-style",{act:2===e.sex})+' data-v-2ce6c166><input type="radio"'+e._ssrAttr("value",2)+e._ssrAttr("checked",e._q(e.sex,2))+' class="form-radio" data-v-2ce6c166>女\n            </div></div></div> <div class="form-group flex" data-v-2ce6c166><div class="form-label-layout" data-v-2ce6c166></div> <div class="flex flex-1 align-items-center other-label" data-v-2ce6c166>前往登录</div></div> <div class="form-group submit-layout" data-v-2ce6c166><div class="btn" data-v-2ce6c166>保存</div> <div class="btn second-btn" data-v-2ce6c166>重置</div></div></div>')+" "+(e.errMsg?'<div class="show-err" data-v-2ce6c166>'+e._ssrEscape(e._s(e.errMsg))+"</div>":"\x3c!----\x3e")+"</div></div>")])},[],!1,function(e){var t=c(134);t.__inject__&&t.__inject__(e)},"2ce6c166","72505a35");t.default=component.exports}};
//# sourceMappingURL=18101fa47bbeb6685efb.js.map