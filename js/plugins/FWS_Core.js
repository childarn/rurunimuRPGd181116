//=============================================================================
// FullWild Studio - Core
// FWS_Core.js
// Version: 0.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FWS_Core = true;

var FWS = FWS || {};
FWS.Core = FWS.Core || {};

FWS.Parameters = PluginManager.parameters('FWS_Core');

/*:
 * @plugindesc V0.1.0 - Core for all the FWS plugin
 * @author FullWild Studio
 *
 * @param selectedLanguage
 * @desc Default language
 * @default fr
 *
 * @help This plugin does not provide plugin commands.
 */

FWS.langSelected = String(FWS.Parameters['selectedLanguage'] || "fr");
FWS.lang = FWS.lang || [];
FWS.lang["en"] = FWS.lang["en"] || {};
FWS.lang["fr"] = FWS.lang["fr"] || {};


FWS.lang["fr"].Yes = "Oui";
FWS.lang["fr"].No = "Non";
FWS.lang["en"].Yes = "Yes";
FWS.lang["en"].No = "No";

//
// Window_ConfirmWindow
// Add a confirmation window with simple Yes - No question
//
FWS.Window_ConfirmWindow = function Window_ConfirmWindow(){
	this.initialize.apply(this, arguments);
}

FWS.Window_ConfirmWindow.prototype = Object.create(Window_Command.prototype);
FWS.Window_ConfirmWindow.prototype.constructor = FWS.Window_ConfirmWindow;

FWS.Window_ConfirmWindow.prototype.initialize = function() {
	Window_Command.prototype.initialize.call(this, 0, 0);
   this.updatePlacement();
   this.openness = 0;
   this.open();
   this.height = 3*this.lineHeight();
};

FWS.Window_ConfirmWindow.prototype.update = function() {
   Window_Selectable.prototype.update.call(this);
   this.contents.clear();
   this.drawStatic();
   this.drawAllItems();
};

FWS.Window_ConfirmWindow.prototype.setStaticText = function(text) {
	this.staticText = text;
};

FWS.Window_ConfirmWindow.prototype.drawStatic = function() {
   this.drawStaticText(this.staticText, 0,0,this.windowWidth());
};

FWS.Window_ConfirmWindow.prototype.windowWidth = function() {
   return Graphics._width/2;
};

FWS.Window_ConfirmWindow.prototype.windowHeight = function() {
   return 150;
};

FWS.Window_ConfirmWindow.prototype.maxCols = function() {
    return 2;
};

FWS.Window_ConfirmWindow.prototype.maxItems = function() {
    return 2;
};

FWS.Window_ConfirmWindow.prototype.drawItem = function(index){
	var rect = this.itemRectForText(index);
	rect.y += this.lineHeight();
   this.resetTextColor();
   this.changePaintOpacity(this.isCommandEnabled(index));
   this.drawText(this.commandName(index), rect.x, rect.y, rect.width, "center");
}

FWS.Window_ConfirmWindow.prototype.clearItem = function(index) {
   var rect = this.itemRect(index);
   rect.y += this.lineHeight();
   this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
};

FWS.Window_ConfirmWindow.prototype.updateCursor = function() {
    if (this._cursorAll) {
        var allRowsHeight = this.maxRows() * this.itemHeight();
        this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
        this.setTopRow(0);
    } else if (this.isCursorVisible()) {
        var rect = this.itemRect(this.index());
        rect.y += this.lineHeight();
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    } else {
        this.setCursorRect(0, 0, 0, 0);
    }
};

FWS.Window_ConfirmWindow.prototype.updatePlacement = function() {
   this.x = (Graphics.boxWidth - this.width) / 2;
   this.y = (Graphics.boxHeight - this.height) / 2;
};

FWS.Window_ConfirmWindow.prototype.makeCommandList = function() {
   this.addCommand(FWS.lang[FWS.langSelected].Yes, 'exitYes');
   this.addCommand(FWS.lang[FWS.langSelected].No,  'exitNo');
};

FWS.Window_ConfirmWindow.prototype.drawStaticText = function(text, x,y,width) {
	this.resetTextColor();
	var unitWidth = Math.min(this.padding * 2);
	this.drawText(text, x, y, width - unitWidth, "center");
	this.changeTextColor(this.systemColor());
};