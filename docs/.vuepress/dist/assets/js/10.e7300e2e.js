(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{512:function(e,t,o){"use strict";var n=o(2),r=o(1),i=o(4),a=o(48),u=o(275),l=o(276),c=o(3),f=r.RangeError,s=r.String,v=Math.floor,d=i(l),p=i("".slice),h=i(1..toFixed),b=function(e,t,o){return 0===t?o:t%2==1?b(e,t-1,o*e):b(e*e,t/2,o)},w=function(e,t,o){for(var n=-1,r=o;++n<6;)r+=t*e[n],e[n]=r%1e7,r=v(r/1e7)},x=function(e,t){for(var o=6,n=0;--o>=0;)n+=e[o],e[o]=v(n/t),n=n%t*1e7},g=function(e){for(var t=6,o="";--t>=0;)if(""!==o||0===t||0!==e[t]){var n=s(e[t]);o=""===o?n:o+d("0",7-n.length)+n}return o};n({target:"Number",proto:!0,forced:c((function(){return"0.000"!==h(8e-5,3)||"1"!==h(.9,0)||"1.25"!==h(1.255,2)||"1000000000000000128"!==h(0xde0b6b3a7640080,0)}))||!c((function(){h({})}))},{toFixed:function(e){var t,o,n,r,i=u(this),l=a(e),c=[0,0,0,0,0,0],v="",h="0";if(l<0||l>20)throw f("Incorrect fraction digits");if(i!=i)return"NaN";if(i<=-1e21||i>=1e21)return s(i);if(i<0&&(v="-",i=-i),i>1e-21)if(o=(t=function(e){for(var t=0,o=e;o>=4096;)t+=12,o/=4096;for(;o>=2;)t+=1,o/=2;return t}(i*b(2,69,1))-69)<0?i*b(2,-t,1):i/b(2,t,1),o*=4503599627370496,(t=52-t)>0){for(w(c,0,o),n=l;n>=7;)w(c,1e7,0),n-=7;for(w(c,b(10,n,1),0),n=t-1;n>=23;)x(c,1<<23),n-=23;x(c,1<<n),w(c,1,1),x(c,2),h=g(c)}else w(c,0,o),w(c,1<<-t,0),h=g(c)+d("0",l);return h=l>0?v+((r=h.length)<=l?"0."+d("0",l-r)+h:p(h,0,r-l)+"."+p(h,r-l)):v+h}})},567:function(e,t,o){"use strict";o.r(t);o(512);var n={data:function(){return{value:[],options:[]}},mounted:function(){for(var e=200,t=[];e>0;)t.push({value:(10*Math.random()).toFixed(5),label:(10*Math.random()).toFixed(5)}),e--;this.value=[t[0].value],this.options=t,console.log(this.options)}},r=o(5),i=Object(r.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",[o("tps-checkbox-list",{attrs:{options:e.options,placeholder:"这是placeholder",size:"small",label:"多选选择器",width:"450px",rowsCount:4,pageSize:60},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),e._v(" "),o("div",[e._v(e._s(e.value))])])}),[],!1,null,null,null);t.default=i.exports}}]);