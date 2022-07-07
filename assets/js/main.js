import Leon from "./Leon.js";
import Lobo from "./Lobo.js";
import Oso from "./Oso.js";
import Serpiente from "./Serpiente.js";
import Aguila from "./Aguila.js";

(async () => {
    try {
        const promesa = await fetch('animales.json')
        const data = await promesa.json()

        //función para obtener imagen previa del animal al seleccionarlo
        getImagenPrevia(data)

        //función para buscar, instanciar y agregar animal en la tabla
        agregarAnimal(data)

        console.log(data)
    }

    catch (error) {
        console.log(error)
    }
})()

//función para obtener imagen previa de animal

const getImagenPrevia = (data) => {

    document.getElementById("animal").addEventListener('change', () => {
        const { animales } = data
        const nombreAnimal = document.getElementById("animal").value
        const encontrarImagen = animales.find((animal) => animal.name == nombreAnimal).imagen
        const imagenAnimal = document.getElementById("preview")
        document.getElementById("preview").setAttribute("class", "mx-auto" )
        imagenAnimal.innerHTML = `<img width="100%" src="assets/imgs/${encontrarImagen}">`
    })
}

let animalesArreglo = []

//función para buscar, instanciar y agregar animal en la tabla

const agregarAnimal = (data) => {

    const { animales } = data
    const btnAgregar = document.getElementById('btnRegistrar')

    btnAgregar.addEventListener("click", () => {
        const nombreAnimal = document.getElementById("animal").value
        const edadAnimal = document.getElementById("edad").value
        const comentariosAnimal = document.getElementById("comentarios").value
        const imagenAnimal = animales.find((animal) => animal.name == nombreAnimal).imagen
        const sonidoAnimal = animales.find((animal) => animal.name == nombreAnimal).sonido

        //validad los datos del formulario

        if (nombreAnimal == "" || edadAnimal == "" || comentariosAnimal == "") {

            alert("Faltan datos por llenar")

        }
        else {

            let nuevoAnimal

            if (nombreAnimal == "Leon") {
                nuevoAnimal = new Leon(nombreAnimal, edadAnimal, imagenAnimal, comentariosAnimal, sonidoAnimal)
            } else if (nombreAnimal == "Lobo") {
                nuevoAnimal = new Lobo(nombreAnimal, edadAnimal, imagenAnimal, comentariosAnimal, sonidoAnimal)
            } else if (nombreAnimal == "Oso") {
                nuevoAnimal = new Oso(nombreAnimal, edadAnimal, imagenAnimal, comentariosAnimal, sonidoAnimal)
            } else if (nombreAnimal == "Serpiente") {
                nuevoAnimal = new Serpiente(nombreAnimal, edadAnimal, imagenAnimal, comentariosAnimal, sonidoAnimal)
            } else if (nombreAnimal == "Aguila") {
                nuevoAnimal = new Aguila(nombreAnimal, edadAnimal, imagenAnimal, comentariosAnimal, sonidoAnimal)
            }

            animalesArreglo.push(nuevoAnimal)
            imprimirTabla()
            limpiar()

            console.log(animalesArreglo)
        }

    })
}

//función para crear cards de fotos de animales con sonido

const imprimirTabla = () => {

    const animalesTabla = document.getElementById('Animales')
    animalesTabla.innerHTML = ""

    animalesArreglo.forEach((animal, i) => {

        animalesTabla.innerHTML += `<div class="col-12 col-md-4"> 
        <div class="card bg-secondary" style="height: 14rem;">
            <img height="75%" src="assets/imgs/${animal.img}" class="card-img-top" alt="${animal.nombre}" onClick="showModal(${i})" data-toggle="modal" data-target="#exampleModal" >
            <div class="card">
                <audio type ="audio/mp3"  controls class="w-100" src="assets/sounds/${animal.sonido}"></audio>
            </div>
        </div>
    </div>`
    })
}

//función para añadir modal

window.showModal = (i) => {
    let modalBody = document.querySelector('.modal-body')

    let animal = animalesArreglo[i]

    modalBody.innerHTML = `
        <div class="card mx-auto  bg-dark  border-dark text-light" style="width: 100%;">
        <img src="assets/imgs/${animal.img}" class="card-img-top">
        <div class="card-body text-center">
            <p class="fw-bold">${animal.edad}</p>
            <p class="fw-bold">Comentarios</p>
            <hr>
            <p>${animal.comentarios}</p>
        </div>
    </div>`

}

//función para limpiar el formulario
function limpiar() {

    let options = document.querySelectorAll("option")
    options.forEach((option) => (option.selected = option.defaultSelected))
    document.getElementById('comentarios').value = ""
}
