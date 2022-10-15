const CART_SOLICITUD = CART_INFO_URL + 25801 + EXT_TYPE; //url apra solicitar la información del carrito, harcodeado quedo el usuario porque no es real

let articulos = [];//declaro esta lista vacia para meter los productos del carrito
let articulo = {};

function mostrarProductosCarrito() {
    console.log(articulos);
    for (let i = 0; i < articulos.length; i++) {
        let articulo = articulos[i];
        let subtotal = (articulo.count*articulo.unitCost);
    let htmlContentToAppend= "";
    htmlContentToAppend+=
    `<div class="p-0 col-2"><img class="col-6" src="${articulo.image}" alt="${articulo.name}"></div>
    <div class="p-0 col-2">${articulo.name}</div>
    <div class="p-0 col-2">${articulo.currency} ${articulo.unitCost}</div>
    <div class="p-0 col-2"><input id="product${articulo.id}" class="inputsize" type="number" min="1" value="1"></div>
    <div class="p-0 col-2">${articulo.currency} ${subtotal}</div>
    <hr class="divisor">`;
    
    document.getElementById("contengoProductosCarrito").innerHTML = htmlContentToAppend;
}};

function calcularSubtotal(){
    

    //tengo que cambiar la cantidad no en pantalla sino en el arary
    //cuando cambie la canitidad, multiplicar el precio unitario por la cantidad
    //por defecto tiene que ser uno y el precio también 
};

document.addEventListener("DOMContentLoaded", function () {
    navBar();
    recuperarEmail();
    getJSONData(CART_SOLICITUD).then(resultObj => {
        articulos = resultObj.data.articles;
        localStorage.setItem()
        mostrarProductosCarrito();
    });
    
});