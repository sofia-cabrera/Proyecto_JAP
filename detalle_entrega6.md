1. # costosTotales <!--HECHO-->
    # Agrega un espacio donde se visualicen:
    -   El subtotal general: la suma de los subtotales (costo por cantidad) de todos los artículos
    -   El costo de envío: calculado a partir del envío seleccionado por el usuario (5%, 7% o 15%) y siendo un porcentaje del valor anterior (el subtotal).
    -   El total a pagar: la suma de los dos valores anteriores.
    - detalles:
    Los 3 valores deberán actualizarse en tiempo real cuando se modifique el tipo de envío o los artículos en el carrito.
    Todos los valores deberán ser mostrados en dólares.
.
------------------------------------------------------------------------

2. # modal Forma De Pago<!--HECHO-->
    <!---->
    Añadir un modal que permita establecer una forma de pago e introducir los datos de la misma
    Las mismas deberán ser tarjeta de crédito o transferencia bancaria, y deberán desactivarse los campos de la opción no seleccionada.
.
-------------------------------------------------------------------------
----------------------------------------------------------------------

3. # 
Añade también un botón para confirmar la compra
Al presionarlo deberán ejecutarse las siguientes validaciones (dando el feedback correspondiente al usuario):

-Los campos calle, número y esquina, no podrán estar vacíos.
-Deberá estar seleccionada la forma de envío.
-La cantidad para cada artículo deberá estar definida y ser mayor a 0
-Deberá haberse seleccionado una forma de pago
-Los campos, para la forma de pago seleccionada, no podrán estar vacíos

Por último, se deberá avisar al usuario cuando la compra se haya realizado exitosamente.
¡Has comprado con éxito! (alert)
-------------------------------------------------------------------------------

4. # Desafío <!--HECHO-->
<!--yo ya había puesto el botón quitar producto, ahora solo le agregé
que al quitar producto se actualizen los costos totales-->
A nuestro carrito solamente le falta la funcionalidad de eliminar artículos.
Desarróllala teniendo en cuenta que se deberán actualizar los totales
cada vez que se elimine un artículo.
