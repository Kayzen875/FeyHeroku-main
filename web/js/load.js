//import * as estadisticas from './estadisticas.js'
//import * as personaje from './personaje.js'
/*export var vida;
export var posX;
export var posY;
var datos;*/
var datos;
window.loadevents = function()
{
    document.getElementById("boton").addEventListener("click",window.cargar);
    document.getElementById("boton2").addEventListener("click",window.crear);
}
window.cargar = function ()
{
	console.log(document.getElementById("input1").value);
    console.log(document.getElementById("input2").value);
	
    var urlllamada = '/php/cargausuario.php?usuario=' + document.getElementById("input1").value + "&contra=" + document.getElementById("input2").value;


   var xhr = new XMLHttpRequest();

	
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            //alert(xhr.responseText);
            if(xhr.responseText == "Error")
            {
                alert("Usuario no existe")
            }
            else
            {
                datos=JSON.parse(xhr.responseText);

                console.log(datos.id + "      " + datos.vida + "       " + datos.posX + "       " + datos.posY + "          " + datos.pocion_corteza);
                localStorage.setItem("usuario", datos.usuario);
                localStorage.setItem("vida", datos.vida);
                localStorage.setItem("posX", datos.posX);
                localStorage.setItem("posY", datos.posY);
                localStorage.setItem("manzanas", datos.manzanas);
                localStorage.setItem("pocion_corteza", datos.pocion_corteza);
                localStorage.setItem("pocion_velocidad", datos.pocion_velocidad);
                localStorage.setItem("semilla_explosiva", datos.semilla_explosiva);
                localStorage.setItem("energia_verde", datos.energia_verde);
                localStorage.setItem("energia_azul", datos.energia_azul);
                localStorage.setItem("energia_morada", datos.energia_morada);
                localStorage.setItem("noldor", datos.noldor);
                localStorage.setItem("rana", datos.rana);
                localStorage.setItem("arbol1", datos.arbol1);
                localStorage.setItem("arbol2", datos.arbol2);
                localStorage.setItem("arbol3", datos.arbol3);
                localStorage.setItem("arbol4", datos.arbol4);
                localStorage.setItem("arbol5", datos.arbol5);
                localStorage.setItem("arbol6", datos.arbol6);
                localStorage.setItem("nivelArbol", datos.nivelArbol);
                localStorage.setItem("animal1", datos.animal1);
                localStorage.setItem("animal2", datos.animal2);
                localStorage.setItem("animal3", datos.animal3);
                localStorage.setItem("animal4", datos.animal4);
                localStorage.setItem("animal5", datos.animal5);
                localStorage.setItem("animal6", datos.animal6);
                localStorage.setItem("animal7", datos.animal7);
                localStorage.setItem("animal8", datos.animal8);
                localStorage.setItem("nivelAnimal", datos.nivelAnimal);
                localStorage.setItem("lago1", datos.lago1);
                localStorage.setItem("lago2", datos.lago2);
                localStorage.setItem("lago3", datos.lago3);
                localStorage.setItem("lago4", datos.lago4);
                localStorage.setItem("nivelLago", datos.nivelLago);
               //posX = parseInt(datos.posX, 10);
                //posY = parseInt(datos.posY, 10);

               /* estadisticas.vidaDatos.call(this,datos.vida);

                personaje.ani.x = parseInt(datos.posX, 10);
                personaje.ani.y = parseInt(datos.posY, 10);*/

                window.location = "https://feybosque2.herokuapp.com/game.html";
                //document.location="http://localhost/feyheroku/web/game.html";
                // personaje.ani.x = pruebaX;
                //console.log(personaje.ani.x);
            }

        }
        else if (xhr.status !== 200) {
            console.log('Algo ha fallado: ' + xhr.status);
        }
    };

   // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.open('GET', urlllamada);
    xhr.send();
    //xhr.send('id='+variable) //Con esto envias datos al fichero php
    console.log("Parte 1 llega");

    //console.log('El contadorM tiene un valor de:'+contadorM);
}
window.crear = function ()
{

    var urlllamada = 'php/guardarusuario.php?usuario=' + document.getElementById("input1").value + "&contra=" + document.getElementById("input2").value;


    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() 
    {

        if(xhr.readyState == 4 && xhr.status == 200) 
        {
            //alert(xhr.responseText);
            if(xhr.responseText == "El usuario ya existe")
            {
                alert("El usuario ya existe")
            }
            else if (xhr.responseText == "El usuario se ha registrado")
            {
                alert("El usuario ha sido registrado");
            }

        }
        else if (xhr.status !== 200) {
            console.log('Algo ha fallado: ' + xhr.status);
        }
    };
    xhr.open('GET', urlllamada);
    xhr.send();

}