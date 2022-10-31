const CART_SOLICITUD = CART_INFO_URL + 25801 + EXT_TYPE; //url apra solicitar la información del carrito, harcodeado quedo el usuario porque no es real

let articulos = [];//declaro esta lista vacia para meter los productos del carrito
let finalSubtotal = "";
let finalCostoDeEnvio = "";
let costoTotal = "";
let costoDeEnvio = "15";//la inicializo en 15 porque es la opción que viene seleccionada "por defecto"
let formaDePago = 'No ha seleccionado';


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
        costoSubtotal = (Math.round(costoSubtotal * 100) / 100);
    };
    htmlContentToAppend += ` ${costoSubtotal}`;
    document.getElementById("costoSubtotal").innerHTML = htmlContentToAppend;
    finalSubtotal = costoSubtotal;

    calcularTotalyMostrarlo();
};

function validaCheckbox() {
    //console.log(this.value);
    if (this.checked) {
        costoDeEnvio = this.value;
    };
    calcularCostoEnvioyMostrarlo();
    calcularTotalyMostrarlo();
};

function calcularCostoEnvioyMostrarlo() {
    finalCostoDeEnvio = (finalSubtotal * costoDeEnvio) / 100
    finalCostoDeEnvio = (Math.round(finalCostoDeEnvio * 100) / 100);
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

function habilitaDesabilitaFormasDePago() {
    //FUNCIONALIDAD DEL MODAL DE FORMAS DE PAGO
    // Accedo a los input que tengo que habilitar y deshabilitar
    let inputNroTarjeta = document.getElementById('inputTarjeta');
    let inputCodigo = document.getElementById('inputSeguridad');
    let inputVencimiento = document.getElementById('inputVencimiento');
    let inputCuenta = document.getElementById('inputCuenta');
    //habilitan las opciones de este y deshabilitan las del otro radio
    document.getElementById('radioCredito').addEventListener('click', function (e) {
        //console.log('habilitar input credito');
        inputNroTarjeta.disabled = false;
        inputCodigo.disabled = false;
        inputVencimiento.disabled = false;
        inputCuenta.disabled = true;
        formaDePago = `Tarjeta de crédito`;
        document.getElementById('contengoFormaPago').innerHTML = formaDePago;
    })
    document.getElementById('radioTransferencia').addEventListener('click', function (e) {
        //console.log('habilitar input Transferencia');
        inputNroTarjeta.disabled = true;
        inputCodigo.disabled = true;
        inputVencimiento.disabled = true;
        inputCuenta.disabled = false;
        formaDePago = `Transferencia bancaria`;
        document.getElementById('contengoFormaPago').innerHTML = formaDePago;
    });

    //función que imita el click en la primera opción la que ya esta "checked"
    //cuando se haga click en el botón seleccionar forma de pago
    //el usuario no tenga que cambiar a otra opción primero si lo que quiere es esa opción seleccionada
    document.getElementById("botonFormaPago").addEventListener('click', function seleccionInicialModal() {
        inputNroTarjeta.disabled = false;
        inputCodigo.disabled = false;
        inputVencimiento.disabled = false;
        inputCuenta.disabled = true;
        let formaDePago = `Tarjeta de crédito`;
        document.getElementById('contengoFormaPago').innerHTML = formaDePago;
    });
};

function escuchaTipoDeEnvio(){
    document.getElementById('Premium').addEventListener("change", validaCheckbox, false);
    document.getElementById('Express').addEventListener("change", validaCheckbox, false);
    document.getElementById('Standard').addEventListener("change", validaCheckbox, false);
    
};

function validaciones() {
    let credito = document.getElementById("radioCredito");
    let nroTarjeta = document.getElementById("inputTarjeta");
    let nroTarjetaValor = document.getElementById("inputTarjeta").value;
    let codigo = document.getElementById("inputSeguridad");
    let vencimiento = document.getElementById("inputVencimiento");

    let transferencia = document.getElementById("radioTransferencia");
    let nroCuenta = document.getElementById("inputCuenta");

    let contenedor = document.getElementById("contengoFormaPago")
    let seleccionar = document.getElementById("botonFormaPago");
    let feedbackFormaPago = document.getElementById("feedbackFormaPago");

    let validacion = false;

    if (formaDePago == "No ha seleccionado") {
        //contenedor.classList.add("is-invalid");
        seleccionar.classList.remove("btn-outline-info");
        seleccionar.classList.add("btn-danger");
        seleccionar.classList.add("is-invalid");
        feedbackFormaPago.classList.add("d-inline");
        seleccionar.addEventListener("click", function () {
            console.log("click");
            seleccionar.classList.remove("btn-danger");
            seleccionar.classList.add("btn-outline-info");
            seleccionar.classList.remove("is-invalid");
            feedbackFormaPago.classList.remove("d-inline");
            seleccionar.classList.add("is-valid");
            feedbackFormaPago.classList.add("none");

            if (credito.checked) {
                console.log(nroTarjetaValor);
                console.log("dentro del if cretino checked");
                if (nroTarjeta == "") {
                    nroTarjeta.classList.add("is-invalid");
                    feedbackFormaPago.classList.add("d-inline");
                    seleccionar.classList.remove("btn-outline-info");
                    seleccionar.classList.add("btn-danger");
                    seleccionar.classList.add("is-invalid");
                } else {
                    nroTarjeta.classList.add("is-valid");
                    
                }
                nroTarjeta.addEventListener("onchange", function() {
                    console.log('escucha el cambio');
                    /*nroTarjeta.classList.remove("is-invalid")
                    nroTarjeta.classList.add("is-valid")
                    seleccionar.classList.remove("btn-danger");
                    seleccionar.classList.add("btn-outline-info");
                    seleccionar.classList.remove("is-invalid");
                    feedbackFormaPago.classList.remove("d-inline");
                    seleccionar.classList.add("is-valid");
                    feedbackFormaPago.classList.add("none");*/


                });
                
               
            }
        });
    }
    else {
        validacion = true;
    }

    //costo de envío no puede modificarse desde la herramienta de desarrollador
    if (costoDeEnvio <= 0) {
        AlertToAppend = "";
        AlertToAppend += `<div class="alert alert-danger alert-dismissible" role="alert">
        Debe seleccionar un tipo de envío!<button type="button"
        class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        //si se hace se muestra esta alerta
        document.getElementById('alertaValidacionCostoDeEnvio').innerHTML = AlertToAppend;
    } else {
        validacion = true
    }

    //la cantidad de un articulo no puede ser <=0 ni ""
    for (let i = 0; i < articulos.length; i++) {
        let articulo = articulos[i];
        let count = articulo.count;
        //console.log (count);
        if (parseInt(count) <= 0 || count == "") {
            ;
            AlertToAppend = "";
            AlertToAppend += `<div class="alert alert-danger alert-dismissible" role="alert">
            La cantidad para cada artículo deberá estar definida y ser mayor a 0<button type="button"
            class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
            document.getElementById('alertaCount').innerHTML = AlertToAppend;
        } else {
            validacion = true
        }


    };
    return validacion;
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
            calcularTotales();

        });
    } else {
        getArticulos();
        unificarArticulos();
        mostrarProductosCarrito();
        calcularTotales();

    };

    document.getElementById('contengoFormaPago').innerHTML = formaDePago;
    habilitaDesabilitaFormasDePago();

    escuchaTipoDeEnvio()

    document.getElementById('form').addEventListener('submit', function (event) {
        this.checkValidity();
        event.preventDefault();
        event.stopPropagation();

        form.classList.add('was-validated')
        validaciones();
    });


});


