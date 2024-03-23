import * as personaje from './personaje.js'
import * as magiaVerde from './magiaVerde.js'
import * as magiaAzul from './magiaAzul.js'
import * as magiaMorada from './magiaMorada.js'
import * as enemigo from './enemigo.js'
import * as estadisticas from './estadisticas.js';
import * as enemigoEmbestida from './enemigoEmbestida.js';
import * as inventario from './inventario.js'
import * as datos from './load.js'
import * as NivelPacifico from './NivelPacifico.js'
var fuegoMalo;
var fuegos;
var teleport;
var rEsmeralda;
var elemental;
var xuclar;
var tiempodanyo2 = -1;
var hierba;
var corrupto;
var manzana;
var manzanas;
var manzanasCorruptas;
var manzanaCorrupta;
var purificado1 = parseInt(localStorage.getItem("arbol1"), 10);
var purificado2 = parseInt(localStorage.getItem("arbol2"), 10);
var purificado3 = parseInt(localStorage.getItem("arbol3"), 10);
var purificado4 = parseInt(localStorage.getItem("arbol4"), 10);
var purificado5 = parseInt(localStorage.getItem("arbol5"), 10);
var purificado6 = parseInt(localStorage.getItem("arbol6"), 10);
var almaBosque = 0;
var purificacion;
var pickUp;
var curacion;
var toroSonido;
var quemado;
export var completado = parseInt(localStorage.getItem("nivelArbol"), 10);
export var arbol1;
export var arbol2;
export var arbol3;
export var arbol4;
export var arbol5;
export var arbol6;
export var arbolMaloGordo;
var tiempodanyo = -1;
export var tpN = 0;
var KeyO;
export default class NivelPedro extends Phaser.Scene{
	constructor(){
		super({key: "NivelPedro"})	;
	}

	preload()
	{
		load.call(this);
	}
	create()
	{
		pickUp = this.sound.add('pickUp')
		curacion = this.sound.add('curacion');
		toroSonido = this.sound.add('toroSonido');

		KeyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

		personaje.crearPersonaje.call(this);
		magiaVerde.crearMagiaVerde.call(this);
		magiaAzul.crearMagiaAzul.call(this);
		magiaMorada.crearMagiaMorada.call(this);
		enemigoEmbestida.cargarEnemigo.call(this);
		toroSonido.play();
		arbolesCorruptos.call(this);
		personaje.ani.x = 915;
		personaje.ani.y = 1240;

		elemental = this.physics.add.group();

		manzanas = this.physics.add.group();

		manzanasCorruptas = this.physics.add.group();
		this.physics.add.overlap(personaje.ani, manzanasCorruptas, corromperManzanas, null, this)

		corrupto = this.add.sprite(800, 500, 'corrupto').setDepth(30);


		cargarCamara.call(this);

		fuegos = this.physics.add.group();

		this.anims.create({
			key: "quemar",
			frames: this.anims.generateFrameNumbers("quemado", {start: 0, end:4}),
			frameRate: 5,
		});

		this.anims.create({
			key:'prender',
			frames:this.anims.generateFrameNames('fuegoMalo',{start:0, end:6}),
			frameRate: 15,
			repeat: -1,
		});

			this.anims.create({
		key: "tp",
		frames: this.anims.generateFrameNumbers("portal", {start: 0, end:7}),
		repeat: -1,
		frameRate: 10,
		});

		cargarMapa.call(this);

		xuclar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
		this.physics.add.overlap(personaje.ani,manzanas, cogerManzana, null, this);

	}

	update()
	{
		tiempodanyo -=1;
		tiempodanyo2 -=1;
		//COMPLETAR NIVEL//
		alma.call(this);

		if(KeyO.isDown)
		{
			this.scene.start("gameOver")
		}	
		//PERSONAJE//
		magiaVerde.tiempoVerde.call(this);
		magiaVerde.absorcion.call(this);
		
		personaje.controlesPersonaje.call(this);
		personaje.tBonk.call(this);
		personaje.cBonk.call(this);
		personaje.explosionBomba.call(this);

		personaje.hit.call(this, 30);
		magiaMorada.contadorAmatista.call(this);
		//EMBESTIDA//
		enemigoEmbestida.traiz.call(this);
		enemigoEmbestida.stalkEnemigo.call(this);
		enemigoEmbestida.rush.call(this);
		enemigoEmbestida.noStalk.call(this);
		enemigoEmbestida.direccion.call(this);
		enemigoEmbestida.clearTint.call(this);
		enemigoEmbestida.lastToro.call(this);
		tiempodanyo --;

		//MECANICA ADRI//
		mecanicaAdri.call(this);
	}
}

function load()
{

		personaje.loadSprite.call(this);
		magiaVerde.loadSprite.call(this);
		magiaAzul.cargaSprites.call(this);
		enemigoEmbestida.loadEnemigo.call(this);

		this.load.image('prueba','assets/mapas/mapaPedro/prueba.png');
		this.load.image('Overworld','assets/mapas/mapaPedro/Overworld.png');
		this.load.image('objects','assets/mapas/mapaPedro/objects.png');
		this.load.image('hierba','assets/images/hierba.png');
		this.load.image('corrupto','assets/images/corrupto.png');
		this.load.spritesheet('fuegoMalo','assets/sprites/fuego.png',{frameWidth:16, frameHeight:16});
		this.load.spritesheet('quemado','assets/sprites/quemado.png',{frameWidth:83, frameHeight:108});
		this.load.spritesheet('arbol1','assets/sprites/arbol1.png',{frameWidth:56, frameHeight:73});
		this.load.spritesheet('arbol2','assets/sprites/arbol2.png',{frameWidth:56, frameHeight:73});
		this.load.spritesheet('arbol3','assets/sprites/arbol3.png',{frameWidth:56, frameHeight:73});
		this.load.spritesheet('arbol4','assets/sprites/arbol4.png',{frameWidth:56, frameHeight:73});
		this.load.spritesheet('arbol5','assets/sprites/arbol5.png',{frameWidth:56, frameHeight:73});
		this.load.spritesheet('arbol6','assets/sprites/arbol6.png',{frameWidth:56, frameHeight:73});
		this.load.spritesheet('puri','assets/sprites/puri.png',{frameWidth:56, frameHeight:73});
		this.load.tilemapTiledJSON('NivelPedro','assets/mapas/mapaPedro/mapa_Pedro.json');

		this.load.audio('pickUp', 'assets/audio/pickUp.mp3');
		this.load.audio('curacion', 'assets/audio/curacionAnimal.mp3');
		this.load.audio('toroSonido', 'assets/audio/toroSonido.mp3');

		this.physics.world.setBounds(0,0,1820,1295);
}

function arbolesCorruptos()
{ //LA CUENTA EN EL MAPA VA DE IZQUIERDA A DERECHA Y DE ABAJO ARRIBA

	this.anims.create({
		key: "purificacion",
		frames: this.anims.generateFrameNumbers("puri", {start: 0, end:12}),
		frameRate: 5,
	});


	this.anims.create({
		key: "corrupto1",
		frames: this.anims.generateFrameNumbers("arbol1", {start: 0, end:2}),
		repeat: -1,
		frameRate: 3,
	});

	if(!purificado1)
	{
		arbol1 = this.physics.add.sprite(728, 927, 'arbol1');
		arbol1.play('corrupto1');
		arbol1.setDepth(20);
	}

	this.anims.create({
		key: "corrupto2",
		frames: this.anims.generateFrameNumbers("arbol2", {start: 0, end:2}),
		repeat: -1,
		frameRate: 3,
	});

	if(!purificado2)
	{
		arbol2 = this.physics.add.sprite(1464, 1107.6, 'arbol2');
		arbol2.play('corrupto2');
		arbol2.setDepth(20);
	}

	this.anims.create({
		key: "corrupto3",
		frames: this.anims.generateFrameNumbers("arbol3", {start: 0, end:2}),
		repeat: -1,
		frameRate: 3,
	});

	if(!purificado3)
	{
		arbol3 = this.physics.add.sprite(1143.9, 609, 'arbol3');
		arbol3.play('corrupto3');
		arbol3.setDepth(20);
	}

	this.anims.create({
		key: "corrupto4",
		frames: this.anims.generateFrameNumbers("arbol4", {start: 0, end:2}),
		repeat: -1,
		frameRate: 3,
	});

	if(!purificado4)
	{
		arbol4 = this.physics.add.sprite(392, 368.5, 'arbol4');
		arbol4.play('corrupto4');
		arbol4.setDepth(20);
	}

	this.anims.create({
		key: "corrupto5",
		frames: this.anims.generateFrameNumbers("arbol5", {start: 0, end:2}),
		repeat: -1,
		frameRate: 3,
	});

	if(!purificado5)
	{
		arbol5 = this.physics.add.sprite(1352.3, 240.3, 'arbol5');
		arbol5.play('corrupto5');
		arbol5.setDepth(20);
	}

	this.anims.create({
		key: "corrupto6",
		frames: this.anims.generateFrameNumbers("arbol6", {start: 0, end:2}),
		repeat: -1,
		frameRate: 3,
	});

	if(!purificado6)
	{
		arbol6 = this.physics.add.sprite(535.3, 199, 'arbol6');
		arbol6.play('corrupto6');
		arbol6.setDepth(20);
	}

}

function cargarMapa()
{
		let NivelPedro = this.add.tilemap('NivelPedro');

		let objects = NivelPedro.addTilesetImage('objects');
		let Overworld = NivelPedro.addTilesetImage('Overworld');
		let prueba = NivelPedro.addTilesetImage('prueba');

		let Suelo = NivelPedro.createLayer("Suelo",[prueba,Overworld,objects], 0, 0).setDepth(0);
		let Suelomalo = NivelPedro.createLayer("Suelomalo",[prueba,Overworld,objects], 0, 0).setDepth(1);
		let Flores = NivelPedro.createLayer("Flores",[prueba,Overworld,objects], 0, 0).setDepth(2);
		let ArbolesEnfermos = NivelPedro.createLayer("ArbolesEnfermos",[prueba,Overworld,objects], 0, 0).setDepth(3);
		let Elemento = NivelPedro.getObjectLayer("Elemento");
		let ArbolesMalitos = NivelPedro.getObjectLayer("ArbolesMalitos");
		let ArbolPrueba = NivelPedro.getObjectLayer("ArbolPrueba");
		let Fuego = NivelPedro.getObjectLayer("Fuego");
		let SpawnToros = NivelPedro.getObjectLayer("SpawnToros");
		let SpawnEnemigo = NivelPedro.getObjectLayer("SpawnEnemigo");
		let Portal = NivelPedro.getObjectLayer("Portal");
		let Troncos = NivelPedro.createLayer("Troncos", [prueba,Overworld,objects], 0, 0).setDepth(5);
		let ArbolesDelimitar2 = NivelPedro.createLayer("ArbolesDelimitar2",[prueba,Overworld,objects], 0, 0).setDepth(6);
		let ArbolesDelimitar1 =NivelPedro.createLayer("ArbolesDelimitar1",[prueba,Overworld,objects], 0, 0).setDepth(7);
		let ArbolesDelimitar3 = NivelPedro.createLayer("ArbolesDelimitar3",[prueba,Overworld,objects], 0, 0).setDepth(8);
		let ArbolesIngame = NivelPedro.createLayer("ArbolesIngame",[prueba,Overworld,objects], 0, 0).setDepth(9);
		let ArbolesIngame2 = NivelPedro.createLayer("ArbolesIngame2",[prueba,Overworld,objects], 0, 0).setDepth(10);
		let Arbolitos = NivelPedro.createLayer("Arbolitos",[prueba,Overworld,objects], 0, 0).setDepth(11);
		

		////Colisiones con el mapa con personaje////
		this.physics.add.collider(personaje.ani,Arbolitos);
		this.physics.add.collider(personaje.ani,ArbolesIngame);
		this.physics.add.collider(personaje.ani,ArbolesIngame2);
		this.physics.add.collider(personaje.ani,ArbolesDelimitar3);
		this.physics.add.collider(personaje.ani,ArbolesDelimitar1);
		this.physics.add.collider(personaje.ani,ArbolesDelimitar2);
		this.physics.add.collider(personaje.ani,Troncos);
		this.physics.add.collider(personaje.ani,ArbolesEnfermos);
		this.physics.add.collider(enemigoEmbestida.toroList,ArbolesEnfermos);
		this.physics.add.collider(personaje.ani,Flores);
		this.physics.add.collider(personaje.ani,Suelomalo);
		this.physics.add.overlap(personaje.ani,elemental, absorberElementoVerde, null, this);
		this.physics.add.overlap(personaje.ani, enemigoEmbestida.manzanas, cogerManzana, null, this);

		////Colisiones con el mapa con enemigoEmbestida////
		this.physics.add.collider(enemigoEmbestida.toroList,Arbolitos);
		this.physics.add.collider(enemigoEmbestida.toroList,ArbolesIngame);
		this.physics.add.collider(enemigoEmbestida.toroList,ArbolesIngame2);
		this.physics.add.collider(enemigoEmbestida.toroList,ArbolesDelimitar3);
		this.physics.add.collider(enemigoEmbestida.toroList,ArbolesDelimitar1);
		this.physics.add.collider(enemigoEmbestida.toroList,ArbolesDelimitar2);
		this.physics.add.collider(enemigoEmbestida.toroList,Troncos);
		this.physics.add.collider(enemigoEmbestida.toroList,ArbolesEnfermos);
		this.physics.add.collider(enemigoEmbestida.toroList,Flores);
		this.physics.add.collider(enemigoEmbestida.toroList,Suelomalo);

		this.physics.add.overlap(enemigoEmbestida.toroList, personaje.hitboxDanyo, colisionVida);

		Arbolitos.setCollisionByProperty({collides:true});
		ArbolesIngame.setCollisionByProperty({collides:true});
		ArbolesIngame2.setCollisionByProperty({collides:true});
		ArbolesDelimitar3.setCollisionByProperty({collides:true});
		ArbolesDelimitar1.setCollisionByProperty({collides:true});
		ArbolesDelimitar2.setCollisionByProperty({collides:true});
		Troncos.setCollisionByProperty({collides:true});
		ArbolesEnfermos.setCollisionByProperty({collides:true});
		Flores.setCollisionByProperty({collides:true});
		Suelomalo.setCollisionByProperty({collides:true});

		this.physics.add.overlap(personaje.ani,fuegos, danyo, null, this);

		Fuego.objects.forEach(llama =>{
		fuegoMalo = fuegos.create(llama.x, llama.y, 'fuegoMalo');
		fuegoMalo.play('prender');
		fuegoMalo.setDepth(10);
		})

		Portal.objects.forEach(tp =>{
		teleport = this.physics.add.sprite(tp.x, tp.y, 'portal');
		teleport.play('tp');
		teleport.setDepth(10);
		})

		Elemento.objects.forEach(element =>{
		rEsmeralda = elemental.create(element.x, element.y, 'hierba');
		rEsmeralda.setScale(0.05, 0.05);
		})

		SpawnToros.objects.forEach(toros =>{
			enemigoEmbestida.ajustesEnemigo.call(this, toros.x, toros.y)
		})


		/*ArbolPrueba.objects.forEach(corrupt =>{
		arbolMaloGordo = this.physics.add.sprite(corrupt.x, corrupt.y, 'arbolMaloGordo');
		arbolMaloGordo.play('corrupto');
		arbolMaloGordo.setScale(1.8,1.8);
		arbolMaloGordo.setDepth(15);
		})*/

		this.physics.add.overlap(personaje.ani,teleport, pasarNivel, null, this);
		//Colision arrastre
		//this.physics.add.collider(personaje.ani, cajasMalas);
		//this.physics.add.collider(cajasMalas, colisiones)


}

function cargarCamara()
{
	this.cameras.main.setBounds(0, 0, 1600,1560);
	this.cameras.main.setZoom(2);     
	this.cameras.main.centerOn(0, 0);

}
function danyo()
{
	if(tiempodanyo2 < 0)
	{
		tiempodanyo2 = 50;
	}
	else if(tiempodanyo2 == 45)
	{
		quemado = this.add.sprite(personaje.ani.x, personaje.ani.y, 'quemado').setDepth(100);
		quemado.setScale(0.8,0.8);
		quemado.play('quemar');
		personaje.quemado.call(this);
		estadisticas.quitarVida.call(this);
	}
}

function pasarNivel()
{
	tpN = 1;
	this.scene.start("NivelPacifico");
}

export function cambiarTp()
{
	tpN = 0;
}

export function purificarA1()
{
	purificacion = this.physics.add.sprite(728, 927, 'puri');
	purificacion.play('purificacion');
	curacion.play();
	purificacion.setDepth(21);
	arbol1.destroy();
	purificado1 = 1;

	guardar.call(this);
}
export function purificarA2()
{
	purificacion = this.physics.add.sprite(1464, 1107.6, 'arbol2');
	purificacion.play('purificacion');
	curacion.play();
	purificacion.setDepth(21);
	arbol2.destroy();
	purificado2 = 1;

	guardar.call(this);
}
export function purificarA3()
{
	purificacion = this.physics.add.sprite(1143.9, 609, 'arbol3');
	purificacion.play('purificacion');
	curacion.play();
	purificacion.setDepth(21);
	arbol3.destroy();
	purificado3 = 1;

	guardar.call(this);
}
export function purificarA4()
{
	purificacion= this.physics.add.sprite(392, 368.5, 'arbol4');
	purificacion.play('purificacion');
	curacion.play();
	purificacion.setDepth(21);
	arbol4.destroy();
	purificado4 = 1;

	guardar.call(this);
}
export function purificarA5()
{
	purificacion = this.physics.add.sprite(1352.3, 240.3, 'arbol5');
	purificacion.play('purificacion');
	curacion.play();
	purificacion.setDepth(21);
	arbol5.destroy();
	purificado5 = 1;

	guardar.call(this);
}
export function purificarA6()
{
	purificacion = this.physics.add.sprite(535.3, 199, 'arbol6');
	purificacion.play('purificacion');
	curacion.play();
	purificacion.setDepth(21);
	arbol6.destroy();
	purificado6 = 1;

	guardar.call(this);
}

function alma()
{
	if(purificado1 && purificado2 && purificado3 && purificado4 && purificado5 && purificado6)
	{
		completado = 1;
		corrupto.destroy();
		guardar.call(this);
	}
}
function absorberElementoVerde(p,e)
{
	if (xuclar.isDown && estadisticas.gemas == 2)
	{
		magiaVerde.recargaElementalVerde.call(this);
		e.disableBody(true,true);
		e.destroy();
	}
}

export function generarManzana(toroX, toroY, tipo) 
{
	if (tipo == 1) 
	{
		manzana = manzanas.create(toroX, toroY, 'manzana');
		manzana.setDepth(5);
	}
	else
	{
		manzanaCorrupta = manzanasCorruptas.create(toroX, toroY, 'manzanaCorrupta');
		manzanaCorrupta.setDepth(5);
	}
}

function corromperManzanas(p, m)
{
	if (xuclar.isDown) 
	{
		m.destroy();
		inventario.borrarManzanas.call(this);
	}
	
}

function cogerManzana(p,m)
{
	if (xuclar.isDown)
	{
		m.disableBody(true,true);
		m.destroy();
		inventario.anyadirManzana.call(this);
		pickUp.play()
	}
}

function mecanicaAdri()
{
	magiaAzul.restaTiempo.call(this);
	magiaAzul.gestionEscudos.call(this);
}

function colisionVida(t,p)
{
	if(tiempodanyo < 0)
	{
		tiempodanyo = 40;
		personaje.hitted2.call(this, p.x, p.y);
		estadisticas.quitarVida.call(this);
	}
}
function guardar()
{
	console.log("manzana:" + inventario.contadorM);
	var urlllamada = '/php/guardarenbosque.php?energia_verde=' + magiaVerde.cargaElementalVerde + "&semilla_explosiva=" + inventario.contadorB + "&manzanas=" + inventario.contadorM + "&arbol1=" + purificado1 + "&usuario=" + NivelPacifico.usuarioActivo;


	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() 
	{

    	if(xhr.readyState == 4 && xhr.status == 200) 
    	{
        	console.log("Aquí llega")
        if(xhr.responseText == "Datos guardados")
        {
            console.log("Los datos se han guardado correctamente");
        }
        else if (xhr.responseText == "Error")
        {
            console.log("Error");
        }

    	}
    	else if (xhr.status !== 200) 
    	{
        	console.log('Algo ha fallado: ' + xhr.status);
    	}
	};
		xhr.open('GET', urlllamada);
		xhr.send();


}