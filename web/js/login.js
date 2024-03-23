var KeyV;
var fondo;
var texto;
var texto2;
var z;
var w;
var w2;
var a;
var s;
var s2;
var d;
var x;
var k;
var v;
var one;
var two;
var three;
var four;
var movimiento;
export var dialogoPocho = 0;
var acciones;
var inventario;
var space;
var ataque;
var interact;
var referencia;
var skull;
export var nivelActual = parseInt(localStorage.getItem("nivelActual"), 10)
export default class login extends Phaser.Scene{
	constructor(){
		super({key: "login"})	;
	}

	preload()
	{
		load.call(this);
	}
	create()
	{
		KeyV=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
		fondo=this.physics.add.sprite(800, 350,'fondo');



		z=this.add.sprite(332, 210, 'Z');
		x=this.add.sprite(370, 210, 'X');
		k=this.add.sprite(292, 210, 'K');
		acciones = this.add.text(400, 210, 'Usa estas teclas para realizar acciones dentro del juego!', {fontsize: '128px'});
		acciones.setTintFill(0x000000);

		w=this.add.sprite(332, 310, 'W');
		a=this.add.sprite(300, 342, 'A');
		s=this.add.sprite(332, 342, 'S');
		d=this.add.sprite(364, 342, 'D');
		movimiento = this.add.text(400, 340, 'Usa estas teclas para desplazarte', {fontsize: '128px'});
		movimiento.setTintFill(0x000000);

		one=this.add.sprite(300, 260, '1');
		two=this.add.sprite(332, 260, '2');
		three=this.add.sprite(364, 260, '3');
		four=this.add.sprite(396, 260, '4');
		inventario = this.add.text(420, 260, 'Usa estas teclas para usar los objetos del inventario', {fontsize: '128px'});
		inventario.setTintFill(0x000000);

		space=this.add.sprite(370,400, 'Space');
		ataque=this.add.text(405,400, 'Pulsa espacio en una direccion horizontal para golpear', {fontsize:'128px'});
		ataque.setTintFill(0x000000);

		v=this.add.sprite(410,450, 'V')
		interact=this.add.text(430,450, 'Usa la tecla V para interactuar con NPCs', {fontsize:'128px'});
		interact.setTintFill(0x000000);

		w2=this.add.sprite(332, 310, 'W');
		s2=this.add.sprite(332, 342, 'S');

		animaciones.call(this);

		referencia=this.add.sprite(700,700, 'viegar');
		referencia.setScale(0.3,0.3)

		//skull=this.add.sprite(800,100, 'calavera');
		//skull.setScale(0.5,0.5)
		

		z.play("zAnim")
		x.play("xAnim")
		k.play("kAnim")
		w.play("wAnim")
		w2.play("wAnim")
		a.play("aAnim")
		s.play("sAnim")
		s2.play("sAnim")
		d.play("dAnim")
		v.play("VAnim")
		one.play("1Anim")
		two.play("2Anim")
		three.play("3Anim")
		four.play("4Anim")
		space.play("spaceAnim")
	}

	update()
	{
		this.scene.sleep("estadisticas")
		this.scene.sleep("inventario")
		this.scene.stop("dialogosPacifico")
		if (KeyV.isDown)
		{
			dialogoPocho = 1;
			pasarEscena.call(this);
		}
	}
}

function load()
{
	this.load.image('fondo','assets/images/fondousuario.png');
	this.load.spritesheet('Z','assets/sprites/Keys/Z-Key.png',{frameWidth:32, frameHeight:32})
	this.load.spritesheet('X','assets/sprites/Keys/X-Key.png',{frameWidth:32, frameHeight:32})
	this.load.spritesheet('K','assets/sprites/Keys/K-Key.png',{frameWidth:32, frameHeight:32})
	this.load.spritesheet('1','assets/sprites/Keys/1-Key.png',{frameWidth:32, frameHeight:32})
	this.load.spritesheet('2','assets/sprites/Keys/2-Key.png',{frameWidth:32, frameHeight:32})
	this.load.spritesheet('3','assets/sprites/Keys/3-Key.png',{frameWidth:32, frameHeight:32})
	this.load.spritesheet('4','assets/sprites/Keys/4-Key.png',{frameWidth:32, frameHeight:32})
	this.load.spritesheet('Space','assets/sprites/Keys/spacekey.png',{frameWidth:64, frameHeight:32})
	this.load.spritesheet('W','assets/sprites/Keys/W-Key.png',{frameWidth:32, frameHeight:32})
	this.load.spritesheet('A','assets/sprites/Keys/A-Key.png',{frameWidth:32, frameHeight:32})
	this.load.spritesheet('S','assets/sprites/Keys/S-Key.png',{frameWidth:32, frameHeight:32})
	this.load.spritesheet('D','assets/sprites/Keys/D-Key.png',{frameWidth:32, frameHeight:32})
	this.load.spritesheet('V','assets/sprites/Keys/V-Key.png',{frameWidth:32, frameHeight:32})

	this.load.spritesheet('playerAni', 'assets/sprites/Fey.png', {frameWidth:52, frameHeight:90});
	this.load.spritesheet('espada','assets/sprites/SwordAttack.png',{frameWidth:64, frameHeight:64});

	this.load.image('calavera', 'assets/images/calavera.png');
	this.load.image('viegar', 'assets/images/Viegar_y_Seberino.png');
}

function pasarEscena()
{
	this.scene.start("NivelPacifico");
}

function animaciones()
{
	this.anims.create({
	key: "zAnim",
	frames: this.anims.generateFrameNumbers("Z", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});

	this.anims.create({
	key: "xAnim",
	frames: this.anims.generateFrameNumbers("X", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});

	this.anims.create({
	key: "1Anim",
	frames: this.anims.generateFrameNumbers("1", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});

	this.anims.create({
	key: "2Anim",
	frames: this.anims.generateFrameNumbers("2", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});

	this.anims.create({
	key: "3Anim",
	frames: this.anims.generateFrameNumbers("3", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});

	this.anims.create({
	key: "4Anim",
	frames: this.anims.generateFrameNumbers("4", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});

	this.anims.create({
	key: "spaceAnim",
	frames: this.anims.generateFrameNumbers("Space", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});

	this.anims.create({
	key: "kAnim",
	frames: this.anims.generateFrameNumbers("K", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});

	this.anims.create({
	key: "VAnim",
	frames: this.anims.generateFrameNumbers("V", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});

	this.anims.create({
	key: "wAnim",
	frames: this.anims.generateFrameNumbers("W", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});

	this.anims.create({
	key: "aAnim",
	frames: this.anims.generateFrameNumbers("A", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});

	this.anims.create({
	key: "sAnim",
	frames: this.anims.generateFrameNumbers("S", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});

	this.anims.create({
	key: "dAnim",
	frames: this.anims.generateFrameNumbers("D", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});

	this.anims.create({
		key: "right",
		frameRate: 3,
		frames: this.anims.generateFrameNumbers("playerAni", {start: 5, end:7}),
		repeat: -1
	});
}