let array_datos_beneficiario_incremento = [];
function acciones_incremento_formulario_1() {
    if (array_datos_beneficiario_incremento.length <= 0) {
        $("#txt_calle_beneficiario_incremento").val("");
        $(".div_rbtn_1_beneficiario_incremento").css("display", "block");
        $("#txt_puerta_beneficiario_incremento").val("");
        $("#txt_solar_beneficiario_incremento").val("");
        $("#txt_manzana_beneficiario_incremento").val("");
        $("#txt_esquina_beneficiario_incremento").val("");
        $("#txt_apartamento_beneficiario_incremento").val("");
        $("#txt_referencia_beneficiario_incremento").val("");
        $("#select_localidades_beneficiario_incremento").val("");

        select_localidades("select_localidades_beneficiario_incremento");

        $(".div_rbtn_1_beneficiario_incremento").css("display", "block");
        $(".div_rbtn_2_beneficiario_incremento").css("display", "none");
    }

    contador_caracteres("txt_calle_beneficiario_incremento", "span_calle_beneficiario_incremento", 20);
    contador_caracteres("txt_puerta_beneficiario_incremento", "span_puerta_beneficiario_incremento", 4);
    contador_caracteres("txt_solar_beneficiario_incremento", "span_solar_beneficiario_incremento", 4);
    contador_caracteres("txt_manzana_beneficiario_incremento", "span_manzana_beneficiario_incremento", 4);
    contador_caracteres("txt_esquina_beneficiario_incremento", "span_esquina_beneficiario_incremento", 20);
    contador_caracteres("txt_apartamento_beneficiario_incremento", "span_apartamento_beneficiario_incremento", 4);

    $("input[name=rbtn_beneficiario_incremento]").click(function () {
        if ($("input:radio[name=rbtn_beneficiario_incremento]:checked").val() == "Puerta") {
            $("#txt_solar_beneficiario_incremento").val("");
            $("#txt_manzana_beneficiario_incremento").val("");
            $(".div_rbtn_1_beneficiario_incremento").css("display", "block");
            $(".div_rbtn_2_beneficiario_incremento").css("display", "none");
        } else {
            $("#txt_puerta_beneficiario_incremento").val("");
            $(".div_rbtn_1_beneficiario_incremento").css("display", "none");
            $(".div_rbtn_2_beneficiario_incremento").css("display", "block");
        }
    });


    $("#btn_atras_datos_venta_incremento").html(`<button type="button" class="btn btn-primary" onclick="volver_a_tipo_afiliacion_incremento()">⬅ Atrás</button>`);
    $("#btn_siguente_datos_venta_incremento").html(`<button type="button" class="btn btn-primary" onclick="validar_nuevo_incremento_1()">Siguiente ➡</button>`);
}


function volver_a_tipo_afiliacion_incremento() {
    $("#modal_datos_venta_incremento").modal("hide");
    vaciar_datos_beneficiario_incremento();
}


function validar_nuevo_incremento_1() {
    let cedula = $("#txt_cedula_beneficiario_incremento").val();
    let nombre_completo = $("#txt_nombre_beneficiario_incremento").val();
    let fecha_nacimiento = $("#txt_fecha_nacimiento_beneficiario_incremento").val();
    let calle = $("#txt_calle_beneficiario_incremento").val();
    let radio_buttons = $("input:radio[name=rbtn_beneficiario_incremento]:checked").val();
    let puerta = $("#txt_puerta_beneficiario_incremento").val();
    let solar = $("#txt_solar_beneficiario_incremento").val();
    let manzana = $("#txt_manzana_beneficiario_incremento").val();
    let esquina = $("#txt_esquina_beneficiario_incremento").val();
    let apartamento = $("#txt_apartamento_beneficiario_incremento").val();
    let referencia = $("#txt_referencia_beneficiario_incremento").val();
    let id_localidad = $("#select_localidades_beneficiario_incremento").val();
    let nombre_localidad = $("#select_localidades_beneficiario_incremento option:selected").text();
    let correo_electronico = $("#txt_correo_electronico_beneficiario_incremento").val();
    let celular = $("#txt_celular_beneficiario_incremento").val();
    let telefono_fijo = $("#txt_telefono_fijo_beneficiario_incremento").val();
    let telefono_alternativo = $("#txt_telefono_alternativo_beneficiario_incremento").val();

    if (cedula == "") {
        error("Debe ingresar la cédula");
    } else if (nombre_completo == "") {
        error("Debe ingresar el nombre completo");
    } else if (fecha_nacimiento == "") {
        error("Debe ingresar la fecha de nacimiento");
    } else if (fecha_nacimiento >= fecha_actual("fecha")) {
        error("La fecha de nacimiento no puede ser mayor a la fecha actual");
    } else if (calle == "") {
        error("Debe ingresar la calle");
    } else if (radio_buttons == undefined) {
        error("Debe seleccinar una opción (Puerta o Solar/manzana)");
    } else if (radio_buttons == "Puerta" && puerta == "") {
        error("Debe ingresar el número de puerta");
    } else if (radio_buttons == "Solar/manzana" && solar == "") {
        error("Debe ingresar el solar");
    } else if (radio_buttons == "Solar/manzana" && manzana == "") {
        error("Debe ingresar la manzana");
    } else if (esquina == "") {
        error("Debe ingresar la esquina");
    } else if (referencia == "") {
        error("Debe ingresar la referencia");
    } else if (id_localidad == "") {
        error("Debe seleccionar una localidad");
    } else if (correo_electronico != "" && !validarEmail(correo_electronico)) {
        error("Debe ingresar un correo válido");
    } else if (celular == "") {
        error("Debe ingresar un celular");
    } else if (!comprobarCelular(celular)) {
        error("Debe ingresar un celular válido");
    } else if (telefono_fijo != "" && !comprobarTelefono(telefono_fijo, 52)) {
        error("Debe ingresar un telefono fijo válido");
    } else if (telefono_alternativo != "" && !comprobarTelefono(telefono_alternativo, 52)) {
        error("Debe ingresar un telefono alternativo válido");
    } else {
        let direccion = formar_direccion(radio_buttons, apartamento, calle, puerta, esquina, manzana, solar);

        array_datos_beneficiario_incremento = {
            cedula: cedula,
            nombre_completo: nombre_completo,
            fecha_nacimiento: fecha_nacimiento,
            calle: calle,
            puerta: puerta,
            solar: solar,
            manzana: manzana,
            esquina: esquina,
            apartamento: apartamento,
            referencia: referencia,
            direccion: direccion,
            id_localidad: id_localidad,
            nombre_localidad: nombre_localidad,
            correo_electronico: correo_electronico,
            celular: celular,
            telefono_fijo: telefono_fijo,
            telefono_alternativo: telefono_alternativo,
        };
        mostrar_div_datos_venta_incremento(2);
        acciones_incremento_formulario_2();
    }
}


function vaciar_datos_beneficiario_incremento() {
    //Limpio los campos
    $("#txt_cedula_beneficiario_incremento").val("");
    $("#txt_nombre_beneficiario_incremento").val("");
    $("#txt_fecha_nacimiento_beneficiario_incremento").val("");
    $("#txt_calle_beneficiario_incremento").val("");
    $("input:radio[name=rbtn_beneficiario_incremento]").prop("checked", false);
    $("#txt_puerta_beneficiario_incremento").val("");
    $("#txt_solar_beneficiario_incremento").val("");
    $("#txt_manzana_beneficiario_incremento").val("");
    $("#txt_esquina_beneficiario_incremento").val("");
    $("#txt_apartamento_beneficiario_incremento").val("");
    $("#txt_referencia_beneficiario_incremento").val("");
    $("#select_localidades_beneficiario_incremento").val("");
    $("#txt_correo_electronico_beneficiario_incremento").val("");
    $("#txt_celular_beneficiario_incremento").val("");
    $("#txt_telefono_fijo_beneficiario_incremento").val("");
    $("#txt_telefono_alternativo_beneficiario_incremento").val("");
    //Oculto los divs
    $(".div_rbtn_1_beneficiario_incremento").css("display", "none");
    $(".div_rbtn_2_beneficiario_incremento").css("display", "none");
}