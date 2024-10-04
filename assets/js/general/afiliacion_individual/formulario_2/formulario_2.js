let array_servicios_agregados = [];
function acciones_formulario_nueva_alta_2() {
  if (array_servicios_agregados.length <= 0) {
    select_convenios_servicios(1, "select_convenio_servicios");


    let dato_extra = $("#select_dato_extra").val();
    if (dato_extra == 2) select_servicios(2, "select_servicios_servicios");
    else select_servicios(1, "select_servicios_servicios");


    $("#div_lista_servicios").html("");
    $(".div_cantidad_horas_servicios").css("display", "none");
    $(".div_lista_de_precios").css("display", "none");
    $(".div_socio_adeom").css("display", "none");
    $(".div_promocion_servicios").css("display", "none");
    $(".div_ingresar_importe_total").css("display", "none");
    $("#chbox_socio_adeom").prop("checked", false);
  } else {
    listar_servicios_agregados(false);
  }


  $("#select_servicios_servicios").on("change", function () {
    let servicio = $("#select_servicios_servicios").val();
    if (servicio == "") {
      $(".div_cantidad_horas_servicios").css("display", "none");
      $(".div_lista_de_precios").css("display", "none");
      $(".div_socio_adeom").css("display", "none");
      $(".div_promocion_servicios").css("display", "none");
      $(".div_ingresar_importe_total").css("display", "none");
      $("#chbox_socio_adeom").prop("checked", false);
    } else {
      mostrar_divs_servicios(servicio);
    }
  });

  $("#btn_atras_datos_venta").html(`<button type="button" class="btn btn-primary" onclick="mostrar_div_datos_venta(1), acciones_formulario_nueva_alta_1()">⬅ Atrás</button>`);
  $("#btn_siguente_datos_venta").html(`<button type="button" class="btn btn-primary" onclick="validar_nueva_alta_2()">Siguiente ➡</button>`);
}


function validar_nueva_alta_2() {
  let observacion = $("#txt_observacion_servicios").val();
  let validar_beneficiarios = 0;

  array_servicios_agregados.map((val) => {
    if (["13", "15"].includes(val["numero_servicio"]))
      validar_beneficiarios = 1;
  });

  if (array_servicios_agregados.length <= 0) {
    error("Debe agregar al menos un servicio");
  } else if (validar_beneficiarios == 1 && array_beneficiarios_servicio.length < 2) {
    error("Debe ingresar al menos 2 beneficiarios");
  } else if (observacion == "") {
    error("Debe ingresar una observación");
  } else {
    mostrar_div_datos_venta(3);
    acciones_formulario_nueva_alta_3();
  }
}


function vaciar_datos_formulario_2() {
  $("#div_lista_servicios").html("");
  $(".div_cantidad_horas_servicios").css("display", "none");
  $(".div_lista_de_precios").css("display", "none");
  $(".div_socio_adeom").css("display", "none");
  $(".div_promocion_servicios").css("display", "none");
  $(".div_ingresar_importe_total").css("display", "none");
  $("#chbox_socio_adeom").prop("checked", false);
  $("#txt_observacion_servicios").val("");
  $("#select_convenio_servicios").val("");
}


