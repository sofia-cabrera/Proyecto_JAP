1.  #
Mostar los productos relacionados
    (debajo de los controles para dejar opinión un hr y luego..)
    <!--imprimo titulo desde el html y luego cada producto relacionado en una card de bootstrap con foto del producto y nombre desde js con DOM-->
-Al pulsar sobre uno de los productos relacionados, se debe actualizar la página, mostrando ahora la información de dicho producto.
    <!--sustituyo el valor de productID en el localStorage, luego recargo la página-->
------------------------------------------------------------------------------------------

2.  #
Convierte el nombre del usuario en un menú desplegable
    (manteniendo el nombre de usuario cómo botón)
<!--Debo trabajo desde init.js proque es el que comparten todos los html que tienen barra
de navegación-->


agrega allí las opciones:
    -Mi carrito y que al seleccionarla redirija a esa pantalla (trabajaremos sobre esta página en una futura entrega).
    -Mi perfil y que al seleccionarla redirija a esa pantalla (trabajaremos sobre esta página en una futura entrega)
    -Cerrar sesión, que deberá redirigir a la pantalla de inicio de sesión, borrando el usuario autenticado.
-----------------------------------------------------------------

3.  #
¡Desafíate!
¿Te gustaría que la página de información del producto sea un poco más dinámica? puedes usar un carrusel para mostrar las imágenes
----------------------------------------------------------------



Extra:

En product-info me llevé la barra de navegación a el init, la use en una función (navBar()) y la meto por con Dom aun div en el html con id="nabBar";
luego al momento de cargar cada pagina llamo a la función y listos






# estructura para el menú desplegable

<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="simpleDropdown" data-bs-toggle="dropdown" aria-expanded="false">
    menú
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>


