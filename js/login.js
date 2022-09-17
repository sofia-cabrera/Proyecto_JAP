// validar que los campos de email y contraseña no esten vacios
//para que el botón Ingresar redireccione a la portada

const email= document.getElementById ('email_addr');
const password= document.getElementById ('password');

function redireccionar(){
    if ((email.value != "") && (password.value != "")) {
        window.location.href = "portada.html";
    }
}

//gurdar en el localStorage email

function setEmail (email){
    localStorage.setItem ("email",email)
}

//escucha de evento al botón de ingresar para que guarde el email y redireccione
document.getElementById("boton").addEventListener("click",function(){
    setEmail(email.value)
    redireccionar()
})
