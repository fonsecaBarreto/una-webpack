/*! For license information please see 6384ef184bfcc7bf678a89b.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkuna_webpack=self.webpackChunkuna_webpack||[]).push([[638],{43638:(e,t,r)=>{r.r(t),r.d(t,{LoginPage:()=>V,default:()=>W});var n=r(67294);a||(a={});var a=function(e){var t=e.children,r=e.show,a=e.title,o=e.className,i=e.loading,l=e.sm;return n.createElement("div",{className:"login-card ".concat(l?"sm":""," ").concat(r?"show":""," ").concat(i?"card-loading":""," ").concat(o," 'card-loading ")},n.createElement("div",{className:"login-card-header"},n.createElement("span",{className:"login-header-text"}," ",a," ")),n.createElement("section",{className:"login-card-content"},t,n.createElement("span",{className:"cp-small-span"},"Copyright©2022, UnaCompras. Todos os direitos reservados.")))};const o=a;var i=r(97415),l=r(71090);s||(s={});var s=function(e){var t=e.children,r=e.light,a=e.onClick,o=e.className;return n.createElement("button",{onClick:function(){console.log("submit here"),a&&a()},className:"una-submit-form-button ".concat(r?"light":""," ").concat(null!=o?o:"")}," ",t," ")};const c=s;u||(u={});var u=function(e){var t=e.pageIndex,r=e.frames;return n.createElement("div",{className:"una-carousel-pg-frame-container"},n.createElement("ul",null,r.map((function(e,r){return n.createElement("li",{key:r,className:"".concat(t==r?"selected":"")},r+1)}))))};const d=u;function p(e,t,r,n,a,o,i){try{var l=e[o](i),s=l.value}catch(e){return void r(e)}l.done?t(s):Promise.resolve(s).then(n,a)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}m||(m={});var m=function(e){var t,r,a,o,i=e.loading,l=e.frames,s=e.forceIndex,c=(a=(0,n.useState)(0),o=2,function(e){if(Array.isArray(e))return e}(a)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o=[],i=!0,l=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){l=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(l)throw a}}return o}}(a,o)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?f(e,t):void 0}}(a,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=c[0],m=c[1];(0,n.useEffect)((function(){-1!=s&&m(s)}),[s]);var h=function(){var e,t=(e=regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=l[u]).next){e.next=7;break}return e.next=4,t.next();case 4:e.t0=e.sent,e.next=8;break;case 7:e.t0=1;case 8:1==e.t0&&m(u+1);case 10:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function i(e){p(o,n,a,i,l,"next",e)}function l(e){p(o,n,a,i,l,"throw",e)}i(void 0)}))});return function(){return t.apply(this,arguments)}}();return n.createElement("div",{className:"una-cadastro-carousel-frame ".concat(i?"loading":"")},n.createElement("section",null,n.createElement(d,{frames:l,pageIndex:u}),n.createElement("h2",null," ",l[u].title," ")),n.createElement("section",null,l.map((function(e,t){if(u===t)return n.createElement("div",{key:t}," ",e.content," ")}))),n.createElement("section",null,!0===(null===(t=l[u])||void 0===t?void 0:t.hideButtons)?n.createElement("span",null):n.createElement(n.Fragment,null,u>0&&n.createElement("button",{className:"una-cadastro-carousel-btn prev-btn",onClick:function(){m(u-1)}},"Anterior"),n.createElement("button",{className:"una-cadastro-carousel-btn next-btn",onClick:h},(null===(r=l[u])||void 0===r?void 0:r.nextLabel)||"Proximo"))))};const h=m;var v=r(48740),b=r(82797),y=r(24218),g=y.builder.create((function(e){e.string("nomeFantasia"),e.string("razaoSocial"),e.cnpj("cnpj"),e.email("emailFinanceiro"),e.string("inscricaoEstadual"),e.phone("telefoneComercial").optional()})),x=y.builder.create((function(e){e.string("nome"),e.email("email"),e.phone("telefone"),e.cpf("cpf"),e.string("senha"),e.string("senhaConfirmacao")})),j=y.builder.create((function(e){e.string("rua"),e.string("numero"),e.string("detalhes").optional(),e.string("bairro"),e.string("cidade"),e.number("uf"),e.number("ibge"),e.string("cep")})),_=r(67269),O=r(8737),E=r(41857),T=r(5977),P=r(34220),C=r(16313);function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const w=function(e){var t,r,a=e.onChange,o=(t=(0,n.useState)(0),r=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o=[],i=!0,l=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){l=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(l)throw a}}return o}}(t,r)||function(e,t){if(e){if("string"==typeof e)return S(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?S(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[0],l=o[1];return(0,n.useEffect)((function(){a(i)}),[i]),n.createElement("div",{className:"una-company-type-selector"},n.createElement("span",null,"A UNA COMPRAS tem o proposito de facilitar a venda B2B.",n.createElement("br",null),"A princípio, você pretender comprar ou vender em nosso marketplace?"),n.createElement("button",{onClick:function(){return l(0)},className:"".concat(0==i?"cts-selected":"")}," Quero Comprar!"),n.createElement("button",{onClick:function(){return l(1)},className:"".concat(1==i?"cts-selected":"")}," Quero Vender! "))};function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function A(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){B(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function B(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function M(e,t,r,n,a,o,i){try{var l=e[o](i),s=l.value}catch(e){return void r(e)}l.done?t(s):Promise.resolve(s).then(n,a)}function N(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function i(e){M(o,n,a,i,l,"next",e)}function l(e){M(o,n,a,i,l,"throw",e)}i(void 0)}))}}function I(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o=[],i=!0,l=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){l=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(l)throw a}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return F(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?F(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var D=new y.Validator,R={nome:"",email:"",telefone:"",cpf:"",senha:"",senhaConfirmacao:""},U={nomeFantasia:"",razaoSocial:"",cnpj:"",emailFinanceiro:"",inscricaoEstadual:"",telefoneComercial:"",isVendor:!1,isMart:!1},$={rua:"",ibge:"",numero:"",detalhes:"",bairro:"",cidade:"",uf:"",cep:""};const z=function(e){var t=e.setLoading,r=(0,T.k6)(),a=I((0,n.useState)([]),2),o=a[0],i=a[1],l=I((0,n.useState)([]),2),s=l[0],c=l[1],u=(0,n.useContext)(_.k),d=(0,b.UseStateAdapter)(R),p=(0,b.UseStateAdapter)($),f=(0,b.UseStateAdapter)(U),m=I((0,n.useState)(-1),2),y=m[0],S=m[1];(0,n.useEffect)((function(){p.loading.set(!0),(0,C.Q5)().then((function(e){return i(e.map((function(e){return{value:e.id,label:e.nome,sigla:e.sigla}})))})).finally((function(){return p.loading.set(!1)}))}),[]),(0,n.useEffect)((function(){var e=p.data.get.uf;""!=e&&(p.loading.set(!0),(0,C.IK)(e.value).then((function(e){return c(e.map((function(e){return{value:e.id,label:e.nome}})))})).finally((function(){return p.loading.set(!1)})))}),[p.data.get.uf]);var k,B,M,F=function(){var e=N(regeneratorRuntime.mark((function e(t,r,n){var a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.validate(t,r);case 2:if(!(a=e.sent)){e.next=6;break}return n(a),e.abrupt("return",-1);case 6:return n({}),e.abrupt("return",1);case 8:case"end":return e.stop()}}),e)})));return function(t,r,n){return e.apply(this,arguments)}}(),z=function(){var e=N(regeneratorRuntime.mark((function e(){var n,a,o,i,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=A(A({},p.data.get),{},{uf:Number(p.data.get.uf.value),ibge:Number(p.data.get.cidade.value),cidade:p.data.get.cidade.label}),e.next=3,F(j,n,p.errors.set);case 3:if(-1!=e.sent){e.next=6;break}return e.abrupt("return");case 6:return t(!0),d.errors.set({}),p.errors.set({}),f.errors.set({}),a={usuario:A({},d.data.get),companhia:A({},f.data.get),endereco:n},e.prev=11,e.next=14,E.z.signup(a);case 14:u.dialog.push((0,O.MakeNotification)((function(){return-1}),["Bem Vindo a UNA Compras","Cadastro efetuado com successo!","Obrigado pela confiança, entraremos em contato em breve!"],"Sucesso!",O.NotificationType.SUCCESS)),r.push("/login?v=signin"),e.next=34;break;case 18:if(e.prev=18,e.t0=e.catch(11),u.dialog.push((0,O.MakeNotification)((function(){return-1}),[null===e.t0||void 0===e.t0?void 0:e.t0.message],"Algo Errado",O.NotificationType.FAILURE)),S(-1),!e.t0.params){e.next=34;break}if(o=Object.keys(e.t0.params),i=Object.keys(d.data.get),!(o.filter((function(e){return-1!=i.indexOf(e)})).length>0)){e.next=29;break}return d.errors.set(e.t0.params),e.abrupt("return",S(1));case 29:if(l=Object.keys(f.data.get),!(o.filter((function(e){return-1!=l.indexOf(e)})).length>0)){e.next=34;break}return f.errors.set(e.t0.params),e.abrupt("return",S(2));case 34:return e.prev=34,t(!1),e.finish(34);case 37:case"end":return e.stop()}}),e,null,[[11,18,34,37]])})));return function(){return e.apply(this,arguments)}}(),H=[{title:"Conte-nos um pouco sobre o seu negócio.",next:(M=N(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",1);case 1:case"end":return e.stop()}}),e)}))),function(){return M.apply(this,arguments)}),content:n.createElement(n.Fragment,null,n.createElement(w,{onChange:function(e){console.log("hanged type",e),f.data.onInput("isVendor",0!=e),f.data.onInput("isMart",0==e)}}))},{title:"Dados Pessoais",next:(B=N(regeneratorRuntime.mark((function e(){var t,r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F(x,Object.assign({},d.data.get),d.errors.set);case 2:if(-1!=e.sent){e.next=5;break}return e.abrupt("return",-1);case 5:if(t=d.data.get,r=t.senha,n=t.senhaConfirmacao,r==n){e.next=9;break}return d.errors.set({senhaConfirmacao:"Senhas não batem!"}),e.abrupt("return",-1);case 9:return e.abrupt("return",1);case 10:case"end":return e.stop()}}),e)}))),function(){return B.apply(this,arguments)}),content:n.createElement(v.Forming.FormGrid,{title:"",columns:[12,12,12,12,12,12]},n.createElement(v.Controls.TextBox,{placeHolder:"Exemplo: Casimiro Miguel Ferreira",state:d,label:"Nome",name:"nome",type:v.Controls.TextBoxTypes.TEXT}),n.createElement(v.Controls.TextBox,{placeHolder:"Exemplo: meuemail@mail.com",state:d,label:"E-mail",name:"email",type:v.Controls.TextBoxTypes.TEXT}),n.createElement(v.Controls.TextBox,{placeHolder:"(22) 01234-1234",mask:"(99) 99999-9999",state:d,label:"Telefone",name:"telefone",type:v.Controls.TextBoxTypes.TEXT}),n.createElement(v.Controls.TextBox,{placeHolder:"Exemplo: 999.999.999-99",mask:"999.999.999.99",state:d,label:"CPF ",name:"cpf",type:v.Controls.TextBoxTypes.TEXT}," "),n.createElement(v.Controls.TextBox,{state:d,label:"Senha",name:"senha",type:v.Controls.TextBoxTypes.PASSWORD}),n.createElement(v.Controls.TextBox,{state:d,label:"Confirme a senha",name:"senhaConfirmacao",type:v.Controls.TextBoxTypes.PASSWORD}))},{title:"Pessoa Jurídica",next:(k=N(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F(g,A({},f.data.get),f.errors.set);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),function(){return k.apply(this,arguments)}),content:n.createElement(v.Forming.FormGrid,{title:"",columns:[]},n.createElement(v.Controls.TextBox,{placeHolder:"Exemplo: Minha Empresa",state:f,label:"Nome Fantasia",name:"nomeFantasia",type:v.Controls.TextBoxTypes.TEXT}),n.createElement(v.Controls.TextBox,{placeHolder:"Exemplo: Minha Empresa LTDA",state:f,label:"Razão Social",name:"razaoSocial",type:v.Controls.TextBoxTypes.TEXT}),n.createElement(v.Controls.TextBox,{placeHolder:"Exemplo: 99.999.999/9999-99",mask:"99.999.999/9999-99",state:f,label:"CNPJ ",name:"cnpj",type:v.Controls.TextBoxTypes.TEXT}," "),n.createElement(v.Controls.TextBox,{placeHolder:"Exemplo: meuemail@mail.com",state:f,label:"E-mail financeiro",name:"emailFinanceiro",type:v.Controls.TextBoxTypes.TEXT}),n.createElement(v.Controls.TextBox,{placeHolder:"Exemplo: 123.123.123.123",mask:"999.999.999.999",state:f,label:"Inscrição Estadual",name:"inscricaoEstadual",type:v.Controls.TextBoxTypes.TEXT}),n.createElement(v.Controls.TextBox,{placeHolder:"(22) 01234-1234",mask:"(99) 99999-9999",state:f,label:"Telefone Comercial",name:"telefoneComercial",type:v.Controls.TextBoxTypes.TEXT}))},{title:"Endereço",next:z,nextLabel:"Finalizar",content:n.createElement(v.Forming.FormGrid,{title:"",columns:[6,6,7,5,12],freeze:p.loading.get},n.createElement(P.Z,{beforeSubmit:function(){return p.loading.set(!0)},onData:function(e){if(!e)return p.loading.set(!1);var t=e.ibge,r=e.logradouro,n=e.complemento,a=e.bairro,o=e.localidade,i=(t+"").substring(0,2);p.data.onInput("uf",{value:i}),p.data.onInput("cidade",{value:t,label:o}),p.data.onInput("rua",r),p.data.onInput("bairro",a),p.data.onInput("detalhes",n),p.loading.set(!1)},value:p.data.get.cep,onInput:function(e){return p.data.onInput("cep",e)}}),n.createElement(v.Controls.SelectBox,{disabled:0==o.length,state:p,label:"UF",name:"uf",list:o}," "),n.createElement(v.Controls.SelectBox,{disabled:0==s.length,state:p,label:"Cidade",name:"cidade",list:s}," "),n.createElement(v.Controls.TextBox,{placeHolder:"Exemplo: 99",state:p,label:"Numero",name:"numero",type:v.Controls.TextBoxTypes.TEXT}),n.createElement(v.Controls.TextBox,{placeHolder:"Exemplo: Bairro das Flores",state:p,label:"Bairro ",name:"bairro",type:v.Controls.TextBoxTypes.TEXT}),n.createElement(v.Controls.TextBox,{placeHolder:"Exemplo: Macaé",state:p,label:"Logradouro",name:"rua",type:v.Controls.TextBoxTypes.TEXT}),n.createElement(v.Controls.TextBox,{placeHolder:"Exemplo: Proximo a fármacia",state:p,label:"Complemento ",name:"detalhes",type:v.Controls.TextBoxTypes.TEXTAREA}))}];return n.createElement("div",{className:"una-cadastro-carousel"},n.createElement(h,{frames:H,forceIndex:y}," "))};function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o=[],i=!0,l=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){l=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(l)throw a}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return X(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?X(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function X(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var L={credencial:"",senha:""},V=function(e){var t=(0,n.useContext)(_.k),r=H((0,n.useState)(!1),2),a=r[0],s=r[1],u=(0,T.k6)(),d=H((0,n.useState)(!1),2),p=d[0],f=d[1],m=(0,l.UseStateAdapter)(L),h=function(){return u.push("/login?v=".concat(p?"signin":"signup"))};return(0,n.useEffect)((function(){u.location.search&&("signup"===u.location.search.split("?v=")[1]?f(!0):f(!1))}),[u,u.location]),n.createElement("div",{id:"login-screen"},n.createElement(o,{show:p,title:"Cadastro",loading:a},n.createElement(z,{setLoading:s}," "),n.createElement(c,{light:!0,onClick:h}," Já Sou Cadastrado")),n.createElement(o,{show:!p,title:"LOGIN",sm:!0,loading:a},n.createElement(i.Controls.TextBox,{state:m,label:"Usuario",name:"credencial",type:i.Controls.TextBoxTypes.TEXT}),n.createElement(i.Controls.TextBox,{state:m,label:"Senha",name:"senha",type:i.Controls.TextBoxTypes.PASSWORD}),n.createElement(c,{className:"login-entry-btn",onClick:function(){s(!0),E.z.signin(m.data.get).then((function(e){return u.push("/mercado")})).catch((function(e){"AccessDeniedError"===e.name&&t.dialog.push((0,O.MakeNotification)((function(){return-1}),["Credencial ou senha estão incorretos"],"Acesso negado",O.NotificationType.FAILURE)),e.params&&m.errors.set(e.params)})).finally((function(){return s(!1)}))}},"  Entrar "),n.createElement(c,{light:!0,onClick:h},"  Cadastrar-se")))};const W=V},69697:(e,t,r)=>{r.r(t),r.d(t,{default:()=>y,cpf:()=>c,cnpj:()=>v,validator:()=>b});const n=["00000000000","11111111111","22222222222","33333333333","44444444444","55555555555","66666666666","77777777777","88888888888","99999999999","12345678909"],a=/[.-]/g,o=/[^\d]/g,i=e=>{const t=e.split("").map((e=>parseInt(e,10))),r=t.length+1,n=t.map(((e,t)=>e*(r-t))).reduce(((e,t)=>e+t))%11;return n<2?0:11-n},l=(e,t)=>{const r=t?a:o;return(e||"").replace(r,"")},s=e=>l(e).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/,"$1.$2.$3-$4");var c={verifierDigit:i,strip:l,format:s,isValid:(e,t)=>{const r=l(e,t);if(!r)return!1;if(11!==r.length)return!1;if(n.includes(r))return!1;let a=r.substr(0,9);return a+=i(a),a+=i(a),a.substr(-2)===r.substr(-2)},generate:e=>{let t="";for(let e=0;e<9;e+=1)t+=Math.floor(9*Math.random());return t+=i(t),t+=i(t),e?s(t):t}};const u=["00000000000000","11111111111111","22222222222222","33333333333333","44444444444444","55555555555555","66666666666666","77777777777777","88888888888888","99999999999999"],d=/[-\\/.]/g,p=/[^\d]/g,f=e=>{let t=2;const r=e.split("").reduce(((e,t)=>[parseInt(t,10)].concat(e)),[]).reduce(((e,r)=>(e+=r*t,t=9===t?2:t+1,e)),0)%11;return r<2?0:11-r},m=(e,t)=>{const r=t?d:p;return(e||"").replace(r,"")},h=e=>m(e).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,"$1.$2.$3/$4-$5");var v={verifierDigit:f,strip:m,format:h,isValid:(e,t)=>{const r=m(e,t);if(!r)return!1;if(14!==r.length)return!1;if(u.includes(r))return!1;let n=r.substr(0,12);return n+=f(n),n+=f(n),n.substr(-2)===r.substr(-2)},generate:e=>{let t="";for(let e=0;e<12;e+=1)t+=Math.floor(9*Math.random());return t+=f(t),t+=f(t),e?h(t):t}};const b=e=>({type:"document",base:e.string(),messages:{"document.cpf":"CPF inválido","document.cnpj":"CNPJ inválido"},rules:{cpf:{validate:(e,t,r,n)=>c.isValid(e)?e:t.error("document.cpf")},cnpj:{validate:(e,t,r,n)=>v.isValid(e)?e:t.error("document.cnpj")}}}),y=b},83999:(e,t)=>{var r=/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;t.validate=function(e){if(!e)return!1;if(e.length>254)return!1;if(!r.test(e))return!1;var t=e.split("@");return!(t[0].length>64||t[1].split(".").some((function(e){return e.length>63})))}},33932:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},n.apply(this,arguments)},a=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var n,a=0,o=t.length;a<o;a++)!n&&a in t||(n||(n=Array.prototype.slice.call(t,0,a)),n[a]=t[a]);return e.concat(n||Array.prototype.slice.call(t))},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SelectBox=void 0;var i=r(85893),l=r(67294),s=o(r(23497));t.SelectBox=function(e){var t,r,o=e.name,c=e.label,u=e.state,d=e.list,p=e.placeHolder,f=e.className,m=(0,l.useState)([]),h=m[0],v=m[1];return(0,l.useEffect)((function(){if(!d)throw new Error("Nenhuma Lista foi fornecida");var e=d.map((function(e,t){return"string"==typeof e?{value:t+"",label:e}:e}));v(a([{value:"",label:null!=p?p:"Nenhum Item Selecionado "}],e,!0))}),[d]),(0,i.jsx)(s.default,n({label:null!=c?c:o,error:u.errors.get[o],className:f},{children:(0,i.jsx)("select",n({disabled:0===d.length,value:null!==(r=null===(t=u.data.get[o])||void 0===t?void 0:t.value)&&void 0!==r?r:"",onChange:function(e){u.data.onInput(o,{value:e.target.value,label:h[e.target.options.selectedIndex].label})}},{children:h.map((function(e,t){return(0,i.jsx)("option",n({value:e.value},{children:e.label}),t)}))}),void 0)}),void 0)}},78402:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},n.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.UseStateAdapter=void 0;var a=r(67294);t.UseStateAdapter=function(e){var t=(0,a.useState)(n({},e)),r=t[0],o=t[1],i=(0,a.useState)({}),l=i[0],s=i[1],c=(0,a.useState)(!1),u=c[0],d=c[1];return{data:{get:r,set:o,onInput:function(e,t,r){void 0===r&&(r=!1),r&&(t=t.replace(/\b\w/g,(function(e){return e.toUpperCase()}))),o((function(r){var a;return n(n({},r),((a={})[e]=t,a))}))},clear:function(){return o(n({},e))}},errors:{get:l,set:s,clear:function(){s({})}},loading:{get:u,set:d}}},t.default=t.UseStateAdapter},48747:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},n.apply(this,arguments)},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.TextBox=t.TextBoxTypes=void 0;var o,i=r(85893),l=a(r(23497)),s=a(r(76627));!function(e){e.TEXT="text",e.VIEW="view",e.TEXTAREA="textarea",e.NUMBER="number",e.PASSWORD="password"}(o=t.TextBoxTypes||(t.TextBoxTypes={})),t.TextBox=function(e){var t,r,a,c,u,d,p,f,m=e.name,h=e.label,v=e.type,b=e.placeHolder,y=e.state,g=e.className,x=e.mask;return(0,i.jsx)(l.default,n({label:null!=h?h:m,error:y.errors.get[m],className:g},{children:v==o.TEXTAREA?(0,i.jsx)("textarea",{rows:4,cols:50,placeholder:null!=b?b:"",value:null!==(r=null===(t=y.data.get)||void 0===t?void 0:t[m])&&void 0!==r?r:"",onInput:function(e){return y.data.onInput(m,e.target.value)}},void 0):v==o.VIEW?(0,i.jsx)("input",{disabled:!0,type:"text",value:null!==(c=null===(a=y.data.get)||void 0===a?void 0:a[m])&&void 0!==c?c:""},void 0):x?(0,i.jsx)(s.default,{className:"custom-input",type:"text",placeholder:null!=b?b:"",mask:x,value:null!==(d=null===(u=y.data.get)||void 0===u?void 0:u[m])&&void 0!==d?d:"",onInput:function(e){return y.data.onInput(m,e.target.value)}},void 0):(0,i.jsx)("input",{type:v,placeholder:null!=b?b:"",value:null!==(f=null===(p=y.data.get)||void 0===p?void 0:p[m])&&void 0!==f?f:"",onInput:function(e){return y.data.onInput(m,e.target.value)}},void 0)}),void 0)}},71090:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),a(r(78402),t),a(r(35954),t),a(r(48747),t),a(r(33932),t)},35954:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},12903:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},n.apply(this,arguments)},a=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&a(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.FormGrid=void 0;var l=r(85893),s=i(r(67294));r(59183);var c=r(97735);t.FormGrid=function(e){var t=e.title,r=e.children,a=e.columns,o=e.freeze,i=void 0!==o&&o,u=e.icon,d=(0,s.useState)([]),p=d[0],f=d[1];return(0,s.useEffect)((function(){if(a){var e=a.map((function(e,t){return"number"==typeof e?{sm:12,lg:e}:e}));f(e)}}),[a]),(0,l.jsxs)("div",n({className:"form-panel ".concat(i?"freeze":"")},{children:[(0,l.jsx)("section",{children:t&&(0,l.jsxs)(s.default.Fragment,{children:[u?{icon:u}:(0,l.jsx)(c.SiPlatformdotsh,{},void 0),(0,l.jsxs)("span",n({className:"cf-title"},{children:["  ",t||""]}),void 0)]},void 0)},void 0),(0,l.jsx)("section",n({className:"form-panel-content"},{children:(0,l.jsx)("div",n({className:"form-panel-grid"},{children:s.default.Children.map(r,(function(e,t){var r,a,o,i;return(0,l.jsxs)("div",n({className:"grid-row r-lg".concat(null!==(a=null===(r=p[t])||void 0===r?void 0:r.lg)&&void 0!==a?a:12," r-sm").concat(null!==(i=null===(o=p[t])||void 0===o?void 0:o.sm)&&void 0!==i?i:12)},{children:[" ",e," "]}),void 0)}))}),void 0)}),void 0)]}),void 0)},t.default=t.FormGrid},23497:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},n.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.InputWrapper=void 0;var a=r(85893);r(77620),t.InputWrapper=function(e){var t=e.children,r=e.label,o=e.error,i=e.className,l=e.w100,s=void 0===l||l;return(0,a.jsxs)("div",n({className:"input-wrapper ".concat(o?"warning":""," ").concat(s?"w100":""," ").concat(i," ")},{children:[(0,a.jsx)("label",{children:r},void 0),t,o&&(0,a.jsx)("span",n({className:"form-error"},{children:o}),void 0)]}),void 0)},t.default=t.InputWrapper},36605:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},n.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.LabelWrapper=void 0;var a=r(85893);r(84601),t.LabelWrapper=function(e){var t=e.label,r=e.children;return(0,a.jsxs)("div",n({className:"label-wrapper"},{children:[(0,a.jsxs)("span",{children:[t,":"]},void 0)," ",r]}),void 0)},t.default=t.LabelWrapper},51892:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),a(r(23497),t),a(r(36605),t)},43914:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),a(r(12903),t),a(r(51892),t)},97415:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Controls=t.Forming=t.Utils=void 0,t.Utils=o(r(62799)),t.Forming=o(r(43914)),t.Controls=o(r(71090))},69032:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LoadingComponent=void 0;var n=r(85893);r(6153),t.LoadingComponent=function(){return(0,n.jsx)("div",{className:"loading-comp"},void 0)},t.default=t.LoadingComponent},62799:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return a(t,e),t},i=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),t.Hooks=void 0,t.Hooks=o(r(29013)),i(r(69032),t)},67429:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},36020:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class r{constructor(){this.properties={},this.required=[],this.number=e=>this.pushProperty(e,{type:"number"}),this.boolean=e=>this.pushProperty(e,{type:"boolean"}),this.date=e=>this.pushProperty(e,{type:"date"}),this.hour=e=>this.pushProperty(e,{type:"hour"}),this.array=e=>this.pushProperty(e,{type:"array"}),this.json=e=>this.pushProperty(e,{type:"json"}),this.cep=e=>this.pushProperty(e,{type:"cep"}),this.uuid=e=>this.pushProperty(e,{type:"uuid"}),this.string=e=>this.pushProperty(e,{type:"string"}),this.email=e=>this.pushProperty(e,{type:"email"}),this.phone=e=>this.pushProperty(e,{type:"phone"}),this.cpf=e=>this.pushProperty(e,{type:"cpf"}),this.cnpj=e=>this.pushProperty(e,{type:"cnpj"}),this.object=(e,t)=>this.pushProperty(e,{...t})}setSpecs(e){return{optional:()=>(this.required.splice(this.required.indexOf(e),1),this.setSpecs(e)),description:t=>(this.properties[e]={...this.properties[e],description:t},this.setSpecs(e))}}pushProperty(e,t){return this.properties[e]={...t},this.required.push(e),this.setSpecs(e)}static create(e){const t=new r;return e(t),t.getSchema()}getSchema(){return{type:"object",properties:this.properties,required:this.required}}}t.default=r},12206:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=o(r(36020));a(r(67429),t),a(r(36020),t),t.default=i.default},24218:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.builder=t.Validator=void 0,a(r(12206),t),a(r(56188),t),a(r(69499),t);var i=r(56188);Object.defineProperty(t,"Validator",{enumerable:!0,get:function(){return o(i).default}});var l=r(12206);Object.defineProperty(t,"builder",{enumerable:!0,get:function(){return o(l).default}})},69499:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},29170:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},53476:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.makeInvalidMessage=t.makeMissingMessage=void 0;const i=o(r(83999)),l=r(69697);t.makeMissingMessage=(e,t)=>t||`Campo '${e}' é obrigatório`,t.makeInvalidMessage=(e,t)=>t||`Campo '${e}' contem valor inválido `,t.default=class{constructor(){}async validate(e,r){var n,a,o={},i=null!==(n=null==e?void 0:e.properties)&&void 0!==n?n:{},l=null!==(a=null==e?void 0:e.required)&&void 0!==a?a:[];return this.sanitize(i,r),await Promise.all(Object.keys(i).map((async e=>{const{type:n,description:a}=i[e];if(null===r[e]){if(!l.includes(e))return;return o[e]=(0,t.makeMissingMessage)(a||e)}if(!1===await this.checkType(r[e],n))return o[e]=(0,t.makeInvalidMessage)(a||e);if("object"==n){var s=await this.validate(i[e],r[e]);null!=s&&(o[e]=s)}}))),Object.keys(o).length>0?o:null}sanitize(e,t){Object.keys(t).map((r=>{e[r]||delete t[r]}));var r={...t};Object.keys(e).forEach((n=>{var a=r[n];if(void 0===a||""===a||null==a)return t[n]=null;const{type:o}=e[n];var i=a;if(["cnpj","cpf","phone","cep"].includes(o))i=(a+"").replace(/[^\d]+/g,"");else switch(o){case"number":isNaN(a)||(i=Number(a));break;case"date":isNaN(Date.parse(a))||(i=new Date(a));break;case"boolean":try{i=JSON.parse(a)}catch(e){i=a}}return t[n]=i}))}async checkType(e,t){switch(t){case"cpf":try{return l.cpf.isValid(e)}catch(e){return!1}case"cnpj":try{return l.cnpj.isValid(e)}catch(e){return!1}case"phone":if(isNaN(e)||e.length<9||e.length>16)return!1;break;case"email":try{return i.validate(e)}catch(e){return!1}case"uuid":if(!/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(e))return!1;break;case"json":try{JSON.parse(e)}catch(e){return!1}break;case"object":if(t!==typeof e)return!1;break;case"cep":if(!/\b\d{8}\b/.test(e))return!1;break;case"date":if(!(e instanceof Date))return!1;break;case"hour":if(!/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(e))return!1;break;case"array":if(!1===Array.isArray(e))return!1;break;default:if(t!==typeof e)return!1}return!0}}},56188:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=o(r(53476));a(r(29170),t),a(r(53476),t),t.default=i.default},59183:(e,t,r)=>{r.r(t)},77620:(e,t,r)=>{r.r(t)},84601:(e,t,r)=>{r.r(t)},6153:(e,t,r)=>{r.r(t)}}]);
//# sourceMappingURL=6384ef184bfcc7bf678a89b.bundle.js.map