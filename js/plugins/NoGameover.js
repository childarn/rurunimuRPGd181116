//=============================================================================
// NoGameover.js
//=============================================================================

/*:
 * @plugindesc NoGameover
 * @author yuwaka
 *
 * @param Switch ID
 * @desc The ID of the switch to be turned ON when AllDead.
 * @default 0
 *
 * @help This plugin does not provide plugin commands.
 *I role model Tachi's plug-ins.
 *Thank you very much.
 */

/*:ja
 * @plugindesc ゲームオーバーにならないよ。
 * @author ゆわか
 *
 * @param Switch ID
 * @desc 全滅したときにONにするスイッチのIDです。
 * @default 0
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *Tachiさんのプラグインを参考にさせて頂きました。
 *ありがとうございます。
 */

(function() {

    var parameters = PluginManager.parameters('NoGameover');
    var switchId = Number(parameters['Switch ID'] || 0);

BattleManager.updateBattleEnd = function() {
    if (this.isBattleTest()) {
        AudioManager.stopBgm();
        SceneManager.exit();
    } else if ($gameParty.isAllDead()) {
        if (this._canLose) {
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        } else {
            //SceneManager.goto(Scene_Gameover);
	    $gameSwitches.setValue(switchId, true); 
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        }
    } else {
        SceneManager.pop();
    }
    this._phase = null;
};

})();
