/*petición web a una URL donde se encuentra la colección
de productos en formato json(categoria 101 Autos) con la info 
(precio, nombre, descripción, cantidad vendidos e imagen)
de cada producto y mostrar el listado products.html*/

/*Acá lo hice para que mostrara la categoria Autos, pero la mostraba en cualquier categoria
a la que le hicieras click
const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; */
const listaPRODUCTO_URL = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") +".json";
/* con esta const logro que me dirija al json correspondiente de la categoria a la que se le hace click*/
let listado = [];/*declaro una variable vacia para poner dentro los datos que obtengo*/


function mostrarProductos() {

    let htmlContentToAppend = "";
    for (let i = 0; i < listado.length; i++) {
        let producto = listado[i];
/*dejé el onclick="setProductID(${product.id})" porque se que me puede servir cuando tenga que trabajar con cada producto
function setProductID(id) {
    localStorage.setItem("ProductID", id);
    window.location = "product-info.html"
}
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
    

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(listaPRODUCTO_URL).then(resultObj => {
        document.getElementById("aquiVeras").innerText = resultObj.data.catName;//para que muestre catName en el subtitulo
        if (resultObj.status == "ok") {
            listado = resultObj.data.products;
            mostrarProductos(listado);
        } else {
            alert("no se puede mostrar el contenido");
        }
    })

})