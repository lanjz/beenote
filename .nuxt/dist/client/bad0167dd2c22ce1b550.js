(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{214:function(t,e,r){var content=r(237);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(17).default)("6e43c4d6",content,!0,{sourceMap:!1})},236:function(t,e,r){"use strict";var o=r(214);r.n(o).a},237:function(t,e,r){(t.exports=r(16)(!1)).push([t.i,"[data-v-791e5450]:root{--text-color:red}.login-title[data-v-791e5450]{text-align:center;padding:0 0 10px;font-size:18px}.login-layout[data-v-791e5450]{background:#fff;padding:40px;display:inline-block;text-align:left;border:1px solid #e1e4e8;margin:60px auto 0}.login-bg[data-v-791e5450]{text-align:center}.login-bg .submit-layout[data-v-791e5450]{text-align:right}.register-layout[data-v-791e5450]{padding-top:20px}.login-btn[data-v-791e5450]{width:200px;line-height:40px;color:#fff;background:#398dee;text-align:center;font-size:18px;margin:20px auto;cursor:pointer;border-radius:4px}.show-err[data-v-791e5450]{color:#f4606c;text-align:right}.other-label[data-v-791e5450]{margin-top:20px;color:#398dee;cursor:pointer}",""])},453:function(t,e,r){"use strict";r.r(e);r(23),r(12),r(32),r(18);var o=r(2),n=r(6),l=r(24),c=(r(4),r(3)),d={nickname:"",email:"",username:"",password:"",rePassword:"",sex:1,avatar:"",isLogin:!0},m={data:function(){return Object(n.a)({},d,{errMsg:""})},methods:Object(n.a)({},Object(l.b)("user",[c.LOGIN_POST,c.USER_POST]),{todoRegister:function(){this.username?this.nickname?this.password?this.password===this.rePassword?this.doRegister():this.errMsg="再次密码输入不一致":this.errMsg="密码不能为空":this.errMsg="昵称不能为空":this.errMsg="用户名不能为空"},doRegister:function(){var t=Object(o.a)(regeneratorRuntime.mark(function t(){var data,e,r=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return data={},Object.keys(d).forEach(function(t){data[t]=r[t]}),this.$showLoading(),t.next=5,this[c.USER_POST](data);case 5:e=t.sent,this.$hideLoading(),e.err||this.$router.push("/");case 8:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),todoLogin:function(){var t=Object(o.a)(regeneratorRuntime.mark(function t(data){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.username){t.next=3;break}return this.errMsg="用户名不能为空",t.abrupt("return");case 3:if(this.password){t.next=6;break}return this.errMsg="密码不能为空",t.abrupt("return");case 6:return this.$showLoading(),t.next=9,this[c.LOGIN_POST]({username:this.username,password:this.password});case 9:e=t.sent,this.$hideLoading(),e.err||this.$router.push("/");case 12:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),doReset:function(){var t=this;Object.keys(d).forEach(function(e){t[e]=""})},toggleTag:function(t){this.isLogin=t}})},v=(r(236),r(9)),component=Object(v.a)(m,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"login-bg"},[r("div",{staticClass:"flex flex-1 form-bg bg-fff login-layout"},[r("div",{staticClass:"form-layout"},[r("div",{staticClass:"login-title"},[t._v(t._s(t.isLogin?"登录":"注册"))]),t._v(" "),r("div",{staticClass:"form-group flex"},[r("div",{staticClass:"form-label-layout"},[t._v("\r\n          用户名：\r\n        ")]),t._v(" "),r("div",{staticClass:"flex flex-1 align-items-center"},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.username,expression:"username",modifiers:{trim:!0}}],staticClass:"form-input",domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),r("div",{staticClass:"form-group flex"},[r("div",{staticClass:"form-label-layout"},[t._v("\r\n          密码：\r\n        ")]),t._v(" "),r("div",{staticClass:"flex flex-1 align-items-center"},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.password,expression:"password",modifiers:{trim:!0}}],staticClass:"form-input",attrs:{type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),t.isLogin?r("div",[r("div",{staticClass:"form-group flex"},[r("div",{staticClass:"form-label-layout"}),t._v(" "),r("div",{staticClass:"flex flex-1 align-items-center other-label",on:{click:function(e){return t.toggleTag(!1)}}},[t._v("注册")])]),t._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"login-btn",on:{click:t.todoLogin}},[t._v("登录")])])]):r("div",{staticClass:"register-layout"},[r("div",{staticClass:"form-group flex"},[r("div",{staticClass:"form-label-layout"},[t._v("\r\n            确认密码：\r\n          ")]),t._v(" "),r("div",{staticClass:"flex flex-1 align-items-center"},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.rePassword,expression:"rePassword",modifiers:{trim:!0}}],staticClass:"form-input",attrs:{type:"password"},domProps:{value:t.rePassword},on:{input:function(e){e.target.composing||(t.rePassword=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),r("div",{staticClass:"form-group flex"},[r("div",{staticClass:"form-label-layout"},[t._v("\r\n            昵称：\r\n          ")]),t._v(" "),r("div",{staticClass:"flex flex-1 align-items-center"},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.nickname,expression:"nickname",modifiers:{trim:!0}}],staticClass:"form-input",domProps:{value:t.nickname},on:{input:function(e){e.target.composing||(t.nickname=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),r("div",{staticClass:"form-group flex"},[r("div",{staticClass:"form-label-layout"},[t._v("\r\n            邮箱：\r\n          ")]),t._v(" "),r("div",{staticClass:"flex flex-1 align-items-center"},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.email,expression:"email",modifiers:{trim:!0}}],staticClass:"form-input",domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),r("div",{staticClass:"form-group flex"},[r("div",{staticClass:"form-label-layout"},[t._v("\r\n            性别：\r\n          ")]),t._v(" "),r("div",{staticClass:"flex flex-1 align-items-center"},[r("div",{staticClass:"add-options-item radio-style",class:{act:1===t.sex}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.sex,expression:"sex"}],staticClass:"form-radio",attrs:{type:"radio"},domProps:{value:1,checked:t._q(t.sex,1)},on:{change:function(e){t.sex=1}}}),t._v("男\r\n            ")]),t._v(" "),r("div",{staticClass:"add-options-item radio-style",class:{act:2===t.sex}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.sex,expression:"sex"}],staticClass:"form-radio",attrs:{type:"radio"},domProps:{value:2,checked:t._q(t.sex,2)},on:{change:function(e){t.sex=2}}}),t._v("女\r\n            ")])])]),t._v(" "),r("div",{staticClass:"form-group flex"},[r("div",{staticClass:"form-label-layout"}),t._v(" "),r("div",{staticClass:"flex flex-1 align-items-center other-label",on:{click:function(e){return t.toggleTag(!0)}}},[t._v("前往登录")])]),t._v(" "),r("div",{staticClass:"form-group submit-layout"},[r("div",{staticClass:"btn",on:{click:t.todoRegister}},[t._v("保存")]),t._v(" "),r("div",{staticClass:"btn second-btn",on:{click:t.doReset}},[t._v("重置")])])]),t._v(" "),t.errMsg?r("div",{staticClass:"show-err"},[t._v(t._s(t.errMsg))]):t._e()])])])},[],!1,null,"791e5450",null);e.default=component.exports}}]);