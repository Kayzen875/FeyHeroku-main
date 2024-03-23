import * as game from './game.js'
import * as NivelPacifico from './NivelPacifico.js'
import * as personaje from './personaje.js'
import * as login from './login.js'
var dialogoN1;
var dialogoN2;
var dialogoN3;
var dialogoN4;
var dialogoN5;
var dialogosNoldor = 0;
var KeySpace;
var KeyEscape;
var t = -1
var espacio;
var dialogoFey1;
var dialogoFey2;
export var primeraConversa = 0;
var teclaPuesta = false;


export default class dialogo extends Phaser.Scene{
    constructor(){
		super({key: "dialogo", active: true});
	}

    preload()
    {
        this.load.image('dialogo','assets/images/dialogo.png');
        this.load.image('dialogo2','assets/images/dialogo2.png');
        this.load.image('dialogo3','assets/images/dialogo3.png');
        this.load.image('dialogo4','assets/images/dialogo4.png');
        this.load.image('dialogo5','assets/images/dialogo5.png');

        this.load.image('dialogoFey1', 'assets/images/dialogoFey1.png');
        this.load.image('dialogoFey2', 'assets/images/dialogoFey2.png');

        this.load.spritesheet('espacio', 'assets/sprites/Keys/spacekey.png', {frameWidth:64, frameHeight:32});

        KeySpace=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        KeyEscape=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESCAPE);
    }

    create()
    {
        this.anims.create({
            key: "espacioAnim",
            frames: this.anims.generateFrameNumbers("espacio", {start: 0, end:1}),
            repeat: -1,
            frameRate: 4,
        });
    }

    update()
    {
        t --;

        if(!NivelPacifico.darEnergia && !primeraConversa && login.dialogoPocho && NivelPacifico.conver == 1)
        {
            if (!teclaPuesta)
            {
                espacio = this.add.sprite(930, 860, 'espacio').setDepth(55);
                espacio.play('espacioAnim');
                teclaPuesta = true;
            }

            if (dialogosNoldor == 0 && t < 0) 
            {
                personaje.hablar.call(this);
                dialogoN1 = this.add.sprite(500, 780, 'dialogo').setDepth(50);
                dialogosNoldor = 1;
                t = 100;
            }

            if (KeySpace.isDown && dialogosNoldor == 1 && t < 0)
            {
                dialogoN1.destroy();
                dialogoFey1 = this.add.sprite(500, 780, 'dialogoFey1').setDepth(50);
                dialogosNoldor = 2;
                t = 100;
            }

            if (KeySpace.isDown && dialogosNoldor == 2 && t < 0) 
            {
                dialogoFey1.destroy();
                dialogoN2 = this.add.sprite(500, 780, 'dialogo2').setDepth(50);
                dialogosNoldor = 3;
                t = 100;
            }

            if (KeySpace.isDown && dialogosNoldor == 3 && t < 0) 
            {
                dialogoN2.destroy();
                dialogoN3 = this.add.sprite(500, 780, 'dialogo3').setDepth(51);
                dialogosNoldor = 4;
                t = 100;
            }

            if (KeySpace.isDown && dialogosNoldor == 4 && t < 0) 
            {
                dialogoN3.destroy();
                dialogoN4 = this.add.sprite(500, 780, 'dialogo4').setDepth(52);
                dialogosNoldor = 5;
                t = 100;
            }

            if (KeySpace.isDown && dialogosNoldor == 5 && t < 0) 
            {
                dialogoN4.destroy();
                dialogoN5 = this.add.sprite(500, 780, 'dialogo5').setDepth(52);
                dialogosNoldor = 6;
                t = 100;
            }

            if (KeySpace.isDown && dialogosNoldor == 6 && t < 0) 
            {
                dialogoN5.destroy();
                dialogoFey2 = this.add.sprite(500, 780, 'dialogoFey2');
                dialogosNoldor = 7;
                t = 100;
            }

            if (KeySpace.isDown && dialogosNoldor == 7 && t < 0) 
            {
                dialogoFey2.destroy();
                espacio.destroy();
                primeraConversa = 1;
                personaje.dejarhablar.call(this);
            }
        }
    }
}