1. # hecho
Haciendo uso del id de usuario 25801 (usser ficticio con info ingresada), realizar la petición web a la URL donde se encuentra un carrito de compras ,ya con un producto precargado, y mostrar en HTML la información del mismo: nombre, costo, cantidad (como valor de un input), moneda, imagen y subtotal (costo por cantidad).
<!--getJSONData para recibir esa info, revisar como vienen esos datos -->
<!--Anotación suelta: traer del servidor todo y guerdarlo en el local storage
traer del local storage la info 
unirlos en una sola lista-->

2. # hecho
Incluir los controles gráficos necesarios para seleccionar tipo de envío y dirección (calle, número y esquina). La funcionalidad a dichos controles la trabajaremos en una entrega posterior.

3. # 
Modificar el subtotal de la compra del artículo, EN TIEMPO REAL, si se modifica la cantidad. Recuerda que el subtotal se calcula como el precio unitario del producto multiplicado por la cantidad.
UN EVENTO QUE EJECUTE UN CÁLCULO
MULTIPLIQUE EL PRECIO POR LA CANTIDAD EN EL ACTO E IMPRIMA EL RESULTADO EN EL MOMENTO
ESE CAMBIO puede guardarse en el almacenamiento local apra que permanezca

4. # ¡Desafíate!

-Nuestro carrito de compras ya trae un producto precargado, pero para completar la funcionalidad de la página, haz que el usuario pueda agregar los productos que quiera al carrito.
ESTO LO RESOLVÍ, AGREGANDO UN  BOTÓN EN LA INFO DEL PRODUCTO QUE TRAE LA LISTA DE PRODUCTOS SELECCIONADOS DEL LOCALSTORAGE AGREGA EL PRODUCTO NUEVO Y LA VUELVE A GUARDAR EN EL LOCAL

-Todos deben mostrarse tal como el que viene del servidor, y también deben modificar su subtotal según varíe la cantidad.
ESTO DESDE EL ALMACENAMIENTO LOCAL
<!----------CUIDADO--------
como hago que al cambiar las cantidades de un producto del carrito el código identifique cual es el producto a cambiar el subtotal
podría: hacer una lista guardada en el local storage de "productos en el cart" que contenga primero el que viene del servidor y que pueda contener nuevos productos. Cada item de la lista necesito que tenga identificado su cantidad y subtotal de alguna manera -->


poner un botón en la info del producto que guarde en una lista en el localstorage
ese boton modifica el array 

luego muestro esa lista en el carrito
remover el item segun el id, para que se identifique que item remover
llamo una función onclik que reciba como el parametro el id
que traiga por el id el elemento y lo elimine
y luego vuelvo a llamar la funcion que muestra los productos en pantalla

modificar cantidad de un elemento
voy a modificarla en el array, no en pantalla!
modifico en el array y luego actualizo la lista en pantalla
necesito el value de ese campo, uso evento onchange o input para en el moemnto en el qeu cambie ocurra todo lo que tenga que suceder, llamo una función le paso de parametro el id y necesito pasarle el value por parametro(this.value)

coloco el id del producto como id del input cuando armo la plantilla (p${producto.id})
<!--el id no tiene que empezar con un numero-->
para identificarlo con el producto dentro del for

cada vez que entro necesito hacer la consulta al servidor y traer de nuevo y borrar el que ya tenía. esto desde una condicional

necesito que cuando un producto ya está en el carrito modificar la cantidad
<!--if (localStorage.getItem("userCart")[0].id!=user25801.id)-->

como sumar productos:
traer el json convertirlo en un array sumar el producto, volver a combertirlo en un json y volver a cargarlo en el localstorage.