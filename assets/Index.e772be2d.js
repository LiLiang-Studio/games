import{g as t,d as s,b as i,c as e}from"./utils.eaeab82e.js";import{p as o,e as h,o as n,c as r,f as a,t as l,w as d}from"./vendor.eda28678.js";var c,u,v,w;(u=c||(c={}))[u.UP=0]="UP",u[u.RIGHT=1]="RIGHT",u[u.DOWN=2]="DOWN",u[u.LEFT=3]="LEFT",(w=v||(v={}))[w.READY=0]="READY",w[w.PLAYING=1]="PLAYING",w[w.PAUSE=2]="PAUSE",w[w.END=3]="END";class p{constructor(t,s){this.row=t,this.col=s}draw(t,s,i){t.fillRect((s+i)*this.col+i,(s+i)*this.row+i,s,s)}}class f{constructor(t){this.coords=t,this.dir=0,this.speed=1}draw(t,s,i){t.save(),t.fillStyle="#000",this.coords.forEach((e=>{e.draw(t,s,i)})),t.restore()}moveFunc(t){const{coords:s}=this,{row:i,col:e}=s[0];if(t.onBefore(this.dir,i,e))this.stop();else{const o={0:[i-1,e],1:[i,e+1],2:[i+1,e],3:[i,e-1]}[this.dir];s.unshift(new p(...o)),this.coords.pop(),t.onAfter(s)}}move(t){this.tid=setTimeout((()=>{const{coords:s}=this,{row:i,col:e}=s[0];if(t.onBefore(this.dir,i,e))this.stop();else{const o={0:[i-1,e],1:[i,e+1],2:[i+1,e],3:[i,e-1]}[this.dir];s.unshift(new p(...o)),this.coords.pop(),t.onAfter(s),this.move(t)}}),Math.ceil(300/this.speed))}stop(){clearTimeout(this.tid),this.tid=null}eat(t,s){const{row:i,col:e}=t,{row:o,col:h}=this.coords[0];let n;n=0===this.dir?o===i+1&&h===e:1===this.dir?o===i&&h===e-1:2===this.dir?o===i-1&&h===e:o===i&&h===e+1,n&&(this.coords.unshift(new p(i,e)),this.coords.length%10==0&&(this.speed+=.2),s&&s())}}class m extends p{draw(t,s,i){t.save(),t.fillStyle="#00f",super.draw(t,s,i),t.restore()}}class g{constructor(s,i){this.cvs=s,this.callbacks=i,this.rows=20,this.cols=20,this.lineWidth=1,this.blockSize=0,this.status=0,this.ctx=s.getContext("2d"),this.pixRatio=t(this.ctx),this.lineWidth=this.pixRatio,this.addListeners(),this.gridCvs=this.createGridCvs(s)}addListeners(){this.cvs.addEventListener("click",this.onClick.bind(this)),window.addEventListener("resize",this.onResize.bind(this))}removeListeners(){this.cvs.removeEventListener("click",this.onClick),window.removeEventListener("resize",this.onResize)}createGridCvs(t){const s=document.createElement("canvas"),i=t.parentElement;s.style.position="absolute",s.style.top="0",s.style.left="0",s.style.width="100%",s.style.pointerEvents="none";const e=window.getComputedStyle(i);return console.log(e.position),["absolute","relative","fixed"].indexOf(e.position)<0&&(i.style.position="relative"),i.appendChild(s),s}onClick(t){const s=(t.offsetX||t.pageX)*this.pixRatio,i=(t.offsetY||t.pageY)*this.pixRatio,e=this.snake,{row:o,col:h}=e.coords[0],{blockSize:n,lineWidth:r}=this,a=(n+r)*h+r,l=(n+r)*o+r;[0,2].includes(e.dir)?s>a+n?e.dir=1:s<a&&(e.dir=3):[1,3].includes(e.dir)&&(i>l+n?e.dir=2:i<l&&(e.dir=0)),this.eatFood()}onResize(){this.updateSize(),this.drawUI(),this.drawGrid()}init(t,s){this.status=0,this.updateSize(t,s),this.snake=this.createSnake(),this.food=this.createFood(),this.drawUI(),this.drawGrid()}start(t,s){var i;0!==this.status&&this.init(t,s),this.status=1,null==(i=this.snake)||i.move(this.snakeMoveHandler())}unpause(){var t;2===this.status&&(this.status=1,null==(t=this.snake)||t.move(this.snakeMoveHandler()))}pause(){var t;1===this.status&&(this.status=2,null==(t=this.snake)||t.stop())}updateSize(t,s){var i;const{lineWidth:e}=this;this.cols=s||t||this.cols;const o=this.cvs.offsetWidth*this.pixRatio;this.blockSize=(o-e*(this.cols+1))/this.cols;const h=(null==(i=this.cvs.parentElement)?void 0:i.offsetHeight)*this.pixRatio,n=Math.floor((h-e)/(this.blockSize+e));this.rows=Math.min(n,t||this.rows),this.cvs.width=this.gridCvs.width=o,this.cvs.height=this.gridCvs.height=(e+this.blockSize)*this.rows+e}createSnake(){const t=Math.floor(this.rows/2),s=Math.floor(this.cols/2);return new f([new p(t-1,s),new p(t,s),new p(t+1,s)])}snakeMoveHandler(){return{onBefore:(t,i,e)=>{var o;const h=0===t&&0===i||1===t&&e===this.cols-1||2===t&&i===this.rows-1||3===t&&0===e;return h&&(this.status=3,s(this.callbacks.onOver,(null==(o=this.snake)?void 0:o.coords.length)-3)),h},onAfter:()=>{this.drawUI(),this.eatFood()}}}createFood(){var t;const s=(null==(t=this.snake)?void 0:t.coords.map((t=>`${t.row}:${t.col}`)))||[],o=i(this.rows).reduce(((t,s,e)=>t.concat(i(this.cols).map(((t,s)=>[e,s])))),[]).filter((t=>s.indexOf(`${t[0]}:${t[1]}`)<0));return new m(...o[e(0,o.length-1)])}eatFood(){var t;null==(t=this.snake)||t.eat(this.food,(()=>{this.food=this.createFood(),this.drawUI()}))}drawUI(){var t,s;const{cvs:i,ctx:e,blockSize:o,lineWidth:h}=this;e.clearRect(0,0,i.width,i.height),null==(t=this.snake)||t.draw(e,o,h),null==(s=this.food)||s.draw(e,o,h)}drawGrid(){const{width:t,height:s}=this.gridCvs,{lineWidth:e,blockSize:o}=this,h=this.gridCvs.getContext("2d");h.lineWidth=e,h.strokeStyle="#888",i(this.rows+1).forEach(((s,i)=>{const n=(e+o)*i+e/2;h.moveTo(0,n),h.lineTo(t,n)})),i(this.cols+1).forEach(((t,i)=>{const n=(e+o)*i+e/2;h.moveTo(n,0),h.lineTo(n,s)})),h.stroke()}}var k={data:()=>({game:null,isStop:!1}),mounted(){const t=new g(this.$refs.ui,{onOver:t=>{alert(`游戏结束！你共吃掉${t}块食物，请点击[开始游戏]按钮，重新开始游戏`)}});t.init(),this.game=t},unmounted(){this.game&&(this.game.removeListeners(),this.game=null)},methods:{onTogglePause(){var t,s;this.isStop=!this.isStop,this.isStop?null==(t=this.game)||t.pause():null==(s=this.game)||s.unpause()},onStart(){var t;null==(t=this.game)||t.start(),this.isStop=!1}}};const S=d();o("data-v-eff9d4b8");const b={class:"container"},E={class:"dashboard"},x=a("div",{class:"title"},"经典贪吃蛇",-1),C={class:"btns"},z={class:"game-ui"},R={ref:"ui"};h();const T=S(((t,s,i,e,o,h)=>(n(),r("div",b,[a("div",E,[x,a("div",C,[a("button",{onClick:s[1]||(s[1]=(...t)=>h.onStart&&h.onStart(...t))},"开始游戏"),a("button",{onClick:s[2]||(s[2]=(...t)=>h.onTogglePause&&h.onTogglePause(...t))},l(o.isStop?"继 续":"暂 停"),1)])]),a("div",z,[a("canvas",R,null,512)])]))));k.render=T,k.__scopeId="data-v-eff9d4b8";export default k;
