// Todo HTML

const formBusqueda = document.querySelector("#form-busqueda");
const cajaBusqueda = document.querySelector("#caja-busqueda");
const resultadoBusqueda = document.querySelector("#resultado-busqueda");
const mostrarMas = document.querySelector("#mostrar-mas");

let keyword = ""; // variables de las palabras de busqueda
let page = 1; // 1 por que va ser sólo una pagina de busqueda
const accessKeey = "5uBtN6PaXVUnuuzxmBMoZKUbZ16VzQyV_EwC3D0fpkA";

//Funciones de la busqueda de imagenes

async function buscarImagenes(){
    keyword = cajaBusqueda.value;

    //url
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKeey}&per_page=12`;

    //busqueda

    const response = await fetch(url);
    const data = await response.json();

    //console.log(data);
    //controlo si es la primera vez que busco y limpio el contenedor

    if(page===1){
        resultadoBusqueda.innerHTML = "";
    }

    //pongo los resultados de busqueda en el contenedor
    const resultados = data.results;
    //por cada resultado armo un enlace y le agrego la imagen
    resultados.map((result) => {
        const imagen = document.createElement("img");
        imagen.src = result.urls.small;
        const imagenLink = document.createElement("a");
        imagenLink.href = result.links.html;
        imagenLink.target = "_blank";

        //agrego el elemento

        imagenLink.appendChild(imagen);
        resultadoBusqueda.appendChild(imagenLink);

        mostrarMas.style.display = "block";
    })
}

//para que funcione cuando aprieto enter

formBusqueda.addEventListener("submit", (e) =>{

    //evito que se recargue la pagina
    e.preventDefault();
    page = 1;
    //llamo a la funcion
    buscarImagenes();
})

//mostrar mas

mostrarMas.addEventListener("click", () =>{
    page++;
    buscarImagenes();
})