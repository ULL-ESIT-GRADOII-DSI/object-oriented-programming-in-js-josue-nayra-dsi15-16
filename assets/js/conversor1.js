(function(exports) {
  "use strict";
  console.log("Carga de la funcion principal");

  function match_regexp(valor)
  {
    console.log("match_regexp");
    console.log("valor->"+valor);
    //var regexp = /^\s*([-+]?\d+(?:\.\d*)?(?:e[+-]?\d+)?)\s*([kmc]?m(3)?|(in)|k([e]|(e)[l]?|(el)[v]?|(elv)[i]?|(elvi)[n]?)?|[c]([e]|[e][l]?|(el)[s]?|(els)[i]?|(elsi)[u]?|(elsiu)[s]?)?|[f]([a]|[a][r]?|(ar)[e]?|(are)[n]?|(aren)[h]?|(arenh)[e]?|(arenhe)[i]?|(arenhei)[t]?)?)\s*(to)?\s+([c]([e]|[e][l]?|(el)[s]?|(els)[i]?|(elsi)[u]?|(elsiu)[s]?)?|[f]([a]|[a][r]?|(ar)[e]?|(are)[n]?|(aren)[h]?|(arenh)[e]?|(arenhe)[i]?|(arenhei)[t]?)?|k([e]|(e)[l]?|(el)[v]?|(elv)[i]?|(elvi)[n]?)?|[kmc]?m(3)?|l(i(t(r(o(s)?)?)?)?)?|(in))$/i;
    var regexp = XRegExp('^(\\s*)                                         ' +
                    '(?<valor> [-+]?[0-9]+(?:\.[0-9]+)?(?:e[+-]?[0-9]+)?) ' +
                    '(\\s*)                                               ' +
                    '(?<tipo> ([fck]|in|(k|m|c)?m(3)?))                   ' +
                    '(\\s*)                                               ' +
                    '(to)?                                                ' +
                    '(\\s*)                                               ' +
                    '(?<to> ([fck]|(k|m|c)?m(3)?|in|l))                   ' +
                    '(\\s*)$','ix');
    //res = valor.match(regexp);
    var res = XRegExp.exec(valor,regexp);
    console.log("Res->"+res);
    return res;
  }

  function Medida(valor,tipo)
  {
    console.log("Accedo a clase Medida");
    if(valor)
    {
      if(tipo)
      {
        this.valor = valor || 0;
        //this.tipo  = tipo  || "Sin tipo";
        this.tipo  = tipo  || "Sin tipo";
      }
      else
      {
        console.log("Else sin tipo");
        var expresion;
        expresion = match_regexp(valor);
        console.log("Expresion:"+expresion);
        var numero = expresion[1];
        numero = parseFloat(numero);
        var tipo = expresion[2];
        tipo = tipo.toLowerCase();
        this.valor = numero;
        this.tipo = tipo;
        console.log("Valor: " + this.valor + ", Tipo: " + this.tipo);
      }
    }
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

  }
  Kilometro.prototype = new Distancia;
  Kilometro.prototype.constructor = Kilometro;
  Kilometro.prototype.toM = function()
  {
    return this.valor * 1000;
  }
  Kilometro.prototype.toCm = function()
  {
    return this.valor * 10000;
  }
  Kilometro.prototype.toMm = function()
  {
    return this.valor * 1000000;
  }

// ----------------------------------------------------- //

  function Centimetro(valor)
  {
    Distancia.call(this,valor,'cm');

  }
  Centimetro.prototype = new Distancia;
  Centimetro.prototype.constructor = Centimetro;
  Centimetro.prototype.toM = function()
  {
    return this.valor / 100;
  }
  Centimetro.prototype.toKm = function()
  {
    return this.valor / 10000;
  }
  Centimetro.prototype.toMm = function()
  {
    return this.valor * 10;
  }
  Centimetro.prototype.toIn = function()
  {
    return this.valor * 0.39370;
  }

// ----------------------------------------------------- //

  function Metro(valor)
  {
    Distancia.call(this,valor,'m');
  }
  Metro.prototype = new Distancia;
  Metro.prototype.constructor = Metro;
  Metro.prototype.toKm = function()
  {
    return this.valor / 1000;
  }
  Metro.prototype.toCm = function()
  {
    return this.valor * 100;
  }
  Metro.prototype.toMm = function()
  {
    return this.valor * 1000;
  }

// ----------------------------------------------------- //

  function Pulgada(valor){
    Distancia.call(this,valor,'in');
  }
  Pulgada.prototype = new Distancia;
  Pulgada.prototype.constructor = Pulgada;
  Pulgada.prototype.toCm = function()
  {
      return this.valor / 0.39370;
  }

// ----------------------------------------------------- //

  function Metro3(valor)
  {
    Volumen.call(this,valor,'metro cubico');
  }
  Metro3.prototype = new Volumen;
  Metro3.prototype.constructor = Metro3;
  Metro3.prototype.toLitro = function()
  {
      return this.valor * 1000;
  }
  Metro3.prototype.toCm3 = function()
  {
      return this.valor * 1000000;
  }
  Metro3.prototype.toMm3 = function()
  {
      return this.valor * 1000000000;
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
      //var medida = new Medida("45km");
  /*  var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        /*regexp = /^\s*([-+]?\d+(?:\.\d*)?(?:e[+-]?\d+)?)\s*([kmc]?m(3)?|(in)|k([e]|(e)[l]?|(el)[v]?|(elv)[i]?|(elvi)[n]?)?|[c]([e]|[e][l]?|(el)[s]?|(els)[i]?|(elsi)[u]?|(elsiu)[s]?)?|[f]([a]|[a][r]?|(ar)[e]?|(are)[n]?|(aren)[h]?|(arenh)[e]?|(arenhe)[i]?|(arenhei)[t]?)?)\s*(to)?\s+([c]([e]|[e][l]?|(el)[s]?|(els)[i]?|(elsi)[u]?|(elsiu)[s]?)?|[f]([a]|[a][r]?|(ar)[e]?|(are)[n]?|(aren)[h]?|(arenh)[e]?|(arenhe)[i]?|(arenhei)[t]?)?|k([e]|(e)[l]?|(el)[v]?|(elv)[i]?|(elvi)[n]?)?|[kmc]?m(3)?|l(i(t(r(o(s)?)?)?)?)?|(in))$/i,
        valor     = valor.match(regexp);*/

    var valor = document.getElementById('convert').value;
    var elemento = document.getElementById('converted');
    valor = match_regexp(valor);

    if (valor) {
      var numero = valor.valor;
      var tipo = valor.tipo;
      tipo = tipo.toLowerCase();
      var destino = valor.to;
      destino = destino.toLowerCase();

      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo+", Destino:" + destino);

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
                    elemento.innerHTML = centimetro.toIn() + " In."
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
              var pulgada = new Pulgada(numero);
              elemento.innerHTML = pulgada.toCm().toFixed(4) + " cm";
            break;

            case 'm3':
              var metro3 = new Metro3(numero);
              if(destino == "l")
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
