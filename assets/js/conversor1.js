(function(exports) {
  "use strict";
  console.log("Carga de la funcion principal");


  function Medida(valor,tipo)
  {
    console.log("Accedo a clase Medida");
    this.valor = valor || 0;
    this.tipo  = tipo  || "Sin tipo";
    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km"  ) */
  }
  Medida.constructor = Medida;

// ----------------------------------------------------- //

  function Temperatura(valor,tipo)
  {
    console.log("Accedo a clase Temperatura");
    Medida.call(this,valor,tipo);
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
  }
  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;

// ----------------------------------------------------- //

  function Distancia(valor,tipo)
  {
    console.log("Accedo a clase Distancia");
    Medida.call(this,valor,tipo);
  }
  Distancia.prototype = new Medida();
  Distancia.prototype.constructor = Distancia;
  
// ----------------------------------------------------- //

  function Volumen(valor,tipo)
  {
    console.log("Accedo a clase Volumen");
    Medida.call(this,valor,tipo);
  }
  Volumen.prototype = new Medida();
  Volumen.prototype.constructor = Volumen;

// ----------------------------------------------------- //

  function Celsius(valor)
  {
    var c_tof = 0;
    var c_tok = 0;
    console.log("Accedo a clase Celsius");
    Temperatura.call(this,valor,'c');
  }
  Celsius.prototype = new Temperatura;
  Celsius.prototype.constructor = Celsius;
  Celsius.prototype.toFarenheit = function()
  {
    var c_tof = (this.valor * 9/5) + 32;
    return c_tof;
  }
  Celsius.prototype.toKelvin = function()
  {
    var c_tok = (this.valor + 273.15);
    return c_tok;
  }
// ----------------------------------------------------- //
  function Farenheit(valor)
  {
    var f_toC = 0;
    var f_toK = 0;
    console.log("Accedo a la clase Fahrenheit.");
    Temperatura.call(this,valor,'f');
  }
  Farenheit.prototype = new Temperatura;
  Farenheit.prototype.constructor = Farenheit;
  Farenheit.prototype.toCelsius = function()
  {
      var f_toC = (this.valor - 32) * 5/9;
      return f_toC;
  }
  Farenheit.prototype.toKelvin = function()
  {
    var f_toK = (this.toCelsius() + 273.15);
    return f_toK;
  }

// ----------------------------------------------------- //

  function Kelvin(valor)
  {
    var k_toC = 0;
    var k_toF = 0;
    console.log("Accedo a clase Kelvin");
    Temperatura.call(this,valor,'k');
  }
  Kelvin.prototype = new Temperatura;
  Kelvin.prototype.constructor = Kelvin;
  Kelvin.prototype.toCelsius = function()
  {
    var k_toC = (this.valor - 273.15);
    return k_toC;
  }
  Kelvin.prototype.toFarenheit = function()
  {
    var k_toF = (this.toCelsius() * 9/5) + 32;
    return k_toF;
  }
// ----------------------------------------------------- //

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

// ----------------------------------------------------- //

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

// ----------------------------------------------------- //

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

// ----------------------------------------------------- //

  function Pulgada(valor){
    Distancia.call(this,valor,'in');
    this.toIn = function()
    {
      return valor * 0.39370;
    }
    this.toCm = function()
    {
      return valor / 0.39370;
    }

  }

// ----------------------------------------------------- //

  function Metro3(valor)
  {
    Volumen.call(this,valor,'metro cubico');
    this.toLitro = function()
    {
      return valor * 1000;
    }
    this.toCm3 = function()
    {
      return valor * 1000000;
    }
    this.toMm3 = function()
    {
      return valor * 1000000000;
    }
  }

// ----------------------------------------------------- //

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;
  exports.Distancia = Distancia;
  exports.Metro = Metro;
  exports.Centimetro = Centimetro;
  exports.KiloMetro = Kilometro;
  exports.Pulgada = Pulgada;
  exports.Volumen = Volumen;
  exports.Metro3 = Metro3;

    exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp = /^\s*([-+]?\d+(?:\.\d*)?(?:e[+-]?\d+)?)\s*([kmc]?m(3)?|(in)|k([e]|(e)[l]?|(el)[v]?|(elv)[i]?|(elvi)[n]?)?|[c]([e]|[e][l]?|(el)[s]?|(els)[i]?|(elsi)[u]?|(elsiu)[s]?)?|[f]([a]|[a][r]?|(ar)[e]?|(are)[n]?|(aren)[h]?|(arenh)[e]?|(arenhe)[i]?|(arenhei)[t]?)?)\s*(to)?\s+([c]([e]|[e][l]?|(el)[s]?|(els)[i]?|(elsi)[u]?|(elsiu)[s]?)?|[f]([a]|[a][r]?|(ar)[e]?|(are)[n]?|(aren)[h]?|(arenh)[e]?|(arenhe)[i]?|(arenhei)[t]?)?|k([e]|(e)[l]?|(el)[v]?|(elv)[i]?|(elvi)[n]?)?|[kmc]?m(3)?|l(i(t(r(o(s)?)?)?)?)?|(in))$/i,
        valor     = valor.match(regexp);
    //regexp = ^\s*([-+]?\d+(?:\.\d*)?(?:e[+-]?\d+)?)\s*(f(a(r(e(n(h(e(i(t)?)?)?)?)?)?)?)?|(c(e(l(s(i(u(s)?)?)?)?)?)?)|(k(e(l(v(i(n)?)?)?)?)?)|m)\s*(to)?\s+(c(e(l(s(i(u(s)?)?)?)?)?)?|k(e(l(v(i(n)?)?)?)?)?|f(a(r(e(n(h(e(i(t)?)?)?)?)?)?)?)?|([kmc]?[m]))$/i
    //regexp    = /^\s*([-+]?\d+(?:\.\d*)?(?:e[+-]?\d+)?)\s*([f]([a]|[a][r]?|(ar)[e]?|(are)[n]?|(aren)[h]?|(arenh)[e]?|(arenhe)[i]?|(arenhei)[t]?)?)\s*(to)?\s*([c]([e]|[e][l]?|(el)[s]?|(els)[i]?|(elsi)[u]?|(elsiu)[s]?)?)?$/i,

    if (valor) {
      var numero = valor[1],
      tipo = valor[2].toLowerCase();
      var destino = null;
      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);

      destino = valor[23];
      destino = destino.toLowerCase();

      switch (tipo) {
            case 'c':
              var celsius = new Celsius(numero);

              if(destino.startsWith("k"))
                  elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
              else
              {
                if(destino.startsWith("f"))
                  elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
                else
                {
                  elemento.innerHTML = "Introduzca la unidad de destino(Farenheit|Kelvin)";
                }
              }

              break;
            case 'f':
              var farenheit = new Farenheit(numero);

              if(destino.startsWith("c"))
                  elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
              else
              {
                if(destino.startsWith("k"))
                    elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
                else
                {
                    elemento.innerHTML = "Introduzca la unidad de destino(Celsius|Kelvin)";
                }
              }
              break;
            case 'k':
    	       var kelvin = new Kelvin(numero);
             if(destino.startsWith("c"))
                 elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
             else
             {
               if(destino.startsWith("f"))
               {
                   elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
               }
               else
               {
                 elemento.innerHTML = "Introduzca la unidad de destino correctamente(Celsius|Farenheit)";
               }
             }
    	       break;

            case 'm':
              var metro = new Metro(numero);

              if(destino == "km")
                  elemento.innerHTML = metro.toKm() + " Km.";
              else
              {
                if(destino == "cm")
                    elemento.innerHTML = metro.toCm() + " cm.";
                else
                {
                  if(destino == "mm")
                    elemento.innerHTML = metro.toMm() + " mm.";
                  else
                    elemento.innerHTML = "Introduzca la unidad de destino correctamente(Km|cm|mm)";
                }
              }
     	       break;
             case 'cm':
               var centimetro = new Centimetro(numero);
               switch (destino) {
                  case 'km':
                    elemento.innerHTML = centimetro.toKm() + " Km.";
                  break;
                  case 'm':
                    elemento.innerHTML = centimetro.toM() + " m.";
                  break;
                  case 'mm':
                    elemento.innerHTML = centimetro.toMm() + " mm.";
                  break;
                  case 'in':
                    elemento.innerHTML = pulgada.toIn() + " In."
                  break;
                  default:
                    elemento.innerHTML = "Introduzca la unidad de destino(Km|m|mm)";
               }
            break;
            case 'km':
              var kilometro = new Kilometro(numero);
              if(destino == "m")
                  elemento.innerHTML = kilometro.toM() + " m";
              else
              {
                if(destino == "cm")
                    elemento.innerHTML = kilometro.toCm() + " cm";
                else
                {
                  if(destino == "mm")
                    elemento.innerHTML = kilometro.toMm() + " mm.";
                  else
                    elemento.innerHTML = "Introduzca la unidad de destino correctamente(m|cm|mm)";
                }
              }
             break;

            case 'in':
              var pulgada = new Pulgadas(numero);
              elemento.innerHTML = pulgada.toCm() + " cm";
            break;

            case 'm3':
              var metro3 = new Metro3(numero);
              if(destino.startsWith("l"))
                  elemento.innerHTML = metro3.toLitro() + " Litros";
              else
              {
                if(destino == "cm3")
                    elemento.innerHTML = metro3.toCm3() + " cm3";
                else
                {
                  if(destino == "mm3")
                    elemento.innerHTML = metro3.toMm3() + " mm3.";
                  else
                    elemento.innerHTML = "Introduzca la unidad de destino correctamente(litro|cm3|mm3)";
                }
              }
            break;

    	default:
              elemento.innerHTML = "La unidad de medida de conversión introducida es desconocida. Inténtelo de nuevo";
        }
    }
    else
      elemento.innerHTML = "Error! Pruebe algo como '3C to K' o '3C Kelvin'";

    }
})(this);
