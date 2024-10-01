function mostrar_divs_servicios(servicio) {
  let socio_adeom = $("#chbox_lista_de_precios").is(":checked");

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
          select_cantidad_horas(servicio, "select_cantidad_horas_servicios");
          $(".div_cantidad_horas_servicios").css("display", "block");
        } else {
          $(".div_cantidad_horas_servicios").css("display", "none");
        }

        if (response.mostrar_lista_precios == 1) {
          $(".div_lista_de_precios").css("display", "block");
          $("#chbox_lista_de_precios").prop("checked", false);

          $("#chbox_lista_de_precios").change(function () {
            if (this.checked) {
              $("#select_promocion_servicios").val("");
              $(".div_promocion_servicios").css("display", "none");
            } else {
              $("#select_promocion_servicios").val("");
              let dato_extra = $("#select_dato_extra").val();
              dato_extra != "2" ?
                $(".div_promocion_servicios").css("display", "block") :
                $(".div_promocion_servicios").css("display", "none");
            }
          });
        } else {
          $(".div_lista_de_precios").css("display", "none");
        }

        if (servicio == 8) {
          $("#select_promocion_servicios").html("");
          $(".div_promocion_servicios").css("display", "none");
          $(".div_socio_adeom").css("display", "block");
          $("#chbox_socio_adeom").prop("checked", false);
          $("#chbox_socio_adeom").click(function () {
            if ($("#chbox_socio_adeom").is(":checked")) {
              mostrar_promociones(response.mostrar_promociones, servicio);
            } else {
              $(".div_promocion_servicios").css("display", "none");
            }
          });
        } else {
          $(".div_socio_adeom").css("display", "none");
          mostrar_promociones(response.mostrar_promociones, servicio);

          if (response.mostrar_div_importe_total == 1) {
            $("#txt_importe_total_servicios").val("");
            $(".div_ingresar_importe_total").css("display", "block");
          } else {
            $("#txt_importe_total_servicios").val("");
            $(".div_ingresar_importe_total").css("display", "none");
          }
        }
      }
    },
  });
}


function mostrar_promociones(res_mostrar_promociones, servicio) {
  let dato_extra = $("#select_dato_extra").val();

  if (res_mostrar_promociones == 1 && servicio == 1 && dato_extra != "2") {
    $("#select_promocion_servicios").html("");
    select_promociones_servicios(servicio);
    $(".div_promocion_servicios").css("display", "block");
  } else if (res_mostrar_promociones == 1 && servicio != 1) {
    $("#select_promocion_servicios").html("");
    select_promociones_servicios(servicio);
    $(".div_promocion_servicios").css("display", "block");
  } else {
    $("#select_promocion_servicios").html("");
    $(".div_promocion_servicios").css("display", "none");
  }
}


function select_promociones_servicios(servicio) {
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
        $(`#select_promocion_servicios`).html(html);
      }
    },
  });
}


function agregar_servicio() {
  let nro_servicio = $("#select_servicios_servicios").val();
  let nombre_servicio = $("#select_servicios_servicios option:selected").text();
  let cant_horas_visible = $("#select_cantidad_horas_servicios").is(":visible");
  let cant_horas = $("#select_cantidad_horas_servicios").val();
  let promo_estaciones = $("#chbox_lista_de_precios").is(":checked");
  let nro_promo = $("#select_promocion_servicios").val();
  let nombre_promo = $("#select_promocion_servicios option:selected").text();
  let total_importe_visible = $("#txt_importe_total_servicios").is(":visible");
  let total_importe = $("#txt_importe_total_servicios").val();
  let cant_grupo_familiar = 0;

  array_servicios_agregados.map((val) => {
    if (["13", "15"].includes(val["numero_servicio"])) cant_grupo_familiar = 1;
  });

  if (nro_servicio == "") {
    error("Debe seleccionar un servicio");
  } else if (cant_horas_visible != false && cant_horas == "") {
    error("Debe seleccionar la cantidad de horas");
  } else if (total_importe_visible != false && total_importe == "") {
    error("Debe ingresar un importe");
  } else if (total_importe_visible != false && total_importe <= 300) {
    error("Debe ingresar un importe mayor a $300");
  } else if (["13", "15"].includes(nro_servicio) && cant_grupo_familiar == 1) {
    error("No puede agregar servicio G5 y G6 al mismo titular");
  } else {
    $(`#select_servicios_servicios option[value='${nro_servicio}']`).remove();

    $(".div_cantidad_horas_servicios").css("display", "none");
    $(".div_lista_de_precios").css("display", "none");
    $("#chbox_lista_de_precios").prop("checked", false);
    $(".div_promocion_servicios").css("display", "none");
    $(".div_ingresar_importe_total").css("display", "none");
    $(".div_socio_adeom").css("display", "none");
    $("#chbox_socio_adeom").prop("checked", false);

    nombre_promo = nro_promo != "" ? nombre_promo : "";
    total_importe = total_importe_visible ? total_importe : false;

    let array_servicio = {
      numero_servicio: nro_servicio,
      nombre_servicio: nombre_servicio,
      cantidad_horas: cant_horas != null ? cant_horas : "",
      promo_estaciones: promo_estaciones,
      numero_promo: nro_promo,
      nombre_promo: nombre_promo,
      total_importe: total_importe,
    };
    array_servicios_agregados.push(array_servicio);
    listar_servicios_agregados();
  }
}


function listar_servicios_agregados(calcular_precio = true) {
  $("#div_lista_servicios").html("");
  $("#select_servicios_servicios").val("");
  $("#select_cantidad_horas_servicios").val("");
  $("#select_promocion_servicios").val("");
  $("#txt_importe_total_servicios").val("");

  if (calcular_precio) calcular_total();

  array_servicios_agregados.map((val) => {
    let nombre_promo = val["nombre_promo"];
    let cantidad_horas = val["cantidad_horas"];
    let promo_estaciones = val["promo_estaciones"];
    let numero_servicio = val["numero_servicio"];
    let nombre_servicio = val["nombre_servicio"];

    let promocion = nombre_promo != "" ? `/ <span class="text-danger">${nombre_promo}</span>` : "";
    let horas = cantidad_horas != "" ? `/ ${cantidad_horas}hrs` : "";
    promo_estaciones = promo_estaciones ? `/ <span class="text-success">Sanatorio Estaciones</span>` : "";

    let btn_agregar_beneficiario = ["13", "15"].includes(numero_servicio)
      ? `- <button class="btn btn-outline-success btn-sm" onclick="agregar_beneficiarios(true, ${numero_servicio})">Agregar Beneficiarios</button>`
      : "";

    document.getElementById("div_lista_servicios").innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold">
                    ${nombre_servicio} ${horas} ${promo_estaciones} ${promocion} ${btn_agregar_beneficiario}
                </div>
            </div>
            <button class="btn btn-sm btn-danger rounded-circle" onclick="quitar_servicio(${numero_servicio}, '${nombre_servicio}')">❌</button>
        </li>`;
  });
}


function quitar_servicio(numero_servicio, nombre_servicio) {
  if (["13", "15"].includes(numero_servicio)) {
    $("#txt_nombre_beneficiario_servicio").val("");
    $("#txt_cedula_beneficiario_servicio").val("");
    $("#txt_telefono_beneficiario_servicio").val("");
    $("#txt_fecha_nacimiento_beneficiario_servicio").val("");
    array_beneficiarios_servicio = [];
    listar_beneficiarios_agregados();
  }

  $("#span_total_precio_servicios").text("?");
  document.getElementById("select_servicios_servicios").innerHTML += `<option value="${numero_servicio}">${nombre_servicio}</option>`;

  let selectList = $("#select_servicios_servicios option");
  selectList.sort(function (a, b) {
    return a.value - b.value;
  });
  $("#select_servicios_servicios").html(selectList);

  array_servicios_agregados = array_servicios_agregados.filter(
    (servicio) => servicio["numero_servicio"] != numero_servicio
  );
  listar_servicios_agregados();
}


function calcular_total() {
  $("#span_total_precio_servicios").text("?");
  let fecha_nacimiento = $("#txt_fecha_nacimiento_beneficiario").val();

  if (array_servicios_agregados.length == 0) {
    $("#span_total_precio_servicios").text("0");
  } else {
    $.ajax({
      type: "GET",
      url: `${url_ajax}afiliacion_individual/servicios/calcular_precio_total.php`,
      data: {
        fecha_nacimiento: fecha_nacimiento,
        array_servicios_agregados: array_servicios_agregados,
      },
      dataType: "JSON",
      beforeSend: function () {
        mostrar_spinning("span_total_precio_servicios", "danger");
      },
      success: function (response) {
        if (response.error == false) {
          let precio = response.precio;
          $("#span_total_precio_servicios").text(`${precio}`);
        } else {
          $("#span_total_precio_servicios").text("?");
        }
      },
    });
  }
}


function vaciar_datos_servicio() {
  //Elimino los datos del array
  array_servicios_agregados = [];
  //Limpio la lista de servicios agregados
  $("#div_lista_servicios").html("");
  //Limpio los campos
  $("#select_servicios_servicios").val("");
  $("#select_cantidad_horas_servicios").val("");
  $("#chbox_lista_de_precios").prop("checked", false);
  $("#select_promocion_servicios").val("");
  $("#txt_importe_total_servicios").val("");
  //Oculto los divs
  $(".div_cantidad_horas_servicios").css("display", "none");
  $(".div_lista_de_precios").css("display", "none");
  $(".div_socio_adeom").css("display", "none");
  $(".div_promocion_servicios").css("display", "none");
  $(".div_ingresar_importe_total").css("display", "none");
  //Cambio el precio a "0"
  $("#span_total_precio_servicios").text("0");
}
