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

  function Distancia(valor,tipo)
  {
    console.log("Accedo a clase Distancia");
    Medida.call(this,valor,tipo);
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
      return c_tof;
    }
    this.toKelvin = function()
    {
      console.log("Cambiando a Kelvin...");
      c_tok = (valor + 273.15);
      return t_tok;
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
      return k_toC;
    }
    this.toFarenheit = function()
    {
      console.log("Cambiando a Farenheit...");
      k_toF = (k_toC * 9/5) + 32;
      return k_toF;
    }
  }

  function Kilometro(valor)
  {
    Distancia.call(this,valor,'Km');
    this.toM = function()
    {
        return valor * 1000;
    }
    this.toCm = function()
    {
        return valor * 10000;
    }
    this.toMm = function()
    {
        return valor * 1000000;
    }
  }

  function Centimetro(valor)
  {
    Distancia.call(this,valor,'cm');
    this.toM = function()
    {
      return valor / 100;
    }
    this.toKm = function()
    {
      return valor / 10000;
    }
    this.toMm = function()
    {
      return valor * 10;
    }
  }

  function Metro(valor)
  {
      Distancia.call(this,valor,'m');
      this.toKm = function()
      {
          return valor / 1000;
      }
      this.toCm = function()
      {
          return valor * 100;
      }
      this.toMm = function()
      {
          return valor * 1000;
      }

  }

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;
  exports.Distancia = Distancia;
  exports.Metro = Metro;
  exports.Centimetro = Centimetro;
//  exports.KiloMetro = Kilometro;

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
              var metro = new Metro(numero);
              console.log("Valor: "+metro.valor);
              console.log("Metro: "+metro.valor+",Km:"+metro.toKm());
              console.log("Metro: "+metro.valor+",Cm:"+metro.toCm());
              console.log("Metro: "+metro.valor+",Mm:"+metro.toMm());
              elemento.innerHTML = metro.toKm() + " Km" + ", " + metro.toCm() + " Cm" + ", " + metro.toMm() + " Mm";
             break;
             case 'cm':
               var centimetro = new Centimetro(numero);
               console.log("Valor: "+centimetro.valor);
               console.log("Centimetro: "+centimetro.valor+",Km:"+centimetro.toKm());
               console.log("Centimetro: "+centimetro.valor+",m:"+centimetro.toM());
               console.log("Centimetro: "+centimetro.valor+",Mm:"+centimetro.toMm());
               elemento.innerHTML = centimetro.toKm() + " Km" + ", " + centimetro.toM() + " m" + ", " + centimetro.toMm() + " Mm";
              break;

            case 'km':
              var kilometro = new Kilometro(numero);
              console.log("Valor: "+kilometro.valor);
              console.log("KiloMetro: "+kilometro.valor+",M:"+kilometro.toM());
              console.log("KiloMetro: "+kilometro.valor+",Cm:"+kilometro.toCm());
              console.log("KiloMetro: "+kilometro.valor+",Mm:"+kilometro.toMm());
              elemento.innerHTML = kilometro.toM() + " m" + ", " + kilometro.toCm() + " Cm" + ", " + kilometro.toMm() + " Mm";
             break;
    	default:
              /* rellene este código */
              elemento.innerHTML = "La unidad de medida de introducida es desconocida. Intentelo de nuevo";
        }
    }
    else
      elemento.innerHTML = "";

    }

})(this);
