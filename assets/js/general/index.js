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
      $("#modal_validar_cedula").modal("show");
    }
  }
}

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
        showLoading();
      },
      complete: function () {
        showLoading(false);
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
            alert("Incremento");
          }
        } else {
          error(response.mensaje);
        }
      },
    });
  }
}
