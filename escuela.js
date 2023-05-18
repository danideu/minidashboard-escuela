/*
Botón agregar: 
    - Si selecciona estudiante:
    Agrega estudiante a la parte de la plantilla estudiante.
    - Si selecciona profesor: 
    Agrega estudiante a la parte de la plantilla profesor.
Botón suspender:
    - Cambia color y agrega tag de suspendido.
*/

const formulario = document.querySelector("#formulario");
const cardEstudiantes = document.querySelector("#cardEstudiantes");
const cardProfesores = document.querySelector("#cardProfesores");
const templateEstudiante = document.querySelector("#templateEstudiante").content;
const templateProfesores = document.querySelector("#templateProfesores").content;
const btnSubmit = document.querySelector(".btn-primary");
const opcion = document.querySelector(".form-select");
const estudiantes = [];
const profesores = [];
// const btnAprobar = document.querySelector(".btn-success");
// const btnSuspender = document.querySelector(".btn-danger");

document.addEventListener('click', e => {
    console.log(e.target.dataset.nombre)
    if(e.target.dataset.nombre){
        console.log(e.target.matches(".btn-success"))

        if(e.target.matches(".btn-success")){
            estudiantes.map(item => {
                if(item.nombre === e.target.dataset.nombre){
                    item.setEstado = true
                }
                console.log(item)
                return item
            })
        }

        if(e.target.matches(".btn-danger")){
            estudiantes.map(item => {
                if(item.nombre === e.target.dataset.nombre){
                    item.setEstado = false
                }
                console.log(item)
                return item
            })
        }
        Persona.pintarPersonaUI(estudiantes, "Estudiante")

    }
})

class Persona{
    constructor(nombre, edad){
        this.nombre = nombre
        this.edad = edad
    }

    static pintarPersonaUI(personas, tipo){
        if(tipo === "Estudiante"){
            cardEstudiantes.textContent = "";
            const fragment = document.createDocumentFragment();

            personas.forEach(item => {
                fragment.appendChild(item.agregarNuevoEstudiante());
            });

            cardEstudiantes.appendChild(fragment);
        }

        if(tipo === "Profesor"){
            cardProfesores.textContent = "";
            const fragment = document.createDocumentFragment();

            profesores.forEach(item => {
                fragment.appendChild(item.agregarNuevoProfesor());
            });

            cardProfesores.appendChild(fragment);
        }
    }
}

class Estudiante extends Persona{
    #estado = false;
    #estudiante = "Estudiante";

    set setEstado(estado){
        this.estado = estado;
    }

    get getEstudiante(){
        return this.#estudiante;
    }

    agregarNuevoEstudiante(){
        const clone = templateEstudiante.cloneNode(true);
        clone.querySelector("h5 .text-primary").textContent = this.nombre;
        clone.querySelector("h6").textContent = this.getEstudiante;
        clone.querySelector(".lead").textContent = this.edad;

        if(this.#estado){
            clone.querySelector(".badge").className = "badge bg-success"
            clone.querySelector(".btn-success").disabled = true
            clone.querySelector(".btn-danger").disabled = false
        }else{
            clone.querySelector(".badge").className = "badge bg-danger"
            clone.querySelector(".btn-danger").disabled = true
            clone.querySelector(".btn-success").disabled = false
        }
        clone.querySelector(".badge").textContent = this.#estado ? "Aprobado" : "Suspendido"

        clone.querySelector('.btn-success').dataset.nombre = this.nombre
        clone.querySelector('.btn-danger').dataset.nombre = this.nombre

        return clone;
    }
}

class Profesor extends Persona{
    #profesor = "Profesor";

    agregarNuevoProfesor(){
        const clone = templateProfesores.cloneNode(true);
        clone.querySelector("h5").textContent = this.nombre;
        clone.querySelector("h6").textContent = this.#profesor;
        clone.querySelector(".lead").textContent = this.edad;
        return clone;
    }
}


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const datos = new FormData(formulario);
    const [nombre, edad, opcion] = [...datos.values()];
    if (opcion == "Estudiante"){
        const estudiante = new Estudiante(nombre, edad);
        // console.log(estudiante);
        estudiantes.push(estudiante);
        Persona.pintarPersonaUI(estudiantes, opcion);
    }

    if (opcion == "Profesor"){        
        const profesor = new Profesor(nombre, edad);
        profesores.push(profesor);
        Persona.pintarPersonaUI(profesores, opcion);
    }
    
    // datos.forEach(item => console.log(item)); 
});


// btnSuspender.addEventListener("click", (e) => {
//     console.log("Suspender");
// });


