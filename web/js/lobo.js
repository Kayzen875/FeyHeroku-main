import * as personaje from './personaje.js'
import * as magiaMorada from './magiaMorada.js'
import * as NivelMarta from './NivelMarta.js'

export var furrito;
export var fuego;
export var fuegoList;
var contador = 0;
var fueguito;
var t;
var i;
var s;
var b;
var p;
var j;
var c;
var m;
var z;
var stalk = 0;
var furroList;
var direccion;
var direccionAnimal;
var contadorDisparos = 500;
export var loboGolpeado = false;
var contadorGolpeos = 0;
var fueg0;
var disparosAnimales;
export var LoboEstaMuerto = false;

export function loadLobo()
{
    this.load.spritesheet('furrito', 'assets/sprites/furro_spritesheet.png', {frameWidth:50, frameHeight:50});
    this.load.image('bolaFuego', 'assets/images/bolaFuego.png');
}

export function cargarLobo()
{   
    furrito = this.physics.add.sprite(528, 41, 'furrito').setDepth(8);
    fuegoList = this.physics.add.group();

    contadorGolpeos = 0;

    //this.physics.add.overlap(personaje.hitboxPrueba, furrito, activarStalk, null, this);

    this.anims.create({
        key: "furroIdle",
        frames: this.anims.generateFrameNumbers("furrito", {start: 0, end:1}),
        repeat: -1,
        frameRate: 3,
    });

    furrito.play('furroIdle');
}

export function generarDisparo()
{
    if (contadorDisparos == 0)
    {
        contadorDisparos = 500;
    }
    else
    {
        contadorDisparos--;
    }

    if (contadorDisparos == 150)
    {   
        for (i = 0; i < NivelMarta.cabras.getChildren().length; i++)
        {
            fuego = fuegoList.create(furrito.x, furrito.y, 'bolaFuego').setDepth(15);
            c = NivelMarta.cabras.getChildren()[i];
            this.physics.moveToObject(fuego, c, 200);

            this.physics.add.overlap(fuego, c, estaEnfadado, null, this);
        }
    }

    else if (contadorDisparos == 250)
    {
        for (i = 0; i < NivelMarta.conejos.getChildren().length; i++)
        {   
            fuego = fuegoList.create(furrito.x, furrito.y, 'bolaFuego').setDepth(15);
            j = NivelMarta.conejos.getChildren()[i];
            this.physics.moveToObject(fuego, j, 200);

            this.physics.add.overlap(fuego, j, estaEnfadado, null, this);
        }
    }

    else if (contadorDisparos == 350)
    {
        for (i=0; i < NivelMarta.zorros.getChildren().length; i++)
        {   
            fuego = fuegoList.create(furrito.x, furrito.y, 'bolaFuego').setDepth(15);
            z = NivelMarta.zorros.getChildren()[i];
            this.physics.moveToObject(fuego, z, 200);

            this.physics.add.overlap(fuego, z, estaEnfadado, null, this);
        }

        fuego = fuegoList.create(furrito.x, furrito.y, 'bolaFuego').setDepth(15);
        this.physics.moveToObject(fuego, personaje.ani, 200);
    }

    else if (contadorDisparos == 450)
    {
        for (i=0; i < NivelMarta.mapaches.getChildren().length; i++)
        {   
            fuego = fuegoList.create(furrito.x, furrito.y, 'bolaFuego').setDepth(15);
            m = NivelMarta.mapaches.getChildren()[i];
            this.physics.moveToObject(fuego, m, 200);

            this.physics.add.overlap(fuego, m, estaEnfadado, null, this);
        }
    }
}

export function estaEnfadado(f, a)
{
    if (a == c)
    {
        NivelMarta.enfurecerAnimal.call(this, a);
    }

    if (a == m)
    {
        NivelMarta.enfurecerAnimal.call(this, a);
    }
    if (a == j)
    {
        NivelMarta.enfurecerAnimal.call(this, a);
    }

    if (a == z)
    {
        NivelMarta.enfurecerAnimal.call(this, a);
    }
}

export function cambiarPosicionLobo()
{   
    loboGolpeado = true;

    if (loboGolpeado == true && contadorGolpeos == 0)
    {
        furrito.x = 970;
        furrito.y = 23;
        loboGolpeado = false;
        contadorGolpeos += 1;
    }
    if (loboGolpeado == true && contadorGolpeos == 1)
    {
        furrito.x = 24;
        furrito.y = 715;
        loboGolpeado = false;
        contadorGolpeos += 1;
    }
    if (loboGolpeado == true && contadorGolpeos == 2)
    {
        furrito.x = 650;
        furrito.y = 620;
        loboGolpeado = false;
        contadorGolpeos += 1;
    }
    if (loboGolpeado == true && contadorGolpeos == 3)
    {
        furrito.destroy();
        loboGolpeado = false;
        LoboEstaMuerto = true;
    }
    //24.583333333336615 715.4166666666645
    // 950 535
}

export function destuirDisparo()
{
    f.disableBody(true, true);
    fuegoList.remove(f);
    f.destroy();
    console.log('putazorra');
}

// PRUEBAS DISPAROS
    /*for (i=0; i < fuegoList.getChildren().length; i++)
	{
		b=fuegoList.getChildren()[i];
		b.setVelocityX(b.velocidad * b.direccion.x)
		b.setVelocityY(b.velocidad * b.direccion.y)
	}*/
    /*else if (contador == 250)
    {
        fueg0 = disparosAnimales.create(furrito.x, furrito.y, 'bolaFuego').setDepth(15);
        this.physics.moveToObject(fueg0, NivelMarta.animalitos, 200);
        console.log('maricona');
    }
    else if (contador == 350)
    {
        fueg0 = disparosAnimales.create(furrito.x, furrito.y, 'bolaFuego').setDepth(15);
        this.physics.moveToObject(fueg0, NivelMarta.animalitos, 200);
        console.log('maricona');
    }
    else if (contador == 450)
    {
        fueg0 = disparosAnimales.create(furrito.x, furrito.y, 'bolaFuego').setDepth(15);
        this.physics.moveToObject(fueg0, NivelMarta.animalitos, 200);
        console.log('maricona');
    }*/

    /*fuego.velocity = 5;
    fuego.dir = new Phaser.Math.Vector2(furrito.x - NivelMarta.mapache.x, furrito.y  - NivelMarta.mapache.y);
    fuego.dir.normalize();

    fuego = fuegoList.getChildren()[i];
    fuego.x = fuego.x+fuego.velocity*fuego.dir.x;
    fuego.y = fuego.y+fuego.velocity*fuego.dir.y;
    
    if (contadorDisparos == 150)
    {


        for (i=0; i < 2; i++)
        {   
            fuego = fuegoList.create(furrito.x, furrito.y ,'bolaFuego');
            fuego.setDepth(7);

            for (i=0; i < NivelMarta.cabras.getChildren().length; i++)
            {
                b = fuegoList.getChildren()[i];
                c = NivelMarta.cabras.getChildren()[i];

                this.physics.moveToObject(b, c, 200);
            }
            
    
            //apuntarAnimales.call(this);
    
            
        }
    }*/

    /*function apuntarAnimales()
{
    for (i=0; i < NivelMarta.cabras.getChildren().length; i++)
    {   
        c = NivelMarta.cabras.getChildren()[i];
    }

    for (i=0; i < NivelMarta.conejos.getChildren().length; i++)
    {   
        j = NivelMarta.conejos.getChildren()[i];
    }

    for (i=0; i < NivelMarta.zorros.getChildren().length; i++)
    {   
        z = NivelMarta.zorros.getChildren()[i];
    }

    for (i=0; i < NivelMarta.mapaches.getChildren().length; i++)
    {   
        m = NivelMarta.mapaches.getChildren()[i];
    }
}*/
/*function activarStalk(p, s)
{
    t = new Phaser.Math.Vector2(NivelMarta.animalitos.x - furrito.x, NivelMarta.animalitos.y - furrito.y);
	t.normalize();
	direccion = t;
	stalk = true;
}

/*function stalkAnimales()
{
    f = new Phaser.Math.Vector2(NivelMarta.mapache.x - furrito.x, NivelMarta.mapache.y - furrito.y);
	f.normalize();
	direccionAnimal = f;
	stalk = true;

    if (contador > 0)
    {
        contador--;
    }

	if (stalk && contador == 0) 
    {
        fuego = fuegoList.create(furrito.x, furrito.y ,'bolaFuego')
        fuego.direccion = direccionAnimal;
        fuego.velocidad = 120;
        fuego.setDepth(10)
        contador = 120;
        stalk = false;
    }
}*/

/*export function stalkEnemigo()
{
    if (contador > 0)
    {
        contador--;
    }

	if (stalk && contador == 0) 
    {
        fuego = fuegoList.create(furrito.x, furrito.y ,'bolaFuego')
        fuego.direccion = direccion;
        fuego.velocidad = 120;
        fuego.setDepth(10)
        contador = 120;
        stalk = false;
    }
}*/