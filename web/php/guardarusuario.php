<?php

$usuario=$_GET['usuario'];
$contra=$_GET['contra'];

# Establecemos la conexión
$conexion=new mysqli("sql11.freemysqlhosting.net", "sql11417129", "LlMwrTRytr", "sql11417129");
//$pg_conn = pg_connect(pg_connection_string_from_database_url());



# Testeamos que funciona
$result1=$conexion->query("SELECT * FROM usuarios, partidas WHERE usuarios.codigo=partidas.id_usuario AND usuarios.usuario='$usuario'"); 
if($result1->num_rows > 0)
{
	echo "El usuario ya existe";
}
else
{
	
	$result2=$conexion->query("INSERT INTO usuarios(usuario,contrasenya) VALUES('$usuario','$contra')");
	$claveprimaria=$conexion->query("SELECT codigo FROM usuarios WHERE usuario='$usuario'");
	$row=$claveprimaria->fetch_object();

	$result3=$conexion->query("INSERT INTO partidas(vida,posX,posY,manzanas,id_usuario,pocion_corteza,pocion_velocidad,semilla_explosiva,energia_verde,energia_azul,energia_morada,noldor,rana) VALUES(4,600,600,0,$row->codigo,0,0,0,5,5,5,0,0)");
	$claveprimaria2=$conexion->query("SELECT codigo FROM usuarios WHERE usuario='$usuario'");
	$row2=$claveprimaria2->fetch_object();

	$result4=$conexion->query("INSERT INTO arboles(arbol1,arbol2,arbol3,arbol4,arbol5,arbol6,nivelArbol,id_partida) VALUES(0,0,0,0,0,0,0,$row2->codigo)");
	$result5=$conexion->query("INSERT INTO animales(animal1,animal2,animal3,animal4,animal5,animal6,animal7,animal8,nivelAnimal,id_partida) VALUES(0,0,0,0,0,0,0,0,0,$row2->codigo)");
	$result6=$conexion->query("INSERT INTO lagos(lago1,lago2,lago3,lago4,nivelLago,id_partida) VALUES(0,0,0,0,0,$row2->codigo)");
	echo "El usuario se ha registrado";
	//echo "El usuario no existe";
}
?>