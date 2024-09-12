function acciones_incremento_formulario_3() {
  if (array_tarjeta_titular_incremento.length <= 0) {
    select_metodos_de_pago(3, "select_metodo_de_pago_pago_incremento");

    $(".div_formulario_datos_tarjeta_incremento").css("display", "none");

    $("#select_metodo_de_pago_pago_incremento").on("change", function () {
      let id_metodo = $("#select_metodo_de_pago_pago_incremento").val();
      mostrar_campos_segun_metodo_pago_incremento(id_metodo);
    });
  } else {
    let id_metodo = $("#select_metodo_de_pago_pago_incremento").val();
    mostrar_campos_segun_metodo_pago_incremento(id_metodo);
    if (["4", "5", "6", "7", "8", "9", "10"].includes(id_metodo))
      $(".div_formulario_datos_tarjeta_incremento").css("display", "block");
  }

  $("#btn_atras_datos_venta_incremento").html(
    `<button type="button" class="btn btn-primary" onclick="mostrar_div_datos_venta_incremento(2), acciones_incremento_formulario_2()">⬅ Atrás</button>`
  );
  $("#btn_siguente_datos_venta_incremento").html(
    `<button type="button" class="btn btn-primary" onclick="afiliar_socios_incremento()">Siguiente ➡</button>`
  );
}

function mostrar_campos_segun_metodo_pago_incremento(id_metodo) {
  $(".div_formulario_datos_tarjeta_incremento").css("display", "none");
  $(".div_formulario_onajpu_incremento").css("display", "none");

  if (id_metodo == 1) $(".div_formulario_onajpu_incremento").css("display", "block");

  if (["4", "5", "6", "7", "8", "9", "10"].includes(id_metodo))
    $(".div_formulario_datos_tarjeta_incremento").css("display", "block");
}

function afiliar_socios_incremento() {
  let id_metodo_pago = $("#select_metodo_de_pago_pago_incremento").val();
  let metodo_pago = $(
    "#select_metodo_de_pago_pago_incremento option:selected"
  ).text();
  let observacion = $("#txt_observacion_servicios_incremento").val();
  let importe_total = $("#span_total_precio_servicios_incremento").text();
  let convenio = $("#select_convenio_servicios_incremento").val();

  if (id_metodo_pago == "") {
    error("Debe seleccionar un método de pago");
  } else if (
    ["4", "5", "6", "7", "8", "9", "10"].includes(id_metodo_pago) &&
    array_tarjeta_titular_incremento.length <= 0
  ) {
    error("Debe ingresar los datos del titular de la tarjeta");
  } else {
    $.ajax({
      type: "POST",
      url: `${url_ajax}incremento/completar_afiliacion_incremento.php`,
      data: {
        id_metodo_pago,
        metodo_pago,
        array_datos_beneficiario_incremento,
        array_servicios_agregados_incremento,
        observacion,
        array_tarjeta_titular_incremento,
        importe_total,
        convenio,
      },
      dataType: "JSON",
      beforeSend: function () {
        mostrarLoader();
      },
      complete: function () {
        mostrarLoader("O");
      },
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
              vaciar_todo_incremento();
              $("#modal_datos_venta_incremento").modal("hide");
              $("#select_tipo_afiliacion").val("");
              $("#modal_tipo_afiliacion").modal("show");
            }
          });
        } else {
          error(response.mensaje);
        }
      },
    });
  }
}

function vaciar_datos_formulario_3_incremento() {
  $("#select_metodo_de_pago_pago_incremento").val("");
}

function vaciar_todo_incremento() {
  vaciar_datos_beneficiario_incremento();
  array_datos_beneficiario_incremento = [];
  vaciar_datos_servicio_incremento();
  vaciar_datos_formulario_3_incremento();
  vaciar_datos_titular_tarjeta_incremento();
}
