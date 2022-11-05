
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
      console.log("Converted Base64 version is " + document.getElementById("img_perfil").innerHTML);
    }
    fileReader.readAsDataURL(fileToLoad);
  }
};


document.addEventListener("DOMContentLoaded", function () {
  navBar();
  recuperarEmail();
  
  document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    let inputs = form.querySelectorAll('input');
    inputs.forEach((el) => {
      if (el.id === "nombre2" || el.id === "apellido2" || el.id === "inputFileToLoad" || el.id === "telefono") {
        noValidate(el);
        console.log('adentro if no validar');

      } else {
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
      }
    })
  });
});