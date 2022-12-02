
// Importa scripts de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAuth, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";

// Inicializa configuracion de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC8T8m1RUUP-6_xLLS3dsYfdeTVubYwoBc",
    authDomain: "e-commercee-ac057.firebaseapp.com",
    projectId: "e-commercee-ac057",
    storageBucket: "e-commercee-ac057.appspot.com",
    messagingSenderId: "195482324927",
    appId: "1:195482324927:web:349a03cd9d1b0400391b0a"
  };

// Inicializa aplicacion Firebase
const app = initializeApp(firebaseConfig);
// Inicializa autenticacion mediante Firebase
const auth = getAuth();

// Agrega autenticacion con Google
const google = new GoogleAuthProvider();

// Inicia sesion con Google
document.getElementById("iniciarGoogle").addEventListener("click", function(e) {
    console.log("Iniciando sesion");

    signInWithPopup(auth, google)
        .then((result) => {
            // Se adquiere un Token de Acceso
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;

            // Aqui se obtine la informacion del usuario que inició sesión
            const user = result.user;

            console.log("Sesion iniciada");

        }).catch((error) => {
            // Manejo de errores
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);

            // Imprime errores en la consola
            // Aunque no hacemos nada con esta info por ahora
            console.log(errorCode);
            console.log(errorMessage);
        });
});

onAuthStateChanged(auth, (user) => {
    let usuario = undefined;

    if (user) {
        usuario = {
            nombre: user.displayName,
            correo: user.email
        }

        console.log(usuario);
        localStorage.setItem("usuario", JSON.stringify(usuario));
    }
});


//window.iniciarSesionGoogle = iniciarSesionGoogle;
