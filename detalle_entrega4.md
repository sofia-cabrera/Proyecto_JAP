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
<!--trabajo desde init.js proque es el que comparten todos los html que tienen barra
de navegación así no tengo que repetir el código en todos mis documentos-->


agrega allí las opciones:
    -Mi carrito y que al seleccionarla redirija a esa pantalla
    -Mi perfil y que al seleccionarla redirija a esa pantalla
    -Cerrar sesión, que deberá redirigir a la pantalla de inicio de sesión, borrando el usuario autenticado.
-----------------------------------------------------------------
# menú desplegable

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




    


3.  #
¡Desafíate!
¿Te gustaría que la página de información del producto sea un poco más dinámica? puedes usar un carrusel para mostrar las imágenes
----------------------------------------------------------------



4. # Extra:
Para simplificar el código:
- En product-info me llevé la barra de navegación a el init, la puse en una función (navBar())
- la meto por con Dom a un div en el html con id="nabBar";
- luego al momento de cargar cada pagina llamo a la función y listos
- sustituí eso en todos los html y llame la función en los js
- esa navBar ya tiene incluido el menú desplegable en el usuario que permite ir al carrito, al   perfil, o cerrar sesión

-quite el titulo imagenes ilustrativas y lo dejé como un title de las imagenes a mostrar, solo se ve cuando colocas el cursor sobre las img, marquetineramente no es bueno

-coloqué las img en un carrusel a la derecha de la de la info 
-----------------------------------------------------------
