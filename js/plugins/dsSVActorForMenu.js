//=============================================================================
// dsSVActorForMenu.js
// Copyright (c) 2016 Douraku
// Released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc メニューにサイドビューキャラを表示するプラグイン ver1.00
 * @author 道楽
 *
 * @param Actor Motion Idle
 * @desc 非選択時のアクターのモーション
 * @default walk
 *
 * @param Actor Motion Active
 * @desc 選択時のアクターのモーション
 * @default victory
 *
 * @help
 * 使用できるモーション名
 *   walk     wait
 *   chant    guard
 *   damage   evade
 *   thrust   swing
 *   missile  skill
 *   spell    item
 *   escape   victory
 *   dying    abnormal
 *   sleep    dead
 */

(function() {

	var parameters = PluginManager.parameters('dsSVActorForMenu');
	var gActorMotionIdle = String(parameters['Actor Motion Idle']);
	var gActorMotionActive = String(parameters['Actor Motion Active']);

	//-------------------------------------------------------------------------
	/** Sprite_ActorMenu */
	function Sprite_ActorMenu()
	{
		this.initialize.apply(this, arguments);
	}

	Sprite_ActorMenu.prototype = Object.create(Sprite_Actor.prototype);
	Sprite_ActorMenu.prototype.constructor = Sprite_ActorMenu;

	Sprite_ActorMenu.prototype.setBattler = function(battler)
	{
		Sprite_Battler.prototype.setBattler.call(this, battler);
		var changed = (battler !== this._actor);
		if ( changed )
		{
			this._actor = battler;
			this._stateSprite.setup(battler);
		}
	};

	Sprite_ActorMenu.prototype.startMove = function(x, y, duration)
	{
	};

	Sprite_ActorMenu.prototype.moveToStartPosition = function()
	{
	};

	Sprite_ActorMenu.prototype.startIdleMotion = function()
	{
		this.startMotion(gActorMotionIdle);
	};

	Sprite_ActorMenu.prototype.startActiveMotion = function()
	{
		this.startMotion(gActorMotionActive);
	};

	Sprite_ActorMenu.prototype.updateShadow = function()
	{
		this._shadowSprite.visible = false;
	};

	//-------------------------------------------------------------------------
	/** Window_MenuStatus */
	var _Window_MenuStatus_initialize = Window_MenuStatus.prototype.initialize;
	Window_MenuStatus.prototype.initialize = function(x, y)
	{
		_Window_MenuStatus_initialize.call(this, x, y);
		this.createActorSprites();
	};

	var _Window_MenuStatus_loadImages = Window_MenuStatus.prototype.loadImages;
	Window_MenuStatus.prototype.loadImages = function()
	{
		_Window_MenuStatus_loadImages.call(this);
		$gameParty.members().forEach(function(actor) {
			ImageManager.loadSvActor(actor.battlerName());
		}, this);
	};

	Window_MenuStatus.prototype.createActorSprites = function()
	{
		var maxMembers = this.maxItems();
		this._actorSprites = [];
		for ( var ii = 0; ii < maxMembers; ii++ )
		{
			this._actorSprites[ii] = new Sprite_ActorMenu;
			this._actorSprites[ii].setBattler($gameParty.members()[ii]);
			this.addChild(this._actorSprites[ii]);
		}
		this.updateSprites();
	};

	var _Window_MenuStatus_update = Window_MenuStatus.prototype.update;
	Window_MenuStatus.prototype.update = function()
	{
		_Window_MenuStatus_update.call(this);
		this.updateSprites();
	};

	Window_MenuStatus.prototype.updateSprites = function()
	{
		var maxMembers = this.maxItems();
		for ( var ii = 0; ii < maxMembers; ii++ )
		{
			var actor = $gameParty.members()[ii];
			var bitmap = ImageManager.loadSvActor(actor.battlerName());
			var rect = this.itemRect(ii);
			var cw = bitmap.width / 9;
			var ch = bitmap.height / 6;
			var cx = this.standardPadding() + rect.x + 1 + 144 / 2;
			var cy = this.standardPadding() + rect.y + 1 + Math.floor(((rect.height - 2) / 2) + (ch / 2));
			this._actorSprites[ii].setBattler(actor);
			this._actorSprites[ii].setHome(cx, cy);
			this._actorSprites[ii].opacity = actor.isBattleMember() ? 255 : this.translucentOpacity()
			if ( this.checkSpriteActive(ii) )
			{
				this._actorSprites[ii].startActiveMotion();
			}
			else
			{
				this._actorSprites[ii].startIdleMotion();
			}
		}
	};

	Window_MenuStatus.prototype.checkSpriteActive = function(index)
	{
		if ( this.active )
		{
			if ( this._cursorAll )
			{
				return true;
			}
			else if ( this.isCursorVisible() )
			{
				if ( index === this.index() )
				{
					return true;
				}
				if ( index === this._pendingIndex )
				{
					return true;
				}
			}
		}
		return false;
	};

	Window_MenuStatus.prototype.drawItemImage = function(index)
	{
	};

	//-------------------------------------------------------------------------
	/** Window_Status */
	var _Window_Status_initialize = Window_Status.prototype.initialize;
	Window_Status.prototype.initialize = function()
	{
		_Window_Status_initialize.call(this);
		this.createActorSprites();
	};

	Window_Status.prototype.createActorSprites = function()
	{
		this._actorSprite = new Sprite_ActorMenu;
		this._actorSprite.setBattler(this._actor);
		this.addChild(this._actorSprite);
	};

	var _Window_Status_update = Window_Status.prototype.update;
	Window_Status.prototype.update = function()
	{
		_Window_Status_update.call(this);
		this.updateSprites();
	};

	Window_Status.prototype.updateSprites = function()
	{
		var bitmap = ImageManager.loadSvActor(this._actor.battlerName());
		var cw = bitmap.width / 9;
		var ch = bitmap.height / 6;
		var cx = this.standardPadding() + 12 + 144 / 2;
		var cy = this.standardPadding() + this.lineHeight() * 2 + Math.floor((144 / 2) + (ch / 2));
		this._actorSprite.setBattler(this._actor);
		this._actorSprite.setHome(cx, cy);
		this._actorSprite.startIdleMotion();
	};

	Window_Status.prototype.drawBlock2 = function(y)
	{
	//!	this.drawActorFace(this._actor, 12, y);
		this.drawBasicInfo(204, y);
		this.drawExpInfo(456, y);
	};

	//-------------------------------------------------------------------------
	/** Window_SkillStatus */
	var _Window_SkillStatus_initialize = Window_SkillStatus.prototype.initialize;
	Window_SkillStatus.prototype.initialize = function(x, y, width, height)
	{
		_Window_SkillStatus_initialize.call(this, x, y, width, height);
		this.createActorSprites();
	};

	Window_SkillStatus.prototype.createActorSprites = function()
	{
		this._actorSprite = new Sprite_ActorMenu;
		this._actorSprite.setBattler(this._actor);
		this.addChild(this._actorSprite);
	};

	var _Window_SkillStatus_update = Window_SkillStatus.prototype.update;
	Window_SkillStatus.prototype.update = function()
	{
		_Window_SkillStatus_update.call(this);
		this.updateSprites();
	};

	Window_SkillStatus.prototype.updateSprites = function()
	{
		var bitmap = ImageManager.loadSvActor(this._actor.battlerName());
		var cw = bitmap.width / 9;
		var ch = bitmap.height / 6;
		var cx = this.standardPadding() + 0 + 144 / 2;
		var cy = this.standardPadding() + 0 + Math.floor((144 / 2) + (ch / 2));
		this._actorSprite.setBattler(this._actor);
		this._actorSprite.setHome(cx, cy);
		this._actorSprite.startIdleMotion();
	};

	Window_SkillStatus.prototype.refresh = function()
	{
		this.contents.clear();
		if (this._actor)
		{
			var w = this.width - this.padding * 2;
			var h = this.height - this.padding * 2;
			var y = h / 2 - this.lineHeight() * 1.5;
			var width = w - 162 - this.textPadding();
		//!	this.drawActorFace(this._actor, 0, 0, 144, h);
			this.drawActorSimpleStatus(this._actor, 162, y, width);
		}
	};

})();

