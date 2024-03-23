<?php

$usuario=$_GET['usuario'];
$contra=$_GET['contra'];
$vida=$_GET['vida'];
$manzanas=$_GET['manzanas'];
$pocion_corteza=$_GET['pocion_corteza'];
$pocion_velocidad=$_GET['pocion_velocidad']
$semilla_explosiva=$_GET['semilla_explosiva'];
$energia_verde=$_GET['energia_verde'];
$energia_azul=$_GET['energia_azul'];
$energia_morada=$_GET['energia_morada'];
$noldor=$_GET['noldor'];
$rana=$_GET['rana'];
$arbol1=$_GET['arbol1'];
$arbol2=$_GET['arbol2'];
$arbol3=$_GET['arbol3'];
$arbol4=$_GET['arbol4'];
$arbol5=$_GET['arbol5'];
$arbol6=$_GET['arbol6'];
$nivelArbol=$_GET['nivelArbol'];
$animal1=$_GET['animal1'];
$animal2=$_GET['animal2'];
$animal3=$_GET['animal3'];
$animal4=$_GET['animal4'];
$animal5=$_GET['animal5'];
$animal6=$_GET['animal6'];
$animal7=$_GET['animal7'];
$animal8=$_GET['animal8'];
$nivelAnimal=$_GET['nivelAnimal'];
$lago1=$_GET['lago1'];
$lago2=$_GET['lago2'];
$lago3=$_GET['lago3'];
$lago4=$_GET['lago4'];
$nivelLago=$_GET['nivelLago'];

# Establecemos la conexión
$conexion=new mysqli("sql11.freemysqlhosting.net", "sql11417129", "LlMwrTRytr", "sql11417129");
//$pg_conn = pg_connect(pg_connection_string_from_database_url());



# Testeamos que funciona
$result1=$conexion->query("SELECT * FROM usuarios, partidas WHERE usuarios.codigo=partidas.id_usuario AND usuarios.usuario='$usuario'"); 
if($result1->num_rows > 0)
{
	$claveprimaria=$conexion->query("SELECT codigo FROM usuarios WHERE usuario='$usuario'");
	$row=$claveprimaria->fetch_object();

	$result3=$conexion->query("INSERT INTO partidas(vida,posX,posY,manzanas,id_usuario,pocion_corteza,pocion_velocidad,semilla_explosiva,energia_verde,energia_azul,energia_morada,noldor,rana) VALUES(4,600,600,0,$row->codigo,0,0,0,5,5,5,0,0)");
	$claveprimaria2=$conexion->query("SELECT codigo FROM usuarios WHERE usuario='$usuario'");
	$row2=$claveprimaria2->fetch_object();

	$result4=$conexion->query("INSERT INTO arboles(arbol1,arbol2,arbol3,arbol4,arbol5,arbol6,nivelArbol,id_partida) VALUES(0,0,0,0,0,0,0,$row2->codigo)");
	$result5=$conexion->query("INSERT INTO animales(animal1,animal2,animal3,animal4,animal5,animal6,animal7,animal8,nivelAnimal,id_partida) VALUES(0,0,0,0,0,0,0,0,0,$row2->codigo)");
	$result6=$conexion->query("INSERT INTO lagos(lago1,lago2,lago3,lago4,nivelLago,id_partida) VALUES(0,0,0,0,0,$row2->codigo)");
	echo "Datos guardados";
	//echo "El usuario no existe";
}
else
{
		echo "Error";
}
?>