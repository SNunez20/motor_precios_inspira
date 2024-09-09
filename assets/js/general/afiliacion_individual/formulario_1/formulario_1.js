let array_datos_beneficiario = [];
function acciones_formulario_nueva_alta_1() {
  let cedula = $("#txt_cedula").val();
  $("#txt_cedula_beneficiario").val(cedula);
  if (array_datos_beneficiario.length <= 0) {
    $("#txt_nombre_beneficiario").val("");
    $("#txt_fecha_nacimiento_beneficiario").val("");
    $("#txt_calle_beneficiario").val("");
    $("#txt_puerta_beneficiario").val("");
    $("#txt_solar_beneficiario").val("");
    $("#txt_manzana_beneficiario").val("");
    $("#txt_esquina_beneficiario").val("");
    $("#txt_apartamento_beneficiario").val("");
    $("#txt_referencia_beneficiario").val("");
    $("#select_localidades_beneficiario").val("");
    $("#txt_correo_electronico_beneficiario").val("");
    $("#txt_celular_beneficiario").val("");
    $("#txt_telefono_fijo_beneficiario").val("");
    $("#txt_telefono_alternativo_beneficiario").val("");
    $("#select_promocion_beneficiario").val("");
    $("#select_dato_extra").val(3);

    select_localidades("select_localidades_beneficiario");
    select_promociones("select_promocion_beneficiario");

    $("#rbtn_beneficiario_1").prop("checked", true);
    $(".div_rbtn_1_beneficiario").css("display", "block");
    $(".div_rbtn_2_beneficiario").css("display", "none");
  }

  contador_caracteres("txt_calle_beneficiario", "span_calle_beneficiario", 20);
  contador_caracteres("txt_puerta_beneficiario", "span_puerta_beneficiario", 4);
  contador_caracteres("txt_solar_beneficiario", "span_solar_beneficiario", 4);
  contador_caracteres("txt_manzana_beneficiario", "span_manzana_beneficiario", 4);
  contador_caracteres("txt_esquina_beneficiario", "span_esquina_beneficiario", 20);
  contador_caracteres("txt_apartamento_beneficiario", "span_apartamento_beneficiario", 4);

  $("input[name=rbtn_beneficiario]").click(function () {
    if ($("input:radio[name=rbtn_beneficiario]:checked").val() == "Puerta") {
      $("#txt_solar_beneficiario").val("");
      $("#txt_manzana_beneficiario").val("");
      $(".div_rbtn_1_beneficiario").css("display", "block");
      $(".div_rbtn_2_beneficiario").css("display", "none");
    } else {
      $("#txt_puerta_beneficiario").val("");
      $(".div_rbtn_1_beneficiario").css("display", "none");
      $(".div_rbtn_2_beneficiario").css("display", "block");
    }
  });

  $("#btn_atras_datos_venta").html(`<button type="button" class="btn btn-primary" onclick="modal_anterior('modal_datos_venta', 'modal_validar_cedula')">⬅ Atrás</button>`);
  $("#btn_siguente_datos_venta").html(`<button type="button" class="btn btn-primary" onclick="validar_nueva_alta_1()">Siguiente ➡</button>`);
}


function validar_nueva_alta_1() {
  let cedula = $("#txt_cedula_beneficiario").val();
  let nombre_completo = $("#txt_nombre_beneficiario").val();
  let fecha_nacimiento = $("#txt_fecha_nacimiento_beneficiario").val();
  let calle = $("#txt_calle_beneficiario").val();
  let radio_buttons = $("input:radio[name=rbtn_beneficiario]:checked").val();
  let puerta = $("#txt_puerta_beneficiario").val();
  let solar = $("#txt_solar_beneficiario").val();
  let manzana = $("#txt_manzana_beneficiario").val();
  let esquina = $("#txt_esquina_beneficiario").val();
  let apartamento = $("#txt_apartamento_beneficiario").val();
  let referencia = $("#txt_referencia_beneficiario").val();
  let id_localidad = $("#select_localidades_beneficiario").val();
  let nombre_localidad = $("#select_localidades_beneficiario option:selected").text();
  let correo_electronico = $("#txt_correo_electronico_beneficiario").val();
  let celular = $("#txt_celular_beneficiario").val();
  let telefono_fijo = $("#txt_telefono_fijo_beneficiario").val();
  let telefono_alternativo = $("#txt_telefono_alternativo_beneficiario").val();
  let dato_extra = $("#select_dato_extra").val();
  //let promocion = $("#select_promocion_beneficiario").val();

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
  } else if (dato_extra == "") {
    error("Debe seleccionar un dato adicional");
  } else {
    let direccion = formar_direccion(radio_buttons, apartamento, calle, puerta, esquina, manzana, solar);

    array_datos_beneficiario = {
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
      dato_extra: dato_extra,
    };
    mostrar_div_datos_venta(2);
    acciones_formulario_nueva_alta_2();
  }
}


function vaciar_datos_beneficiario() {
  //Elimino los datos del array
  array_datos_beneficiario = [];
  //Limpio los campos
  $("#txt_cedula").val("");
  $("#txt_nombre_beneficiario").val("");
  $("#txt_fecha_nacimiento_beneficiario").val("");
  $("#txt_calle_beneficiario").val("");
  $("input:radio[name=rbtn_beneficiario]").prop("checked", false);
  $("#txt_puerta_beneficiario").val("");
  $("#txt_solar_beneficiario").val("");
  $("#txt_manzana_beneficiario").val("");
  $("#txt_esquina_beneficiario").val("");
  $("#txt_apartamento_beneficiario").val("");
  $("#txt_referencia_beneficiario").val("");
  $("#select_localidades_beneficiario").val("");
  $("#txt_correo_electronico_beneficiario").val("");
  $("#txt_celular_beneficiario").val("");
  $("#txt_telefono_fijo_beneficiario").val("");
  $("#txt_telefono_alternativo_beneficiario").val("");
  $("#select_promocion_beneficiario").val("");
  $("#select_dato_extra").val(3);
  //Oculto los divs
  $(".div_rbtn_1_beneficiario").css("display", "none");
  $(".div_rbtn_2_beneficiario").css("display", "none");
}