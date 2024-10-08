function acciones_formulario_nueva_alta_3() {
  let id_metodo = $("#select_metodo_de_pago_pago").val();

  if (id_metodo == "" || id_metodo == null) {
    select_metodos_de_pago(1, "select_metodo_de_pago_pago");

    $(".div_formulario_onajpu").css("display", "none");
    $(".div_formulario_datos_tarjeta").css("display", "none");

    $("#select_metodo_de_pago_pago").on("change", function () {
      let id_metodo = $("#select_metodo_de_pago_pago").val();
      mostrar_campos_segun_metodo_pago(id_metodo);
    });
  } else {
    mostrar_campos_segun_metodo_pago(id_metodo);
    if (id_metodo == 1) $(".div_formulario_onajpu").css("display", "block");
    if (["4", "5", "6", "7", "8", "9", "10"].includes(id_metodo))
      $(".div_formulario_datos_tarjeta").css("display", "block");
  }

  let precio = $("#span_total_precio_servicios").text();
  $("#span_precio_total_a_pagar_metodo_pago_individual").text(`$UY ${precio}`);

  $("#btn_atras_datos_venta").html(`<button type="button" class="btn btn-primary" onclick="mostrar_div_datos_venta(2), acciones_formulario_nueva_alta_2()">⬅ Atrás</button>`);
  $("#btn_siguente_datos_venta").html(`<button type="button" class="btn btn-primary" onclick="afiliar_socios()">Siguiente ➡</button>`);
}


function mostrar_campos_segun_metodo_pago(id_metodo) {
  $(".div_formulario_onajpu").css("display", "none");
  $(".div_formulario_datos_tarjeta").css("display", "none");

  if (id_metodo == 1) $(".div_formulario_onajpu").css("display", "block");
  if (["4", "5", "6", "7", "8", "9", "10"].includes(id_metodo))
    $(".div_formulario_datos_tarjeta").css("display", "block");
}


function afiliar_socios() {
  let convenio = $("#select_convenio_servicios").val();
  let importe_total = $("#span_total_precio_servicios").text();
  let observacion = $("#txt_observacion_servicios").val();
  let id_metodo_pago = $("#select_metodo_de_pago_pago").val();
  let metodo_pago = $("#select_metodo_de_pago_pago option:selected").text();
  let nombre_titular_onajpu = $("#txt_nombre_titular_onajpu").val();
  let cedula_titular_onajpu = $("#txt_cedula_titular_onajpu").val();

  if (id_metodo_pago == "") {
    error("Debe seleccionar un método de pago");
  } else if (id_metodo_pago == 1 && nombre_titular_onajpu == "") {
    error("Debe ingresar el nombre del titular");
  } else if (id_metodo_pago == 1 && cedula_titular_onajpu == "") {
    error("Debe ingresar la cédula del titular");
  } else if (id_metodo_pago == 1 && !comprobarCI(cedula_titular_onajpu)) {
    error("Debe ingresar una cédula válida");
  } else if (["4", "5", "6", "7", "8", "9", "10"].includes(id_metodo_pago) && array_tarjeta_titular.length <= 0) {
    error("Debe ingresar los datos del titular de la tarjeta");
  } else {
    array_beneficiarios_servicio = array_beneficiarios_servicio.length > 0 ? array_beneficiarios_servicio : [];

    $.ajax({
      type: "POST",
      url: `${url_ajax}afiliacion_individual/completar_afiliacion_individual.php`,
      data: {
        array_datos_beneficiario,
        convenio,
        array_servicios_agregados,
        array_beneficiarios_servicio,
        id_metodo_pago,
        metodo_pago,
        nombre_titular_onajpu,
        cedula_titular_onajpu,
        array_tarjeta_titular,
        observacion,
        importe_total,
      },
      beforeSend: function () {
        mostrarLoader();
      },
      complete: function () {
        mostrarLoader("O");
      },
      dataType: "JSON",
      success: function (response) {
        if (response.error == false) {
          Swal.fire({
            title: "Exito!",
            html: response.mensaje,
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              vaciar_todo_alta();
              $("#modal_datos_venta").modal("hide");
              $("#modal_tipo_afiliacion").modal("show");
              $("#select_tipo_afiliacion").val("");
            }
          });
        } else {
          error(response.mensaje);
        }
      },
    });
  }
}


function vaciar_datos_formulario_3() {
  $("#select_metodo_de_pago_pago").val("");
}


function vaciar_todo_alta() {
  vaciar_datos_beneficiario();
  vaciar_datos_formulario_2();
  vaciar_datos_beneficiario_servicio();
  vaciar_datos_servicio();
  vaciar_datos_formulario_3();
  vaciar_datos_titular_tarjeta();
}
