let emailDelUsuario = "";
let usuarios = [];


let nuevosDatos = {
  nombre: "",
  segundoNombre: "",
  apellido: "",
  segundoApellido: "",
  email: "",
  img: "",
  telefono: ""
};

//estas tres funciones son las que colocan las clases para las validaciones del perfil
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
function noValidate(input) {
  if (input.classList.contains('is-valid', 'is-invalid')) {
    input.classList.remove('is-valid', 'is-invalid')
  }
};


function validacionesForm() {
  let emailNuevo = document.getElementById("email");
  let emailSeRepite = 0;
  let emailAnteriorIgualNuevo = 0;
  if (emailNuevo.value === emailDelUsuario) {
    //emailAnteriorIgualNuevo=1;
    emailSeRepite = 0;
  } else {
    usuarios.forEach((usuario) => {
      if (usuario.email == emailNuevo.value) {
        emailSeRepite = 1;
        console.log("se repite el email", emailSeRepite);
      }
    });
  }


  let validos = 0;
  let inputs = form.querySelectorAll('input');
  inputs.forEach((el) => {
    if (el.id === "nombre2" || el.id === "apellido2" || el.id === "inputFileToLoad" || el.id === "telefono") {
      noValidate(el);//acá le indico que no tiene que validar los campos que no son requeridos
    } else {
      //si son los requeridos
      if (el.id === "email" && emailSeRepite == 1) {
        invalidateInput(el);
        alert('ya existe una cuenta con ese email');
      } else {
        if (el.checkValidity()) {
          validateInput(el);
          validos++;
        } else {
          invalidateInput(el);
        }
      }
      el.addEventListener('input', function () {
        if (el.checkValidity()) {
          validateInput(el);
          validos++;
        } else {
          invalidateInput(el);
        }
      });
    }
  })

  console.log("Cantidad de campos requeridos validos", validos);
  if (validos == 3) {
    guardarEnUsuariosNuevosDatosDePerfil();
  }
};

//esto arma el objeto nuevosDatos que van a sustituir los datos viejos en la lista
//de usuarios se ejecuta sí se validan los tres campos requeridos al click en Guardar cambios
function guardarEnUsuariosNuevosDatosDePerfil() {
  let nuevosDatos = {
    nombre: (document.getElementById("nombre1").value),
    segundoNombre: (document.getElementById("nombre2").value),
    apellido: (document.getElementById("apellido1").value),
    segundoApellido: (document.getElementById("apellido2").value),
    email: (document.getElementById("email").value),
    img: (document.getElementById("img_perfil").src),
    telefono: (document.getElementById("telefono").value)
  };

  //actualiza los datos de perfil
  
  usuarios.forEach((usuario) => {
    if (usuario.email == emailDelUsuario) {
      usuario.nombre = nuevosDatos.nombre;
      usuario.segundoNombre = nuevosDatos.segundoNombre;
      usuario.apellido = nuevosDatos.apellido;
      usuario.segundoApellido = nuevosDatos.segundoApellido;
      usuario.email = nuevosDatos.email;
      usuario.img = nuevosDatos.img;
      usuario.telefono = nuevosDatos.telefono;
    }

  })
  console.log(nuevosDatos);
  //actualiza el email del usuario del local el que uso en la navBar
  if (nuevosDatos.email !== emailDelUsuario) {
    emailDelUsuario = nuevosDatos.email;
    localStorage.setItem("email", emailDelUsuario);
  }

};

//esta funcion me permite pasar la imagen a string y sustituir el url de la imagen en pantalla
function encodeImageFileAsURL() {

  let filesSelected = document.getElementById("inputFileToLoad").files;
  if (filesSelected.length > 0) {
    let fileToLoad = filesSelected[0];

    let fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      let srcData = fileLoadedEvent.target.result; // <--- data: base64
      let imagen = document.getElementById("img_perfil")

      imagen.src = srcData;

      document.getElementById("img_perfil").innerHTML = imagen.outerHTML;
      imgComoString = imagen.src;
      //console.log("Converted Base64 version is " + imagen.outerHTML);
    }
    fileReader.readAsDataURL(fileToLoad);
  }
};

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


//al cargar la pagina si es mi primer vez carga email
function recuperarEmailEnPerfil() {
  if (localStorage.getItem("email")) {
    emailDelUsuario = localStorage.getItem("email");
    console.log(emailDelUsuario);
    document.getElementById("containerEmail").innerHTML = emailDelUsuario;
    let contenedorEmail = document.getElementById("email");
    contenedorEmail.value = emailDelUsuario;
  };
};

//al cargar la pagina cargar datos preexistentes si ya guardé
function cargarDatosDePerfil() {
  let contenedorNombre = document.getElementById("nombre1");
  let contenedorSegundoNombre = document.getElementById("nombre2");
  let contenedorApellido = document.getElementById("apellido1");
  let contenedorSegundoApellido = document.getElementById("apellido2");
  let contenedorEmail = document.getElementById("email");
  let contenedorImg = document.getElementById("img_perfil");
  let contenedorTelefono = document.getElementById("telefono");
  usuarios.forEach((usuario) => {
    if (emailDelUsuario === usuario.email) {

      contenedorNombre.value = usuario.nombre;
      contenedorSegundoNombre.value = usuario.segundoNombre;
      contenedorApellido.value = usuario.apellido;
      contenedorSegundoApellido.value = usuario.segundoApellido;
      contenedorEmail.value = usuario.email;
      contenedorImg.src = usuario.img;
      contenedorTelefono.value = usuario.telefono;
    }
  }
  );

};


document.addEventListener("DOMContentLoaded", function () {
  navBar();
  getUsuarios();
  recuperarEmailEnPerfil();
  cargarDatosDePerfil();


  document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    validacionesForm();//valida y si todo esta bien actualiza la lista de usuarios para guardarla
    setUsuarios();//guardo en el local la lista de usuarios con la modificación correspondientes
    recuperarEmail();//esto en caso de que el email haya sido modificado

  });
});