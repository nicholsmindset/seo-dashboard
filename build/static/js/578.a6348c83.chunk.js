"use strict";(self.webpackChunkseo_content_dashboard=self.webpackChunkseo_content_dashboard||[]).push([[578],{5578:(r,e,t)=>{t.r(e),t.d(e,{default:()=>K});var a=t(9950),o=t(1277),n=t(2053),i=t(899),s=t(8089),l=t(704),d=t(2235),c=t(6491),u=t(8587),m=t(8168),b=t(2004),f=t(8465),h=t(8283),g=t(9269),x=t(4730),p=t(1676),v=t(9254),A=t(8463),y=t(1763),j=t(423);function w(r){return(0,j.Ay)("MuiLinearProgress",r)}(0,y.A)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var C=t(4414);const k=["className","color","value","valueBuffer","variant"];let S,P,$,B,I,R,L=r=>r;const q=(0,h.i7)(S||(S=L`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`)),M=(0,h.i7)(P||(P=L`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`)),T=(0,h.i7)($||($=L`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`)),z=(r,e)=>"inherit"===e?"currentColor":r.vars?r.vars.palette.LinearProgress[`${e}Bg`]:"light"===r.palette.mode?(0,g.a)(r.palette[e].main,.62):(0,g.e$)(r.palette[e].main,.5),N=(0,v.Ay)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.root,e[`color${(0,p.A)(t.color)}`],e[t.variant]]}})((r=>{let{ownerState:e,theme:t}=r;return(0,m.A)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:z(t,e.color)},"inherit"===e.color&&"buffer"!==e.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===e.variant&&{backgroundColor:"transparent"},"query"===e.variant&&{transform:"rotate(180deg)"})})),O=(0,v.Ay)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.dashed,e[`dashedColor${(0,p.A)(t.color)}`]]}})((r=>{let{ownerState:e,theme:t}=r;const a=z(t,e.color);return(0,m.A)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===e.color&&{opacity:.3},{backgroundImage:`radial-gradient(${a} 0%, ${a} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})}),(0,h.AH)(B||(B=L`
    animation: ${0} 3s infinite linear;
  `),T)),D=(0,v.Ay)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.bar,e[`barColor${(0,p.A)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar1Indeterminate,"determinate"===t.variant&&e.bar1Determinate,"buffer"===t.variant&&e.bar1Buffer]}})((r=>{let{ownerState:e,theme:t}=r;return(0,m.A)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===e.color?"currentColor":(t.vars||t).palette[e.color].main},"determinate"===e.variant&&{transition:"transform .4s linear"},"buffer"===e.variant&&{zIndex:1,transition:"transform .4s linear"})}),(r=>{let{ownerState:e}=r;return("indeterminate"===e.variant||"query"===e.variant)&&(0,h.AH)(I||(I=L`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),q)})),_=(0,v.Ay)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.bar,e[`barColor${(0,p.A)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar2Indeterminate,"buffer"===t.variant&&e.bar2Buffer]}})((r=>{let{ownerState:e,theme:t}=r;return(0,m.A)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==e.variant&&{backgroundColor:"inherit"===e.color?"currentColor":(t.vars||t).palette[e.color].main},"inherit"===e.color&&{opacity:.3},"buffer"===e.variant&&{backgroundColor:z(t,e.color),transition:"transform .4s linear"})}),(r=>{let{ownerState:e}=r;return("indeterminate"===e.variant||"query"===e.variant)&&(0,h.AH)(R||(R=L`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),M)})),H=a.forwardRef((function(r,e){const t=(0,A.b)({props:r,name:"MuiLinearProgress"}),{className:a,color:o="primary",value:n,valueBuffer:i,variant:s="indeterminate"}=t,l=(0,u.A)(t,k),d=(0,m.A)({},t,{color:o,variant:s}),c=(r=>{const{classes:e,variant:t,color:a}=r,o={root:["root",`color${(0,p.A)(a)}`,t],dashed:["dashed",`dashedColor${(0,p.A)(a)}`],bar1:["bar",`barColor${(0,p.A)(a)}`,("indeterminate"===t||"query"===t)&&"bar1Indeterminate","determinate"===t&&"bar1Determinate","buffer"===t&&"bar1Buffer"],bar2:["bar","buffer"!==t&&`barColor${(0,p.A)(a)}`,"buffer"===t&&`color${(0,p.A)(a)}`,("indeterminate"===t||"query"===t)&&"bar2Indeterminate","buffer"===t&&"bar2Buffer"]};return(0,f.A)(o,w,e)})(d),h=(0,x.I)(),g={},v={bar1:{},bar2:{}};if("determinate"===s||"buffer"===s)if(void 0!==n){g["aria-valuenow"]=Math.round(n),g["aria-valuemin"]=0,g["aria-valuemax"]=100;let r=n-100;h&&(r=-r),v.bar1.transform=`translateX(${r}%)`}else 0;if("buffer"===s)if(void 0!==i){let r=(i||0)-100;h&&(r=-r),v.bar2.transform=`translateX(${r}%)`}else 0;return(0,C.jsxs)(N,(0,m.A)({className:(0,b.A)(c.root,a),ownerState:d,role:"progressbar"},g,{ref:e},l,{children:["buffer"===s?(0,C.jsx)(O,{className:c.dashed,ownerState:d}):null,(0,C.jsx)(D,{className:c.bar1,ownerState:d,style:v.bar1}),"determinate"===s?null:(0,C.jsx)(_,{className:c.bar2,ownerState:d,style:v.bar2})]}))})),K=()=>{const r={pageViews:15234,averageTimeOnPage:"2:45",bounceRate:"35%",topKeywords:[{keyword:"SEO optimization",score:85},{keyword:"content strategy",score:75},{keyword:"digital marketing",score:70},{keyword:"keyword research",score:65}]};return(0,C.jsxs)(o.A,{maxWidth:"lg",children:[(0,C.jsx)(n.A,{variant:"h4",sx:{mb:4},children:"Content Analytics"}),(0,C.jsxs)(i.Ay,{container:!0,spacing:3,sx:{mb:4},children:[(0,C.jsx)(i.Ay,{item:!0,xs:12,sm:6,md:4,children:(0,C.jsx)(s.A,{children:(0,C.jsxs)(l.A,{children:[(0,C.jsx)(n.A,{color:"textSecondary",gutterBottom:!0,children:"Total Page Views"}),(0,C.jsx)(n.A,{variant:"h5",children:r.pageViews.toLocaleString()})]})})}),(0,C.jsx)(i.Ay,{item:!0,xs:12,sm:6,md:4,children:(0,C.jsx)(s.A,{children:(0,C.jsxs)(l.A,{children:[(0,C.jsx)(n.A,{color:"textSecondary",gutterBottom:!0,children:"Average Time on Page"}),(0,C.jsx)(n.A,{variant:"h5",children:r.averageTimeOnPage})]})})}),(0,C.jsx)(i.Ay,{item:!0,xs:12,sm:6,md:4,children:(0,C.jsx)(s.A,{children:(0,C.jsxs)(l.A,{children:[(0,C.jsx)(n.A,{color:"textSecondary",gutterBottom:!0,children:"Bounce Rate"}),(0,C.jsx)(n.A,{variant:"h5",children:r.bounceRate})]})})})]}),(0,C.jsxs)(d.A,{sx:{p:3,mb:4},children:[(0,C.jsx)(n.A,{variant:"h6",gutterBottom:!0,children:"Top Performing Keywords"}),(0,C.jsx)(i.Ay,{container:!0,spacing:2,children:r.topKeywords.map(((r,e)=>(0,C.jsx)(i.Ay,{item:!0,xs:12,children:(0,C.jsxs)(c.A,{sx:{mb:2},children:[(0,C.jsxs)(c.A,{sx:{display:"flex",justifyContent:"space-between",mb:1},children:[(0,C.jsx)(n.A,{variant:"body1",children:r.keyword}),(0,C.jsxs)(n.A,{variant:"body2",children:[r.score,"%"]})]}),(0,C.jsx)(H,{variant:"determinate",value:r.score,sx:{height:8,borderRadius:5}})]})},e)))})]}),(0,C.jsxs)(d.A,{sx:{p:3},children:[(0,C.jsx)(n.A,{variant:"h6",gutterBottom:!0,children:"Performance Trends"}),(0,C.jsx)(c.A,{sx:{height:300,display:"flex",alignItems:"center",justifyContent:"center"},children:(0,C.jsx)(n.A,{color:"textSecondary",children:"Charts and graphs will be displayed here"})})]})]})}}}]);