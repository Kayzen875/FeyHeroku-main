import * as personaje from './personaje.js'
import * as magiaAzul from './magiaAzul.js'

var splatoon;
export var lanzaRocas;
var pulpito;
var roca;
var stalk = 0;
var t;
var i;
var s;
var b;
var p;
var dx;
var dy;
var dir;
var guardar1;
var guardar2;
var timer = 0;

var creada = 0;

export function loadEnemigo()
{
	this.load.spritesheet('pulpo','assets/sprites/pulpo_2.png',{frameWidth:32, frameHeight:32});
	this.load.image('roca','assets/images/roca.png');
}
export function cargarEnemigo()
{
	splatoon = this.physics.add.group();
	lanzaRocas = this.physics.add.group();

	this.physics.add.overlap(splatoon, lanzaRocas, mataPulpo, null, this)

	this.anims.create({
	key: "pulping",
	frames: this.anims.generateFrameNumbers("pulpo", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});
}

export function creacionEnemigo(pulX, pulY)
{
	pulpito = splatoon.create(pulX, pulY, 'pulpo');
	pulpito.play('pulping');
	pulpito.setDepth(10);
	pulpito.timer = -1;
	pulpito.direccion = 0;
	pulpito.stalk = false;

	this.physics.add.overlap(personaje.hitboxPrueba, splatoon, activarStalk, null, this);
}

function activarStalk(p, s)
{
	t= new Phaser.Math.Vector2(personaje.ani.x - s.x, personaje.ani.y - s.y);
	t.normalize();
	s.direccion = t;
	s.stalk = true;
}

export function stalkEnemigo()
{
	if (timer > 0) {timer--;}

	for (i=0; i < splatoon.getChildren().length; i++)
	{
		s=splatoon.getChildren()[i];
		if(s.stalk && s.direccion != 0 && timer == 0 && s.timer < 0)
		{
			roca = lanzaRocas.create(s.x, s.y ,'roca')
			roca.direccion = s.direccion;
			roca.velocidad = 160;
			roca.rebote = 0;
			roca.setDepth(10)
			roca.setScale(0.6,0.6)
			timer = 75;
			s.stalk = false;
		}
	}
}

export function moverRocas()
{
	for (i=0; i < lanzaRocas.getChildren().length; i++)
	{
		b=lanzaRocas.getChildren()[i];
		b.setVelocityX(b.velocidad * b.direccion.x)
		b.setVelocityY(b.velocidad * b.direccion.y)
	}
}

export function rebote(r)
{
	r.rebote = 1;
}

function mataPulpo(p, r)
{
	if (r.rebote == 1) 
	{
		p.setVisible(false);
		p.timer = 350;
		r.destroy();
	}
}

export function respawnPulpo()
{
	for (i=0; i < splatoon.getChildren().length; i++)
	{
		p=splatoon.getChildren()[i];
		if (p.timer == 0) 
		{
			p.setVisible(true);
			p.timer = -1;
		}
		else if(p.timer > 0)
		{
			p.timer--;
		}
	}
}

export function gestionMirada()
{
	/*for (i=0; i < splatoon.getChildren().length; i++)
	{
		p=splatoon.getChildren()[i];
		if(p.x < 0) {-p.x}
		if(p.y < 0) {-p.y}
		if (personaje.ani.x - p.x < 2 && personaje.ani.y - p.y < 2) 
		{
			p.setVisible(false)
		}
		else
		{
			p.setVisible(true)
		}
	}*/
}