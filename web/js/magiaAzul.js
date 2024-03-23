export var grupoEscudos;
export var shield;
export var cargaElementalAzul = parseInt(localStorage.getItem("energia_azul"), 10);;
export var timer = -1;
var absorber = true;
var i;
var prueba;

import * as personaje from './personaje.js'
import * as estadisticas from './estadisticas.js'
import * as datos from './load.js'

export function cargaSprites()
{
	this.load.image('derecha', 'assets/sprites/escudo_der.png');
	this.load.image('izquierda', 'assets/sprites/escudo_izq.png');
	this.load.image('arriba', 'assets/sprites/escudo_up.png');
	this.load.image('abajo', 'assets/sprites/escudo_down.png');	
}

export function crearMagiaAzul()
{
	grupoEscudos = this.physics.add.group();
	//grupoEscudos = this.physics.add.staticGroup();
}

export function proteccion()
{
	if(timer < 0 && cargaElementalAzul && personaje.direccion == 2 && estadisticas.gemas == 1)
	{
		shield = grupoEscudos.create(personaje.ani.x + 20, personaje.ani.y,'derecha');
		shield.setDepth(20);
		timer = 100;
		cargaElementalAzul -= 1;
		estadisticas.restarEnergiaAzul.call(this);
	}
	else if(timer < 0 && cargaElementalAzul && personaje.direccion == 4 && estadisticas.gemas == 1)
	{
		shield = grupoEscudos.create(personaje.ani.x - 20, personaje.ani.y,'izquierda');
		shield.setDepth(20);
		timer = 100;
		cargaElementalAzul -= 1;
		estadisticas.restarEnergiaAzul.call(this);
	}
	else if(timer < 0 && cargaElementalAzul && personaje.direccion == 1 && estadisticas.gemas == 1)
	{
		shield = grupoEscudos.create(personaje.ani.x, personaje.ani.y - 20,'arriba');
		shield.setDepth(20);
		timer = 100;
		cargaElementalAzul -= 1;
		estadisticas.restarEnergiaAzul.call(this);
	}
	else if(timer < 0 && cargaElementalAzul && personaje.direccion == 3 && estadisticas.gemas == 1)
	{
		shield = grupoEscudos.create(personaje.ani.x, personaje.ani.y + 20,'abajo');
		shield.setDepth(20);
		timer = 100;
		cargaElementalAzul -= 1;
		estadisticas.restarEnergiaAzul.call(this);
	}
}

export function recargaElementalAzul()
{
	if (absorber == true) 
	{
		cargaElementalAzul += 1;
		estadisticas.calculoAzul.call(this, 1);
	}
}

export function absorcion()
{
	if (cargaElementalAzul < 5) 
	{
		absorber = true;
	}
	else
	{
		absorber = false;
	}
}

export function restaTiempo()
{
	timer--;
}

export function gestionEscudos()
{
	if(timer < 0)
	{
		for(i = 0; i < grupoEscudos.getChildren().length; i++)
		{
			grupoEscudos.getChildren()[i].destroy();
		}
	}
}