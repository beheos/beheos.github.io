        var nombre = $('#nombre');
        var correo = $('#correo');
        var mensaje = $('#mensaje');
        var url = "https://formspree.io/f/mrgjrngy";

function validarformulario (){
    $('.alert').remove();
    $('.alert_recibido').remove();

        let nombre = this.nombre.val();
        let correo = this.correo.val();
        let mensaje = this.mensaje.val();


    if(nombre == "" || nombre ==null ){
        validacioncolor("nombre");
        mostraralerta("Campo Obligatorio");
        return false;
    }else{
        var expresion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]*$/;
        if(!expresion.test(nombre)){
            validacioncolor("nombre");
            mostraralerta("No se permiten caracteres espceiales o numeros");
            return false;
        }
    }

    if(correo == "" || correo ==null ){
        validacioncolor("correo");
        mostraralerta("Campo Obligatorio");
        return false;
    }else{
        var expresion = /^\w+([\.-]?w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if(!expresion.test(correo)){
            validacioncolor("correo");
            mostraralerta("Por favor ingrese un correo valido");
            return false;
        }
    }

    if(mensaje == "" || mensaje ==null ){
        validacioncolor("mensaje");
        mostraralerta("Campo Obligatorio");
        return false;
    }else{
        var expresion = /^[,\\.\\a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;
        if(!expresion.test(mensaje)){
            validacioncolor("mensaje");
            mostraralerta("No se permiten caracteres espceiales");
            return false;
        }
    }

    var datos = {
        nombre_mail:nombre,
        correo_mail:correo,
        mensaje_mail:mensaje
    }

    enviarDatos(datos, url);
}

$('input').focus(function(){
    $('.alert').remove();
    $('.alert_recibido').remove();
    validacioncolordefault('nombre');
    validacioncolordefault('correo');
    validacioncolordefault('mensaje');
});

function validacioncolor(dato){
    $('#' + dato).css({
        border: "1px solid #dd5144"
    });
}

function validacioncolordefault(dato){
    $('#' + dato).css({
        border: "1px solid #333"
    });
}

function mostraralerta(texto){
    $('#nombre').before('<div class="alert">Error: ' + texto + '</div>')
}

function mensajeenviado(){
    $('#nombre').before('<div class="alert_recibido">Recibimos tu correo</div>')
}

function limpiarcampos(){
    this.nombre.val("");
    this.correo.val("");
    this.mensaje.val("");
}

function enviarDatos(datos, url){
    $.ajax({
            data: datos,
            url: url,
            type: 'post',
            success:  function () {
            },
            error: function (error) {
                console.log();
                mensajeenviado();
                limpiarcampos();
                return true;
            }
    });
}
