const CART_SOLICITUD = CART_INFO_URL + 25801 + EXT_TYPE; //url apra solicitar la información del carrito, harcodeado quedo el usuario porque no es real

let articulos = [];//declaro esta lista vacia para meter los productos del carrito
let finalSubtotal = "";
let finalCostoDeEnvio = "";
let costoTotal = "";
let costoDeEnvio = 15;//la inicializo en 15 porque es la opción que viene seleccionada "por defecto"
let formaDePago = 'No ha seleccionado';

let validacionModal = false;
let validacionCantidades = false;
let validacionTipoDeEnvio = false;

let validacionActiva = false;

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

//se ejecuta cuando modifico la cantidad del producto en el input
function cambiarCount(a, id) {

    for (let i = 0; i < articulos.length; i++) {
        let articulo = articulos[i];
        if (articulo.id == id) articulos[i].count = a;
    }

    setArticulos();
    mostrarProductosCarrito();
    calcularTotales();

};

//se ejecuta cuando se hace click en el boton de quitar
function quitarArticulo(a) {
    let seQuedan = articulos.filter(articulo => articulo.id !== a);
    articulos = seQuedan;
    setArticulos();
    mostrarProductosCarrito();
    calcularTotales();

};

//recorro la lista de articulos 
//si estan en pesos lo paso a dolares
//calculo subtotal count*unitcost y los voy sumando
//los redondeo para que tengan solo 2 decimales
//y con el dom lo pongo donde se debe
//y calculo el total y lo muestro
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

//calculo el porcentaje de envío
//me guardé el costo de envío que corresponde en una variable global
//lo redondeo y lo muestro
//calculo el total y lo muestro 
function calcularCostoEnvioyMostrarlo() {
    finalCostoDeEnvio = (finalSubtotal * costoDeEnvio) / 100
    finalCostoDeEnvio = (Math.round(finalCostoDeEnvio * 100) / 100);
    let htmlContentToAppend = "";
    htmlContentToAppend += `USD ${finalCostoDeEnvio}`
    document.getElementById("costoEnvio").innerHTML = htmlContentToAppend;
    calcularTotalyMostrarlo();
};

//con esta funcion hago el calculo del finalsubtotal+finalcostodeEnvio 
//redondeo y lo muestro
function calcularTotalyMostrarlo() {
    costoTotal = finalSubtotal + finalCostoDeEnvio;
    costoTotal = (Math.round(costoTotal * 100) / 100);
    htmlContentToAppend = "";
    htmlContentToAppend += `USD ${costoTotal}`;
    document.getElementById("total").innerHTML = htmlContentToAppend;
};

//llama a las funciones que calculan los costos finales y los muestra
function calcularTotales() {
    calcularSubtotalFinalyMostrarlo();
    calcularCostoEnvioyMostrarlo();
    calcularTotalyMostrarlo();
};

//guarda los articulos del localStorage
function setArticulos() {
    let articulos_json = JSON.stringify(articulos);
    localStorage.setItem("articulos", articulos_json);
};

//trae los articulos del localStorage
function getArticulos() {
    if (localStorage.getItem("articulos")) {
        articulos_json = localStorage.getItem("articulos");
        articulos = JSON.parse(articulos_json);
    }
};

//esta funcion se encarga de unificar la lista de articulos que viene del servidor
//que ya tengo en el local 
//con el carrito auxiliar del local donde guardo todos los productos a los que se le da comprar
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

//esla funcion que se ejecuta cuando se selecciona un radio de tipo de envio
//costoDeEnvio está inicializada en 15, porque es la opción por defecto
function asignaValorCostoDeEnvio() {
    //console.log(this.value);
    if (this.checked) {
        costoDeEnvio = parseInt(this.value);
    }
    calcularCostoEnvioyMostrarlo();
    calcularTotalyMostrarlo();
};

function escuchaTipoDeEnvio() {
    document.getElementById('Premium').addEventListener("change", asignaValorCostoDeEnvio, false);
    document.getElementById('Express').addEventListener("change", asignaValorCostoDeEnvio, false);
    document.getElementById('Standard').addEventListener("change", asignaValorCostoDeEnvio, false);

};

function validacionCostoEnvio() {
    //costo de envío no puede modificarse desde la herramienta de desarrollador
    if (costoDeEnvio !== 15 && costoDeEnvio !== 7 && costoDeEnvio !== 5) {
        let AlertToAppend = "";
        AlertToAppend += `<div class="alert alert-danger alert-dismissible" role="alert">
    Debe seleccionar un tipo de envío!<button type="button"
    class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        //si se hace se muestra esta alerta
        document.getElementById('alertaValidacionCostoDeEnvio').innerHTML = AlertToAppend;
        validacionTipoDeEnvio = false;
    } else {
        validacionTipoDeEnvio = true;
    }

};

function validacionDeCantidades() {
    //la cantidad de un articulo no puede ser <=0 ni ""
    validacionCantidades = false;
    let flagCount = 0;
    for (let i = 0; i < articulos.length; i++) {
        let articulo = articulos[i];
        let count = articulo.count;
        let AlertToAppend = "";
        //console.log (count);
        if (parseInt(count) <= 0 || count == "") {
            flagCount++;
            AlertToAppend += `<div class="alert alert-danger alert-dismissible" role="alert">
        La cantidad para cada artículo deberá estar definida y ser mayor a 0<button type="button"
        class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
            document.getElementById('alertaCount').innerHTML = AlertToAppend;
        }

    }
    if (flagCount == 0) validacionCantidades = true;
};

//////////////////////////////////////////////////////////////////////////
///TODO ESTO EN CODIGO DEL MODAL

//aspecto boton seleccionar contiene dos casos valido/invalido
function aspectoBoton(boton, caso) {
    if (caso == 1) { // validación ok
        boton.classList.remove("btn-danger");
        boton.classList.add("btn-outline-info");
        boton.classList.remove("is-invalid");
        boton.classList.add("is-valid");
    } else if (caso == 2) { // validación inválida
        boton.classList.remove("btn-outline-info");
        boton.classList.add("btn-danger");
        boton.classList.remove("is-valid");
        boton.classList.add("is-invalid");
    }
};
// valida el campo en el momento
function validaNroTarjetaAhora(){
    let seleccionar = document.getElementById("botonFormaPago");
    let inputTarjeta = document.getElementById("inputTarjeta");
    let inputTarjetaValor = inputTarjeta.value;
    let contenedor = document.getElementById("contengoFormaPago");

    if (validacionActiva) {
        if (inputTarjetaValor == "") {
            inputTarjeta.classList.remove("is-valid");
            inputTarjeta.classList.add("is-invalid");
            //aspectoBoton(seleccionar, 2);
            contenedor.classList.add("text-danger");
        } else {
            inputTarjeta.classList.remove("is-invalid");
            inputTarjeta.classList.add("is-valid");
            //aspectoBoton(seleccionar, 1);
        }
        validaOpcionCredito();
    }
};
// valida el campo en el momento
function validaCodigoSegAhora(){
    let seleccionar = document.getElementById("botonFormaPago");
    let inputSeguridad = document.getElementById("inputSeguridad");
    let inputSeguridadValor = inputSeguridad.value;
    let contenedor = document.getElementById("contengoFormaPago");

    if (validacionActiva) {
        if (inputSeguridadValor == "") {
            inputSeguridad.classList.remove("is-valid");
            inputSeguridad.classList.add("is-invalid");
            //aspectoBoton(seleccionar, 2);
            contenedor.classList.add("text-danger");
        } else {
            inputSeguridad.classList.remove("is-invalid");
            inputSeguridad.classList.add("is-valid");
            //aspectoBoton(seleccionar, 1);
        }
        validaOpcionCredito();
    }
};
// valida el campo en el momento
function validaVencimientoAhora(){
    let seleccionar = document.getElementById("botonFormaPago");
    let inputVencimiento = document.getElementById("inputVencimiento");
    let inputVencimientoValor = inputVencimiento.value;
    let contenedor = document.getElementById("contengoFormaPago");

    if (validacionActiva) {
        if (inputVencimientoValor == "") {
            inputVencimiento.classList.remove("is-valid");
            inputVencimiento.classList.add("is-invalid");
            //aspectoBoton(seleccionar, 2);
            contenedor.classList.add("text-danger");
        } else {
            inputVencimiento.classList.remove("is-invalid");
            inputVencimiento.classList.add("is-valid");
            //aspectoBoton(seleccionar, 1);
        }
        validaOpcionCredito();
    }
};

// valida el campo en el momento
function validaNroCuentaAhora(){
    let seleccionar = document.getElementById("botonFormaPago");
    let inputCuenta = document.getElementById("inputCuenta");
    let inputCuentaValor = inputCuenta.value;
    let contenedor = document.getElementById("contengoFormaPago");

    if (validacionActiva) {
        if (inputCuentaValor == "") {
            inputCuenta.classList.remove("is-valid");
            inputCuenta.classList.add("is-invalid");
            //aspectoBoton(seleccionar, 2);
            contenedor.classList.add("text-danger");
        } else {
            inputCuenta.classList.remove("is-invalid");
            inputCuenta.classList.add("is-valid");
            //aspectoBoton(seleccionar, 1);
        }
        validaOpcionTransferencia();
    }
};

//se ejecuta cuando se envia el form dentro de validacionTotal
function validacionesFormaDePago() {
    let contenedor = document.getElementById("contengoFormaPago");
    let seleccionar = document.getElementById("botonFormaPago");
    let feedbackFormaPago = document.getElementById("feedbackFormaPago");
    
    if (formaDePago == "No ha seleccionado") {
        contenedor.classList.add("text-danger");
        aspectoBoton(seleccionar, 2);
        feedbackFormaPago.classList.add("d-inline");
        funcionamientoModal(0);
    } else if(formaDePago == "Tarjeta de crédito") {
        validaNroTarjetaAhora();
        validaCodigoSegAhora();
        validaVencimientoAhora();
    } else if(formaDePago == "Transferencia bancaria") {
        validaNroCuentaAhora();
    }
};

//sirve para deshabilitar los input al comenzar y cambiar de opcion (radio)
//trae los input del modal---contiene 3 casos
//0: deshabilita todo
//1:deshabilita y hablita para tarjeta de credito
//2:deshabilita y hablita para transferencia
function funcionamientoModal(opcion){
    let inputNroTarjeta = document.getElementById('inputTarjeta');
    let inputSeguridad = document.getElementById("inputSeguridad");
    let inputVencimiento = document.getElementById("inputVencimiento");

    let inputCuenta = document.getElementById('inputCuenta');
    if(opcion==0){ // Deshabilitar todo
        inputNroTarjeta.disabled = true;
        inputSeguridad.disabled = true;
        inputVencimiento.disabled = true;
        inputCuenta.disabled = true;
        if(validacionActiva){
            inputNroTarjeta.classList.remove("is-valid","is-invalid");
            inputSeguridad.classList.remove("is-valid","is-invalid");
            inputVencimiento.classList.remove("is-valid","is-invalid");
            inputCuenta.classList.remove("is-valid","is-invalid");
        }
    }
    
    if(opcion==1){ // Tarjeta de crédito
        inputNroTarjeta.disabled = false;
        inputSeguridad.disabled = false;
        inputVencimiento.disabled = false;
        inputCuenta.disabled = true;
        inputCuenta.classList.remove("is-valid","is-invalid");
    } 

    if(opcion==2){ // Transferencia bancaria
        inputNroTarjeta.disabled = true;
        inputSeguridad.disabled = true;
        inputVencimiento.disabled = true;
        inputCuenta.disabled = false;
        inputNroTarjeta.classList.remove("is-valid","is-invalid");
        inputSeguridad.classList.remove("is-valid","is-invalid");
        inputVencimiento.classList.remove("is-valid","is-invalid");
    }
};

//esta funcion evalua y cambia validarModal a true
//aspecto de contenedor de forma de pago
//y el boton seleccionar
//cuando todos sus campos tienen algo de contenido
function validaOpcionCredito() {
    let seleccionar = document.getElementById("botonFormaPago");
    let contenedor = document.getElementById("contengoFormaPago");
    
    validacionModal = false;
    if ((document.getElementById("inputTarjeta").value !== "")
        && (document.getElementById("inputSeguridad").value !== "")
        && (document.getElementById("inputVencimiento").value !== "") 
        ) {
        aspectoBoton(seleccionar, 1);
        contenedor.classList.remove("text-danger");
        validacionModal = true;
    } else {
        aspectoBoton(seleccionar, 2);
        contenedor.classList.add("text-danger");
    }
};

//esta funcion evalua y cambia validarModal a true
//aspecto de la forma de pago en el form y boton seleccionar
//cuando todos su campo tiene algo de contenido
function validaOpcionTransferencia() {
    let seleccionar = document.getElementById("botonFormaPago");
    let contenedor = document.getElementById("contengoFormaPago");

    validacionModal = false;
    if ((document.getElementById("inputCuenta").value !== "")) {
        aspectoBoton(seleccionar, 1);
        contenedor.classList.remove("text-danger");
        validacionModal = true;
    } else {
        aspectoBoton(seleccionar, 2);
        contenedor.classList.add("text-danger");
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////


//esta funcion ejecuta las tres funciones de validaciones 
function validacionTotal(){
    validacionActiva = true; // flag que indica si se presionó el botón Finalizar compra
    validacionesFormaDePago();
    validacionCostoEnvio();
    validacionDeCantidades();
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
    
    escuchaTipoDeEnvio();

    //esto escucha el click en el boton de seleccionar al iniciar para
    //que todo este desabilitado.
    document.getElementById("botonFormaPago").addEventListener('click', function() {
        if (formaDePago == "No ha seleccionado") funcionamientoModal(0);
    });

    /* esto escucha el submit del form, detiene el envío y hace las validaciones*/
    document.getElementById('form').addEventListener('submit', function (event) {
        this.checkValidity(); //validacion de bootstrap
        validacionTotal(); // las otras validaciones mias
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
        
        console.log('validacionCantidades: ', validacionCantidades);
        console.log('validacionTipoDeEnvio: ', validacionTipoDeEnvio);
        console.log('validacionModal: ', validacionModal);
        if (validacionCantidades
            && validacionTipoDeEnvio
            && validacionModal
            && this.checkValidity()) {
            let AlertToAppend = `
            <div class="alert alert-success" role="alert">
            <h1>¡HAS COMPRADO CON ÉXITO!</h2>
            </div>`;
            document.getElementById("alertFinalizarCompraExito").innerHTML = AlertToAppend;
            console.log('éxito rotundo');
        } 

    });

    //escucha el click en el radio Credito y luego del submit valida sus input
    document.getElementById('radioCredito').addEventListener('click', function (e) {
        let feedbackFormaPago = document.getElementById("feedbackFormaPago");

        formaDePago = `Tarjeta de crédito`;
        document.getElementById('contengoFormaPago').innerHTML = formaDePago;
        funcionamientoModal(1);
        feedbackFormaPago.classList.remove("d-inline");
        feedbackFormaPago.classList.add("d-none");

        validaNroTarjetaAhora();
        validaCodigoSegAhora();
        validaVencimientoAhora();
    });

    //escucha el click en el radio Transferencias y luego del submit valida su input
    document.getElementById('radioTransferencia').addEventListener('click', function (e) {
        let feedbackFormaPago = document.getElementById("feedbackFormaPago");

        formaDePago = `Transferencia bancaria`;
        document.getElementById('contengoFormaPago').innerHTML = formaDePago;
        funcionamientoModal(2);
        feedbackFormaPago.classList.remove("d-inline");
        feedbackFormaPago.classList.add("d-none");

        validaNroCuentaAhora();
    });


    //escucha si cambia el contenido del input y ejecuta a validacion en el acto
    document.getElementById("inputTarjeta").addEventListener("input", function () {
        validaNroTarjetaAhora();
    });
    document.getElementById("inputSeguridad").addEventListener("input", function () {
        validaCodigoSegAhora();
    });
    document.getElementById("inputVencimiento").addEventListener("input", function () {
        validaVencimientoAhora();
    });

    //escucha si cambia el contenido del input y ejecuta a validacion en el acto
    document.getElementById("inputCuenta").addEventListener("input", function () {
        validaNroCuentaAhora();
    });

    
});

