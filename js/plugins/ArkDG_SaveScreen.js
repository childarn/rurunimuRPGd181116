//=============================================================================
// ArkDG_SaveScreen.js // version 2.5.1
//
//What's new?
//
//2.5.1 - Fixed the command window bug.
//2.5 - Fixed the loading time problems of the SV Actors images and the Map Thumbnail.
//2.4 - Made a Scene_Name overwriting for the purposes of the slot name function.
//2.3 - New Feature: Now it's possible to give a name to the save slots.
//2.3 - Added to the parameters the possibilitty to change the name of your fisical save files. To change the name of your game's save files is not an obligation, but if you wanna publish your game as a browser game, use the default name can cause some "conflicts" with the save files of others RPG Maker MV browser games if they are using the same save file name.
//2.2 - Added configurable icons in the Save Status Window as Yuudai asked me to do. They are off by default, you must activate them to use;
//2.1 - Just a little test with aliasing. I declared one alias variable in public domain. If no problems comes from this, I will start to declare every old method alias I do in public domain so people can have access to the original methods of the functions I alias;
//2.1 - Improved the windows call codes, so it's now easier to make addons and fixes for this plugin;
//2.0 - Fixed the loading lag issue. Now the files aren't stored in the "global save file info", but in it's own save files. This way I eliminated the loading lag before the save screen reducing it to the load of just one thumbnail per time/index, not more all the save files thumbnails at once;
//1.2.1 - Now it's possible to change the action and confirmation windows positions;
//1.2.1 - Improved the way the higher level is checked and text positioning;
//1.2.1 - Corrected the problem with the level info that was breaking the script;
//1.2.1 - Corrected a problem with the "is any save" checking feature;
//1.2 - Added the "imported" variable. Now it's viable to do addons for this plugin;
//1.1 - Now it shows the party's higher level;
//1.02 - Corrected as erasing issue where the old data of the erased save games were not erased with them from the info file;
//1.02 - Corrected the popscene/callscene methods used after saving new games. Now it will only happen if it's your first save game;
//1.01 - Corrected the action window transparency problems;
//1.00 - Plugin Completed;
//=============================================================================
/*:
 * @plugindesc Alternative save/load screen layout with a lot of functions.
 * @author ArkDG // Version 2.5.1  
 *
 * @help 
//============================================================================
// ** Terms of Use
This plugin is free to use for both free and commercial games as long as I'm
credited in your game by name: Leonardo Misseno Justino.  

If you think that I deserve any kind of reward for making this plugin (I accept
donations! :D ) , contact me in my e-mail or via PM. I would be glad!  *-*
e-mail: leomjusto@hotmail.com

And don't forget to let me know the game you are making! Send me pictures and
everything. I would like to play it.
//============================================================================
 
 // >>>> ATENTION: If you are using a custom menu, there would be some conflicts
 or you  might do not get the screenshot data for the save file. What is very bad!
 You have to call this line in a script box before the menu is openned if you want
 to fix this problem: 
 
 Scene_File.generateFileData();
 
 Or maybe you just want to take a picture in a special situation. Example: if
 you are about to use the "Call Save Menu" event command from the RPG Maker MV.
 If you don't call this line there will be no picture or the picture that the
 save file will show will not be the correct one! Again, the line is:

 Scene_File.generateFileData(); 
 
 
 Good luck! ^^
 
 Now, my thanks to:
 ===========================
 
 Yanfly for the inspiration (RMVXA YEA Save Engine);
 Yoji Ojima (from Kadokawa) for the AltSaveScreen.js plugin,
 that served me as the basis for my plugin;
 Hudell for the method to create the screenshots and the idea of saving
 them inside the save file header (and the patience too);
 Hudell again for being so awesome. Thanks to his compression hint the
 images stored in the savefiles are much more softer now!
 Iavra for the method to load the screenshots from the save file
 and the solution for the action window problem (another awesome patient guy!);
 SoulPour777, for the tutorials on youtube that helpped me a lot;
 Jeremy Cannady, for the sv_actors snippet;
 doranifoku, for the help with a listener method to load pictures;
 Rito, for the help teaching me what the "imported" thing do.
 ===============================================================================
 
 This plugin works everywhere you could imagine. Just plug and use it! 
 You can configure and personalize it changing the place and size of
 nearly everything. If you have an idea to implement more personalization
 to the plugin, please send me an e-mail on leomjusto at hotmail.com!

 This plugin overwrite some Scenes and Windows, and aliases the DataManager
 makefileInfo method. But I thought there are no problems of compatibility
 with other plugins as long as it is the only File Scene changer plugin that
 you use.
 
 ===============
 FEATURES:
 ===============
 
 > Change the appearance of the file scene;

 > Change the name of your save files. Best feature for internet games;
 
 > More than just Character sets or Faces! Now you chan even choose to show the 
 SV_actor grafics in the File Scene! (thanks Jeremy Cannady for the sv_actors snippet);
 
 > You can show a thumbnail of the actual map where the player were when he
 decided to save (thanks to Hudell's and Iavra's help);
 
 > Shows Money, Location and Time Information about the save;
 
 > Now you can Save, Load and Erase a file from the Scene_Save. I decided that 
 Scene_Load would be just to Load files. When you push "Continue" on the title screen
 you should call the Scene_load by default, but you can change it in the parameters;
 
 > Unactivate the Save command when the developper do not want the player to be
 capable of saving. Do it with switchs;
 
 > This script is fully configurable: you can set the number of rows, collums,
 savefiles, names, verbs, icon numbers, grafics' positions and the switch Id
 to active the save game habilitty.
 
 
 >>>> THE PLAYER NAME ON THE SAVE SLOT FEATURE:
 
 Activating this feature you'll make it possible to give unique names to your
 games' save slots. These names are chosen by the player himself and can be
 the player's own name or anything he or you wants. With some knowledge you
 can even force the change of this name if you want to. 
 
>> How will this feature change the display name of my save slot?

First you'll have to determine an input engine for the save slot name:

default  = The default way is by using this plugin version of the RMMV Actor
Name Input. This mode stores the name in a internal variable;

protagonist = Uses the name of an Actor from your game database as the slot
namer. If your player is allowed to change the game protagonist's name, this
should be your choice.

cmdinp = Uses variables to store names. For this mode you will have to
download and install the "Darkkitten's Command Input System" (CmdInp.js)
plugin;

location = In this mode you determine that the save slot name will
be the name of the map where the player saved.


>>> Using the "default" mode:

Param:   Player_Save_Name
Config: [default, Variable ID, Title or Guidance Text]

First of all, this mode ovewrites some Scene_Name functions. There are no
bugs found until now, and this overwriting do not break the old way the
scene works, but add to this plugin the capabilitty of manipulating this
scene and make your life much easier. You'll can customize the input window
Picture and Guidance text:

Guidance text: Is a text that will be over the name input place. This is
"Tell me your name:" by this plugin default. 
>>>> This is a default mode only feature.

Picture: I put a save file picture inside this plugin to easy your job so,
by default, there is no value after the third comma. But if you want to
customize this picture to one of your preference, save your picture inside
the 'pictures' folder of your game and place a third comma ant its name 
in the "Player_Save_Name" parameter. This picture must be 144x144 pixels.
If the game throws at you an error with the name of your picture preceded
by %20, just delete the space between the third comma and you picture name.
The file name can't have any spaces.

Param:   Player_Save_Name
Config: [default, Variable ID, Title or Guidance Text,PictureName]

>>>> This is a default mode only feature.

After you activated this mode, you can change the save slot name with the
script call bellow:

========================================================
SceneManager.push(Scene_Name);
SceneManager.prepareNextScene('default', name length*);
========================================================
*Put a number here to determine how many letters your save slot name will
have.

You must choose a game variable to store the name of your savefile. This 
game variable will have the only purpose of doing this. 
If for some reason you decide to change this varibale value to whathever
you wants, you can do it with this call:

$gameVariables.setValue(Variable ID, whatever you wants)

You can't use this plugin as an input system. I indicate you to try 
the "Darkkitten's Command Input System" that is a much more complete,
friendly and dedicated system for this purpose. Try searching
and using it if you need. ^^

******************************************************************************
>>> Using the "protagonist" mode:

Param:   Player_Save_Name
Config: [protagonist, Actor ID, name length]

The first value determines that the mode you are using to store the slot name
is and actor of your game, and the input method is the RMMV Input Actor Name.
So, you have two ways of doing it works after here: 

1. Copy the actor's ID Number of your game's protagonist and place it after the
first comma;
2. Create a dummy actor with the face and start inputed text that you want and
get its Actor ID Number. Could an NPC that is guiding the player, anything you
want or imagine for your game.

If you choose to use the NPC idea, these are my hints:

The Face: The actor's face always appear in the input scene. You can give this
actor a face that resembles an save icon or the NPC's that is guiding the player
through the adventure.

The Name: You must give this NPC actor a default name that can be the same of
your game's protagonist or any other text that you wants. This name will overwrite
the default file name in the saved slots.

The player will be able to change his save file name when you call the input name
scene. Call it for the Actor ID that you picked on the params configuration. Or use
this script call:

================================================================================
var anythingyouwanttocall = Number(ark_player_name[1]);
var anythingyouwanttocall2 = Number(ark_player_name[2]);
SceneManager.push(Scene_Name);
SceneManager.prepareNextScene(anythingyouwanttocall, anythingyouwanttocall2);
================================================================================

A long script call, I know. But all you will need to do is just copy and paste this
on a script call in your game. I'm giving you no headaches.
 
I would indicate you to call this thing on the start of the game, but you can do
it whenever you wants.

**********************************************************************************

>>> Using the "cmdinp" mode (Darkkitten's Command Input System):
Param:   Player_Save_Name
Config: [cmdinp, Variable ID, name length]

If you are insing the Darkkitten's Command Input System and are acquainted with
its features, you can just insert after the first comma the $gameVariable that
you will use to be the container of your saved slot's name and call the plugin
command below to change the slot name in game:

================================================================================
enter_text variableID NameLength The text you want to use over the input window
================================================================================

Easy! Just copy and paste this link in your browser and download the plugin:
http://forums.rpgmakerweb.com/index.php?/topic/52197-text-input-window/


***********************************************************************************
>>> Using the "location" mode:
Param:   Player_Save_Name
Config: [location, any value diferent from 'n', this third value really doesn't matter]

It's the easiest mode and could be the choice of some. You just need to change the
first value to "location" and run your game. 

ATENTION: Wherever your player saves, this place's name will be the name of your
save slot!
 
  
 Enjoy game developping! I wish you good lucky and success. ^^
 * 
 *@param ------ICONS------
 *
 *@param Unused_Save_Icon
 *@desc The icon Id of the unused save files. Default is 187.
 *@default 187
 *
 *
 *@param Used_Save_Icon
 *@desc The icon Id of the used save files. Default is 189.
 *@default 189
 *
 *@param Play_Time_Icon
 *@desc The icon Id of the Playtime information. Default is 220.
 *@default 220
 * 
 *@param StatusWindow_Icons
 *@desc Set it to 'y' to show icon decoration on the save status window. Any other value deactivates it. Default is 'y'.
 *@default y
 *
 *@param Gold_Icon
 *@desc The icon number that will precede the gold text in the Save Status Window. Default is 208.
 *@default 208
 *
 *@param Location_Icon
 *@desc The icon number that will precede the location text in the Save Status Window. Default is 190.
 *@default 190
 *
 *
 *@param --NAMES AND VERBS--
 *
 *@param Time_Name
 *@desc The word or sentence that will precede the playtime in the Save Status Window. Default is "Time".
 *@default Time
 *
 *@param Gold_Name
 *@desc The word or sentence that will precede the Gold quantity in the Save Status Window. Default is "Money".
 *@default Money
 *
 *@param Gold_Currency
 *@desc Your game currency name that will procede the Gold in the Save Status Window. Default is empty.
 *@default 
 *
 *@param Location_Name
 *@desc The word or sentence that will precede the map name in the Save Status Window. Default is "Location".
 *@default Location
 * 
 *@param Save_Verb
 *@desc The word or sentence for loading a game file. Default is "Save".
 *@default Save
 *
 *@param Load_Verb
 *@desc The word or sentence for loading a game file. Default is "Load".
 *@default Load
 *
 *@param Erase_Verb
 *@desc The word or sentence for erasing a game file. Default is "Erase".
 *@default Erase
 *
 *@param Level_Text
 *@desc Text for party level. Party Level is determined by the higher leveled member of the party. Default is 'lvl.'.
 *@default lvl.
 *
 *@param --ADVANCED CONFIG--
 *
 *@param Save_File_Name
 *@desc Name of the fisical save files of your game. Important to change if you wanna publish your game as a browser game.
 *@default file
 *
 *@param Player_Save_Name
 *@desc Consult the HELP section. Consists of: 1th value is the input mode; 2nd the variable ID, 3th the guidance text.
 *@default default,n,Tell me your name:
 *
 *@param MAX_SAVE_FILES
 *@desc The number of save files your game will have. Default is 20.
 *@default 20
 *
 *@param FILE_COLUMNS
 *@desc The number of columns your save game list will have. Default is 4.
 *@default 4
 *
 *@param FILE_VISIBLE_ROWS
 *@desc Do you have a giant screen?! Then you should have more then only 3 rows. Default is 3.
 *@default 3
 *
 *@param Use_save_switch
 *@desc Set it True if you want to limit the player's hability to save. 0 is False. Any other number is True. Default is 0.
 *@default 0
 *
 *@param Save_Switch_Id
 *@desc What's the Id number of your saving switch? Default is 53.
 *@default 53
 *
 *@param Actor_Grafics_Mode
 *@desc 0 = Side View Battle grafics; 1 = Character Grafics; 2 = Face Grafics; Any other value = Empty. Default is 0.
 *@default 0
 *
 *@param Show_MapThumbnail
 *@desc Set 0 if you want to enable the map thumbnail feature. Any other value will disable it. Default is 0.
 *@default 0
 * 
 *@param Title_Screen
 *@desc Any number higher or lesser than 0 will activate it. Default is 0.
 *@default 0
 *
 *@param --GRAFICS POSITIONS--*
 *
 *@param File_v_Status_Sizes
 *@desc This parameter balance the File List Window and the Save Status Window size together. Default is 8.
 *@default 8
 *
 *@param Save_File_ID_X
 *@desc Horizontal position of the File Id String. It's left aligned! Default is  4.
 *@default 4
 *
 *@param Save_File_ID_Y
 *@desc Vertical position of the File Id String. It's left aligned! Default is  0.
 *@default 0
 *
 *@param Playtime_X
 *@desc Horizontal position of the Playtime String. It's left aligned! Default is 4.
 *@default 4
 *
 *@param Playtime_Y
 *@desc Vertical position of the Playtime String. It's left aligned! Default is 35.
 *@default 35
 *
 *@param Gold_X
 *@desc Horizontal position of the Money String. It's left aligned! Default is 6.
 *@default 6
 *
 *@param Gold_Y
 *@desc Vertical position of the Money String. It's left aligned! Default is 157.
 *@default 157
 *
 *@param Party_Based_Lvl_Pos
 *@desc When '0' the lvl pos.X will be based on the party size. Apply only to saves made after this config is setted up.
 *@default 0
 *
 *@param Level_X
 *@desc Horizontal position of the party level info. Pixels start counting after the last party member. Default is 48.
 *@default 48
 *
 *@param Level_Y
 *@desc Horizontal position of the party level info. It's left aligned! Default is 115.
 *@default 115
 *
 *@param Location_X
 *@desc Horizontal position of the Location String. It's right aligned! Default is -6.
 *@default -6
 *
 *@param Location_Y
 *@desc Vertical position of the location String. It's right aligned! Default is 157.
 *@default 157
 *
 *@param Action_Window_X
 *@desc Horizontal position of the Action and Confirmation windows. Leave 0 or less for screen center. Default is 0.
 *@default 0
 *
 *@param Action_Window_Y
 *@desc Vertical position of the Action and Confirmation windows. Leave 0 or less for screen center. Default is 0.
 *@default 0
 * 
 *@param Action_Window_Width
 *@desc Defines the action window width. Default is 150.
 *@default 150 
 *
 *@param Actors_X
 *@desc Horizontal position of the SV_Actors Images. It's left aligned! Default is 60.
 *@default 60
 *
 *@param Actors_Y
 *@desc Vertical position of the SV_Actors Images. Default is 145.
 *@default 145
 *
 *@param Map_Thumbnail_X
 *@desc Horizontal position of the Map Thumbnail Image. It's right aligned! Default is -249.
 *@default -249
 *
 *@param Map_Thumbnail_Y
 *@desc Vertical position of the Map Thumbnail Image. It's right aligned! Default is 5.
 *@default 5 
 *
 *@param Map_Thumbnail_Height
 *@desc Height size of the Map Thumbnail Image. Default is 143.
 *@default 143
 *
 *@param Map_Thumbnail_Width
 *@desc Width size of the Map Thumbnail Image. Default is 187.
 *@default 187
 *
 *@param Thumbnail_Compression
 *@desc You can reduce the compression quality of the thumbnail to make your save files smaller. Default is 0.7.
 *@default 0.7
 *
 */ 

/////////////////////////////PARAMETERS///////////////////////////////////

var params = PluginManager.parameters('ArkDG_Savescreen');

//////////////////////////////////////////////////////////////////////////



var ark_unused_save_icon = Number(params['Unused_Save_Icon'] || 187);
var ark_used_save_icon = Number(params['Used_Save_Icon'] || 189);
var ark_playtime_icon = Number(params['Play_Time_Icon'] || 220);
var ark_location_icon = Number(params['Location_Icon'] || 190);
var ark_gold_icon = Number(params['Gold_Icon'] || 208);

var ark_playtime_name = String(params['Time_Name'] || 'Time');
var ark_gold_name = String(params['Gold_Name'] || 'Money');
var ark_gold_currency = String(params['Gold_Currency'] || '');
var ark_location_name = String(params['Location_Name'] || 'Location');

var ark_levelX = Number(params['Level_X'] || 48)
var ark_levelY = Number(params['Level_Y'] || 115)
var ark_level_text = String(params['Level_Text'] || 'lvl.');

var ark_save = String(params['Save_Verb'] || 'Save');
var ark_load = String(params['Load_Verb'] || 'Load');
var ark_erase = String(params['Erase_Verb'] || 'Erase');

var ark_max_saves = Number(params['MAX_SAVE_FILES'] || 20);
var ark_save_columns = Number(params['FILE_COLUMNS'] || 4);
var ark_save_rows = Number(params['FILE_VISIBLE_ROWS'] || 3);

var ark_use_switch = Number(params['Use_save_switch'] || 0);
var ark_save_switch = Number(params['Save_Switch_Id'] || 53);

var ark_fileId_x = Number(params['Save_File_ID_X'] || 4);
var ark_fileId_y = Number(params['Save_File_ID_Y'] || 0);
var ark_playtime_x = Number(params['Playtime_X'] || 4);
var ark_playtime_y = Number(params['Playtime_Y'] || 35);
var ark_gold_x = Number(params['Gold_X'] || 6);
var ark_gold_y = Number(params['Gold_Y'] || 157);
var ark_location_x = Number(params['Location_X'] || -6);
var ark_location_y = Number(params['Location_Y'] || 157);

var ark_action_pos_x = Number(params['Action_Window_X'] || 0);
var ark_action_pos_y = Number(params['Action_Window_Y'] || 0);
var ark_action_win_w = Number(params['Action_Window_Width'] || 150);

var ark_sv_x = Number(params['Actors_X'] || 60);
var ark_sv_y = Number(params['Actors_Y'] || 145);
var ark_thumbnail_x = Number(params['Map_Thumbnail_X'] || -249);
var ark_thumbnail_y = Number(params['Map_Thumbnail_Y'] || 5);
var ark_thumbnail_h = Number(params['Map_Thumbnail_Height'] || 143); 
var ark_thumbnail_w = Number(params['Map_Thumbnail_Width'] || 187);
var ark_thumbnail_qlt = Number(params['Thumbnail_Compression'] || 0.7);

var ark_actorGrafics = Number(params['Actor_Grafics_Mode'] || 0);
var ark_showThumbnail = Number(params['Show_MapThumbnail'] || 0);
var ark_callfromtitle = Number(params['Title_Screen'] || 0);

var ark_partybased = Number(params['Party_Based_Lvl_Pos'] || 0);
var ark_icon_on = String(params['StatusWindow_Icons'] || 'y');
var ark_save_file_name = String(params['Save_File_Name'] || 'file');
var ark_File_v_Status_Sizes = Number(params['File_v_Status_Sizes'] || 8);
var ark_player_name   = params['Player_Save_Name'].split(',');


/////////////////////////////////////////////////////////////////////////////////


//Start//
var Imported = Imported || {};
Imported.ArkDG_SaveScreen = true;

var ArkDG_SaveScreen_Scene_File_create_oldmethod_for_alias = Scene_File.prototype.create;
var ArkDG_SaveScreen_Scene_File_create_newmethod_for_alias = undefined;

(function() { 
    
   

    //=====================ALIAS NEW METHOD FUNCTION=====================//
    Scene_File.prototype.Scene_File_create_newmethod = function() {
        this.createStatusWindow();
        this.createActionCWindow();
    };
    
    ArkDG_SaveScreen_Scene_File_create_newmethod_for_alias = Scene_File.prototype.Scene_File_create_newmethod;
   
    //===================================================================//
    
    Scene_File.prototype.create = function() {
        ArkDG_SaveScreen_Scene_File_create_oldmethod_for_alias.call(this);
        ArkDG_SaveScreen_Scene_File_create_newmethod_for_alias.call(this);
        
    };
    
    Scene_File.prototype.createStatusWindow = function() {    
        this._listWindow.height = this._listWindow.fittingHeight(ark_File_v_Status_Sizes);
        var x = 0;
        var y = this._listWindow.y + this._listWindow.height;
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight - y;
        this._statusWindow = new Window_SavefileStatus(x, y, width, height);
        this._statusWindow.setMode(this.mode());        
        this._listWindow.statusWindow = this._statusWindow;
        this._listWindow.callUpdateHelp();                
        this._listWindow.refresh();         
        this.addWindow(this._statusWindow);     
};
    
    Scene_File.prototype.createActionCWindow = function() {    
       this._actionWindow = new Window_FileAction();
        this._actionWindow.setHandler('salvar',  this.commandSave.bind(this)); 
        this._actionWindow.setHandler('carregar',  this.commandLoad.bind(this)); 
        this._actionWindow.setHandler('deletar',  this.commandErase.bind(this));  
        this._actionWindow.setHandler('cancel', this.commandCancel.bind(this));
        this.addChild(this._actionWindow);        
        this._actionWindow.hide();
        this._statusWindow.refresh();
};
        
    //Overwrite the Scene_Title's Continue command//
    
    Scene_Title.prototype.commandContinue = function() {
    this._commandWindow.close();
    if (ark_callfromtitle == 0) {
        SceneManager.push(Scene_Load);        
    } else {
        SceneManager.push(Scene_Save);}
    };
    
    // Call the File List //
    var _Scene_File_start = Scene_File.prototype.start;
    Scene_File.prototype.start = function() {
        _Scene_File_start.call(this);
        this._listWindow.ensureCursorVisible();
        this._listWindow.callUpdateHelp();
    };
    
    
    Window_SavefileList.prototype.drawItem = function(index) {
    var id = index + 1;
    var valid = DataManager.isThisGameFile(id);
    var info = DataManager.loadSavefileInfo(id);
    var rect = this.itemRectForText(index);
    this.resetTextColor();
    if (this._mode === 'load') {
        this.changePaintOpacity(valid);
    }
        if (this._mode === 'save') {
        this.changePaintOpacity(valid);
        }
        
        
        if (info) {
            if (info && info.player_name != null && info.player_name != undefined) {                
               this.drawText(info.player_name + ' ' + id, rect.x + 35, rect.y +12, rect.width - 35);
               } else { this.drawFileId(id, rect.x, rect.y);}
        this.changePaintOpacity(valid);
        this.drawContents(info, rect, valid);
        this.changePaintOpacity(true);
    } else {
        this.drawFileId(id, rect.x, rect.y);
        this.drawIcon(ark_unused_save_icon, rect.x , rect.y + 14); //UNUSED SAVE ICON
    }
};
    
    Window_SavefileList.prototype.drawFileId = function(id, x, y, info, index) {   
        var rect = this.itemRectForText(index);
        this.drawText(TextManager.file + ' ' + id, x +35, y +12, rect.width - 35);
    
};
    
    Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
    var bottom = rect.y + rect.height;    
    var lineHeight = this.lineHeight();    
        
        this.drawIcon(ark_used_save_icon, rect.x , rect.y + 14); //USED SAVE ICON
        this.drawIcon(ark_playtime_icon, rect.x , rect.y + 36 +14); //TIME ICON
        this.drawText(info.playtime, rect.x +35, rect.y + 35 +12, rect.width - 35);     
};    

    Window_SavefileList.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };   
    

    Window_SavefileList.prototype.maxCols = function() {
        return ark_save_columns; //MAXCOLS
    };

    Window_SavefileList.prototype.numVisibleRows = function() {
        return ark_save_rows;
    };

    Window_SavefileList.prototype.spacing = function() {
        return 8;
    };

    Window_SavefileList.prototype.itemHeight = function() {
        return this.lineHeight() * 2.5;
    };

    var _Window_SavefileList_callUpdateHelp =
            Window_SavefileList.prototype.callUpdateHelp;
    Window_SavefileList.prototype.callUpdateHelp = function() {
        _Window_SavefileList_callUpdateHelp.call(this);
        if (this.active && this.statusWindow) {
            this.statusWindow.setId(this.index() + 1);            
        }
    };
    
   
    
/////////////////////////////////////////////////////       
    
///////////////// DATA MANAGER ALIAS ////////////////
    
/////////////////////////////////////////////////////    
    DataManager.eraseSaveData = function(savefileId) {
        var json = JsonEx.stringify(this.makeSaveContents());
    if (json.length >= 200000) {
        console.warn('Save data too big!');
    }
       
    var globalInfo = this.loadGlobalInfo() || [];
    globalInfo[savefileId] = this.makeSavefileInfo();
    this.saveGlobalInfo(globalInfo);
    return true;
};

    
    
    Scene_File.HigherLvl = function(){
        var partySize = $gameParty.members().length;        
        var HigherLvl = 0;
        var herolvl = 0;
        var ark_heroQtd = $gameParty.battleMembers().length;
        
        if (partySize > 1) {
            if (partySize > ark_heroQtd) { partySize = ark_heroQtd; }
        do {
            herolvl = herolvl + 1;            
            if ($gameParty.members()[HigherLvl].level < $gameParty.members()[herolvl].level) {
                HigherLvl = herolvl                
            }                              
                    
        } while (partySize - 1 > herolvl) }
    
            return HigherLvl;   };

    
    var oldMakeSavefileInfo = DataManager.makeSavefileInfo;
	DataManager.makeSavefileInfo = function() {
	var info = oldMakeSavefileInfo.call(this);		
        info.location = $dataMap.displayName != "" ? $dataMap.displayName : $dataMapInfos[$gameMap.mapId()].name;
	    
        info.partysize = $gameParty.members().length;
        info.partybased = ark_partybased;
        
       if ($gameParty.members().length > 0) {
       info.level = $gameParty.members()[Scene_File.HigherLvl()].level;} else {
           info.level = undefined;}       
	    
        info.gold = $gameParty.gold();        
        info.map_id = $gameMap.mapId();
        info.svactors = $gameParty.svactorlist();
        info.characters = $gameParty.charactersForSavefile();
        info.faces      = $gameParty.facesForSavefile();
        
        
        if (ark_player_name[0] == 'protagonist' && ark_player_name[1] != 'n'){ 
            var Ark_Convert_to_Number = Number(ark_player_name[1]);
            info.player_name = $gameActors.actor(Ark_Convert_to_Number).name();
        }                     
        else if (ark_player_name[0] == 'cmdinp' && ark_player_name[1] != 'n' && Imported.CmdInp){
            var Ark_Convert_to_Number = Number(ark_player_name[1]);
            info.player_name = $gameVariables.value(Ark_Convert_to_Number);
        }
        else if (ark_player_name[0] == 'default' && ark_player_name[1] != 'n'){
            var Ark_Convert_to_Number = Number(ark_player_name[1]);
            info.player_name = $gameVariables.value(Ark_Convert_to_Number);
        }
        else if (ark_player_name[0] == 'location' && ark_player_name[1] != 'n'){
            info.player_name = $dataMap.displayName != "" ? $dataMap.displayName : $dataMapInfos[$gameMap.mapId()].name;
        
        } else {
            info.player_name = TextManager.file;
        }
        
           
        
		return info;
	}; 
    
    
    
    DataManager.maxSavefiles = function() {
    return ark_max_saves; //MAXFILES
    };
    
    
    var originalMakeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
    var contents = originalMakeSaveContents.call(this);	
    
    if (ark_showThumbnail == 0) {
      contents.thumbnail = ark_urlData;
    } //METHOD 2.0   
    
     
    return contents;
};

    
    //////////////////////////DATA MANAGER///////////////////////////////
    /////////////////    CHANGE SAVE FILE NAME  /////////////////////////       
        
        
if (ark_save_file_name != 'file') {       
   StorageManager.localFilePath = function(savefileId) {
    var name;
    if (savefileId < 0) {
        name = ark_save_file_name + '_config.rpgsave';
    } else if (savefileId === 0) {
        name = ark_save_file_name + '_global.rpgsave';
    } else if (savefileId > 0) {
        name = ark_save_file_name + '%1.rpgsave'.format(savefileId);
    } else {
        name = '%1'.format(savefileId);
    }
    return this.localFileDirectoryPath() + name;
};

StorageManager.webStorageKey = function(savefileId) {
    if (savefileId < 0) {
        return ark_save_file_name + ' Config';
    } else if (savefileId === 0) {
        return ark_save_file_name + ' Global';
    } else if (savefileId > 0) {
        return ark_save_file_name + ' %1'.format(savefileId);
    } else {
        return '%1'.format(savefileId);
    }
};
    }

    
    ///////////////////////////PLAYER SLOT NAME///////////////////////////////
    /////////////////////NAME_SCENE+WINDOW OVERWRITE//////////////////////////       

   if (ark_player_name[0] == 'default' && ark_player_name[1] != 'n') {     
 if (ark_player_name.length >= 4 || ark_player_name[3] != '' || ark_player_name[3] == null || ark_player_name[3] == undefined) {
 var savefileface_arksavescreen_engine = new Bitmap(144, 144);
     savefileface_arksavescreen_engine._image = new Image();        
     savefileface_arksavescreen_engine._image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAASZQTFRFAAAA/////A0Q/Bwf/zMzvoGC+UdMZjMz63B5mTMzzJmZoFNg64yf4qK/eDlgtYyv0bLa5dXv28vvMzMzuazWw7/vZmZmzMz/QEBQlZW6b2+Ig4OfZWV73d3/mZnM4eH/zMzf7Oz/oqKvDw8QUVFSu7u87PD/0dz/or3/qsP/u8//2+X/Zpn/eaX/jbL/4uz//cyK/d+5/unO//Tm9r6B8K1u55lf35hn3YJKzGYzxW9MtlY6qzASoTIj062rmBAM/wAA5wAAzAAAggAAsgEBmQAAUAICGAICiRAQ/2Zm/5mZ/6ysa0tLWkZGmYCA6M/PjYOD39fX9+/v7u7u6enp4+Pj39/fzMzMs7OzqampmZmZgYGBeXl5TU1NRUVFIyMjHBwc////ySzU1QAAAGJ0Uk5T/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAQVpKqAAALuElEQVR42uzbi1vTyBYA8AkiUMFd1mi63rXXy50UW2iVt1BBKQEtcnfh0leatEn8//+Je2Ymj8mjeQx19btfz/e5i0jTX885mcxMAvr2kwWag+agOWgOmoN+ChAK4qcAIXR12T4/P29fXEZJ6Md4Ls69aF+FRT8GFHggLkMi9EMSdH4+VYR+hKcdBp1rxUAJp8KsGighRblA9ixJ6DLqOW9rRUAIWZJhzyxN0QaK1gzlKFhVkmZGSvQUBMkSjZmQ4g0tADIkvTsjUkJD0yjS1AhLA4SUISWZ6EEklNDQJK4KnPYImZJiyxjJBqSpmnxBzH8FS/QUGhgRGgyQrCiWjbBCQFiYNM1zUeTSAcWSFGQpJLAKX9qSroqlCSGtne3JAJFzvovRhHgs6G4Z/khSl3V3QVI+TyZIJo2MIUUqxtIQYXa+SUMFFyRNOcHa0WNkgYwefWcMbU2Kp0hedA2rSJqmebRiM0aEe0PHm2sOwTaQuBjkT9P0E74QCNGMGBP6trJkwFUtEl6Hz8yTBRp2SQzHkKa7LmvpSAxM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';
    
console.log('Done face loading'); }; 
       

   var ark_saveengine_storedname = Number(ark_player_name[1]);
    
       
        
Scene_Name.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    if ($gameActors.actor(this._actorId) != null && $gameActors.actor(this._actorId) != undefined) {
    this._actor = $gameActors.actor(this._actorId); } else { this._actor = $gameActors.actor(); }
    this.createEditWindow();
    this.createInputWindow();
};


Window_NameEdit.prototype.initialize = function(actor, maxLength) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = (Graphics.boxWidth - width) / 2;
    var y = (Graphics.boxHeight - (height + this.fittingHeight(9) + 8)) / 2;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = actor;
    if (this._actor != null && this._actor != undefined) {
    this._name = actor.name().slice(0, this._maxLength); } else {     
if ($gameVariables.value(ark_saveengine_storedname) == 0 || $gameVariables.value(ark_saveengine_storedname) == null || $gameVariables.value(ark_saveengine_storedname) == undefined) {
        this._name = TextManager.file; } else {this._name = $gameVariables.value(ark_saveengine_storedname)}
    
    }
    this._index = this._name.length;
    this._maxLength = maxLength;
    this._defaultName = this._name;
    this.deactivate();
    this.refresh();
    if(this._actor != null && this._actor != undefined) {
    ImageManager.loadFace(actor.faceName()); }
};



Window_NameEdit.prototype.refresh = function() {
    this.contents.clear();
    if(this._actor != null && this._actor != undefined) {
    this.drawActorFace(this._actor, 0, 0); } else {  
        this.drawText(ark_player_name[2], 170, 10); //aqui
        
        
        if (ark_player_name.length < 4 || ark_player_name[3] == '' || ark_player_name[3] == null || ark_player_name[3] == undefined) {  
              
              savefileface_arksavescreen_engine._onLoad();       
              this.contents.blt(savefileface_arksavescreen_engine, 0, 0, savefileface_arksavescreen_engine._canvas.width, savefileface_arksavescreen_engine._canvas.height, 10, 0, 144, 144);
                                                                                                                                      
            } else { var bitmap = ImageManager.loadPicture(ark_player_name[3]); 
                     this.contents.blt(bitmap, 0, 0, bitmap._canvas.width, bitmap._canvas.height, 10, 0, 144, 144); }

    }
    for (var i = 0; i < this._maxLength; i++) {
        this.drawUnderline(i);
    }
    for (var j = 0; j < this._name.length; j++) {
        this.drawChar(j);
    }
    var rect = this.itemRect(this._index);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
};



Scene_Name.prototype.onInputOk = function() {    
    if ($gameActors.actor(this._actorId) != null && $gameActors.actor(this._actorId) != undefined) {
    this._actor.setName(this._editWindow.name()); } 
    else { $gameVariables.setValue(ark_saveengine_storedname,this._editWindow.name());} 
    this.popScene();
};
   } // DEFAULT?
        
        
  ////////////////////////////////////////////////////////////////////  
    
  /////////// Action Window's Commands for the File Scene ////////////
        
  ////////////////////////////////////////////////////////////////////
    
   Scene_File.prototype.createListWindow = function() {    
    var x = 0;
    var y = this._helpWindow.height;
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight - y;
    this._listWindow = new Window_SavefileList(x, y, width, height);
    this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
    this._listWindow.setHandler('cancel', this.onSavefileNot.bind(this));
    this._listWindow.select(this.firstSavefileIndex());
    this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
    this._listWindow.setMode(this.mode());
    this._listWindow.refresh();
    this.addWindow(this._listWindow);
};

     
    
    Scene_Save.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);     
        if (ark_use_switch == 0) {
        this._actionWindow.show();            
        this._actionWindow.activate();
        } else {          
        if (DataManager.isThisGameFile(this.savefileId()) || $gameSwitches.value(ark_save_switch, true)) {
            this._actionWindow.show();            
            this._actionWindow.activate();
        } else {
            SoundManager.playBuzzer();
            this.afterCommand();
        }        
        }
    };
          

    ///////////////////////////////////////////////////
    ////////////////SCREEN SAVER///////////////////////
    ///////////////////////////////////////////////////
    
    
 ////////////////////////////////////NEW METHOD////////////////////////////////////        
    var ark_urlData = undefined;         
 ////////////////////////////////MAKE THE FILE DATA////////////////////////////////
   
    Scene_File.generateFileData = function () {        
          var snap = SceneManager.snap();
          var resized = new Bitmap(ark_thumbnail_w, ark_thumbnail_h);
          resized.blt(snap, 0, 0, snap._canvas.width, snap._canvas.height, 0, 0, ark_thumbnail_w, ark_thumbnail_h);
          ark_urlData = resized._canvas.toDataURL('image/jpeg', ark_thumbnail_qlt);
        };  
    
    
    
    
    
    /////////////////////////////////////////////////////////////////
    
Scene_Map.prototype.callMenu = function() {      
     Scene_File.generateFileData(); // NEW METHOD TO GENERATE THE SCREENSHOT     
     SoundManager.playOk();
    SceneManager.push(Scene_Menu);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
};
        


    
    

////////////////////////////////NEW FUNCTIONS//////////////////////////////////
//ARK//
Scene_File.prototype.onSavefileNot = function() {    
    this.popScene();    
};

    
    
    
Scene_File.prototype.commandSave = function() { 
    if (this._actionWindow.visible) { 
        $gameSystem.onBeforeSave();        
    if (DataManager.saveGame(this.savefileId())) {        
        this.onSaveSuccess();
    } else {
        this.onSaveFailure();
    } }
};
    
Scene_File.prototype.commandLoad = function() {   
    if (this._actionWindow.visible) { 
    if (DataManager.loadGame(this.savefileId())) {
        this.onLoadSuccess();
        $gameSystem.onAfterLoad();
    } else {
        this.onLoadFailure();
    } }
};

    
Scene_File.prototype.commandErase = function() {    
   if (this._actionWindow.visible) { 
    SoundManager.playActorDamage();
    StorageManager.remove(this.savefileId())
    DataManager.eraseSaveData();        
    this.afterCommand();    }
};
    
Scene_File.prototype.commandCancel = function() {        
    //this._listWindow.refresh();
    this._actionWindow.hide();
    this._actionWindow.deactivate();
    this.activateListWindow();
};
    
Scene_Save.prototype.afterCommand = function() {     
    this._listWindow.refresh();
    this._actionWindow.refresh();    
    this._actionWindow.hide();
    this._actionWindow.deactivate();
    this.activateListWindow();    
};    
    

///////////////////////////////LOAD FUNCTIONS//////////////////////////////////
    
    Scene_Save.prototype.onLoadSuccess = function() {
    SoundManager.playLoad();
    this.fadeOutAll();
    this.reloadMapIfUpdated();        
    SceneManager.goto(Scene_Map);        
    this._loadSuccess = true;
};

Scene_Save.prototype.onLoadFailure = function() {
    SoundManager.playBuzzer();
    this.afterCommand();
};

Scene_Save.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
};
    
    /////////////////////////////////SAVE FUNCTIONS/////////////////////////////////////
    
Scene_Save.prototype.onSaveSuccess = function() {
    EngineMapPreloader();    
    if (ark_actorGrafics == 0) {     
    SceneManager.push(Scene_Save) //gambiarra
    this.popScene();  } //gambiarra         
    SoundManager.playSave();    
    this.afterCommand();    
};
    
Scene_Save.prototype.onSaveFailure = function() {
    SoundManager.playBuzzer();    
    this.afterCommand();
};

    


//-----------------------------------------------------------------------------
// Window_FileAction
//
//-----------------------------------------------------------------------------
 
function Window_FileAction() {
    this.initialize.apply(this, arguments);
}


    
Window_FileAction.prototype = Object.create(Window_Command.prototype);
Window_FileAction.prototype.constructor = Window_FileAction;

Window_FileAction.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();    
    this.openness = 0;
    this.open();
};

    
Window_FileAction.prototype.windowWidth = function() {
    return ark_action_win_w;
};

   

        
Window_FileAction.prototype.updatePlacement = function() {
    if (ark_action_pos_x <= 0 || ark_action_pos_y <= 0) {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2 + this.height;
    } else {
        this.x = ark_action_pos_x;
        this.y = ark_action_pos_y;
    }
    
};

Window_FileAction.prototype.makeCommandList = function() {
    if (ark_use_switch == 0) {
        this.addCommand(ark_save, 'salvar');  //SAVE VERB
        this.addCommand(ark_load,  'carregar'); //LOAD VERB
        this.addCommand(ark_erase,  'deletar'); //DELET VERB   
    } else {
    if ($gameSwitches.value(ark_save_switch, true)) {        
        this.addCommand(ark_save, 'salvar');  //SAVE VERB
        this.addCommand(ark_load,  'carregar'); //LOAD VERB
        this.addCommand(ark_erase,  'deletar'); //DELET VERB       
    } else {        
        this.addCommand(ark_load,  'carregar'); //LOAD VERB
        this.addCommand(ark_erase,  'deletar'); //DELET VERB        
    }
    }
};



    
    /// Janela de Status do Arquivo // File Status Window //

    function Window_SavefileStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_SavefileStatus.prototype = Object.create(Window_Base.prototype);
    Window_SavefileStatus.prototype.constructor = Window_SavefileStatus;

    Window_SavefileStatus.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._id = 1;
    };

    Window_SavefileStatus.prototype.setMode = function(mode) {
        this._mode = mode;
    };

    Window_SavefileStatus.prototype.setId = function(id) {         
        this._id = id;
        this.refresh();
    };

        

        
        ////////////////////////////////////////////////////////////
        /////////////PRELOADING PRELOADING PRELOADING///////////////
        ////////////////////PRELOADING PRELOADING///////////////////
        ////////////////////////////////////////////////////////////

 
 function saveReader(i) {
    var json;
    try {
        json = StorageManager.load(i);
    } catch (e) {
        console.error(e);
        return [];
    }
    if (json) {
        var globalInfo = JSON.parse(json);
        
            if (!StorageManager.exists(i)) {
                delete globalInfo;
            }
        
        return globalInfo;
    } else {
        return [];
    }
};
 

 var ark_preloaded_maps = new Array();
 var ark_preloaded_SVs = new Array();
 function EngineMapPreloader() {
     var i = 0;     
     ark_preloaded_maps = new Array();
     ark_preloaded_SVs = new Array();
     
     do {i++;
         
         //PRELOADING THUMBNAILS
         if (saveReader(i).thumbnail !== null && saveReader(i).thumbnail !== undefined){
         ark_preloaded_maps[i] = new Bitmap(ark_thumbnail_w, ark_thumbnail_h);
         ark_preloaded_maps[i]._image = new Image();
         ark_preloaded_maps[i]._image.src = saveReader(i).thumbnail; }
         
         
       
         //PRELOADING SV ACTORS
        var info = DataManager.loadSavefileInfo(i);
        
        if (info && info !== null) { 
        
        //Creating the Bitmaps
        var i_img = 0;
        var preloading_Bitmap = new Array();        
        do { preloading_Bitmap.push(ImageManager.loadSvActor(info.svactors[i_img])); 
            i_img++; } while (i_img < info.svactors.length)   
        
                
                
        //Pudhing them inside the main array
        ark_preloaded_SVs.push(preloading_Bitmap); } else { ark_preloaded_SVs.push(undefined); }         
        //////////////////////////////////
        } while (i < ark_max_saves) 
            
console.log('Checking SaveEngine Preloaded Content:')
console.log(ark_preloaded_maps)
console.log(ark_preloaded_SVs);
console.log('Done.')
            
            };
     
  EngineMapPreloader(); 
 /////////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////
        
    Window_SavefileStatus.prototype.refresh = function() {
        this.contents.clear();
        var id = this._id;
        var valid = DataManager.isThisGameFile(id);
        var info = DataManager.loadSavefileInfo(id);
        var rect = this.contents.rect;
        this.resetTextColor();
        if (this._mode === 'load') {
            this.changePaintOpacity(valid);
        }
        if (this._mode === 'save') {
            this.changePaintOpacity(valid);
        }
        this.drawFileId(id, rect.x, rect.y);        
        if (info) {
            this.changePaintOpacity(valid);            
            this.drawContents(info, rect, valid);
            this.changePaintOpacity(true);            
        } else {
            
        }
                    
        if (ark_icon_on == 'y') {            
            if (info) {
        this.drawIcon(ark_used_save_icon, ark_fileId_x, ark_fileId_y + 2); 
    } else {
        this.drawIcon(ark_unused_save_icon, ark_fileId_x, ark_fileId_y + 2); //UNUSED SAVE ICON
    }                   
        }
        
    };

    
    ////FILE NAME AND CHARACTERS////
        var brokenID = undefined;
    Window_SavefileStatus.prototype.drawFileId = function(id, x, y) {        
        var info = DataManager.loadSavefileInfo(id);
        brokenID = id;
        var icon_on = 0;        
        if (ark_icon_on == 'y') {icon_on = 33;}
        if (info &&  ark_player_name[1] != 'n' && info.player_name != null && info.player_name != undefined && info.player_name != info.location) {               
               this.drawText(info.player_name + ' ' + id, x + ark_fileId_x + icon_on, y + ark_fileId_y);
               } else { this.drawText(TextManager.file + ' ' + id, x + ark_fileId_x + icon_on, y + ark_fileId_y, 180);} 
    };
    
        
                
        ///////////////////////DRAW MAP THUMBNAIL//////////////////////
    
    
    Window_SavefileStatus.prototype.drawScreenshot = function(id, x, y) {
        
       if (ark_showThumbnail == 0 && ark_preloaded_maps[brokenID] != undefined && ark_preloaded_maps[brokenID] != null) { 
           ark_preloaded_maps[brokenID]._onLoad(); 
           ark_preloaded_maps[brokenID].addLoadListener(function() {
            this.contents.blt(ark_preloaded_maps[brokenID], 0, 0, ark_preloaded_maps[brokenID]._canvas.width, ark_preloaded_maps[brokenID]._canvas.height, Graphics.boxWidth + ark_thumbnail_x, ark_thumbnail_y, ark_thumbnail_w, ark_thumbnail_h);
            }.bind(this)); }
    }; 
        
   
        
        //////////////////SVS/////////////////        
        
        
    Game_Party.prototype.svactorlist = function(){
	var list = [];
	var length = $gameParty._actors.length;
	for(var i =0; i<length; i++){
		list.push($gameActors.actor($gameParty._actors[i])._battlerName)
	};
	return list;
    }; 
        
    Window_SavefileStatus.prototype.drawPartySVs = function(info, x, y) {
    
        if (info && info.svactors) {
        for (var i = 0; i < info.svactors.length; i++) {            
            var pw = ark_preloaded_SVs[brokenID -1][i].width / 9;
            var ph = ark_preloaded_SVs[brokenID -1][i].height / 6;
            var sx = 0;
            var sy = ph;
        this.contents.blt(ark_preloaded_SVs[brokenID -1][i], sx, sy, pw, ph, (x + i * 48) - pw, y-ph);
        };
    };
};   
    
        //////////////////CHARS/////////////////
        
    Window_SavefileStatus.prototype.drawPartyCharacters = function(info, x, y) {
    if (info && info.characters) {
        for (var i = 0; i < info.characters.length; i++) {
            var data = info.characters[i];
            this.drawCharacter(data[0], data[1], x + i * 48, y);
        }
    }
};
    
        //////////////////FACES/////////////////
        
    Window_SavefileStatus.prototype.drawPartyfaces = function(info, x, y) {
        if (info && info.faces) {
            for (var i = 0; i < info.faces.length; i++) {
                var data = info.faces[i];
                this.drawFace(data[0], data[1], x + i * 150, y);
            }
        }
    };
    
    
    
        
    
    ////DRAW THE CONTENTS////    
    
    Window_SavefileStatus.prototype.drawContents = function(info, rect, valid) {       
        
        if (valid) {
            if (ark_actorGrafics == 0) {
            this.drawPartySVs(info, rect.x + ark_sv_x, ark_sv_y); //Draw Party Members SV 
            } else if (ark_actorGrafics == 1) {
            this.drawPartyCharacters(info, rect.x + ark_sv_x, ark_sv_y); //Draw Party Members Character Set 
            } else if (ark_actorGrafics == 2){
            this.drawPartyfaces(info, rect.x + ark_sv_x, ark_sv_y); //Draw Party Members Faces     
            } // If higher than 2, shows nothing.
             this.drawScreenshot(info, Graphics.boxWidth + ark_thumbnail_x, ark_thumbnail_y); // } //Draw Map Thumbnail 
        }        
        
        
        
        var icon_on = 0;
        
        if (ark_icon_on == 'y') {
        this.drawIcon(ark_playtime_icon, ark_playtime_x, ark_playtime_y + 1);
        var _icon_local_correction_x = this.contents.measureTextWidth(ark_location_name + ': ' + info.location);       
        this.drawIcon(ark_location_icon, Graphics.boxWidth - _icon_local_correction_x - 69 + ark_location_x, ark_location_y + 1);
        this.drawIcon(ark_gold_icon, ark_gold_x , ark_gold_y + 1);
        icon_on = 35;}
        
        
        this.drawText(ark_playtime_name + ': ' + info.playtime, ark_playtime_x + icon_on, ark_playtime_y, rect.width, 'left'); //Time Status   
        this.drawText(ark_location_name + ': ' + info.location, ark_location_x, ark_location_y, rect.width, 'right'); //Location Status
        this.drawText(ark_gold_name + ': ' + info.gold + ' ' + ark_gold_currency, ark_gold_x + icon_on, ark_gold_y, rect.width, 'left'); //Money
          
        if (info.partybased == 0) {
        if (info.level < 10) {             
        this.drawText(ark_level_text + '0' + info.level, info.partysize * ark_levelX, ark_levelY, rect.width);} else {
        this.drawText(ark_level_text + info.level, info.partysize * ark_levelX, ark_levelY, rect.width);
        } } else {
            if (info.level < 10) {             
        this.drawText(ark_level_text + '0' + info.level, ark_levelX, ark_levelY, rect.width);} else {
        this.drawText(ark_level_text + info.level, ark_levelX, ark_levelY, rect.width);
        } }
        
        
                
    };
    
})();


