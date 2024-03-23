var teleport;
var secretTeleport;
var KeyO;
var xuclar;
var elemental;
var rZafiro;
var manzana;
var manzanas;
var caja;
var cajon;
var tiempodanyo = -1;
var nColis = 0;
var c;
var Colisiones;
var colisZarza;
var colisZarza1;
var colisZarza2;
var colisZarza3;
var colisionesZarza1;
var colisionesZarza2;
var colisionesZarza3;
var hitBoxPuzle1;
var hitBoxPuzle2;
var zarzaDestroy1 = parseInt(localStorage.getItem("lago1"), 10);
var zarzaDestroy2 = parseInt(localStorage.getItem("lago2"), 10);
var zarzaDestroy3 = parseInt(localStorage.getItem("lago3"), 10);
var progreso = parseInt(localStorage.getItem("lago4"), 10);
var row = false;
var cargado = false;
var diana;
var wisps;
var alma;
var akuma;
var enemigos;
var wisp;
var ele;
var i;
var pickUp;
var sonidoRemolino;
var mision = false;
var guardarX;
var guardarY;
export var tpO = 0;
export var completado = parseInt(localStorage.getItem("nivelLago"), 10);

import * as personaje from './personaje.js'
import * as magiaVerde from './magiaVerde.js'
import * as magiaAzul from './magiaAzul.js'
import * as magiaMorada from './magiaMorada.js'
import * as enemigoAzul from './enemigo.js'
import * as pulpo from './pulpo.js'
import * as inventario from './inventario.js'
import * as estadisticas from './estadisticas.js';
import * as game from './game.js'
import * as datos from './load.js'
import * as nivelPacifico from './NivelPacifico.js'

export default class NivelAdri extends Phaser.Scene{
	constructor(){
		super({key: "NivelAdri"});
	}
  
	preload()
	{
		load.call(this);
		personaje.loadSprite.call(this);
		pulpo.loadEnemigo.call(this);
		enemigoAzul.loadEnemigo.call(this);
		magiaAzul.cargaSprites.call(this);
	}
	create()
	{
		pickUp = this.sound.add('pickUp')
		sonidoRemolino = this.sound.add('sonidoRemolino');

		personaje.crearPersonaje.call(this);
		personaje.ani.x = 2000;
		personaje.ani.y = 800;
		personaje.ani.setDepth(9);	

		magiaAzul.crearMagiaAzul.call(this);
		magiaVerde.crearMagiaVerde.call(this);
		magiaMorada.crearMagiaMorada.call(this);

		pulpo.cargarEnemigo.call(this);
		enemigoAzul.cargarEnemigo.call(this);

		elemental = this.physics.add.group();
		colisZarza = this.physics.add.staticGroup();
		manzanas = this.physics.add.group();

		animaciones.call(this);

		cargarMapa.call(this);

		this.physics.add.overlap(pulpo.lanzaRocas, magiaAzul.grupoEscudos, colisionador, null, this);
		this.physics.add.overlap(pulpo.lanzaRocas, personaje.hitboxDanyo, quitaVida, null ,this);
		this.physics.add.overlap(enemigoAzul.grupoEnemigo, personaje.hitboxDanyo, golpeEnemigo, null ,this);
		this.physics.add.collider(enemigoAzul.grupoEnemigo, Colisiones);

		KeyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
		xuclar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

		Colisiones.setTileIndexCallback([2154], ()=>{
		
		if(cargado == false)
		{
			cargado = true;
			guardarX = alma.x;
			guardarY = alma.y;
		}
		
		})

		this.anims.create({
			key: "almaA",
			frames: this.anims.generateFrameNumbers("almaAzul", {start: 0, end:3}),
			repeat: -1,
			frameRate: 3,
		});
	}
	update()
	{
		tiempodanyo--;

		personaje.controlesPersonaje.call(this);
		/*if(KeyO.isDown)
		{
			completado = true;
		}*/	
		personaje.tBonk.call(this);
		personaje.cBonk.call(this);
		personaje.explosionBomba.call(this);
		
		pulpo.stalkEnemigo.call(this);
		magiaAzul.absorcion.call(this);
		magiaAzul.restaTiempo.call(this);
		magiaAzul.gestionEscudos.call(this);
		magiaMorada.contadorAmatista.call(this);
		magiaVerde.tiempoVerde.call(this);

		enemigoAzul.stalkEnemigo.call(this);
		enemigoAzul.ultraStalk.call(this);
		enemigoAzul.enemyHit.call(this);

		pulpo.moverRocas.call(this);
		pulpo.respawnPulpo.call(this);
		personaje.hit.call(this, 20);

		pulpo.gestionMirada.call(this);

		spawnElemento.call(this);

		crearEnemigos.call(this);

		cargarAlma.call(this);
	}
}

function load()
{
	this.load.image('prueba','assets/mapas/mapaPacifico/prueba.png');
	this.load.image('objects','assets/mapas/mapaPacifico/objects.png');
	this.load.image('remolino','assets/sprites/remolino.png');
	this.load.image('cajaPuzle','assets/images/badbox.png');
	this.load.image('hitboxPrueba','assets/hitbox/hitboxPrueba.png');
	this.load.image('hitboxZarza','assets/hitbox/hitboxZarza.png');
	this.load.tilemapTiledJSON('mapaAdri','assets/mapas/mapaAdri/mapaAdriDefinitivo.json');
	this.load.image('esfera', 'assets/images/esfera.png')
	this.load.image('willWisp', 'assets/images/wills.png')
	this.load.image('diana', 'assets/images/diana.png')
	this.load.image('wisp', 'assets/images/wisp.png')
	this.load.spritesheet('portal','assets/sprites/portal.png',{frameWidth:21, frameHeight:16});
	this.load.spritesheet('almaAzul', 'assets/sprites/almaAzul_spritesheet.png',{frameWidth:20, frameHeight:10});

	this.load.audio('pickUp', 'assets/audio/pickUp.mp3');
	this.load.audio('sonidoRemolino', 'assets/audio/aguaRemolinos.mp3');
}

function cargarCamara()
{
	this.cameras.main.setBounds(0, 0, 2050,1280);
	this.cameras.main.setZoom(2);     
	this.cameras.main.centerOn(0, 0);
}

function cargarMapa()
{
	let mapaAdri = this.add.tilemap('mapaAdri');

	let prueba = mapaAdri.addTilesetImage('prueba');
	let objects = mapaAdri.addTilesetImage('objects');

	let Suelo = mapaAdri.createLayer("Suelo",[prueba], 0, 0).setDepth(0);
	let Arena = mapaAdri.createLayer("Arena",[prueba], 0, 0).setDepth(1);
	let Agua = mapaAdri.createLayer("Agua",[prueba], 0, 0).setDepth(2);
	let Hielo = mapaAdri.createLayer("Hielo",[prueba], 0, 0).setDepth(3);
	let Elevacion_1 = mapaAdri.createLayer("Elevacion_1",[prueba], 0, 0).setDepth(4);
	let Elevacion = mapaAdri.createLayer("Elevacion",[prueba], 0, 0).setDepth(5);
	let Elevacion2 = mapaAdri.createLayer("Elevacion2",[prueba], 0, 0).setDepth(6);
	let Charcos = mapaAdri.createLayer("Charcos",[prueba], 0, 0).setDepth(7);
	colisionesZarza1 = mapaAdri.createLayer("colisionesZarza1",[prueba], 0, 0).setDepth(6);
	colisionesZarza2 = mapaAdri.createLayer("colisionesZarza2",[prueba], 0, 0).setDepth(6);
	colisionesZarza3 = mapaAdri.createLayer("colisionesZarza3",[prueba], 0, 0).setDepth(6);
	let Deco = mapaAdri.createLayer("Deco",[prueba], 0, 0).setDepth(8);
	let ArbolesBajos = mapaAdri.createLayer("ArbolesBajos", [prueba], 0, 0).setDepth(5);
	let Arboles = mapaAdri.createLayer("Arboles",[prueba], 0, 0).setDepth(9);
	let Arboles2 = mapaAdri.createLayer("Arboles2",[prueba], 0, 0).setDepth(10);
	let Arboles3 = mapaAdri.createLayer("Arboles3",[prueba], 0, 0).setDepth(11);
	Colisiones = mapaAdri.createLayer("Colisiones",[prueba], 0, 0).setDepth(-1);
	let ColisionesRoca = mapaAdri.createLayer("ColisionesRoca",[prueba], 0, 0).setDepth(-1);
	let Eventos = mapaAdri.createLayer("Eventos",[prueba, objects], 0, 0).setDepth(4);
	let Teleportadores = mapaAdri.getObjectLayer("Teleportadores");
	let SecretTP = mapaAdri.getObjectLayer("SecretTP");
	let Puzle = mapaAdri.getObjectLayer("Puzle");
	let Pulpos = mapaAdri.getObjectLayer("Pulpos");
	enemigos = mapaAdri.getObjectLayer("enemigos");
	let Final = mapaAdri.getObjectLayer("Final");
	let Diana = mapaAdri.getObjectLayer("Diana");
	let wills = mapaAdri.getObjectLayer("wills");
	let Colisio = mapaAdri.getObjectLayer("Colisio");
	let Elemento = mapaAdri.getObjectLayer("Elemento");
	let PuzleResuelto = mapaAdri.getObjectLayer("PuzleResuelto");
	let Spawner = mapaAdri.getObjectLayer("manzanas");

	cargarCamara.call(this);
	this.physics.world.setBounds(0,0,2050,1280);

	////Colisiones Mapa////
	this.physics.add.collider(personaje.ani,Colisiones);
	Colisiones.setCollisionByProperty({collides:true});
	ColisionesRoca.setCollisionByProperty({collides:true});

	Teleportadores.objects.forEach(tp =>{
	teleport = this.physics.add.sprite(tp.x, tp.y, 'portal');
	teleport.play('tp');
	teleport.setDepth(10);
	})

	SecretTP.objects.forEach(tp =>{
	secretTeleport = this.physics.add.sprite(tp.x, tp.y, 'portal');
	secretTeleport.play('tp');
	secretTeleport.setDepth(10);
	})

	Spawner.objects.forEach(spawn =>{
		if (Phaser.Math.Between(0,2) == 1) 
		{
			manzana = manzanas.create(spawn.x, spawn.y, 'manzana');
		}
	})

	Pulpos.objects.forEach(pul =>{
		pulpo.creacionEnemigo.call(this, pul.x, pul.y);
	})

	Final.objects.forEach(fi =>{
		if (mision == false) 
		{
			alma = this.add.sprite(fi.x, fi.y-12, "zafiro")
			alma.play('almaA');
			alma.setDepth(30);
		}
		
	})

	Puzle.objects.forEach(puz =>{
		if (row == false) 
		{
			caja = this.physics.add.sprite(puz.x, puz.y, 'esfera');
			caja.setScale(0.03, 0.03);
			caja.setDepth(5);
			this.physics.add.collider(personaje.ani, caja, arena, null, this);
			this.physics.add.collider(caja,Colisiones);
			this.physics.add.collider(caja,ColisionesRoca);
			row = true;
		}
		else
		{
			cajon = this.physics.add.sprite(puz.x, puz.y, 'esfera');
			cajon.setScale(0.03, 0.03);
			cajon.setDepth(5);
			this.physics.add.collider(personaje.ani, cajon);
			this.physics.add.collider(cajon,Colisiones);
			this.physics.add.collider(cajon,ColisionesRoca);
			row = false;
		}
		
	})

	PuzleResuelto.objects.forEach(res =>{
		if (row == false)
		{
			hitBoxPuzle1 = this.physics.add.sprite(res.x, res.y, 'hitboxPrueba');
			hitBoxPuzle1.setScale(0.5,0.5);
			row = true;
		}
		else
		{
			hitBoxPuzle2 = this.physics.add.sprite(res.x, res.y, 'hitboxPrueba');
			hitBoxPuzle2.setScale(0.5,0.5);
		}
	})

	Diana.objects.forEach(dia =>{
		diana = this.physics.add.sprite(dia.x, dia.y, 'diana');
		diana.setScale(1.2, 1.2)
		diana.setDepth(20)
		})

	wills.objects.forEach(o =>{
		wisps = this.add.sprite(o.x, o.y-10, 'willWisp')
		wisps.setScale(0.05, 0.05)
		wisps.setDepth(22)
	})

	Colisio.objects.forEach(coli =>{
		nColis++;
		if (nColis == 1) 
		{
			colisZarza1 = colisZarza.create(coli.x, coli.y, 'hitboxZarza');
			this.physics.add.collider(colisZarza1,personaje.ani);
		}
		else if (nColis == 2) 
		{
			colisZarza2 = colisZarza.create(coli.x, coli.y, 'hitboxZarza');
			this.physics.add.collider(colisZarza2,personaje.ani);
		}
		else if (nColis== 3) 
		{
			colisZarza3 = colisZarza.create(coli.x, coli.y, 'hitboxZarza');
			this.physics.add.collider(colisZarza3,personaje.ani);
		}
	})

	Elemento.objects.forEach(rem =>{
	rZafiro = elemental.create(rem.x, rem.y, 'remolino');
	rZafiro.setDepth(7);
	rZafiro.timer = -1;
	})

	this.physics.add.overlap(personaje.ani,teleport, pasarNivel, null, this);
	this.physics.add.overlap(personaje.ani,secretTeleport, pasarNivelSecreto, null, this);
	this.physics.add.overlap(personaje.hitboxInteractuar, elemental, absorberElementoAzul, null, this);
	this.physics.add.overlap(caja, hitBoxPuzle1, destruirZarzas1, null, this);
	this.physics.add.overlap(cajon, hitBoxPuzle2, destruirZarzas2, null, this);
	this.physics.add.overlap(diana, pulpo.lanzaRocas, destruirZarzas3, null, this);
	this.physics.add.overlap(personaje.ani, manzanas, recogerManzana, null, this);
	this.physics.add.overlap(personaje.ani, enemigoAzul.skulls, recogerCalavera, null, this);

	if (zarzaDestroy1 == true) 
	{
		colisionesZarza1.destroy()
		caja.destroy();
		hitBoxPuzle1.destroy();
		colisZarza1.destroy();
	}
	if (zarzaDestroy2 == true) 
	{
		colisionesZarza2.destroy()
		cajon.destroy();
		hitBoxPuzle2.destroy();
		colisZarza2.destroy();
	}
	if (zarzaDestroy3 == true) 
	{
		colisionesZarza3.destroy();
		diana.destroy();
		colisZarza3.destroy();
	}

	if (completado == true) {mision = true}
}

function animaciones()
{
	this.anims.create({
		key: "tp",
		frames: this.anims.generateFrameNumbers("portal", {start: 0, end:7}),
		repeat: -1,
		frameRate: 10,
	});
}

function guardar()
{

	var urlllamada = '/php/guardadoLago.php?manzanas=' + inventario.contadorM + "&pocion_corteza=" + inventario.contadorC + "&pocion_velocidad=" + inventario.contadorV + "&semilla_explosiva=" + inventario.contadorB + "&vida=" + estadisticas.vida + "&energia_verde=" + magiaVerde.cargaElementalVerde + "&energia_azul=" + magiaAzul.cargaElementalAzul + "&energia_morada=" + magiaMorada.cargaElementalMorada + "&lago1=" + colisionesZarza1 + "&lago2=" + colisionesZarza2 + "&lago3=" + colisionesZarza3 + "&lago4=" + completado + "&usuario=" + nivelPacifico.usuarioActivo;


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

function absorberElementoAzul(p,e)
{
	if (xuclar.isDown && estadisticas.gemas == 1 && e.timer == -1 && magiaAzul.cargaElementalAzul < 5)
	{
		magiaAzul.recargaElementalAzul.call(this);
		sonidoRemolino.play();
		e.setVisible(false);
		e.timer = 400;
	}
}

function destruirZarzas1(e, h)
{
	e.destroy();
	h.destroy();

	if (zarzaDestroy1 == false) 
	{
		zarzaDestroy1 = true;

	   	colisZarza1.destroy();
		colisionesZarza1.destroy();

		guardar.call(this);
	}
}

function destruirZarzas2(e, h)
{
	e.destroy()
	h.destroy()

	if (zarzaDestroy2 == false)
	{
		zarzaDestroy2 = true;

		colisZarza2.destroy();
		colisionesZarza2.destroy();

		guardar.call(this);
	}
}

function destruirZarzas3(d,r)
{
	d.destroy();
	r.destroy();

	if (zarzaDestroy3 == false)
	{
		zarzaDestroy3 = true;

		colisZarza3.destroy();
		colisionesZarza3.destroy();

		guardar.call(this);
	}
}

function quitaVida(r, p)
{
	p.destroy();
	if(tiempodanyo < 0)
	{
		tiempodanyo = 40;
		personaje.hitted2.call(this, p.x , p.y);
		estadisticas.quitarVida.call(this);
		resetAlma.call(this);
	}
	
}

function golpeEnemigo(r, p)
{
	if(tiempodanyo < 0)
	{
		tiempodanyo = 40;
		personaje.hitted2.call(this, p.x , p.y);
		estadisticas.quitarVida.call(this);
		resetAlma.call(this);
	}
	
}

function colisionador(e, r)
{
	e.direccion.x = -e.direccion.x;
	e.direccion.y = -e.direccion.y;
	pulpo.rebote.call(this, e);
}

function pasarNivel()
{
	tpO = 1;
	if (cargado == true) 
	{
		mision = true;
		completarNivel.call(this);
	}

	this.scene.start("NivelPacifico");
}

function pasarNivelSecreto()
{
	this.scene.start("NivelPrueba");
}

export function cambiarTp()
{
	tpO = 0;
}

function recogerManzana(p,m)
{
	if (xuclar.isDown)
	{
		m.disableBody(true,true);
		m.destroy();
		inventario.anyadirManzana.call(this);
		pickUp.play()
  	}
}

function recogerCalavera(p,s)
{
	if (xuclar.isDown)
	{
		s.destroy();
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

function arena()
{
	caja.setVelocityX(0.1);
	caja.setVelocityY(0.1);
	personaje.slowSpeed.call(this);
}

function completarNivel()
{
	completado = true;

	guardar.call(this);
}

function spawnElemento()
{
	for (i=0; i < elemental.getChildren().length; i++)
	{
		ele=elemental.getChildren()[i];
		if (ele.timer == 0) 
		{
			ele.setVisible(true);
			ele.timer = -1;
		}
		else if(ele.timer > 0)
		{
			ele.timer--;
		}
	}
}

function crearEnemigos()
{
	if (progreso == false && zarzaDestroy1 == true && zarzaDestroy2 == true  && zarzaDestroy3 == true && cargado == true) 
	{
		enemigos.objects.forEach(enem =>{
		enemigoAzul.creacionEnemigo.call(this, enem.x, enem.y);
		})
		progreso = true;
		enemigoAzul.activarStalk.call(this);
	}
}

function cargarAlma()
{
	if (cargado == true && mision == false) 
	{
		if (personaje.direccion == 3) 
		{
			alma.x = personaje.ani.x;
			alma.y = personaje.ani.y - 20;
		}
		else if(personaje.direccion == 1)
		{
			alma.x = personaje.ani.x;
			alma.y = personaje.ani.y + 20;
		}
		else if(personaje.direccion == 2)
		{
			alma.x = personaje.ani.x - 12;
			alma.y = personaje.ani.y + 10;
		}
		else if(personaje.direccion == 4)
		{
			alma.x = personaje.ani.x + 12;
			alma.y = personaje.ani.y + 10;
		}
	}
}

function resetAlma()
{
	if(mision == false)
	{
		cargado = false;
		alma.x = guardarX;
		alma.y = guardarY;
	}
}