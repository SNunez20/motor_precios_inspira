function mostrar_divs_servicios_incremento(servicio) {
  let socio_adeom = $("#chbox_lista_de_precios_incremento").is(":checked");

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/servicios/mostrar_divs_servicios.php?opcion=1&id_servicio=${servicio}&socio_adeom=${socio_adeom}`,
    dataType: "JSON",
    beforeSend: function () {
      showLoading();
    },
    complete: function () {
      showLoading(false);
    },
    success: function (response) {
      if (response.error == false) {
        if (response.mostrar_horas == 1) {
          select_cantidad_horas(servicio, "select_cantidad_horas_servicios_incremento");
          $(".div_cantidad_horas_servicios_incremento").css("display", "block");
        } else {
          $(".div_cantidad_horas_servicios_incremento").css("display", "none");
        }

        if (response.mostrar_lista_precios == 1) {
          $(".div_lista_de_precios_incremento").css("display", "block");
          $("#chbox_lista_de_precios_incremento").prop("checked", false);

          $("#chbox_lista_de_precios_incremento").change(function () {
            if (this.checked) {
              $("#select_promocion_servicios_incremento").val("");
              $(".div_promocion_servicios_incremento").css("display", "none");
            } else {
              $(".div_promocion_servicios_incremento").css("display", "block");
            }
          });
        } else {
          $(".div_lista_de_precios_incremento").css("display", "none");
        }

        if (servicio == 8) {
          $("#select_promocion_servicios_incremento").html("");
          $(".div_promocion_servicios_incremento").css("display", "none");
          $(".div_socio_adeom_incremento").css("display", "block");
          $("#chbox_socio_adeom_incremento").prop("checked", false);
          $("#chbox_socio_adeom_incremento").click(function () {
            if ($("#chbox_socio_adeom_incremento").is(":checked")) {
              mostrar_promociones_incremento(response.mostrar_promociones, servicio);
            } else {
              $(".div_promocion_servicios_incremento").css("display", "none");
            }
          });
        } else {
          $(".div_socio_adeom_incremento").css("display", "none");
          mostrar_promociones_incremento(response.mostrar_promociones, servicio);

          if (response.mostrar_div_importe_total == 1) {
            $("#txt_importe_total_servicios_incremento").val("");
            $(".div_ingresar_importe_total_incremento").css("display", "block");
          } else {
            $("#txt_importe_total_servicios_incremento").val("");
            $(".div_ingresar_importe_total_incremento").css("display", "none");
          }
        }
      }
    },
  });
}


function mostrar_promociones_incremento(res_mostrar_promociones, servicio) {
  if (res_mostrar_promociones == 1) {
    $("#select_promocion_servicios_incremento").html("");
    select_promociones_servicios_incremento(servicio);
    $(".div_promocion_servicios_incremento").css("display", "block");
  } else {
    $(".div_promocion_servicios_incremento").css("display", "none");
  }
}


function select_promociones_servicios_incremento(servicio) {
  let html = `<option value="" selected>Seleccione una opción</option>`;

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/servicios/mostrar_divs_servicios.php?opcion=2&id_servicio=${servicio}`,
    dataType: "JSON",
    beforeSend: function () {
      showLoading();
    },
    complete: function () {
      showLoading(false);
    },
    success: function (response) {
      if (response.error == false) {
        let datos = response.datos;
        datos.map((val) => {
          html += `<option value="${val["id"]}">${val["nombre"]}</option>`;
        });
        $(`#select_promocion_servicios_incremento`).html(html);
      }
    },
  });
}


function agregar_servicio_incremento() {
  let nro_servicio = $("#select_servicios_servicios_incremento").val();
  let nombre_servicio = $("#select_servicios_servicios_incremento option:selected").text();
  let cant_horas_visible = $("#select_cantidad_horas_servicios_incremento").is(":visible");
  let cant_horas = $("#select_cantidad_horas_servicios_incremento").val();
  let promo_estaciones = $("#chbox_lista_de_precios_incremento").is(":checked");
  let nro_promo = $("#select_promocion_servicios_incremento").val();
  let nombre_promo = $("#select_promocion_servicios_incremento option:selected").text();
  let total_importe_visible = $("#txt_importe_total_servicios_incremento").is(":visible");
  let total_importe = $("#txt_importe_total_servicios_incremento").val();

  if (nro_servicio == "") {
    error("Debe seleccionar un servicio");
  } else if (cant_horas_visible != false && cant_horas == "") {
    error("Debe seleccionar la cantidad de horas");
  } else if (total_importe_visible != false && total_importe == "") {
    error("Debe ingresar un importe");
  } else if (total_importe_visible != false && total_importe < 300) {
    error("Debe ingresar un importe mayor a $300");
  } else {
    let cedula = $("#txt_cedula_beneficiario_incremento").val();

    $.ajax({
      type: "GET",
      url: `${url_ajax}incremento/comprobar_condiciones_servicio.php`,
      data: {
        cedula,
        nro_servicio,
        nombre_servicio,
        cant_horas,
        promo_estaciones,
        nro_promo,
        nombre_promo,
        total_importe,
      },
      dataType: "JSON",
      success: function (response) {
        if (response.error == false) {
          $(`#select_servicios_servicios_incremento option[value='${nro_servicio}']`).remove();

          $(".div_cantidad_horas_servicios_incremento").css("display", "none");
          $(".div_lista_de_precios_incremento").css("display", "none");
          $("#chbox_lista_de_precios_incremento").prop("checked", false);
          $(".div_promocion_servicios_incremento").css("display", "none");
          $(".div_ingresar_importe_total_incremento").css("display", "none");
          $(".div_socio_adeom_incremento").css("display", "none");
          $("#chbox_socio_adeom_incremento").prop("checked", false);

          nombre_promo = nro_promo != "" ? nombre_promo : "";
          total_importe = total_importe_visible ? total_importe : false;
          let fecha_nacimiento = $("#txt_fecha_nacimiento_beneficiario_incremento").val();
          let importe_servicio = obtener_precio_servicio(fecha_nacimiento, nro_servicio, cant_horas, promo_estaciones, total_importe, false);

          let array_servicio = {
            numero_servicio: nro_servicio,
            nombre_servicio: nombre_servicio,
            cantidad_horas: cant_horas != null ? cant_horas : "",
            promo_estaciones: promo_estaciones,
            numero_promo: nro_promo,
            nombre_promo: nombre_promo,
            total_importe: total_importe,
            importe_servicio: importe_servicio,
          };
          array_servicios_agregados_incremento.push(array_servicio);
          listar_servicios_agregados_incremento();
        } else {
          error(response.mensaje);
        }
      },
    });
  }
}


function listar_servicios_agregados_incremento(calcular_precio = true) {
  $("#div_lista_servicios_incremento").html("");
  $("#select_servicios_servicios_incremento").val("");
  $("#select_cantidad_horas_servicios_incremento").val("");
  $("#select_promocion_servicios_incremento").val("");
  $("#txt_importe_total_servicios_incremento").val("");

  if (calcular_precio) calcular_total_incremento();

  array_servicios_agregados_incremento.map((val) => {
    let nombre_promo = val["nombre_promo"];
    let cantidad_horas = val["cantidad_horas"];
    let promo_estaciones = val["promo_estaciones"];
    let numero_servicio = val["numero_servicio"];
    let nombre_servicio = val["nombre_servicio"];
    let importe_servicio = val["importe_servicio"];

    let promocion = nombre_promo != "" ? `/ <span class="text-danger">${nombre_promo}</span>` : "";
    let horas = cantidad_horas != "" ? `/ ${cantidad_horas}hrs` : "";
    promo_estaciones = promo_estaciones ? `/ <span class="text-success">Sanatorio Estaciones</span>` : "";

    document.getElementById("div_lista_servicios_incremento").innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
            <div class="fw-bold">
                ${nombre_servicio} ${horas} ${promo_estaciones} ${promocion}
            </div>
            <small>$${importe_servicio}</small>
        </div>
        <button class="btn btn-sm btn-danger rounded-circle" onclick="quitar_servicio_incremento(${numero_servicio}, '${nombre_servicio}')">❌</button>
    </li>`;
  });
}


function quitar_servicio_incremento(numero_servicio, nombre_servicio) {
  $("#span_total_incremento_precio_servicios_incremento").text("?");
  document.getElementById("select_servicios_servicios_incremento").innerHTML += `<option value="${numero_servicio}">${nombre_servicio}</option>`;

  let selectList = $("#select_servicios_servicios_incremento option");
  selectList.sort(function (a, b) {
    return a.value - b.value;
  });
  $("#select_servicios_servicios_incremento").html(selectList);

  array_servicios_agregados_incremento =
    array_servicios_agregados_incremento.filter(
      (servicio) => servicio["numero_servicio"] != numero_servicio
    );
  listar_servicios_agregados_incremento();
}


function calcular_total_incremento() {
  $("#span_total_incremento_precio_servicios_incremento").text("?");
  let fecha_nacimiento = $("#txt_fecha_nacimiento_beneficiario_incremento").val();
  let importe_actual = localStorage.getItem("incremento_importe_total_servicios_actuales");
  $("#span_total_precio_servicios_incremento").text(importe_actual);


  if (array_servicios_agregados_incremento.length == 0) {
    $("#span_total_incremento_precio_servicios_incremento").text("0");
  } else {
    $.ajax({
      type: "GET",
      url: `${url_ajax}afiliacion_individual/servicios/calcular_precio_total.php`,
      data: {
        fecha_nacimiento: fecha_nacimiento,
        array_servicios_agregados: array_servicios_agregados_incremento,
      },
      dataType: "JSON",
      beforeSend: function () {
        mostrar_spinning("span_total_incremento_precio_servicios_incremento", "danger");
      },
      success: function (response) {
        if (response.error == false) {
          let precio = response.precio;
          $("#span_total_incremento_precio_servicios_incremento").text(`${precio}`);

          let suma_importes = parseInt(importe_actual) + parseInt(precio);
          $("#span_total_precio_servicios_incremento").text(suma_importes);
        } else {
          $("#span_total_incremento_precio_servicios_incremento").text("?");
        }
      },
    });
  }
}



function vaciar_datos_servicio_incremento() {
  //Elimino los datos del array
  array_servicios_agregados_incremento = [];
  //Limpio la lista de servicios agregados
  $("#div_lista_servicios_incremento").html("");
  //Limpio los campos
  $("#select_servicios_servicios_incremento").val("");
  $("#select_cantidad_horas_servicios_incremento").val("");
  $("#chbox_lista_de_precios_incremento").prop("checked", false);
  $("#select_promocion_servicios_incremento").val("");
  $("#txt_observacion_servicios_incremento").val("");
  $("#txt_importe_total_servicios_incremento").val("");
  //Oculto los divs
  $(".div_cantidad_horas_servicios_incremento").css("display", "none");
  $(".div_lista_de_precios_incremento").css("display", "none");
  $(".div_socio_adeom_incremento").css("display", "none");
  $(".div_promocion_servicios_incremento").css("display", "none");
  $(".div_ingresar_importe_total_incremento").css("display", "none");
  //Cambio el precio a "0"
  $("#span_total_incremento_precio_servicios_incremento").text("0");
  $("#span_total_precio_servicios_incremento").text("0");
}
