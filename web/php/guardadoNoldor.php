<?php

$usuario=$_GET['usuario'];



# Establecemos la conexión
$conexion=new mysqli("sql11.freemysqlhosting.net", "sql11417129", "LlMwrTRytr", "sql11417129");



# Testeamos que funciona


$result2=$conexion->query("UPDATE partidas p, usuarios u SET p.noldor=1 WHERE u.usuario='$usuario' AND u.codigo=p.id_usuario");

echo "Datos guardados";
	//echo "El usuario no existe";

?>