function acciones_formulario_grupo_familiar_formulario_4() {
    if (array_tarjeta_titular_grupo_familiar.length <= 0) {
        select_metodos_de_pago(2, "select_metodo_de_pago_pago_grupo_familiar");

        $(".div_formulario_datos_tarjeta_grupo_familiar").css("display", "none");

        $("#select_metodo_de_pago_pago_grupo_familiar").on("change", function () {
            let id_metodo = $("#select_metodo_de_pago_pago_grupo_familiar").val();
            mostrar_campos_segun_metodo_pago_grupo_familiar(id_metodo);
        });
    } else {
        let id_metodo = $("#select_metodo_de_pago_pago_grupo_familiar").val();
        mostrar_campos_segun_metodo_pago_grupo_familiar(id_metodo);
        if (["4", "5", "6", "7", "8", "9", "10"].includes(id_metodo))
            $(".div_formulario_datos_tarjeta_grupo_familiar").css("display", "block");
    }

    $("#btn_atras_datos_venta_grupo_familiar").html(`<button type="button" class="btn btn-primary" onclick="mostrar_div_datos_venta_grupo_familiar(3), acciones_formulario_grupo_familiar_formulario_3()">⬅ Atrás</button>`);
    $("#btn_siguente_datos_venta_grupo_familiar").html(`<button type="button" class="btn btn-primary" onclick="afiliar_socios_grupo_familiar()">Siguiente ➡</button>`);
}


function mostrar_campos_segun_metodo_pago_grupo_familiar(id_metodo) {
    $(".div_formulario_datos_tarjeta_grupo_familiar").css("display", "none");

    if (["4", "5", "6", "7", "8", "9", "10"].includes(id_metodo))
        $(".div_formulario_datos_tarjeta_grupo_familiar").css("display", "block");
}


function afiliar_socios_grupo_familiar() {
    let id_metodo_pago = $("#select_metodo_de_pago_pago_grupo_familiar").val();
    let metodo_pago = $("#select_metodo_de_pago_pago_grupo_familiar option:selected").text();

    if (id_metodo_pago == "") {
        error("Debe seleccionar un método de pago");
    } else if (["4", "5", "6", "7", "8", "9", "10"].includes(id_metodo_pago) && array_tarjeta_titular_grupo_familiar.length <= 0) {
        error("Debe ingresar los datos del titular de la tarjeta");
    } else {

        $.ajax({
            type: "POST",
            url: `${url_ajax}afiliacion_grupo_familiar/completar_afiliacion_grupo_familiar.php`,
            data: {
                id_metodo_pago,
                metodo_pago,
                array_personas_grupo_familiar,
                array_datos_beneficiario_grupo_familiar,
                array_guardar_datos_servicios,
                array_servicios_agregados_grupo_familiar,
                array_tarjeta_titular_grupo_familiar,
            },
            dataType: "JSON",
            beforeSend: function () {
                showLoading();
              },
              complete: function () {
                showLoading(false);
              },
            success: function (response) {
                if (response.error == false) {
                    correcto(response.mensaje);
                    //vaciar_todo_alta_grupo_familiar();
                } else {
                    error(response.mensaje);
                }
            },
        });

    }
}


function vaciar_datos_formulario_3_grupo_familiar() {
    $("#select_metodo_de_pago_pago_grupo_familiar").val("");
}


function vaciar_todo_alta_grupo_familiar() {
    vaciar_datos_personas_grupo_familiar();
    vaciar_datos_beneficiario_grupo_familiar();
    vaciar_form_servicios_grupo_familiar();
    vaciar_datos_formulario_3_grupo_familiar();
    vaciar_datos_titular_tarjeta_grupo_familiar();
}
