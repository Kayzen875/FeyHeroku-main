var inv;
var manz;
var anyadir = 0;
var prueba = 0;
var contador1;
var contador2;
var contador3;
var contador4;
var pocion1;
var pocion2;
var semillita;
var anyadirItem = 0;
var timerV = -1;
var bomb;
var carga = false;
export var contadorM = parseInt(localStorage.getItem("manzanas"), 10);
export var contadorV = parseInt(localStorage.getItem("pocion_velocidad"), 10);
export var contadorC = parseInt(localStorage.getItem("pocion_corteza"), 10);
export var contadorB = parseInt(localStorage.getItem("semilla_explosiva"), 10);
export var unPalo = false;
var numInv = 4;
import * as game from './game.js'
import * as personaje from './personaje.js'
import * as estadisticas from './estadisticas.js'
import * as tienda from './tienda.js'
import * as datos from './load.js'

export default class inventario extends Phaser.Scene{
	constructor(){
		super({key: "inventario", active: true});
	}

	preload()
	{
		this.load.image('inventario','assets/images/inventario1.png');
		this.load.image('semilla', 'assets/images/semillaExplosiva.png');
		this.load.image('rama', 'assets/images/ramaInutil.png');
		this.load.image('pocionCorteza', 'assets/images/pocionCorteza.png');
		this.load.image('pocionRapidez', 'assets/images/pocionVelocidad.png');
		this.load.image('manz', 'assets/images/Manzana.png');
		this.load.spritesheet('explosion_bomba', 'assets/sprites/explosion_spritesheet.png', {frameWidth: 128, frameHeight:128})

		this.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml'); 
	}
  
	create()
	{	
		//inv = this.add.sprite((game.config.width / 2) + 370, (game.config.height / 2) / 10,'inventario');
		inv = this.add.sprite((game.config.width / 2) + 390, (game.config.height / 2) / 10,'inventario');
		inv.setScale(1.5, 1.5);

		manz = this.add.sprite(810, 37,'manz');
		manz.setDepth(21);
		manz.setScale(2.5,2.5);
		manz.setAlpha(0.5)
		contador1 = this.add.bitmapText(814, 44, 'carrier_command', 'x'+ 0, 9).setDepth(21);

		pocion1 = this.add.sprite(861, 37,'pocionRapidez');
		pocion1.setDepth(21);
		pocion1.setScale(2.4,2.4);
		pocion1.setAlpha(0.5)
		contador2 = this.add.bitmapText(865, 44, 'carrier_command', 'x'+ 0, 9).setDepth(21);

		pocion2 = this.add.sprite(907, 37,'pocionCorteza');
		pocion2.setDepth(21);
		pocion2.setScale(2.4,2.4);
		pocion2.setAlpha(0.5)
		contador3 = this.add.bitmapText(916, 44, 'carrier_command', 'x'+ 0, 9).setDepth(21);

		semillita = this.add.sprite(963, 37,'semilla');
		semillita.setDepth(21);
		semillita.setScale(2.4,2.4);
		semillita.setAlpha(0.5)
		contador4 = this.add.bitmapText(967, 44, 'carrier_command', 'x'+ 0, 9).setDepth(21);

		this.anims.create({
        key: 'pum',
        frames: this.anims.generateFrameNumbers("explosion_bomba", {start: 0, end:6}),
        frameRate: 8
    });

	}
	update()
	{	
		funcionesTienda.call(this);
		funcionesCarga.call(this);
		/*
		if (anyadirItem == 4)
		{
			if(contadorM == 0){manz.setAlpha(1)}
			
			contadorM++;
			contador1.setText('x'+ contadorM);
			
			anyadirItem = 0;
		}

		if (anyadirItem == 1)
		{
			if(contadorV == 0){pocion1.setAlpha(1)}
			
			contadorV++;
			contador2.setText('x' + contadorV);
			
			anyadirItem = 0;
		}

		if (anyadirItem == 2)
		{
			if(contadorC == 0){pocion2.setAlpha(1)}
			
			contadorC++;
			contador3.setText('x' + contadorC);
			
			anyadirItem = 0;
		}

		if (anyadirItem == 3)
		{
			if(contadorB == 0){semillita.setAlpha(1)}
			
			contadorB++;
			contador4.setText('x' + contadorB)
			
			anyadirItem = 0;
		}

		if (timerV == 0) 
		{
			personaje.normalSpeed.call(this);
		}
		else if(timerV > 0) {timerV--;}*/
	}

}
export function anyadirManzana()
{
	anyadirItem = 4;
    /*var secret = 'manzana';
    var usuario = 'usuario@';
    var funcion = 'guardarManzana';
    var contador = contadorM;
    var urlllamada = 'https://fey-bosque.herokuapp.com/php/postgre.php';

    var xhr = new XMLHttpRequest();

    xhr.open('POST', urlllamada);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Acciones a procesar tras recibir la respuesta
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Respuesta recibida: ' + xhr.responseText);
            contadorM = parseInt(xhr.responseText, 10);
        }
        else if (xhr.status !== 200) {
            console.log('Algo ha fallado: ' + xhr.status);
        }
    };
    // Envia datos al servidor php
    var datos = 'secret=' + secret + '&usuario=' + usuario + '&funcion=' + funcion + '&contador=' + contador;
    // Debug
    console.log(datos);
    var datoscodificados = encodeURI(datos);
    console.log(datoscodificados);
    xhr.send(datoscodificados);


    console.log('El contadorM tiene un valor de:'+contadorM);*/
}

export function restarManzana(p)
{	
	if (p == tienda.posicionTienda[0])
	{
		contadorM -= tienda.posicionTienda[0];
	}
	if (p == tienda.posicionTienda[1])
	{
		contadorM -= tienda.posicionTienda[1];
	}
	if (p == tienda.posicionTienda[2])
	{
		contadorM -= tienda.posicionTienda[2];
	}
	if (p == tienda.posicionTienda[3])
	{
		contadorM -= tienda.posicionTienda[3];
	}

	contador1.setText('x'+ contadorM);
	
	if (contadorM == 0) 
	{
		manz.setAlpha(0.5);
	}
}

export function comerManzana()
{
	if (contadorM > 0 && personaje.ani.health < 4) 
	{
		contadorM--;
		contador1.setText('x'+ contadorM)
		personaje.curarVida.call(this);
		console.log(contadorM)
	}
	if (contadorM == 0) 
	{
		manz.setAlpha(0.5);
	}
}

export function consumirVelocidad()
{
	if (contadorV > 0) 
	{
		contadorV--;
		contador2.setText('x'+ contadorV)
		personaje.speedBoost.call(this);
		timerV = 700;
	}
	if (contadorV == 0) 
	{
		pocion1.setAlpha(0.5)
	}
}

export function consumirCorteza()
{
	if (contadorC > 0 && estadisticas.corazonExtra == false) 
	{
		contadorC--;
		contador3.setText('x'+ contadorC)
		estadisticas.vidaExtra.call(this);
	}
	if (contadorC == 0)
	{
		pocion2.setAlpha(0.5)
	}
}

export function consumirBomba()
{
	if (contadorB > 0 && personaje.timerBomba == -1) 
	{
		contadorB--;
		contador4.setText('x'+ contadorB)
		personaje.ponerBomba.call(this);
	}
	if (contadorB == 0)
	{
		semillita.setAlpha(0.5)
	}
}

// AÑADIR OBJETOS DE LA TIENDA

export function anyadirPocion1()
{
	anyadirItem = 1;
}

export function anyadirPocion2()
{
	anyadirItem = 2;
}

export function anyadirSemilla()
{
	anyadirItem = 3;
}

export function borrarManzanas()
{
	if (contadorM > 0) 
	{
		console.log("te quedas sin manzanas!");
		contadorM = 0;
		contador1.setText('x'+ contadorM)
		manz.setAlpha(0.5)
	}
}

function funcionesTienda()
{
	if (anyadirItem == 4)
		{
			if(contadorM == 0){manz.setAlpha(1)}
			
			contadorM++;
			contador1.setText('x'+ contadorM);
			
			anyadirItem = 0;
		}

		if (anyadirItem == 1)
		{
			if(contadorV == 0){pocion1.setAlpha(1)}
			
			contadorV++;
			contador2.setText('x' + contadorV);
			
			anyadirItem = 0;
		}

		if (anyadirItem == 2)
		{
			if(contadorC == 0){pocion2.setAlpha(1)}
			
			contadorC++;
			contador3.setText('x' + contadorC);
			
			anyadirItem = 0;
		}

		if (anyadirItem == 3)
		{
			if(contadorB == 0){semillita.setAlpha(1)}
			
			contadorB++;
			contador4.setText('x' + contadorB)
			
			anyadirItem = 0;
		}

		if (timerV == 0) 
		{
			personaje.normalSpeed.call(this);
		}
		else if(timerV > 0) {timerV--;}
}

function funcionesCarga()
{
	if (!carga) 
	{
		contador1.setText('x'+ contadorM);
		contador2.setText('x' + contadorV);
		contador3.setText('x' + contadorC);
		contador4.setText('x' + contadorB);

		if (contadorM > 0) {manz.setAlpha(1);}
		if (contadorV > 0) {pocion1.setAlpha(1);}
		if (contadorC > 0) {pocion2.setAlpha(1);}
		if (contadorB > 0) {semillita.setAlpha(1);}

		carga = true;
	}
}

export function arreglo()
{
	timerV = 10;
}