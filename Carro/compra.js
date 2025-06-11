function actualizarCarrito() {
    //con esta linea convertimos el json que esta en el local storage, en un array que podemos trabajar
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    //Recuperamos el contenedor del carro
    let contenedor = document.getElementById("listaCarrito");
    //vaciar lista
    contenedor.innerHTML = "";
    //establecemos el total como 0 para empezar sin ningun valor anterior
    let totalCompra = 0;
    //empezamos a armar las filas de la lista con los contenidos del carrito, como el carrito no tiene items repetidos podemos usar el for
    carrito.forEach((producto) => {
        let fila = document.createElement("tr");

        fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>
        <button onclick="cambiarCantidad(${producto.id}, -1)">-</button>
        ${producto.cantidad}
        <button onclick="cambiarCantidad(${producto.id}, 1)">+</button>
      </td>
      <td>$${producto.precio * producto.cantidad}</td>
      <td><button onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
    `;
        //añadimos la fila al final y despues repetimos hasta que no quede ningun articulo en el array
        contenedor.appendChild(fila);
        // Acumulamos el total de la compra
        totalCompra += producto.precio * producto.cantidad;
    });

    // Agregar la fila final con el total de la compra
    let filaTotal = document.createElement("tr");
    filaTotal.innerHTML = `
    <td colspan="3"><strong>Total:</strong></td>
    <td><strong>$${totalCompra}</strong></td>
    <td><button id="myBtn" class="Bmodal" onclick="mostrarModal()">Comprar</button></td>
  `;
    contenedor.appendChild(filaTotal);
}

// Función para cambiar la cantidad de productos
function cambiarCantidad(id, cambio) {
    //recuperamos el json del localstorage y lo convertimos en array, si no existe se utiliza un vacio, para evitar errores mas que nada
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    //mapeo el array y comparo hasta encontrar el producto con el id que le entrege a la funcion
    carrito = carrito.map((producto) => {
        if (producto.id === id) {
            producto.cantidad = Math.max(1, Math.min(5, producto.cantidad + cambio)) // Evita cantidades menores a 1 y cantidades sobre 5
        }
        return producto;
    });
    //guarda los cambios al carrito
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito(); // Actualiza la vista
}

// Función para eliminar un producto
function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter((producto) => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function mostrarModal() {
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


//validacion de que en la direccion haya al menos un numero y una letra
function valida_direccion(direccion) {
    let regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    return regex.test(direccion)
}

//funcion de recuperacion de elementos del formulario para la validacion
document.getElementById('Compra').addEventListener('submit', function (event) {
    let errores = []
    let correo = document.getElementById('email').value
    let nombre = document.getElementById('nombre').value
    let direccion = document.getElementById('Direccion').value
    //Refierase a la funcion
    if (!Valida_email(correo)) {
        errores.push('El correo esta incorrecto, el correo debe tener un dominio y una extencion de al menos 2 letras')
    }
    //Refierase a la funcion
    if (!valida_direccion(direccion)) {
        errores.push('La direccion debe contener al menos un numero y una letra')
    }
    //Refierase a la funcion
    if (!valida_nombres(nombre)) {
        errores.push('El nombre no puede contener numeros')
    }
    if (errores.length > 0) {
        //se detiene el codigo si hay errores
        event.preventDefault();
        document.getElementById('errores').innerHTML = errores.join('<br>');
        return;
    }

    //aqui calculo el total de los articulos en el carrito usando concatenaciones con el .reduce
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalCompra = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

    // Confirmación de la compra y detiene el envio si el usuario cancela
    if (!confirm("El coste total asciende a $" + totalCompra + " ¿Deseas continuar con la compra?")) {
        event.preventDefault();
        return;
    }

    // Si todo está correcto, muestra alerta de éxito y elimina el contenido del carrito
    alert("El pedido ha sido colocado, revisa tu correo para coordinar el pago.");
    carrito = []
    localStorage.setItem("carrito", JSON.stringify(carrito));
});


