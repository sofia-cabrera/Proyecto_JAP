/*petición web a una URL donde se encuentran las colecciónes
de productos en formato json(de cada categoria) con la info 
(precio, nombre, descripción, cantidad vendidos e imagen)
de cada producto y mostrar el listadoDeProductos products.html
con esta const logro que me dirija al json correspondiente de la categoria
a la que se le hace click*/
const listaPRODUCTO_URL = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + EXT_TYPE;

let minPrecio = undefined;
let maxPrecio = undefined;
let actualCriterioOrden = undefined;
let search = "";
let listadoDeProductos = [];/*declaro uan array vacia para poner dentro los datos que obtengo*/

//función setProductID, que me permite redirigir a la info del producto cuando haga click
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
};

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
                                    <h4 class="mb-1">${producto.name}  -  ${producto.currency} ${producto.cost}</h4>
                                    <small class="text-muted">${producto.soldCount} vendidos</small>
                                </div>
                                <p class="mb-1">${producto.description}</p>
                            </div>
                        </div>
                    </div>
                `
            };
        };

    document.getElementById("product-list").innerHTML = htmlContentToAppend;
    };
};


    
/*al cargar la página (el DOM)
recupera el email del usuario y lo ubica en la barranav
llama a getJsonData y el objeto que me devuelve lo guardo en el array listadoDeProductos
luego llama a la función mostarProductos 
que lo hace a traves de un string en el cual va cargando cada uno de los elementos
recorriendo el array con un for
y luego con dom los va dibujando en pantalla*/
document.addEventListener("DOMContentLoaded", function () {
    recuperarEmail();//del localStorage y los coloca en la esquina sup derecha

    getJSONData(listaPRODUCTO_URL).then(resultObj => {
        
        document.getElementById("aquiVeras").innerText = resultObj.data.catName;//para que muestre catName en el subtitulo
        if (resultObj.status == "ok") {
            listadoDeProductos = resultObj.data.products;
            mostrarProductos();
        } else {
            alert("no se puede mostrar el contenido");
        };
    });

    document.getElementById("sortByPrecioDesc").addEventListener("click", function(){
        listadoDeProductos.sort(function(a, b) {
            return parseInt(b.cost)- parseInt(a.cost);
        });
        mostrarProductos(listadoDeProductos);
    });

    document.getElementById("sortByPrecioAsc").addEventListener("click", function(){
        listadoDeProductos.sort(function(a, b) {
            return parseInt(a.cost)- parseInt(b.cost);
        });
        mostrarProductos(listadoDeProductos);
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        listadoDeProductos.sort(function(a, b) {
            return parseInt(b.soldCount)- parseInt(a.soldCount);
        });
        mostrarProductos(listadoDeProductos);

    });

    document.getElementById("rangeFilter").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio los productos
        minPrecio = document.getElementById("rangeFilterPrecioMin").value;
        maxPrecio = document.getElementById("rangeFilterPrecioMax").value;

        if(minPrecio == "") minPrecio = undefined;
        else minPrecio = parseInt(minPrecio);
        if(maxPrecio == "") maxPrecio = undefined;
        else maxPrecio = parseInt(maxPrecio);
        mostrarProductos();
    });
    
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPrecioMin").value = "";
        document.getElementById("rangeFilterPrecioMax").value = "";

        minPrecio = undefined;
        maxPrecio = undefined;

        mostrarProductos();
    });
    
    document.getElementById("buscador").addEventListener("input", function(){
        search = document.getElementById("buscador").value;
        mostrarProductos(listadoDeProductos);

    });


})