(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{512:function(t,e,n){"use strict";var r=n(2),o=n(1),i=n(4),u=n(48),a=n(275),c=n(276),f=n(3),l=o.RangeError,s=o.String,d=Math.floor,v=i(c),h=i("".slice),p=i(1..toFixed),b=function(t,e,n){return 0===e?n:e%2==1?b(t,e-1,n*t):b(t*t,e/2,n)},w=function(t,e,n){for(var r=-1,o=n;++r<6;)o+=e*t[r],t[r]=o%1e7,o=d(o/1e7)},x=function(t,e){for(var n=6,r=0;--n>=0;)r+=t[n],t[n]=d(r/e),r=r%e*1e7},g=function(t){for(var e=6,n="";--e>=0;)if(""!==n||0===e||0!==t[e]){var r=s(t[e]);n=""===n?r:n+v("0",7-r.length)+r}return n};r({target:"Number",proto:!0,forced:f((function(){return"0.000"!==p(8e-5,3)||"1"!==p(.9,0)||"1.25"!==p(1.255,2)||"1000000000000000128"!==p(0xde0b6b3a7640080,0)}))||!f((function(){p({})}))},{toFixed:function(t){var e,n,r,o,i=a(this),c=u(t),f=[0,0,0,0,0,0],d="",p="0";if(c<0||c>20)throw l("Incorrect fraction digits");if(i!=i)return"NaN";if(i<=-1e21||i>=1e21)return s(i);if(i<0&&(d="-",i=-i),i>1e-21)if(n=(e=function(t){for(var e=0,n=t;n>=4096;)e+=12,n/=4096;for(;n>=2;)e+=1,n/=2;return e}(i*b(2,69,1))-69)<0?i*b(2,-e,1):i/b(2,e,1),n*=4503599627370496,(e=52-e)>0){for(w(f,0,n),r=c;r>=7;)w(f,1e7,0),r-=7;for(w(f,b(10,r,1),0),r=e-1;r>=23;)x(f,1<<23),r-=23;x(f,1<<r),w(f,1,1),x(f,2),p=g(f)}else w(f,0,n),w(f,1<<-e,0),p=g(f)+v("0",c);return p=c>0?d+((o=p.length)<=c?"0."+v("0",c-o)+p:h(p,0,o-c)+"."+h(p,o-c)):d+p}})},568:function(t,e,n){"use strict";n.r(e);n(21),n(6),n(512);var r={data:function(){return{value:[],options:[]}},computed:{getChecked:function(){return this.value.filter((function(t){return t.checked}))}},created:function(){for(var t=40;t>0;)this.options.push({value:(10*Math.random()).toFixed(5),label:(10*Math.random()).toFixed(5)}),t--}},o=n(5),i=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[n("tps-checkbox-panel",{attrs:{options:t.options,rowsCount:4,rowsWidth:"200px"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),t._v(" "),n("div",[t._v("已选中："+t._s(t.getChecked))])])}),[],!1,null,null,null);e.default=i.exports}}]);