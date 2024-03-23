<?php

$usuario=$_GET['usuario'];
$manzanas=$_GET['manzanas'];
//$pocion_corteza=$_GET['pocion_corteza'];
//$pocion_velocidad=$_GET['pocion_velocidad']
$semilla_explosiva=$_GET['semilla_explosiva'];
//$vida=$_GET['vida'];
$energia_verde=$_GET['energia_verde'];
//$energia_azul=$_GET['energia_azul'];
//$energia_morada=$_GET['energia_morada'];
$arbol1=$_GET['arbol1'];
//$arbol2=$_GET['arbol2'];
//$arbol3=$_GET['arbol3'];
//$arbol4=$_GET['arbol4'];
//$arbol5=$_GET['arbol5'];
//$arbol6=$_GET['arbol6'];
//$nivelArbol=$_GET['nivelArbol'];
//Con la opción de Alejandro cambiarlo por POST


# Establecemos la conexión
$conexion=new mysqli("sql11.freemysqlhosting.net", "sql11417129", "LlMwrTRytr", "sql11417129");

# Testeamos que funciona
$result2=$conexion->query("UPDATE partidas p, usuarios u, arboles a SET p.noldor=1, p.semilla_explosiva='$semilla_explosiva', p.energia_verde='$energia_verde', p.manzanas='$manzanas', a.arbol1='$arbol1' WHERE u.usuario='$usuario' AND u.codigo=p.id_usuario AND p.codigo=a.id_partida");
/*$result2=$conexion->query("UPDATE partidas p, usuarios u, arboles a SET p.manzanas='$manzanas', p.pocion_corteza='$pocion_corteza', p.pocion_velocidad='$pocion_velocidad',p.semilla_explosiva='$semilla_explosiva',p.vida='$vida',p.energia_verde='$energia_verde',p.energia_azul='$energia_azul',p.energia_morada='$energia_morada', a.arbol1='$arbol1', a.arbol2='$arbol2', a.arbol3='$arbol3', a.arbol4='$arbol4', a.arbol5='$arbol5', a.arbol6='$arbol6' WHERE u.usuario='$usuario' AND u.codigo=p.id_usuario AND p.codigo=a.id_partida");*/

echo "Datos guardados";
	//echo "El usuario no existe";

?>