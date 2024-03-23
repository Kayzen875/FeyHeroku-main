<?php

$usuario=$_GET['usuario'];
$manzanas=$_GET['manzanas'];
$pocion_corteza=$_GET['pocion_corteza'];
$pocion_velocidad=$_GET['pocion_velocidad']
$semilla_explosiva=$_GET['semilla_explosiva'];
$vida=$_GET['vida'];
/*$energia_verde=$_GET['energia_verde'];
$energia_azul=$_GET['energia_azul'];
$energia_morada=$_GET['energia_morada'];*/
$animal1=$_GET['animal1'];
$animal2=$_GET['animal2'];
$animal3=$_GET['animal3'];
$animal4=$_GET['animal4'];
$nivelAnimal=$_GET['nivelAnimal'];

$conexion=new mysqli("sql11.freemysqlhosting.net", "sql11417129", "LlMwrTRytr", "sql11417129");

$result2=$conexion->query("UPDATE partidas p, usuarios u, animales a SET p.manzanas='$manzanas', p.pocion_corteza='$pocion_corteza', p.pocion_velocidad='$pocion_velocidad',p.semilla_explosiva='$semilla_explosiva',p.vida='$vida', a.animal1='$animal1', a.animal2='$animal2', a.animal3='$animal3', a.animal4='$animal4' WHERE u.usuario='$usuario' AND u.codigo=p.id_usuario AND p.codigo=a.id_partida");
//p.energia_verde='$energia_verde',p.energia_azul='$energia_azul',p.energia_morada='$energia_morada',
echo "Datos guardados";
	//echo "El usuario no existe";

?>