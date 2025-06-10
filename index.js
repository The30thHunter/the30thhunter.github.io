//Define en que imagen empieza
let slideIndex = 1;
showSlides(slideIndex);

// Controlador para siguiente/anterior
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// controlador de la imagen actual
function currentSlide(n) {
  showSlides(slideIndex = n);
}

//Funcion carrusel
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  //estos dos if evitan que el carrucel se salga de las imajenes que tiene
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  //determina cuantos puntos hay
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  //muestra la imagen correcta desde el indes del carrucel
  slides[slideIndex - 1].style.display = "block";
}

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
  let regex = /^[a-zA-Z]+$/;
  return regex.test(nombre)
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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

