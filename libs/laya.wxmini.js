window.wxMiniGame=function(e,t){"use strict";function ImageDataPolyfill(){let e,i,a;if(3==arguments.length){if(!(arguments[0]instanceof Uint8ClampedArray))throw new Error("Failed to construct 'ImageData': parameter 1 is not of type 'Uint8ClampedArray'.");if(arguments[0].length%4!=0)throw new Error("Failed to construct 'ImageData': The input data length is not a multiple of 4.");if(arguments[0].length!==arguments[1]*arguments[2]*4)throw new Error("Failed to construct 'ImageData': The input data length is not equal to (4 * width * height).");a=arguments[0],e=arguments[1],i=arguments[2]}else if(2==arguments.length)e=arguments[0],i=arguments[1],a=new Uint8ClampedArray(arguments[0]*arguments[1]*4);else if(arguments.length<2)throw new Error("Failed to construct 'ImageData': 2 arguments required, but only "+arguments.length+" present.");let n=t.Browser.canvas.getContext("2d").getImageData(0,0,e,i);for(let e=0;e<a.length;e+=4)n.data[e]=a[e],n.data[e+1]=a[e+1],n.data[e+2]=a[e+2],n.data[e+3]=a[e+3];return n}class i{static isLocalNativeFile(e){for(var t=0,i=l.nativefiles.length;t<i;t++)if(-1!=e.indexOf(l.nativefiles[t]))return!0;return!1}static isLocalNativeZipFile(e){for(var t=0,i=l.nativezipfiles.length;t<i;t++)if(-1!=e.indexOf(l.nativezipfiles[t]))return!0;return!1}static isNetFile(e){return(-1!=e.indexOf("http://")||-1!=e.indexOf("https://"))&&-1==e.indexOf(l.window.wx.env.USER_DATA_PATH)}static getFileInfo(e){var t=e,a=i.fakeObj[t];return null==a?null:a}static read(e,a="utf8",n=null,s="",o=!1,r=""){var l;l=""==s||-1==s.indexOf("http://")&&-1==s.indexOf("https://")?e:i.getFileNativePath(e),l=t.URL.getAdptedFilePath(l),i.fs.readFile({filePath:l,encoding:a,success:function(e){null!=n&&n.runWith([0,e])},fail:function(e){e&&""!=s?i.downFiles(s,a,n,s,o,r):null!=n&&n.runWith([1])}})}static isFile(e){let t;try{t=i.fs.statSync(e)}catch(e){return!1}return t.isFile()}static downFiles(e,t="utf8",a=null,n="",s=!1,o="",r=!0){i.down({url:e,success:function(l){200===l.statusCode?i.readFile(l.tempFilePath,t,a,n,s,o,r):403===l.statusCode?null!=a&&a.runWith([0,e]):null!=a&&a.runWith([1,l])},fail:function(e){null!=a&&a.runWith([1,e])}}).onProgressUpdate(function(e){null!=a&&a.runWith([2,e.progress])})}static readFile(e,a="utf8",n=null,s="",o=!1,r="",d=!0){e=t.URL.getAdptedFilePath(e),i.fs.readFile({filePath:e,encoding:a,success:function(t){-1==e.indexOf("http://")&&-1==e.indexOf("https://")||-1!=e.indexOf(l.window.wx.env.USER_DATA_PATH)?null!=n&&n.runWith([0,t]):l.AutoCacheDownFile||o?(null!=n&&n.runWith([0,t]),i.copyTOCache(e,s,null,a,d)):null!=n&&n.runWith([0,t])},fail:function(e){e&&null!=n&&n.runWith([1,e])}})}static downOtherFiles(e,t=null,a="",n=!1,s=!0){i.down({url:e,success:function(e){200===e.statusCode?(l.autoCacheFile||n)&&-1==a.indexOf("qlogo.cn")&&-1==a.indexOf(".php")?(null!=t&&t.runWith([0,e.tempFilePath]),i.copyTOCache(e.tempFilePath,a,null,"",s)):null!=t&&t.runWith([0,e.tempFilePath]):null!=t&&t.runWith([1,e])},fail:function(e){null!=t&&t.runWith([1,e])}})}static copyFile(e,t,a=null){i.fs.copyFile({srcPath:e,destPath:t,success:function(){a&&a.runWith(0)},fail:function(e){a&&a.runWith([1,e])}})}static downLoadFile(e,a="",n=null,s="utf8"){window.navigator.userAgent.indexOf("MiniGame")<0?t.Laya.loader.load(e,n):a==t.Loader.IMAGE||a==t.Loader.SOUND?i.downOtherFiles(e,n,e,!0,!1):i.downFiles(e,s,n,e,!0,a,!1)}static copyTOCache(e,a,n,s="",o=!0){var r=e.split("/"),d=r[r.length-1],u=a,c=i.getFileInfo(a),h=i.getFileNativePath(d);i.fakeObj[u]={md5:d,readyUrl:a,size:0,times:t.Browser.now(),encoding:s,tempFilePath:e};var f=l.sizeLimit,p=i.getCacheUseSize();c?c.readyUrl!=a?i.fs.getFileInfo({filePath:e,success:function(t){o&&p+4194304+t.size>=f&&(t.size>l.minClearSize&&(l.minClearSize=t.size),i.onClearCacheRes()),i.deleteFile(e,a,n,s,t.size)},fail:function(e){null!=n&&n.runWith([1,e])}}):null!=n&&n.runWith([0]):i.fs.getFileInfo({filePath:e,success:function(t){o&&p+4194304+t.size>=f&&(t.size>l.minClearSize&&(l.minClearSize=t.size),i.onClearCacheRes()),i.fs.copyFile({srcPath:e,destPath:h,success:function(e){i.onSaveFile(a,d,!0,s,n,t.size)},fail:function(e){null!=n&&n.runWith([1,e])}})},fail:function(e){null!=n&&n.runWith([1,e])}})}static onClearCacheRes(){var e=l.minClearSize,t=[];for(var a in i.filesListObj)"fileUsedSize"!=a&&t.push(i.filesListObj[a]);i.sortOn(t,"times",i.NUMERIC);for(var n=0,s=1,o=t.length;s<o;s++){var r=t[s];if(n>=e)break;n+=r.size,i.deleteFile("",r.readyUrl)}}static sortOn(e,t,a=0){return a==i.NUMERIC?e.sort(function(e,i){return e[t]-i[t]}):a==(i.NUMERIC|i.DESCENDING)?e.sort(function(e,i){return i[t]-e[t]}):e.sort(function(e,i){return e[t]-i[t]})}static getFileNativePath(e){return i.fileNativeDir+"/"+e}static deleteFile(e,t="",a=null,n="",s=0){var o=i.getFileInfo(t),r=i.getFileNativePath(o.md5);if(i.fs.unlink({filePath:r,success:function(o){if(""!=e){var r=i.getFileNativePath(e);i.fs.copyFile({srcPath:e,destPath:r,success:function(o){i.onSaveFile(t,e,!0,n,a,s)},fail:function(e){null!=a&&a.runWith([1,e])}})}else i.onSaveFile(t,e,!1,n,a,s)},fail:function(e){null!=a&&a.runWith([1,e])}}),t&&""!=t&&-1!=t.indexOf(".zip")){var d=l.zipHeadFiles[t];if(d)try{i.fs.rmdirSync(d,!0)}catch(e){console.log("目录:"+d+"delete fail"),console.log(e)}}}static deleteAll(){var e=[];for(var t in i.filesListObj)"fileUsedSize"!=t&&e.push(i.filesListObj[t]);for(var a=1,n=e.length;a<n;a++){var s=e[a];i.deleteFile("",s.readyUrl)}i.filesListObj&&i.filesListObj.fileUsedSize&&(i.filesListObj.fileUsedSize=0),i.writeFilesList("",JSON.stringify({}),!1)}static onSaveFile(e,a,n=!0,s="",o=null,r=0){var l=e;if(null==i.filesListObj.fileUsedSize&&(i.filesListObj.fileUsedSize=0),n){var d=i.getFileNativePath(a);i.filesListObj[l]={md5:a,readyUrl:e,size:r,times:t.Browser.now(),encoding:s,tempFilePath:d},i.filesListObj.fileUsedSize=parseInt(i.filesListObj.fileUsedSize)+r,i.writeFilesList(l,JSON.stringify(i.filesListObj),!0),null!=o&&o.runWith([0])}else if(i.filesListObj[l]){var u=parseInt(i.filesListObj[l].size);i.filesListObj.fileUsedSize=parseInt(i.filesListObj.fileUsedSize)-u,i.fakeObj[l].md5==i.filesListObj[l].md5&&delete i.fakeObj[l],delete i.filesListObj[l],i.writeFilesList(l,JSON.stringify(i.filesListObj),!1),null!=o&&o.runWith([0])}}static writeFilesList(e,t,a){var n=i.fileNativeDir+"/"+i.fileListName;i.fs.writeFile({filePath:n,encoding:"utf8",data:t,success:function(e){},fail:function(e){}}),!l.isZiYu&&l.isPosMsgYu&&l.window.wx.postMessage({url:e,data:i.filesListObj[e],isLoad:"filenative",isAdd:a})}static getCacheUseSize(){return i.filesListObj&&i.filesListObj.fileUsedSize?i.filesListObj.fileUsedSize:0}static getCacheList(e,t){let a;try{a=i.fs.statSync(e)}catch(e){a=null}a?i.readSync(i.fileListName,"utf8",t):(i.fs.mkdirSync(e,!0),t&&t.runWith([1]))}static existDir(e,t){i.fs.mkdir({dirPath:e,success:function(e){null!=t&&t.runWith([0,{data:JSON.stringify({})}])},fail:function(e){-1!=e.errMsg.indexOf("file already exists")?i.readSync(i.fileListName,"utf8",t):null!=t&&t.runWith([1,e])}})}static readSync(e,t="utf8",a=null,n=""){var s,o=i.getFileNativePath(e);try{s=i.fs.readFileSync(o,t),null!=a&&a.runWith([0,{data:s}])}catch(e){null!=a&&a.runWith([1])}}static setNativeFileDir(e){i.fileNativeDir=l.window.wx.env.USER_DATA_PATH+e}}i.fs=window.wx.getFileSystemManager(),i.down=window.wx.downloadFile,i.filesListObj={},i.fakeObj={},i.fileListName="layaairfiles.txt",i.ziyuFileData={},i.ziyuFileTextureData={},i.loadPath="",i.DESCENDING=2,i.NUMERIC=16;class a extends t.SoundChannel{constructor(e){super(),this._sound=e,this._audio=e._sound,this._onCanplay=this.onCanPlay.bind(this),this._onError=this.onError.bind(this),this._onEnd=this.__onEnd.bind(this),this.addEventListener()}addEventListener(){this._audio.onError(this._onError),this._audio.onCanplay(this._onCanplay)}offEventListener(){this._audio.offError(this._onError),this._audio.offCanplay(this._onCanplay),this._audio.offEnded(this._onEnd)}onError(e){console.log("-----1---------------minisound-----url:",this.url),console.log(e),this.event(t.Event.ERROR),this._audio&&(this._sound.dispose(),this.offEventListener(),this._sound=this._audio=null)}onCanPlay(){this._audio&&(this.event(t.Event.COMPLETE),this.offEventListener(),this._audio.onEnded(this._onEnd),this.isStopped?this.stop():this.play())}__onEnd(){if(1==this.loops)return this.completeHandler&&(t.Laya.systemTimer.once(10,this,this.__runComplete,[this.completeHandler],!1),this.completeHandler=null),this.stop(),void this.event(t.Event.COMPLETE);this.loops>0&&this.loops--,this.startTime=0,this.play()}play(){this.isStopped=!1,t.SoundManager.addChannel(this),this._audio&&this._audio.play()}set startTime(e){this._audio&&(this._audio.startTime=e)}set autoplay(e){this._audio&&(this._audio.autoplay=e)}get autoplay(){return!!this._audio&&this._audio.autoplay}get position(){return this._audio?this._audio.currentTime:0}get duration(){return this._audio?this._audio.duration:0}stop(){super.stop(),this.isStopped=!0,t.SoundManager.removeChannel(this),this.completeHandler=null,this._audio&&(this._audio.stop(),this.loop||(this.offEventListener(),this._sound.dispose(),this._sound=null,this._audio=null))}pause(){this.isStopped=!0,this._audio&&this._audio.pause()}get loop(){return!!this._audio&&this._audio.loop}set loop(e){this._audio&&(this._audio.loop=e)}resume(){this.isStopped=!1,t.SoundManager.addChannel(this),this._audio&&this._audio.play()}set volume(e){this._audio&&(this._audio.volume=e)}get volume(){return this._audio?this._audio.volume:0}}class n extends t.EventDispatcher{constructor(){super(),this.loaded=!1,this._sound=n._createSound()}static _createSound(){return n._id++,l.window.wx.createInnerAudioContext()}load(e){if(i.isLocalNativeFile(e)){if(!i.isLocalNativeZipFile(e)&&i.isNetFile(e))if(""!=i.loadPath)e=e.split(i.loadPath)[1];else{var a=""!=t.URL.rootPath?t.URL.rootPath:t.URL._basePath;""!=a&&(e=e.split(a)[1])}}else e=t.URL.formatURL(e);if(this.url=e,this.readyUrl=e,l.autoCacheFile&&i.getFileInfo(e))this.onDownLoadCallBack(e,0);else if(l.autoCacheFile)if(i.isLocalNativeFile(e)){if(l.subNativeFiles&&0==l.subNativeheads.length)for(var n in l.subNativeFiles){var s=l.subNativeFiles[n];l.subNativeheads=l.subNativeheads.concat(s);for(let e=0;e<s.length;e++)l.subMaps[s[e]]=n+"/"+s[e]}if(l.subNativeFiles&&-1!=e.indexOf("/")){var o=e.split("/")[0]+"/";if(o&&-1!=l.subNativeheads.indexOf(o)){var r=l.subMaps[o];e=e.replace(o,r)}}this.onDownLoadCallBack(e,0)}else i.isNetFile(e)?i.downOtherFiles(e,t.Handler.create(this,this.onDownLoadCallBack,[e]),e):this.onDownLoadCallBack(e,0);else this.onDownLoadCallBack(e,0)}onDownLoadCallBack(e,a,n=null){var s;if(!a&&this._sound)if(l.autoCacheFile){if(n)s=n;else if(i.isLocalNativeFile(e)){var o=""!=t.URL.rootPath?t.URL.rootPath:t.URL._basePath,r=e;""==o||-1==e.indexOf("http://")&&-1==e.indexOf("https://")||(s=e.split(o)[1]),s||(s=r),-1==s.indexOf(l.window.wx.env.USER_DATA_PATH)&&i.isLocalNativeZipFile(s)&&(s=i.getFileNativePath(s))}else{var d=i.getFileInfo(e);s=d&&d.md5?d.tempFilePath||i.getFileNativePath(d.md5):e}this._sound.src=this.readyUrl=s}else this._sound.src=this.readyUrl=e;else this.event(t.Event.ERROR)}play(e=0,i=0){if(!this.url)return null;var n=new a(this);return n.url=this.url,n.loops=i,n.loop=0===i,n.startTime=e,n.isStopped=!1,t.SoundManager.addChannel(n),n}get duration(){return this._sound.duration}dispose(){this._sound&&(this._sound.destroy(),this._sound=null,this.readyUrl=this.url=null)}}n._id=0;class s{constructor(){}static _createInputElement(){t.Input._initInput(t.Input.area=t.Browser.createElement("textarea")),t.Input._initInput(t.Input.input=t.Browser.createElement("input")),t.Input.inputContainer=t.Browser.createElement("div"),t.Input.inputContainer.style.position="absolute",t.Input.inputContainer.style.zIndex=1e5,t.Browser.container.appendChild(t.Input.inputContainer),t.Laya.stage.on("resize",null,s._onStageResize),l.window.wx.onWindowResize&&l.window.wx.onWindowResize(function(e){}),t.SoundManager._soundClass=n,t.SoundManager._musicClass=n;var e=l.systemInfo.model,i=l.systemInfo.system;-1!=e.indexOf("iPhone")&&(t.Browser.onIPhone=!0,t.Browser.onIOS=!0,t.Browser.onIPad=!0,t.Browser.onAndroid=!1),-1==i.indexOf("Android")&&-1==i.indexOf("Adr")||(t.Browser.onAndroid=!0,t.Browser.onIPhone=!1,t.Browser.onIOS=!1,t.Browser.onIPad=!1)}static _onStageResize(){t.Laya.stage._canvasTransform.identity().scale(t.Browser.width/t.Render.canvas.width/t.Browser.pixelRatio,t.Browser.height/t.Render.canvas.height/t.Browser.pixelRatio)}static wxinputFocus(e){var i=t.Input.inputElement.target;i&&!i.editable||(l.window.wx.offKeyboardConfirm(),l.window.wx.offKeyboardInput(),l.window.wx.showKeyboard({defaultValue:i.text,maxLength:i.maxChars,multiple:i.multiline,confirmHold:!0,confirmType:i.confirmType||"done",success:function(e){},fail:function(e){}}),l.window.wx.onKeyboardConfirm(function(e){var a=e?e.value:"";i._restrictPattern&&(a=a.replace(/\u2006|\x27/g,""),i._restrictPattern.test(a)&&(a=a.replace(i._restrictPattern,""))),i.text=a,i.event(t.Event.INPUT),s.inputEnter(),i.event("confirm")}),l.window.wx.onKeyboardInput(function(e){var a=e?e.value:"";i.multiline||-1==a.indexOf("\n")?(i._restrictPattern&&(a=a.replace(/\u2006|\x27/g,""),i._restrictPattern.test(a)&&(a=a.replace(i._restrictPattern,""))),i.text=a,i.event(t.Event.INPUT)):s.inputEnter()}))}static inputEnter(){t.Input.inputElement.target.focus=!1}static wxinputblur(){s.hideKeyboard()}static hideKeyboard(){l.window.wx.offKeyboardConfirm(),l.window.wx.offKeyboardInput(),l.window.wx.hideKeyboard({success:function(e){console.log("隐藏键盘")},fail:function(e){console.log("隐藏键盘出错:"+(e?e.errMsg:""))}})}}class o extends t.EventDispatcher{constructor(){super()}_loadResourceFilter(e,a){if(this.sourceUrl=t.URL.formatURL(a),i.isNetFile(a))if(""!=i.loadPath)a=a.split(i.loadPath)[1];else{var n=""!=t.URL.rootPath?t.URL.rootPath:t.URL._basePath,s=a;""!=n&&(a=a.split(n)[1]),a||(a=s)}if(l.subNativeFiles&&0==l.subNativeheads.length)for(var r in l.subNativeFiles){var d=l.subNativeFiles[r];l.subNativeheads=l.subNativeheads.concat(d);for(var u=0;u<d.length;u++)l.subMaps[d[u]]=r+"/"+d[u]}if(l.subNativeFiles&&-1!=a.indexOf("/")){var c=a.split("/")[0]+"/";if(c&&-1!=l.subNativeheads.indexOf(c)){var h=l.subMaps[c];a=a.replace(c,h)}}switch(e){case t.Loader.IMAGE:case"htmlimage":case"nativeimage":o._transformImgUrl(a,e,this);break;case t.Loader.SOUND:this._loadSound(a);break;default:this._loadResource(e,a)}}_loadSound(e){if(l.autoCacheFile){var a=t.URL.formatURL(e);i.isLocalNativeFile(e)||i.getFileInfo(a)?o.onDownLoadCallBack(e,this,0):i.isNetFile(a)?i.downOtherFiles(a,t.Handler.create(o,o.onDownLoadCallBack,[a,this]),a):o.onDownLoadCallBack(e,this,0)}else o.onDownLoadCallBack(e,this,0)}static onDownLoadCallBack(e,a,n,s=null){if(n)a.event(t.Event.ERROR,"Load sound failed");else{var o;if(l.autoCacheFile)if(s)o=s;else if(i.isLocalNativeFile(e))-1==(o=e).indexOf(l.window.wx.env.USER_DATA_PATH)&&i.isLocalNativeZipFile(o)&&(o=i.getFileNativePath(o));else{var r=i.getFileInfo(e);o=r&&r.md5?r.tempFilePath||i.getFileNativePath(r.md5):e}else o=t.URL.formatURL(e);e=o;var d=new t.SoundManager._soundClass;d.load(e),a.onLoaded(d)}}complete(e){e instanceof t.Resource?e._setCreateURL(this.sourceUrl):e instanceof t.Texture&&e.bitmap instanceof t.Resource&&e.bitmap._setCreateURL(this.sourceUrl),this.originComplete(e)}_loadHttpRequestWhat(e,a){var n=l.getUrlEncode(e,a);if(t.Loader.preLoadedMap[e])this.onLoaded(t.Loader.preLoadedMap[e]);else{var s=t.URL.formatURL(e);if(l.AutoCacheDownFile)if(i.isLocalNativeFile(e)||i.getFileInfo(s)){var r=e,d=i.getFileInfo(s);d&&d.md5&&(r=d.tempFilePath||i.getFileNativePath(d.md5)),i.readFile(r,n,new t.Handler(o,o.onReadNativeCallBack,[e,a,this]),e)}else i.isNetFile(s)?i.downFiles(s,n,new t.Handler(o,o.onReadNativeCallBack,[e,a,this]),s,!0):i.readFile(e,n,new t.Handler(o,o.onReadNativeCallBack,[e,a,this]),e);else i.isNetFile(s)?this._loadHttpRequest(s,a,this,this.onLoaded,this,this.onProgress,this,this.onError):(-1==e.indexOf(l.window.wx.env.USER_DATA_PATH)&&i.isLocalNativeZipFile(e)&&(e=i.getFileNativePath(e)),i.readFile(e,n,new t.Handler(o,o.onReadNativeCallBack,[e,a,this]),e))}}static onReadNativeCallBack(e,i=null,a=null,n=0,s=null){var o;n?1==n&&a._loadHttpRequest(e,i,a,a.onLoaded,a,a.onProgress,a,a.onError):(o=i==t.Loader.JSON||i==t.Loader.ATLAS||i==t.Loader.PREFAB||i==t.Loader.PLF?l.getJson(s.data):i==t.Loader.XML?t.Utils.parseXMLFromString(s.data):s.data,!l.isZiYu&&l.isPosMsgYu&&i!=t.Loader.BUFFER&&l.window.wx.postMessage({url:e,data:o,isLoad:"filedata"}),a.onLoaded(o))}static _transformImgUrl(e,a,n){if(l.isZiYu||i.isLocalNativeFile(e))return i.isLocalNativeZipFile(e)&&(e=i.getFileNativePath(e)),void n._loadImage(e,!1);if(l.autoCacheFile){var s=t.URL.formatURL(e);i.isLocalNativeFile(e)||i.getFileInfo(s)?o.onCreateImage(e,n):i.isNetFile(s)?i.downOtherFiles(s,new t.Handler(o,o.onDownImgCallBack,[e,n]),s):o.onCreateImage(e,n,!0)}else n._loadImage(e)}static onDownImgCallBack(e,t,i,a=""){i?t.onError(null):o.onCreateImage(e,t,!1,a)}static onCreateImage(e,a,n=!1,s=""){var o;if(l.autoCacheFile)if(n)if(l.isZiYu){var r=t.URL.formatURL(e);o=i.ziyuFileTextureData[r]?i.ziyuFileTextureData[r]:e}else o=e;else if(""!=s)o=s;else{var d=i.getFileInfo(t.URL.formatURL(e));o=d.tempFilePath||i.getFileNativePath(d.md5)}else o=n?e:s;a._loadImage(o,!1)}}class r{constructor(){}static __init__(){r.items=r}static setItem(e,t){try{l.window.wx.setStorageSync(e,t)}catch(i){l.window.wx.setStorage({key:e,data:t})}}static getItem(e){return l.window.wx.getStorageSync(e)}static setJSON(e,t){r.setItem(e,t)}static getJSON(e){return r.getItem(e)}static removeItem(e){l.window.wx.removeStorageSync(e)}static clear(){l.window.wx.clearStorageSync()}static getStorageInfoSync(){try{var e=l.window.wx.getStorageInfoSync();return console.log(e.keys),console.log(e.currentSize),console.log(e.limitSize),e}catch(e){}return null}}r.support=!0;class l{static getJson(e){return JSON.parse(e)}static enable(){l.init(t.Laya.isWXPosMsg,t.Laya.isWXOpenDataContext)}static init(e=!1,a=!1){l._inited||(l._inited=!0,l.window=window,l.window.hasOwnProperty("wx")&&(l.window.navigator.userAgent.indexOf("MiniGame")<0||(l.isZiYu=a,l.isPosMsgYu=e,l.EnvConfig={},l.isZiYu||(i.setNativeFileDir("/layaairGame"),i.getCacheList(i.fileNativeDir,t.Handler.create(l,l.onMkdirCallBack))),l.systemInfo=l.window.wx.getSystemInfoSync(),l.window.focus=function(){},t.Laya._getUrlPath=function(){return""},l.window.logtime=function(e){},l.window.alertTimeLog=function(e){},l.window.resetShareInfo=function(){},l.window.CanvasRenderingContext2D=function(){},l.window.CanvasRenderingContext2D.prototype=l.window.wx.createCanvas().getContext("2d").__proto__,l.window.document.body.appendChild=function(){},l.EnvConfig.pixelRatioInt=0,t.Browser._pixelRatio=l.pixelRatio(),l._preCreateElement=t.Browser.createElement,t.Browser.createElement=l.createElement,t.RunDriver.createShaderCondition=l.createShaderCondition,t.Utils.parseXMLFromString=l.parseXMLFromString,t.Input._createInputElement=s._createInputElement,window.ImageData||(window.ImageData=ImageDataPolyfill),t.Loader.prototype._loadResourceFilter=o.prototype._loadResourceFilter,t.Loader.prototype.originComplete=t.Loader.prototype.complete,t.Loader.prototype.complete=o.prototype.complete,t.Loader.prototype._loadSound=o.prototype._loadSound,t.Loader.prototype._loadHttpRequestWhat=o.prototype._loadHttpRequestWhat,t.LocalStorage._baseClass=r,r.__init__(),l.window.wx.onMessage&&l.window.wx.onMessage(l._onMessage))))}static _onMessage(e){switch(e.type){case"changeMatrix":t.Laya.stage.transform.identity(),t.Laya.stage._width=e.w,t.Laya.stage._height=e.h,t.Laya.stage._canvasTransform=new t.Matrix(e.a,e.b,e.c,e.d,e.tx,e.ty);break;case"display":t.Laya.stage.frameRate=e.rate||t.Stage.FRAME_FAST;break;case"undisplay":t.Laya.stage.frameRate=t.Stage.FRAME_SLEEP}"opendatacontext"==e.isLoad?e.url&&(i.ziyuFileData[e.url]=e.atlasdata,i.ziyuFileTextureData[e.imgReadyUrl]=e.imgNativeUrl):"openJsondatacontext"==e.isLoad?e.url&&(i.ziyuFileData[e.url]=e.atlasdata):"openJsondatacontextPic"==e.isLoad&&(i.ziyuFileTextureData[e.imgReadyUrl]=e.imgNativeUrl)}static loadZip(e,t,a,n,s=0){var o=i.fs;if(o&&o.unzip){l.nativefiles.push(t),l.nativezipfiles.push(t);var r=i.fileNativeDir+"/"+t;l.zipHeadFiles[e]=t,o.access({path:r,success:function(t){if(1==s){try{o.rmdirSync(r,!0)}catch(e){console.log("目录删除成功"),console.log(e)}o.mkdir({dirPath:r,recursive:!0,success:function(t){l.downZip(e,r,o,a,n)}.bind(this),fail:function(e){null!=a&&a.runWith([{errCode:3,errMsg:"创建压缩包目录失败",wxData:e}])}.bind(this)})}else if(2==s)l.downZip(e,r,o,a,n);else{i.getFileInfo(e)?null!=a&&a.runWith([{errCode:0,errMsg:"zip包目录存在，直接返回完成",wxData:t}]):l.downZip(e,r,o,a,n)}}.bind(this),fail:function(t){t&&-1!=t.errMsg.indexOf("access:fail no such file or directory")&&o.mkdir({dirPath:r,recursive:!0,success:function(t){l.downZip(e,r,o,a,n)}.bind(this),fail:function(e){null!=a&&a.runWith([{errCode:3,errMsg:"创建压缩包目录失败",wxData:e}])}.bind(this)})}.bind(this)})}else null!=a&&a.runWith([{errCode:2,errMsg:"微信压缩接口不支持"}])}static downZip(e,t,a,n,s){var o={zipFilePath:e,targetPath:t,success:function(e){null!=n&&n.runWith([{errCode:0,errMsg:"解压成功",wxData:e}])}.bind(this),fail:function(e){null!=n&&n.runWith([{errCode:1,errMsg:"解压失败",wxData:e}])}.bind(this)};-1==e.indexOf("http://")&&-1==e.indexOf("https://")?a.unzip(o):window.wx.downloadFile({url:e,success:function(t){200===t.statusCode?(o.zipFilePath=t.tempFilePath,a.unzip(o),i.copyTOCache(t.tempFilePath,e,null,"utf8",!0)):null!=n&&n.runWith([{errCode:4,errMsg:"远端下载zip包失败",wxData:t}])}.bind(this),fail:function(e){null!=n&&n.runWith([{errCode:4,errMsg:"远端下载zip包失败",wxData:e}])}.bind(this)}).onProgressUpdate(function(e){null!=s&&s.runWith([{errCode:5,errMsg:"zip包下载中",progress:e.progress}])})}static getUrlEncode(e,t){return"arraybuffer"==t?"":"utf8"}static downLoadFile(e,t="",a=null,n="utf8"){i.getFileInfo(e)?null!=a&&a.runWith([0]):i.downLoadFile(e,t,a,n)}static remove(e,t=null){i.deleteFile("",e,t,"",0)}static removeAll(){i.deleteAll()}static hasNativeFile(e){return i.isLocalNativeFile(e)}static getFileInfo(e){return i.getFileInfo(e)}static getFileList(){return i.filesListObj}static exitMiniProgram(){l.window.wx.exitMiniProgram()}static onMkdirCallBack(e,t){e?(i.fakeObj={},i.filesListObj={}):(i.filesListObj=JSON.parse(t.data),i.fakeObj=JSON.parse(t.data));let a=i.fs.readdirSync(i.fileNativeDir);if(a.length){var n,s,o={};for(let e in i.filesListObj)"fileUsedSize"!=e&&(o[(n=i.filesListObj[e]).md5]=n.readyUrl);for(let e=0,t=a.length;e<t;e++)if((s=a[e])!=i.fileListName){if(!o[s]){let e=i.getFileNativePath(s);i.fs.unlink({filePath:e,success:function(e){console.log("删除无引用的磁盘文件:"+s)}})}delete o[s]}for(let e in o)delete i.filesListObj[o[e]],delete i.fakeObj[o[e]],console.log("删除错误记录：",o[e])}}static pixelRatio(){if(!l.EnvConfig.pixelRatioInt)try{return l.EnvConfig.pixelRatioInt=l.systemInfo.pixelRatio,l.systemInfo.pixelRatio}catch(e){}return l.EnvConfig.pixelRatioInt}static createElement(e){var t;if("canvas"==e)return 1==l.idx?l.isZiYu?(t=l.window.sharedCanvas).style={}:t=l.window.canvas:t=l.window.wx.createCanvas(),l.idx++,t;if("textarea"==e||"input"==e)return l.onCreateInput(e);if("div"==e){var i=l._preCreateElement(e);return i.contains=function(e){return null},i.removeChild=function(e){},i}return l._preCreateElement(e)}static onCreateInput(e){var t=l._preCreateElement(e);return t.focus=s.wxinputFocus,t.blur=s.wxinputblur,t.style={},t.value=0,t.parentElement={},t.placeholder={},t.type={},t.setColor=function(e){},t.setType=function(e){},t.setFontFace=function(e){},t.addEventListener=function(e){},t.contains=function(e){return null},t.removeChild=function(e){},t}static createShaderCondition(e){return function(){return this[e.replace("this.","")]}}static sendAtlasToOpenDataContext(e){if(!l.isZiYu){var i=t.Loader.getRes(t.URL.formatURL(e));if(!i)throw"传递的url没有获取到对应的图集数据信息，请确保图集已经过！";i.meta.image.split(",");if(i.meta&&i.meta.image)for(var a=i.meta.image.split(","),n=e.indexOf("/")>=0?"/":"\\",s=e.lastIndexOf(n),o=s>=0?e.substr(0,s+1):"",r=0,d=a.length;r<d;r++)a[r]=o+a[r];else a=[e.replace(".json",".png")];for(r=0;r<a.length;r++){var u=a[r];l.postInfoToContext(t.Laya.URL.formatURL(e),t.Laya.URL.formatURL(u),i)}}}static postInfoToContext(e,a,n){var s={frames:n.frames,meta:n.meta},o=a,r=i.getFileInfo(t.URL.formatURL(a));if(r)var d=r.tempFilePath||i.getFileNativePath(r.md5);else d=o;if(!d)throw"获取图集的磁盘url路径不存在！";l.window.wx.postMessage({url:e,atlasdata:s,imgNativeUrl:d,imgReadyUrl:o,isLoad:"opendatacontext"})}static sendSinglePicToOpenDataContext(e){var a=t.URL.formatURL(e),n=i.getFileInfo(a);if(n){var s=n.tempFilePath||i.getFileNativePath(n.md5);e=a}else s=e;if(!s)throw"获取图集的磁盘url路径不存在！";e=t.Laya.URL.formatURL(e),l.window.wx.postMessage({url:e,imgNativeUrl:s,imgReadyUrl:e,isLoad:"openJsondatacontextPic"})}static sendJsonDataToDataContext(e){if(!l.isZiYu){e=t.Laya.URL.formatURL(e);var i=t.Loader.getRes(e);if(!i)throw"传递的url没有获取到对应的图集数据信息，请确保图集已经过！";l.window.wx.postMessage({url:e,atlasdata:i,isLoad:"openJsondatacontext"})}}}l._inited=!1,l.autoCacheFile=!0,l.minClearSize=5242880,l.sizeLimit=209715200,l.nativefiles=["layaNativeDir","wxlocal"],l.nativezipfiles=[],l.zipRequestHead="",l.zipHeadFiles={},l.subNativeFiles=[],l.subNativeheads=[],l.subMaps=[],l.AutoCacheDownFile=!1,l.parseXMLFromString=function(e){var t;e=e.replace(/>\s+</g,"><");try{t=(new l.window.Parser.DOMParser).parseFromString(e,"text/xml")}catch(e){throw"需要引入xml解析库文件"}return t},l.idx=1;class d extends t.EventDispatcher{constructor(){super()}static __init__(){try{var e;if(!(e=t.Accelerator))return;e.prototype.on=d.prototype.on,e.prototype.off=d.prototype.off}catch(e){}}static startListen(e){if(d._callBack=e,!d._isListening){d._isListening=!0;try{l.window.wx.onAccelerometerChange(d.onAccelerometerChange)}catch(e){}}}static stopListen(){d._isListening=!1;try{l.window.wx.stopAccelerometer({})}catch(e){}}static onAccelerometerChange(e){var t;(t={}).acceleration=e,t.accelerationIncludingGravity=e,t.rotationRate={},null!=d._callBack&&d._callBack(t)}on(e,t,i,a=null){return super.on(e,t,i,a),d.startListen(this.onDeviceOrientationChange),this}off(e,t,i,a=!1){return this.hasListener(e)||d.stopListen(),super.off(e,t,i,a)}}d._isListening=!1;class u{constructor(){}static __init__(){l.window.navigator.geolocation.getCurrentPosition=u.getCurrentPosition,l.window.navigator.geolocation.watchPosition=u.watchPosition,l.window.navigator.geolocation.clearWatch=u.clearWatch}static getCurrentPosition(e=null,t=null,i=null){var a;(a={}).success=function(t){null!=e&&e(t)},a.fail=t,l.window.wx.getLocation(a)}static watchPosition(e=null,i=null,a=null){var n;return u._curID++,(n={}).success=e,n.error=i,u._watchDic[u._curID]=n,t.Laya.systemTimer.loop(1e3,null,u._myLoop),u._curID}static clearWatch(e){delete u._watchDic[e],u._hasWatch()||t.Laya.systemTimer.clear(null,u._myLoop)}static _hasWatch(){var e;for(e in u._watchDic)if(u._watchDic[e])return!0;return!1}static _myLoop(){u.getCurrentPosition(u._mySuccess,u._myError)}static _mySuccess(e){var i,a={};for(i in a.coords=e,a.timestamp=t.Browser.now(),u._watchDic)u._watchDic[i].success&&u._watchDic[i].success(a)}static _myError(e){var t;for(t in u._watchDic)u._watchDic[t].error&&u._watchDic[t].error(e)}}u._watchDic={},u._curID=0;e.ImageDataPolyfill=ImageDataPolyfill,e.MiniAccelerator=d,e.MiniAdpter=l,e.MiniFileMgr=i,e.MiniInput=s,e.MiniLoader=o,e.MiniLocalStorage=r,e.MiniLocation=u,e.MiniSound=n,e.MiniSoundChannel=a,e.MiniVideo=class{constructor(e=320,t=240){this.videoend=!1,this.videourl="",this.videoElement=l.window.wx.createVideo({width:e,height:t,autoplay:!0})}static __init__(){}on(e,t,i){"loadedmetadata"==e?(this.onPlayFunc=i.bind(t),this.videoElement.onPlay=this.onPlayFunction.bind(this)):"ended"==e&&(this.onEndedFunC=i.bind(t),this.videoElement.onEnded=this.onEndedFunction.bind(this)),this.videoElement.onTimeUpdate=this.onTimeUpdateFunc.bind(this)}onTimeUpdateFunc(e){this.position=e.position,this._duration=e.duration}get duration(){return this._duration}onPlayFunction(){this.videoElement&&(this.videoElement.readyState=200),console.log("=====视频加载完成========"),null!=this.onPlayFunc&&this.onPlayFunc()}onEndedFunction(){this.videoElement&&(this.videoend=!0,console.log("=====视频播放完毕========"),null!=this.onEndedFunC&&this.onEndedFunC())}off(e,t,i){"loadedmetadata"==e?(this.onPlayFunc=i.bind(t),this.videoElement.offPlay=this.onPlayFunction.bind(this)):"ended"==e&&(this.onEndedFunC=i.bind(t),this.videoElement.offEnded=this.onEndedFunction.bind(this))}load(e){this.videoElement&&(this.videoElement.src=e)}play(){this.videoElement&&(this.videoend=!1,this.videoElement.play())}pause(){this.videoElement&&(this.videoend=!0,this.videoElement.pause())}get currentTime(){return this.videoElement?this.videoElement.initialTime:0}set currentTime(e){this.videoElement&&(this.videoElement.initialTime=e)}get videoWidth(){return this.videoElement?this.videoElement.width:0}get videoHeight(){return this.videoElement?this.videoElement.height:0}get ended(){return this.videoend}get loop(){return!!this.videoElement&&this.videoElement.loop}set loop(e){this.videoElement&&(this.videoElement.loop=e)}get playbackRate(){return this.videoElement?this.videoElement.playbackRate:0}set playbackRate(e){this.videoElement&&(this.videoElement.playbackRate=e)}get muted(){return!!this.videoElement&&this.videoElement.muted}set muted(e){this.videoElement&&(this.videoElement.muted=e)}get paused(){return!!this.videoElement&&this.videoElement.paused}size(e,t){this.videoElement&&(this.videoElement.width=e,this.videoElement.height=t)}get x(){return this.videoElement?this.videoElement.x:0}set x(e){this.videoElement&&(this.videoElement.x=e)}get y(){return this.videoElement?this.videoElement.y:0}set y(e){this.videoElement&&(this.videoElement.y=e)}get currentSrc(){return this.videoElement.src}destroy(){this.videoElement&&this.videoElement.destroy(),this.videoElement=null,this.onEndedFunC=null,this.onPlayFunc=null,this.videoend=!1,this.videourl=null}reload(){this.videoElement&&(this.videoElement.src=this.videourl)}}};