<?php

# Esta función lee la variable de configuración DATABASE_URL y devuelve una 
# cadena de conexion para pg_connect. Pon esto en tu aplicación.
/*function pg_connection_string_from_database_url() {
  extract(parse_url($_ENV["DATABASE_URL"]));
  return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- sslmode=require ????
}*/

/*$variableChula=$_GET['variable']; //IMPORTANTE, luego con variableChula haces los insets y todo
*/

$usuario=$_GET['usuario'];
$contra=$_GET['contra'];

# Establecemos la conexión
$conexion=new mysqli("sql11.freemysqlhosting.net", "sql11417129", "LlMwrTRytr", "sql11417129");
//$pg_conn = pg_connect(pg_connection_string_from_database_url());



# Testeamos que funciona
$result1=$conexion->query("SELECT * FROM usuarios, partidas, arboles, animales, lagos WHERE lagos.id_partida=partidas.codigo AND animales.id_partida=partidas.codigo AND arboles.id_partida=partidas.codigo AND partidas.id_usuario=usuarios.codigo AND usuarios.usuario='$usuario' AND usuarios.contrasenya='$contra'"); //Poner en comillas simples las variabes que sean strings/VarChar

if($result1->num_rows > 0)
{
	$row1=$result1->fetch_object();
	$datos = array("usuario"=>$row1->usuario,"vida"=>$row1->vida, "posX"=>$row1->posX, "posY"=>$row1->posY, "manzanas"=>$row1->manzanas, "pocion_corteza"=>$row1->pocion_corteza, "pocion_velocidad"=>$row1->pocion_velocidad, "semilla_explosiva"=>$row1->semilla_explosiva, "energia_verde"=>$row1->energia_verde, "energia_azul"=>$row1->energia_azul, "energia_morada"=>$row1->energia_morada,"noldor"=>$row1->noldor,"rana"=>$row1->rana, "arbol1"=>$row1->arbol1, "arbol2"=>$row1->arbol2, "arbol3"=>$row1->arbol3, "arbol4"=>$row1->arbol4, "arbol5"=>$row1->arbol5, "arbol6"=>$row1->arbol6, "nivelArbol"=>$row1->nivelArbol, "animal1"=>$row1->animal1, "animal2"=>$row1->animal2, "animal3"=>$row1->animal3, "animal4"=>$row1->animal4, "animal5"=>$row1->animal5, "animal6"=>$row1->animal6, "animal7"=>$row1->animal7, "animal8"=>$row1->animal8, "nivelAnimal"=>$row1->nivelAnimal, "lago1"=>$row1->lago1, "lago2"=>$row1->lago2, "lago3"=>$row1->lago3, "lago4"=>$row1->lago4, "nivelLago"=>$row1->nivelLago);
	echo json_encode($datos);
}
else
{
	echo "Error";
}





//echo $row->usuario."/".$row->contrasenya;
//*$contador = pg_query($pg_conn, "SELECT contador FROM inventario"); #pg_query($pg_conn, "SELECT relname FROM pg_stat_user_tables WHERE schemaname='public'"); #ALTER TABLE inventario MODIFY contador
/*$contador = pg_query($pg_conn, "SELECT contador FROM inventario");
$row1 = pg_fetch_row($contador);
print("$row1[0]\n");*/
/*$contrasenya =  pg_query($pg_conn, "SELECT contrasenya FROM usuarios");

if (!pg_num_rows($usuario)) //|| !pg_num_rows($contrasenya))
{
	print("La conexión funciona, pero no existe ningún usuario")
}
else
{
	while($row1 = pg_fetch_row($usuario)) //&& $row2 = pg_fetch_row($contrasenya))
	{
		print("$row1[0]\n");
		//print("$row2[0]\n");
	}
}
/*
//pg_query($pg_con, "INSERT INTO usuarios VALUES($v, $n)");
if (!pg_num_rows($contador)) {
  print("La conexión funciona, pero la base de datos está vacía..\n\n");
} else {
  while ($row = pg_fetch_row($contador)) { print("$row[0]\n");}
}*/
?>