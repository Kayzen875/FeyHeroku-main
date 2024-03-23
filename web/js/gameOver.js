var over;
var KeyO;
var text;

import * as personaje from './personaje.js'
import * as estadisticas from './estadisticas.js';
import * as NivelPacifico from './NivelPacifico.js'
import * as game from './game.js'
export default class gameOver extends Phaser.Scene{
    constructor(){
		super({key: "gameOver"});
	}

    preload()
    {
        this.load.image('gameOver', 'assets/images/final.png');
    }

    create()
    {
        KeyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        over = this.add.image(game.config.width / 2, game.config.height / 2, 'gameOver');
        over.setScale(2,2);
        text = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'Pulsa O para continuar', {fontsize: '64px'});
    }

    update()
    {
        if (KeyO.isDown)
        {
            this.scene.start("NivelPacifico");
            estadisticas.recargaCoras.call(this);
            personaje.fullHp.call(this);
        }
    }
}