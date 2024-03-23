import * as personaje from './personaje.js'
import * as estadisticas from './estadisticas.js'
import * as datos from './load.js'

export var contador = -1;
export var cargaElementalMorada = parseInt(localStorage.getItem("energia_morada"), 10);
export var flechasList;
export var absorber = true;
export var flecha;
var i;

export function loadSprite()
{
	this.load.image('magiaMorada','assets/images/magiaMorada.png');
}

export function crearMagiaMorada()
{
	flechasList = this.physics.add.group();
}

export function dispararFlechaGema()
{
    if (contador < 0 && cargaElementalMorada && estadisticas.gemas == 3 && personaje.direccion == 2)
    {
        flecha = flechasList.create(personaje.ani.x, personaje.ani.y,'magiaMorada');
		flecha.setDepth(20);
		flecha.setVelocityX(150);
        contador = 100;
        cargaElementalMorada -= 1;
        estadisticas.restarEnergiaMorada.call(this);
	}
	else if (contador < 0 && cargaElementalMorada && estadisticas.gemas == 3 && personaje.direccion == 4)
    {
        flecha = flechasList.create(personaje.ani.x, personaje.ani.y,'magiaMorada');
		flecha.setDepth(20);
		flecha.setVelocityX(-150);
		flecha.angle += 180;
        contador = 100;
        cargaElementalMorada -= 1;
        estadisticas.restarEnergiaMorada.call(this);
	}
	else if (contador < 0 && cargaElementalMorada && estadisticas.gemas == 3 && personaje.direccion == 3)
	{
		flecha = flechasList.create(personaje.ani.x, personaje.ani.y,'magiaMorada');
		flecha.setDepth(20);
		flecha.setVelocityY(150);
		flecha.angle += 90;
		contador = 100;
		cargaElementalMorada -= 1;
        estadisticas.restarEnergiaMorada.call(this);
	}
	else if (contador < 0 && cargaElementalMorada && estadisticas.gemas == 3 && personaje.direccion == 1)
	{
		flecha = flechasList.create(personaje.ani.x, personaje.ani.y,'magiaMorada');
		flecha.setDepth(20);
		flecha.setVelocityY(-150);
		flecha.angle -= 90;
		contador = 100;
		cargaElementalMorada -= 1;
        estadisticas.restarEnergiaMorada.call(this);
	}
}

export function recargaElementalMorada()
{
	if (absorber == true) 
	{
		cargaElementalMorada += 1;
		estadisticas.calculoMorado.call(this, 1)
	}
}

export function contadorAmatista()
{
	contador--;
}

export function absorcion()
{
	if (cargaElementalMorada < 5) 
	{
		absorber = true;
	}
	else
	{
		absorber = false;
	}
}

export function destruirF(f)
{
	f.disableBody(true, true);
	flechasList.remove(f);
	f.destroy();
}