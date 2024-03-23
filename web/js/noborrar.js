function primerguardado()
{
	if(!primeraCarga)
	{
		var urlllamada = '/php/primerguardado.php';

		var xhr = new XMLHttpRequest();

		xhr.open('POST',urlllamada, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function() 
		{

	    	if(xhr.readyState == 4 && xhr.status == 200) 
	    	{
	        	console.log("Aquí llega")
	        if(xhr.responseText == "Datos guardados")
	        {
	            console.log("Los datos se han guardado correctamente");
	        }
	        else if (xhr.responseText == "Error")
	        {
	            console.log("Error");
	        }

	    	}
	    	else if (xhr.status !== 200) 
	    	{
	        	console.log('Algo ha fallado: ' + xhr.status);
	    	}
		};
			xhr.send("noldor=" + darEnergia + "&rana=" + muchoTexto + "&manzanas=" + inventario.contadorM + "&pocion_corteza=" + inventario.contadorC + "&pocion_velocidad=" + inventario.contadorV + "&semilla_explosiva=" + inventario.contadorB + "&usuario=" + usuarioActivo);

			primeraCarga = true;
			//alert(this.responseText);
	}

}