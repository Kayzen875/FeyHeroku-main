import * as personaje from './personaje.js'
import * as magiaVerde from './magiaVerde.js'
import * as NivelPedro from './NivelPedro.js'
import * as magiaAzul from './magiaAzul.js'
export var cajaEmbestida;
var c;
var stalk = 0;
var enemigoGolpeado = 0;
var dx;
var dy;
var dir;
var esencia;
var enemigoVivo = true;
var playerCerca;
var INTERACTUE;
export var toromalo;
//export var tenredado = -1;
export var hitboxInteractuar;
export var torosMuertos = 0;
export var toroSpawned = false;
//var enredado = 0;
var planta;
//export var tembestida = -1;
//export var tcargaembestida = 10;
var random;
var animsplayed = false;
var tanim = -1;
export var toroList;
var impact;

export function loadEnemigo()
{
	this.load.spritesheet('cajaEmbestida', 'assets/sprites/toromalo.png', {frameWidth:50, frameHeight:50});
	this.load.image('planta', 'assets/images/planta.png');
	//this.load.image('esencia', 'assets/images/esencia.png');
	this.load.spritesheet('esencia', 'assets/sprites/esencia.png', {frameWidth:280, frameHeight:220});
	this.load.image('hitboxPrueba','assets/hitbox/hitboxPrueba.png');
	this.load.image('manzana', 'assets/images/Manzana.png');

	this.load.audio('impact', 'assets/audio/impact.mp3');
}
export function cargarEnemigo()
{
	toroList = this.physics.add.group();
	ajustesEnemigo.call(this);

	this.anims.create({
		key: "flush",
		frames: this.anims.generateFrameNumbers("esencia", {start: 0, end:4}),
		repeat: -1,
		frameRate: 5
	});

	this.anims.create({
		key: "izquierda",
		frames: this.anims.generateFrameNumbers("cajaEmbestida", {start: 0, end:2}),
		repeat: -1,
		frameRate: 5
		});

	this.anims.create({
		key: "derecha",
		frames: this.anims.generateFrameNumbers("cajaEmbestida", {start: 3, end:5}),
		repeat: -1,
		frameRate: 5
		});

	this.anims.create({
		key: "abajo",
		frames: this.anims.generateFrameNumbers("cajaEmbestida", {start: 6, end:8}),
		repeat: -1,
		frameRate: 5
		});

	this.anims.create({
		key: "arriba",
		frames: this.anims.generateFrameNumbers("cajaEmbestida", {start: 9, end:11}),
		repeat: -1,
		frameRate: 5
		});

	INTERACTUE=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);

	this.physics.add.overlap(magiaVerde.verdeList, toroList, raiz, null, this);
	this.physics.add.overlap(personaje.hitboxPrueba, toroList, activarStalk, null, this);
	this.physics.add.overlap(toroList, personaje.hitboxBonkList, enemigoColisionVida, null, this);
	this.physics.add.overlap(toroList, personaje.hitBoxBombaList, enemigoColisionVida, null, this);
	//this.physics.add.collider(toroList, magiaAzul.grupoEscudos);

	impact = this.sound.add('impact');
}

export function ajustesEnemigo(toroX,toroY)
{
	cajaEmbestida = toroList.create(toroX, toroY, 'cajaEmbestida');
	cajaEmbestida.setOrigin(0.5,0.5);
	cajaEmbestida.setDepth(13);
	cajaEmbestida.setSize(35,35);
	cajaEmbestida.health = 3;
	cajaEmbestida.velocidad = 40;
	cajaEmbestida.direccion = new Phaser.Math.Vector2(1,1);
	cajaEmbestida.direccion.normalize();
	cajaEmbestida.vivo = 1;
	cajaEmbestida.stalk = 0;
	cajaEmbestida.embestida = 0;
	cajaEmbestida.tembestida = -1;
	cajaEmbestida.tcargaembestida = 10;
	cajaEmbestida.enredado = 0;
	cajaEmbestida.tenredado = -1;
	cajaEmbestida.thit = -1;
	cajaEmbestida.tinte = -1;
	/*for (i=0; i < toroList.getChildren().length; i++)
	{
		t=toroList.getChildren()[i];
	}*/
}

function activarStalk(p,c)
{
	c.stalk = 1;
}

export function direccion()
{
	
	var diferenciaY;
	var diferenciaX;
	var i;
	var t;

	for (i=0; i < toroList.getChildren().length; i++)
	{
		t=toroList.getChildren()[i];
		t.tanim --;
		t.thit --;
		t.tinte --;
		diferenciaY = t.y - personaje.ani.y;
		diferenciaX = t.x - personaje.ani.x;
		if(!t.animsplayed && t.vivo == 1)
		{
			if(diferenciaY > diferenciaX)
			{
				if(t.y > personaje.ani.y)
				{
					t.play("arriba");
					t.animsplayed = true;
					t.tanim = 80;
				}
				else
				{
					t.play("abajo");
					t.animsplayed = true;
					t.tanim = 80;
				}
			}
			else if (diferenciaX > diferenciaY)
			{
				if(t.x > personaje.ani.x)
				{
					t.play("izquierda");
					t.animsplayed = true;
					t.tanim = 80;
				}
				else
				{
					t.play("derecha");
					t.animsplayed = true;
					t.tanim = 80;
				}
			}
		}

		if(t.tanim == 0)
		{
			t.animsplayed = false;
		}
	}

}

export function stalkEnemigo()
{	
	var t;
	var i;
	for (i=0; i < toroList.getChildren().length; i++)
	{
		t=toroList.getChildren()[i];
		if(!t.enredado && t.vivo == 1)
		{
			if(t.stalk && t.embestida == 0)
			{
				c= new Phaser.Math.Vector2(personaje.ani.x - t.x, personaje.ani.y - t.y);
				c.normalize();
				t.direccion = c;
			}

			if(t.stalk)
			{
				t.setVelocityX(t.velocidad * t.direccion.x);
				t.setVelocityY(t.velocidad * t.direccion.y);
			}
		}
		else if(t.enredado && t.vivo == 1)
		{
			t.setVelocityY(0);
			t.setVelocityX(0);
		}
	}
}

export function rush()
{
	var i;
	var t;
	for (i=0; i < toroList.getChildren().length; i++)
	{
		t=toroList.getChildren()[i];
		t.tembestida --;

		if(t.tembestida < 0)
		{
			t.tcargaembestida --;
			t.velocidad = 0;
			if(t.tcargaembestida < 0)
			{
				t.velocidad = 140;
				t.tcargaembestida = 25;
				t.tembestida = 100;
				t.embestida = 1;
			}
		}
		else if(t.tembestida == 40)
		{
			t.velocidad = 40;
			t.embestida = 0;
		}
	}
}

export function noStalk()
{	
	var t;
	var i;
	for (i=0; i < toroList.getChildren().length; i++)
	{
		t=toroList.getChildren()[i];
		if(t.health < 2)
		{
			t.stalk = 1;
			t.velocidad = 80;
		}
	}
}

function raiz(c,t)
{
	if (!t.enredado)
	{
		planta = this.physics.add.sprite(t.x,t.y,'planta');
		planta.setDepth(14);
		planta.setScale(0.05,0.05);
		t.enredado= 1;
		t.tenredado = 100;
		c.disableBody(true,true);
		magiaVerde.verdeList.remove(c);
		c.destroy();
	}
}

export function traiz()
{
	var t;
	var i;
	for (i=0; i < toroList.getChildren().length; i++)
	{
		t=toroList.getChildren()[i];
		t.tenredado --;

		if (t.tenredado == 0)
		{
			t.enredado = 0;
			planta.destroy();
		}
	}
}

function enemigoColisionVida(t)
{
	if(t.thit < 0)
	{
		t.tinte = 100;
		t.setTintFill(0xFF0000);
		t.thit = 40;
		if (t.health > 1) 
		{
			t.health -=1;
			impact.play()
		}
		else
		{
			esencia = this.physics.add.sprite(t.x, t.y,'esencia');
			esencia.setScale(0.2,0.2);
			esencia.setDepth(20);
			esencia.setSize(250,250);
			esencia.play("flush");

			random = Phaser.Math.Between(0, 5);

			if(random == 5) 
			{
				NivelPedro.generarManzana.call(this, t.x, t.y, 1)
			}
			else if(random == 0)
			{
				NivelPedro.generarManzana.call(this, t.x, t.y, 2)
			}
			

			this.physics.add.overlap(esencia, NivelPedro.arbol1, sanar1, null, this);
			this.physics.add.overlap(esencia, NivelPedro.arbol2, sanar2, null, this);
			this.physics.add.overlap(esencia, NivelPedro.arbol3, sanar3, null, this);
			this.physics.add.overlap(esencia, NivelPedro.arbol4, sanar4, null, this);
			this.physics.add.overlap(esencia, NivelPedro.arbol5, sanar5, null, this);
			this.physics.add.overlap(esencia, NivelPedro.arbol6, sanar6, null, this);
			this.physics.add.overlap(esencia, personaje.hitboxInteractuar, enemigoColisionVida, null, this);

			t.vivo = 0;
			if (t.tenredado > 1) {planta.destroy()}
			t.destroy();
			if(torosMuertos != 4)
			{
				torosMuertos++;
			}
			
			toroSpawned = false;
		}
	}
}
export function lastToro()
{
	if(torosMuertos == 4 && !toroSpawned)
	{
		cajaEmbestida = toroList.create(915, 900, 'cajaEmbestida');
		cajaEmbestida.setOrigin(0.5,0.5);
		cajaEmbestida.setDepth(13);
		cajaEmbestida.setSize(35,35);
		cajaEmbestida.health = 3;
		cajaEmbestida.velocidad = 40;
		cajaEmbestida.direccion = new Phaser.Math.Vector2(1,1);
		cajaEmbestida.direccion.normalize();
		cajaEmbestida.vivo = 1;
		cajaEmbestida.stalk = 0;
		cajaEmbestida.embestida = 0;
		cajaEmbestida.tembestida = -1;
		cajaEmbestida.tcargaembestida = 10;
		cajaEmbestida.enredado = 0;
		cajaEmbestida.tenredado = -1;
		cajaEmbestida.thit = -1;

		toroSpawned = true;
	}
}
export function clearTint()
{
	var i;
	var t;
	for (i=0; i < toroList.getChildren().length; i++)
	{
		t=toroList.getChildren()[i];
		if(t.tinte < 50)
		{
			t.clearTint()
		}
	}
}
function sanar1()
{
	if (INTERACTUE.isDown)
	{
		NivelPedro.purificarA1.call(this);
		esencia.destroy();
	}
}
function sanar2()
{
	if (INTERACTUE.isDown)
	{
		NivelPedro.purificarA2.call(this);
		esencia.destroy();
	}
}
function sanar3()
{
	if (INTERACTUE.isDown)
	{
		NivelPedro.purificarA3.call(this);
		esencia.destroy();
	}
}
function sanar4()
{
	if (INTERACTUE.isDown)
	{
		NivelPedro.purificarA4.call(this);
		esencia.destroy();
	}
}
function sanar5()
{
	if (INTERACTUE.isDown)
	{
		NivelPedro.purificarA5.call(this);
		esencia.destroy();
	}
}
function sanar6()
{
	if (INTERACTUE.isDown)
	{
		NivelPedro.purificarA6.call(this);
		esencia.destroy();
	}
}

function despawnEsencia()
{
	esencia.destroy();
}

/*export function enemyHit()
{	
	if(enemigoGolpeado > 0)
		{
			enemigoGolpeado += 1;
			if (enemigoGolpeado > 30)
			{
				enemigoAzul.clearTint()
				enemigoGolpeado = 0
			}
		}
}
export function enemyHitted()
{
	dx = enemigoAzul.x - personaje.ani.x;
	dy = enemigoAzul.y - personaje.ani.y;
	dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
	enemigoAzul.setVelocity(dir.x, dir.y);
	enemigoAzul.setTintFill(0xFF0000);
	if (enemigoAzul.health > 1) 
	{
		enemigoAzul.health -=1;
	}
	else
	{
		enemigoVivo = false;
		enemigoAzul.destroy();
	}
	enemigoGolpeado = 1;
}*/