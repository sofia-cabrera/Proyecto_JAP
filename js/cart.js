const CART_SOLICITUD = CART_INFO_URL + 25801 + EXT_TYPE; //url apra solicitar la información del carrito, harcodeado quedo el usuario porque no es real

let articulos = [];//declaro esta lista vacia para meter los productos del carrito
let finalSubtotal = "";
let finalCostoDeEnvio = "";
let costoTotal = "";
let costoDeEnvio = "15";//la inicializo en 15 porque es la opción que viene seleccionada "por defecto"
let formaDePago = 'No ha seleccionado';
//FUNCIONALIDAD DEL MODAL DE FORMAS DE PAGO
// Accedo a los input que tengo que habilitar y deshabilitar
let inputNroTarjeta = document.getElementById('inputTarjeta');
let inputCodigo = document.getElementById('inputSeguridad');
let inputVencimiento = document.getElementById('inputVencimiento');
let inputCuenta = document.getElementById('inputCuenta');

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
            <div class="p-0 col-2 mt-3"><input onchange="cambiarCount(this.value, ${articulo.id} )" id="${articulo.id}" class="inputsize" type="number" min="1" value="${articulo.count}" required></div>
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
    calcularTotales();

};

function quitarArticulo(a) {
    let seQuedan = articulos.filter(articulo => articulo.id !== a);
    articulos = seQuedan;
    setArticulos();
    mostrarProductosCarrito();
    calcularTotales();

};

function calcularSubtotalFinalyMostrarlo() {
    let costoSubtotal = 0;
    htmlContentToAppend = "";
    for (let i = 0; i < articulos.length; i++) {
        let articulo = articulos[i];
        let subtotal = "";
        if (articulo.currency === "UYU") {
            subtotal = (articulo.count * articulo.unitCost) / 40;

        } else {
            subtotal = (articulo.count * articulo.unitCost);
        }
        costoSubtotal += (subtotal);
        costoSubtotal =(Math.round(costoSubtotal*100)/100);
    };
    htmlContentToAppend += ` ${costoSubtotal}`;
    document.getElementById("costoSubtotal").innerHTML = htmlContentToAppend;
    finalSubtotal = costoSubtotal;
    //;
    calcularTotalyMostrarlo();
};

function validaCheckbox() {
    console.log(this.value);
    if (this.checked) {
        costoDeEnvio = this.value;
    };
    calcularCostoEnvioyMostrarlo();
    calcularTotalyMostrarlo();
};

function calcularCostoEnvioyMostrarlo() {
    finalCostoDeEnvio = (finalSubtotal * costoDeEnvio) / 100
    finalCostoDeEnvio =(Math.round(finalCostoDeEnvio*100)/100);
    let htmlContentToAppend = "";
    htmlContentToAppend += `USD ${finalCostoDeEnvio}`
    document.getElementById("costoEnvio").innerHTML = htmlContentToAppend;
    calcularTotalyMostrarlo();
};

function calcularTotalyMostrarlo() {
    costoTotal = finalSubtotal + finalCostoDeEnvio;
    htmlContentToAppend = "";
    htmlContentToAppend += `USD ${costoTotal}`;
    document.getElementById("total").innerHTML = htmlContentToAppend;
};

function calcularTotales() {
    calcularSubtotalFinalyMostrarlo();
    calcularCostoEnvioyMostrarlo();
    calcularTotalyMostrarlo();
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

function validaciones() {

    if (costoDeEnvio <= 0) {
        AlertToAppend = "";
        AlertToAppend += `<div class="alert alert-danger alert-dismissible" role="alert">
        Debe seleccionar un tipo de envío!<button type="button"
        class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`

        document.getElementById('alertaValidacionCostoDeEnvio').innerHTML = ToAppend;
    }
    for (let i = 0; i < articulos.length; i++) {
        let articulo = articulos[i];
        if (parseInt(articulo.count) <= 0 || articulo.count == "") {
            document.getElementById(articulo.id).classList.add("form-control", "is-invalid");
        }
    }
   

};

function verificarModal(){

    let terminos = document.getElementById("terminos");
    let btnTerminos = document.getElementById("botonTerminos");
    let feedbackTerm = document.getElementById("feedbackFormaPago");
    let validacion = false;
  
    if(!terminos.checked){
      terminos.classList.add("is-invalid");
      btnTerminos.classList.add("text-danger");
      btnTerminos.classList.add("is-invalid");
      feedbackTerm.classList.add("d-inline");
      terminos.addEventListener("click", function(){
  
        if(terminos.checked){
          terminos.classList.remove("is-invalid");
          terminos.classList.add("is-valid");
  
          btnTerminos.classList.remove("text-danger");
          btnTerminos.classList.remove("is-invalid");
          feedbackTerm.classList.remove("d-inline");
        }
        else{
          terminos.classList.remove("is-valid");
          terminos.classList.add("is-invalid");
  
          btnTerminos.classList.add("text-danger");
          btnTerminos.classList.add("is-invalid");
          feedbackTerm.classList.add("d-inline");
        }
  
      });
    }
    else{
      validacion = true;
    }
  
    return validacion;
  }


document.addEventListener("DOMContentLoaded", function () {
    navBar();
    recuperarEmail();

    if (!localStorage.getItem("articulos") || localStorage.getItem("articulos") == "[]") {
        getJSONData(CART_SOLICITUD).then(resultObj => {
            articulos = resultObj.data.articles;
            setArticulos();
            unificarArticulos();
            mostrarProductosCarrito();
            calcularTotales();

        });
    } else {
        getArticulos();
        unificarArticulos();
        mostrarProductosCarrito();
        calcularTotales();

    };

    document.getElementById('contengoFormaPago').innerHTML = formaDePago;

    document.getElementById('Premium').addEventListener("change", validaCheckbox, false);
    document.getElementById('Express').addEventListener("change", validaCheckbox, false);
    document.getElementById('Standard').addEventListener("change", validaCheckbox, false);


    //habilitan las opciones de este y deshabilitan las del otro radio
    document.getElementById('radioCredito').addEventListener('click', function (e) {
        console.log('habilitar input credito');
        inputNroTarjeta.disabled = false;
        inputCodigo.disabled = false;
        inputVencimiento.disabled = false;
        inputCuenta.disabled = true;
        formaDePago = `Tarjeta de crédito`;
        document.getElementById('contengoFormaPago').innerHTML = formaDePago;
    })
    document.getElementById('radioTransferencia').addEventListener('click', function (e) {
        console.log('habilitar input Transferencia');
        inputNroTarjeta.disabled = true;
        inputCodigo.disabled = true;
        inputVencimiento.disabled = true;
        inputCuenta.disabled = false;
        formaDePago = `Transferencia bancaria`;
        document.getElementById('contengoFormaPago').innerHTML = formaDePago;
    });

    //función que imita el click en la primera opción la que ya esta "checked"
    //cuando se haga click en el botón seleccionar forma de pago
    //el suario no tenga que cambiar a otra opción primero si lo que quiere es esa opción seleccionada
    document.getElementById("botonFormaPago").addEventListener('click', function seleccionInicialModal() {
        inputNroTarjeta.disabled = false;
        inputCodigo.disabled = false;
        inputVencimiento.disabled = false;
        inputCuenta.disabled = true;
        let formaDePago = `Tarjeta de crédito`;
        document.getElementById('contengoFormaPago').innerHTML = formaDePago;
    });

    document.getElementById('form').addEventListener('submit', function (event) {
        this.checkValidity();
        event.preventDefault();
        event.stopPropagation();
        
        form.classList.add('was-validated')
        validaciones();
    });


});


