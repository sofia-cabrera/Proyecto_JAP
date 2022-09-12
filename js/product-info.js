const PRODUCT_INFO_URL_A_MOSTRAR= PRODUCT_INFO_URL+ localStorage.getItem("productID") + EXT_TYPE;
const COMENTARIOS_URL = PRODUCT_INFO_COMMENTS_URL+ localStorage.getItem("productID")+ EXT_TYPE;
let listadoDeComentarios= [];

function mostrarInfo(){

}

function mostrarComentarios(){

}




document.addEventListener("DOMContentLoaded", function () {
    recuperarEmail();//del localStorage y los coloca en la esquina sup derecha

    getJSONData(PRODUCT_INFO_URL_A_MOSTRAR).then(resultObj => {
        console.log("infoProducto " + PRODUCT_INFO_URL_A_MOSTRAR)
        document.getElementById("productName").innerText = resultObj.data.name;//para provar si puedo mostar el dato
        if (resultObj.status == "ok") {
            mostrarInfo();
        }   
        getJSONData(COMENTARIOS_URL).then(resultObj => {
            console.log("comentarios ", COMENTARIOS_URL)
            listadoDeComentarios = resultObj.data;
            console.log("comentarios", listadoDeComentarios)
        });
            
        
    });
});


//name: string
//description: string
//cost: entero
//currency: string
//soldCount: entero
//category: string
//images: string
