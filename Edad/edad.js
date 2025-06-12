function encriptarTexto() {
    var textoOriginal = document.getElementById('textoOriginal').value;
    var clave = "MiClaveSecreta";

    var textoCifrado = CryptoJS.AES.encrypt(textoOriginal, clave).toString();

    document.getElementById('textoCifrado').innerHTML = "Texto cifrado: " + textoCifrado;
}

function calcularEdad() {
    var fechaActual = new Date();
    var fechaNac = new Date(document.getElementById('fechaNacimiento').value);

    var edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    if (edad<=0){
        document.getElementById('resultado').innerHTML = "Su edad es negativa por lo cual no es posible que esa sea su edad de nacimiento, despues de todo no hubiera nacido aun.";
        return;
    }

    if (fechaActual.getMonth() < fechaNac.getMonth() || (fechaActual.getMonth() == fechaNac.getMonth() && fechaActual.getDate() < fechaNac.getDate())) {
        edad--;
    }

    document.getElementById('resultado').innerHTML = "La edad es: " + edad + " años.";
}