const PRODUCT_INFO_URL_A_MOSTRAR= PRODUCT_INFO_URL+ localStorage.getItem("productID") + EXT_TYPE;
const COMENTARIOS_URL = PRODUCT_INFO_COMMENTS_URL+ localStorage.getItem("productID")+ EXT_TYPE;

let producto= {};
let listadoDeComentarios= [];
let arrayImagenes = [];
let score="";

function mostrarImagenes(){
    let imgToAppend="";
    for (let i = 0; i < arrayImagenes.length; i++) {
        let imagen = arrayImagenes[i];
        imgToAppend+=`<img class="col-lg-3 rounded" src="${imagen}" alt="${producto.name}">`
        document.getElementById("imagenes").innerHTML= imgToAppend;
    }
};

function mostrarInfo(){
    let htmlContentToAppend = "";
    
    htmlContentToAppend +=
    `<div>
        <div class="container mt-5" id="name">
            <h1>${producto.name}</h1>
            <hr>
        </div>
        <div class="container" id="cost">
            <b>Precio</b>
            <p>${producto.currency}-${producto.cost}</p>
        </div>
        <div class="container" id="descrption">
            <b>Descripción</b>
            <p>${producto.description}</p>
        </div>
        <div class="container" id="category">
            <b>Categoria</b>
            <p>${producto.category}</p>
        </div>
        <div class="container" id="soldCount">
            <b>Cantidad de vendidos</b>
            <p>${producto.soldCount}</p>
        </div>
        <div class="container">
            <b>Imágenes ilustrativas</b>
            <div class="row mt-3" id="imagenes">
            </div>
        </div>
    </div>`;
    document.getElementById("product-info").innerHTML = htmlContentToAppend;
};

function recibeScoreDevuelveEstrellas(cantidad){
    let score="";
    
    for(i=0;i<5;i++){
        if(i<cantidad)score+="<span class='fas fa-star checked'></span>";
        else score+="<span class='fas fa-star'></span>";
    }
    return score;
};

function mostrarComentarios(){
    let comentariosToAppend= "";
    for (let i = 0; i < listadoDeComentarios.length; i++) {
        let comentario = listadoDeComentarios[i];
        comentariosToAppend +=`          
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row"> 
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <p><b class="mb-1">${comentario.user}</b> - ${comentario.dateTime} -
                            ${recibeScoreDevuelveEstrellas(comentario.score)} </p>
                        </div>
                        <p class="mb-1">${comentario.description}</p>
                    </div>
                </div>
            </div>
        `};
    document.getElementById("product-comments").innerHTML = comentariosToAppend;
};


document.addEventListener("DOMContentLoaded", function () {
    recuperarEmail();//del localStorage y los coloca en la esquina sup derecha

    getJSONData(PRODUCT_INFO_URL_A_MOSTRAR).then(resultObj => {
        console.log("infoProducto " + PRODUCT_INFO_URL_A_MOSTRAR)
        producto = resultObj.data;
        arrayImagenes=producto.images;
        console.log(arrayImagenes);
        console.log (producto)
        if (resultObj.status == "ok") {
            getJSONData(COMENTARIOS_URL).then(resultArray => {
                console.log("comentarios ", COMENTARIOS_URL)
                listadoDeComentarios = resultArray.data;
                console.log("comentarios", listadoDeComentarios);
                mostrarInfo();
                mostrarImagenes();
                mostrarComentarios();
            });
            
        };
            
        
    });
});


function calificar(item){//con esto logro que las estrellas selecionadas
    //sea ahora el valor numerico de a puntuación
    score=item.value
    console.log(item);
    console.log(item.value);
}

var today = new Date();// crea un nuevo objeto `Date`
var now = today.toLocaleString();// obtener la fecha y la hora
console.log("now",now);
//se imprime con una coma en medio pero es un problema para otro día
// creo podría resolverlo si traigo la hora y la fecha por separado

document.getElementById("enviar").addEventListener("click", function(){
    let nuevoComentario ={
        productID: localStorage.getItem("productID"),
        dateTime: now,
        user: localStorage.getItem("email"),
        score: score,
        description:document.getElementById("description").value
    };
    console.log(nuevoComentario);
    listadoDeComentarios.push(nuevoComentario);
    mostrarComentarios();
});

