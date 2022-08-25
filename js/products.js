/*petición web a una URL donde se encuentran las colecciónes
de productos en formato json(de cada categoria) con la info 
(precio, nombre, descripción, cantidad vendidos e imagen)
de cada producto y mostrar el listado products.html*/

/*Acá lo hice para que mostrara la categoria Autos, pero la mostraba en cualquier categoria
a la que le hicieras click
const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; */
const listaPRODUCTO_URL = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + EXT_TYPE;
/* con esta const logro que me dirija al json correspondiente de la categoria a la que se le hace click*/
let listado = [];/*declaro uan array vacia para poner dentro los datos que obtengo*/

//reutilicé el código de categorias, y no quise desaprovechaar cosas que ya me quedaban
//eso incluye la función setProductID, que me permite redirigir a la info del producto cuando haga click
function setProductID(id) {
    localStorage.setItem("ProductID", id);
    window.location = "product-info.html"//funcionalidad en desarrollo
}

/*AGREGAR FILTROS
Aplicar filtros a partir de rango de precio definido.
Agregar las funcionalidades de orden ascendente y descendente en función del precio
y descendente en función de la relevancia (tomaremos para ello la cantidad de artículos vendidos)


*/

function mostrarProductos() {

    let htmlContentToAppend = "";
    for (let i = 0; i < listado.length; i++) {
        let producto = listado[i];
/*dejé el onclick="setProductID(${product.id})" porque se que me va a servir cuando tenga que trabajar con la info-producto
*/
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

    document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
}
    
/*al cargar la página (el DOM)
llama a getJsonData y el objeto que me devuelve lo guardo en el array listado
luego llama a la función mostarProductos 
que lo hace a traves de un string en el cual va cargando cada uno de los elementos
recorriendo el array con un for
y luego con dom los va dibujando en pantalla*/
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(listaPRODUCTO_URL).then(resultObj => {
        //para que muestre catName en el subtitulo
        document.getElementById("aquiVeras").innerText = resultObj.data.catName;
        if (resultObj.status == "ok") {
            listado = resultObj.data.products;
            mostrarProductos();
        } else {
            alert("no se puede mostrar el contenido");
        }
    })

})