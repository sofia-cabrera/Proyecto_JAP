const PRODUCT_INFO_URL_SOLICITUD = PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE;
const COMENTARIOS_URL = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE;
//construí las url a las que voy a hacer las solicitudes trayendo del localStorage "productID"

let producto = {};
let listadoDeComentarios = [];
let arrayImagenes = [];
let score = "";
let today = new Date();// crea un nuevo objeto `Date`
let now = today.toLocaleString();// obtener la fecha y la hora
//se imprime con una coma en medio pero es un detalle para otro día, creo podría resolverlo si traigo la hora y la fecha por separado
let arrayProductosRelacionados = [];
let nuevoProductID = "";
let articulosNuevos = [];


function mostrarInfo() {
    let htmlContentToAppend = "";


    htmlContentToAppend +=
        `
        
        <div class="row">
            
            <div id="contengoTexto" class="col-6">
                <div class=" mt-5" id="nombreYbotonComprar">
                    <h1>${producto.name}</h1>
                </div>
                <hr>
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
            </div>    
            
            
            <div id="contengoImg" class="container col-6 mt-5">
                <div class="row">
                    <div class="col-6 mb-3 ml-5 pl-5">
                        <button onclick="agregarAlCarrito()" id="botonComprar" type="button" class="btn btn-success btn-lg">Comprar</button>
                    </div>
                    <div class="col-6 mb-3 text-end">
                        <a class="btn btn-secondary bg-gradient" href="javascript: history.go(-1)" role= "button"><span class='fas fa-arrow-left'></span> Volver al listado</a>
                    </div>
                </div>
                
                <div class="container" id="contengoCarrusel">
                    <div id="carouselControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner" id="imagenes">
                        </div>
                        <button class="carousel-control carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Anterior</span>
                        </button>
                        <button class="carousel-control carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Siguiente</span>
                        </button>
                        
                    </div>
                </div> 
            </div>
        </div>`;
    document.getElementById("product-info").innerHTML = htmlContentToAppend;
};

function mostrarImagenes() {
    let imgToAppend = "";
    for (let i = 0; i < arrayImagenes.length; i++) {
        let imagen = arrayImagenes[i];
        imgToAppend += `
        <div class="carousel-item${(i == 1 ? " active" : "")}">
        <img class="d-block w-100" src="${imagen}" alt="${producto.name}" title="*imagenes ilustrativas">
        </div>
        `
        document.getElementById("imagenes").innerHTML = imgToAppend;
    };

};

function recibeScoreDevuelveEstrellas(cantidad) {
    let score = "";

    for (i = 0; i < 5; i++) {
        if (i < cantidad) score += "<span class=' fas fa-star checked'></span>";
        else score += "<span class='star fas fa-star'></span>";
    }
    return score;
};

function mostrarComentarios() {
    let comentariosToAppend = "";
    for (let i = 0; i < listadoDeComentarios.length; i++) {
        let comentario = listadoDeComentarios[i];
        comentariosToAppend += `          
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

function calificar(item) {//con esto logro que las estrellas selecionadas
    //sean ahora el valor numerico de la puntuación
    score = item.value;
    //console.log(item);
    //console.log(item.value);
};

function mostrarProductosRelacionados() {
    productosRelacionadosToAppend = "";

    for (let i = 0; i < arrayProductosRelacionados.length; i++) {
        let productoRelacionado = arrayProductosRelacionados[i];
        let nuevoProductID = productoRelacionado.id.value;
        productosRelacionadosToAppend += `
            <div onclick= "setNuevoProductID(${productoRelacionado.id})" 
            class="card list-group-item-action cursor-active" style="width: 18rem;">
                <img class="card-img-top mt-3" src=${productoRelacionado.image}
                alt=${productoRelacionado.name}>
                <div class="card-body">
                    <p class="card-text">${productoRelacionado.name}</p>
                </div>
            </div>
        `;
    };
    document.getElementById("produtosRelacionados").innerHTML = productosRelacionadosToAppend;
};

function setNuevoProductID(id) {
    localStorage.setItem("productID", id);
    window.location.reload();
};

function mostrarTodo() {
    mostrarInfo();
    mostrarImagenes();
    mostrarComentarios();
    mostrarProductosRelacionados();
};

function agregarAlCarrito() {
    let cantidad = 1;

    for (let i = 0; i < articulosNuevos.length; i++) {
        let articulo = articulosNuevos[i];
        if (articulo.id == producto.id) {

            cantidad = articulosNuevos[i].count + 1;
            console.log("aydua", articulosNuevos[i].count, cantidad);
            articulosNuevos[i].count = cantidad;
            setArticulosNuevos();
        }
    }
    if (cantidad == 1) {
        let articulo = {
            count: 1,
            currency: producto.currency,
            id: producto.id,
            image: arrayImagenes[0],
            name: producto.name,
            unitCost: producto.cost
        }

        articulosNuevos.push(articulo);
        setArticulosNuevos();
    }
    console.log(articulosNuevos);
};

function setArticulosNuevos() {
    let articulos_json = JSON.stringify(articulosNuevos);
    localStorage.setItem("articulosNuevos", articulos_json);
};

function recuperarArticulosNuevos() {
    if (localStorage.getItem("articulosNuevos")) {
        articulos_json = localStorage.getItem("articulosNuevos");
        articulosNuevos = JSON.parse(articulos_json);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    navBar();
    recuperarEmail();//del localStorage y los coloca en la esquina sup derecha

    getJSONData(PRODUCT_INFO_URL_SOLICITUD).then(resultObj => {
        //console.log("infoProducto " + PRODUCT_INFO_URL_SOLICITUD)
        producto = resultObj.data;
        arrayImagenes = producto.images;
        arrayProductosRelacionados = producto.relatedProducts
        //console.log(arrayImagenes);
        console.log(arrayProductosRelacionados);
        console.log(producto);
        if (resultObj.status == "ok") {
            getJSONData(COMENTARIOS_URL).then(resultArray => {
                //console.log("comentarios ", COMENTARIOS_URL)
                listadoDeComentarios = resultArray.data;
                //console.log("comentarios", listadoDeComentarios);
                mostrarTodo();
            });
        };
    });

    //en esta escucha de evento simulo la pubilcacion de un comentario nuevo
    document.getElementById("enviar").addEventListener("click", function () {
        let nuevoComentario = {
            productID: localStorage.getItem("productID"),
            dateTime: now,
            user: localStorage.getItem("email"),
            score: score,
            description: document.getElementById("description").value
        };//construyo el nuevo comentario
        //console.log(nuevoComentario);
        listadoDeComentarios.push(nuevoComentario);//lo agrego al final de la lista
        mostrarComentarios();//muestro la lista nueva
        //limpio el campo donde ingreso el comentario y dejo las estrellas denuevo sin chechear.
        description.value = "";
        document.getElementsByName("estrellas").forEach((estrella) => {
            estrella.checked = false;
        });

    });

    if (!localStorage.getItem("articulosNuevos")) {
        setArticulosNuevos();
    } else {
        recuperarArticulosNuevos();
    }

});


