import * as personaje from './personaje.js'
import * as magiaVerde from './magiaVerde.js'
import * as magiaMorada from './magiaMorada.js'
import * as magiaAzul from './magiaAzul.js'
import * as nivelAdri from './NivelAdri.js'
var t;
var i;
var e;
var dx;
var dy;
var dir;
export var skull;
export var skulls;
export var grupoEnemigo;
var random;
export var enemigo;

export function loadEnemigo()
{
	this.load.spritesheet('enemigoAzul', 'assets/sprites/spritesheet2.png', {frameWidth:56, frameHeight:64});
	this.load.image('calavera', 'assets/images/calavera.png')
}
export function cargarEnemigo()
{
	grupoEnemigo = this.physics.add.group();
	skulls = this.physics.add.group();

	this.physics.add.overlap(grupoEnemigo, magiaAzul.grupoEscudos, destruirMagia, null, this)
	this.physics.add.overlap(grupoEnemigo, magiaVerde.verdeList, destruirMagia, null, this)
	this.physics.add.overlap(grupoEnemigo, magiaMorada.flechasList, destruirMagia, null, this)
	this.physics.add.overlap(grupoEnemigo, personaje.hitboxBonkList, enemyHitted, null, this);
	this.physics.add.overlap(grupoEnemigo, personaje.hitBoxBomba, enemydead, null, this);

	this.anims.create({
	key: "ani",
	frames: this.anims.generateFrameNumbers("enemigoAzul", {start:0, end:1}),
	repeat: -1,
	frameRate: 2,
	});
}

function ajustesEnemigo(e)
{
	e.setOrigin(0.5,0.5);
	e.setScale(0.8,0.8);
	e.setDepth(6)
	e.health = 2;
	e.velocidad = 40;
	e.golpeado = 0;
	e.stalk = false;
	e.play("ani");
}

export function activarStalk()
{
	for (i=0; i < grupoEnemigo.getChildren().length; i++)
	{
		e=grupoEnemigo.getChildren()[i];
		e.stalk = 1;
	}
}

export function stalkEnemigo()
{
	for (i=0; i < grupoEnemigo.getChildren().length; i++)
	{
		e=grupoEnemigo.getChildren()[i];
		if(e.stalk && e.golpeado == 0)
		{
			t= new Phaser.Math.Vector2(personaje.ani.x - e.x, personaje.ani.y - e.y);
			t.normalize();
			e.direccion = t;

			e.setVelocityX(e.velocidad * e.direccion.x);
			e.setVelocityY(e.velocidad * e.direccion.y);
		}
	}
}

export function ultraStalk()
{
	for (i=0; i < grupoEnemigo.getChildren().length; i++)
	{
		e=grupoEnemigo.getChildren()[i];
		if(e.health < 2)
		{
			e.velocidad = 80;
		}
	}
}

export function enemyHit()
{	
	for (i=0; i < grupoEnemigo.getChildren().length; i++)
	{
		e=grupoEnemigo.getChildren()[i];
		if(e.golpeado > 0)
		{
			e.golpeado += 1;

			if (e.golpeado > 30)
			{
				e.clearTint()
				e.golpeado = 0
			}
		}
	}
}

export function enemyHitted(e)
{
	dx = e.x - personaje.ani.x;
	dy = e.y - personaje.ani.y;

	dir = new Phaser.Math.Vector2(dx, dy).normalize();

	e.setVelocity(dir.x, dir.y);

	e.setTintFill(0xFF0000);

	if (e.health > 1) 
	{
		e.health -=1;
		e.golpeado = 1;
	}
	else
	{
		/*skull = skulls.create(e.x, e.y, 'calavera');
		skull.setDepth(20);
		skull.setScale(0.1,0.1)*/
		e.destroy();
	}
}

function enemydead(e) 
{
	e.setTintFill(0xFF0000);

	if (e.health > 1 && e.golpeado == 0) 
	{
		e.health -=1;
		e.golpeado = 1;
	}
	else
	{
		/*skull = skulls.create(e.x, e.y, 'calavera');
		skull.setDepth(20);
		skull.setScale(0.1,0.1)*/
		e.destroy();
	}	
}

export function creacionEnemigo(x,y)
{
	enemigo = grupoEnemigo.create(x,y, "enemigoAzul");
	ajustesEnemigo.call(this, enemigo);
}

function destruirMagia(e, m)
{
	m.destroy();
}