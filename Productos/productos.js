
function agregarCarro(id) {
    //con el id, uno el string para que coincida con los id a buscar
    let valor_id = "valor_" + id
    let nombre_id = "Name_" + id
    //recupero los contenidos de los valores y nombres, quitandole el '$' a los valores para poder trabajarlos en compra.js
    let valor = document.getElementById(valor_id).textContent.replace("$", "")
    let nombre = document.getElementById(nombre_id).textContent
    let compra = { "id": id, "nombre": nombre, "precio": valor, "cantidad": 1 }
    //recupero el carrito y lo tranformo en un array utilizable
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    //reviso que el producto no se encuentre ya en el carrito, si se encuentra solo agrego una unidad mas, hasta tener solo 5 unidades
    let productoExistente = carrito.find(producto => producto.id === id);
    if (productoExistente) {
        if (productoExistente => 5) {
            alert("No se permiten comprar mas de 5 articulos de cada producto en una sola compra")
        }
        else {
            productoExistente.cantidad += 1; // Si ya existe, aumenta la cantidad
            alert("Se ha agregado '1' a la cantidad de este articulo en el carro")
        }
    } else {
        carrito.push(compra); // Si no existe, lo agrega
        alert("El producto ha sido agregado al carrito, para mas informacion, presione carro en la esquina superior derecha de la pagina")
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}