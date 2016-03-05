(function(exports) {
  "use strict";
  console.log("Carga de la funcion principal");
  function Medida(valor,tipo)
  {
    console.log("Accedo a clase Medida");
    this.valor = valor || 0;
    this.tipo  = tipo  || "Sin tipo";
    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km") */
  }

  function Temperatura(valor,tipo)
  {
    console.log("Accedo a clase Temperatura");
    Medida.call(this,valor,tipo);
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
  }

  function Celsius(valor)
  {
    var c_tof = 0;
    var c_tok = 0;
    console.log("Accedo a clase Celsius");
    Temperatura.call(this,valor,'c');
    this.toFarenheit = function()
    {
      console.log("Cambiando a Farenheit...");
      c_tof = (valor * 9/5) + 32;
      return (valor * 9/5) + 32;
    }
    this.toKelvin = function()
    {
      console.log("Cambiando a Kelvin...");
      c_tok = (valor + 273.15);
      return (valor + 273.15);
    }
  }

  function Farenheit(valor)
  {
    var f_toC = 0;
    var f_toK = 0;
    console.log("Accedo a la clase Fahrenheit.");
    Temperatura.call(this,valor,'f');
    this.toCelsius = function()
    {
      console.log("Cambiando a Celsius...");
      f_toC = (valor - 32) * 5/9;
      return f_toC;
    }
    this.toKelvin = function()
    {
      console.log("Cambiando a Kelvin...");
      f_toK = (f_toC + 273.15); 
      return f_toK;
    }
    
  }

  function Kelvin(valor)
  {
    var k_toC = 0;
    var k_toF = 0;
    console.log("Accedo a clase Kelvin");
    Temperatura.call(this,valor,'k');
    this.toCelsius = function()
    {
      console.log("Cambiando a Celsius...");
      k_toC = (valor - 273.15);
      return (valor - 273.15);
    }
    this.toFarenheit = function()
    {
      console.log(contador);
      console.log("Cambiando a Farenheit...");
      k_toF = (k_toC * 9/5) + 32;
      return (k_toC * 9/5) + 32;
    }
  }

  function Metro(valor)
  {

  }

  function Centimetros(valor)
  {


  }

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;

    exports.convertir = function() {
    console.log("Entre en convertir");
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i,
        valor     = valor.match(regexp);

    if (valor) {
      var numero = valor[1],
      tipo = valor[2].toLowerCase();
      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          console.log("Valor: "+celsius.valor);
          console.log("Celsius: "+celsius.valor+",Farenheit:"+celsius.toFarenheit());
          console.log("Celsius: "+celsius.valor+",Kelvin:"+celsius.toKelvin());
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
 	        elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius" + ", " + farenheit.toKelvin().toFixed() + " Kelvin";
          break;
        case 'k':
	       var kelvin = new Kelvin(numero);
         console.log("Valor: "+kelvin.valor);
         console.log("Kelvin: "+kelvin.valor+",Celsius:"+kelvin.toCelsius());
         console.log("Kelvin: "+kelvin.valor+",Farenheit:"+kelvin.toFarenheit());
 	       elemento.innerHTML = kelvin.toCelsius() + " Celsius" + ", " + kelvin.toFarenheit() + " Farenheit";

	  break;
	case 'm':

	   break;
	default:
          /* rellene este código */
      }
    }
    else
      elemento.innerHTML = "";
  }

})(this);
