1. # hecho
Haciendo uso del id de usuario 25801 (usser ficticio con info ingresada), realizar la petición web a la URL donde se encuentra un carrito de compras ,ya con un producto precargado, y mostrar en HTML la información del mismo: nombre, costo, cantidad (como valor de un input), moneda, imagen y subtotal (costo por cantidad).
<!--getJSONData para recibir esa info, revisar como vienen esos datos -->
<!--Anotación suelta: traer del servidor todo y guerdarlo en el local storage
traer del local storage la info 
unirlos en una sola lista-->

2. # hecho
Incluir los controles gráficos necesarios para seleccionar tipo de envío y dirección (calle, número y esquina). La funcionalidad a dichos controles la trabajaremos en una entrega posterior.

3. # hecho
Modificar el subtotal de la compra del artículo, EN TIEMPO REAL, si se modifica la cantidad. Recuerda que el subtotal se calcula como el precio unitario del producto multiplicado por la cantidad.
<!--necesito el value de ese campo, uso evento onchange o input para en el momento en el que cambie ocurra todo lo que tenga que suceder, llamo una función le paso de parametro el id y el value (this.value)-->

4. # hecho ¡Desafíate!
-Nuestro carrito de compras ya trae un producto precargado, pero para completar la funcionalidad de la página, haz que el usuario pueda agregar los productos que quiera al carrito.
-Todos deben mostrarse tal como el que viene del servidor, y también deben modificar su subtotal según varíe la cantidad.
ESTO DESDE EL ALMACENAMIENTO LOCAL


5. # Soluciones

Agregar productos al carrito
Al click en comprar se ejecuta agregarAlCarrito
- compara el producto nuevo con los que ya están 
- si está agrega 1 a la cantidad
- si no está lo agrega a la lista
- en todos los casos lo guarda en el localStorage
- EXTRA botón que me devuelve a la pagina anterior, al listado

Al carga cart.html
- traer la info del json- falso servidor (getJSONData)
- traer los productos que se guardaron en articulos nuevos
- unificar las listas
- los guarda como articulos en el local

Al cambiar la cantidad
- se ejecuta cambiar count, que recibe el valor y la id del producto
- recorre los productos compara la id y caundo encuentra la coincidencia modifica la cantidad
- guardo en el local la modificación y luego actualizo la lista en pantalla

Quitar producto del carrito
click en quitar
- ejecuta quitarArticulo (recibe como parametro el articulo.id)
- ahí con el metodo filter armo una nueva lista con todos los products que no tengan ese id
- la guardo en el local
- y vuelvo a mostrar los productos del carrito
