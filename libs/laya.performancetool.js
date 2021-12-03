!function(t,e){"use strict";const a={autoRetryConnnect:!0,retryConnnectCount:0,retryConnnectDelay:1e4};let n=window.WebSocket;class s{constructor(t,e,s,r,o){this.clientId=0,this.socket=null,this.isSupport=!1,this.status=0,this.retryConnnectCount=0,this.onClose=(t=>{let{onClose:e,autoRetryConnnect:a,retryConnnectCount:n}=this.options;n=n||0,e&&e(t),0===this.status&&a&&(0==n||this.retryConnnectCount<n)&&this.delayRetryConnnect()}),this._delayRetryConnnectTimer=0,this._delayRetryConnnect=(()=>{clearTimeout(this._delayRetryConnnectTimer),this.retryConnnectCount++,this.reConnect()}),this.onMessage=(t=>{const{onMessage:e}=this.options;e&&e(t)}),this.onError=(t=>{const{onError:e}=this.options;e&&e(t)}),this.onOpen=(t=>{const{onOpen:e}=this.options;e&&e(t),this.retryConnnectCount=0,clearTimeout(this._delayRetryConnnectTimer)}),this.url="ws://"+t+":"+e+"?type="+r+"&name="+s,o?(Object.assign(o,a),this.options=o):this.options=a,n=window.WebSocket,this.isSupport=void 0!==n,this.isSupport?this.reConnect():console.log("not support websocket")}closeConnect(){if(this.retryConnnectCount=0,this.socket){let t=this.socket;t.onclose=null,t.onmessage=null,t.onerror=null,t.onopen=null,t.close(),this.socket=null}this.status=0}delayRetryConnnect(){clearTimeout(this._delayRetryConnnectTimer),i.enable&&(this._delayRetryConnnectTimer=setTimeout(this._delayRetryConnnect,this.options.retryConnnectDelay))}reConnect(){let t=new n(this.url);this.socket=t,t.onclose=this.onClose,t.onmessage=this.onMessage,t.onerror=this.onError,t.onopen=this.onOpen}dispose(){this.closeConnect()}send(t){return!(!this.socket||1!==this.socket.readyState)&&(this.socket.send(t),!0)}}const r=function(t,e){t=t.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)").exec(e);return a?a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):"":null},o=(t,e)=>{for(let a=0;a<e.length;a++){if(e[a].id==t)return!0}return!1};class i{constructor(){this.socketManager=null,this.selectPlayerId=0,this.active=0,this.selectPlayerStatus=0,this.sendMsg=((t,e,a=0)=>{this.socketManager.send(JSON.stringify({type:t,data:e,toId:a}))}),this.sendInternalMsg=((t,e,a=0)=>{this.socketManager.send(JSON.stringify({type:t,data:e,toId:a}))}),this.frameDataList=[],this.sendFramData=(t=>{this.active&&(this.frameDataList.push(t),this.frameDataList.length>=30&&(this.sendFramDataList(this.frameDataList),this.frameDataList.length=0))}),this.sendConfigData=((t=null)=>{let e=this.performanceDataTool.getPathInfo();this.sendInternalMsg("getPerformanceConf_back",e)}),this.sendFramDataList=(t=>{let e=t.map(t=>({type:"frameData",data:t}));this.sendInternalMsg("msgList",e)})}static set enable(t){if(i._enable!==t)if(i._enable=t,t){const t=i.initOption;if(!t)throw new Error("没有执行初始化init");const{type:e,performanceDataTool:a,onOpen:n,onMessage:s,retryConnectCount:r,retryConnnectDelay:o}=t;i.init(e,a,n,s,r,o)}else i.dispose()}static get enable(){return i._enable}init(t,e,n,h,l,_){if(this.frameDataList=[],"player"===t&&!e)throw new Error("type为player时，performanceDataTool不为空");var d="",c="",p="";window&&window.location&&window.location.href&&(p=window.location.href);var D=r("profileName",p)||"",R=r("profilePort",p)||"1050";if(i.Host||r("profileHost",p))d=i.Host||r("profileHost",p);else if(p.startsWith("http")){var E=p.indexOf("//"),C=p.indexOf("/",E+3);-1===C&&(C=p.length),(C=(c=p.substring(E+2,C)).indexOf(":"))>=0&&(c=c.substring(0,C)),d=c}else d="localhost";this.performanceDataTool=e,this.heartIntervalHandler=setInterval(()=>{this.sendInternalMsg("heart",{})},1e4),this.socketManager=new s(d,R,D,t,{retryConnectCount:l||a.retryConnnectCount,retryConnnectDelay:_||a.retryConnnectDelay,onMessage:t=>{if(this.socketManager&&"string"==typeof t.data){let e=JSON.parse(t.data),a=[e];"msgList"===e.type&&(a=e.data),a.forEach(t=>{switch(t.type){case"onSelectMe":this.sendInternalMsg("onSelectMe_back",t.data);break;case"getPerformanceConf":this.sendConfigData();break;case"selectPlayer_back":this.selectPlayerId=t.data.selectPlayer,this.selectPlayerStatus=0;break;case"onReady":this.socketManager.clientId=t.data.id,this.sendInternalMsg("start",{});break;case"active":this.active=t.data.active;break;case"playerList":if(this.selectPlayerId&&(o(this.selectPlayerId,t.data)||(this.selectPlayerId=0,this.selectPlayerStatus=0)),this.selectPlayerId&&t.data.length>0&&0==this.selectPlayerStatus){let e=t.data[0].id;this.selectPlayerStatus=1,this.sendMsg("selectPlayer",{id:e})}}}),h&&a.forEach(t=>{h(t)})}},onOpen:t=>{n&&n(t)},onError:t=>{},onClose:t=>{}})}dispose(){clearInterval(this.heartIntervalHandler),this.socketManager&&(this.socketManager.dispose(),this.socketManager=null),this.performanceDataTool=null}static init(t,e,a,n,s,r){i.instance&&i.instance.dispose(),i.initOption={type:t,performanceDataTool:e,onOpen:a,onMessage:n,retryConnectCount:s,retryConnnectDelay:r},i._enable&&(i.instance=new i,i.instance.init(t,e,a,n,s,r))}}i.sendFramData=(t=>{i._enable&&i.instance&&i.instance.sendFramData(t)}),i.sendConfigData=(t=>{i._enable&&i.instance&&i.instance.sendConfigData(t)}),i.dispose=(()=>{i.instance&&i.instance.dispose(),i.instance=null});class h{constructor(){this._enable=!1,this._AllPathMap={},this._pathColor={},this._pathCount=0,this._runtimeShowPathIndex=-1,this._nodeList=[],this.samplerFramStep=6,this._memoryDataMap={},this.pointArray=[],this.fpsArray=[]}static InitLayaPerformanceInfo(){h.instance.InitLayaPerformanceInfo()}InitLayaPerformanceInfo(){this.setPathDataColor(h.PERFORMANCE_LAYA_2D,[255,128,128,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D,[255,255,128,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_RENDER,[128,255,128,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_UPDATESCRIPT,[128,255,255,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_PHYSICS,[0,128,255,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_PHYSICS_SIMULATE,[255,0,0,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_PHYSICS_CHARACTORCOLLISION,[255,128,0,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_PHYSICS_EVENTSCRIPTS,[128,0,0,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_RENDER,[64,128,128,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_RENDER_SHADOWMAP,[192,192,192,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_RENDER_CLUSTER,[128,64,64,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_RENDER_CULLING,[0,64,128,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_RENDER_RENDERDEPTHMDOE,[128,0,64,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_RENDER_RENDEROPAQUE,[128,0,255,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_RENDER_RENDERCOMMANDBUFFER,[128,128,64,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_RENDER_RENDERTRANSPARENT,[128,0,255,255]),this.setPathDataColor(h.PERFORMANCE_LAYA_3D_RENDER_POSTPROCESS,[0,255,0,255])}set enable(t){t?(this._startFram=e.Stat.loopCount,this.resetReCordData(),this._sp=new e.Sprite,this._sp.pos(0,400).zOrder=99,e.Laya.stage.addChild(this._sp)):e.Laya.stage.removeChild(this._sp),this._enable=t}get enable(){return this._enable}get enableDataExport(){return this._enableDataExport}set enableDataExport(t){t?(i.init("player",this),i.enable=t,this.samplerFramStep=1):i.enable=t,this._enableDataExport=t}static setDataExportHost(t){i.Host=t}set runtimeShowPath(t){let e=this._AllPathMap[t];for(let t in this.pointArray)delete this.pointArray[t],delete h.stepLengthArrayMap[t];this._runtimeShowPathIndex=null!=e?e:-1}getNodePathIndex(t){var e;return null!=this._AllPathMap[t]?e=this._AllPathMap[t]:(e=this._pathCount++,this._AllPathMap[t]=e,i.sendConfigData(this.getPathInfo())),e}getPathInfo(){let t={};return 0==Object.keys(this._pathColor).length&&this.InitLayaPerformanceInfo(),t._pathColor=this._pathColor,t._AllPathMap=this._AllPathMap,t}exportPerformanceFile(t=!1){h.InitLayaPerformanceInfo(),t||(this.enable=!1);let a,n,s,r=[],o=[],i=[],l=0,_=new e.Byte;_.pos=0,_.writeUTFString(h.VERSION),r.push("DataInfo01","Color","NodeInfo"),_.writeUint16(r.length);for(let t=0;t<r.length;t++)_.writeUTFString(r[t]);o.length=r.length,i.length=r.length,a=_.pos;for(let t=0;t<r.length;t++)_.writeInt32(0),_.writeInt32(0);o[0]=_.pos,_.writeInt32(this._nodeList.length),_.writeInt32(this.samplerFramStep),_.writeInt32(this._pathCount);for(let t in this._AllPathMap)_.writeUTFString(t);n=_.pos,_.writeInt32(0);for(let t in this._memoryDataMap)_.writeUTFString(t),l++;s=_.pos,_.pos=n,_.writeInt32(l),_.pos=s,i[0]=_.pos-o[0],o[1]=_.pos,n=_.pos,l=0,_.writeInt32(0);for(let t in this._pathColor){var d=this._pathColor[t];_.writeUTFString(t),_.writeUint32(d[0]),_.writeUint32(d[1]),_.writeUint32(d[2]),_.writeUint32(d[3]),l++}s=_.pos,_.pos=n,_.writeInt32(l),_.pos=s,i[1]=_.pos-o[1],o[2]=_.pos;for(let t=0;t<this._nodeList.length;t++){let e=this._nodeList[t];_.writeInt32(e.nodeNum);for(var c=0;c<e.nodeNum;c++)_.writeFloat32(e.nodeDelty[c]?e.nodeDelty[c]:0)}i[2]=_.pos-o[2],_.pos=a;for(let t=0;t<r.length;t++)_.writeInt32(o[t]),_.writeInt32(i[t]);return _}BegainSample(t){this.enable&&(this.update(),this._runtimeNode.getFunStart(this.getNodePathIndex(t)))}EndSample(t){return this.enable?this._runtimeNode.getFunEnd(this.getNodePathIndex(t)):0}AddMemory(t,e){this._memoryDataMap[t]=this._memoryDataMap[t]?this._memoryDataMap[t]+e:e}setPathDataColor(t,e){this._pathColor[t]=e}resetReCordData(){this._nodeList.forEach(t=>{l.revert(t)}),this._nodeList=[],this._runtimeNode=null,this._AllPathMap={},this._memoryDataMap={},this._pathColor={},this._pathCount=0}exportFrontNode(t,e){if(!t||!t.nodeDelty||-1==e)return;const a=h.DrawWidth,n=h.DrawHeight,s=h.StepLength;let r,o,i;this._sp.graphics.clear(),this._sp.graphics.drawRect(0,0,a,n,"rgba(150, 150, 150, 0.8)");for(let l=0,_=t.nodeDelty.length;l<_;l++){if(l!=e&&l!=this.getNodePathIndex(h.PERFORMANCE_DELTYTIME))continue;i=(o=t.nodeDelty[l])/33,this.pointArray[l]||(this.pointArray[l]=[]),(r=this.pointArray[l]).length>=s&&r.shift(),r.push(i);let _=l.toString(16),d=`#${_}${_}C4${_}${_}`;l==this.getNodePathIndex(h.PERFORMANCE_DELTYTIME)&&(d="#FFFFFF"),h.stepLengthArrayMap[l]||(h.stepLengthArrayMap[l]=new Array(2*h.StepLength)),this.updatelineChart(a,n,s,r,d,1,h.stepLengthArrayMap[l])}this._sp.graphics.drawLine(0,n/2,a,n/2,"green",1),this._sp.graphics.drawLine(0,n/4*3,a,n/4*3,"red",1)}updatelineChart(t,e,a,n,s,r,o){switch(r){case 1:let i=o;for(let s=0,r=n.length;s<r;s++)i[2*s]=t/a*s,i[2*s+1]=Math.max(e-n[s]*e/this.samplerFramStep,0);this._sp.graphics.drawLines(0,0,i,s,1);break;case 2:let h=t/a;for(let r=0,o=n.length;r<o;r++)this._sp.graphics.drawRect(t/a*r,e,h,-Math.min(n[r]*e,e),s)}}update(){let t=(e.Stat.loopCount-this._startFram)/this.samplerFramStep|0;if(!t)return this._runtimeNode=l.create(this._pathCount),void(this._runtimeNode.nodeDelty[this.getNodePathIndex(h.PERFORMANCE_STARTTIME)]=performance.now());if(t!=this._nodeList.length){for(let t in this._memoryDataMap)this._runtimeNode.setMemory(this.getNodePathIndex(t),this._memoryDataMap[t]);this._runtimeNode&&(this._runtimeNode.nodeDelty[this.getNodePathIndex(h.PERFORMANCE_DELTYTIME)]=performance.now()-this._runtimeNode.nodeDelty[this.getNodePathIndex(h.PERFORMANCE_STARTTIME)],this.exportFrontNode(this._runtimeNode,this._runtimeShowPathIndex),i.sendFramData(this._runtimeNode)),this._runtimeNode=l.create(this._pathCount),this._runtimeNode.nodeDelty[this.getNodePathIndex(h.PERFORMANCE_STARTTIME)]=performance.now(),this._nodeList.push(this._runtimeNode)}}static showMemoryData(t){}static showFunSampleGroup(t){}showFunSampleFun(t){this.runtimeShowPath=t}}h.VERSION="PERFORMANCEDATA:01",h.instance=new h,h.PERFORMANCE_DELTYTIME="deltyTime",h.PERFORMANCE_STARTTIME="startTime",h.PERFORMANCE_LAYA="Laya",h.PERFORMANCE_LAYA_3D="Laya/3D",h.PERFORMANCE_LAYA_2D="Laya/2D",h.PERFORMANCE_LAYA_3D_PRERENDER="Laya/3D/PreRender",h.PERFORMANCE_LAYA_3D_UPDATESCRIPT="Laya/3D/UpdateScript",h.PERFORMANCE_LAYA_3D_PHYSICS="Laya/3D/Physics",h.PERFORMANCE_LAYA_3D_PHYSICS_SIMULATE="Laya/3D/Physics/simulate",h.PERFORMANCE_LAYA_3D_PHYSICS_CHARACTORCOLLISION="Laya/3D/Physics/updataCharacters&Collisions",h.PERFORMANCE_LAYA_3D_PHYSICS_EVENTSCRIPTS="Laya/3D/Physics/eventScripts",h.PERFORMANCE_LAYA_3D_RENDER="Laya/3D/Render",h.PERFORMANCE_LAYA_3D_RENDER_SHADOWMAP="Laya/3D/Render/ShadowMap",h.PERFORMANCE_LAYA_3D_RENDER_CLUSTER="Laya/3D/Render/Cluster",h.PERFORMANCE_LAYA_3D_RENDER_CULLING="Laya/3D/Render/Culling",h.PERFORMANCE_LAYA_3D_RENDER_RENDERDEPTHMDOE="Laya/3D/Render/RenderDepthMode",h.PERFORMANCE_LAYA_3D_RENDER_RENDEROPAQUE="Laya/3D/Render/RenderOpaque",h.PERFORMANCE_LAYA_3D_RENDER_RENDERCOMMANDBUFFER="Laya/3D/Render/RenderCommandBuffer",h.PERFORMANCE_LAYA_3D_RENDER_RENDERTRANSPARENT="Laya/3D/Render/RenderTransparent",h.PERFORMANCE_LAYA_3D_RENDER_POSTPROCESS="Laya/3D/Render/PostProcess",h._surpport=!1,h.DrawWidth=250,h.DrawHeight=250,h.StepLength=250,h.stepLengthArrayMap=new Array;class l{constructor(){this.inPool=!1,this.nodeNum=0,this.nodeStart=[],this.nodeDelty=[],this.applyCount=0}static create(t){let e;return(e=this._pool.length>0?this._pool.pop():new l).resetData(t),e.inPool=!1,e}static revert(t){t.inPool=!0,this._pool.push(t),t.clearData()}clearData(){this.nodeStart.length=0,this.nodeDelty.length=0}resetData(t){this.nodeNum=t,this.nodeStart.length=t,this.nodeDelty.length=t}getFunStart(t){this.applyCount++,this.nodeStart[t]=performance.now()}getFunEnd(t){return this.nodeDelty[t]?this.nodeDelty[t]+=0!=this.nodeStart[t]?performance.now()-this.nodeStart[t]:0:(this.nodeDelty[t]=0!=this.nodeStart[t]?performance.now()-this.nodeStart[t]:0,this.nodeNum=this.nodeDelty.length),this.nodeDelty[t]}setMemory(t,e){this.nodeDelty[t]=e}getPathData(t){return this.nodeDelty[t]}}l._pool=[];class _{static parsePerformanceFile(t,e){t.pos=0,_.performanceData=e,_._readData=t,_.READ_DATA();for(let t=0,e=_._blockStr.length;t<e;t++){var a=_._blockStr[t],n=_["READ_"+a];if(null==n)throw new Error("model file err,no this function:"+a);_._readData.pos=_._blockStart[t],n.call(null)}}static READ_DATA(){let t=_._readData,e=t.readUTFString();if("PERFORMANCEDATA:01"!=e)throw e+"is not standard Version";let a=_._blockStr.length=t.readUint16();for(let e=0;e<a;e++)_._blockStr[e]=t.readUTFString();for(let e=0;e<a;e++)_._blockStart[e]=t.readInt32(),_._blocklength[e]=t.readInt32()}static READ_DataInfo01(){let t=_._readData,e=_.performanceData;_._nodeNums=t.readInt32(),e.samplerFramStep=t.readInt32();let a=t.readInt32();for(let n=0;n<a;n++)e.getNodePathIndex(t.readUTFString());let n=t.readInt32();for(let a=0;a<n;a++)e._memoryDataMap[t.readUTFString()]=1}static READ_Color(){let t=_._readData,e=_.performanceData,a=t.readInt32();for(let n=0;n<a;n++)e.setPathDataColor(t.readUTFString(),[t.readUint32(),t.readUint32(),t.readUint32(),t.readUint32()])}static READ_NodeInfo(){let t,e,a=_._readData,n=_.performanceData;for(let s=0;s<_._nodeNums;s++){e=a.readInt32(),t=l.create(e);for(let n=0,s=e;n<s;n++)t.nodeDelty[n]=a.readFloat32();n._nodeList[s]=t}}}_._blockStr=[],_._blockStart=[],_._blocklength=[],_.performanceData=new h,t.PerforManceNode=l,t.PerformanceDataTool=h,t.PerformanceNodeParse=_}(window.Laya=window.Laya||{},Laya);