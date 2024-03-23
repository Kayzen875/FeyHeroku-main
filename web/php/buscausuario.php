<?php

# Esta función lee la variable de configuración DATABASE_URL y devuelve una 
# cadena de conexion para pg_connect. Pon esto en tu aplicación.
/*function pg_connection_string_from_database_url() {
  extract(parse_url($_ENV["DATABASE_URL"]));
  return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- sslmode=require ????
}*/

/*$variableChula=$_GET['variable']; //IMPORTANTE, luego con variableChula haces los insets y todo
*/


# Establecemos la conexión
$conexion=new mysqli("sql11.freemysqlhosting.net", "sql11417129", "LlMwrTRytr", "sql11417129");
//$pg_conn = pg_connect(pg_connection_string_from_database_url());



# Testeamos que funciona
$result1=$conexion->query("SELECT * FROM usuarios");
$row1=$result1->fetch_object();

if($row1->codigo != NULL)
{
	//$datos = array("id"=>$row->codigo,"nombre"=>$row->usuario, "contra"=>$row->contrasenya);
	$result2=$conexion->query("SELECT * FROM partidas WHERE $row1->codigo=codigo");

	$row2=$result2->fetch_object();
	$datos = array("id"=>$row2->codigo,"vida"=>$row2->vida, "posX"=>$row2->posX, "posY"=>$row2->posY);
}




echo json_encode($datos);


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