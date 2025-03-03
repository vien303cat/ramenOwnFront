import{q as ee,x as te,ay as ae,r as c,c as F,y as le,k as oe,E as y,n as p,i as t,z as a,R as A,J as s,l as D,I,L as r,C as V,B as x,A as n,H as q,K as se,V as re,M as E,D as ne,N as ie,O as ue,P as de,Q as me,G as ce}from"./index-C7EN7WSS.js";import{c as pe,a as ve,f as fe,u as ge,b as P,V as Ve}from"./index.esm-CTIHj7p1.js";import{U as j}from"./UserLevel-ic-neFjG.js";import{b as O}from"./route-block-B_A1xBdJ.js";import{_ as he}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{V as G,a as m}from"./VRow-DiwlsjKh.js";import{V as M}from"./VRating-dzq9tC1l.js";import{b as ye}from"./VList-CkUjoV57.js";import{V as xe}from"./VDataTable-CaxdNLk1.js";import{V as be}from"./VToolbar-FFMlZb5y.js";import{V as _e}from"./VContainer-BRjA2mjw.js";import{V as ke}from"./VTextarea-Bv5Z8cqN.js";import"./ssrBoot-BYVI9W4x.js";import"./VPagination-vQphwDZc.js";const we={key:0},Se={key:1},Ce={style:{"text-align":"center"}},Fe={style:{"text-align":"center",color:"seashell"}},Ae={class:"wrap-text"},De={key:0,class:"text-secondary"},H={__name:"[id]",setup(Me){const b=ee(),w=te(),S=ae(),{apiAuth:h}=le(),v=c([]),i=c({_id:"",name:"",adress:"",timetxt:"",image:"",depiction:"",star:""}),C=c(""),J=F(()=>[{title:"會員",key:"user",sortable:!1,width:"15%"},{title:"照片",key:"image",sortable:!1,width:"15%"},{title:"評分",key:"star",sortable:!0,width:"20%"},{title:"描述",key:"depiction",sortable:!1,maxWidth:"30%"},{title:"評論時間",key:"updatedAt",sortable:!0,width:"20%"}]);(async()=>{try{const{data:o}=await h.get("/store/"+S.params.id);i.value=o.result}catch(o){console.error("取得店家資訊失敗:",o)}})();const U=async()=>{var o,e;try{const{data:d}=await h.get("/score/getstore/"+S.params.id);console.log("getScores:",d.result),v.value=d.result}catch(d){console.error("取得麵屋評價列表失敗:"+d),w({text:((e=(o=d==null?void 0:d.response)==null?void 0:o.data)==null?void 0:e.message)||"取得麵屋評價列表失敗",snackbarProps:{color:"red",timeout:2e3}})}};U();const f=c({_id:"",user:"",store:"",star:"",depiction:""}),L=async()=>{try{const{data:o}=await h.get(`score/getuser/${S.params.id}/${b.id}`);f.value=o.result,u.value.id=f.value._id}catch(o){console.error("取得個人評分失敗:",o)}};L();const K=F(()=>v.value.length),N=F(()=>v.value.reduce((o,e)=>o+e.star,0)/v.value.length),u=c({open:!1,id:""}),$=o=>{o&&(console.log("open",o._id),u.value.id=o._id,g.value.value=o.star,_.value.value=o.depiction),u.value.open=!0},B=()=>{console.log("close",f.value._id),f.value._id||(X(),u.value.id="",i.value.star=""),u.value.open=!1,T.value.deleteFileRecord()},Q=pe({star:fe().required("請填寫評價").min(1,"評價不能為空"),depiction:ve().required("請填寫描述").max(60,"描述最多 60 個字")}),{handleSubmit:W,isSubmitting:R,resetForm:X}=ge({validationSchema:Q}),g=P("star"),_=P("depiction"),T=c(null),k=c([]),z=c([]),Y=W(async o=>{console.log("submit",o);try{const e=new FormData;e.append("user",b.id),e.append("store",i.value._id),e.append("star",o.star),e.append("depiction",o.depiction),k.value.length>0&&e.append("image",k.value[0].file),u.value.id?await h.patch("/score/"+f.value._id,e):await h.post("/score",e),v.value.splice(0,v.value.length),U(),L(),w({text:u.value.id?"編輯成功":"新增成功",snackbarProps:{color:"green",timeout:2e3}}),B()}catch(e){console.error(e),w({text:"新增/編輯評價失敗 ",snackbarProps:{color:"red",timeout:2e3}})}});return(o,e)=>{const d=oe("VueFileAgent");return p(),y(q,null,[t(_e,null,{default:a(()=>[t(G,null,{default:a(()=>[t(m,{cols:"12",md:"3"},{default:a(()=>[t(m,{cols:"12",justify:"center",align:"center"},{default:a(()=>[t(A,{src:i.value.image,height:"300",width:"300"},null,8,["src"])]),_:1}),t(m,{cols:"12",class:"text-center"},{default:a(()=>[s("h1",null,r(i.value.name),1),s("h3",null,"評價數: "+r(K.value)+" 則",1),s("h3",null,[e[8]||(e[8]=V(" 綜合評價: ")),N.value.toFixed(1)!="NaN"?(p(),y("span",we,[V(r(N.value.toFixed(1))+" ",1),t(M,{readonly:"",length:"1",size:"18","model-value":"1","active-color":"info"})])):(p(),y("span",Se," 尚無評價 "))]),s("h3",null,r(i.value.timetxt),1),s("h4",null,r(i.value.depiction),1),s("h3",null,[V(r(i.value.adress)+" ",1),t(x,{href:`https://www.google.com/maps/search/?api=1&query=${i.value.name}`,target:"_blank",color:"primary",variant:"tonal",density:"comfortable",icon:"mdi-map-marker"},null,8,["href"])]),e[11]||(e[11]=s("br",null,null,-1)),n(b).isLoggedIn&&u.value.id?(p(),D(x,{key:0,color:"info",variant:"flat","append-icon":"mdi-noodles",onClick:e[0]||(e[0]=l=>$(f.value))},{default:a(()=>e[9]||(e[9]=[s("h3",null,"已吃",-1)])),_:1})):n(b).isLoggedIn?(p(),D(x,{key:1,color:"secondary",variant:"flat","append-icon":"mdi-noodles",onClick:e[1]||(e[1]=l=>$(null))},{default:a(()=>e[10]||(e[10]=[s("h3",null,"吃",-1)])),_:1})):I("",!0)]),_:1})]),_:1}),t(m,{cols:"12",md:"9"},{default:a(()=>[e[12]||(e[12]=s("h2",{class:"text-center"},"麵友評論",-1)),t(ye),t(m,{col:"12"},{default:a(()=>[t(xe,{headers:J.value,items:v.value,search:C.value,"filter-keys":["user.name"],"items-per-page":3},{top:a(()=>[t(be,null,{default:a(()=>[t(re,{modelValue:C.value,"onUpdate:modelValue":e[2]||(e[2]=l=>C.value=l),class:"mt-5","prepend-inner-icon":"mdi-magnify",variant:"outlined",placeholder:"會員名稱搜尋"},null,8,["modelValue"]),t(E),t(E)]),_:1})]),"item.image":a(({value:l})=>[t(A,{src:l,height:"150",width:"200"},null,8,["src"])]),"item.user":a(l=>[s("h2",Ce,r(l.item.user.name),1),s("p",Fe," 等級: "+r(Math.floor(l.item.userScoreCount/3)+1)+" "+r(n(j).LEVEL[Math.floor(l.item.userScoreCount/3)])+" "+r(n(j).ICON[Math.floor(l.item.userScoreCount/3)]),1)]),"item.star":a(({value:l})=>[(p(!0),y(q,null,se(l,Z=>(p(),D(M,{key:Z,readonly:"",length:"1",size:"18","model-value":"1","active-color":"info"}))),128))]),"item.depiction":a(({value:l})=>[s("pre",Ae,r(l),1)]),"item.updatedAt":a(({value:l})=>[V(r(new Date(l).toLocaleString()),1)]),_:2},1032,["headers","items","search"])]),_:1})]),_:1})]),_:1})]),_:1}),t(ce,{modelValue:u.value.open,"onUpdate:modelValue":e[7]||(e[7]=l=>u.value.open=l),persistent:"","max-width":"40%","max-height":"80vh"},{default:a(()=>[t(Ve,{disabled:n(R),onSubmit:ne(n(Y),["prevent"])},{default:a(()=>[t(ie,null,{default:a(()=>[t(ue,{class:"dialog-title"},{default:a(()=>[t(G,{class:"align-start"},{default:a(()=>[t(m,{cols:"12",md:"4",class:"d-flex justify-start"},{default:a(()=>[t(A,{src:i.value.image,height:"200",width:"200"},null,8,["src"])]),_:1}),t(m,{cols:"12",md:"8",class:"text-left wrap-text"},{default:a(()=>[t(m,{cols:"12"},{default:a(()=>[s("h2",null,r(i.value.name),1),s("h3",null,r(i.value.timetxt),1)]),_:1}),t(m,{cols:"12"},{default:a(()=>[s("h4",null,r(i.value.adress),1)]),_:1})]),_:1})]),_:1})]),_:1}),t(de,null,{default:a(()=>[s("h2",null,r(u.value.id?"編輯評論":"新增評論"),1),e[13]||(e[13]=s("br",null,null,-1)),n(g).errorMessage?(p(),y("span",De,r(n(g).errorMessage),1)):I("",!0),t(M,{modelValue:n(g).value.value,"onUpdate:modelValue":e[3]||(e[3]=l=>n(g).value.value=l),length:"10","item-labels":["評分","","","","","","","","",""],"active-color":"info",color:"info",size:"24",hover:""},null,8,["modelValue"]),s("p",null,"當前評分: "+r(n(g).value.value),1),t(ke,{modelValue:n(_).value.value,"onUpdate:modelValue":e[4]||(e[4]=l=>n(_).value.value=l),label:"描述","error-messages":n(_).errorMessage.value},null,8,["modelValue","error-messages"]),t(d,{ref_key:"fileAgent",ref:T,modelValue:k.value,"onUpdate:modelValue":e[5]||(e[5]=l=>k.value=l),"raw-model-value":z.value,"onUpdate:rawModelValue":e[6]||(e[6]=l=>z.value=l),accept:"image/jpeg, image/png",deletable:"","max-size":"1MB","help-text":"上傳圖片","error-text":{type:"檔案格式不符",size:"圖片容量過大"}},null,8,["modelValue","raw-model-value"])]),_:1}),t(me,null,{default:a(()=>[t(x,{onClick:B},{default:a(()=>e[14]||(e[14]=[V("取消")])),_:1}),t(x,{type:"submit",loading:n(R)},{default:a(()=>e[15]||(e[15]=[V("提交")])),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1},8,["modelValue"])],64)}}};typeof O=="function"&&O(H);const He=he(H,[["__scopeId","data-v-dbe0c5e8"]]);export{He as default};
