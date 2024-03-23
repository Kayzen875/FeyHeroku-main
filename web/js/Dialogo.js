var dialogosNoldor = 0;
var KeySpace;

import * as game from './game.js'
import * as NivelPacifico from './NivelPacifico.js'

export default class Dialogo extends Phaser.Scene{
    constructor(){
		super({key: "Dialogo"});
	}

	preload()
	{
		load.call(this);
	}

	create()
	{

	}

	update()
	{
		if(NivelPacifico.darEnergia)
		{
			if (dialogosNoldor == 0) 
			{

			}
			if (Phaser.Input.Keyboard.JustDown(KeySpace)) 
			{
				
			}
		}
	}

}

function load()
{
	KeySpace=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}