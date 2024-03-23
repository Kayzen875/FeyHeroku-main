<?php

$usuario=$_GET['usuario'];
$manzanas=$_GET['manzanas'];
$pocion_corteza=$_GET['pocion_corteza'];
$pocion_velocidad=$_GET['pocion_velocidad']
$semilla_explosiva=$_GET['semilla_explosiva'];
$vida=$_GET['vida'];
$energia_verde=$_GET['energia_verde'];
$energia_azul=$_GET['energia_azul'];
$energia_morada=$_GET['energia_morada'];
$lago1=$_GET['lago1'];
$lago2=$_GET['lago2'];
$lago3=$_GET['lago3'];
$lago4=$_GET['lago4'];


# Establecemos la conexión
$conexion=new mysqli("sql11.freemysqlhosting.net", "sql11417129", "LlMwrTRytr", "sql11417129");

# Testeamos que funciona

$result2=$conexion->query("UPDATE partidas p, usuarios u, lagos l SET p.manzanas='$manzanas', p.pocion_corteza='$pocion_corteza', p.pocion_velocidad='$pocion_velocidad',p.semilla_explosiva='$semilla_explosiva',p.vida='$vida',p.energia_verde='$energia_verde',p.energia_azul='$energia_azul',p.energia_morada='$energia_morada', l.lago1='$lago1', l.lago2='$lago2', l.lago3='$lago3', l.lago4='$lago4' WHERE u.usuario='$usuario' AND u.codigo=p.id_usuario AND p.codigo=a.id_partida");

echo "Datos guardados";
	//echo "El usuario no existe";

?>