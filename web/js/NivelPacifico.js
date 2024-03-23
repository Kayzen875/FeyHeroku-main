var setorigin = 0.5;
var cajascale = 0.8;
var cuadroscale = 0.3;
export var cajamala;//mirar
var colisiones;
var cajon;
var rEsmeralda;
var cajasMalas;
export var goblin;
export var usuarioActivo = localStorage.getItem("usuario");
var KeyO;
var KeyR; 
var KeyT;
var teclaV;
var creada = false;
var primeraCarga = false;
export var conver = 0;
var timerV = -1;
var contador;
var dirR;
var pruebaRebote; //pruebas
var xuclar;
var DIAGOLO; //Hacer los dialogos en un módulo separado. (Dialogo nivel pacifico, dialogo noseque...)
var muchoTexto = parseInt(localStorage.getItem("rana"), 10);
var cuadro;
var textocuadro;
var direccionCaja = 1;
var enredado = 0;
var planta;
var tenredado = -1;
var tTexto = -1;
var manzanas;
var manzana;
var manzanasCorruptas;
var manzanaCorrupta;
var portal;
var portales;
var tiempodanyo = -1;
var rana;
var prueba;
var tiendaprueba;
var Bloqueo;
var coliZarza;
var coliZarza1;
var coliZarza2;
var coliZarza3;
var noldor;
export var darEnergia = parseInt(localStorage.getItem("noldor"), 10);
var unCaliz;
var calices;
var pruebaX;
var zafiro;
var esmeralda;
var amatistaC;
var sonido;
var pickUp;
var croack;
export var quieroLlorar = 0;

import * as personaje from './personaje.js'
import * as magiaVerde from './magiaVerde.js'
import * as magiaAzul from './magiaAzul.js'
import * as magiaMorada from './magiaMorada.js'
import * as enemigo from './enemigo.js'
import * as nivelPrueba from './NivelPrueba.js'
import * as inventario from './inventario.js'
import * as NivelPedro from './NivelPedro.js'
import * as nivelAdri from './NivelAdri.js'
import NivelMarta, * as nivelMarta from './NivelMarta.js'
import * as estadisticas from './estadisticas.js';
import * as tienda from './tienda.js'
import * as game from './game.js'
import * as dialogosPacifico from './dialogosPacifico.js'
import * as datos from './load.js'
export default class NivelPacifico extends Phaser.Scene{
	constructor(){
		super({key: "NivelPacifico"})	;
	}

	preload()
	{
		load.call(this);
	}

	create()
	{
		//MUSICA//
		sonido = this.sound.add('fondo');
		pickUp = this.sound.add('pickUp');
		croack = this.sound.add('croack')
		if (muchoTexto == false) {sonido.play();}
		

		///////PERSONAJE////////////
		personaje.crearPersonaje.call(this);
		magiaVerde.crearMagiaVerde.call(this);
		magiaMorada.crearMagiaMorada.call(this);
		magiaAzul.crearMagiaAzul.call(this);

		personaje.ani.x = 600//parseInt(localStorage.getItem("posX"), 10);
		personaje.ani.y = 600//parseInt(localStorage.getItem("posY"), 10);
		personaje.ani.x = parseInt(localStorage.getItem("posX"), 10);
		personaje.ani.y=parseInt(localStorage.getItem("posY"), 10);

		//console.log(localStorage.getItem("vida"));
		//console.log(personaje.ani.x);
		//console.log(personaje.ani.y);

		if (NivelPedro.tpN)
		{
			personaje.ani.x = 495;
			personaje.ani.y = 40;
			NivelPedro.cambiarTp.call(this);
		}
		else if (nivelAdri.tpO)
		{
			personaje.ani.x = 50;
			personaje.ani.y = 460;
			nivelAdri.cambiarTp.call(this);
		}
		else if (nivelMarta.tpE)
		{
			personaje.ani.x = 970;
			personaje.ani.y = 410;
			nivelMarta.cambiarTp.call(this);
		}
		else if(tienda.tpT)
		{
			personaje.ani.x = 488;
			personaje.ani.y = 620;
			tienda.cambiarTp.call(this);
		}

		//////ENEMIGO////
		enemigo.cargarEnemigo.call(this);

		//cargarCaja.call(this);

		////TECLA PARA TRANSICIÓN///////
		KeyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

		//Pruebas Adri
		KeyR=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		KeyT=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

		//TECLA ABSROBER ELEMENTO////
		xuclar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

		//////Dialogos/////
		DIAGOLO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);

		///FISICAS////
		//this.physics.add.overlap(magiaVerde.verdeList, cajamala, raiz, null, this);
		//this.physics.add.overlap(enemigo.enemigoAzul, personaje.hitboxDanyo, colisionVida);
		//this.physics.add.overlap(enemigo.enemigoAzul, personaje.hitboxBonkList, enemigoColisionVida);
		//this.physics.add.overlap(enemigo.enemigoAzul, magiaAzul.shield_group);


		//CAMARA//
		cargarCamara.call(this);

		//GRUPOS//

		cajasMalas = this.physics.add.group();
		manzanas = this.physics.add.group();
		manzanasCorruptas = this.physics.add.group();
		this.physics.add.overlap(personaje.ani, manzanasCorruptas, corromperManzanas, null, this)
		portales = this.physics.add.group();
		calices = this.physics.add.group();

		coliZarza = this.physics.add.staticGroup();
		/////PORTALES/////
		this.anims.create({
			key: "tp",
			frames: this.anims.generateFrameNumbers("portal", {start: 0, end:7}),
			repeat: -1,
			frameRate: 10,
		});

		//Animaciones//
		this.anims.create({
			key: "almaA",
			frames: this.anims.generateFrameNumbers("almaAzul", {start: 0, end:3}),
			repeat: -1,
			frameRate: 3,
		});

		this.anims.create({
			key: "almaV",
			frames: this.anims.generateFrameNumbers("almaVerde", {start: 0, end:3}),
			repeat: -1,
			frameRate: 3,
		});

		this.anims.create({
			key: "almaM",
			frames: this.anims.generateFrameNumbers("almaMorada", {start: 0, end:3}),
			repeat: -1,
			frameRate: 3,
		});

		this.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers("Noldor", {start: 0, end:1}),
			repeat: -1,
			frameRate: 0.5,
		})

		this.anims.create({
			key: "teclaUveAnim",
			frames: this.anims.generateFrameNumbers("teclaUve", {start: 0, end:1}),
			repeat: -1,
			frameRate: 3,
		})

		///MAPEADO///
		cargarMapa.call(this);
		gemaCaliz.call(this);
		
		if (nivelMarta.almaPuesta)
		{
			cargarAlma.call(this);
		}
		
		//Map events
		//by index
		colisiones.setTileIndexCallback([2255], ()=>{
		
		this.scene.start("NivelPrueba"); //Si haces la función fuera de la clase tienes que poner "this." delante. Si la haces dentro de la clase no hace falta
		//cajamala = this.physics.add.sprite(personaje.ani.x, personaje.ani.y,'cajamala');
		})
	}
	update()
	{	
		tiempodanyo -=1;
		tenredado -=1;
		magiaVerde.tiempoVerde.call(this);
		magiaMorada.contadorAmatista.call(this);
		personaje.controlesPersonaje.call(this);
		personaje.tBonk.call(this);
		personaje.cBonk.call(this);
		personaje.explosionBomba.call(this);
		//enemigo.stalkEnemigo.call(this);
		//console.log(personaje.ani.x + "   " + personaje.ani.y);

		if(darEnergia == true && muchoTexto == true)
		{
			primerguardado.call(this);

			Bloqueo.destroy();
			coliZarza1.destroy();
			coliZarza2.destroy();
			coliZarza3.destroy();
		}

		if (KeyO.isDown)
		{
			//pasarEscena.call(this);
		}

		//moverCaja.call(this);

		//mecanicaAdri.call(this);

		magiaVerde.absorcion.call(this);
		magiaAzul.absorcion.call(this);
		magiaMorada.absorcion.call(this);

		personaje.hit.call(this);

		//enemigo.spawner.call(this);

		//enemigo.enemyHit.call(this);

		//enemigo.noStalk.call(this);

		/*if (tenredado == 0)
		{
			enredado = 0;
			planta.destroy();
		}*/

		if (tTexto > 0 && tTexto < -1)
		{
			tTexto--;
		}
		else if (tTexto == 0)
		{
			cuadro.destroy();
			cuadrotexto.destroy();
		}

		funcionesEscudo.call(this);

		if (timerV > 0 && darEnergia == true) 
		{
			timerV--;
		}
		else if(timerV == 0)
		{
			creada = false;
			teclaV.destroy();
			timerV = -1;
		}
		
		//cajasMalas.setVelocityX(0)
		//cajasMalas.setVelocityY(0)

		if (nivelMarta.completado && !nivelMarta.almaPuesta) 
		{	
			nivelMarta.cogerAlma.call(this);
		}

		cargaDatos.call(this);

		if(dialogosPacifico.primeraConversa == 1 && conver == 1)
		{
			var urlllamada = '/php/guardadoNoldor.php?usuario=' + usuarioActivo;


			var xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() 
			{

		    	if (xhr.readyState == 4 && xhr.status == 200) 
		    	{
		        if (xhr.responseText == "Datos guardados")
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
		        	//console.log('Algo ha fallado: ' + xhr.status);
		    	}
			};
				xhr.open('GET', urlllamada);
				xhr.send();

				conver = 2;
				darEnergia = true;
		}
	}
}

function desactivarDialogo()
{

}

function primerguardado()
{
	if(!primeraCarga)
	{
		var urlllamada = './php/primerguardado.php?noldor=' + darEnergia + "&rana=" + muchoTexto + "&usuario=" + usuarioActivo;


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
	        	//console.log('Algo ha fallado: ' + xhr.status);
	    	}
		};
			xhr.open('GET', urlllamada);
			xhr.send();

			primeraCarga = true;
	}

}
function pasarEscena()
{
		this.scene.start("gameOver");
}

function load()
{
		this.load.image('cajamala','assets/images/badbox.png');
		this.load.image('hierba','assets/images/hierba.png');
		this.load.image('burbuja', 'assets/images/cuadrotexto.png');
		this.load.image('planta', 'assets/images/planta.png');
		this.load.image('hitbox', 'assets/hitbox/hitboxPrueba.png');
		this.load.image('manzana', 'assets/images/Manzana.png');
		this.load.image('manzanaCorrupta', 'assets/images/ManzanaCorrupta.png');
		this.load.image('ranita', 'assets/images/raana.png');
		this.load.image('teclaV', 'assets/images/teclaV.png');
		this.load.spritesheet('Noldor', 'assets/sprites/noldor_spritesheet.png',{frameWidth:115, frameHeight:130})
		this.load.image('hitboxZarza','assets/hitbox/hitboxZarza.png');
		this.load.image('hitboxZarzaT','assets/hitbox/hitboxZarzaT.png');
		this.load.image('hitboxZarzaL','assets/hitbox/hitboxZarzaL.png');
		this.load.spritesheet('portal','assets/sprites/portal.png',{frameWidth:21, frameHeight:16});
		this.load.image('caliz', 'assets/images/caliz.png');
		this.load.spritesheet('almaAzul', 'assets/sprites/almaAzul_spritesheet.png',{frameWidth:20, frameHeight:10});
        this.load.spritesheet('almaVerde', 'assets/sprites/almaVerde_spritesheet.png',{frameWidth:20, frameHeight:10});
        this.load.spritesheet('almaMorada', 'assets/sprites/almaMorada_spritesheet.png',{frameWidth:20, frameHeight:10});
		this.load.spritesheet('teclaUve','assets/sprites/Keys/V-Key.png',{frameWidth:32, frameHeight:32});

        this.load.audio('fondo', 'assets/audio/Kakariko_is_Saved.mp3');
        this.load.audio('pickUp', 'assets/audio/pickUp.mp3');
        this.load.audio('croack', 'assets/audio/croack.mp3');

		personaje.loadSprite.call(this);
		magiaVerde.loadSprite.call(this);
		magiaMorada.loadSprite.call(this);
		magiaAzul.cargaSprites.call(this);
		enemigo.loadEnemigo.call(this);

		this.load.image('prueba','assets/mapas/mapaPacifico/prueba.png');
		this.load.image('Overworld','assets/mapas/mapaPacifico/Overworld.png');
		this.load.image('Manzana','assets/mapas/mapaPacifico/Manzana.png');
		this.load.image('arboles','assets/mapas/mapaPacifico/arboles.png');
		this.load.image('objects','assets/mapas/mapaPacifico/objects.png');
		this.load.tilemapTiledJSON('mapaPacifico','assets/mapas/mapaPacifico/mapaPacifico.json')

		this.load.image('tiendaprueba','assets/images/tienda.png');
}

function cargarCamara()
{
		this.cameras.main.setBounds(0, 0, 1024, 1160);
		this.cameras.main.setZoom(2);     
		this.cameras.main.centerOn(0, 0);
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
		let Agua = mapaPacifico.createLayer("Agua",[prueba], 0, 0).setDepth(1);
		let Elevacion = mapaPacifico.createLayer("Elevacion",[prueba], 0, 0).setDepth(2);
		let Elevacion2 = mapaPacifico.createLayer("Elevacion2",[prueba], 0, 0).setDepth(3);
		let Veneno = mapaPacifico.createLayer("Veneno",[prueba,objects], 0, 0).setDepth(4);
		let Arboles = mapaPacifico.createLayer("Arboles",[prueba,arboles,objects], 0, 0).setDepth(7);
		let Deco = mapaPacifico.createLayer("Deco",[prueba,Manzana,Overworld,arboles,objects], 0, 0).setDepth(5);
		let ArbolesBajos = mapaPacifico.createLayer("ArbolesBajos", [prueba,arboles], 0, 0).setDepth(5);
		let Stop = mapaPacifico.createLayer("Stop",[prueba], 0, 0).setDepth(6);
		let Arboles2 = mapaPacifico.createLayer("Arboles2",[prueba], 0, 0).setDepth(8);
		let Arboles3 = mapaPacifico.createLayer("Arboles3",[prueba], 0, 0).setDepth(9);
		let Spawner = mapaPacifico.getObjectLayer("Spawner");
		let ElementosEsmeralda = mapaPacifico.getObjectLayer("ElementosEsmeralda");
		let Portales = mapaPacifico.getObjectLayer("Portales");
		let Caliz = mapaPacifico.getObjectLayer("Caliz");
		let CapaNPC = mapaPacifico.getObjectLayer("CapaNPC");
		let Noldor = mapaPacifico.getObjectLayer("Noldor");
		Bloqueo = mapaPacifico.createLayer("Bloqueo",[prueba], 0, 0).setDepth(5);
		colisiones =  mapaPacifico.createLayer("Colisiones",[Overworld], 0, 0).setDepth(-20);

		this.physics.world.setBounds(0,0,1024,1024);

		////Colisiones con el mapa////
		this.physics.add.collider(personaje.ani,colisiones);
		this.physics.add.collider(magiaVerde.verdeList, colisiones, balaMuro, null, this);
		this.physics.add.overlap(personaje.ani,manzanas, recogerManzana, null, this);
		//this.physics.add.collider(enemigo.enemigoAzul,colisiones);

		colisiones.setCollisionByProperty({collides:true});

		this.physics.add.overlap(personaje.ani,portales, teleport, null, this);
		//Colision arrastre
		//this.physics.add.collider(personaje.ani, cajasMalas);
		//this.physics.add.collider(cajasMalas, colisiones)

		//Portales
			Portales.objects.forEach(tp =>{
			portal = portales.create(tp.x, tp.y, 'portal');
			portal.play('tp');
			portal.setDepth(5);
			portal.numero=tp.properties[1].value; //Aquí creas una nueva propiedad del grupo, que tiene el valor del objeto de tiled que hemos puesto en el atributo
		})

		// Calices
		Caliz.objects.forEach(cali =>{
			unCaliz = calices.create(cali.x, cali.y, 'caliz')
			unCaliz.setDepth(5);
		})

		//Spawners
		Spawner.objects.forEach(spawn =>{
			if (Phaser.Math.Between(0,1) == 1) 
			{
				manzana = manzanas.create(spawn.x, spawn.y, 'manzana');
			}
		})

		//NPC
		CapaNPC.objects.forEach(NPC =>{
		rana = this.physics.add.sprite(NPC.x, NPC.y - 8, 'ranita');
		rana.setScale(0.15, 0.15);
		rana.setDepth(5);
		goblin = this.physics.add.sprite(NPC.x, NPC.y, 'hitbox');
		goblin.setSize(40,10);
		goblin.setOffset(goblin.width / 4, goblin.height / 1.5);

		})

		//Noldor
		Noldor.objects.forEach(arbol =>{
		noldor = this.physics.add.sprite(arbol.x, arbol.y - 48, 'Noldor');
		noldor.setDepth(4)
		noldor.play('idle');
		})

		//Maketumba

		coliZarza1 = coliZarza.create(70, 460, 'hitboxZarza');
		coliZarza2 = coliZarza.create(515, 40, 'hitboxZarzaT');

		coliZarza3 = coliZarza.create(924, 360, 'hitboxZarzaL');

		this.physics.add.collider(coliZarza,personaje.ani);

		//Interaccion dialogo
		this.physics.add.overlap(personaje.hitboxInteractuar, goblin, dialogo, null, this);
		this.physics.add.overlap(personaje.hitboxInteractuar, noldor, noldorTalk, null, this);
}

function cargarCaja()
{
	cajamala = this.physics.add.sprite(650,280,'cajamala');

	cajamala.setOrigin(0.5,0.5);
	cajamala.setScale(0.1, 0.1);
	cajamala.setDepth(6);
}

function moverCaja()
{
	if (!enredado)
	{
		if (direccionCaja == 1)
		{
			cajamala.setVelocityY(50);
			//cajamala.y +=1;
			if(cajamala.y >= 580)
			{
				direccionCaja = 0;
				cajamala.setVelocityY(0);
			}
		}
		else if (direccionCaja == 0)
		{
			cajamala.setVelocityY(-50);
			//cajamala.y -=1;
			if (cajamala.y <= 280)
			{
				direccionCaja = 1;
				cajamala.setVelocityY(0);
			}
		}
	}
	else
	{
		cajamala.setVelocityY(0);
	}
}
/*
function mecanicaAdri()
{
	if(KeyT.isDown)
	{
		pruebaRebote = this.physics.add.sprite(enemigo.enemigoAzul.x, enemigo.enemigoAzul.y, 'magiaVerde')
		dirR= new Phaser.Math.Vector2(personaje.ani.x - pruebaRebote.x, personaje.ani.y - pruebaRebote.y);
		dirR.normalize();
		pruebaRebote.direccion = dirR
		pruebaRebote.velocidad = 50;

		pruebaRebote.setVelocityX(pruebaRebote.velocidad * pruebaRebote.direccion.x);
		pruebaRebote.setVelocityY(pruebaRebote.velocidad * pruebaRebote.direccion.y);
	}
}*/

function raiz(c,v)
{
	if (!enredado)
	{
		planta = this.physics.add.sprite(cajamala.x,cajamala.y,'planta');
		planta.setDepth(7);
		planta.setScale(0.05,0.05);
		enredado= 1;
		tenredado = 100;
		v.disableBody(true,true);
		magiaVerde.verdeList.remove(v);
		v.destroy();
	}
}

function balaMuro(v)
{
	v.disableBody(true,true);
	magiaVerde.verdeList.remove(v);
	v.destroy();
}

function colisionVida()
{
	if(tiempodanyo < 0)
	{
		tiempodanyo = 40;
		personaje.hitted.call(this);
		estadisticas.quitarVida.call(this);
	}
}

function enemigoColisionVida(v,c)
{
	enemigo.enemyHitted.call(this);
	c.disableBody(true,true);
	magiaVerde.verdeList.remove(c);
	c.destroy();
}

export function generaManzana(tipo) 
{
	if (tipo == 1) 
	{
		manzana = manzanas.create(enemigo.enemigoAzul.x, enemigo.enemigoAzul.y, 'manzana');
	}
	else
	{
		manzanaCorrupta = manzanasCorruptas.create(enemigo.enemigoAzul.x, enemigo.enemigoAzul.y, 'manzanaCorrupta');
		manzanaCorrupta.setDepth(5);
	}
}

function recogerManzana(p,m)
{
	if (xuclar.isDown && muchoTexto)
	{
		m.disableBody(true,true);
		m.destroy();
		inventario.anyadirManzana.call(this);
		pickUp.play()
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

function dialogo(p, c)
{
	if (creada == false && darEnergia == true) 
	{
		teclaV = this.add.sprite(rana.x, rana.y - 31, 'teclaUve');
		teclaV.setScale(0.5,0.5);
		teclaV.setDepth(15);
		teclaV.play('teclaUveAnim');
		creada = true;
	}
	else if (creada == true) 
	{
		timerV = 10;
	}

	if (DIAGOLO.isDown && darEnergia == true)
	{
		if(muchoTexto == false)
		{
			muchoTexto = true;
		}	

		////CUADRO DE DIALOGO////
		/*cuadro = this.add.sprite(goblin.x, goblin.y - 50, 'burbuja').setDepth(19);
		cuadro.setScale(cuadroscale, cuadroscale);
		textocuadro = this.add.text(cuadro.x, cuadro.y, 'Probando 1 2', {fontsize:'32px', fill:'#000'}).setDepth(20);
		muchoTexto = true;
		tTexto = 200;*/

		///PRUEBA DE TIENDA EN ESCENA///
		croack.play();
		this.scene.start("tienda");

		///PRUEBA DE TIENDA EN SPRITE///

		//tiendaprueba = this.add.sprite(goblin.x, goblin.y - 50, 'tiendaprueba').setDepth(50);
		//tiendaprueba.setScale(0.5,0.5);

	}
	else
	{
		//Aqui debe decir que deberias hablar con noldor primero
	}
}

function noldorTalk()
{
	if (DIAGOLO.isDown) 
	{
		if (darEnergia == false) 
		{
			conver = 1;
			this.scene.wake("dialogosPacifico")
		}

		if (NivelPedro.completado == true && nivelAdri.completado == true && nivelMarta.completado == true) 
		{
			console.log("Has purificado el bosque de Arwen!")
		}
	}
}

function funcionesEscudo()
{
	magiaAzul.restaTiempo.call(this);
	magiaAzul.gestionEscudos.call(this);
}

function rebote()
{
	pruebaRebote.direccion = - dirR
}

function teleport(p, t)
{
	if (t.numero == 1)
	{
		this.scene.start("NivelPedro");
	}
	else if (t.numero == 2)
	{
		this.scene.start("NivelAdri");
	}
	else if (t.numero == 3)
	{
		this.scene.start("NivelMarta");
	}
}

function gemaCaliz()
{
	if (nivelAdri.completado) 
	{
		zafiro = this.add.sprite(calices.getChildren()[2].x, calices.getChildren()[2].y-12, "zafiro")
		zafiro.play('almaA');
		zafiro.setDepth(3);
	}
	if(NivelPedro.completado)
	{
		esmeralda = this.add.sprite(calices.getChildren()[1].x, calices.getChildren()[1].y-12, "esmeralda")
		esmeralda.play('almaV')
		esmeralda.setDepth(3);		
	}
	if (nivelMarta.completado) 
	{	
		nivelMarta.crearAlma.call(this);

		if (!nivelMarta.almaPuesta && nivelMarta.almaCogida)
		{
			this.physics.add.overlap(personaje.ani, calices.getChildren()[0], ponerAlma, null, this);
		}
	}
}

function ponerAlma()
{
	if (Phaser.Input.Keyboard.JustDown(DIAGOLO) && !nivelMarta.almaPuesta && nivelMarta.animalSalvado1 && nivelMarta.animalSalvado2 && nivelMarta.animalSalvado3 && nivelMarta.animalSalvado4)
	{
		nivelMarta.ponerAlma.call(this);
		cargarAlma.call(this);
		nivelMarta.borrarAlma.call(this);

	}
}

function cargarAlma()
{
	amatistaC = this.add.sprite(calices.getChildren()[0].x, calices.getChildren()[0].y-12, "almaMorada")
	amatistaC.play('almaM')
	amatistaC.setDepth(3);
}
/*export function cogerAlma()
{   
    if (almaCogida)
    {
        amatista.x = personaje.ani.x;
        amatista.y = personaje.ani.y - 25;
    }
}

export function crearAlma()
{
    amatista = this.physics.add.sprite(lobo.furrito.x, lobo.furrito.y, "almaMorada");
    amatista.play('almaM');
    amatista.setDepth(8);
}*/

function cargaDatos()
{
	if(darEnergia) 
	{
		this.scene.wake("estadisticas")
	}
	if(muchoTexto)
	{
		this.scene.wake("inventario")
	}
}