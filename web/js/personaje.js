export var ani;
export var golpeado = 0;
var codigo = 0;
var KeyW;
var KeyS;
var KeyD;
var KeyA;
var BONK;
var MAGIC;
var espada;
var dir1;
var dir2;
var dx;
var dy;
var dir;  
var tiempozoom = -1;
var tiempo;
var velocidad = 100;
export var direccion = 3;
export var hitboxPrueba;
export var hitboxDanyo;
export var hitboxInteractuar;
export var hitboxBonkList;
export var tiempoBonk = -1;
export var cooldownBonk = -1;
export var hablando = 0;
export var hitBoxBombaList;
var hitboxsize = 4;
var h;
var i;
var KeyONE;
var KeyTWO;
var KeyTHREE;
var KeyFOUR;
var swing;
var sArco;
var sEscudo;
var sMagia;
var impact;

var borrarHitbox = -1;
export var hitBoxBomba;
var bomba;
export var timerBomba = -1;
var bomb;
//var datos;

import * as enemigo from './enemigo.js'
import * as magiaVerde from './magiaVerde.js'
import * as magiaAzul from './magiaAzul.js'
import * as magiaMorada from './magiaMorada.js'
import * as game from './game.js'
import * as inventario from './inventario.js'
import * as estadisticas from './estadisticas.js'
import * as gameOver from './gameOver.js'
import * as NivelPacifico from './NivelPacifico.js'
import * as datos from './load.js'
export function loadSprite()
{
	this.load.spritesheet('playerAni', 'assets/sprites/Fey.png', {frameWidth:52, frameHeight:90});
	this.load.spritesheet('playerAniAtaque', 'assets/sprites/FeyAtaque.png', {frameWidth:105, frameHeight:116});
	this.load.spritesheet('espada','assets/sprites/SwordAttack.png',{frameWidth:64, frameHeight:64});
	this.load.image('playerMagia','assets/images/magia.png');
	this.load.image('hitboxPrueba','assets/hitbox/hitboxPrueba.png');
	this.load.image('hitboxDanyo','assets/hitbox/hitboxDanyo.png');
	this.load.image('hitboxBonk','assets/hitbox/hitboxBonk.png');
	this.load.image('semilla', 'assets/images/semillaExplosiva.png');
	this.load.audio('slash', 'assets/audio/espadazo.mp3');
	this.load.audio('sonidoArco', 'assets/audio/arco.mp3');
	this.load.audio('sonidoMagia', 'assets/audio/magia.mp3');
	this.load.audio('sonidoEscudo', 'assets/audio/escudo.mp3');
	this.load.audio('impact', 'assets/audio/impact.mp3');
	this.load.audio('bomb', 'assets/audio/bombsound.mp3');


}
export function crearPersonaje()
{
	
	ani = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'playerAni');
	
	////HITBOXES///
	hitboxInteractuar = this.physics.add.sprite(ani.x,ani.y, 'hitboxPrueba');
	//hitboxInteractuar.setSize(1, hitboxInteractuar.height/2);

	hitboxPrueba = this.physics.add.sprite(ani.x,ani.y, 'hitboxPrueba');
	hitboxPrueba.setScale(hitboxsize,hitboxsize);

	hitboxDanyo = this.physics.add.sprite(ani.x,ani.y, 'hitboxDanyo');
	hitboxDanyo.setScale(0.3,0.3);

	hitboxBonkList = this.physics.add.group();
	hitBoxBombaList = this.physics.add.group();

	ajustesPersonaje.call(this);

	teclasPersonaje.call(this);

	animacionesPersonaje.call(this);

	swing = this.sound.add('slash');
	sMagia = this.sound.add('sonidoMagia');
	sArco = this.sound.add('sonidoArco');
	sEscudo = this.sound.add('sonidoEscudo');
	impact = this.sound.add('impact');
	bomb = this.sound.add('bomb');
}

function ajustesPersonaje()
{
	ani.setOrigin(0.5,0.5);
	ani.setScale(0.3, 0.3);
	ani.setDepth(6);
	ani.velocity = 1.5;
	ani.health = parseInt(localStorage.getItem("vida"), 10);
	ani.setCollideWorldBounds(true);

	dir1=new Phaser.Math.Vector2(1,0);
	dir1.normalize();

	dir2=new Phaser.Math.Vector2(0,1);
	dir2.normalize();

	ani.setSize(ani.width / 2, ani.height / 3)
	ani.setOffset(4.5+ani.width / 2 * ani.scale , ani.height / 1.5)
}

function teclasPersonaje()
{
	KeyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	KeyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	KeyD=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	KeyA=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	BONK=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	MAGIC=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
	KeyONE=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
	KeyTWO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
	KeyTHREE=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
	KeyFOUR=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
}

function animacionesPersonaje()
{
	this.anims.create({
		key: "frontIdle",
		frameRate: 2,
		frames: this.anims.generateFrameNumbers("playerAni", {start: 0, end:2}),
		repeat: -1
	});
	this.anims.create({
       key: "down",
       frameRate: 3,
       frames: this.anims.generateFrameNumbers("playerAni", {start: 3, end:4}),
       repeat: -1
    });
	this.anims.create({
		key: "up",
		frameRate: 3,
		frames: this.anims.generateFrameNumbers("playerAni", {start: 11, end:12}),
		repeat: -1
	});
	this.anims.create({
		key: "right",
		frameRate: 3,
		frames: this.anims.generateFrameNumbers("playerAni", {start: 5, end:7}),
		repeat: -1
	});
	this.anims.create({
		key: "left",
		frameRate: 3,
		frames: this.anims.generateFrameNumbers("playerAni", {start: 8, end:10}),
		repeat: -1
	});
	this.anims.create({
		key: "backIdle",
		frameRate: 2,
		frames: this.anims.generateFrameNumbers("playerAni", {start: 13, end:14}),
		repeat: -1
	});

	this.anims.create({
		key:'bonkRight',
		frameRate: 525,
		frames:this.anims.generateFrameNames('playerAniAtaque',{start:0, end:1}),
	});
	this.anims.create({
		key:'bonkLeft',
		frameRate: 5,
		frames:this.anims.generateFrameNames('playerAniAtaque',{start:2, end:3}),
	});
}
export function hablar()
{
	hablando = 1;
	//ani.setVelocityX(0);
	//ani.setVelocityY(0);
}

export function dejarhablar()
{
	hablando = 0;
}

export function controlesPersonaje()
{
	tiempozoom -= 1;
	this.cameras.main.startFollow(ani);
	if(golpeado == 0 && cooldownBonk < 0 && hablando == 0)
	{
		if (KeyS.isDown)
		{
			direccion = 3;
			ani.setVelocityY(velocidad);
			ani.setVelocityX(0);
			if (Phaser.Input.Keyboard.JustDown(KeyS))
			{
				ani.anims.play("down");
				ani.setVelocityX(0);
			}
		}
		else if (KeyW.isDown)
		{
			direccion = 1;
			ani.setVelocityY(-velocidad);
			ani.setVelocityX(0);
			if (Phaser.Input.Keyboard.JustDown(KeyW))
			{
				ani.anims.play("up");
			}
		}
		else if (KeyD.isDown)
		{
			direccion = 2;
			ani.setVelocityX(velocidad);
			ani.setVelocityY(0);
			if (Phaser.Input.Keyboard.JustDown(KeyD))
			{
				ani.anims.play("right");
			}
		}
		else if (KeyA.isDown)
		{
			direccion = 4;
			ani.setVelocityX(-velocidad);
			ani.setVelocityY(0);
			if (Phaser.Input.Keyboard.JustDown(KeyA))
			{
				ani.anims.play("left");
			}
		}

		if(!KeyA.isDown && !KeyD.isDown && !KeyW.isDown && !KeyS.isDown)
		{
			ani.setVelocityX(0);
			ani.setVelocityY(0);
		}

		if (Phaser.Input.Keyboard.JustUp(KeyS) && direccion == 3) 
		{
			ani.anims.play("frontIdle");
			ani.setVelocityX(0);
		}
		if (Phaser.Input.Keyboard.JustUp(KeyW) && direccion == 1) // Faltara añadir animaciones de idle lados + espaldas
		{
			ani.anims.play("backIdle");
			ani.setVelocityX(0);
		}
		if (Phaser.Input.Keyboard.JustUp(KeyD) && direccion == 2) // Faltara añadir animaciones de idle lados + espaldas
		{
			ani.anims.play("frontIdle");
			ani.setVelocityY(0);
		}
		if (Phaser.Input.Keyboard.JustUp(KeyA) && direccion == 4) // Faltara añadir animaciones de idle lados + espaldas
		{
			ani.anims.play("frontIdle");
			ani.setVelocityY(0);
		}


		if (BONK.isDown && (direccion == 2 || direccion == 4))
		{
			ani.setVelocityY(0);
			ani.setVelocityX(0);
			bonk.call(this);
			swing.play()
		}
		if (Phaser.Input.Keyboard.JustDown(KeyONE))
		{
			if (inventario.contadorM > 0) 
			{
				inventario.comerManzana.call(this);
			}
		}
		if (Phaser.Input.Keyboard.JustDown(KeyTWO))
		{
			if(inventario.contadorV > 0)
			{
				inventario.consumirVelocidad.call(this);
			}
		}
		if (Phaser.Input.Keyboard.JustDown(KeyTHREE))
		{
			if(inventario.contadorC > 0)
			{
				inventario.consumirCorteza.call(this);
			}
		}
		if (Phaser.Input.Keyboard.JustDown(KeyFOUR))
		{
			if (inventario.contadorB > 0)
			{
				inventario.consumirBomba.call(this);
			}
		}
		if (MAGIC.isDown && NivelPacifico.darEnergia == true)
		{
			if (estadisticas.gemas == 1  && magiaAzul.timer < 0)
			{
				magiaAzul.proteccion.call(this);
				sEscudo.play();
			}
			else if (estadisticas.gemas == 2 && magiaVerde.tmagic < 0)
			{
				magiaVerde.disparoMagiaVerde.call(this);
				sMagia.play();
			}
			else if (estadisticas.gemas == 3 && magiaMorada.contador < 0)
			{
				magiaMorada.dispararFlechaGema.call(this);
				sArco.play();
			}
			
		}
		if (Phaser.Input.Keyboard.JustDown(KeyS))
		{
			ani.anims.play("down");
		}
	}

	movimientoHitbox.call(this);
	zoomCamara.call(this);
}

/*export function posicionPersonaje()
{
	console.log("La funcion del personaje se llama");
    var urlllamada = 'http://localhost/feypruebas/web/php/buscausuario.php';


    var xhr = new XMLHttpRequest();

	
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            datos=JSON.parse(xhr.responseText);

            console.log("soy una zorrita");

            ani.x = datos.posX;
            ani.y = datos.poxY;
           // personaje.ani.x = pruebaX;
            //console.log(personaje.ani.x);

        }
        else if (xhr.status !== 200) {
            console.log('Algo ha fallado: ' + xhr.status);
        }
    };

    xhr.open('POST', urlllamada);
    xhr.send();
    //xhr.send('id='+variable) //Con esto envias datos al fichero php
    console.log("Parte 1 llega");
}*/

export function hit(tGolpe)
{	
	if(golpeado > 0)
		{
			golpeado += 1;

			if (golpeado > tGolpe)
			{
				ani.clearTint();
				golpeado = 0
			}
		}
}

export function hitted(r1, r2)
{
	dx = ani.x - r1;
	dy = ani.y - r2;

	dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

	ani.setVelocity(dir.x, dir.y)

	if (estadisticas.corazonExtra == true) 
	{
		ani.setTintFill(0xFF9900);
	}
	else
	{
		ani.setTintFill(0xFF0000);
	}

	if (ani.health > 0) 
	{
		ani.health -=1;
	}
	else
	{
		ani.setTintFill(0xffffff)
	}

	golpeado = 1;
}

export function quemado()
{
	ani.health --;
}

export function hitted2(r1, r2)
{
	dx = ani.x - r1
	dy = ani.y - r2

	dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

	ani.setVelocity(dir.x, dir.y)

	if(estadisticas.corazonExtra == true) 
	{
		ani.setTintFill(0xFF9900);
	}
	else
	{
		ani.setTintFill(0xFF0000);
	}

	if (ani.health > 0 && estadisticas.corazonExtra == false) 
	{
		ani.health -=1;
		impact.play()
	}
	if(ani.health == 0)
	{
		ani.setTintFill(0xffffff)
		this.scene.start("gameOver");
	}

	golpeado = 1;
}

function zoomCamara()
{
	if(tiempozoom == 0)
	{
		this.cameras.main.setZoom(2);
		tiempozoom = -1;
	}
}

function bonk()
{
	if(direccion == 2)
	{
		cooldownBonk = 45;
		if (Phaser.Input.Keyboard.JustDown(BONK) && cooldownBonk == 45)
		{
			tiempoBonk = 55;
			ani.anims.play("bonkRight");
			h=hitboxBonkList.create(ani.x+12,ani.y, 'hitboxBonk');
		}
	}
	else if(direccion == 4)
	{
		cooldownBonk = 45;
		if (Phaser.Input.Keyboard.JustDown(BONK) && cooldownBonk == 45)
		{
			tiempoBonk = 55;
			ani.anims.play("bonkLeft");
			h=hitboxBonkList.create(ani.x-12,ani.y, 'hitboxBonk');
		}
	}
}

export function tBonk()
{
	tiempoBonk -=1;
	if(tiempoBonk == 0)
	{
		for(i = 0; i < hitboxBonkList.getChildren().length; i++)
		{
			hitboxBonkList.getChildren()[i].destroy();
		}

		if(KeyD.isDown)
		{
			ani.anims.play("right");
		}
		else if(KeyA.isDown)
		{
			ani.anims.play("left");
		}
		else
		{
			ani.anims.play("frontIdle");
		}
	}
}
	
export function cBonk()
{
	cooldownBonk -=1;
}

function corteEspada()
{
	espada=this.add.sprite(ani.x,ani.y,'espada');
	espada.play('slash');
	this.cameras.main.setZoom(3);
	tiempozoom = 150;
}

function movimientoHitbox()
{
	hitboxPrueba.x = ani.x;
	hitboxPrueba.y = ani.y;

	hitboxInteractuar.x = ani.x;
	hitboxInteractuar.y = ani.y;

	hitboxDanyo.x = ani.x;
	hitboxDanyo.y = ani.y;
}

export function curarVida()
{
	ani.health++;
	estadisticas.ponerVida.call(this);
}

export function speedBoost()
{
	velocidad = 150;
}

export function normalSpeed()
{
	velocidad = 100;
}

export function slowSpeed()
{
	velocidad = 40;
	inventario.arreglo.call(this);
}

export function ponerBomba()
{
	bomba = this.physics.add.sprite(ani.x, ani.y, "semilla")
	timerBomba = 150;
}

export function explosionBomba()
{
	if (timerBomba == 50) 
	{
		bomba.play('pum')
		hitBoxBomba = hitBoxBombaList.create(bomba.x, bomba.y, "hitboxPrueba");
		bomb.play();
		console.log("boom");
		borrarHitbox = 30;
	}
	
	if(timerBomba > 0)
	{
		timerBomba--;
	}

	if(timerBomba == 0)
	{
		borrarHitbox--;
		if (borrarHitbox == 0) 
		{
			bomba.setVisible(false);
			hitBoxBomba.destroy();
			timerBomba = -1;
		}
	}
}

export function fullHp()
{
	ani.health = 4;
	golpeado = 0;
}