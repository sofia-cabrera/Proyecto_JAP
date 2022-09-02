const ORDER_DESC_BY_PRECIO = "Desc.Precio";
const ORDER_ASC_BY_PRECIO = "Asc.Precio";
const ORDER_BY_REL = "Cant.";
let minPrecio = undefined;
let maxPrecio = undefined;
let actualCriterioOrden = undefined;
let search = "";
/*petición web a una URL donde se encuentran las colecciónes
de productos en formato json(de cada categoria) con la info 
(precio, nombre, descripción, cantidad vendidos e imagen)
de cada producto y mostrar el listadoDeProductos products.html*/

/*Acá lo hice para que mostrara la categoria Autos, pero la mostraba en cualquier categoria
a la que le hicieras click
const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; */
const listaPRODUCTO_URL = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + EXT_TYPE;
/* con esta const logro que me dirija al json correspondiente de la categoria a la que se le hace click*/
let listadoDeProductos = [];/*declaro uan array vacia para poner dentro los datos que obtengo*/



function ordenarProductos(criterio, array){
    let result = [];
    if (criterio === ORDER_DESC_BY_PRECIO)
    {
        result = array.sort(function(a, b) {
            let aPrecio = parseInt(a.cost);
            let bPrecio = parseInt(b.cost);
            
            if ( aPrecio < bPrecio ){ return -1; }
            if ( aPrecio > bPrecio ){ return 1; }
            return 0;
            
        });
    }else if (criterio === ORDER_ASC_BY_PRECIO){
        result = array.sort(function(a, b) {
            let aPrecio = parseInt(a.cost);
            let bPrecio = parseInt(b.cost);
            
            if ( aPrecio > bPrecio ){ return -1; }
            if ( aPrecio < bPrecio ){ return 1; }
            return 0;
            
        });
    }else if (criterio === ORDER_BY_REL){
        result = array.sort(function(a, b) {
            let aRel = parseInt(a.soldCount);
            let bRel = parseInt(b.soldCount);

            if ( aRel > bRel ){ return -1; }
            if ( aRel < bRel ){ return 1; }
            return 0;
        });
    }

    return result;
}



//reutilicé el código de categorias, y no quise desaprovechaar cosas que ya me quedaban
//eso incluye la función setProductID, que me permite redirigir a la info del producto cuando haga click
function setProductID(id) {
    localStorage.setItem("ProductID", id);
    window.location = "product-info.html"//funcionalidad en desarrollo
}



function mostrarProductos() {
    let htmlContentToAppend = "";
    for (let i = 0; i < listadoDeProductos.length; i++) {
        let producto = listadoDeProductos[i];
        producto.cost=parseInt(producto.cost);
        let dondeBuscar = producto.name + producto.description;

        if((dondeBuscar.toLowerCase().includes(search.toLowerCase()))){

            if((producto.cost >= minPrecio || minPrecio == undefined) &&
                (producto.cost <= maxPrecio || maxPrecio == undefined)){ 
                htmlContentToAppend += `
                <div onclick="setProductID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${producto.image}" alt="${producto.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${producto.name}-${producto.currency} ${producto.cost}</h4>
                                <small class="text-muted">${producto.soldCount} vendidos</small>
                            </div>
                            <p class="mb-1">${producto.description}</p>
                        </div>
                    </div>
                </div>
                `
            }
        }

    document.getElementById("product-list").innerHTML = htmlContentToAppend;
    }
}

function ordenarYMostrarProductos(criterioDeOrden, lista){
    actualCriterioOrden = criterioDeOrden;

    if(lista != undefined){
        listadoDeProductos = lista;
    }

    listadoDeProductos = ordenarProductos(actualCriterioOrden, listadoDeProductos);

    //Muestro los productos ordenadas
    mostrarProductos();
}
    
/*al cargar la página (el DOM)
llama a getJsonData y el objeto que me devuelve lo guardo en el array listadoDeProductos
luego llama a la función mostarProductos 
que lo hace a traves de un string en el cual va cargando cada uno de los elementos
recorriendo el array con un for
y luego con dom los va dibujando en pantalla*/
document.addEventListener("DOMContentLoaded", function () {
    recuperarEmail();

    getJSONData(listaPRODUCTO_URL).then(resultObj => {
        //para que muestre catName en el subtitulo
        document.getElementById("aquiVeras").innerText = resultObj.data.catName;
        if (resultObj.status == "ok") {
            listadoDeProductos = resultObj.data.products;
            mostrarProductos();
        } else {
            alert("no se puede mostrar el contenido");
        }
    })

    document.getElementById("sortByPrecioDesc").addEventListener("click", function(){
        ordenarYMostrarProductos(ORDER_ASC_BY_PRECIO);
    });

    document.getElementById("sortByPrecioAsc").addEventListener("click", function(){
        ordenarYMostrarProductos(ORDER_DESC_BY_PRECIO);
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        ordenarYMostrarProductos(ORDER_BY_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPrecioMin").value = "";
        document.getElementById("rangeFilterPrecioMax").value = "";

        minPrecio = undefined;
        maxPrecio = undefined;

        mostrarProductos();
    });


    document.getElementById("rangeFilterPrecio").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio los productos
        
        minPrecio = document.getElementById("rangeFilterPrecioMin").value;
        maxPrecio = document.getElementById("rangeFilterPrecioMax").value;

        if(minPrecio == "") {
            minPrecio=undefined;
        }
        else {
            minPrecio = parseInt(minPrecio);
        }
        if(maxPrecio=="") {
            maxPrecio = undefined;
        }
        else {
            maxPrecio = parseInt(maxPrecio);
        }

        mostrarProductos();
    });

    document.getElementById("buscador").addEventListener("input", function(){

        search = document.getElementById("buscador").value;
        mostrarProductos(listadoDeProductos);

    });


})