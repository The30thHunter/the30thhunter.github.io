
//Funcion para consultar a la api tolera errores y cuando la persona deseada no esta disponible, de tener un error se lanza al log de la pagina
function consulta(apiUrl) {
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.detail == 'Persona not found') {
                alert("Persona no encontrada, es probable que haya escrito mal el nombre o no este en la api")
            }
            else {
                document.getElementById("id").textContent = 'ID: ' + data.id;
                document.getElementById("name").textContent = 'Nombre de la persona: ' + data.name;
                document.getElementById("arcana").textContent = 'Arcana de la persona: ' + data.arcana;
                document.getElementById("description").textContent = 'Descripcion de la persona: ' + data.description;
                document.getElementById("image").src = data.image;
            }
        }).catch(error => { alert("La api no se encuentra disponible"); console.error("Error:", error) });
}


//funcion para comprobar que el nombre no contenga numeros ni este vacio, y arregar el input de una forma que lo acepte la api
function comprobarArreglarNombre(nombre) {
    if (!nombre) {
        return false
    }
    const regex = /^[^0-9]+$/;
    let valido = (regex.test(nombre))
    if (valido) {
        nombre = nombre.toLowerCase().replace(/\s+/g, "-")
        let url = "https://cors-anywhere.herokuapp.com/https://persona-compendium.onrender.com/personas/" + nombre
        return url
    }
    else {
        return false
    }
}

//funcion para obtener el input y arreglar la informacion mostrada en el html
function actualizarURL() {
    let input = document.getElementById('Buscador').value
    let url = comprobarArreglarNombre(input)
    if (url == false) {
        alert("El nombre de las personas no tiene numeros, o el input esta vacio, no se realizara el cambio de informacion")
    }
    else {
        apiUrl = url
        consulta(apiUrl)
    }
}

