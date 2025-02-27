import{g as B,p as F,aP as $,a9 as A,u as N,c as s,a as T,aQ as w,s as z,$ as H,h as j,i,G as P,am as D,an as E,aR as G,aS as Q,as as U,aT as k,B as q,j as J,C as K}from"./index-DDrQbBIM.js";const O=F({name:String,itemAriaLabel:{type:String,default:"$vuetify.rating.ariaLabel.item"},activeColor:String,color:String,clearable:Boolean,disabled:Boolean,emptyIcon:{type:k,default:"$ratingEmpty"},fullIcon:{type:k,default:"$ratingFull"},halfIncrements:Boolean,hover:Boolean,length:{type:[Number,String],default:5},readonly:Boolean,modelValue:{type:[Number,String],default:0},itemLabels:Array,itemLabelPosition:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},ripple:Boolean,...U(),...Q(),...G(),...E(),...D()},"VRating"),X=B()({name:"VRating",props:O(),emits:{"update:modelValue":e=>!0},setup(e,C){let{slots:u}=C;const{t:f}=$(),{themeClasses:M}=A(e),h=N(e,"modelValue"),c=s(()=>T(parseFloat(h.value),0,+e.length)),y=s(()=>w(Number(e.length),1)),I=s(()=>y.value.flatMap(a=>e.halfIncrements?[a-.5,a]:[a])),d=z(-1),g=s(()=>I.value.map(a=>{const t=e.hover&&d.value>-1,n=c.value>=a,l=d.value>=a,o=(t?l:n)?e.fullIcon:e.emptyIcon,b=e.activeColor??e.color,v=n||l?b:e.color;return{isFilled:n,isHovered:l,icon:o,color:v}})),R=s(()=>[0,...I.value].map(a=>{function t(){d.value=a}function n(){d.value=-1}function l(){e.disabled||e.readonly||(h.value=c.value===a&&e.clearable?0:a)}return{onMouseenter:e.hover?t:void 0,onMouseleave:e.hover?n:void 0,onClick:l}})),L=s(()=>e.name??`v-rating-${H()}`);function m(a){var x,_;let{value:t,index:n,showStar:l=!0}=a;const{onMouseenter:r,onMouseleave:o,onClick:b}=R.value[n+1],v=`${L.value}-${String(t).replace(".","-")}`,V={color:(x=g.value[n])==null?void 0:x.color,density:e.density,disabled:e.disabled,icon:(_=g.value[n])==null?void 0:_.icon,ripple:e.ripple,size:e.size,variant:"plain"};return i(P,null,[i("label",{for:v,class:{"v-rating__item--half":e.halfIncrements&&t%1>0,"v-rating__item--full":e.halfIncrements&&t%1===0},onMouseenter:r,onMouseleave:o,onClick:b},[i("span",{class:"v-rating__hidden"},[f(e.itemAriaLabel,t,e.length)]),l?u.item?u.item({...g.value[n],props:V,value:t,index:n,rating:c.value}):i(q,J({"aria-label":f(e.itemAriaLabel,t,e.length)},V),null):void 0]),i("input",{class:"v-rating__hidden",name:L.value,id:v,type:"radio",value:t,checked:c.value===t,tabindex:-1,readonly:e.readonly,disabled:e.disabled},null)])}function S(a){return u["item-label"]?u["item-label"](a):a.label?i("span",null,[a.label]):i("span",null,[K(" ")])}return j(()=>{var t;const a=!!((t=e.itemLabels)!=null&&t.length)||u["item-label"];return i(e.tag,{class:["v-rating",{"v-rating--hover":e.hover,"v-rating--readonly":e.readonly},M.value,e.class],style:e.style},{default:()=>[i(m,{value:0,index:-1,showStar:!1},null),y.value.map((n,l)=>{var r,o;return i("div",{class:"v-rating__wrapper"},[a&&e.itemLabelPosition==="top"?S({value:n,index:l,label:(r=e.itemLabels)==null?void 0:r[l]}):void 0,i("div",{class:"v-rating__item"},[e.halfIncrements?i(P,null,[i(m,{value:n-.5,index:l*2},null),i(m,{value:n,index:l*2+1},null)]):i(m,{value:n,index:l},null)]),a&&e.itemLabelPosition==="bottom"?S({value:n,index:l,label:(o=e.itemLabels)==null?void 0:o[l]}):void 0])})]})}),{}}});export{X as V};
