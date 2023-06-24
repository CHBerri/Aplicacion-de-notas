/* Declaración de constantes  */ 

const boton = document.getElementById("boton")
const menu = document.getElementById("menu")
const main = document.getElementById("main")

tomaNotas().forEach((nota) => {
    const notaTomada = agregaNota(nota.id, nota.contenido)
    main.insertBefore(notaTomada, boton)
})

//Botón para agregar notas
boton.addEventListener("click", crearNota)


function agregaNota(id, contenido) {
    let nota = document.createElement("textarea")
    main.insertBefore(nota, boton)
    nota.placeholder = "Nota vacía..."
    nota.id = id
    nota.value = contenido

    nota.addEventListener('dblclick', ()=> {
        const advertencia = confirm("¿Eliminar nota?")
        if(advertencia) {
            borrarNota(id, nota)
        }
    })

    nota.addEventListener('input', ()=> {
        actualizarNota(id, nota.value)
    })
    return nota
}

function borrarNota(id, nota) {
    const notas = tomaNotas().filter((nota) => nota.id != id)
    guardarNota(notas)
    main.removeChild(nota)
}

function actualizarNota(id, contenido) {
    const notas = tomaNotas()
    const notaActual = notas.filter((nota) => nota.id == id)[0]
    notaActual.contenido = contenido
    guardarNota(notas)
}

function tomaNotas() {
    return JSON.parse(localStorage.getItem("notas") || "[]")
}

//Función que crea la nota, dentro de ella se añade el evento a cada nota creada
function crearNota() {

    const listaNotas = tomaNotas()

    let objetoNota = {
        id: Math.floor(Math.random() * 10000) + 1,
        contenido: ''
    }

    const crear = agregaNota(objetoNota.id, objetoNota.contenido)
    

    listaNotas.push(objetoNota)

    guardarNota(listaNotas)
        
}

function guardarNota(arrNotes) {
    localStorage.setItem("notas", JSON.stringify(arrNotes))
}
