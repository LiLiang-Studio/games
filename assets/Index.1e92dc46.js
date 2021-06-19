var t,s,i=Object.defineProperty,o=Object.defineProperties,e=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,h=(t,s,o)=>s in t?i(t,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[s]=o;import{e as n,g as l,i as d,b as w,d as b}from"./utils.44e4807a.js";import{p,e as g,o as m,c as u,f as v,w as f}from"./vendor.eda28678.js";(s=t||(t={}))[s.UP=0]="UP",s[s.RIGHT=1]="RIGHT",s[s.DOWN=2]="DOWN",s[s.LEFT=3]="LEFT";class k{constructor(t,s={}){this.cvs=t,this.callbacks=s,this.bWidth=0,this.bHeight=0,this.rows=3,this.cols=3,this.blocks=[],this.createNumAnimation=n(),this.ctx=t.getContext("2d"),this.pixRatio=l(this.ctx),this.bSpace=2*this.pixRatio,this.addListeners()}async start(t={}){t.rows&&(this.rows=t.rows),this.cols=t.cols||t.rows||this.cols,this.updateSize();let{img:s}=t;if(s)this.img=await d(s);else if(!this.img)throw Error("Missing option: img");this.blocks=this.genBlocks(),this.drawUI()}updateSize(){var t;const s=this.cvs.offsetWidth*this.pixRatio,i=(null==(t=this.cvs.parentElement)?void 0:t.offsetHeight)*this.pixRatio;this.bWidth=(s-(this.cols-1)*this.bSpace)/this.cols,this.bHeight=s*(this.rows/this.cols)<i?this.bWidth:(i-(this.rows-1)*this.bSpace)/this.rows,this.cvs.width=s,this.cvs.height=this.bHeight*this.rows+(this.rows-1)*this.bSpace}drawUI(){const{ctx:t,cvs:s,bWidth:i,bHeight:o}=this;t.clearRect(0,0,s.width,s.height),this.blocks.filter((t=>!t.hide)).forEach((s=>{t.drawImage(this.img,s.dx,s.dy,s.dw,s.dh,s.x,s.y,i,o)}))}genBlocks(){const{img:t,rows:s,cols:i,bSpace:n}=this,l=null==t?void 0:t.naturalWidth,d=null==t?void 0:t.naturalHeight,b=l/i,p=d/s,g=w(s).reduce(((t,s,o)=>t.concat(w(i).map(((t,s)=>({dw:b,dh:p,row:o,col:s,_row:o,_col:s,dx:b*s,dy:p*o,x:(this.bWidth+n)*s,y:(this.bHeight+n)*o}))))),[]),m=g.pop();m&&(m.hide=!0);const u=g.map((t=>({row:t.row,col:t.col,x:t.x,y:t.y}))).sort((()=>Math.random()-.5));return g.map(((t,s)=>{const i=u[s];return n=((t,s)=>{for(var i in s||(s={}))c.call(s,i)&&h(t,i,s[i]);if(r)for(var i of r(s))a.call(s,i)&&h(t,i,s[i]);return t})({},t),l={x:i.x,y:i.y,row:i.row,col:i.col},o(n,e(l));var n,l})).concat(m)}updateBlockCoords(){const{bSpace:t}=this;this.blocks.forEach((s=>{s.x=(this.bWidth+t)*s.col,s.y=(this.bHeight+t)*s.row}))}getCurBlock(t){const s=(t.offsetX||t.pageX)*this.pixRatio,i=(t.offsetY||t.pageY)*this.pixRatio,{bWidth:o,bHeight:e,bSpace:r}=this;return this.blocks.find((t=>{const c=(o+r)*t.col,a=(e+r)*t.row;return s>c&&s<c+o&&i>a&&i<a+e}))}isDone(){return this.blocks.every((t=>t.row===t._row&&t.col===t._col))}getSwapInfo(t){const{blocks:s}=this,i=s.find((s=>s.row===t.row-1&&s.col===t.col)),o=s.find((s=>s.row===t.row&&s.col===t.col+1)),e=s.find((s=>s.row===t.row+1&&s.col===t.col)),r=s.find((s=>s.row===t.row&&s.col===t.col-1));return i&&i.hide?{block:i,dir:0}:o&&o.hide?{block:o,dir:1}:e&&e.hide?{block:e,dir:2}:r&&r.hide?{block:r,dir:3}:void 0}moveBlock(t,{block:s,dir:i}){const o=()=>{this.drawUI(),this.isDone()&&b(this.callbacks.onDone)};if([0,2].includes(i)){const i=t.y,e=t.row;this.createNumAnimation(t.y,s.y,{onChange:s=>{t.y=s,this.drawUI()},onEnd:()=>{t.y=s.y,s.y=i,t.row=s.row,s.row=e,o()}})}else{const i=t.x,e=t.col;this.createNumAnimation(t.x,s.x,{onChange:s=>{t.x=s,this.drawUI()},onEnd:()=>{t.x=s.x,s.x=i,t.col=s.col,s.col=e,o()}})}}addListeners(){this.cvs.addEventListener("click",this.onClick.bind(this)),window.addEventListener("resize",this.onResize.bind(this))}removeListeners(){this.cvs.removeEventListener("click",this.onClick),window.removeEventListener("resize",this.onResize)}onClick(t){const s=this.getCurBlock(t);if(s){const t=this.getSwapInfo(s);t&&this.moveBlock(s,t)}}onResize(){this.updateSize(),this.updateBlockCoords(),this.drawUI()}}var x={data:()=>({game:null}),mounted(){this.game=new k(this.$refs.canvas,{onDone:()=>{var t;alert("恭喜你！挑战成功！"),null==(t=this.game)||t.start({rows:4,cols:4})}}),this.game.start({img:this.$refs.img})},unmounted(){var t;null==(t=this.game)||t.removeListeners()},methods:{onStart(){var t;null==(t=this.game)||t.start()}}};const y=f();p("data-v-7df0e98a");const S={class:"container"},E=v("header",null,"迷你拼图",-1),I={class:"tools"},R={ref:"img",src:"./assets/1.e9e06479.jpg"},C=v("span",{class:"spring"},null,-1),H={class:"btns"},O={class:"game-wrapper"},W={ref:"canvas"};g();const L=y(((t,s,i,o,e,r)=>(m(),u("section",S,[E,v("div",I,[v("img",R,null,512),C,v("div",H,[v("button",{onClick:s[1]||(s[1]=(...t)=>r.onStart&&r.onStart(...t))},"开始新游戏")])]),v("div",O,[v("canvas",W,null,512)])]))));x.render=L,x.__scopeId="data-v-7df0e98a";export default x;
