const produccion = true;
const protocolo = "https";
const server = produccion ? "vida-apps.com" : "vida-apps.com";
const app = produccion ? "motor_precios_inspira" : "motor_precios_inspira";
const url_app = `${protocolo}://${server}/${app}`;
const url_ajax = `${url_app}/php/ajax/`;
const url_lenguage = `${url_app}/assets/js/lenguage.json`;

$(document).ready(function () {
  $(".solo_numeros").keydown(function (e) {
    return soloNumeros(e);
  });

  $(".solo_letras").keypress(function (e) {
    return soloLetras(e);
  });
});

//Cambiar clase y nombre de botón
function cambiar_div(div, clase, nombre) {
  document.getElementById(`${div}`).className = `${clase}`;
  document.getElementById(`${div}`).innerHTML = `${nombre}`;
}

//Ir al div anterior
function modal_anterior(div_actual, div_anterior) {
  if (div_anterior == "modal_validar_cedula") $("#txt_cedula").val("");

  $(`#${div_actual}`).modal("hide");
  $(`#${div_anterior}`).modal("show");
}

//Contador de caracteres
function contador_caracteres(div, span, cantidad) {
  $(`#${span}`).text(cantidad);

  $(`#${div}`).on("keyup", function () {
    //Supervisamos cada vez que se presione una tecla dentro.
    let cant_caracteres = $(this).val().length;
    if (cant_caracteres <= cantidad) {
      let resta = cantidad - cant_caracteres;
      $(`#${span}`).text(resta);
    }
  });
}

function select_localidades(div) {
  let html = `<option value="" selected>Seleccione una opción</option>`;

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/beneficiario/select_localidades.php`,
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

        $(`#${div}`).html(html);
      }
    },
  });
}

function select_promociones(div) {
  let html = `<option value="" selected>No aplica</option>`;
  $(`#${div}`).html(html);

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/beneficiario/select_promociones.php`,
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

        $(`#${div}`).html(html);
      }
    },
  });
}

function select_cantidad_horas(servicio, div) {
  let html = `<option value="" selected>Seleccione una opción</option>`;

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/servicios/select_horas_servicios.php?servicio=${servicio}`,
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
          html += `<option value="${val["horas"]}">${val["horas"]}</option>`;
        });

        $(`#${div}`).html(html);
      }
    },
  });
}

function select_servicios(div) {
  let html = `<option value="" selected>Seleccione una opción</option>`;

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/servicios/select_servicios.php`,
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

        $(`#${div}`).html(html);
      }
    },
  });
}

function select_metodos_de_pago(opcion, div) {
  let html = `<option value="" selected>Seleccione una opción</option>`;

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/pago/select_metodos_de_pago.php?opcion=${opcion}`,
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

        $(`#${div}`).html(html);
      }
    },
  });
}

function select_bancos_emisores(div) {
  let html = `<option value="" selected>Seleccione una opción</option>`;

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/pago/select_bancos_emisores.php`,
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

        $(`#${div}`).html(html);
      }
    },
  });
}

function select_anio_vencimiento(div) {
  let html = `<option value="" selected>Seleccione una opción</option>`;

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/pago/select_anios_vencimiento.php`,
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
          html += `<option value="${val}">${val}</option>`;
        });

        $(`#${div}`).html(html);
      }
    },
  });
}


function llenar_campos() {
  $("#txt_nombre_beneficiario").val("Prueba Prueba");
  $("#txt_fecha_nacimiento_beneficiario").val("2002-04-30");
  $("#txt_calle_beneficiario").val("Prueba");
  $("input[type='radio'][name='rbtn_beneficiario'][value='Puerta']").prop("checked", true);
  $("#txt_puerta_beneficiario").val("1212");
  /*
  $("#txt_solar_beneficiario").val();
  $("#txt_manzana_beneficiario").val();
  */
  $("#txt_esquina_beneficiario").val("Prueba");
  $("#txt_apartamento_beneficiario").val();
  $("#txt_referencia_beneficiario").val("1212");
  $("#select_localidades_beneficiario").val(6);
  $("#txt_correo_electronico_beneficiario").val();
  $("#txt_celular_beneficiario").val("093300741");
  $("#txt_telefono_fijo_beneficiario").val();
  $("#txt_telefono_alternativo_beneficiario").val();
  $("#select_promocion_beneficiario").val();
}


function mostrar_div_datos_venta(id) {
  $("#contenedor_formulario_alta_1").css("display", "none");
  $("#contenedor_formulario_alta_2").css("display", "none");
  $("#contenedor_formulario_alta_3").css("display", "none");
  $("#contenedor_formulario_alta_4").css("display", "none");
  $("#contenedor_formulario_alta_5").css("display", "none");

  $(`#contenedor_formulario_alta_${id}`).css("display", "block");
}


function mostrar_div_datos_venta_grupo_familiar(id) {
  $("#contenedor_formulario_alta_grupo_familiar_1").css("display", "none");
  $("#contenedor_formulario_alta_grupo_familiar_2").css("display", "none");
  $("#contenedor_formulario_alta_grupo_familiar_3").css("display", "none");
  $("#contenedor_formulario_alta_grupo_familiar_4").css("display", "none");

  $(`#contenedor_formulario_alta_grupo_familiar_${id}`).css("display", "block");
}

function mostrar_div_datos_venta_incremento(id) {
  $("#contenedor_formulario_incremento_1").css("display", "none");
  $("#contenedor_formulario_incremento_2").css("display", "none");
  $("#contenedor_formulario_incremento_3").css("display", "none");

  $(`#contenedor_formulario_incremento_${id}`).css("display", "block");
}


function formar_direccion(radio_buttons, apartamento, calle, puerta, esquina, manzana, solar) {
  let direccion = "";

  if (radio_buttons == "Puerta") {
    direccion = apartamento != "" ? `${calle.substr(0, 14)} ${puerta}/${apartamento} E:` : `${calle.substr(0, 17)} ${puerta} E:`;
    direccion += esquina.substr(0, 36 - direccion.length); //di
  } else {
    direccion = apartamento != "" ? `${calle.substr(0, 14)} M:${manzana} S:${solar}/${apartamento}` : `${calle.substr(0, 14)} M:${manzana} S:${solar} E:`;
    direccion += apartamento == "" ? esquina.substr(0, 36 - direccion.length) : ""; //di
  }

  return direccion;
}


function select_convenios_servicios(div) {
  let html = `<option value="" selected>Seleccione una opción</option>`;

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/servicios/select_convenios.php`,
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
          html += `<option value="${val["sucursal_cobranzas"]}">${val["nombre"]}</option>`;
        });
        $(`#${div}`).html(html);
      }
    },
  });
}