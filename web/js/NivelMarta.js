import * as game from './game.js'
import * as personaje from './personaje.js'
import * as magiaVerde from './magiaVerde.js'
import * as magiaAzul from './magiaAzul.js'
import * as magiaMorada from './magiaMorada.js'
import * as enemigo from './enemigo.js'
import * as inventario from './inventario.js'
import * as estadisticas from './estadisticas.js';
import * as lobo from './lobo.js';
import * as datos from './load.js'
import * as NivelPacifico from './NivelPacifico.js'

export var tpE;
export var mapache;
export var zorro;
export var cabra;
export var conejo;
export var cabras;
export var mapaches;
export var zorros;
export var conejos;
export var completado = false;
export var almaCogida = false;
export var almaPuesta = parseInt(localStorage.getItem("nivelAnimal"), 10);;

var b;
var z;
var m;
var c;
var loboGrow;
var KeyO;
var teleport;
var rAmatista;
var cargaElementalMorada;
var xuclar;
var elemental;
var piedraMagica;
var piedra;
var furrito;
var contadorAnimales = 320;
var rokita;
var destruir;
var i
var tiempodanyo = -1;
var piedraRota1 = false;
var piedraRota2 = false;
var piedraRota3 = false;
var piedraRota4 = false;
var bomb;
var manzanitas;
var manzanasCorruptas;
var manzana;
var pickUp;
var curacion;
var amatista;
var aullido;
var mapacheEstaEnfadado = false;
var zorroEstaEnfadado = false;
var conejoEstaEnfadado = false;
var cabraEstaEnfadado = false;
export var animalSalvado1 = parseInt(localStorage.getItem("animal1"), 10);
export var animalSalvado2 = parseInt(localStorage.getItem("animal2"), 10);
export var animalSalvado3 = parseInt(localStorage.getItem("animal3"), 10);
export var animalSalvado4 = parseInt(localStorage.getItem("animal4"), 10);
var animalSalvado5 = parseInt(localStorage.getItem("animal5"), 10);
var animalSalvado6 = parseInt(localStorage.getItem("animal6"), 10);
var animalSalvado7 = parseInt(localStorage.getItem("animal7"), 10);
var animalSalvado8 = parseInt(localStorage.getItem("animal8"), 10);
var animalitos;
var urlllamada;
var cargaGuardado = false;


export default class NivelMarta extends Phaser.Scene{
	constructor(){
		super({key: "NivelMarta"});
	}

    preload()
	{
        load.call(this);
        personaje.loadSprite.call(this);
        lobo.loadLobo.call(this);
    }

    create()
	{   
        // SONIDOS
        bomb = this.sound.add('bomb');
        pickUp = this.sound.add('pickUp');
        loboGrow = this.sound.add('loboGrowling');
        aullido = this.sound.add('aullido');
        curacion = this.sound.add('curacion');

        // PERSONAJE Y GEMAS
        personaje.crearPersonaje.call(this);
        magiaVerde.crearMagiaVerde.call(this);
        magiaAzul.crearMagiaAzul.call(this);
        magiaMorada.crearMagiaMorada.call(this);

		personaje.ani.x = 90;
		personaje.ani.y = 150;
        personaje.ani.setDepth(9);

        animaciones.call(this);

        // GRUPOS 
        elemental = this.physics.add.group();
        rokita = this.physics.add.group();
        manzanitas = this.physics.add.group();
        manzanasCorruptas = this.physics.add.group();
        mapaches = this.physics.add.group();
        cabras = this.physics.add.group();
        conejos = this.physics.add.group();
        zorros = this.physics.add.group();

        // ANIMALES
        /*
        mapache = this.physics.add.sprite(1000, 150, 'mapachito').setDepth(8);
        mapache.setScale(0.7, 0.7);

        zorro = this.physics.add.sprite(245, 613, 'zorro').setDepth(8);
        zorro.setScale(0.7, 0.7);

        cabra = this.physics.add.sprite(473, 228, 'cabra').setDepth(8);
        cabra.setScale(0.7, 0.7);

        conejo = this.physics.add.sprite(900, 350, 'conejo').setDepth(8);
        conejo.setScale(0.7, 0.7);
        */
        // ENEMIGO
        lobo.cargarLobo.call(this);

        if (!lobo.LoboEstaMuerto)
        {
            aullido.play();
        }

        if (lobo.LoboEstaMuerto)
        {   
            lobo.furrito.destroy();
            crearAlma.call(this);
        }

        // CARGAR NIVEL
        cargarNivel.call(this);
        cargarMapa.call(this);

        // TECLAS
        KeyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        xuclar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    update()
	{   
        tiempodanyo--;
        personaje.hit.call(this, 20);
        magiaVerde.tiempoVerde.call(this);
        magiaMorada.absorcion.call(this);
        magiaMorada.contadorAmatista.call(this);
        personaje.controlesPersonaje.call(this);
        personaje.tBonk.call(this);
        personaje.cBonk.call(this);
        personaje.explosionBomba.call(this);

        if (!lobo.LoboEstaMuerto)
        {
            //console.log("");
            //lobo.stalkEnemigo.call(this);
            lobo.generarDisparo.call(this);
        }
        
        contadorAnimalessi.call(this);

        moverAnimales.call(this)

        mecanicaAdri.call(this);
        
        if (almaCogida)
        {   
            cogerAlma.call(this);
        }

        if (lobo.LoboEstaMuerto && !completado)
        {   
            completado = true;
        }
	}
}

function load()
{
    this.load.tilemapTiledJSON('mapaMarta', 'assets/mapas/mapaMarta/mapaMarrta.json');

    this.load.image('prueba','assets/mapas/mapaMarta/prueba.png');
    this.load.image('arboles','assets/mapas/mapaMarta/arboles.png');
    this.load.image('setasMagicas', 'assets/images/setasMagicas.png');
    this.load.image('piedraMagica', 'assets/images/piedraaMagica.png');
    this.load.image('manzana', 'assets/images/Manzana.png');

    this.load.audio('pickUp', 'assets/audio/pickUp.mp3');
    this.load.audio('bomb', 'assets/audio/bombsound.mp3');
    this.load.audio('loboGrowling', 'assets/audio/lobo.mp3');
    this.load.audio('aullido', 'assets/audio/aullidolobo.mp3');
    this.load.audio('curacion', 'assets/audio/curacionAnimal.mp3');

    this.load.spritesheet('portal','assets/sprites/portal.png',{frameWidth:21, frameHeight:16});
    this.load.spritesheet('mapachito', 'assets/sprites/mapache_spritesheet.png', {frameWidth:19, frameHeight:41});
    this.load.spritesheet('mapache', 'assets/sprites/mapache_spritesheet1.png', {frameWidth:39, frameHeight:29});
    this.load.spritesheet('explosion', 'assets/sprites/explosionmarta_spritesheet.png', {frameWidth: 128, frameHeight:128});
    this.load.spritesheet('zorro', 'assets/sprites/zorra_spritesheet.png', {frameWidth:43, frameHeight:29});
    this.load.spritesheet('cabra', 'assets/sprites/cabra_spritesheet.png', {frameWidth:37, frameHeight:36});
    this.load.spritesheet('conejo', 'assets/sprites/conejo_spritesheet.png', {frameWidth:29, frameHeight:25});
    this.load.spritesheet('almaMorada', 'assets/sprites/almaMorada_spritesheet.png',{frameWidth:20, frameHeight:10});
}

function cargarCamara()
{
	this.cameras.main.setBounds(0, 0, 2050,1280);
	this.cameras.main.setZoom(2);     
	this.cameras.main.centerOn(0, 0);
}

function cargarMapa()
{
    let mapaMarta = this.add.tilemap('mapaMarta');

    let prueba = mapaMarta.addTilesetImage('prueba');
    let arboles = mapaMarta.addTilesetImage('arboles');

    let suelo = mapaMarta.createLayer("suelo", [prueba], 0, 0).setDepth(0);
    let hierba = mapaMarta.createLayer("hierba", [prueba, arboles], 0, 0).setDepth(2);
    let caminito = mapaMarta.createLayer("caminito", [prueba], 0, 0).setDepth(3);
    let murito2 = mapaMarta.createLayer("murito2", [prueba], 0, 0).setDepth(4);
    let murito = mapaMarta.createLayer("murito", [prueba], 0, 0).setDepth(5);
    let tronquitos = mapaMarta.createLayer("tronquitos", [prueba, arboles], 0, 0).setDepth(6);
    let arboles1 = mapaMarta.createLayer("arboles1", [prueba, arboles], 0, 0).setDepth(7);
    let arboles2 = mapaMarta.createLayer("arboles2", [prueba, arboles], 0, 0).setDepth(9);
    let piedruscos2 = mapaMarta.createLayer("piedruscos2", [prueba], 0, 0).setDepth(6);
    let piedruscos = mapaMarta.createLayer("piedruscos", [prueba], 0, 0).setDepth(7);
    let agua = mapaMarta.createLayer("agua", [prueba], 0, 0).setDepth(11);
    let arboles3 = mapaMarta.createLayer("arboles3", [prueba, arboles], 0, 0).setDepth(12);
    let arboles4 = mapaMarta.createLayer("arboles4", [prueba, arboles], 0, 0).setDepth(13);
    let floretes = mapaMarta.createLayer("floretes", [prueba, arboles], 0, 0).setDepth(7);
    let flechaCol = mapaMarta.createLayer("flechaCol", [prueba], 0, 0).setDepth(-1);
    let colisiones = mapaMarta.createLayer("colisiones", [prueba], 0, 0).setDepth(-1);
    let enemigos = mapaMarta.getObjectLayer("enemigos");
    let setas = mapaMarta.getObjectLayer("setas");
    let elementos = mapaMarta.getObjectLayer("elementos");
    let animales = mapaMarta.getObjectLayer("animales");
    let manzanas = mapaMarta.getObjectLayer("manzanas");
    let portal = mapaMarta.getObjectLayer("portal");

    this.physics.world.setBounds(0,0,1280,768);

    cargarCamara.call(this);

    this.physics.add.collider(personaje.ani,colisiones);
    colisiones.setCollisionByProperty({collides:true});
    flechaCol.setCollisionByProperty({flechas:true});
    //this.physics.add.collider(mapache, colisiones);
    //this.physics.add.collider(zorro, colisiones);
    this.physics.add.collider(magiaMorada.flechasList, flechaCol, magiaMorada.destruirF, null, this);

    portal.objects.forEach(tp =>{
    teleport = this.physics.add.sprite(tp.x, tp.y, 'portal');
    teleport.play('tp');
    teleport.setDepth(10);
    })

    setas.objects.forEach(seta =>{
        if (Phaser.Math.Between(0,1) == 1)
        {
            rAmatista = elemental.create(seta.x, seta.y, 'setasMagicas');
            rAmatista.setDepth(8);
        }
    })

    elementos.objects.forEach(piedrita =>{
        if (!lobo.LoboEstaMuerto)
        {
            piedraMagica = rokita.create(piedrita.x, piedrita.y, 'piedraMagica');
            piedraMagica.setDepth(8);
            piedraMagica.numero=piedrita.properties[0].value;
        }
    })

    manzanas.objects.forEach(spawn =>{
        if (Phaser.Math.Between(0,1) == 1) 
        {
            manzana = manzanitas.create(spawn.x, spawn.y, 'manzana');
            manzana.setDepth(9);
        }
    })

    animales.objects.forEach(animal =>{
        animalitos = animal.properties[0].value;

        switch (animalitos)
        {
            case 7:
                cabra = cabras.create(animal.x, animal.y, 'cabra');
                cabra.setDepth(8);
                cabra.setScale(0.7, 0.7)

                //comprobarAnimal.call(this, cabra);
            
                this.physics.add.collider(cabra, colisiones);

                break;
            case 1:
                zorro = zorros.create(animal.x, animal.y, 'zorro');
                zorro.setDepth(8);
                zorro.setScale(0.7, 0.7)

                //comprobarAnimal.call(this, zorro);

                this.physics.add.collider(zorro, colisiones);

                break;
            case 2:
                mapache = mapaches.create(animal.x, animal.y, 'mapache');
                mapache.setDepth(8);
                mapache.setScale(0.7, 0.7)

                //comprobarAnimal.call(this, mapache);

                this.physics.add.collider(mapache, colisiones);

                break;
            case 4:
                conejo = conejos.create(animal.x, animal.y, 'conejo');
                conejo.setDepth(8);
                conejo.setScale(0.7, 0.7)

                //comprobarAnimal.call(this, conejo);

                this.physics.add.collider(conejo, colisiones);

                break;
        }
    })

    this.physics.add.overlap(personaje.ani, teleport, pasarNivel, null, this);
    this.physics.add.overlap(personaje.ani, elemental, absorberElementoMorada, null, this);
    this.physics.add.overlap(magiaMorada.flechasList, rokita, golpearPiedra, null, this);
    /*this.physics.add.overlap(lobo.fuegoList, mapache, enfurecerAnimal, null, this);
    this.physics.add.overlap(lobo.fuegoList, zorro, enfurecerAnimal, null, this);
    this.physics.add.overlap(lobo.fuegoList, cabra, enfurecerAnimal, null, this);
    this.physics.add.overlap(lobo.fuegoList, conejo, enfurecerAnimal, null, this);*/
    this.physics.add.overlap(lobo.fuegoList, personaje.hitboxDanyo, colisionVida, null, this);
    this.physics.add.overlap(personaje.ani, manzanitas, recogerManzana, null, this);
    this.physics.add.overlap(personaje.hitboxInteractuar, cabras, curarAnimal, null, this);
    this.physics.add.overlap(personaje.hitboxInteractuar, zorros, curarAnimal, null, this);
    this.physics.add.overlap(personaje.hitboxInteractuar, mapaches, curarAnimal, null, this);
    this.physics.add.overlap(personaje.hitboxInteractuar, conejos, curarAnimal, null, this);
}

function animaciones()
{
    this.anims.create({
		key: "tp",
		frames: this.anims.generateFrameNumbers("portal", {start: 0, end:7}),
		repeat: -1,
		frameRate: 10,
    });
    this.anims.create({
        key: 'mapacheIzquierda',
        frames: this.anims.generateFrameNumbers("mapache", {start: 4, end:5}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'mapacheDerecha',
        frames: this.anims.generateFrameNumbers("mapache", {start: 1, end:2}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'mapacheEnfadao1',
        frames: this.anims.generateFrameNumbers("mapache", {start: 7, end:8}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'mapacheEnfadao2',
        frames: this.anims.generateFrameNumbers("mapache", {start: 10, end:11}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'cabraEnfadao1',
        frames: this.anims.generateFrameNumbers("cabra", {start: 7, end:8}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'cabraEnfadao2',
        frames: this.anims.generateFrameNumbers("cabra", {start: 10, end:11}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'zorroEnfadao1',
        frames: this.anims.generateFrameNumbers("zorro", {start: 7, end:8}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'zorroEnfadao2',
        frames: this.anims.generateFrameNumbers("zorro", {start: 10, end:11}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'conejoEnfadao1',
        frames: this.anims.generateFrameNumbers("conejo", {start: 7, end:8}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'conejoEnfadao2',
        frames: this.anims.generateFrameNumbers("conejo", {start: 10, end:11}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'explosion',
        frames: this.anims.generateFrameNumbers("explosion", {start: 0, end:6}),
        frameRate: 9
    });
    this.anims.create({
        key: 'zorroDerecha',
        frames: this.anims.generateFrameNumbers("zorro", {start: 0, end:2}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'zorroIzquierda',
        frames: this.anims.generateFrameNumbers("zorro", {start: 3, end:5}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'cabraDerecha',
        frames: this.anims.generateFrameNumbers("cabra", {start: 0, end:2}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'cabraIzquierda',
        frames: this.anims.generateFrameNumbers("cabra", {start: 3, end:5}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'conejoDerecha',
        frames: this.anims.generateFrameNumbers("conejo", {start: 0, end:2}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'conejoIzquierda',
        frames: this.anims.generateFrameNumbers("conejo", {start: 3, end:5}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: "almaM",
        frames: this.anims.generateFrameNumbers("almaMorada", {start: 0, end:3}),
        repeat: -1,
        frameRate: 3,
    });
}

function pasarNivel()
{
    tpE = 1;
    this.scene.start("NivelPacifico");
}

export function cambiarTp()
{
    tpE = 0;
}

function absorberElementoMorada(p,e)
{
    if (xuclar.isDown && estadisticas.gemas == 3 && magiaMorada.cargaElementalMorada < 5)
    {
        magiaMorada.recargaElementalMorada.call(this);
        e.disableBody(true,true);
        e.destroy();
    }
}

function golpearPiedra(m, p)
{   
    loboGrow.play();
    
    if (p.numero == 1)
    {
        p.play('explosion');
        bomb.play();
        piedraRota1 = true;
        lobo.cambiarPosicionLobo.call(this);
    }
    if (p.numero == 2 && piedraRota1)
    {
        p.play('explosion');
        bomb.play();
        piedraRota2 = true;
        lobo.cambiarPosicionLobo.call(this);
    }
    if (p.numero == 3 && piedraRota2)
    {
        p.play('explosion');
        bomb.play();
        piedraRota3 = true;
        lobo.cambiarPosicionLobo.call(this);
    }
    if (p.numero == 4 && piedraRota3)
    {
        p.play('explosion');
        bomb.play();

        crearAlma.call(this);
        
        lobo.cambiarPosicionLobo.call(this);

        this.physics.add.overlap(personaje.ani, amatista, cogerAlma);
    }
}

function mecanicaAdri()
{
    magiaAzul.restaTiempo.call(this);
    magiaAzul.gestionEscudos.call(this);
}

function moverAnimales()
{    
    for (i=0; i < cabras.getChildren().length; i++)
    {   
        b = cabras.getChildren()[i];

        if (contadorAnimales == 150 && !cabraEstaEnfadado)
        {
            b.play("cabraDerecha");
            b.setVelocityX(25);
        }
        else if (contadorAnimales == 300 && !cabraEstaEnfadado)
        {
            b.play("cabraIzquierda");
            b.setVelocityX(-25);
        }
        if (contadorAnimales == 150 && cabraEstaEnfadado && !animalSalvado1)
        {
            b.play("cabraEnfadao1");
            b.setVelocityX(40);
        }
        else if (contadorAnimales == 300 && cabraEstaEnfadado && !animalSalvado1)
        {
            b.play("cabraEnfadao2");
            b.setVelocityX(-40);
        }
    }

    for (i=0; i < mapaches.getChildren().length; i++)
    {   
        m = mapaches.getChildren()[i];

        if (contadorAnimales == 150 && !mapacheEstaEnfadado)
        {
            m.play("mapacheDerecha");
            m.setVelocityX(25);
        }
        else if (contadorAnimales == 300 && !mapacheEstaEnfadado)
        {
            m.play("mapacheIzquierda");
            m.setVelocityX(-25);
        }
        if (contadorAnimales == 150 && mapacheEstaEnfadado && !animalSalvado2)
        {
            m.play("mapacheEnfadao1");
            m.setVelocityX(40);
        }
        else if (contadorAnimales == 300 && mapacheEstaEnfadado && !animalSalvado2)
        {
            m.play("mapacheEnfadao2");
            m.setVelocityX(-40);
        }
    }

    for (i=0; i < zorros.getChildren().length; i++)
    {   
        z = zorros.getChildren()[i];

        if (contadorAnimales == 170 && !zorroEstaEnfadado)
        {
            z.play("zorroIzquierda");
            z.setVelocityX(-35);
        }
        else if (contadorAnimales == 320 && !zorroEstaEnfadado)
        {
            z.play("zorroDerecha");
            z.setVelocityX(35);
        }
        if (contadorAnimales == 170 && zorroEstaEnfadado && !animalSalvado3)
        {
            z.play("zorroEnfadao1");
            z.setVelocityX(50);
        }
        else if (contadorAnimales == 320 && zorroEstaEnfadado && !animalSalvado3)
        {
            z.play("zorroEnfadao2");
            z.setVelocityX(-50);
        }
    }

    for (i=0; i < conejos.getChildren().length; i++)
    {   
        c = conejos.getChildren()[i];

        if (contadorAnimales == 150 && !conejoEstaEnfadado)
        {
            c.play("conejoDerecha");
            c.setVelocityX(30);
        }
        else if (contadorAnimales == 300 && !conejoEstaEnfadado)
        {
            c.play("conejoIzquierda");
            c.setVelocityX(-30);
        }
        if (contadorAnimales == 150 && conejoEstaEnfadado && !animalSalvado4)
        {
            c.play("conejoEnfadao1");
            c.setVelocityX(40);
        }
        else if (contadorAnimales == 300 && conejoEstaEnfadado && !animalSalvado4)
        {
            c.play("conejoEnfadao2");
            c.setVelocityX(-40);
        }
    }
}

function curarAnimal(h, a)
{
    if (almaCogida)
    {
        if (a == b)
        {
            if (!animalSalvado1)
            {
                curacion.play();
                animalSalvado1 = true;
                primerguardado.call(this);
            }
            
            cabraEstaEnfadado = false;
        }
        if (a == m)
        {
            if (!animalSalvado2)
            {
                curacion.play();
                animalSalvado2 = true;
                primerguardado.call(this);
            }

            mapacheEstaEnfadado = false;
        }
        if (a == z)
        {
            if (!animalSalvado3)
            {
                curacion.play();
                animalSalvado3 = true;
                primerguardado.call(this);
            }

            zorroEstaEnfadado = false;
        }
        if (a == c)
        {
            if (!animalSalvado4)
            {
                curacion.play();
                animalSalvado4 = true;
                primerguardado.call(this);
            }

            conejoEstaEnfadado = false;
        }
    }
}

function contadorAnimalessi()
{
    if (contadorAnimales == 0)
    {
        contadorAnimales = 320;
    }
    else
    {
        contadorAnimales--;
    }
}

export function enfurecerAnimal(a)
{
    for (i=0; i < 2; i++)
    {   
        m = mapaches.getChildren()[i];
        b = cabras.getChildren()[i];
        z = zorros.getChildren()[i];
        c = conejos.getChildren()[i];

        if (a == b)
        {
            cabraEstaEnfadado = true;
        }

        if (a == m)
        {
            mapacheEstaEnfadado = true;
        }

        if (a == z)
        {
            zorroEstaEnfadado = true;
        }

        if (a == c)
        {
            conejoEstaEnfadado = true;
        }
    }
}

function cargarNivel()
{
    piedraRota1 = false;
    piedraRota2 = false;
    piedraRota3 = false;
    piedraRota4 = false;
}

function colisionVida(f, p)
{
    if(tiempodanyo < 0)
	{
		tiempodanyo = 40;
        personaje.hitted2.call(this, p.x , p.y);
        estadisticas.quitarVida.call(this);
    }
}

function recogerManzana(p, m)
{
	if (xuclar.isDown && inventario.contadorM < 9)
	{
		m.disableBody(true,true);
		m.destroy();
		inventario.anyadirManzana.call(this);
        pickUp.play()
  	}
}

export function cogerAlma()
{   
    if (!almaCogida)
    {
        pickUp.play();
        almaCogida = true;
    } 

    if (almaCogida)
    {
        amatista.x = personaje.ani.x;
        amatista.y = personaje.ani.y - 25;
    }
}

export function crearAlma()
{   
    if (!almaPuesta)
    {
        amatista = this.physics.add.sprite(lobo.furrito.x, lobo.furrito.y, "almaMorada");
        amatista.play('almaM');
        amatista.setDepth(8);
    }
}

export function ponerAlma()
{
    almaPuesta = true;
    primerguardado.call(this);
}

export function borrarAlma()
{
    if (almaPuesta)
    {
        amatista.destroy();
    }
}

function primerguardado()
{
	if (!cargaGuardado)
	{
		var urlllamada = '/php/guardarAnimales.php?manzanas=' + inventario.contadorM + "&pocion_corteza=" + inventario.contadorC + "&pocion_velocidad=" + inventario.contadorV + "&semilla_explosiva=" + inventario.contadorB + "&vida=" + estadisticas.vida + "&animal1=" + animalSalvado1 + "&animal2=" + animalSalvado2 + "&animal3=" + animalSalvado3 + "&animal4=" + animalSalvado4 + "&nivelAnimal=" + almaPuesta + "&usuario=" + NivelPacifico.usuarioActivo;
        //"&energia_verde=" + magiaVerde.cargaElementalVerde + "&energia_azul=" + magiaAzul.cargaElementalAzul + "&energia_morada=" + magiaMorada.cargaElementalMorada +
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() 
		{
	    	if (xhr.readyState == 4 && xhr.status == 200) 
	    	{
	        	console.log("Aquí llega")
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
	        	console.log('Algo ha fallado: ' + xhr.status);
	    	}
        };
        
        xhr.open('GET', urlllamada);
        xhr.send();
	}
}