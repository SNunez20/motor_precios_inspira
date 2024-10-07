function ingresar() {
    let usuario = $("#txt_usuario_vendedor").val();
    let password = $("#txt_password_vendedor").val();

    if (usuario == "") {
        error("Debe ingresar su usuario");
    } else if (!comprobarCI(usuario)) {
        error("El usuario ingresado no es válido");
    } else if (password == "") {
        error("Debe ingresar su password");
    } else if (!comprobarCI(password)) {
        error("La password ingresada no es válida");
    } else {

        $.ajax({
            type: "GET",
            url: `${url_ajax}login.php`,
            data: {
                usuario,
                password
            },
            dataType: "JSON",
            beforeSend: function (){
                $("#btn_login").addClass('disabled');
            },
            success: function (response) {
                if (response.error == false) {
                    alerta("Hola!", response.mensaje, "success");

                    setTimeout(() => {
                        location.href = "index.php";
                    }, '2000');
                } else {
                    error(response.mensaje);
                    $("#btn_login").removeClass('disabled');
                }
            }
        });
    }
}