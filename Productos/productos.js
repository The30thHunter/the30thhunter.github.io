
//funcion simple de comprovacion de que los valores no esten vacios o sean 0
function comprovacion_vacios(valor1, valor2, valor3) {
    if (valor1 == '' && valor2 == '' && valor3 == '' || valor1 == 0 && valor2 == 0 && valor3 == 0) {
        return true
    }
    else {
        return false
    }
}

//validacion de email con exprecion regular
function Valida_email(email) {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}

//validacion de que no haya numeros en el nombre
function valida_nombres(nombre){
  let regex = /^[a-zA-Z]+$/;
  return regex.test(nombre)
}


//validacion de que en la direccion haya al menos un numero y una letra
function valida_direccion(direccion){
  let regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
  return regex.test(direccion)
}

//funcion de recuperacion de elementos del formulario para la validacion
document.getElementById('Compra').addEventListener('submit', function (event) {
    let errores = []
    var precio1 = 15
    var precio2 = 19
    var precio3 = 20
    var total = 0
    var cant1 = Number(document.getElementById('cantidad_prod1').value)
    var cant2 = Number(document.getElementById('cantidad_prod2').value)
    var cant3 = Number(document.getElementById('cantidad_prod3').value)
    let correo = document.getElementById('email').value
    let nombre = document.getElementById('nombre').value
    let direccion = document.getElementById('Direccion').value
    //Refierase a la funcion
    if (comprovacion_vacios(cant1, cant2, cant3)) {
        event.preventDefault()
        errores.push("No ha comprado nada")
    }
    //suma al total del primer producto, se salta si esta vacio o es 0
    if (!cant1 == 0 || !cant1 == '') {
        var total = total + (cant1 * precio1)
    }
    //suma al total del segundo producto, se salta si esta vacio o es 0
    if (!cant2 == 0 || !cant2 == '') {
        var total = total + (cant2 * precio2)
    }
    //suma al total del tercer producto, se salta si esta vacio o es 0
    if (!cant3 == 0 || !cant3 == '') {
        var total = total + (cant3 * precio3)
    }
    //Refierase a la funcion
    if (!Valida_email(correo)) {
        errores.push('El correo esta incorrecto, el correo debe tener un dominio y una extencion de al menos 2 letras')
    }
    //Refierase a la funcion
    if (!valida_direccion(direccion)){
        errores.push('La direccion debe contener al menos un numero y una letra')
    }
    //Refierase a la funcion
    if (!valida_nombres(nombre)) {
        errores.push('El nombre no puede contener numeros')
    }
    //Pide confirmacion del usuario mostrando el valor total
    if (confirm("El coste total asciende a $" + total + " ¿Eso es correcto?")) {
        //comprobacion de que no haya errores, si los hay se cancela el envio y los muestra en pantalla
        if (errores.length > 0) {
            event.preventDefault();
            document.getElementById('errores').innerHTML = errores.join('<br>');
        } else{
            alert("El pedido ha sido colocado, revise su correo para coordinar el metodo de pago (funcionalidad no implementada)")
        }}
    else {
        //si se cancela al momento de pedir confirmacion, la pagina no envia el formulario y de paso muestra los errores preventivamente
            event.preventDefault()
            document.getElementById('errores').innerHTML = errores.join('<br>')
    }
    })