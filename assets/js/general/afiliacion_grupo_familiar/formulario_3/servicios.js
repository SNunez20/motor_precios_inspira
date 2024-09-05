function mostrar_divs_servicios_grupo_familiar(cedula, servicio) {
    let socio_adeom = $("#chbox_lista_de_precios_grupo_familiar").is(":checked");

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
                    select_cantidad_horas(servicio, "select_cantidad_horas_servicios_grupo_familiar");
                    $(".div_cantidad_horas_servicios_grupo_familiar").css("display", "block");
                } else {
                    $(".div_cantidad_horas_servicios_grupo_familiar").css("display", "none");
                }

                if (response.mostrar_lista_precios == 1) {
                    $(".div_lista_de_precios_grupo_familiar").css("display", "block");
                    $("#chbox_lista_de_precios_grupo_familiar").prop("checked", false);
                } else {
                    $(".div_lista_de_precios_grupo_familiar").css("display", "none");
                }

                if (servicio == 8) {
                    $("#select_promocion_servicios_grupo_familiar").html("");
                    $(".div_promocion_servicios_grupo_familiar").css("display", "none");
                    $(".div_socio_adeom_grupo_familiar").css("display", "block");
                    $("#chbox_socio_adeom_grupo_familiar").prop("checked", false);
                    $("#chbox_socio_adeom_grupo_familiar").click(function () {
                        if ($("#chbox_socio_adeom_grupo_familiar").is(":checked")) {
                            mostrar_promociones_grupo_familiar(cedula, response.mostrar_promociones, servicio);
                        } else {
                            $(".div_promocion_servicios_grupo_familiar").css("display", "none");
                        }
                    });
                } else {
                    $(".div_socio_adeom_grupo_familiar").css("display", "none");
                    mostrar_promociones_grupo_familiar(cedula, response.mostrar_promociones, servicio);

                    if (response.mostrar_div_importe_total == 1) {
                        $("#txt_importe_total_servicios_grupo_familiar").val("");
                        $(".div_ingresar_importe_total_grupo_familiar").css("display", "block");
                    } else {
                        $("#txt_importe_total_servicios_grupo_familiar").val("");
                        $(".div_ingresar_importe_total_grupo_familiar").css("display", "none");
                    }
                }

            }
        }
    });
}


function mostrar_promociones_grupo_familiar(cedula, res_mostrar_promociones, servicio) {
    let dato_extra = $("#select_dato_extra_grupo_familiar").val();

    array_servicios_agregados_grupo_familiar.map((val => {
        if (cedula == val['cedula'] && res_mostrar_promociones == 1 && servicio == 1 && dato_extra != "2") {
            $("#div_promocion_servicios_grupo_familiar").html("");
            select_promociones_servicios(servicio);
            $(".div_promocion_servicios_grupo_familiar").css("display", "block");
        } else if (cedula == val['cedula'] && res_mostrar_promociones == 1 && servicio != 1) {
            $("#select_promocion_servicios_grupo_familiar").html("");
            select_promociones_servicios(servicio);
            $(".div_promocion_servicios_grupo_familiar").css("display", "block");
        } else {
            $(".div_promocion_servicios_grupo_familiar").css("display", "none");
        }
    }));
}


function select_promociones_servicios_grupo_familiar(servicio) {
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
                $(`#select_promocion_servicios_grupo_familiar`).html(html);
            }
        },
    });
}


function agregar_servicios_beneficiario_grupo_familiar(openModal = false, cedula = null) {
    if (openModal == true) {
        let nombre_completo = "";
        array_datos_beneficiario_grupo_familiar.map((val => {
            if (val['cedula'] == cedula) nombre_completo = val['nombre_completo'];
        }));

        $("#select_convenio_servicios_grupo_familiar").val("");
        $("#txt_observacion_servicios_grupo_familiar").val("");
        vaciar_form_servicios_grupo_familiar();
        if (array_servicios_agregados_grupo_familiar.length > 0) listar_servicios_agregados_grupo_familiar(cedula);

        if (array_guardar_datos_servicios.length > 0) {
            array_guardar_datos_servicios.map((val => {
                if (val['cedula'] == cedula) {
                    let convenio = val['convenio'];
                    let observacion = val['observacion'];
                    $("#select_convenio_servicios_grupo_familiar").val(convenio);
                    $("#txt_observacion_servicios_grupo_familiar").val(`${observacion}`);
                }
            }));
        }

        $("#select_servicios_servicios_grupo_familiar").on("change", function () {
            let servicio = $("#select_servicios_servicios_grupo_familiar").val();
            if (servicio == "") {
                vaciar_form_servicios_grupo_familiar();
                listar_servicios_agregados_grupo_familiar();
            } else {
                mostrar_divs_servicios_grupo_familiar(cedula, servicio);
            }
        });


        $("#txt_cedula_agregar_servicios_beneficiarios").val("");
        $("#txt_cedula_agregar_servicios_beneficiarios").val(cedula);

        $("#span_cedula_nombre_beneficiario_servicio_grupo_familiar").text(`${cedula} - ${nombre_completo}`);
        $("#modal_agregar_servicios_beneficiario_grupo_familiar").modal("show");
    } else {

        let cedula = $("#txt_cedula_agregar_servicios_beneficiarios").val();
        let nro_servicio = $("#select_servicios_servicios_grupo_familiar").val();
        let nombre_servicio = $("#select_servicios_servicios_grupo_familiar option:selected").text();
        let cant_horas_visible = $("#select_cantidad_horas_servicios_grupo_familiar").is(":visible");
        let cant_horas = $("#select_cantidad_horas_servicios_grupo_familiar").val();
        let promo_estaciones = $("#chbox_lista_de_precios_grupo_familiar").is(":checked");
        let nro_promo = $("#select_promocion_servicios_grupo_familiar").val();
        let nombre_promo = $("#select_promocion_servicios_grupo_familiar option:selected").text();
        let total_importe_visible = $("#txt_importe_total_servicios_grupo_familiar").is(":visible");
        let total_importe = $("#txt_importe_total_servicios_grupo_familiar").val();
        let ya_existe_servicio = 0;

        array_servicios_agregados_grupo_familiar.map((val => {
            if (val['numero_servicio'] == nro_servicio && cedula == val['cedula']) ya_existe_servicio++;
        }));

        if (nro_servicio == "") {
            error("Debe seleccionar un servicio");
        } else if (cant_horas_visible != false && cant_horas == "") {
            error("Debe seleccionar la cantidad de horas");
        } else if (total_importe_visible != false && total_importe == "") {
            error("Debe ingresar un importe");
        } else if (total_importe_visible != false && total_importe <= 300) {
            error("Debe ingresar un importe mayor a $300");
        } else if (ya_existe_servicio != 0) {
            error("El servicio ingresado ya fue agregado");
        } else {

            $(".div_cantidad_horas_servicios_grupo_familiar").css("display", "none");
            $(".div_lista_de_precios_grupo_familiar").css("display", "none");
            $("#chbox_lista_de_precios_grupo_familiar").prop("checked", false);
            $(".div_promocion_servicios_grupo_familiar").css("display", "none");
            $(".div_ingresar_importe_total_grupo_familiar").css("display", "none");
            $(".div_socio_adeom_grupo_familiar").css("display", "none");
            $("#chbox_socio_adeom_grupo_familiar").prop("checked", false);
            $("#select_servicios_servicios_grupo_familiar").val("");

            nombre_promo = nro_promo != "" ? nombre_promo : "";
            total_importe = total_importe_visible ? total_importe : false;

            let array_servicio = {
                cedula: cedula,
                numero_servicio: nro_servicio,
                nombre_servicio: nombre_servicio,
                cantidad_horas: cant_horas != null ? cant_horas : "",
                promo_estaciones: promo_estaciones,
                numero_promo: nro_promo,
                nombre_promo: nombre_promo,
                total_importe: total_importe,
            };
            array_servicios_agregados_grupo_familiar.push(array_servicio);
            listar_servicios_agregados_grupo_familiar(cedula);
        }
    }
}


function guardar_datos_servicios() {
    let cedula = $("#txt_cedula_agregar_servicios_beneficiarios").val();
    let convenio = $("#select_convenio_servicios_grupo_familiar").val();
    let observacion = $("#txt_observacion_servicios_grupo_familiar").val();
    let tiene_servicios = 0;

    array_servicios_agregados_grupo_familiar.map((val => {
        if (val['cedula'] == cedula) tiene_servicios++;
    }));

    array_guardar_datos_servicios.map((val => {
        if (val['cedula'] == cedula) {
            array_guardar_datos_servicios = array_guardar_datos_servicios.filter(
                (dato) => dato["cedula"] != cedula
            );
        }
    }));

    if (tiene_servicios == 0) {
        error("Debe agregar al menos 1 servicio");
    } else if (observacion == "") {
        error("Debe ingresar una observación");
    } else {
        let array_datos = {
            cedula: cedula,
            convenio: convenio,
            observacion: observacion,
        };
        array_guardar_datos_servicios.push(array_datos);
        correcto(`Se guardaron los servicios con éxito para la cédula <strong>${cedula}<strong>`);
        $("#modal_agregar_servicios_beneficiario_grupo_familiar").modal("hide");
    }
}


function ver_servicios_beneficiario_grupo_familiar(cedula) {
    alert("Ver servicios agregados");
}


function listar_servicios_agregados_grupo_familiar(cedula_modal, calcular_precio = true) {
    $("#div_servicios_agregados_listado_grupo_familiar").html("");
    $("#select_cantidad_horas_servicios_grupo_familiar").val("");
    $("#select_promocion_servicios_grupo_familiar").val("");
    $("#txt_importe_total_servicios_grupo_familiar").val("");

    if (calcular_precio) calcular_total_grupo_familiar(cedula_modal);

    array_servicios_agregados_grupo_familiar.map((val) => {
        let cedula = val["cedula"];

        if (cedula == cedula_modal) {
            let nombre_promo = val["nombre_promo"];
            let cantidad_horas = val["cantidad_horas"];
            let promo_estaciones = val["promo_estaciones"];
            let numero_servicio = val["numero_servicio"];
            let nombre_servicio = val["nombre_servicio"];

            let promocion = nombre_promo != "" ? `/ <span class="text-danger">${nombre_promo}</span>` : "";
            let horas = cantidad_horas != "" ? `/ ${cantidad_horas}hrs` : "";
            promo_estaciones = promo_estaciones ? `/ <span class="text-success">Sanatorio Estaciones</span>` : "";

            document.getElementById("div_servicios_agregados_listado_grupo_familiar").innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">
                        ${nombre_servicio} ${horas} ${promo_estaciones} ${promocion}
                    </div>
                </div>
                <button class="btn btn-sm btn-danger rounded-circle" onclick="quitar_servicio_grupo_familiar(${cedula}, ${numero_servicio})">❌</button>
            </li>`;

        }
    });
}


function quitar_servicio_grupo_familiar(cedula, numero_servicio) {
    $("#span_total_precio_servicios_grupo_familiar").text("?");

    array_servicios_agregados_grupo_familiar = array_servicios_agregados_grupo_familiar.filter(
        (servicio) => servicio["numero_servicio"] != numero_servicio
    );
    listar_servicios_agregados_grupo_familiar(cedula);
}


function calcular_total_grupo_familiar(cedula) {
    $("#span_total_precio_servicios_grupo_familiar").text("?");
    let fecha_nacimiento = $("#txt_fecha_nacimiento_beneficiario_grupo_familiar").val();

    if (array_servicios_agregados_grupo_familiar.length <= 0) {
        $("#span_total_precio_servicios_grupo_familiar").text("0");
    } else {
        $.ajax({
            type: "GET",
            url: `${url_ajax}afiliacion_grupo_familiar/servicios/calcular_precio_total.php`,
            data: {
                cedula: cedula,
                fecha_nacimiento: fecha_nacimiento,
                array_servicios_agregados_grupo_familiar: array_servicios_agregados_grupo_familiar,
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
                    let precio = response.precio;
                    $("#span_total_precio_servicios_grupo_familiar").text(`${precio}`);
                } else {
                    $("#span_total_precio_servicios_grupo_familiar").text("?");
                }
            },
        });
    }
}


function vaciar_form_servicios_grupo_familiar() {
    //Limpio la lista de servicios agregados
    $("#div_servicios_agregados_listado_grupo_familiar").html("");
    //Limpio los campos
    $("#select_servicios_servicios_grupo_familiar").val("");
    $("#select_cantidad_horas_servicios_grupo_familiar").val("");
    $("#chbox_lista_de_precios_grupo_familiar").prop("checked", false);
    $("#select_promocion_servicios_grupo_familiar").val("");
    $("#txt_importe_total_servicios_grupo_familiar").val("");
    $("#chbox_socio_adeom_grupo_familiar").prop("checked", false);
    //Oculto los divs
    $(".div_cantidad_horas_servicios_grupo_familiar").css("display", "none");
    $(".div_lista_de_precios_grupo_familiar").css("display", "none");
    $(".div_socio_adeom_grupo_familiar").css("display", "none");
    $(".div_promocion_servicios_grupo_familiar").css("display", "none");
    $(".div_ingresar_importe_total_grupo_familiar").css("display", "none");
    //Cambio el precio a "0"
    $("#span_total_precio_servicios_grupo_familiar").text("0");
}