
let usuarios = [];
let email = document.getElementById('email_addr');
let password = document.getElementById('password');
let loginFlag = "";

let nuevosDatos = {
    nombre: "",
    segundoNombre: "",
    apellido: "",
    segundoApellido: "",
    email: "",
    img: "",
    telefono: ""
};

//validaciones inputs
function validateInput(input) {
    if (input.classList.contains('is-invalid')) {
        input.classList.remove('is-invalid')
    }
    input.classList.add('is-valid')
};
function invalidateInput(input) {
    if (input.classList.contains('is-valid')) {
        input.classList.remove('is-valid')
    }

    input.classList.add('is-invalid')
};



//alerta que aparece si quisimos entrar al perfil sin loguearnos
function mostrarAlerta() {
    let alertToAppend = "";
    if (loginFlag == "mostrar alerta perfil") {
        alertToAppend += `
        <div id="alert01" class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Debes loguearte para poder acceder a tu perfil</strong>
          <button type="button"  class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;

        document.getElementById("alerta").innerHTML = alertToAppend;
        localStorage.removeItem("loginFlag");
    }

    if (loginFlag == "mostrar alerta carrito") {
        alertToAppend += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Debes loguearte para poder acceder a tu carrito</strong>
        <button type="button"  class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
        document.getElementById("alerta").innerHTML = alertToAppend;
        localStorage.removeItem("loginFlag");
    }

};


//nos dice si el usuario ya entró antes
function siUsuarioNoExisteAgregarUsuario() {
    let seRepite = 0;
    usuarios.forEach((usuario) => {
        console.log(usuario.email);
        console.log(email.value);
        if (usuario.email == email.value) {
            seRepite = 1;
            console.log(seRepite);
        }
    });
    if (seRepite == 0) {
        crearNuevoUsuario();
    }
};

function crearNuevoUsuario() {
    let nuevosDatos = {
        nombre: "",
        segundoNombre: "",
        apellido: "",
        segundoApellido: "",
        email: (email.value),
        img: "img/img_perfil.png",
        telefono: ""
    };
    usuarios.push(nuevosDatos);
}

function getUsuarios() {
    if (localStorage.getItem("usuarios")) {
        usuarios_json = localStorage.getItem("usuarios");
        usuarios = JSON.parse(usuarios_json);
    }
};
function setUsuarios() {
    let usuarios_json = JSON.stringify(usuarios);
    localStorage.setItem("usuarios", usuarios_json);
};
  

//gurdar en el localStorage email

function setEmail(email) {
    localStorage.setItem("email", email)
};

document.addEventListener("DOMContentLoaded", function () {
    getUsuarios();


    //esto identifica el caso de que nos haya redirigido por querer acceder sin loguearnos
    if (localStorage.getItem("loginFlag")) {
        loginFlag = localStorage.getItem("loginFlag");
        mostrarAlerta();
    }

    //escucha de evento al botón de ingresar para que guarde el email y redireccione
    document.getElementById('form').addEventListener('submit', function (event) {
        console.log("entré");
        event.preventDefault();
        event.stopPropagation();

        let inputs = form.querySelectorAll('input');
        inputs.forEach((el) => {

            if (el.checkValidity()) {
                validateInput(el);
            } else {
                invalidateInput(el);
            }

            el.addEventListener('input', function () {
                if (el.checkValidity()) {
                    validateInput(el);
                } else {
                    invalidateInput(el);
                }
            });

        })
        if (email.checkValidity() && password.checkValidity()) {
            setEmail(email.value);
            siUsuarioNoExisteAgregarUsuario();
            setUsuarios();

            if(localStorage.getItem("origen")){
                origen= localStorage.getItem("origen");
                window.location.href=(origen);//redireciona al origen
                localStorage.removeItem("origen");
            }else{window.location.href=("portada.html");}//redireciona a la portada
        }

    });


});

