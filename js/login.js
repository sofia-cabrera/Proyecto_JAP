// validar que los campos de email y contraseña no esten vacios
//para que el botón Ingresar redireccione a la portada

const email= document.getElementById ('email_addr');
const password= document.getElementById ('password');

function redireccionar(){
    if ((email.value != "") && (password.value != "")) {
        window.location.href = "portada.html";
    }
}

//necesito guardar en el localStorage el objeto/valor de email
//para recuperarlo en la barra de navegación, aparezca a la derecha siempre 