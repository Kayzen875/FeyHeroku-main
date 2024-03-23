var tiendaprueba;
var KeyESC;
export var tpT = 0;
var colisiones;
var flechita;
var KeyW;
var KeyS;
export var posicionTienda = [0, 1, 2, 3];
var posicion;
var tiendaOpen;
var manzanas;
var descPocion1;
var descPocion2;
var descRama;
var descSemilla;
var pocion1;
var pocion2;
var semilla;
var rama;
var precio;
var compras;
var salir;
var KeySpace;
var croack;

import * as inventario from './inventario.js'
import * as NivelPacifico from './NivelPacifico.js'
import * as estadisticas from './estadisticas.js'
import * as datos from './load.js'

export default class tienda extends Phaser.Scene{
	constructor(){
		super({key: "tienda"});
	}
  
	preload()
	{
		load.call(this);
	}
	create()
	{	
		posicion = 0;
		//tiendaprueba = this.physics.add.sprite(NivelPacifico.goblin.x,NivelPacifico.goblin.y,'tiendaprueba').setDepth(10);
		tiendaprueba = this.physics.add.sprite(NivelPacifico.goblin.x,NivelPacifico.goblin.y,'tienda').setDepth(10);

		tiendaprueba.setScale(1.5,1.5);

		croack = this.sound.add('croack')

		animacionesTienda.call(this);

		tiendaprueba.play("tiendaAnim")

		cargarTienda.call(this);
		
		manzanas = this.add.bitmapText(420, 488, 'carrier_command', 'Manzanas:' + inventario.contadorM, 11).setDepth(21);

		pocion1 = this.add.bitmapText(502, 521, 'carrier_command', 'Pocion Rapidez', 5).setDepth(21);
		pocion2 = this.add.bitmapText(503, 576, 'carrier_command', 'Pocion Corteza', 5).setDepth(21);
		semilla = this.add.bitmapText(503, 632, 'carrier_command', 'Semilla Bomba', 5).setDepth(21);
		rama = this.add.bitmapText(503, 687, 'carrier_command', 'Simple Rama', 5).setDepth(21);

		descPocion1 = this.add.bitmapText(517, 530, 'gem_font', 'Aumenta tu velocidad de movimiento.', 6.5).setDepth(21);
		descPocion1.maxWidth = 70;
		descPocion2 = this.add.bitmapText(517, 584, 'gem_font', 'Aumenta un corazon de salud.', 6.5).setDepth(21);
		descPocion2.maxWidth = 70;
		descSemilla = this.add.bitmapText(517, 641, 'gem_font', 'Plántala y mira como explota.', 6.5).setDepth(21);
		descSemilla.maxWidth = 70;
		descRama = this.add.bitmapText(517, 695, 'gem_font', 'Descubre la función de la ramita.', 6.5).setDepth(21);
		descRama.maxWidth = 70;

		precio = this.add.bitmapText(400, 521, 'carrier_command', 'Precio:' + posicionTienda[0], 7).setDepth(21);

		compras = this.add.bitmapText(357, 738, 'gem_font', 'Pulsa ESPACIO para comprar', 20).setDepth(21);
		salir = this.add.bitmapText(374, 760, 'gem_font', 'Pulsa ESCAPE para salir', 20).setDepth(21);

		flechita = this.add.sprite(615, 534, 'flechaEleccion').setDepth(10);
		flechita.setScale(1.8, 1.8);

		cargarMapa.call(this);
		cargarCamara.call(this);
		
		KeyESC=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		KeyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		KeyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		KeySpace=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		//animacionesTienda.call(this);

		//manzanas.inputEnabled = true;
		//desc = game.add.bitmapText(415, 488, 'Manzanas:' + inventario.contadorM, {fontsize:'12px', fill:'#FFF', font: 'Goudy Bookletter 1911'}).setDepth(21);
	}
	update()
	{
		if (KeyESC.isDown)
		{
			volver.call(this);
		}
		this.cameras.main.startFollow(NivelPacifico.goblin);

		moverPosicion();
	}
}

function load()
{
	this.load.spritesheet('tienda', 'assets/sprites/tienda_spritesheet.png', {frameWidth:148, frameHeight:187});
	this.load.image('flechaEleccion', 'assets/images/flechaEleccion.png');
	this.load.spritesheet('flecha_spritesheet', 'assets/sprites/flecha_spritesheet.png', {frameWidth:25, frameHeight:25});
	this.load.image('prueba','assets/mapas/mapaPacifico/prueba.png');
	this.load.image('Overworld','assets/mapas/mapaPacifico/Overworld.png');
	this.load.image('Manzana','assets/mapas/mapaPacifico/Manzana.png');
	this.load.image('arboles','assets/mapas/mapaPacifico/arboles.png');
	this.load.image('objects','assets/mapas/mapaPacifico/objects.png');
	this.load.tilemapTiledJSON('mapaPacifico','assets/mapas/mapaPacifico/mapaPacifico.json')

	this.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
	this.load.bitmapFont('gem_font', 'assets/fonts/gem.png', 'assets/fonts/gem.xml');
	this.load.audio('croack', 'assets/audio/croack.mp3');

}

function volver()
{
	tpT = 1;
	this.scene.start("NivelPacifico");
}

function cargarMapa()
{
		let mapaPacifico = this.add.tilemap('mapaPacifico');

		let objects = mapaPacifico.addTilesetImage('objects');
		let Overworld = mapaPacifico.addTilesetImage('Overworld');
		let prueba = mapaPacifico.addTilesetImage('prueba');
		let Manzana = mapaPacifico.addTilesetImage('Manzana');
		let arboles = mapaPacifico.addTilesetImage('arboles');

		let Suelo = mapaPacifico.createLayer("Suelo",[prueba], 0, 0).setDepth(0);
		let Agua = mapaPacifico.createLayer("Agua",[prueba], 0, 0).setDepth(0);
		let Elevacion = mapaPacifico.createLayer("Elevacion",[prueba], 0, 0).setDepth(0);
		let Elevacion2 = mapaPacifico.createLayer("Elevacion2",[prueba], 0, 0).setDepth(0);
		let Veneno = mapaPacifico.createLayer("Veneno",[prueba,objects], 0, 0).setDepth(0);
		let Arboles = mapaPacifico.createLayer("Arboles",[prueba,arboles,objects], 0, 0).setDepth(0);
		let Deco = mapaPacifico.createLayer("Deco",[prueba,Manzana,Overworld,arboles,objects], 0, 0).setDepth(0);
		let ArbolesBajos = mapaPacifico.createLayer("ArbolesBajos", [prueba,arboles], 0, 0).setDepth(0);
		let Stop = mapaPacifico.createLayer("Stop",[prueba], 0, 0).setDepth(0);
		let Arboles2 = mapaPacifico.createLayer("Arboles2",[prueba], 0, 0).setDepth(0);
		let Arboles3 = mapaPacifico.createLayer("Arboles3",[prueba], 0, 0).setDepth(0);
		let Spawner = mapaPacifico.getObjectLayer("Spawner");
		let ElementosEsmeralda = mapaPacifico.getObjectLayer("ElementosEsmeralda");
		let Portales = mapaPacifico.getObjectLayer("Portales");
		let CapaNPC = mapaPacifico.getObjectLayer("CapaNPC");
		colisiones =  mapaPacifico.createLayer("Colisiones",[Overworld], 0, 0).setDepth(0);
}
function cargarCamara()
{
	this.cameras.main.setBounds(0, 0, 1024, 1160);
	this.cameras.main.setZoom(2);     
	this.cameras.main.centerOn(0, 0);
}

export function cambiarTp()
{
	tpT = 0;
}

function animacionesTienda()
{	
	this.anims.create({
		key: "tiendaAnim",
		frameRate: 0.5,
		frames: this.anims.generateFrameNumbers("tienda", {start: 0, end:1}),
		repeat: -1,
	});
}

function moverPosicion()
{
	if (Phaser.Input.Keyboard.JustDown(KeyS) && posicion < 3)
	{
		flechita.y += 55;
		posicion++;
		posicionTienda[posicion];
		precio.setText('Precio:'+ posicionTienda[posicion]);
	}

	if (Phaser.Input.Keyboard.JustDown(KeyW) && posicion > 0)
	{
		flechita.y -= 55;
		posicion--;
		posicionTienda[posicion];
		precio.setText('Precio:'+ posicionTienda[posicion]);
	}

	if (Phaser.Input.Keyboard.JustDown(KeySpace))
	{
		comprarTienda(posicionTienda[posicion]);
		croack.play();
	}
}

function comprarTienda(p)
{
	if (p == posicionTienda[0] && inventario.contadorM >= posicionTienda[0] && inventario.contadorV < 9)
	{
		inventario.anyadirPocion1.call(this);
		inventario.restarManzana(p);
		manzanas.setText('Manzanas:' + inventario.contadorM);
	}

	if (p == posicionTienda[1] && inventario.contadorM >= posicionTienda[1] && inventario.contadorC < 9)
	{
		inventario.anyadirPocion2.call(this);
		inventario.restarManzana(p);
		manzanas.setText('Manzanas:' + inventario.contadorM);
	}

	if (p == posicionTienda[2] && inventario.contadorM >= posicionTienda[2] && inventario.contadorB < 9)
	{
		inventario.anyadirSemilla.call(this);
		inventario.restarManzana(p);
		manzanas.setText('Manzanas:' + inventario.contadorM);
	}

	if (p == posicionTienda[3] && inventario.contadorM >= posicionTienda[3])
	{
		inventario.restarManzana(p);
		manzanas.setText('Manzanas:' + inventario.contadorM);
	}
}

function cargarTienda()
{
	posicionTienda[0] = 2;
	posicionTienda[1] = 3;
	posicionTienda[2] = 1;
	posicionTienda[3] = 9;
}