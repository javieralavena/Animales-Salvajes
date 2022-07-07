import Animal from "./Animal.js";

class Leon extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido)
    }

    rugir() {
        return "assets/sounds/Rugido.mp3"
    }
}

export default Leon