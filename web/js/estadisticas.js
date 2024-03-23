var numCorazones = 4;
var corazonesLlenos;
var corazonesVacios;
var vida = parseInt(localStorage.getItem("vida"), 10);
var creado = false;
export var corazonExtra = false;
var corazonCorteza;
var cargaVidas = false;
var Barraenergia;
var numEnergia = 5;
var energia = 5;
var energiaVerde;
var GemasList;
var gemaAzul;
var gemaVerde;
var gemaMorada;
var brilloZafiro;
var brilloEsmeralda;
var brilloAmatista;
var cargaVida = false;
export var gemas;
var dialogo
var i;
var KeyZ;
var EnergiaCargaVerde;
var EnergiaCargaMorada;
var EnergiaCargaAzul;
var timer = -1;

import * as inventario from './inventario.js'
import * as magiaVerde from './magiaVerde.js'
import * as magiaAzul from './magiaAzul.js'
import * as magiaMorada from './magiaMorada.js'
import * as datos from './load.js'

export default class estadisticas extends Phaser.Scene{
    constructor(){
		super({key: "estadisticas", active: true});
	}

    preload()
    {
        // CORAZONES
        this.load.image('CorazonLleno', './assets/images/corason-lleno.png');
        this.load.image('CorazonCorteza', './assets/images/corason-corteza.png');
        this.load.image('CorazonVacio', './assets/images/corason-vasio.png');
        //this.load.image('dialogo','assets/images/dialogo.png');

        // GEMAS
        this.load.image('Energia', './assets/images/energuia.png');
        this.load.image('EnergiaVerde', './assets/images/energia-verde.png');
        this.load.image('EnergiaAzul', './assets/images/energia-azul.png');
        this.load.image('EnergiaMorada', './assets/images/energia-morada.png');

        this.load.spritesheet('zafiro', './assets/sprites/zafirospritesheet.png',{frameWidth:320, frameHeight:320});
        this.load.spritesheet('esmeralda', './assets/sprites/esmeraldaspritesheet.png',{frameWidth:320, frameHeight:320});
        this.load.spritesheet('amatista', './assets/sprites/amatistaspritesheet.png',{frameWidth:320, frameHeight:320});
    }

    create()
    {
        // GEMAS
        animaciones.call(this);
        KeyZ=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        EnergiaCargaVerde = this.add.group();
        EnergiaCargaAzul = this.add.group();
        EnergiaCargaMorada = this.add.group();
        GemasList = this.add.group();

        EnergiaCargaMorada.createMultiple({
            key: 'EnergiaMorada',
            setXY: {
                x: 101,
                y: 40,
                stepX: 50.65
            },
            quantity: numEnergia,
            setScale: {
                x: 1.55,
                y: 1.55
            }
        })
        
        EnergiaCargaVerde.createMultiple({
            key: 'EnergiaVerde',
            setXY: {
                x: 101,
                y: 40,
                stepX: 50.65
            },
            quantity: numEnergia,
            setScale: {
                x: 1.55,
                y: 1.55
            }
        })

        EnergiaCargaAzul.createMultiple({
            key: 'EnergiaAzul',
            setXY: {
                x: 101,
                y: 40,
                stepX: 50.65
            },
            quantity: numEnergia,
            setScale: {
                x: 1.55,
                y: 1.55
            }
        })

        Barraenergia = this.add.sprite(175, 55, 'Energia');
        Barraenergia.setScale(1.5, 1.5);

        corazonesVacios = this.add.group();
        corazonesLlenos = this.add.group();

        corazonesVacios.createMultiple({
            key: 'CorazonVacio',
            setXY: {
                x: 110,
                y: 93,
                stepX: 50
            },
            quantity: numCorazones,
            setScale: { 
                x: 0.5, 
                y: 0.5
            }
        })

        corazonesLlenos.createMultiple({
            key: 'CorazonLleno',
            setXY: {
                x: 110,
                y: 93,
                stepX: 50
            },
            quantity: numCorazones,
            setScale: { 
                x: 0.5, 
                y: 0.5
            }
        })

        KeyZ=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        cargarGemas.call(this);
        gestionCorazones.call(this);
        //dialogo = this.add.sprite(500, 780, 'dialogo').setDepth(50);
    }

    update()
    {
        gemaActual.call(this);
        timer--;
        //vidaDatos.call(this);
        comprobarVidaExtra.call(this);
    }
}

export function quitarVida()
{
    if (corazonExtra == true) 
    {
        corazonExtra = false;
        creado = false;
        corazonCorteza.destroy()
    }
    else
    {
        if (vida >= 0)
        {
            var hijos=corazonesLlenos.getChildren();
            vida--;
            hijos[vida].setVisible(false);
        }
    }
}

export function ponerVida()
{   
    if (vida < 4) 
    {
        var hijos=corazonesLlenos.getChildren();
        hijos[vida].setVisible(true);
        vida ++;
    }
}

export function restarEnergiaAzul()
{
    if (magiaAzul.cargaElementalAzul >= 0)
    {
        var hijos = EnergiaCargaAzul.getChildren();
        hijos[magiaAzul.cargaElementalAzul].setVisible(false);
    }
}
export function restarEnergiaVerde()
{
    if (magiaVerde.cargaElementalVerde >= 0)
    {
        var hijos = EnergiaCargaVerde.getChildren();
        hijos[magiaVerde.cargaElementalVerde].setVisible(false);
    }
}

export function restarEnergiaMorada()
{
    if (magiaMorada.cargaElementalMorada >= 0)
    {
        var hijos = EnergiaCargaMorada.getChildren();
        hijos[magiaMorada.cargaElementalMorada].setVisible(false);
    }
}

/*export function cargarEnergiaAzul()
{   
    if (magiaAzul.cargaElementalAzul < 4)
    {
        var hijos=EnergiaCargaAzul.getChildren();
        hijos[magiaAzul.cargaElementalAzul].setVisible(true); 
    }
}
export function cargarEnergiaVerde()
{   
    if (magiaVerde.cargaElementalVerde < 4)
    {
        var hijos=EnergiaCargaVerde.getChildren();
        hijos[magiaVerde.cargaElementalVerde].setVisible(true); 
    }
}*/

function animaciones()
{
    this.anims.create({
        key: "brilloZafiro",
        frames: this.anims.generateFrameNumbers("zafiro", {start:0, end:5}),
        repeat: -1,
        frameRate: 7,
    });

    this.anims.create({
        key: "brilloEsmeralda",
        frames: this.anims.generateFrameNumbers("esmeralda", {start:0, end:6}),
        repeat: -1,
        frameRate: 7,
    });

    this.anims.create({
        key: "brilloAmatista",
        frames: this.anims.generateFrameNumbers("amatista", {start:0, end:7}),
        repeat: -1,
        frameRate: 7,
    });
}

function gemaActual()
{
    if (KeyZ.isDown && timer < 0)
    {
        if (gemas == 1) 
        {
            gemaAzul.setVisible(false,false);
            calculoAzul.call(this, 0);

            gemaVerde.setVisible(true,true);
            calculoVerde.call(this, 1);

            gemas = 2;
        }
        else if (gemas == 2)
        {
            gemaVerde.setVisible(false,false);
            calculoVerde.call(this, 0);

            gemaMorada.setVisible(true,true);
            calculoMorado.call(this, 1);

            gemas = 3;
        }
        else if (gemas == 3)
        {
            gemaMorada.setVisible(false,false);
            calculoMorado.call(this, 0);

            gemaAzul.setVisible(true,true);
            calculoAzul.call(this, 1);

            gemas = 1;
        }

        timer = 100;
    }
}

function cargarGemas()
{
    gemas = 1;

    gemaAzul = this.add.sprite(49.5,40,'zafiro')
    gemaAzul.setDepth(5);
    gemaAzul.setScale(0.25,0.25);
    gemaAzul.play("brilloZafiro");


    gemaVerde = this.add.sprite(49.5,40,'esmeralda')
    gemaVerde.setDepth(5);
    gemaVerde.setScale(0.23,0.23);
    gemaVerde.play("brilloEsmeralda");

    gemaMorada = this.add.sprite(49.5,40.5,'amatista')
    gemaMorada.setDepth(5);
    gemaMorada.setScale(0.25,0.25);
    gemaMorada.play("brilloAmatista");

    //gemaAzul.setVisible(false,false);
    gemaVerde.setVisible(false,false);
    calculoVerde.call(this, 0);
    gemaMorada.setVisible(false,false);
    calculoMorado.call(this, 0);
}

export function calculoAzul(p)
{
    var hijos = EnergiaCargaAzul.getChildren();

    if (p == 0)
    {
        i = magiaAzul.cargaElementalAzul;
        while(i > 0)
        {
            hijos[i-1].setVisible(false);
            i--;
        }
    }
    else if (p == 1)
    {
        i = 0;
        while(i < magiaAzul.cargaElementalAzul)
        {
            hijos[i].setVisible(true);
            i++;
        }

        i = 5;
        while(i > magiaVerde.cargaElementalAzul)
        {
            hijos[i-1].setVisible(false);
            i--;
        }
    }
}

export function calculoVerde(p)
{
    var hijos = EnergiaCargaVerde.getChildren();

    if (p == 0)
    {
        i = magiaVerde.cargaElementalVerde;
        while(i > 0)
        {
            hijos[i-1].setVisible(false);
            i--;
        }
    }
    else if (p == 1)
    {
        i = 0;
        console.log("Verde:" + magiaVerde.cargaElementalVerde)
        while(i < magiaVerde.cargaElementalVerde)
        {
            hijos[i].setVisible(true);
            i++;
        }

        i = 5;
        while(i > magiaVerde.cargaElementalVerde)
        {
            hijos[i-1].setVisible(false);
            i--;
        }
    }
}

export function calculoMorado(p)
{
    var hijos = EnergiaCargaMorada.getChildren();

    if (p == 0)
    {
        i = magiaMorada.cargaElementalMorada;
        while(i > 0)
        {
            hijos[i-1].setVisible(false);
            i--;
        }
    }
    else if (p == 1)
    {
        i = 0;
        while(i < magiaMorada.cargaElementalMorada)
        {
            hijos[i].setVisible(true);
            i++;
        }

        i = 5;
        while(i > magiaVerde.cargaElementalMorada)
        {
            hijos[i-1].setVisible(false);
            i--;
        }
    }
}

function gestionCorazones()
{
    if (cargaVida == false) 
    {
        while(i < numCorazones)
        {
            var hijos=corazonesLlenos.getChildren();
            hijos[i].setVisible(false);
            i++;
        }

        vida = 4;
        i = 0;
        cargaVida = true
        while(i < vida)
        {
            var hijos=corazonesLlenos.getChildren();
            hijos[i].setVisible(true);
            i++;
        }
    }
}

/*export function vidaDatos()
{
    if (cargaVidas == false) 
    {
        vida = datos.vida-1;
        i = 0;
        cargaVidas = true
        while(i < datos.vida)
        {
            var hijos=corazonesLlenos.getChildren();
            hijos[i].setVisible(true);
            i++;
        }
    }
}*/

export function vidaExtra()
{
    if (corazonExtra == false) 
    {
        corazonExtra = true;
    }
}

function comprobarVidaExtra()
{
    if (corazonExtra == true && creado != true) 
    {
        corazonCorteza = this.add.sprite(310, 93, "CorazonCorteza");
        corazonCorteza.setScale(0.5,0.5);
        corazonCorteza.setDepth(20);
        creado = true;
    }
}

export function recargaCoras()
{
    i = 0;
    vida = 4;

    while(i < vida)
    {
        var hijos=corazonesLlenos.getChildren();
        hijos[i].setVisible(true);
        i++;
    }
}