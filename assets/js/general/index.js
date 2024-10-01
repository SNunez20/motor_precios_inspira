$(document).ready(function () {
  $("#modal_tipo_afiliacion").modal("show");
});



function validar_afiliacion() {
  let tipo_afiliacion = $("#select_tipo_afiliacion").val();

  if (tipo_afiliacion == "") {
    error("Debe seleccionar un tipo de afiliación");
  } else {
    if (tipo_afiliacion == 2) {
      $("#modal_tipo_afiliacion").modal("hide");
      acciones_formulario_grupo_familiar_formulario_1();
      $("#modal_datos_venta_grupo_familiar").modal("show");
    } else {
      $("#modal_tipo_afiliacion").modal("hide");
      $("#txt_cedula").val("");
      $("#modal_validar_cedula").modal("show");
    }
  }
}


/** Si esta abierto el modal se autoselecciona el campo password **/
$("#modal_validar_cedula").on("shown.bs.modal", function (e) {
  $("#txt_cedula").focus();
});


function validar_cedula() {
  let cedula = $("#txt_cedula").val();

  if (cedula == "") {
    error("Debe ingresar una cédula");
  } else if (comprobarCI(cedula) == false) {
    error("Debe ingresar una cédula válida");
  } else {
    $.ajax({
      type: "GET",
      url: `${url_ajax}comprobar_cedula_padron.php`,
      data: {
        cedula,
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
          if (response.socio == false) {
            $("#modal_validar_cedula").modal("hide");
            mostrar_div_datos_venta(1);
            acciones_formulario_nueva_alta_1();
            $("#modal_datos_venta").modal("show");
          } else {
            comprobar_puede_incrementar(response.datos, response.puede_incrementar);
          }
        } else {
          error(response.mensaje);
        }
      },
    });
  }
}


function comprobar_puede_incrementar(datos, puede_incrementar) {
  if (puede_incrementar) {
    mostrar_div_datos_venta_incremento(1);
    acciones_incremento_formulario_1();
    let cedula = datos.cedula;
    let nombre_completo = datos.nombre;
    let fecha_nacimiento = datos.fecha_nacimiento;
    let email = datos.email;
    let celular = datos.celular;
    let telefono_fijo = datos.telefono_fijo;
    let telefono_alternativo = datos.telefono_alternativo;
    $("#txt_cedula_beneficiario_incremento").val(cedula);
    $("#txt_nombre_beneficiario_incremento").val(nombre_completo);
    $("#txt_fecha_nacimiento_beneficiario_incremento").val(fecha_nacimiento);
    $("#txt_correo_electronico_beneficiario_incremento").val(email);
    $("#txt_celular_beneficiario_incremento").val(celular);
    $("#txt_telefono_fijo_beneficiario_incremento").val(telefono_fijo);
    $("#txt_telefono_alternativo_beneficiario_incremento").val(telefono_alternativo);
    $("#rbtn_beneficiario_incremento").val("Puerta");
    $("#modal_tipo_afiliacion").modal("hide");
    $("#modal_validar_cedula").modal("hide");
    $("#modal_datos_venta_incremento").modal("show");
  } else {
    error("La cédula ingresada ya está en proceso de afiliación");
  }
}
