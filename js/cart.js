const CART_SOLICITUD = CART_INFO_URL + 25801 + EXT_TYPE; //url apra solicitar la información del carrito, harcodeado quedo el usuario porque no es real

let articulos = [];//declaro esta lista vacia para meter los productos del carrito
let costoSubtotal = 0;
let costoDeEnvio = "";
let costoTotal = "";


function mostrarProductosCarrito() {//con un for recorro los articulos que voy a agregar
    //y relleno una plantilla html con los datos para imprimirlos en pantalla con DOM
    let htmlContentToAppend = "";
    for (let i = 0; i < articulos.length; i++) {
        let articulo = articulos[i];
        let subtotal = (articulo.count * articulo.unitCost);

        htmlContentToAppend +=
            `<div class="p-0 col-2"><img class="col-6" src="${articulo.image}" alt="${articulo.name}"></div>
            <div class="p-0 col-2 mt-3">${articulo.name}</div>
            <div class="p-0 col-2 mt-3">${articulo.currency} ${articulo.unitCost}</div>
            <div class="p-0 col-2 mt-3"><input onchange="cambiarCount(this.value, ${articulo.id} )" id="${articulo.id}" class="inputsize" type="number" min="1" value="${articulo.count}"></div>
            <div class="p-0 col-2 fw-bold mt-3">${articulo.currency} ${subtotal}</div>
            <div class="p-0 col-2 mt-2"><button onclick="quitarArticulo(${articulo.id})" type="button" class="btn btn-outline-danger"><i class="fa fa-trash"></i></button></div>
            <hr class="divisor">`;
    }
    document.getElementById("contengoProductosCarrito").innerHTML = htmlContentToAppend;
};

function cambiarCount(a, id) {
    console.log(a);
    for (let i = 0; i < articulos.length; i++) {
        let articulo = articulos[i];
        if (articulo.id == id) articulos[i].count = a;
    }
    setArticulos();
    mostrarProductosCarrito();
    calcularSubtotalFinal();
    mostrarCostos();
};

function quitarArticulo(a) {
    let seQuedan = articulos.filter(articulo => articulo.id !== a);
    articulos = seQuedan;
    setArticulos();
    mostrarProductosCarrito();
    calcularSubtotalFinal();
    mostrarCostos();
};

function calcularSubtotalFinal() {
   //necesito recorrer la lista de articulos, tomar al cantidad y
    //precio unitario multiplicarlos y sumarlos
    //meterlo en una variable global costoSubtotal
    //calcular el porcentaje de costo de envio en usd
    //calcular total en usd //let subtotalCambio = (articulo.count * 40);
    for (let i = 0; i < articulos.length; i++) {
        let articulo = articulos[i];
        let subtotal = (articulo.count * articulo.unitCost);
        
        console.log (typeof (subtotal));
        costoSubtotal += subtotal;
    };
     
};
function mostrarCostos() {
    htmlContentToAppend = "";
    htmlContentToAppend +=`
    ${costoSubtotal}
    `
    document.getElementById("costoSubtotal").innerHTML = htmlContentToAppend;
    //contruir html con cards de bootstrap
    //para subtotal, costo de envio , total en pesos
};

function setArticulos() {
    let articulos_json = JSON.stringify(articulos);
    localStorage.setItem("articulos", articulos_json);
};

function getArticulos() {
    if (localStorage.getItem("articulos")) {
        articulos_json = localStorage.getItem("articulos");
        articulos = JSON.parse(articulos_json);
    }
};

function unificarArticulos() {
    let articulosNuevos = [];
    let articulosNuevos_json;
    if (localStorage.getItem("articulosNuevos")) {
        articulosNuevos_json = localStorage.getItem("articulosNuevos");
        articulosNuevos = JSON.parse(articulosNuevos_json);
    }

    let flag = 0;
    let articulos_cantidad = articulos.length;
    for (let j = 0; j < articulosNuevos.length; j++) {
        let flag = 0;
        let articuloNuevo = articulosNuevos[j];
        for (let i = 0; i < articulos_cantidad; i++) {
            let articulo = articulos[i];
            if (articuloNuevo.id == articulo.id) {
                articulos[i].count = parseInt(articuloNuevo.count) + parseInt(articulo.count);
                flag = 0;
                break;
            } else {
                flag = 1;
            }
        }
        if (flag > 0) articulos.push(articuloNuevo);
    }
    setArticulos();
    localStorage.removeItem("articulosNuevos");
};

document.addEventListener("DOMContentLoaded", function () {
    navBar();
    recuperarEmail();

    if (!localStorage.getItem("articulos") || localStorage.getItem("articulos") == "[]") {
        getJSONData(CART_SOLICITUD).then(resultObj => {
            articulos = resultObj.data.articles;
            setArticulos();
            unificarArticulos();
            mostrarProductosCarrito();
            calcularSubtotalFinal();
            mostrarCostos();
        });
    } else {
        getArticulos();
        unificarArticulos();
        mostrarProductosCarrito();
        calcularSubtotalFinal();
        mostrarCostos();
    }

});