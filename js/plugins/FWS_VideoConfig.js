//=============================================================================
// Plugin to change video settings in a game menu like style
// FWS_VideoConfig.js
// Version: 0.1.2
//=============================================================================

var Imported = Imported || {};
Imported.FWS_Core = true;

var FWS = FWS || {};
FWS.VideoConfig = FWS.VideoConfig || {};

/*:
 * @plugindesc Change screen setting in options menu.
 * @author FullWild Studio
 *
 * @param screenWidth
 * @desc Default width of the game.
 * @default 816
 *
 * @param screenHeight
 * @desc Default height of the game.
 * @default 624
 *
 * @param fullscreen
 * @desc Default fullscreen value.
 * @default false
 *
 * @help This plugin does not provide plugin commands.
 */

FWS.lang["fr"].videoSettingsName = "Parametres video";
FWS.lang["fr"].videoSettingsDefault = "Valeur par defaut";
FWS.lang["fr"].videoSettingsSave = "Sauvegarder les changements";
FWS.lang["fr"].videoSettingsQuit = "Retour au menu precedent";
FWS.lang["fr"].videoSettingsTitle = "Vous pouvez changer vos parametres video";
FWS.lang["fr"].videoSettingsResolution = "Resolution  : ";
FWS.lang["fr"].videoSettingsFullscreen = "Plein ecran : ";

FWS.lang["en"].videoSettingsName = "Video Settings";
FWS.lang["en"].videoSettingsDefault = "Default value";
FWS.lang["en"].videoSettingsSave = "Save the changes";
FWS.lang["en"].videoSettingsQuit = "Back";
FWS.lang["en"].videoSettingsTitle = "You can change your video settings parameters";
FWS.lang["en"].videoSettingsResolution = "Resolution  : ";
FWS.lang["en"].videoSettingsFullscreen = "Fullscreen : ";

FWS.VideoConfig.commonScreenResolution = [
 		{
 			width : 816,
 			height : 624
 		},{
 			width : 1920,
 			height : 1080
 		},{
 			width : 1366,
 			height : 768
 		},{
 			width : 1600,
 			height : 900
 		},{
 			width : 1280,
 			height : 1024
 		},{
 			width : 1440,
 			height : 900
 		},{
 			width : 1680,
 			height : 1050
 		},{
 			width : 1280,
 			height : 800
 		},{
 			width : 1600,
 			height : 1200
 		},{
 			width : 1280,
 			height : 960
 		},{
 			width : 1024,
 			height : 768
 		}];

FWS.VideoConfig.defaultScreen = {
	width: Number(FWS.Parameters["screenWidth"] 	|| 816),
	height: Number(FWS.Parameters["screenHeight"] 	|| 624),
	fullscreen: FWS.Parameters["fullscreen"] || "false"
}

ConfigManager.videoSettings = FWS.VideoConfig.defaultScreen;

//
// ConfigManager
//
FWS.VideoConfig.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function(){
	var config = FWS.VideoConfig.ConfigManager_makeData.call(this);
	config.videoSettings = typeof this.videoSettings === "undefined" ? FWS.VideoConfig.defaultScreen : this.videoSettings;
	return config;
};

FWS.VideoConfig.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config){
 	FWS.VideoConfig.ConfigManager_applyData.call(this, config);
	this.videoSettings = this.readVideoSettings(config, "videoSettings");
};

ConfigManager.readVideoSettings = function(config, name){
	var values = config[name];
	if(values !== undefined){
		ConfigManager.videoSettings = values;
		return values;
	}
	return FWS.defaultScreen;
};

ConfigManager.applyVideoSettings = function(){
	var changedToFullscreen = Graphics._ChangeFullscreen(ConfigManager.videoSettings.fullscreen);
	console.log("Apply video settings", ConfigManager.videoSettings, changedToFullscreen);
	if(changedToFullscreen){
		SceneManager._screenWidth  = window.screen.width;
		SceneManager._screenHeight = window.screen.height;
		SceneManager._boxWidth     = window.screen.width;
		SceneManager._boxHeight 	= window.screen.height;
	}else{
 		SceneManager._screenWidth  = Number(ConfigManager.videoSettings.width);
		SceneManager._screenHeight = Number(ConfigManager.videoSettings.height);
		SceneManager._boxWidth     = Number(ConfigManager.videoSettings.width);
		SceneManager._boxHeight 	= Number(ConfigManager.videoSettings.height);
	}
};

Graphics._ChangeFullscreen = function(fullscreen){
	if (fullscreen == true) {
     this._requestFullScreen();
      return true;
   } else {
      this._cancelFullScreen();
      return false;
   }
}

//
//Init to the storedvalues
//
FWS.VideoConfig.SceneManager_run = SceneManager.run;
SceneManager.run = function(sceneClass){
	ConfigManager.load();
	ConfigManager.applyVideoSettings();
	FWS.VideoConfig.SceneManager_run.call(this, sceneClass);
};

//
// Window_Options
//
FWS.VideoConfig.Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function(){
	FWS.VideoConfig.Window_Options_addGeneralOptions.call(this);
 	this.addVideoConfigCommand();
};
Window_Options.prototype.addVideoConfigCommand = function(){
 	this.addCommand(FWS.lang[FWS.langSelected].videoSettingsName, 'videoSettings', true);
};

FWS.VideoConfig.Window_Options_drawItem = Window_Options.prototype.drawItem;
Window_Options.prototype.drawItem = function(index){
	if(this.commandSymbol(index) === "videoSettings"){
		var rect = this.itemRectForText(index);
		var text = this.commandName(index);
		this.resetTextColor();
		this.changePaintOpacity(this.isCommandEnabled(index));
		this.drawText(text, rect.x, rect.y, rect.width, 'left');
	}else{
		FWS.VideoConfig.Window_Options_drawItem.call(this, index);
	}
};

FWS.VideoConfig.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
  if (this.commandSymbol(this.index()) === 'videoSettings') {
		Window_Command.prototype.processOk.call(this);
	} else {
		FWS.VideoConfig.Window_Options_processOk.call(this);
	}
};

//
// Scene_Options
//
FWS.VideoConfig.Scene_Options_createOptionsWindow = Scene_Options.prototype.createOptionsWindow;
Scene_Options.prototype.createOptionsWindow = function() {
	FWS.VideoConfig.Scene_Options_createOptionsWindow.call(this);
	this._optionsWindow.setHandler('videoSettings', this.commandVideoSettings.bind(this));
};

Scene_Options.prototype.commandVideoSettings = function() {
	SceneManager.push(FWS.VideoConfig.Scene_VideoSettings);
};

//
// Window_VideoSettings
//
FWS.VideoConfig.Window_VideoSettings = function Window_VideoSettings(){
	this.initialize.apply(this,arguments);
};

FWS.VideoConfig.Window_VideoSettings.prototype = Object.create(Window_Command.prototype);
FWS.VideoConfig.Window_VideoSettings.prototype.constructor = FWS.VideoConfig.Window_VideoSettings;

FWS.VideoConfig.Window_VideoSettings.prototype.initialize = function(helpWindow) {
	var wy = helpWindow.height;
	Window_Command.prototype.initialize.call(this, 0, wy);
	this.setHelpWindow(helpWindow);
	this.height = Graphics.boxHeight - wy;
	this.refresh();
	this.activate();
	this.select(0);
};

FWS.VideoConfig.Window_VideoSettings.prototype.windowWidth = function() {
   return Graphics.boxWidth;
};

FWS.VideoConfig.Window_VideoSettings.prototype.itemTextAlign = function() {
	return 'center';
};

FWS.VideoConfig.Window_VideoSettings.prototype.drawItem = function(index) {
	var rect = this.itemRectForText(index);
	var statusWidth = 120;
	var titleWidth = rect.width - statusWidth;

	this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
	if(this.isCommand(index)){
		this.drawText(this.valueText(index), titleWidth, rect.y, statusWidth, 'right');
	}
};

FWS.VideoConfig.Window_VideoSettings.prototype.valueText = function(index){
	var symbol = this.commandSymbol(index);
	var value = this.getVideoSettingsValue(symbol);

	if(!this.isResolution(symbol)){
		return value == true ? FWS.lang[FWS.langSelected].Yes : FWS.lang[FWS.langSelected].No;
	}
	return value;
};

FWS.VideoConfig.Window_VideoSettings.prototype.getVideoSettingsValue = function(symbol){
	switch(symbol){
 		case "resolution":
 			return ConfigManager.videoSettings.width+"x"+ConfigManager.videoSettings.height;
 			break;
 		case "fullscreen":
 			return ConfigManager.videoSettings.fullscreen;
 			break;
 		default:
 			return false;
 	}
};

FWS.VideoConfig.Window_VideoSettings.prototype.setVideoSettingsValue = function(symbol,value){
	switch(symbol){
 		case "resolution":
 			var result = value.split("x");
 			ConfigManager.videoSettings.width = result[0];
 			ConfigManager.videoSettings.height = result[1];
 			break;
 		case "fullscreen":
 			ConfigManager.videoSettings.fullscreen = value;
 			break;
 	}
};

FWS.VideoConfig.Window_VideoSettings.prototype.isCommand = function(index){
	var symbol = this.commandSymbol(index);
	switch(symbol){
 		case "resolution":
 			return true;
 			break;
 		case "fullscreen":
 			return true;
 			break;
 		default:
 			return false;
 	}
};

FWS.VideoConfig.Window_VideoSettings.prototype.isResolution = function(symbol){
	return symbol.contains("resolution");
};

FWS.VideoConfig.Window_VideoSettings.prototype.makeCommandList = function(index) {
	this.addCommand(FWS.lang[FWS.langSelected].videoSettingsResolution, 'resolution', true);
	this.addCommand(FWS.lang[FWS.langSelected].videoSettingsFullscreen, 'fullscreen', true);

	this.addCommand(FWS.lang[FWS.langSelected].videoSettingsDefault, 'default');
	this.addCommand(FWS.lang[FWS.langSelected].videoSettingsSave, 'save');
	this.addCommand(FWS.lang[FWS.langSelected].videoSettingsQuit, 'quit');
};

FWS.VideoConfig.Window_VideoSettings.prototype.changeValue = function(symbol, value) {
	   var lastValue = this.getVideoSettingsValue(symbol);
	   if (lastValue !== value) {
	   	this.setVideoSettingsValue(symbol,value);
	   	this.redrawItem(this.findSymbol(symbol));
	   	SoundManager.playCursor();
	   }
};

FWS.VideoConfig.Window_VideoSettings.prototype.indexOfResolution = function(width, height){
	var indexToReturn = 0;
	FWS.VideoConfig.commonScreenResolution.forEach(function(element, index){
		if(element.width == width && element.height == height){
			indexToReturn = index;
		}
	});
	return indexToReturn;
}

FWS.VideoConfig.Window_VideoSettings.prototype.cursorRight = function(wrap) {
   var index = this.index();
   var symbol = this.commandSymbol(index);
   var value = this.getVideoSettingsValue(symbol);
   if (this.isResolution(symbol)) {
   	this.cursorForRes(symbol, value, 1);
   } else {
      this.changeValue(symbol, true);
   }
};

FWS.VideoConfig.Window_VideoSettings.prototype.cursorLeft = function(wrap) {
	var index = this.index();
	var symbol = this.commandSymbol(index);
	var value = this.getVideoSettingsValue(symbol);
	if (this.isResolution(symbol)) {
	  	this.cursorForRes(symbol, value, -1);
	} else {
	   this.changeValue(symbol, false);
	}
};

FWS.VideoConfig.Window_VideoSettings.prototype.cursorForRes = function(symbol, value, order){
	var screenSize = value.split("x");
	commonTabCurrent = this.indexOfResolution(screenSize[0], screenSize[1]);
	//var nextTab = commonTabCurrent -1;
	var nextTab = (commonTabCurrent +(order)*1);
	if(order >0 ){
	 	nextTab = nextTab >= FWS.VideoConfig.commonScreenResolution.length ? commonTabCurrent : nextTab;
	}else{
	 	nextTab = nextTab < 0 ? commonTabCurrent : nextTab;
	}
	var stringValue = FWS.VideoConfig.commonScreenResolution[nextTab].width + "x" +FWS.VideoConfig.commonScreenResolution[nextTab].height;
	this.changeValue(symbol, stringValue);
}

FWS.VideoConfig.Window_VideoSettings.prototype.updateHelp = function(){
	if(!this._helpWindow) return ;
	this._helpWindow.setText(FWS.lang[FWS.langSelected].videoSettingsTitle);
};

//
// Window_ResolutionChoice
//
FWS.VideoConfig.Window_ResolutionChoice = function Window_ResolutionChoice(){
 		this.initialize.apply(this, arguments);
};
FWS.VideoConfig.Window_ResolutionChoice.prototype = Object.create(Window_Command.prototype);
FWS.VideoConfig.Window_ResolutionChoice.prototype.constructor = FWS.VideoConfig.Window_ResolutionChoice;

FWS.VideoConfig.Window_ResolutionChoice.prototype.initialize = function(){
 	Window_Command.prototype.initialize.call(this,0,0);
 	this.x = (Graphics.boxWidth - this.width) /2;
 	this.y = (Graphics.boxHeight - this.height) /2;
 	this.openness = 0;
 	this.deactivate();
};

FWS.VideoConfig.Window_ResolutionChoice.prototype.makeCommandList = function(){
 	var resString = "";
 	for(screenRes of FWS.commonScreenResolution){
 		resString = screenRes.width+"x"+screenRes.height;
 		this.addCommand(resString, "ok", true, "resString");
 	}
};

//
// Scene_VideoSettings
//
FWS.VideoConfig.Scene_VideoSettings = function Scene_VideoSettings(){
 	this.initialize.apply(this, arguments);
};

FWS.VideoConfig.Scene_VideoSettings.prototype = Object.create(Scene_MenuBase.prototype);
FWS.VideoConfig.Scene_VideoSettings.prototype.constructor = FWS.VideoConfig.Scene_VideoSettings;

FWS.VideoConfig.Scene_VideoSettings.prototype.initialize = function(){
 	Scene_MenuBase.prototype.initialize.call(this);
};

FWS.VideoConfig.Scene_VideoSettings.prototype.create = function(){
 	Scene_MenuBase.prototype.create.call(this);
 	this.createHelpWindow();
 	this.createVideoSettingsWindow();
};

FWS.VideoConfig.Scene_VideoSettings.prototype.terminate = function(){
 	Scene_MenuBase.prototype.terminate.call(this);
 	ConfigManager.save();
};

FWS.VideoConfig.Scene_VideoSettings.prototype.refreshWindows = function(){
 	this._configWindow.refresh();
 	this._configWindow.activate();
 	ConfigManager.save();
};

FWS.VideoConfig.Scene_VideoSettings.prototype.createVideoSettingsWindow = function(){
 	this._configWindow = new FWS.VideoConfig.Window_VideoSettings(this._helpWindow);
 	this._configWindow.setHandler("default", this.commandDefault.bind(this));
 	this._configWindow.setHandler("save",  this.commandSave.bind(this));
 	this._configWindow.setHandler("quit",  this.popScene.bind(this));
 	this.addWindow(this._configWindow);
};

FWS.VideoConfig.Scene_VideoSettings.prototype.commandSave = function(){
 	ConfigManager.applyVideoSettings();
 	ConfigManager.save();
 	console.log("Save", ConfigManager.videoSettings);
 	this.refreshWindows();
}

FWS.VideoConfig.Scene_VideoSettings.prototype.commandDefault = function(){
 	ConfigManager.videoSettings = FWS.VideoConfig.defaultScreen;
 	ConfigManager.applyVideoSettings();
	this.refreshWindows();
}