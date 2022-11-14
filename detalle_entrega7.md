Modificaciones en el login 
- Aspecto imagen de fondo y los campos ahora estan en una card de bootstrap
  con clase form-control para que se validen con bootstrap al momento de darle
  al submit (que si se valida solo redirige no envia formulario )
- al cerrar cesión no clear al local, solo remove el email
    (así persisten los datos del usuario que corresponden)
-----------------------------------------------------------------
codigo viejo del login
<div id="logotipo">
      <img src="img/login.png" alt="logo" id="logo">
    </div>
    <div id="formulario" class="form-group text-center">
      <!--class form-group bootstrap-->
      <div>
        <legend>Usuario</legend>
          <input type="email" id="email_addr" name="direccion-correo" required       placeholder="Escriba aquí su email"
          size="30" />
        <!-- type="email" indica que el contenido ingresado debe ser un email valido, tener formato de email-->
      </div>
      <div>
        <legend>Contraseña</legend>
        <input type="password" id="password" name="password" placeholder="Escriba aquí su contraseña" size="30">
        <!--type="password" los caracteres ingresados en este campo quedan ocultos, se convierten en puntos-->
      </div>
      <div id="boton">
        <button class="btn btn-default">Ingresar</button>
        <!--este boton redirecciona a portada.html-->
      </div>
      <!--<div class="g-signin2 " data-onsuccess="onSignIn"></div>-->
    </div>
  </div>

  
-----------------------------------------------------------------
-----------------------------------------------------------------


para acceder a la página necesitas estar logeado
(actualmente si te logueas se guarda el email en el localStorage)
# primer solución <!--lo literal-->
- al cargar la pagina consulto si existe email en el local
- sino mostrar un modal o alerta que indica el problema ("Para acceder a tu perfil primero debes registrarte") redirigir al loggin 

# segunda solución <!--esta es mi favorita-->
- al cargar la pagina consulto si existe email en el local
- sino abrir un modal donde la persona pueda loguearse en el acto

# la solucion que hice
al intentar entrar al perfil, si hay email en el local podes acceder 
sino te redirecciona al login con una alerta y al ingresar te envia al perfil
<!---aproveche y agregue esta funcionalida personalizada al carrito-->

------------------------------------------------------------------------------------

<SI YA ESTABAS LOGUEADO>
carga el html con los campos
la primer vez solo el email va a estar completo con el dato de login
traigo del local el email igual que hago para la navBar

el <BOTÓN GUARDAR CAMBIOS> es el que verfica que los datos obigatrios estén completos
VALIDACIONES
y guarda al usuario en el local para que al volver al ingresar se muestren estos datos 
como valores de los input
