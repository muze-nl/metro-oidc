(()=>{var le=Object.defineProperty;var ue=(e,n)=>{for(var t in n)le(e,t,{get:n[t],enumerable:!0})};var X={};ue(X,{client:()=>de,formdata:()=>ie,metroError:()=>k,request:()=>K,response:()=>G,trace:()=>me,url:()=>W});var B="https://metro.muze.nl/details/";Symbol.metroProxy||(Symbol.metroProxy=Symbol("isProxy"));Symbol.metroSource||(Symbol.metroSource=Symbol("source"));var E=class e{#e={url:typeof window<"u"?window.location:"https://localhost"};#t=["get","post","put","delete","patch","head","options","query"];static tracers={};constructor(...n){for(let t of n)if(typeof t=="string"||t instanceof String)this.#e.url=""+t;else if(t instanceof e)Object.assign(this.#e,t.#e);else if(t instanceof Function)this.#r([t]);else if(t&&typeof t=="object")for(let r in t)r=="middlewares"?this.#r(t[r]):typeof t[r]=="function"?this.#e[r]=t[r](this.#e[r],this.#e):this.#e[r]=t[r];this.#e.verbs&&(this.#t=this.#e.verbs,delete this.#e.verbs);for(let t of this.#t)this[t]=async function(...r){return this.fetch(K(this.#e,...r,{method:t.toUpperCase()}))};Object.freeze(this)}#r(n){typeof n=="function"&&(n=[n]);let t=n.findIndex(r=>typeof r!="function");if(t>=0)throw k("metro.client: middlewares must be a function or an array of functions "+B+"client/invalid-middlewares-value/",n[t]);Array.isArray(this.#e.middlewares)||(this.#e.middlewares=[]),this.#e.middlewares=this.#e.middlewares.concat(n)}fetch(n,t){if(n=K(n,t),!n.url)throw k("metro.client."+n.method.toLowerCase()+": Missing url parameter "+B+"client/missing-url-param/",n);if(t||(t={}),typeof t!="object"||Array.isArray(t)||t instanceof String)throw k("metro.client.fetch: Options is not an object");let o=[async function(f){if(f[Symbol.metroProxy])if(f.body&&f.body[Symbol.metroSource]){let O=f.body[Symbol.metroSource];f=new Request(f[Symbol.metroSource],{body:O})}else f=f[Symbol.metroSource];let x=await fetch(f);return G(x)}].concat(this.#e?.middlewares?.slice()||[]);t=Object.assign({},this.#e,t);let i;for(let u of o)i=function(f,x){return async function(O){let T,D=Object.values(e.tracers);for(let a of D)a.request&&a.request.call(a,O,x);T=await x(O,f);for(let a of D)a.response&&a.response.call(a,T,x);return T}}(i,u);return i(n)}with(...n){return new e(this,...n)}};function de(...e){return new E(...e)}function q(e,n){let t=n.body;return t||(e===null?t=new ReadableStream:e instanceof ReadableStream?t=e:e instanceof Blob?t=e.stream():t=new ReadableStream({start(r){let o;switch(typeof e){case"object":if(typeof e.toString=="function")o=e.toString();else if(e instanceof FormData)o=new URLSearchParams(e).toString();else if(e instanceof ArrayBuffer||ArrayBuffer.isView(e))o=e;else throw k("Cannot convert body to ReadableStream",e);break;case"string":case"number":case"boolean":o=e;break;default:throw k("Cannot convert body to ReadableStream",e)}r.enqueue(o),r.close()}})),new Proxy(t,{get(r,o,i){switch(o){case Symbol.metroProxy:return!0;case Symbol.metroSource:return e;case"toString":return function(){return""+e}}if(e&&typeof e=="object"&&o in e)return typeof e[o]=="function"?function(...u){return e[o].apply(e,u)}:e[o];if(o in r&&o!="toString")return typeof r[o]=="function"?function(...u){return r[o].apply(r,u)}:r[o]},has(r,o){return e&&typeof e=="object"?o in e:o in r},ownKeys(r){return Reflect.ownKeys(e&&typeof e=="object"?e:r)},getOwnPropertyDescriptor(r,o){return Object.getOwnPropertyDescriptor(e&&typeof e=="object"?e:r,o)}})}function he(e,n){let t=n||{};!t.url&&n.url&&(t.url=n.url);for(let r of["method","headers","body","mode","credentials","cache","redirect","referrer","referrerPolicy","integrity","keepalive","signal","priority","url"])if(typeof e[r]=="function")e[r](t[r],t);else if(typeof e[r]<"u")if(r=="url")t.url=W(t.url,e.url);else if(r=="headers"){t.headers=new Headers(n.headers),e.headers instanceof Headers||(e.headers=new Headers(e.headers));for(let[o,i]of e.headers.entries())t.headers.set(o,i)}else t[r]=e[r];return t}function K(...e){let n={url:typeof window<"u"?window.location:"https://localhost/",duplex:"half"};for(let o of e)typeof o=="string"||o instanceof URL||o instanceof URLSearchParams?n.url=W(n.url,o):o&&(o instanceof FormData||o instanceof ReadableStream||o instanceof Blob||o instanceof ArrayBuffer||o instanceof DataView)?n.body=o:o&&typeof o=="object"&&Object.assign(n,he(o,n));let t=n.body;t&&typeof t=="object"&&!(t instanceof String)&&!(t instanceof ReadableStream)&&!(t instanceof Blob)&&!(t instanceof ArrayBuffer)&&!(t instanceof DataView)&&!(t instanceof FormData)&&!(t instanceof URLSearchParams)&&(typeof TypedArray>"u"||!(t instanceof TypedArray))&&(n.body=JSON.stringify(t));let r=new Request(n.url,n);return Object.freeze(r),new Proxy(r,{get(o,i,u){switch(i){case Symbol.metroSource:return o;case Symbol.metroProxy:return!0;case"with":return function(...f){return t&&f.unshift({body:t}),K(o,...f)};case"body":if(t||(t=o.body),t)return t[Symbol.metroProxy]?t:q(t,o);break}return o[i]instanceof Function?o[i].bind(o):o[i]}})}function ne(e,n){let t=n||{};!t.url&&n.url&&(t.url=n.url);for(let r of["status","statusText","headers","body","url","type","redirected"])typeof e[r]=="function"?e[r](t[r],t):typeof e[r]<"u"&&(r=="url"?t.url=new URL(e.url,t.url||"https://localhost/"):t[r]=e[r]);return t}function G(...e){let n={};for(let r of e)typeof r=="string"?n.body=r:r instanceof Response?Object.assign(n,ne(r,n)):r&&typeof r=="object"&&(r instanceof FormData||r instanceof Blob||r instanceof ArrayBuffer||r instanceof DataView||r instanceof ReadableStream||r instanceof URLSearchParams||r instanceof String||typeof TypedArray<"u"&&r instanceof TypedArray?n.body=r:Object.assign(n,ne(r,n)));let t=new Response(n.body,n);return Object.freeze(t),new Proxy(t,{get(r,o,i){switch(o){case Symbol.metroProxy:return!0;case Symbol.metroSource:return r;case"with":return function(...u){return G(r,...u)};case"body":return n.body?n.body[Symbol.metroProxy]?n.body:q(n.body,r):q("",r);case"ok":return r.status>=200&&r.status<400;case"headers":return r.headers;default:if(o in n&&o!="toString")return n[o];if(o in r&&o!="toString")return typeof r[o]=="function"?function(...u){return r[o].apply(r,u)}:r[o];break}}})}function oe(e,n){typeof n=="function"?n(e.searchParams,e):(n=new URLSearchParams(n),n.forEach((t,r)=>{e.searchParams.append(r,t)}))}function W(...e){let n=["hash","host","hostname","href","password","pathname","port","protocol","username","search","searchParams"],t=new URL("https://localhost/");for(let r of e)if(typeof r=="string"||r instanceof String)t=new URL(r,t);else if(r instanceof URL||typeof Location<"u"&&r instanceof Location)t=new URL(r);else if(r instanceof URLSearchParams)oe(t,r);else if(r&&typeof r=="object")for(let o in r)if(o=="search")typeof r.search=="function"?r.search(t.search,t):t.search=new URLSearchParams(r.search);else if(o=="searchParams")oe(t,r.searchParams);else{if(!n.includes(o))throw k("metro.url: unknown url parameter "+B+"url/unknown-param-name/",o);if(typeof r[o]=="function")r[o](t[o],t);else if(typeof r[o]=="string"||r[o]instanceof String||typeof r[o]=="number"||r[o]instanceof Number||typeof r[o]=="boolean"||r[o]instanceof Boolean)t[o]=""+r[o];else if(typeof r[o]=="object"&&r[o].toString)t[o]=r[o].toString();else throw k("metro.url: unsupported value for "+o+" "+B+"url/unsupported-param-value/",e[o])}else throw k("metro.url: unsupported option value "+B+"url/unsupported-option-value/",r);return Object.freeze(t),new Proxy(t,{get(r,o,i){switch(o){case Symbol.metroProxy:return!0;case Symbol.metroSource:return r;case"with":return function(...u){return W(r,...u)}}return r[o]instanceof Function?r[o].bind(r):r[o]}})}function ie(...e){var n=new FormData;for(let t of e)if(t instanceof FormData)for(let r of t.entries())n.append(r[0],r[1]);else if(t&&typeof t=="object")for(let r of Object.entries(t))if(Array.isArray(r[1]))for(let o of r[1])n.append(r[0],o);else n.append(r[0],r[1]);else throw new k("metro.formdata: unknown option type, only FormData or Object supported",t);return Object.freeze(n),new Proxy(n,{get:(t,r,o)=>{switch(r){case Symbol.metroProxy:return!0;case Symbol.metroSource:return t;case"with":return function(...i){return ie(t,...i)}}return t[r]instanceof Function?t[r].bind(t):t[r]}})}var M={error:(e,...n)=>{console.error("\u24C2\uFE0F  ",e,...n)},info:(e,...n)=>{console.info("\u24C2\uFE0F  ",e,...n)},group:e=>{console.group("\u24C2\uFE0F  "+e)},groupEnd:e=>{console.groupEnd("\u24C2\uFE0F  "+e)}};function k(e,...n){return M.error(e,...n),new Error(e,...n)}var me={add(e,n){E.tracers[e]=n},delete(e){delete E.tracers[e]},clear(){E.tracers={}},group(){let e=0;return{request:(n,t)=>{e++,M.group(e),M.info(n?.url,n,t)},response:(n,t)=>{M.info(n?.body?n.body[Symbol.metroSource]:null,n,t),M.groupEnd(e),e--}}}};function j(e){return e=Object.assign({reviver:null,replacer:null,space:""},e),async(n,t)=>{["POST","PUT","PATCH","QUERY"].includes(n.method)?(n=n.with({headers:{"Content-Type":"application/json",Accept:"application/json"}}),n.body&&typeof n.body[Symbol.metroSource]=="object"&&(n=n.with({body:JSON.stringify(n.body[Symbol.metroSource],e.replacer,e.space)}))):n=n.with({headers:{Accept:"application/json"}});let r=await t(n),o=await r.text(),i=JSON.parse(o,e.reviver);return r.with({body:i})}}function A(e){return async(n,t)=>{let r=await t(n);if(!r.ok)if(e&&typeof e[r.status]=="function")r=e[r.status].apply(r,n);else throw new Error(r.status+": "+r.statusText,{cause:r});return r}}var se=Object.assign({},X,{mw:{jsonmw:j,thrower:A}});window.metro=se;var d=se;globalThis.assertEnabled=!1;function v(e,n){if(globalThis.assertEnabled){let t=g(e,n);if(t)throw console.error("\u{1F170}\uFE0F  Assertions failed because of:",t,"in this source:",e),new Error("Assertions failed",{cause:{problems:t,source:e}})}}function s(e){return function(t,r,o){if(typeof t<"u"&&t!=null&&typeof e<"u")return g(t,e,r,o)}}function _(e){return function(t,r,o){return t==null||typeof t>"u"?m("data is required",t,e||"any value",o):typeof e<"u"?g(t,e,r,o):!1}}function C(e){return function(t,r,o){return t==null||typeof t>"u"?(console.warn("data does not contain recommended value",t,e,o),!1):g(t,e,r,o)}}function y(...e){return function(t,r,o){for(let i of e)if(!g(t,i,r,o))return!1;return m("data does not match oneOf patterns",t,e,o)}}function U(...e){return function(t,r,o){if(!Array.isArray(t))return m("data is not an array",t,"anyOf",o);for(let i of t)if(y(...e)(i))return m("data does not match anyOf patterns",i,e,o);return!1}}function ae(...e){return function(t,r,o){let i=[];for(let u of e)i=i.concat(g(t,u,r,o));if(i=i.filter(Boolean),i.length)return m("data does not match all given patterns",t,e,o,i)}}function h(e,n,t){try{e instanceof URL&&(e=e.href);let r=new URL(e);if(r.href!=e&&!(r.href+"/"==e||r.href==e+"/"))return m("data is not a valid url",e,"validURL",t)}catch{return m("data is not a valid url",e,"validURL",t)}}function ce(e,n,t){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))return m("data is not a valid email",e,"validEmail",t)}function z(e){return function(t,r,o){if(!(t instanceof e))return m("data is not an instanceof pattern",t,e,o)}}function F(e){return function(t,r,o){if(!g(t,e,r,o))return m("data matches pattern, when required not to",t,e,o)}}function g(e,n,t,r=""){t||(t=e);let o=[];if(n===Boolean)typeof e!="boolean"&&!(e instanceof Boolean)&&o.push(m("data is not a boolean",e,n,r));else if(n===Number)typeof e!="number"&&!(e instanceof Number)&&o.push(m("data is not a number",e,n,r));else if(n===String)typeof e!="string"&&!(e instanceof String)&&o.push(m("data is not a string",e,n,r)),e==""&&o.push(m("data is an empty string, which is not allowed",e,n,r));else if(n instanceof RegExp)if(Array.isArray(e)){let i=e.findIndex((u,f)=>g(u,n,t,r+"["+f+"]"));i>-1&&o.push(m("data["+i+"] does not match pattern",e[i],n,r+"["+i+"]"))}else typeof e>"u"?o.push(m("data is undefined, should match pattern",e,n,r)):n.test(e)||o.push(m("data does not match pattern",e,n,r));else if(n instanceof Function){let i=n(e,t,r);i&&(Array.isArray(i)?o=o.concat(i):o.push(i))}else if(Array.isArray(n)){Array.isArray(e)||o.push(m("data is not an array",e,[],r));for(let i of n)for(let u of e.keys()){let f=g(e[u],i,t,r+"["+u+"]");Array.isArray(f)?o=o.concat(f):f&&o.push(f)}}else if(n&&typeof n=="object")if(Array.isArray(e)){let i=e.findIndex((u,f)=>g(u,n,t,r+"["+f+"]"));i>-1&&o.push(m("data["+i+"] does not match pattern",e[i],n,r+"["+i+"]"))}else if(!e||typeof e!="object")o.push(m("data is not an object, pattern is",e,n,r));else if(e instanceof URLSearchParams&&(e=Object.fromEntries(e)),n instanceof Function){let i=g(e,n,t,r);i&&(o=o.concat(i))}else for(let[i,u]of Object.entries(n)){let f=g(e[i],u,t,r+"."+i);f&&(o=o.concat(f))}else n!=e&&o.push(m("data and pattern are not equal",e,n,r));return o.length?o:!1}function m(e,n,t,r,o){let i={message:e,found:n,expected:t,path:r};return o&&(i.problems=o),i}var I=(...e)=>(n,t)=>e.filter(r=>t.hasOwnKey(r)).length>0?!1:m("root data must have all of",t,e),R=(...e)=>n=>Array.isArray(n)&&e.filter(t=>!n.includes(t)).length==0?!1:m("data must be an array which includes",n,e);var S=["HS256","HS384","HS512","RS256","RS384","RS512","ES256","ES384","ES512"],$=["client_secret_post","client_secret_basic","client_secret_jwt","private_key_jwt"];async function H(e={}){v(e,{client:s(z(d.client().constructor)),issuer:_(h)});let n={client:d.client().with(A()).with(j()),requireDynamicRegistration:!1};e=Object.assign({},n,e);let t=!1;function r(x){return t}let o={issuer:_(ae(e.issuer,r)),authorization_endpoint:_(h),token_endpoint:_(h),userinfo_endpoint:C(h),jwks_uri:_(h),registration_endpoint:e.requireDynamicRegistration?_(h):C(h),scopes_supported:C(R("openid")),response_types_supported:e.requireDynamicRegistration?_(R("code","id_token","id_token token")):_([]),response_modes_supported:s([]),grant_types_supported:e.requireDynamicRegistration?s(R("authorization_code")):s([]),acr_values_supported:s([]),subject_types_supported:_([]),id_token_signing_alg_values_supported:_(R("RS256")),id_token_encryption_alg_values_supported:s([]),id_token_encryption_enc_values_supported:s([]),userinfo_signing_alg_values_supported:s([]),userinfo_encryption_alg_values_supported:s([]),userinfo_encryption_enc_values_supported:s([]),request_object_signing_alg_values_supported:s(R("RS256")),request_object_encryption_alg_values_supported:s([]),request_object_encryption_enc_values_supported:s([]),token_endpoint_auth_methods_supported:s(U(...$)),token_endpoint_auth_signing_alg_values_supported:s(R("RS256"),F(R("none"))),display_values_supported:s(U("page","popup","touch","wap")),claim_types_supported:s(U("normal","aggregated","distributed")),claims_supported:C([]),service_documentation:s(h),claims_locales_supported:s([]),ui_locales_supported:s([]),claims_parameter_supported:s(Boolean),request_parameter_supported:s(Boolean),request_uri_parameter_supported:s(Boolean),op_policy_uri:s(h),op_tos_uri:s(h)},i=d.url(e.issuer,".well-known/openid-configuration"),f=(await e.client.get(i)).body[Symbol.metroSource];return v(f,o),v(f.issuer,e.issuer),f}async function N(e){let n={redirect_uris:_([h]),response_types:s([]),grant_types:s(U("authorization_code","refresh_token")),application_type:s(y("native","web")),contacts:s([ce]),client_name:s(String),logo_uri:s(h),client_uri:s(h),policy_uri:s(h),tos_uri:s(h),jwks_uri:s(h,F(I("jwks"))),jwks:s(h,F(I("jwks_uri"))),sector_identifier_uri:s(h),subject_type:s(String),id_token_signed_response_alg:s(y(...S)),id_token_encrypted_response_alg:s(y(...S)),id_token_encrypted_response_enc:s(y(...S),I("id_token_encrypted_response_alg")),userinfo_signed_response_alg:s(y(...S)),userinfo_encrypted_response_alg:s(y(...S)),userinfo_encrypted_response_enc:s(y(...S),I("userinfo_encrypted_response_alg")),request_object_signing_alg:s(y(...S)),request_object_encryption_alg:s(y(...S)),request_object_encryption_enc:s(y(...S)),token_endpoint_auth_method:s(y(...$)),token_endpoint_auth_signing_alg:s(y(...S)),default_max_age:s(Number),require_auth_time:s(Boolean),default_acr_values:s([String]),initiate_login_uri:s([h]),request_uris:s([h])};v(e,{client:s(z(d.client().constructor)),registration_endpoint:h,client_info:n});let t={client:d.client().with(A()).with(j())};e=Object.assign({},t,e);let r=await e.client.post(e.registration_endpoint,{body:e.client_info}),o=r.body;if(!o.client_id||!o.client_secret)throw d.metroError("metro.oidc: Error: dynamic registration of client failed, no client_id or client_secret returned",r);return e.client_info=Object.assign(e.client_info,o),e.client_info}globalThis.assertEnabled=!1;var J=(e,n)=>{if(globalThis.assertEnabled){let t=L(e,n);if(t)throw new Z("Assertions failed",t,e)}};var V=e=>n=>L(n,e);function Q(e){try{if(e instanceof URL&&(e=e.href),new URL(e).href!=e)return w("data is not a valid url",e,"validURL")}catch{return w("data is not a valid url",e,"validURL")}return!1}function L(e,n,t){t||(t=e);let r=[];if(n===Boolean)typeof e!="boolean"&&r.push(w("data is not a boolean",e,n));else if(n===Number)typeof e!="number"&&r.push(w("data is not a number",e,n));else if(n instanceof RegExp)if(Array.isArray(e)){let o=e.findIndex(i=>L(i,n,t));o>-1&&r.push(w("data["+o+"] does not match pattern",e[o],n))}else n.test(e)||r.push(w("data does not match pattern",e,n));else if(n instanceof Function)n(e,t)&&r.push(w("data does not match function",e,n));else if(Array.isArray(n)){Array.isArray(e)||r.push(w("data is not an array",e,[]));for(p of n){let o=L(e,p,t);Array.isArray(o)?r.concat(o):o&&r.push(o)}}else if(n&&typeof n=="object")if(Array.isArray(e)){let o=e.findIndex(i=>L(i,n,t));o>-1&&r.push(w("data["+o+"] does not match pattern",e[o],n))}else if(!e||typeof e!="object")r.push(w("data is not an object, pattern is",e,n));else{e instanceof URLSearchParams&&(e=Object.fromEntries(e));let o=r[r.length-1];for(let[i,u]of Object.entries(n)){let f=L(e[i],u,t);f&&((!o||typeof o=="string")&&(o={},r.push(w(o,e[i],u))),o[i]=f.problems)}}else n!=e&&r.push(w("data and pattern are not equal",e,n));return r.length?r:!1}var Z=class extends Error{constructor(n,t,...r){super(n),this.problems=t,this.details=r}};function w(e,n,t){return{message:e,found:n,expected:t}}function fe(e){let n,t;if(typeof localStorage<"u")n={get:()=>localStorage.getItem("metro/state:"+e),set:r=>localStorage.setItem("metro/state:"+e,r),has:()=>localStorage.getItem("metro/state:"+e)!==null},t={get:r=>localStorage.getItem(e+":"+r),set:(r,o)=>localStorage.setItem(e+":"+r,o),has:r=>localStorage.getItem(e+":"+r)!==null};else{let r=new Map;n={get:()=>r.get("metro/state:"+e),set:o=>r.set("metro/state:"+e,o),has:()=>r.has("metro/state:"+e)},t=new Map}return{state:n,tokens:t}}function ee(e){let n={client:d.client(),force_authorization:!1,site:"default",oauth2_configuration:{authorization_endpoint:"/authorize",token_endpoint:"/token",redirect_uri:globalThis.document?.location.href,grant_type:"authorization_code",code_verifier:Y.generateCodeVerifier(64)},callbacks:{authorize:async a=>(window.location.href!=a.href&&window.location.replace(a.href),!1)}};J(e,{});let t=Object.assign({},n.oauth2_configuration,e?.oauth2_configuration);e=Object.assign({},n,e),e.oauth2_configuration=t;let r=fe(e.site);e.tokens||(e.tokens=r.tokens),e.state||(e.state=r.state),J(e,{oauth2_configuration:{client_id:V(/.+/),grant_type:"authorization_code",authorization_endpoint:V(Q),token_endpoint:V(Q),redirect_uri:V(Q)}});for(let a in t)switch(a){case"access_token":case"authorization_code":case"refresh_token":e.tokens.set(a,t[a]);break}return async function(a,l){if(e.force_authorization)return o(a,l);let c;try{if(c=await l(a),c.ok)return c}catch(b){switch(c.status){case 400:case 401:return o(a,l)}throw b}return c};async function o(a,l){if(i(),e.tokens.has("access_token")){if(T(a))return await f()?o(a,l):d.response("false");{let c=e.tokens.get("access_token");return a=d.request(a,{headers:{Authorization:c.type+" "+c.value}}),l(a)}}else{try{if(!await u())return d.response("false")}catch(c){throw console.log("caught",c),c}return o(a,l)}}function i(){if(typeof window<"u"&&window?.location){let a=d.url(window.location),l,c,b;if(a.searchParams.has("code"))b=a.searchParams,a=a.with({search:""}),history.pushState({},"",a.href);else if(a.hash){let P=a.hash.substr(1);b=new URLSearchParams("?"+P),a=a.with({hash:""}),history.pushState({},"",a.href)}if(b){l=b.get("code"),c=b.get("state");let P=e.state.get("metro/state");if(!c||c!==P)return;l&&e.tokens.set("authorization_code",l)}}}async function u(){if(t.grant_type==="authorization_code"&&!e.tokens.has("authorization_code")){let b=x();if(!e.callbacks.authorize||typeof e.callbacks.authorize!="function")throw d.metroError("oauth2mw: oauth2 with grant_type:authorization_code requires a callback function in client options.options.callbacks.authorize");let P=await e.callbacks.authorize(b);if(P)e.tokens.set("authorization_code",P);else return!1}let a=O(),l=await e.client.post(a);if(!l.ok)throw d.metroError("OAuth2mw: fetch access_token: "+l.status+": "+l.statusText,{cause:a});let c=await l.json();if(e.tokens.set("access_token",{value:c.access_token,expires:D(c.expires_in),type:c.token_type,scope:c.scope}),c.refresh_token){let b={value:c.refresh_token};e.tokens.set("refresh_token",b)}return c}async function f(){let a=O("refresh_token"),l=await e.client.post(a);if(!l.ok)throw d.metroError("OAuth2mw: refresh access_token: "+l.status+": "+l.statusText,{cause:a});let c=await l.json();if(e.tokens.set("access_token",{value:c.access_token,expires:D(c.expires_in),type:c.token_type,scope:c.scope}),c.refresh_token){let b={value:c.refresh_token};e.tokens.set("refresh_token",b)}else return!1;return c}function x(){if(!t.authorization_endpoint)throw d.metroError("oauth2mw: Missing options.oauth2_configuration.authorization_endpoint");let a=d.url(t.authorization_endpoint,{hash:""});J(t,{client_id:/.+/,redirect_uri:/.+/,scope:/.*/});let l={response_type:"code",client_id:t.client_id,client_secret:t.client_secret,redirect_uri:t.redirect_uri,state:t.state||Y.createState(40)};return e.state.set(l.state),t.code_verifier&&(delete l.client_secret,l.code_challenge=Y.generateCodeChallenge(t.code_verifier),l.code_challenge_method="S256"),t.scope&&(l.scope=t.scope),d.url(a,{search:l})}function O(a=null){if(J(t,{client_id:/.+/,redirect_uri:/.+/}),!t.token_endpoint)throw d.metroError("oauth2mw: Missing options.endpoints.token url");let l=d.url(t.token_endpoint,{hash:""}),c={grant_type:a||t.grant_type,client_id:t.client_id};switch(t.code_verifier?c.code_verifier=t.code_verifier:c.client_secret=t.client_secret,t.scope&&(c.scope=t.scope),t.grant_type){case"authorization_code":c.redirect_uri=t.redirect_uri,c.code=e.tokens.get("authorization_code");break;case"client_credentials":break;case"refresh_token":c.refresh_token=t.refresh_token;break;default:throw new Error("Unknown grant_type: ".oauth2.grant_type)}return d.request(l,{method:"POST",body:new URLSearchParams(c)})}function T(a){if(a.oauth2&&a.options.tokens&&a.options.tokens.has("access_token")){let l=new Date,c=a.options.tokens.get("access_token");return l.getTime()>c.expires.getTime()}return!1}function D(a){if(a instanceof Date)return new Date(a.getTime());if(typeof a=="number"){let l=new Date;return l.setSeconds(l.getSeconds()+a),l}throw new TypeError("Unknown expires type "+a)}}var Y={generateCodeVerifier:function(e=64){let n=new Uint8Array(e);return globalThis.crypto.getRandomValues(n),n.toString("hex")},generateCodeChallenge:async function(e){let n=Y.base64url_encode(e),r=new TextEncoder().encode(n);return await globalThis.crypto.subtle.digest("SHA-256",r)},base64url_encode:function(e){let n=Array.from(new Uint8Array(e),t=>String.fromCharCode(t)).join("");return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")},createState:function(e){let n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t="",r=0;for(;r<e;)t+=n.charAt(Math.floor(Math.random()*n.length)),r++;return t}};function te(e){let n;if(typeof localStorage<"u")n={get:t=>JSON.parse(localStorage.getItem("metro/oidc:"+e+":"+t)),set:(t,r)=>localStorage.setItem("metro/oidc:"+e+":"+t,JSON.stringify(r)),has:t=>localStorage.getItem("metro/oidc:"+e+":"+t)!==null};else{let t=new Map;n={get:r=>JSON.parse(t.get("metro/oidc:"+e+":"+r)||null),set:(r,o)=>t.set("metro/oidc:"+e+":"+r,JSON.stringify(o)),has:r=>t.has("metro/oidc:"+e+":"+r)}}return n}function re(e={}){let n={client:d.client(),force_authorization:!1};return e=Object.assign({},n,e),v(e,{client:_(z(d.client().constructor)),client_info:_(),issuer:_(h),oauth2:s({}),openid_configuration:s()}),e.store||(e.store=te(e.issuer)),!e.openid_configuration&&e.store.has("openid_configuration")&&(e.openid_configuration=e.store.get("openid_configuration")),!e.client_info.client_id&&e.store.has("client_info")&&(e.client_info=e.store.get("client_info")),async(t,r)=>{let o;if(!e.force_authorization){try{o=await r(t)}catch(f){if(o.status!=401&&o.status!=403)throw f}if(o.ok||o.status!=401&&o.status!=403)return o}if(e.openid_configuration||(e.openid_configuration=await H({issuer:e.issuer}),e.store.set("openid_configuration",e.openid_configuration)),!e.client_info?.client_id){if(v(e.client_info?.client_name,_()),!e.openid_configuration.registration_endpoint)throw d.metroError("metro.oidcmw: Error: issuer "+e.issuer+" does not support dynamic client registration, but you haven't specified a client_id");e.client_info=await N({registration_endpoint:e.openid_configuration.registration_endpoint,client_info:e.client_info}),e.store.set("client_info",e.client_info)}let i=Object.assign({site:e.issuer,client:e.client,force_authorization:!0,oauth2_configuration:{client_id:e.client_info.client_id,client_secret:e.client_info.client_secret,code_verifier:!1,grant_type:"authorization_code",authorization_endpoint:e.openid_configuration.authorization_endpoint,token_endpoint:e.openid_configuration.token_endpoint,scope:e.openid_configuration.scope||"openid",redirect_uri:e.client_info.redirect_uris[0]}});return o=await e.client.with(e.issuer).with(ee(i)).fetch(t),o}}var _e={discover:H,register:N,oidcmw:re};globalThis.oidc=_e;})();
//# sourceMappingURL=browser.js.map
