(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0cc2":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(e("e07d"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t){return f(t)||u(t)||c(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,n){if(t){if("string"===typeof t)return d(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?d(t,n):void 0}}function u(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function f(t){if(Array.isArray(t))return d(t)}function d(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,o=new Array(n);e<n;e++)o[e]=t[e];return o}var l=function(){e.e("components/index/IndexSwiper").then(function(){return resolve(e("9ca6"))}.bind(null,e)).catch(e.oe)},s=function(){e.e("components/index/Recommend").then(function(){return resolve(e("48de"))}.bind(null,e)).catch(e.oe)},h=function(){e.e("components/common/Card").then(function(){return resolve(e("59d5"))}.bind(null,e)).catch(e.oe)},p=function(){e.e("components/common/CommodityList").then(function(){return resolve(e("4a1e"))}.bind(null,e)).catch(e.oe)},m=function(){e.e("components/index/Banner").then(function(){return resolve(e("8922"))}.bind(null,e)).catch(e.oe)},v=function(){e.e("components/index/Icons").then(function(){return resolve(e("0b4f"))}.bind(null,e)).catch(e.oe)},b=function(){e.e("components/index/Hot").then(function(){return resolve(e("2b6f"))}.bind(null,e)).catch(e.oe)},g=function(){e.e("components/index/Shop").then(function(){return resolve(e("443f"))}.bind(null,e)).catch(e.oe)},x={data:function(){return{topBarIndex:0,scrollIntoindex:"top0",clentheight:0,topBar:[],newtopBar:[]}},components:{IndexSwiper:l,Recommend:s,Card:h,CommodityList:p,Banner:m,Icons:v,Hot:b,Shop:g},onLoad:function(){this.__init()},onReady:function(){var n=this;this.getClentheight(),t.getSystemInfo({success:function(e){n.clentheight=e.windowHeight-t.upx2px(80)}})},onNavigationBarButtonTap:function(n){console.log(n),"left"==n.float&&t.switchTab({url:"/pages/search/search"}),n.float},methods:{__init:function(){var n=this;o.default.request({url:"/index_list/data"}).then((function(t){n.topBar=t.topBar,n.newtopBar=n.initData(t)})).catch((function(){t.showToast({title:"请求失败",icon:"none"})}))},initData:function(t){for(var n=[],e=0;e<this.topBar.length;e++){var o={data:[],load:"first",loadText:"上拉加载更多..."};0==e&&(o.data=t.data),n.push(o)}return n},changeTab:function(t){this.topBarIndex!==t&&(this.topBarIndex=t,this.scrollIntoindex="top"+t,"first"===this.newtopBar[this.topBarIndex].load&&this.addData())},onChangeTab:function(t){this.changeTab(t.detail.current)},getClentheight:function(){var n=t.getDeviceInfo(),e=t.getWindowInfo();console.log(n.platform,e.statusBarHeight)},addData:function(n){var e=this,a=this.topBarIndex,i=this.topBar[a].id,c=Math.ceil(this.newtopBar[a].data.length/5)+1;o.default.request({url:"/index_list/".concat(i,"/data/").concat(c)}).then((function(t){e.newtopBar[a].data=[].concat(r(e.newtopBar[a].data),r(t))})).catch((function(){t.hideLoading({title:"请求失败"})})),this.newtopBar[a].load="last","function"===typeof n&&n()},loadMore:function(t){var n=this;this.newtopBar[t].loadText="加载中...",this.addData((function(){n.newtopBar[t].loadText="上拉加载更多..."}))}}};n.default=x}).call(this,e("543d")["default"])},"104a":function(t,n,e){"use strict";e.r(n);var o=e("0cc2"),a=e.n(o);for(var r in o)"default"!==r&&function(t){e.d(n,t,(function(){return o[t]}))}(r);n["default"]=a.a},"44fc":function(t,n,e){"use strict";(function(t){e("f24e");o(e("66fd"));var n=o(e("d2ec"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},"4fec":function(t,n,e){"use strict";var o=e("8f9e"),a=e.n(o);a.a},7969:function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return o}));var a=function(){var t=this,n=t.$createElement;t._self._c},r=[]},"8f9e":function(t,n,e){},d2ec:function(t,n,e){"use strict";e.r(n);var o=e("7969"),a=e("104a");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("4fec");var i,c=e("f0c5"),u=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"37cd4e70",null,!1,o["a"],i);n["default"]=u.exports}},[["44fc","common/runtime","common/vendor"]]]);