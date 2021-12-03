!function(){"use strict";const t={defaultFont:"Microsoft YaHei",modalLayerColor:"rgba(0,0,0,0.7)",packageFileExtension:"fui",scaleMode:"fixedauto",packageCommon:"",packageGame:"fgui/game/Demo_Game"};class e{constructor(){this.ID=[],this.soundPath="sound/",this.ID.background=this.soundPath+"background.mp3",this.ID.right=this.soundPath+"right.mp3",this.ID["1Time to wake up"]=this.soundPath+"1Time to wake up.mp3",this.ID["2Ok,I am up"]=this.soundPath+"2Ok,I am up.mp3"}static get Ins(){return null==e._instance&&(e._instance=new e),e._instance}}class i{constructor(){this._clearTime=18e4,this.soundPath="";this._cache={},this._loadingCache=new Array,Laya.timer.loop(6e4,this,this.dealSoundTimer)}set ClearTime(t){this._clearTime=t}dealSoundTimer(){let t=this,e=Laya.Browser.now(),i=Object.keys(t._cache);for(let s=0,a=i.length;s<a;s++){let a=i[s];t.checkCanClear(a)&&(e-t._cache[a]>=t._clearTime&&(delete t._cache[a],Laya.loader.clearRes(a)))}}getSound(t,i){let s=this;s._key=t,s.soundPath=e.Ins.ID[t];let a=Laya.loader.getRes(s.soundPath);if(a)s._cache[s.soundPath]&&(s._cache[s.soundPath]=Laya.Browser.now());else{if(-1!=s._loadingCache.indexOf(s.soundPath))return a;s._loadingCache.push(s.soundPath),Laya.loader.load(s.soundPath,Laya.Handler.create(s,()=>{let t=s._loadingCache.indexOf(s.soundPath);-1!=t&&(s._loadingCache.splice(t,1),s._cache[s.soundPath]=Laya.Browser.now(),s.loadedPlay(s._key,s.soundPath,i))},null,!1),null,Laya.Loader.SOUND)}return a}loadedPlay(t,e,i){}checkCanClear(t){return!0}destroy(){let t=this;Laya.timer.clear(t,t.dealSoundTimer);let e=Object.keys(t._cache);for(let i=0,s=e.length;i<s;i++){let s=e[i];delete t._cache[s],Laya.loader.clearRes(s)}}}class s extends i{constructor(){super()}play(t){this.getSound(t)&&this.playSound(this.soundPath)}playSound(t){let e=Laya.SoundManager.playSound(t,1);e&&(e.volume=this._volume)}setVolume(t){this._volume=t}loadedPlay(t,e){Laya.loader.getRes(e)&&this.playSound(this.soundPath)}}class a extends i{constructor(){super(),this._currBg=""}stop(){let t=this;t._currSoundChannel&&t._currSoundChannel.stop(),t._currSoundChannel=null,t._currSound=null,t._currBg=""}play(t){let e=this;e._currBg!=t&&(e.stop(),e._currBg=t,e.getSound(t)&&e.playSound(e.soundPath))}playSound(t){let e=this;e._currSoundChannel=Laya.SoundManager.playMusic(t,0),e._currSoundChannel&&(e._currSoundChannel.volume=this._volume)}setVolume(t){let e=this;e._volume=t,e._currSoundChannel&&(e._currSoundChannel.volume=e._volume)}loadedPlay(t,e){let i=this;i._currBg==t&&(Laya.loader.getRes(e)&&i.playSound(e))}checkCanClear(t){return this._currBg!=t}}class n{constructor(){}Init(){this._bgOn=!0,this._effectOn=!0,this._bgVolume=1,this._effectVolume=1,this._bg=new a,this._bg.setVolume(this._bgVolume),this._effect=new s,this._effect.setVolume(this._effectVolume)}playEffect(t,e){this._effectOn&&this._effect.play(t)}playBg(t){this._currBg=t,this._bgOn&&this._bg.play(t)}stopBg(){this._bg.stop()}setBgOn(t){Laya.SoundManager.musicMuted=!t,this._bgOn=t,this._bgOn?this._currBg&&this.playBg(this._currBg):this.stopBg()}setBgVolume(t){t>0&&(t/=100),t=Math.min(t,1),t=Math.max(t,0),Laya.SoundManager.setMusicVolume(t),this._bgVolume=t,this._bg.setVolume(this._bgVolume)}getBgVolume(){return this._bgVolume}setEffectOn(t){Laya.SoundManager.soundMuted=!t,this._effectOn=t}setEffectVolume(t){t>0&&(t/=100),t=Math.min(t,1),t=Math.max(t,0),Laya.SoundManager.setSoundVolume(t),this._effectVolume=t,this._effect.setVolume(this._effectVolume)}getEffectVolume(){return this._effectVolume}get bgOn(){return this._bgOn}get effectOn(){return this._effectOn}static get Ins(){return null==n._instance&&(n._instance=new n),n._instance}destroy(){this._bg.stop(),this._effect.destroy(),this._bg.destroy(),this._currBg=""}}var o,h=Laya.Scene,l=Laya.ClassUtils.regClass;!function(t){class e extends h{constructor(){super()}createChildren(){super.createChildren(),this.loadScene("GameRoot")}}t.GameRootUI=e,l("ui.GameRootUI",e)}(o||(o={}));class c extends fgui.GComponent{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","BackGround01")}onConstruct(){this.img_Bg01=this.getChildAt(0),this.btn_Daily=this.getChildAt(1),this.btn_Event=this.getChildAt(2),this.btn_Back=this.getChildAt(3),this.com_Easy=this.getChildAt(4),this.com_Norrmal=this.getChildAt(5),this.com_Hard=this.getChildAt(6)}}c.URL="ui://i0lzkukkdnda0";class r extends fgui.GComponent{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","BackGround02")}onConstruct(){this.img_Bg01=this.getChildAt(0),this.img_Line=this.getChildAt(1),this.com_Drag=this.getChildAt(2),this.btn_Back=this.getChildAt(3),this.btn_Exit=this.getChildAt(4),this.com_Shell01=this.getChildAt(5),this.com_Shell02=this.getChildAt(6),this.com_Shell03=this.getChildAt(7),this.com_Shell04=this.getChildAt(8),this.img_Bottom05=this.getChildAt(9),this.img_Bottom06=this.getChildAt(10),this.img_Bottom07=this.getChildAt(11),this.img_Bottom08=this.getChildAt(12),this.img_Crab09=this.getChildAt(13),this.img_Crab10=this.getChildAt(14),this.img_Crab11=this.getChildAt(15),this.img_Crab12=this.getChildAt(16),this.img_Fish13=this.getChildAt(17),this.img_Fish14=this.getChildAt(18),this.img_Fish15=this.getChildAt(19),this.img_Fish16=this.getChildAt(20),this.n12=this.getChildAt(21),this.n73=this.getChildAt(22),this.n74=this.getChildAt(23),this.n75=this.getChildAt(24),this.n76=this.getChildAt(25),this.n77=this.getChildAt(26),this.n78=this.getChildAt(27),this.n79=this.getChildAt(28),this.n80=this.getChildAt(29),this.n81=this.getChildAt(30),this.n82=this.getChildAt(31),this.n83=this.getChildAt(32),this.n84=this.getChildAt(33)}}r.URL="ui://i0lzkukko2ti4a";class g extends fgui.GComponent{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","SelectLevel1_01")}onConstruct(){this.img_Mask=this.getChildAt(0),this.btn_Button=this.getChildAt(1)}}g.URL="ui://i0lzkukko2ti4c";class u extends fgui.GButton{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","Level1Button")}onConstruct(){this.button=this.getControllerAt(0),this.ctrlType=this.getControllerAt(1),this.img_light=this.getChildAt(0),this.load_Choose=this.getChildAt(1),this.Idle=this.getTransitionAt(0),this.None=this.getTransitionAt(1)}}u.URL="ui://i0lzkukko2ti4d";class d extends fgui.GComponent{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","SelectLevel1_02")}onConstruct(){this.img_Mask=this.getChildAt(0),this.btn_Button=this.getChildAt(1)}}d.URL="ui://i0lzkukko2ti4f";class m extends fgui.GComponent{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","SelectLevel1_03")}onConstruct(){this.img_Mask=this.getChildAt(0),this.btn_Button=this.getChildAt(1)}}m.URL="ui://i0lzkukko2ti4g";class C extends fgui.GButton{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","CircleButtonWithWord")}onConstruct(){this.button=this.getControllerAt(0),this.ctrlType=this.getControllerAt(1),this.img_Mask=this.getChildAt(0),this.load_CircleBtn=this.getChildAt(1)}}C.URL="ui://i0lzkukko2ti4j";class _ extends fgui.GButton{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","CircleButton")}onConstruct(){this.button=this.getControllerAt(0),this.ctrlType=this.getControllerAt(1),this.img_Mask=this.getChildAt(0),this.load_CircleBtn=this.getChildAt(1)}}_.URL="ui://i0lzkukko2ti4k";class y extends fgui.GComponent{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","BackGround03")}onConstruct(){this.img_Bg01=this.getChildAt(0),this.com_01=this.getChildAt(1),this.com_02=this.getChildAt(2),this.com_03=this.getChildAt(3),this.btn_Back=this.getChildAt(4),this.img_Report=this.getChildAt(5),this.n8=this.getChildAt(6),this.n9=this.getChildAt(7),this.n10=this.getChildAt(8)}}y.URL="ui://i0lzkukko2ti4l";class f extends fgui.GComponent{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","SelectLevel3_01")}onConstruct(){this.ctrlType=this.getControllerAt(0),this.btn_Choose=this.getChildAt(0),this.img_Ylight=this.getChildAt(1),this.load_Pic=this.getChildAt(2),this.load_Btn=this.getChildAt(3),this.img_Lion=this.getChildAt(4),this.img_Biong01=this.getChildAt(5),this.img_Biong02=this.getChildAt(6),this.img_Biong03=this.getChildAt(7),this.Idle=this.getTransitionAt(0)}}f.URL="ui://i0lzkukko2ti4m";class A extends fgui.GButton{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","Level3Button")}onConstruct(){this.button=this.getControllerAt(0)}}A.URL="ui://i0lzkukko2ti4n";class k extends fgui.GComponent{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","SelectLevel2_01")}onConstruct(){this.ctrlTypeStar01=this.getControllerAt(0),this.ctrlTypeStar02=this.getControllerAt(1),this.ctrlTypeStar03=this.getControllerAt(2),this.ctrlTypeShell1=this.getControllerAt(3),this.load_Shell=this.getChildAt(0),this.laod_Star01=this.getChildAt(1),this.laod_Star02=this.getChildAt(2),this.laod_Star03=this.getChildAt(3),this.btn_LevelClick=this.getChildAt(4)}}k.URL="ui://i0lzkukko2ti4r";class L extends fgui.GButton{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","Level2Button")}onConstruct(){this.button=this.getControllerAt(0)}}L.URL="ui://i0lzkukko2ti4s";class b extends fgui.GComponent{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","DragSpace")}onConstruct(){}}b.URL="ui://i0lzkukko2ti4w";class p extends fgui.GComponent{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","Demo_Game")}onConstruct(){this.ctrlType=this.getControllerAt(0),this.com_BG01=this.getChildAt(0),this.com_BG02=this.getChildAt(1),this.com_BG03=this.getChildAt(2)}}p.URL="ui://i0lzkukko2ti4x";class I extends fgui.GComponent{static createInstance(){return fgui.UIPackage.createObject("Demo_Game","comStar")}onConstruct(){this.n12=this.getChildAt(0),this.n13=this.getChildAt(1),this.n14=this.getChildAt(2),this.grop_Star05=this.getChildAt(3)}}I.URL="ui://i0lzkukko2ti4y";class U{static bindAll(){fgui.UIObjectFactory.setExtension(c.URL,c),fgui.UIObjectFactory.setExtension(r.URL,r),fgui.UIObjectFactory.setExtension(g.URL,g),fgui.UIObjectFactory.setExtension(u.URL,u),fgui.UIObjectFactory.setExtension(d.URL,d),fgui.UIObjectFactory.setExtension(m.URL,m),fgui.UIObjectFactory.setExtension(C.URL,C),fgui.UIObjectFactory.setExtension(_.URL,_),fgui.UIObjectFactory.setExtension(y.URL,y),fgui.UIObjectFactory.setExtension(f.URL,f),fgui.UIObjectFactory.setExtension(A.URL,A),fgui.UIObjectFactory.setExtension(k.URL,k),fgui.UIObjectFactory.setExtension(L.URL,L),fgui.UIObjectFactory.setExtension(b.URL,b),fgui.UIObjectFactory.setExtension(p.URL,p),fgui.UIObjectFactory.setExtension(I.URL,I)}}class G extends o.GameRootUI{constructor(){super(),this.bl_AnswerGroup=[1,0],this.str_soundGroup=["1Time to wake up","2Ok,I am up"],this.maxAnsIndex=2,this.curAnsIndex=0,this.ExitUrl="http://dt.app.local/Game.html",this.bl_openaTip=!1}onAwake(){this.initFgui()}onDestroy(){console.log("GameRoot onDestroy")}initFgui(){fgui.UIConfig.defaultFont=t.defaultFont,fgui.UIConfig.modalLayerColor=t.modalLayerColor,fgui.UIConfig.packageFileExtension=t.packageFileExtension,Laya.stage.scaleMode=t.scaleMode,Laya.stage.addChild(fgui.GRoot.inst.displayObject),fgui.UIPackage.loadPackage(t.packageGame,Laya.Handler.create(this,this.loadUIComplete))}loadUIComplete(){console.warn("loadUIComplete"),U.bindAll(),fgui.UIPackage.addPackage(t.packageGame),this.view=p.createInstance(),this.view.name="MainGameHandler",this.view.setSize(fairygui.GRoot.inst.width,fairygui.GRoot.inst.height),this.view.addRelation(fairygui.GRoot.inst,fairygui.RelationType.Size),fairygui.GRoot.inst.addChild(this.view),n.Ins.Init(),this.InitGameUI(),this.InitGameData(),this.initButton()}InitGameUI(){this.view.ctrlType.selectedIndex=0}InitGameData(){}initButton(){}setGameResult(){this.InitGameData()}setBtnExit(){}setGameSkip(){window.location.href=this.ExitUrl}setBtnNext(){}}class S{constructor(){}static init(){(0,Laya.ClassUtils.regClass)("game/runTime/GameRoot.ts",G)}}S.width=1920,S.height=1080,S.scaleMode="fixedwidth",S.screenMode="horizontal",S.alignV="middle",S.alignH="center",S.startScene="GameRoot.scene",S.sceneRoot="",S.debug=!1,S.stat=!1,S.physicsDebug=!1,S.exportSceneToJson=!0,S.init();new class{constructor(){window.Laya3D?Laya3D.init(S.width,S.height):Laya.init(S.width,S.height,Laya.WebGL),Laya.Physics&&Laya.Physics.enable(),Laya.DebugPanel&&Laya.DebugPanel.enable(),Laya.stage.scaleMode=S.scaleMode,Laya.stage.screenMode=S.screenMode,Laya.stage.alignV=S.alignV,Laya.stage.alignH=S.alignH,Laya.URL.exportSceneToJson=S.exportSceneToJson,(S.debug||"true"==Laya.Utils.getQueryString("debug"))&&Laya.enableDebugPanel(),S.physicsDebug&&Laya.PhysicsDebugDraw&&Laya.PhysicsDebugDraw.enable(),S.stat&&Laya.Stat.show(),Laya.alertGlobalError(!0),Laya.ResourceVersion.enable("version.json",Laya.Handler.create(this,this.onVersionLoaded),Laya.ResourceVersion.FILENAME_VERSION)}onVersionLoaded(){Laya.AtlasInfoManager.enable("fileconfig.json",Laya.Handler.create(this,this.onConfigLoaded))}onConfigLoaded(){S.startScene&&Laya.Scene.open(S.startScene)}}}();