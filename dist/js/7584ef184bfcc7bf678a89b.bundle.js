"use strict";(self.webpackChunkuna_webpack=self.webpackChunkuna_webpack||[]).push([[758],{54429:(e,t,n)=>{n.d(t,{ZP:()=>m});var r,a=n(67294),o=n(17563),i=n(5977);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){c=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(c)throw a}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}r||(r={});const m=function(e){var t=e.header,n=(0,i.k6)(),r=(0,i.$B)(),c=s((0,a.useState)(null),2),f=c[0],m=c[1],p=s((0,a.useState)(null),2),d=p[0],v=p[1];(0,a.useEffect)((function(){var e=s(y(),2),t=e[0],n=e[1];v(t),m(n)}),[location.search,location.pathname]);var y=function(){var e,n={},a=o.parse(location.search),i=Object.assign({},r.params),c=t.search,l=void 0===c?[]:c,s=t.params,f=void 0===s?[]:s;return l.map((function(e,t){var r,o=null!==(r=a[e])&&void 0!==r?r:[];n[e]=Array.isArray(o)?o:[o]})),f.map((function(t,n){var r;return e=u({},t,null!==(r=i[t])&&void 0!==r?r:"")})),[e,n]};return{parsedSearch:f,parsedParams:d,pushToHistory:function(e){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=y(),c=s(i,2),u=c[0],f=c[1],m=a?{}:l({},u),p=a?{}:l({},f),d=t.search,v=void 0===d?[]:d,b=t.params,h=void 0===b?[]:b;Object.keys(e).map((function(t,n){var r,a=e[t];h.includes(t)?m[t]=null!==(r=a[0])&&void 0!==r?r:"":v.includes(t)&&(p[t]=null!=a?a:[])}));var g="";Object.keys(m).map((function(e){var t;return g+=null!==(t="/"+m[e])&&void 0!==t?t:""})),n.replace({search:o.stringify(p),pathname:"".concat(r.path.split("/:")[0]).concat(g)})},appendToHistory:function(e){var t=o.parse(location.search);t=l(l({},t),e),n.replace({search:o.stringify(t)})}}}},55455:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(67294);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}i||(i={});var i=function(e){var t=e.item,n=e.selected,i=e.onClick,c=t.label;return r.createElement("li",{onClick:function(){return i(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t))},className:"".concat(!0===n?"selected":"")},r.createElement("input",{readOnly:!0,type:"checkbox",checked:n}),r.createElement("span",null,c))};const c=i},3825:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(67294),a=n(55455),o=n(40356);function i(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||c(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}u||(u={});var u=function(e){var t,n,l=e.value,u=void 0===l?[]:l,s=e.icon,f=e.title,m=e.items,p=e.onChange,d=e.max,v=void 0===d?-1:d,y=(t=(0,r.useState)(m),n=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){c=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(c)throw a}}return o}}(t,n)||c(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),b=y[0],h=y[1];(0,r.useEffect)((function(){h(i(m))}),[m]);var g=function(e){var t=[];if(e){if(t=i(u),v>1&&t.length+1>v&&0==t.filter((function(t){return t.value==e.value})).length)return;1==v&&(t=[]);var n=t.filter((function(t){return t.value!==e.value}));t=n.length<t.length?n:[].concat(i(t),[e])}p(t)};return r.createElement(o.Z,{icon:s,title:f},r.createElement("ul",null,r.createElement(a.Z,{item:{label:"Todos",value:""},onClick:function(){return g()},selected:0===u.length}),b.map((function(e,t){return r.createElement(a.Z,{key:t,item:e,onClick:function(){return g(e)},selected:u.map((function(e){return e.value})).includes(e.value)})}))))};const s=u},40356:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(67294),a=n(5434);function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}i||(i={});var i=function(e){var t,n,i=e.title,c=e.icon,l=e.children,u=e.open_initial,s=void 0===u||u,f=e.showCurtain,m=void 0===f||f,p=(t=(0,r.useState)(s),n=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){c=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(c)throw a}}return o}}(t,n)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),d=p[0],v=p[1];return r.createElement("nav",{className:"nav-selector-wrapper"},r.createElement("div",{onClick:function(){return v(!d)},className:"nav-selector-wrapper-title"}," ",m&&(d?r.createElement(a.Faw,null):r.createElement(a.Yc6,null)),"  ",c&&c," ",i," "),r.createElement("div",{className:"nav-selector-wrapper-body ".concat(d?"open":"")},l))};const c=i},23303:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(67294);const a=n.p+"img/round-loading.svg",o=function(e){var t=e.fill,n=void 0!==t&&t;return r.createElement("div",{className:"una-default-loading ".concat(n?"una-default-loading-fill":"")},r.createElement("img",{src:a}))}},36280:(e,t,n)=>{n.d(t,{Z:()=>u});var r=n(67294),a=n(29013),o=n(26778),i=n(4466);function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}l||(l={});var l=function(e){var t,n,l=e.children,u=e.allowedToShow,s=void 0!==u&&u,f=e.onChange,m=(0,a.useWindowSize)().width,p=(t=(0,r.useState)(!1),n=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){c=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(c)throw a}}return o}}(t,n)||function(e,t){if(e){if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),d=p[0],v=p[1],y=(0,r.useContext)(i.B);return(0,r.useEffect)((function(){v(s)}),[s]),(0,r.useEffect)((function(){m>960?y.asideFloat.setContent(null):d?y.asideFloat.setContent((function(){return r.createElement(o.TH,{title:"Filtros",onClose:function(){return f&&f(-1)}},l)})):y.asideFloat.setContent(null)}),[d,m]),r.createElement("aside",{className:"filter-aside-nav ".concat("")},l)};const u=l},617:(e,t,n)=>{n.d(t,{Z:()=>i});var r=n(23303),a=n(67294);o||(o={});var o=function(e){var t=e.children,n=e.loading,o=void 0!==n&&n;return o?a.createElement("div",{className:"cg-grid-loading"}," ",a.createElement(r.Z,null)," "):a.createElement("div",{id:"departamento-content-grid"},a.Children.map(t,(function(e,t){return a.createElement("section",{className:"".concat(o?"una-gradiente-loading":"")}," ",e," ")})))};const i=o},78405:(e,t,n)=>{n.d(t,{ZP:()=>s});var r=n(67294),a=n(8193);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){c=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(c)throw a}}return o}}(e,t)||i(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){if(e){if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}u||(u={});var l=function(e){var t,n=e.pages,o=void 0===n?1:n,l=e.index,u=e.onClick;return r.createElement("div",{className:"page-navigator-section"},r.createElement("button",{disabled:1==l,className:"page-navigator-btn",onClick:function(){return u(l-1)}}," ",r.createElement(a.AiOutlineArrowLeft,null)," "),(t=Array(o),function(e){if(Array.isArray(e))return c(e)}(t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(t)||i(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).map((function(e,t){return r.createElement("button",{onClick:function(){return u(t+1)},key:t,className:"page-navigator-btn ".concat(l==t+1?"selected":"")},t+1)})),r.createElement("button",{disabled:l==o,className:"page-navigator-btn",onClick:function(){return u(l+1)}}," ",r.createElement(a.AiOutlineArrowRight,null)," "))},u=function(e){var t=e.header,n=e.auxHeader,a=e.dataAlias,i=e.list_data,c=e.itemComponent,u=e.onAction,s=e.initial_mode,f=void 0===s?"block":s,m=o((0,r.useState)(f),2),p=m[0],d=m[1],v=i.pageIndex,y=i.pages,b=i.queries,h=(i.total,i.length,o((0,r.useState)([]),2)),g=h[0],E=h[1];return(0,r.useEffect)((function(){var e=a?i.data[a]:i.data;E(e)}),[i]),r.createElement("div",{className:"bl-common-content-pool"},r.createElement("header",null,r.createElement("section",null,t&&t(b)),r.createElement("section",null,r.createElement("nav",null,n&&n(b),r.createElement("button",{onClick:function(){return d("block")}}," ❒ "),r.createElement("button",{onClick:function(){return d("inline")}},"  ≡ ")))),r.createElement("main",null,r.createElement("section",{className:"bl-common-content-pool-flow ".concat(p)},g.length>0&&g.map((function(e,t){return r.createElement(c,{listMode:p,key:t,item_data:e,onClick:u})}))),r.createElement("section",null," ",r.createElement(l,{pages:y,index:v,onClick:function(e){u("SET_PAGE",e)}}),"  ")))};const s=u},25758:(e,t,n)=>{n.r(t),n.d(t,{ListCompanhiasPage:()=>x,SEARCH_HEADER:()=>N,default:()=>_});var r=n(67294),a=n(617),o=n(36280),i=n(3825);l||(l={});var c=[{value:"1",label:"Ativo"},{value:"0",label:"Inativo"}],l=function(e){var t=e.values,n=(e.company_id,e.onChange);return r.createElement(o.Z,null,t?r.createElement(i.Z,{title:"Status",items:c,max:1,value:t.status.map((function(e){return{value:e}})),onChange:function(e){return n({status:e.map((function(e){return e.value}))})}}):r.createElement("span",null," Carregando... "))};const u=l;var s=n(67269),f=n(8737),m=n(48740),p=n(63);function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}v||(v={});var v=function(e){var t,n,a=e.companhia_id,o=(t=(0,r.useState)(null),n=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){c=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(c)throw a}}return o}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[0],c=o[1];return(0,r.useEffect)((function(){p.zG.find(a).then(c)}),[a]),r.createElement("div",{className:"companhia-view-modal"},null===i?"loading...":r.createElement(r.Fragment,null,r.createElement("section",{className:"companhia-view-modal-header"},r.createElement("img",null),r.createElement("div",{className:"flex-column"},r.createElement(m.Forming.LabelWrapper,{label:"Nome Fantasia"},i.nomeFantasia),r.createElement(m.Forming.LabelWrapper,{label:"Razão Social"},i.razaoSocial),r.createElement(m.Forming.LabelWrapper,{label:"CNPJ"},i.cnpj),r.createElement(m.Forming.LabelWrapper,{label:"E-mail Financeiro"},i.emailFinanceiro),r.createElement(m.Forming.LabelWrapper,{label:"Telefone Comercial"},i.telefoneComercial),r.createElement(m.Forming.LabelWrapper,{label:"Incrição Estadual"},i.inscricaoEstadual),r.createElement(m.Forming.LabelWrapper,{label:"status"},i.ativo?"Ativo":"Inativo")))))};const y=v;var b=n(39704),h=n(83442),g=n(54429),E=n(78405),O=n(8193),w=n(47516),j=n(5434);S||(S={});var S=function(e){var t=e.onClick,n=e.item_data,a=e.listMode,o=n.id,i=n.nomeFantasia,c=n.telefoneComercial,l=n.ativo;return r.createElement("div",{className:"list-view-item ".concat(a),onClick:function(){return t("OPTIONS",o)}},r.createElement("div",{className:"list-view-item-content"},r.createElement("section",{className:"list-view-item-icon"},r.createElement(O.AiOutlineShop,null)),r.createElement("section",null,r.createElement("span",{className:"list-view-item-name"},i," - ",c," ")),r.createElement("section",null,r.createElement("div",{className:"list-view-item-name-status-badge ".concat(l?"ativo":"inativo")},1==l?r.createElement(w.HsQ,null):r.createElement(j.a7d,null)))))};const A=S;P||(P={});var P=function(e){var t=e.onAction,n=(0,b.v9)((function(e){return e.companies}));return r.createElement("div",{className:"una-product-feed"},r.createElement(E.ZP,{initial_mode:"inline",itemComponent:A,list_data:n,dataAlias:"companies",onAction:t}))};const C=P;function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function I(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var N={params:["company_id"],search:["status","v","p"]},x=function(e){e.location;var t,n=e.history,o=(0,b.I0)(),i=(0,r.useContext)(s.k),c=(0,g.ZP)({header:N}),l=c.parsedSearch,m=c.parsedParams,d=c.pushToHistory;(0,r.useEffect)((function(){l&&E()}),[l]),(0,r.useEffect)((function(){null!=m&&m.company_id&&v()}),[m]);var v=function(){i.dialog.push((0,f.MakeDialogConfig)((function(){return r.createElement(y,{companhia_id:null==m?void 0:m.company_id})}),(function(){return d({company_id:[]}),-1}),"Companhias"))},E=function(){p.zG.list(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){I(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},l)).then((function(e){return o((0,h.dn)(e,!1))}))};return r.createElement("div",{id:"companhias-page"},r.createElement("div",{className:"app-container"},r.createElement(a.Z,null,r.createElement(u,{onChange:d,values:l,company_id:null!==(t=null==m?void 0:m.company_id)&&void 0!==t?t:""}),r.createElement(C,{onAction:function(e,t){switch(console.log(t),e){case"OPTIONS":i.dialog.push((0,f.MakeOptions)((function(e){switch(e){case 0:d({company_id:[t]});break;case 1:n.push("/perfil/companhias/".concat(t))}return-1}),[{label:"Visualizar"},{label:"Abrir"}]));break;case"SET_PAGE":d({p:t+""})}}}," "))))};const _=x},63:(e,t,n)=>{n.d(t,{zG:()=>y});var r=n(86988),a=n(16858);function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t,n,r,a,o,i){try{var c=e[o](i),l=c.value}catch(e){return void n(e)}c.done?t(l):Promise.resolve(l).then(r,a)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function i(e){u(o,r,a,i,c,"next",e)}function c(e){u(o,r,a,i,c,"throw",e)}i(void 0)}))}}var f,m=(0,a.M)({base_url:"".concat(r.C.base_url,"/companies"),errorHelper:a.P,storage_key:r.C.user_storage_key});f||(f={});var p,d,v,y={save:(v=s(regeneratorRuntime.mark((function e(t){var n,r,a,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c({},t),r=n.id?"PUT":"POST",a=n.id?"/".concat(n.id):"/",delete n.id,e.next=6,m.send({method:r,url:a,data:n});case 6:return o=e.sent,e.abrupt("return",o.data);case 8:case"end":return e.stop()}}),e)}))),function(e){return v.apply(this,arguments)}),list:(d=s(regeneratorRuntime.mark((function e(t){var n,r,a,o,i,c,l,u,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.v,r=void 0===n?"":n,a=t.p,o=void 0===a?1:a,i=t.status,c=void 0===i?"":i,l="?p=".concat(o,"&v=").concat(r,"&ativo=").concat(c),e.next=4,m.send({method:"get",url:"/".concat(l)});case 4:return u=e.sent,s=u.data,e.abrupt("return",s);case 7:case"end":return e.stop()}}),e)}))),function(e){return d.apply(this,arguments)}),find:(p=s(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.send({method:"get",url:"/".concat(t)});case 2:return n=e.sent,r=n.data,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)}))),function(e){return p.apply(this,arguments)})};s(regeneratorRuntime.mark((function e(t,n){var r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={ufs:(i=t,function(e){if(Array.isArray(e))return o(e)}(i)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(i)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(i)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())},e.next=3,m.send({method:"POST",url:"/".concat(n,"/coverage"),data:r});case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}var i}),e)}))),s(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.send({method:"get",url:"/".concat(t,"/coverage")});case 2:return n=e.sent,r=n.data,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})))}}]);
//# sourceMappingURL=7584ef184bfcc7bf678a89b.bundle.js.map