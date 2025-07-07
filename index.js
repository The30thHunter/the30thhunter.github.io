
$(document).ready(function () {
  $("#myBtn").click(function () {
    $("#myModal").modal();
  });
});


function valida_input_rut(rut) {
  let regex = /^[0-9]+-[0-9kK]$/;
  return regex.test(rut)
}

//validacion de edad
function Valida_edad(edad) {
  let max = 60
  let min = 18
  return edad >= min && edad <= max
}

//validacion de email con exprecion regular
function Valida_email(email) {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}

//validacion de que no haya numeros en el nombre
function valida_nombres(nombre) {
  let regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:[ -][A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/
    ;
  return regex.test(nombre)
}

//Validacion de rut
function validarRut(rut) {
  rut = rut.replace(/\-/g, '');

  var cuerpo = rut.slice(0, -1);
  var dv = rut.slice(-1).toUpperCase();

  if (cuerpo.length < 7) return false;

  var suma = 0;
  var multiplo = 2;

  for (var i = 1; i <= cuerpo.length; i++) {
    var index = multiplo * rut.charAt(cuerpo.length - i);
    suma += index;
    if (multiplo < 7) multiplo += 1;
    else multiplo = 2;
  }

  var dvEsperado = 11 - (suma % 11);
  dv = (dv == 'K') ? 10 : dv;
  dv = (dv == 0) ? 11 : dv;

  return dvEsperado == dv;
}

//funcion de recuperacion de elementos del formulario para la validacion
document.getElementById('Formulario').addEventListener('submit', function (event) {
  let errores = []
  let nombre = document.getElementById('nombre').value
  let correo = document.getElementById('email').value
  let edad = document.getElementById('edad').value
  let rut = document.getElementById('rut').value

  if (!valida_input_rut(rut)) {
    errores.push('El rut no se ha ingresado correctamente')
  }

  if (!validarRut(rut)) {
    errores.push('El rut ingresado no es valido')
  }

  //Refierase a la funcion
  if (!Valida_edad(edad)) {
    errores.push('La edad debe ser un valor entre 18 y 60')
  }

  //Refierase a la funcion
  if (!Valida_email(correo)) {
    errores.push('El correo esta incorrecto, el correo debe tener un dominio y una extencion de al menos 2 letras')
  }

  //Refierase a la funcion
  if (!valida_nombres(nombre)) {
    errores.push('El nombre no puede contener numeros')
  }

  //comprobacion de que no haya errores, si los hay se cancela el envio y los muestra en pantalla
  if (errores.length > 0) {
    event.preventDefault();
    document.getElementById('errores').innerHTML = errores.join('<br>');
  }
})

