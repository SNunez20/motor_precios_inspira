let array_personas_grupo_familiar = [];
function acciones_formulario_grupo_familiar_formulario_1() {
    mostrar_div_datos_venta_grupo_familiar(1);

    if (array_personas_grupo_familiar.length <= 0) {
        $("#div_lista_personas_grupo_familiar").html("");
    } else {
        listar_personas_grupo_familiar(false);
    }


    $("#btn_atras_datos_venta_grupo_familiar").html(`<button type="button" class="btn btn-primary" onclick="volver_modal_tipo_afiliacion_grupo_familiar()">⬅ Atrás</button>`);
    $("#btn_siguente_datos_venta_grupo_familiar").html(`<button type="button" class="btn btn-primary" onclick="validar_formulario_grupo_familiar_1()">Siguiente ➡</button>`);
}


function volver_modal_tipo_afiliacion_grupo_familiar() {
    $('#modal_tipo_afiliacion').modal('show');
    $("#modal_datos_venta_grupo_familiar").modal("hide");
}


function agregar_persona_grupo_familiar() {
    let cedula = $("#txt_cedula_persona_gropo_familiar").val();

    let cedula_ya_existe = 0;
    array_personas_grupo_familiar.map((val) => {
        if (val["cedula"] == cedula) cedula_ya_existe = 1;
    });

    if (cedula == "") {
        error("Debe ingresar una cédula");
    } else if (!comprobarCI(cedula)) {
        error("Debe ingresar una cédula válida");
    } else if (cedula_ya_existe > 0) {
        error("La cédula ingresada ya fue agregada");
    } else {
        $("#txt_cedula_persona_gropo_familiar").val("");
        array_personas_grupo_familiar.push({ cedula: cedula });
        listar_personas_grupo_familiar();
    }
}


function listar_personas_grupo_familiar() {
    $("#div_lista_personas_grupo_familiar").html("");

    array_personas_grupo_familiar.map((val) => {
        let cedula = val["cedula"];

        document.getElementById("div_lista_personas_grupo_familiar").innerHTML += `
          <li class="list-group-item d-flex justify-content-between align-items-start list-group-item-info">
              <div class="ms-2 me-auto">
                  <div class="fw-bold">
                      ${cedula}
                  </div>
              </div>
              <button class="btn btn-sm btn-danger rounded-circle" onclick="quitar_persona_grupo_familiar(${cedula})">❌</button>
          </li>`;
    });
}


function quitar_persona_grupo_familiar(cedula) {
    array_personas_grupo_familiar = array_personas_grupo_familiar.filter(
        (cedulas) => cedulas["cedula"] != cedula
    );
    listar_personas_grupo_familiar();
}


function validar_formulario_grupo_familiar_1() {
    if (array_personas_grupo_familiar.length <= 0) {
        error("No hay personas agregadas");
    } else if (array_personas_grupo_familiar.length < 2) {
        error("Debe ingresar al menos dos personas");
    } else {
        $.ajax({
            type: "POST",
            url: `${url_ajax}/afiliacion_grupo_familiar/validar_padron_grupo.php`,
            data: {
                array_personas_grupo_familiar
            },
            beforeSend: function () {
                showLoading();
              },
              complete: function () {
                showLoading(false);
              },
            dataType: "JSON",
            success: function (response) {
                if (response.error === false) {
                    mostrar_div_datos_venta_grupo_familiar(2);
                    acciones_formulario_grupo_familiar_formulario_2();
                } else {
                    error(response.mensaje);
                }
            }
        });
    }
}


function vaciar_datos_personas_grupo_familiar() {
    //Elimino los datos del array
    array_personas_grupo_familiar = [];
    //Limpio la lista de servicios agregados
    $("#div_lista_personas_grupo_familiar").html("");
    //Limpio los campos
    $("#txt_cedula_persona_gropo_familiar").val("");
}
