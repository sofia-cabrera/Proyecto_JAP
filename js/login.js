// validar que los campos de email y contraseña no esten vacios
//para que el botón Ingresar redireccione a la portada

const email = document.getElementById('email_addr');
const password = document.getElementById('password');

function redireccionar() {
    
};

//gurdar en el localStorage email

function setEmail(email) {
    localStorage.setItem("email", email)
};

document.addEventListener("DOMContentLoaded", function () {
    //escucha de evento al botón de ingresar para que guarde el email y redireccione
    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
        
        this.checkValidity();
        
        this.classList.add('was-validate');
        if ((email.checkValidity()) && (password.checkValidity())) {
        window.location.href = "portada.html"
        }
    
    });

});

