<?php
// Activación de errores para depuraciónç
//$conexion=new mysqli("localhost", "root", "", "feybdd");
ini_set('display_errors', 1);
error_reporting(E_ALL);

function consulta_bbdd() {
  // aqui hace lo necesario para consultar o escribir en la base de datos
  $datos = array();
  $response[0] = array(
    'id' => '1',
    'valor1'=> 'v1',
    'valor2'=> 'v2'
  );
  return $datos;
}

// Permite peticiones php desde culquien origen
// esto deberia de delimitarse solo a la url del juego
header('Access-Control-Allow-Origin: *');

// Comprobamos si se han recibido parámetros
if ( !isset( $HTTP_RAW_POST_DATA ) ) { 
    $HTTP_RAW_POST_DATA = file_get_contents( 'php://input' );
} 

$secret = filter_input(INPUT_POST, "secret", FILTER_SANITIZE_STRING);
$usuario = filter_input(INPUT_POST, "usuario", FILTER_SANITIZE_STRING);
$funcion = filter_input(INPUT_POST, "funcion", FILTER_SANITIZE_STRING);
$contador = filter_input(INPUT_POST, "contador", FILTER_SANITIZE_STRING);

// respuesta en json
if ( $secret != "" && $funcion != "" && $usuario != "" && $contador != "") {
  /*
  echo "Se han recibido todos los parámetros<br>";
  echo "Parametro 'secret' = $secret<br>";
  echo "Parametro 'usuario' = $usuario<br>";
  echo "Parametro 'funcion' = $funcion<br>";  
  echo "Parametro 'contador' = $contador<br>";
  */
  header('Content-type: application/json');
  echo 'contador:'.$contador;
  $data = consulta_bbdd();
  echo json_encode( $data );
  exit;
}

?>

<html>
  <head>
    <title>PHP Webservice</title>
  </head>
  <body>
    <h1>php database interface for Jumper Little Demo Phaser Game</h1>
    <div>
        Este sitio web no funciona por si solo.<br>
        Espera recibir una petición AJAX del juego.<br><br>
        
    </div>
    <h3>No se ha recibido ningún parámetro.</h3>
  </body>
</html>