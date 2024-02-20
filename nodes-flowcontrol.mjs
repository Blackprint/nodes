/* Blackprint 
 MIT Licensed */
"use strict";var _Class,_Class2,_Class3,_Class4,_Class5,_Class6,_Class7,_Class8,_Class9,_Class10,_Class11,_Class12,_Class13,_Class14;if(void 0===window)var window=globalThis;async function imports(t){return"undefined"!=typeof sf&&void 0!==sf.loader?await sf.loader.mjs(t):Promise.all(t.map((t=>import(t))))}imports.task=function(){return"undefined"!=typeof sf&&void 0!==sf.loader?sf.loader.task:null};let Blackprint=window.Blackprint.loadScope({url:import.meta.url,hasInterface:!0,hasDocs:!0}),Context=Blackprint.createContext("FlowControl");Context.EventSlot={slot:"my-private-event-slot"},Blackprint.registerNode("FlowControl/Delay",((_Class=class extends Blackprint.Node{constructor(t){super(t),this.setInterface().title="Delay"}async update(){await new Promise((t=>setTimeout(t,this.input.Duration)))}}).type="flow-control",_Class.input={Duration:Blackprint.Port.Default(Number,1e3)},_Class)),Blackprint.registerNode("FlowControl/DoN",((_Class2=class extends Blackprint.Node{constructor(t){super(t),this.setInterface().title="Do N",this._n=0}update(){if(this._n>=this.input.N)return;this._n++;let t=this.output;t.Counter=this._n,t.Do(),this._n===this.input.N&&t.End()}}).type="flow-control",_Class2.input={N:Blackprint.Port.Default(Number,1),Reset:Blackprint.Port.Trigger((t=>t.iface.node._n=0))},_Class2.output={Do:Blackprint.Types.Route,End:Blackprint.Types.Route,Counter:Number},_Class2)),Blackprint.registerNode("FlowControl/ForLoop",((_Class3=class extends Blackprint.Node{constructor(t){super(t);let e=this.setInterface();e.title="For Loop",this._break=!1,this._toast=new NodeToast(e)}async trigger(){let{FirstIndex:t,LastIndex:e,Increment:r}=this.input,a=this.output;if(t<e){if(r<=0)return this._toast.error("Increment value may cause infinity loop");for(let o=t;o<e&&!this._break;o+=r)a.Index=o,await a.Do()}else if(t>e){if(r>=0)return this._toast.error("Increment value may cause infinity loop");for(let o=t;o>e&&!this._break;o+=r)a.Index=o,await a.Do()}this._toast.clear(),this._break=!1,a.End()}}).type="flow-control",_Class3.input={Start:Blackprint.Port.Trigger((t=>t.iface.node.trigger())),FirstIndex:Blackprint.Port.Default(Number,0),LastIndex:Blackprint.Port.Default(Number,10),Increment:Blackprint.Port.Default(Number,1),Break:Blackprint.Port.Trigger((t=>t.iface.node._break=!0))},_Class3.output={Do:Blackprint.Types.Route,Index:Number,End:Blackprint.Types.Route},_Class3)),Blackprint.registerNode("FlowControl/Gate",((_Class4=class extends Blackprint.Node{constructor(t){super(t),this.setInterface().title="Gate",this._toggle=null}trigger(){let{Input:t,IInput:e}=this.ref;e.Toggle.cables.length?this._toggle&&this.output.Exit():t.IsOpen&&this.output.Exit()}}).type="flow-control",_Class4.input={Enter:Blackprint.Port.Trigger((t=>t.iface.node.trigger())),IsOpen:Blackprint.Port.Default(Boolean,!1),Toggle:Blackprint.Port.Trigger((t=>{let e=t.iface.node;null==e._toggle&&(e._toggle=e.input.IsOpen),e._toggle=!e._toggle}))},_Class4.output={Exit:Blackprint.Types.Trigger},_Class4)),Blackprint.registerInterface("BPIC/FlowControl/Interface",Context.IFace.Interface=class extends Blackprint.Interface{}),Blackprint.registerCode("FlowControl/Return",((_Class5=class extends Blackprint.Code{js(t){return{type:Blackprint.CodeType.NotWrapped,code:"return Input.Value;"}}csharp(t){return this.php(t)}php(t){return{type:Blackprint.CodeType.NotWrapped,code:'return Input["Value"];'}}python(t){return{type:Blackprint.CodeType.NotWrapped,code:'return Input["Value"]'}}}).routeIn=Blackprint.CodeRoute.MustHave,_Class5.routeOut=Blackprint.CodeRoute.None,_Class5)),Blackprint.registerNode("FlowControl/Return",((_Class6=class extends Blackprint.Node{constructor(t){super(t),this.setInterface().title="Return"}init(){this.routes.disableOut=!0}update(){}}).type="flow-control",_Class6.input={Value:Blackprint.Types.Any},_Class6)),Blackprint.registerNode("FlowControl/Ticker",((_Class7=class extends Blackprint.Node{constructor(t){super(t),this.setInterface().title="Ticker"}start(){clearInterval(this._inv),this._inv=setInterval((()=>this.routes.routeOut()),this.input.Duration)}stop(){clearInterval(this._inv)}}).type="flow-control",_Class7.input={Duration:Blackprint.Port.Default(Number,1e3),Start:Blackprint.Port.Trigger((t=>t.iface.node.start())),Stop:Blackprint.Port.Trigger((t=>t.iface.node.stop()))},_Class7)),Blackprint.registerNode("FlowControl/Valve",((_Class8=class extends Blackprint.Node{constructor(t){super(t);let e=this.setInterface("BPIC/FlowControl/Interface");e.title="Valve",e.data={total:1},e.rightPortMargin="38px 0 0 0"}init(){let t=this,e=this.iface;var r=[{title:"Create new port",callback(){let r=e.data.total++,a=t.createPort("output",r,Blackprint.Types.Any);t.createPort("input",r,Boolean).on("value",(e=>{let r=e.cable.value,o=t.input;a.value=r?o.Value:o.Default,a.sync()}))}},{title:"Delete this port",callback(){t.deletePort("output",this.name),t.deletePort("input",this.name),e.data.total--;let r=0,a=e.input;for(let e in a){let o=a[e];"Value"!==o.name&&"Default"!==o.name&&(o.name!==String(r)&&t.renamePort("input",o.name,String(r)),r++)}r=0;let o=e.output;for(let e in o){let a=o[e];a.name!==String(r)&&t.renamePort("output",a.name,String(r)),r++}}}];e.on("port.menu",Context.EventSlot,(function({port:t,menu:e}){let a;a="Value"===t.name||"Default"===t.name?[r[0]]:r.slice(0);for(var o=0;o<a.length;o++)a[o].context=t;e.push(...a)}))}initPorts(t){t=Object.assign(this.iface.data,t);for(let e=0;e<t.total;e++){let t=this.createPort("output",String(e),Blackprint.Types.Any);this.createPort("input",String(e),Boolean).on("value",(e=>{let r=e.cable.value,a=this.input;t.value=r?a.Value:a.Default,t.sync()}))}}}).type="flow-control",_Class8.input={Value:Blackprint.Types.Any,Default:Blackprint.Types.Any},_Class8.output={},_Class8)),Blackprint.registerNode("FlowControl/WhileLoop",((_Class9=class extends Blackprint.Node{constructor(t){super(t),this.setInterface().title="WhileLoop"}async trigger(){if(!this._begin){for(this._begin=!0;this.input.Condition;)await output.Do();this._begin=!1,output.End()}}}).type="flow-control",_Class9.input={Start:Blackprint.Port.Trigger((t=>t.iface.node.trigger())),Condition:Boolean},_Class9.output={Do:Blackprint.Types.Route,End:Blackprint.Types.Route},_Class9)),Blackprint.registerNode("FlowControl/Branch/Route",((_Class10=class extends Blackprint.Node{constructor(t){super(t),this.setInterface().title="Branch"}update(){let t=this.input.Condition;null!=t&&(t?this.output.True():this.output.False())}}).type="flow-control",_Class10.input={Condition:Boolean},_Class10.output={True:Blackprint.Types.Route,False:Blackprint.Types.Route},_Class10)),Blackprint.registerNode("FlowControl/FlipFlop/Route",((_Class11=class extends Blackprint.Node{constructor(t){super(t),this.setInterface().title="FlipFlop",this._n=0}update(){0===this._n?(this._n=1,output.A()):(this._n=0,output.B())}}).type="flow-control",_Class11.output={A:Blackprint.Types.Route,B:Blackprint.Types.Route},_Class11)),Blackprint.registerNode("FlowControl/MultiGate/Route",((_Class12=class extends Blackprint.Node{constructor(t){super(t);let e=this.setInterface();e.title="MultiGate",e.data={total:1},this._disabled=!1}init(){let t=this,e=this.iface;var r=[{title:"Create new port",callback(){let r=e.data.total++;t.createPort("output",r,Blackprint.Types.Route)}},{title:"Delete this port",callback(){t.deletePort("output",this.name),e.data.total--;let r=0,a=e.input;for(let e in a){let o=a[e];o.name!==String(r)&&t.renamePort("input",o.name,String(r)),r++}}}];e.on("port.menu",Context.EventSlot,(function({port:t,menu:e}){let a;a="0"===t.name?[r[0]]:r.slice(0);for(var o=0;o<a.length;o++)a[o].context=t;e.push(...a)})),e.$el&&e.$el(".title .icon").prepend('<i class="fa fa-sign-in-alt"></i>')}initPorts(t){t=Object.assign(this.iface.data,t);for(let e=0;e<t.total;e++)this.createPort("output",String(e),Blackprint.Types.Route)}async update(){if(this._disabled)return;let t=this.input,e=this.output,r=this.iface.data.total;if(this._n??=t.StartIndex,t.IsRandom){if(!t.Loop)throw"ToDo";return void await e[Math.random()*r|0]()}let a=this._n++;this._n>=r&&(t.Loop?this._disabled=!0:this._n=t.StartIndex),await e[a]()}reset(){this._disabled=!1,this._n=this.input.StartIndex}}).type="flow-control",_Class12.input={Reset:Blackprint.Port.Trigger((t=>t.iface.node.reset())),IsRandom:Blackprint.Port.Default(Boolean,!1),Loop:Blackprint.Port.Default(Boolean,!0),StartIndex:Blackprint.Port.Default(Number,0)},_Class12.output={0:Blackprint.Types.Route},_Class12)),Blackprint.registerNode("FlowControl/Sequence/Route",((_Class13=class extends Blackprint.Node{constructor(t){super(t);let e=this.setInterface();e.title="Sequence",e.data={total:1}}init(){let t=this,e=this.iface;var r=[{title:"Create new port",callback(){let r=e.data.total++;t.createPort("output",r,Blackprint.Types.Route)}},{title:"Delete this port",callback(){t.deletePort("output",this.name),e.data.total--;let r=0,a=e.input;for(let e in a){let o=a[e];o.name!==String(r)&&t.renamePort("input",o.name,String(r)),r++}}}];e.on("port.menu",Context.EventSlot,(function({port:t,menu:e}){let a;a="0"===t.name?[r[0]]:r.slice(0);for(var o=0;o<a.length;o++)a[o].context=t;e.push(...a)})),e.$el&&e.$el(".title .icon").prepend('<i class="fa fa-sign-in-alt"></i>')}initPorts(t){t=Object.assign(this.iface.data,t);for(let e=0;e<t.total;e++)this.createPort("output",String(e),Blackprint.Types.Route)}async update(){if(this._begin)return;this._begin=!0;let t=this.output;for(let e in t)await t[e]();this._begin=!1}}).type="flow-control",_Class13.output={0:Blackprint.Types.Route},_Class13)),Blackprint.registerNode("FlowControl/Switch/Route",((_Class14=class extends Blackprint.Node{constructor(t){super(t);let e=this.setInterface();e.title="Switch",e.data={outputs:[]}}init(){let t=this,e=this.iface;var r=[{title:"Create new port",async callback(){let r=await BPEditor.Dialog({title:"Port name:",text:"This port will active when 'Case' does match with this port name",input:"text"});r=r.value,r&&(t.createPort("output",r,Blackprint.Types.Route),e.data.outputs.push(r))}},{title:"Delete this port",callback(){let r=e.data.outputs,a=r.indexOf(this.name);-1!==a&&(r.splice(a,1),t.deletePort("output",this.name))}}];e.on("port.menu",Context.EventSlot,(function({port:t,menu:e}){let a;a="Case"===t.name?[r[0]]:r.slice(0);for(var o=0;o<a.length;o++)a[o].context=t;e.push(...a)})),e.$el&&e.$el(".title .icon").prepend('<i class="fa fa-random"></i>')}initPorts(t){let e=(t=Object.assign(this.iface.data,t)).outputs;for(let t=0;t<e.length;t++)this.createPort("output",e[t],Blackprint.Types.Route)}update(){let t=String(this.input.Case);if(!t)return;let e=this.output[t];e?e():this.output["​Defa​ult"]()}}).type="flow-control",_Class14.input={Case:Blackprint.Port.Union([String,Number])},_Class14.output={"​Defa​ult":Blackprint.Types.Route},_Class14));let NodeToast=Context.NodeToast=class{constructor(t){this.iface=t}clear(){this.haveInfo&&this.haveInfo.destroy(),this.haveWarn&&this.haveWarn.destroy(),this.haveError&&this.haveError.destroy(),this.haveInfo=!1,this.haveWarn=!1,this.haveError=!1}_reduceText(t){return t.replace(/\w{15,}/g,(t=>t.slice(0,5)+"..."))}info(t){if(!this.iface.$decoration)return;let e=t;t=this._reduceText(t),this.haveInfo?this.haveInfo.text=t:this.haveInfo=this.iface.$decoration.info(t),this.haveInfo._raw=e}warn(t){if(!this.iface.$decoration)return;let e=t;t=this._reduceText(t),this.haveWarn?this.haveWarn.text=t:this.haveWarn=this.iface.$decoration.warn(t),this.haveWarn._raw=e}error(t){if(!this.iface.$decoration)return;let e=t;t=this._reduceText(t),this.haveError?this.haveError.text=t:this.haveError=this.iface.$decoration.error(t),this.haveError._raw=e}success(t){if(!this.iface.$decoration)return;this.iface.$decoration.success(this._reduceText(t))._raw=t}};
//# sourceMappingURL=nodes-flowcontrol.mjs.map