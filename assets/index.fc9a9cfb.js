import{o as e,c as t,r,a as n,b as o,d as s}from"./vendor.eda28678.js";const a={};let i;a.render=function(n,o){const s=r("router-view");return e(),t(s)};const d={},m=function(e,t){if(!t)return e();if(void 0===i){const e=document.createElement("link").relList;i=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in d)return;d[e]=!0;const t=e.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${r}`))return;const n=document.createElement("link");return n.rel=t?"stylesheet":i,t||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),t?new Promise(((e,t)=>{n.addEventListener("load",e),n.addEventListener("error",t)})):void 0}))).then((()=>e()))};var c=n({history:o(),routes:[{path:"/",component:()=>m((()=>import("./Home.a580ed00.js")),["./assets/Home.a580ed00.js","./assets/Home.d71a6d92.css","./assets/index.157cf2ba.js","./assets/vendor.eda28678.js"])},{path:"/:name",name:"game",component:()=>m((()=>import("./Game.37e92a7a.js")),["./assets/Game.37e92a7a.js","./assets/index.157cf2ba.js","./assets/vendor.eda28678.js"])}]});const l=s(a);l.use(c),l.mount("#app");export{m as _};
