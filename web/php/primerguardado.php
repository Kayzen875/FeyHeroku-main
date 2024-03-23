<?php

$usuario=$_GET['usuario'];
$manzanas=$_GET['manzanas'];
/*$pocion_corteza=$_GET['pocion_corteza'];
$pocion_velocidad=$_GET['pocion_velocidad']
$semilla_explosiva=$_GET['semilla_explosiva'];*/
//$noldor=$_GET['noldor'];
//$rana=$_GET['rana'];
//Con la opción de Alejandro cambiarlo por POST


# Establecemos la conexión
$conexion=new mysqli("sql11.freemysqlhosting.net", "sql11417129", "LlMwrTRytr", "sql11417129");
//$pg_conn = pg_connect(pg_connection_string_from_database_url());



# Testeamos que funciona


$result2=$conexion->query("UPDATE partidas p, usuarios u SET p.noldor=1, p.rana=1, p.manzanas='$manzanas' WHERE u.usuario='$usuario' AND u.codigo=p.id_usuario");

echo "Datos guardados";
	//echo "El usuario no existe";

?>