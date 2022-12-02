const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
};

function navBar(){
  barraNavegacion="";
  barraNavegacion+=`
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-1">
    <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav w-100 justify-content-between">
          <li class="nav-item">
            <a class="nav-link" href="portada.html">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="categories.html">Categorías</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="sell.html">Vender</a>
          </li>
          <li>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="containerEmail" data-bs-toggle="dropdown" aria-expanded="false">
              </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li><a class="dropdown-item" href="cart.html">Carrito</a></li>
                  <li><a class="dropdown-item" href="my-profile.html">Perfil</a></li>
                  <li><a id="cerrar" class="dropdown-item" href="index.html">Cerrar sesión</a></li>
                </ul>
            </div>
          </li>
        
        </ul>
      </div>
    </div>
  </nav>
  `
document.getElementById("navBar").innerHTML = barraNavegacion;
};

//onclick="cerrarSesion()"
function recuperarEmail (){
  if (localStorage.getItem ("email")){
    email= localStorage.getItem("email");
    console.log(email);
    document.getElementById ("containerEmail").innerHTML= email;
  };
};

function cerrarSesion(){
  localStorage.removeItem("email");
};


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";

// Inicializa aplicacion Firebase
const app = initializeApp(firebaseConfig);

// Inicializa autenticacion mediante Firebase
const auth = getAuth();

document.getElementById("cerrar").addEventListener("click", function(e) {
    signOut(auth).then(() => {

        localStorage.removeItem('usuario');

        console.log("Cierrar sesion");
        
        // location.reload();

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
});
