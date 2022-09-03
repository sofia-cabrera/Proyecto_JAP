Para esta entrega necesito:

1.  # Agregar el email.
En la barra de navegación, agregar en la esquina derecha el nombre del usuario (email) ingresado en la pantalla de inicio de sesión. Para ello deberás hacer uso del almacenamiento local.
-   localStorage.setItem para guardar el dato al momento de registrarse (botón Ingresar) 
-   localStorage.getItem en init.js que es el doc js que comparten todos los html
recuperEmail() recupera el dato y lo coloca en el contenedor dentro de la lista de items en la barra de navegación <!--le puse el mismo id a el último item vacio en todos los html-->
--------------------------------------------------------------------------------


2. # <!--ESTO YA LO HABÍA RESULETO DESDE LA ENTREGA 1)-->
-Cuando el usuario selecciona una categoría de productos,
 su identificador es guardado en el almacenamiento local
 antes de redirigir a productos.html.
-Modifica la solicitud realizada en la carga del listado de productos
 (que hicimos en la entrega anterior) para que utilice
 ese identificador, en lugar de 101.
-----------------------------------------------------------------------------
Mi código ya mostraba el contenido de la correspondiente a la categoria seleccionada
cuando redirige a products.html
3.  # Con el listado de productos desplegado: FILTRAR Y ORDENAR
-   Aplicar filtros a partir de rango de precio definido.
-   Agregar las funcionalidades de orden ascendente y descendente en función del precio y descendente en función de la relevancia (tomaremos para ello la cantidad de artículos vendidos)

-   Reciclé código de categories en products
(aclaro reciclé porque me basé en eso pero no identico)
sobretodo para aprovechar el estilo de los botones para ordenar.
Simplifiqué el código todo lo que pude pero me gustaría simplificarlo más.
-----------------------------------------------------------------------------


4. # BUSCADOR 
Incorpora un campo de texto buscador <input type="search">, que filtre en tiempo real (el evento input te será de ayuda) según el texto que se ingresa en dicho campo.
Incluye en la búsqueda el texto en el título y en la descripción de los artículos.
-----------------------------------------------------------------------------

5.  # PREGUNTAS:
    -   porque funciona esta estructura de if else sin las llaves:
        es "javascript nativo"?
        ```javascript
        document.getElementById("rangeFilterPrecio").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio los productos
        
            minPrecio = document.getElementById("rangeFilterPrecioMin").value;
            maxPrecio = document.getElementById("rangeFilterPrecioMax").value;

            if(minPrecio == "") minPrecio=undefined;
            else minPrecio = parseInt(minPrecio);
            if(maxPrecio=="") maxPrecio = undefined;
            else maxPrecio = parseInt(maxPrecio);

            mostrarProductos();
        });
        ```
    -   porqué los llamados a los js estan dentro del body al final en los html?
    -   qué otras partes del código podría simplificar