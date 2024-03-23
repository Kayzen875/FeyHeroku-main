import * as personaje from './personaje.js'
import * as datos from './load.js'
export var verdeList;
var magiascale = 0.6;
export var tmagic = -1;
export var v;
var absorber = true;
export var cargaElementalVerde = parseInt(localStorage.getItem("energia_verde"), 10);;
import * as estadisticas from './estadisticas.js';
  

export function loadSprite()
{
	//this.load.image('magiaVerde','assets/images/magia.png');
	this.load.spritesheet('magiaVerde', 'assets/sprites/magia.png', {frameWidth:25, frameHeight:33});
}

export function crearMagiaVerde()
{
	verdeList = this.physics.add.group();

	this.anims.create({
		key: "verde",
		frames: this.anims.generateFrameNumbers("magiaVerde", {start: 0, end:3}),
		repeat: -1,
		frameRate: 5
	});
}
export function tiempoVerde()
{
	tmagic -=1;
}
export function disparoMagiaVerde()
{
	if(tmagic < 0 && cargaElementalVerde && personaje.direccion == 2 && estadisticas.gemas == 2)
	{
		v=verdeList.create(personaje.ani.x, personaje.ani.y,'magiaVerde');
		v.setScale(magiascale,magiascale);
		v.setVelocityX(150);
		v.setDepth(20);
		v.play("verde");
		tmagic = 100;
		cargaElementalVerde -= 1;
		estadisticas.restarEnergiaVerde.call(this);
	}
	else if(tmagic < 0 && cargaElementalVerde && personaje.direccion == 4 && estadisticas.gemas == 2)
	{
		v=verdeList.create(personaje.ani.x, personaje.ani.y,'magiaVerde');
		v.setScale(magiascale,magiascale);
		v.setVelocityX(-150);
		v.setDepth(20);
		v.play("verde");
		tmagic = 100;
		cargaElementalVerde -= 1;
		estadisticas.restarEnergiaVerde.call(this);
	}
	else if(tmagic < 0 && cargaElementalVerde && personaje.direccion == 1 && estadisticas.gemas == 2)
	{
		v=verdeList.create(personaje.ani.x, personaje.ani.y,'magiaVerde');
		v.setScale(magiascale,magiascale);
		v.setVelocityY(-150);
		v.setDepth(20);
		v.play("verde");
		tmagic = 100;
		cargaElementalVerde -= 1;
		estadisticas.restarEnergiaVerde.call(this);
	}
	else if(tmagic < 0 && cargaElementalVerde && personaje.direccion == 3 && estadisticas.gemas == 2)
	{
		v=verdeList.create(personaje.ani.x, personaje.ani.y,'magiaVerde');
		v.setScale(magiascale,magiascale);
		v.setVelocityY(150);
		v.setDepth(20);
		v.play("verde");
		tmagic = 100;
		cargaElementalVerde -= 1;
		estadisticas.restarEnergiaVerde.call(this);
	}
}

export function recargaElementalVerde()
{
	if (absorber == true) 
	{
		cargaElementalVerde += 1;
		estadisticas.calculoVerde.call(this, 1)
	}
}

export function absorcion()
{
	if (cargaElementalVerde < 5) 
	{
		absorber = true;
	}
	else
	{
		absorber = false;
	}
}

/*function pelotaMagica()
{
	if(tmagic < 0)
	{
		magia = this.physics.add.sprite(ani.x,ani.y,'playerMagia');
		magia.setScale(magiascale, magiascale)
		magia.setVelocityX(100);
		tmagic = 230;
	}
}*/