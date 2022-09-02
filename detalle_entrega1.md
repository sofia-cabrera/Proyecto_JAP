HTML index-----------------------------------------

para el formulario de registro
primero nombre al html "index" para que fuera el primero
al anterior index le nombré "portada"
cambié a portada.html las indicaciones de a donde me redireccionaba la barra de navegación
cuando haces click en inicio porque sino me llevan al formulario cada vez 

agregué la imagen del logotipo
la centre y le di el tamaño y margen en css, simple para que se vea más bonito
dos inputs uno para email (type email) y otro para contraseña (type password)
sus correspondientes legend, placeholders 
botón de ingresar con un poquito de estilo

vaidación si los campos no estan vacios redirecciona a portada.html

PRODUCTS---------------------------------------------
Desde categorias, al hacer click va a mostrar los productos que la componen
y click en estas a product-info.html

código---
al cargar la página (el DOM)
llama a getJsonData y el objeto que me devuelve lo guardo en el array listado
luego llama a la función mostarProductos 
que lo hace a traves de un string en el cual va cargando cada uno de los elementos
recorriendo el array con un for
y luego con dom los va dibujando en pantalla

------------------------------------------------------------
//codigo robado para algo de google del desafio que aun no entiendo
function onSignIn(googleusercontent){ localStorage.setItem("UserName", googleusercontent.getBasicProfile().getName()); window.location.href="inicio.html"
de Federico Maciel a Todos21:06
y esa para cargar la info del usuario
de Sofía Cabrera a Todos21:07
//HACE FUNCIONAR EL BOTON DE GOOGLE window.gapi.load('client:auth2', () => { window.gapi.client.init({ clientId: '615608594140-s7jo6t6nvrr1fbcsae322cks38e3hav6.apps.googleusercontent.com', scope:'email', plugin_name: "e-comercio" }) })



