const produccion = true;
const protocolo = produccion ? "https" : "http";
const server = produccion ? "vida-apps.com" : "localhost";
const app = produccion ? "motor_precios_inspira" : "motor_precios_inspira_test";
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


function select_localidades(div, valor_actual = false) {
  let html = "";
  if (!valor_actual) html = `<option value="" selected>Seleccione una opción</option>`;

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/beneficiario/select_localidades.php?valor_actual=${valor_actual}`,
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


function select_servicios(opcion, div) {
  let html = `<option value="" selected>Seleccione una opción</option>`;

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/servicios/select_servicios.php?opcion=${opcion}`,
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
  let html = "";
  if (opcion != 3)
    html = `<option value="" selected>Seleccione una opción</option>`;

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/pago/select_metodos_de_pago.php?opcion=${opcion}`,
    data: {
      opcion,
      array: array_datos_beneficiario_incremento,
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
        let datos = response.datos;

        datos.map((val) => {
          html += `<option value="${val["id"]}">${val["nombre"]}</option>`;
        });

        $(`#${div}`).html(html);

        if (opcion == 3) {
          let id_metodo = datos[0]["id"];
          mostrar_campos_segun_metodo_pago_incremento(id_metodo);
        }
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


function llenar_campos(opcion = 1) {
  let formulario = "";
  if (opcion == 2) formulario = "_grupo_familiar";
  if (opcion == 3) formulario = "_incremento";

  $(`#txt_nombre_beneficiario${formulario}`).val("Prueba Prueba");
  $(`#txt_fecha_nacimiento_beneficiario${formulario}`).val("1958-09-10");
  $(`#txt_calle_beneficiario${formulario}`).val("Prueba");
  $(`input[type='radio'][name='rbtn_beneficiario${formulario}'][value='Puerta']`).prop("checked", true);
  $(`#txt_puerta_beneficiario${formulario}`).val("1111");
  /*
  $(`#txt_solar_beneficiario${formulario}`).val();
  $(`#txt_manzana_beneficiario${formulario}`).val();
  */
  $(`#txt_esquina_beneficiario${formulario}`).val("Prueba");
  $(`#txt_apartamento_beneficiario${formulario}`).val();
  $(`#txt_referencia_beneficiario${formulario}`).val("Prueba");
  $(`#select_localidades_beneficiario${formulario}`).val("175");
  $(`#txt_correo_electronico_beneficiario${formulario}`).val();
  $(`#txt_celular_beneficiario${formulario}`).val("091111111");
  $(`#txt_telefono_fijo_beneficiario${formulario}`).val();
  $(`#txt_telefono_alternativo_beneficiario${formulario}`).val();
  $(`#select_promocion_beneficiario${formulario}`).val(3);
}


function llenar_campos_tarjeta(opcion = 1) {
  let formulario = "";
  if (opcion == 2) formulario = "_grupo_familiar";
  if (opcion == 3) formulario = "_incremento";
  $(`#txt_numero_tarjeta_pago${formulario}`).val("5222222222222222");
  $(`#txt_numero_cvv_tarjeta_pago${formulario}`).val("123");
  $(`#select_banco_emisor_tarjeta_pago${formulario}`).val("1");
  $(`#txt_cedula_titular_tarjeta_pago${formulario}`).val("12121212");
  $(`#txt_nombre_titular_tarjeta_pago${formulario}`).val("Prueba");
  $(`#select_mes_vencimiento_tarjeta_pago${formulario}`).val("12");
  $(`#select_anio_vencimiento_tarjeta_pago${formulario}`).val("2024");
  $(`#txt_correo_electronico_titular_tarjeta_pago${formulario}`).val("prueba@gmail.com");
  $(`#txt_celular_titular_tarjeta_pago${formulario}`).val("091111111");
  $(`#txt_telefono_titular_tarjeta_pago${formulario}`).val("52111111");
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


function select_convenios_servicios(opcion, div) {
  let html = "";
  if (opcion == 1)
    html = `<option value="" selected>Seleccione una opción</option>`;

  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_individual/servicios/select_convenios.php`,
    data: {
      opcion,
      array: array_datos_beneficiario_incremento,
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
        if (opcion == 2 && response.sin_convenios == true)
          html = `<option value="" selected>Seleccione una opción</option>`;

        let datos = response.datos;
        datos.map((val) => {
          html += `<option value="${val["sucursal_cobranzas"]}">${val["nombre"]}</option>`;
        });

        if (opcion == 2 && response.sin_convenios == false)
          html += `<option value="">Seleccione una opción</option>`;

        $(`#${div}`).html(html);
      }
    },
  });
}


function obtener_precio_servicio(fecha_nacimiento, numero_servicio, cantidad_horas, promo_estaciones, importe_total, integrantes_nucleo) {
  let resultado = "";

  $.ajax({
    async: false,
    type: "GET",
    url: `${url_ajax}obtener_precio_servicio.php`,
    data: {
      fecha_nacimiento,
      numero_servicio,
      cantidad_horas,
      promo_estaciones,
      importe_total,
      integrantes_nucleo
    },
    dataType: "JSON",
    success: function (response) {
      if (response.error == false) {
        resultado = response.precio;
      } else {
        resultado = false;
      }
    },
  });

  return resultado;
}


function mostrar_spinning(div, color) {
  $(`#${div}`).html(`
    <div class="btn-toolbar ms-3 mb-3">
      <div class="spinner-border text-${color}" role="status">
        <span class="visually-hidden">Cargando ...</span>
      </div>
      <spna class="text-${color} fw-bolder ms-2 mt-1">Cargando ...</span>
    </div>`);
}