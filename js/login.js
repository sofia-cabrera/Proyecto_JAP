// validar que los campos de email y contraseña no esten vacios
//para que el botón Ingresar redireccione a la portada

const email= document.getElementById ('email_addr');
const contrasenia= document.getElementById ('password');

function redireccionar(){
    if ((email.value != "") && (contrasenia.value != "")) {
        window.location.href = "portada.html";
    }
    
}