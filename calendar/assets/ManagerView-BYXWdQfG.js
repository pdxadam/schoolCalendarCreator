var H=Object.defineProperty;var R=(d,a,r)=>a in d?H(d,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):d[a]=r;var N=(d,a,r)=>(R(d,typeof a!="symbol"?a+"":a,r),r);import{_ as J,r as i,o as C,c as w,a as e,F as M,d as Y,n as I,t as A,e as f,w as s,v as p,f as E,p as j,g as O,h as W,i as U,b as _,j as B,k as z,l as X}from"./index-CYKQ7qNE.js";import{D as y,C as $,e as q}from"./elCalendar-CP6VWDPC.js";const T=d=>(j("data-v-11b1d44d"),d=d(),O(),d),K=T(()=>e("h1",null,"Edit Tools",-1)),Q={id:"toolsList"},Z=T(()=>e("h3",null,"Tools:",-1)),ee=["onClick"],te={key:0,class:"new Form"},oe=T(()=>e("label",{for:"chkTermStart"},"Is Term Start",-1)),ae=T(()=>e("label",{for:"chkShouldExport"},"Export to Calendar (not a regular day)",-1)),le={key:1,class:"edit Form"},ne=T(()=>e("label",{for:"chkTermStart"},"Is Term Start",-1)),ue=T(()=>e("label",{for:"chkShouldExport"},"Export to Calendar (not a regular day)",-1)),re=T(()=>e("footer",null,"Changes do not automatically apply to calendar",-1)),se={__name:"elToolEditor",props:{tools:Array},emits:[{returnTool:y}],setup(d,{emit:a}){const r=d,v=i(!1),n=i();var m=-1;const c=i(""),b=i(1),h=i(1),g=i(!1),k=i(!0),D=i("#9be1c1"),x=i("#000000");function S(){return"background-color: "+D.value+"; color: "+x.value+";"}function l(){const V=new y(c.value,b.value,h.value,D.value,x.value,g.value?1:0,k.value);r.tools.push(V)}function u(V,t){v.value=!0,m=t,n.value=V,console.log(n)}function G(){r.tools.splice(m,1)}function L(){v.value=!1}return(V,t)=>(C(),w(M,null,[K,e("main",null,[e("div",Q,[Z,e("button",{onClick:t[0]||(t[0]=o=>L())},"New"),(C(!0),w(M,null,Y(d.tools,(o,P)=>(C(),w("div",{class:"toolButton",style:I(o.styleset),onClick:ge=>{u(o,P)}},A(o.title),13,ee))),256))]),v.value==!1?(C(),w("div",te,[f(" New "),s(e("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=o=>c.value=o),placeholder:"New Tool Name"},null,512),[[p,c.value]]),e("div",null,[s(e("input",{type:"number","onUpdate:modelValue":t[2]||(t[2]=o=>b.value=o),placeholder:"Student Day Count"},null,512),[[p,b.value]])]),e("div",null,[s(e("input",{type:"number","onUpdate:modelValue":t[3]||(t[3]=o=>h.value=o),placeholder:"Teacher Day Count"},null,512),[[p,h.value]])]),e("div",null,[oe,s(e("input",{type:"checkbox",id:"chkTermStart","onUpdate:modelValue":t[4]||(t[4]=o=>g.value=o)},null,512),[[E,g.value]])]),ae,s(e("input",{type:"checkbox",id:"chkShouldExport","onUpdate:modelValue":t[5]||(t[5]=o=>k.value=o)},null,512),[[E,k.value]]),e("div",null,[f(" Background Color: "),s(e("input",{type:"color",id:"clrBackColor","onUpdate:modelValue":t[6]||(t[6]=o=>D.value=o)},null,512),[[p,D.value]]),f(" Font Color: "),s(e("input",{type:"color",id:"clrFontColor","onUpdate:modelValue":t[7]||(t[7]=o=>x.value=o)},null,512),[[p,x.value]])]),e("div",{class:"toolPreview",style:I(S())},"Preview",4),e("button",{onClick:t[8]||(t[8]=o=>l())},"Save")])):(C(),w("div",le,[f(" Title: "),s(e("input",{type:"text","onUpdate:modelValue":t[9]||(t[9]=o=>n.value.title=o),placeholder:"New Tool Name"},null,512),[[p,n.value.title]]),e("div",null,[f("Student Day: "),s(e("input",{type:"number","onUpdate:modelValue":t[10]||(t[10]=o=>n.value.studentDay=o),placeholder:"Student Day Count"},null,512),[[p,n.value.studentDay]])]),e("div",null,[f("Teacher Day"),s(e("input",{type:"number","onUpdate:modelValue":t[11]||(t[11]=o=>n.value.teacherDay=o),placeholder:"Teacher Day Count"},null,512),[[p,n.value.teacherDay]])]),ne,s(e("input",{type:"checkbox",id:"chkTermStart","onUpdate:modelValue":t[12]||(t[12]=o=>n.value.isTermStart=o)},null,512),[[E,n.value.isTermStart]]),ue,s(e("input",{type:"checkbox",id:"chkShouldExport","onUpdate:modelValue":t[13]||(t[13]=o=>n.value.shouldExport=o)},null,512),[[E,n.value.shouldExport]]),e("div",null,[f("Background Color: "),s(e("input",{type:"color",id:"clrBackColor","onUpdate:modelValue":t[14]||(t[14]=o=>n.value.backColor=o)},null,512),[[p,n.value.backColor]])]),e("div",null,[f("Font Color: "),s(e("input",{type:"color",id:"clrFontColor","onUpdate:modelValue":t[15]||(t[15]=o=>n.value.fontColor=o)},null,512),[[p,n.value.fontColor]])]),e("button",{onClick:t[16]||(t[16]=o=>G())},"Delete")]))]),re],64))}},de=J(se,[["__scopeId","data-v-11b1d44d"]]);class ie{constructor(){N(this,"calendars",[]);N(this,"activeCalendar");N(this,"saveName","8sdjf3298j9823");N(this,"tools",[new y("Term Start",1,1,"aliceblue","black",1,!0),new y("Normal",1,1,"White","Black",0,!1),new y("Conferences",0,1,"tan","white",0,!0),new y("Inservice",0,1,"yellow","black",0,!0),new y("Holiday",0,1,"green","white",0,!0),new y("Non-Contract",0,0,"blue","white",0,!0)]);this.loadCalendars()}loadCalendars(){const a=localStorage.getItem(this.saveName);if(a==null||a=="")console.log("empty localStorage...creating initial setup"),this.calendars=[],this.activeCalendar=$.Generate(new Date("August 1, 2024"),new Date("June 30, 2025"),"Sample Calendar01"),this.calendars.push(this.activeCalendar);else{for(var r=JSON.parse(a),v=0;v<r.length;v++)console.log(r[v]),console.log("-------------"),this.calendars.push($.fromJson(r[v])),console.log(this.calendars);this.activeCalendar=this.calendars[0]}}saveCalendars(){const a=JSON.stringify(this.calendars);localStorage.setItem(this.saveName,a)}makeNewCalendar(a,r,v){for(var n=1,m=!0;m;){m=!1;for(var c=0;c<this.calendars.length;c++)this.calendars[c].title==a&&(a=a+"_"+n,n++,m=!0)}const b=$.Generate(new Date(r),new Date(v),a);this.calendars.push(b),this.saveCalendars()}}const F=d=>(j("data-v-ca9b7f07"),d=d(),O(),d),ve=["value"],pe=F(()=>e("h1",null,"Create New Calendar",-1)),ce=F(()=>e("label",{for:"optStartMonth"},"Starting ",-1)),me=z('<option value="0" data-v-ca9b7f07>January</option><option value="1" data-v-ca9b7f07>February</option><option value="2" data-v-ca9b7f07>March</option><option value="3" data-v-ca9b7f07>April</option><option value="4" data-v-ca9b7f07>May</option><option value="5" data-v-ca9b7f07>June</option><option value="6" data-v-ca9b7f07>July</option><option value="7" data-v-ca9b7f07>August</option><option value="8" data-v-ca9b7f07>September</option><option value="9" data-v-ca9b7f07>October</option><option value="10" data-v-ca9b7f07>November</option><option value="11" data-v-ca9b7f07>December</option>',12),be=[me],Ce=F(()=>e("label",{for:"optEndMonth"},"Ending:",-1)),fe=z('<option value="1" data-v-ca9b7f07>January</option><option value="2" data-v-ca9b7f07>February</option><option value="3" data-v-ca9b7f07>March</option><option value="4" data-v-ca9b7f07>April</option><option value="5" data-v-ca9b7f07>May</option><option value="6" data-v-ca9b7f07>June</option><option value="7" data-v-ca9b7f07>July</option><option value="8" data-v-ca9b7f07>August</option><option value="9" data-v-ca9b7f07>September</option><option value="10" data-v-ca9b7f07>October</option><option value="11" data-v-ca9b7f07>November</option><option value="12" data-v-ca9b7f07>December</option>',12),ye=[fe],we={__name:"elManager",setup(d){const a=i(new ie),r=i(""),v=i(),n=i(),m=i(""),c=i("hidden"),b=i(new Date().getFullYear()),h=i(7),g=i(new Date().getFullYear()+1),k=i(5);W(a.value.activeCalendar,D,{deep:!0});function D(){console.log("change"),a.value.saveCalendars()}function x(){if(r.value==""||n.value==""||v.value=="")return;v.value=new Date(b.value,h.value);const S=new Date(g.value,k.value);S.setDate(S.getDate()-1),n.value=new Date(S),console.log("Creating Calendar"),console.log(r.value),console.log(v.value),console.log(n.value),a.value.makeNewCalendar(r.value,v.value,n.value)}return(S,l)=>(C(),w(M,null,[e("nav",null,[s(e("select",{"onUpdate:modelValue":l[0]||(l[0]=u=>a.value.activeCalendar=u)},[(C(!0),w(M,null,Y(a.value.calendars,u=>(C(),w("option",{value:u},A(u.name),9,ve))),256))],512),[[U,a.value.activeCalendar]]),e("button",{onClick:l[1]||(l[1]=u=>{m.value="shown"})},"New Calendar"),e("button",{onClick:l[2]||(l[2]=u=>{c.value=""})},"Edit Tools")]),e("div",{id:"sidebar",class:B(c.value)},[e("button",{onClick:l[3]||(l[3]=u=>{c.value="hidden"})},"Close"),_(de,{onReturnTool:l[4]||(l[4]=u=>console.log(S.newTool)),tools:a.value.tools},null,8,["tools"])],2),e("main",null,[_(q,{cal:a.value.activeCalendar,tools:a.value.tools},null,8,["cal","tools"])]),e("div",{id:"frmNewCalendar",class:B(m.value)},[e("div",null,[e("button",{onClick:l[5]||(l[5]=u=>{m.value=""})},"X"),pe,e("div",null,[s(e("input",{type:"text",id:"txtNewCalendarTitle",placeholder:"Title","onUpdate:modelValue":l[6]||(l[6]=u=>r.value=u)},null,512),[[p,r.value]])]),e("div",null,[ce,s(e("select",{id:"optStartMonth","onUpdate:modelValue":l[7]||(l[7]=u=>h.value=u)},be,512),[[U,h.value]]),s(e("input",{type:"number",placeholder:"Start Year","onUpdate:modelValue":l[8]||(l[8]=u=>b.value=u)},null,512),[[p,b.value]])]),e("div",null,[Ce,s(e("select",{id:"optEndMonth","onUpdate:modelValue":l[9]||(l[9]=u=>k.value=u)},ye,512),[[U,k.value]]),s(e("input",{id:"txtEndYear",placeholder:"End Year",type:"number","onUpdate:modelValue":l[10]||(l[10]=u=>g.value=u)},null,512),[[p,g.value]])]),e("div",null,[e("button",{onClick:l[11]||(l[11]=u=>{x()})},"Create")])])],2)],64))}},he=J(we,[["__scopeId","data-v-ca9b7f07"]]),De={__name:"ManagerView",setup(d){return(a,r)=>(C(),X(he))}};export{De as default};
