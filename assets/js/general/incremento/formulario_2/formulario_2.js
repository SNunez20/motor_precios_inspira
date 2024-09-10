let array_servicios_agregados_incremento = [];
function acciones_incremento_formulario_2() {
    if (array_servicios_agregados_incremento.length <= 0) {
        select_convenios_servicios("select_convenio_servicios_incremento");
        select_servicios("select_servicios_servicios_incremento");
    
        $("#select_servicios_servicios_incremento").html("");
        $(".div_cantidad_horas_servicios_incremento").css("display", "none");
        $(".div_lista_de_precios_incremento").css("display", "none");
        $(".div_socio_adeom_incremento").css("display", "none");
        $(".div_promocion_servicios_incremento").css("display", "none");
        $(".div_ingresar_importe_total_incremento").css("display", "none");
        $("#chbox_socio_adeom_incremento").prop("checked", false);

        listar_servicios_actuales_incremento();
      }


    $("#select_servicios_servicios_incremento").on("change", function () {
        let servicio = $("#select_servicios_servicios_incremento").val();
        if (servicio == "") {
          $(".div_cantidad_horas_servicios_incremento").css("display", "none");
          $(".div_lista_de_precios_incremento").css("display", "none");
          $(".div_socio_adeom_incremento").css("display", "none");
          $(".div_promocion_servicios_incremento").css("display", "none");
          $(".div_ingresar_importe_total_incremento").css("display", "none");
          $("#chbox_socio_adeom_incremento").prop("checked", false);
        } else {
          mostrar_divs_servicios_incremento(servicio);
        }
      });


    $("#btn_atras_datos_venta_incremento").html(`<button type="button" class="btn btn-primary" onclick="mostrar_div_datos_venta_incremento(1), acciones_incremento_formulario_1();">⬅ Atrás</button>`);
    $("#btn_siguente_datos_venta_incremento").html(`<button type="button" class="btn btn-primary" onclick="validar_nuevo_incremento_2()">Siguiente ➡</button>`);
}


function validar_nuevo_incremento_2() {
    let observacion = $("#txt_observacion_servicios_incremento").val();
  
    if (array_servicios_agregados_incremento.length <= 0) {
      error("Debe agregar al menos un servicio");
    } else if (observacion == "") {
      error("Debe ingresar una observación");
    } else {
      mostrar_div_datos_venta_incremento(3);
      acciones_incremento_formulario_3();
    }
}


function listar_servicios_actuales_incremento() {
    $("#div_listado_servicios_actuales_incremento").html("");

    let cedula = $("#txt_cedula_beneficiario_incremento").val();
    if (cedula == "") {
        error("Debe ingresar una cédula");
    } else {

        $.ajax({
            type: "GET",
            url: `${url_ajax}incremento/lista_servicios_actuales.php`,
            data: {
                cedula
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
                    let lista_servicios = response.lista_servicios;
                    let importe_total = response.importe_total;
                    let html = "";
                    html += `<li class="list-group-item active text-center fw-bolder list-group-item-secondary" aria-current="true">Servicios actuales:</li>`;

                    lista_servicios.map((val => {
                        html += val;
                    }));

                    html += `
                    <li class="list-group-item active text-end fw-bolder list-group-item-secondary" aria-current="true">
                        Total ($UY): <span class="text-danger">${importe_total}</span>
                    </li>`;
                    $("#div_listado_servicios_actuales_incremento").html(html);


                    let acotado = response.acotado;
                    let array_numeros_servicios = response.numeros_servicios;

                    listar_filtrado_servicios_incremento(acotado, array_numeros_servicios);
                } else {
                    error(response.mensaje);
                }
            }
        });
    }
}


function listar_filtrado_servicios_incremento(acotado, array_numeros_servicios)
{
    $("#select_servicios_servicios_incremento").html("");

    $.ajax({
        type: "GET",
        url: `${url_ajax}incremento/lista_servicios_permitidos.php`,
        data: {
            acotado,
            array_numeros_servicios
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
                let lista_servicios = response.lista_servicios;
                let html = "<option value='' selected>Seleccione una opción</option>";
                lista_servicios.map((val => {
                    html += `<option value="${val['id']}">${val['nombre_servicio']}</option>`;
                }));
                
                $("#select_servicios_servicios_incremento").html(html);
            } else {
                error(response.mensaje);
            }
        }
    });
}