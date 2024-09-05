let array_tarjeta_titular_grupo_familiar = [];
function validar_datos_tarjeta_grupo_familiar(openModal = false) {
  if (openModal == true) {
    calcular_total_precio_grupo_familiar();
    select_bancos_emisores("select_banco_emisor_tarjeta_pago_grupo_familiar");
    select_anio_vencimiento("select_anio_vencimiento_tarjeta_pago_grupo_familiar");
    $("#txt_numero_tarjeta_pago_grupo_familiar").on("change", function () {
      guessPaymentMethod_grupo_familiar();
    });

    $("#modal_datos_tarjeta_grupo_familiar").modal("show");
  } else {
    let numero_tarjeta = $("#txt_numero_tarjeta_pago_grupo_familiar").val();
    let tipo_tarjeta = $("#paymentMethodId_grupo_familiar").val();
    let cvv_tarjeta = $("#txt_numero_cvv_tarjeta_pago_grupo_familiar").val();
    let banco_emisor = $("#select_banco_emisor_tarjeta_pago_grupo_familiar").val();
    let cedula_titular = $("#txt_cedula_titular_tarjeta_pago_grupo_familiar").val();
    let nombre_titular = $("#txt_nombre_titular_tarjeta_pago_grupo_familiar").val();
    let mes_vencimiento = $("#select_mes_vencimiento_tarjeta_pago_grupo_familiar").val();
    let anio_vencimiento = $("#select_anio_vencimiento_tarjeta_pago_grupo_familiar").val();
    let email_titular = $("#txt_correo_electronico_titular_tarjeta_pago_grupo_familiar").val();
    let celular_titular = $("#txt_celular_titular_tarjeta_pago_grupo_familiar").val();
    let telefono_titular = $("#txt_telefono_titular_tarjeta_pago_grupo_familiar").val();

    if (numero_tarjeta == "") {
      error("Debe ingresar el número de la tarjeta");
    } else if (tipo_tarjeta == "") {
      error("Debe ingresar un número de tarjeta válido");
    } else if (banco_emisor == "") {
      error("Debe seleccionar el banco emisor");
    } else if (cedula_titular == "") {
      error("Debe ingresar la cédula del titular de la tarjeta");
    } else if (comprobarCI(cedula_titular) == false) {
      error("Debe ingresar una cédula válida");
    } else if (nombre_titular == "") {
      error("Debe ingresar el nombre del titular de la tarjeta");
    } else if (mes_vencimiento == "") {
      error("Debe seleccionar el mes de vencimiento de la tarjeta");
    } else if (anio_vencimiento == "") {
      error("Debe seleccionar el año de vencimiento de la tarjeta");
    } else if (Number(anio_vencimiento) < fecha_actual("anio") || (Number(anio_vencimiento) == fecha_actual("anio") && Number(mes_vencimiento) < fecha_actual("mes"))) {
      error("La tarjeta se encuentra vencida");
    } else if (email_titular == "") {
      error("Debe ingresar el email del titular de la tarjeta");
    } else if (!validarEmail(email_titular)) {
      error("Debe ingresar un correo electrónico válido");
    } else if (nombre_titular == "") {
      error("Debe ingresar el nombre del titular de la tarjeta");
    } else if (celular_titular == "") {
      error("Debe ingresar el celular del titular de la tarjeta");
    } else if (!comprobarCelular(celular_titular)) {
      error("Debe ingresar un celular válido");
    } else if (telefono_titular == "") {
      error("Debe ingresar el teléfono del titular de la tarjeta");
    } else if (!comprobarTelefono(telefono_titular, 52)) {
      error("Debe ingresar un teléfono válido");
    } else if (array_tarjeta_titular_grupo_familiar.length > 0) {
      error("Ya ha ingresado los datos del titular de la tarjeta");
    } else {
      array_tarjeta_titular_grupo_familiar = [];
      array_tarjeta_titular_grupo_familiar = {
        numero_tarjeta: numero_tarjeta,
        tipo_tarjeta: tipo_tarjeta,
        cvv_tarjeta: cvv_tarjeta,
        banco_emisor: banco_emisor,
        cedula_titular: cedula_titular,
        nombre_titular: nombre_titular,
        mes_vencimiento: mes_vencimiento,
        anio_vencimiento: anio_vencimiento,
        email_titular: email_titular,
        celular_titular: celular_titular,
        telefono_titular: telefono_titular,
      };
      if (array_tarjeta_titular_grupo_familiar.precio != "") {
        correcto("Se guardaron los datos de la tarjeta con éxito!");
        $("#modal_datos_tarjeta_grupo_familiar").modal("hide");
      }
    }
  }
}


function guessPaymentMethod_grupo_familiar(event) {
  let cardnumber = $("#txt_numero_tarjeta_pago_grupo_familiar").val();
  if (cardnumber.length >= 6) {
    let bin = cardnumber.substring(0, 6);
    window.Mercadopago.getPaymentMethod({ bin: bin }, setPaymentMethod_grupo_familiar);
  } else {
    $("#img_tarjeta_grupo_familiar").html("");
  }
}


function setPaymentMethod_grupo_familiar(status, response) {
  $("#img_tarjeta_grupo_familiar").html("");
  if (status == 200) {
    let paymentMethod = response[0];
    $("#img_tarjeta_grupo_familiar").html(`<img src='${paymentMethod.secure_thumbnail}' alt='${paymentMethod.id}'></img>`);
    $("#paymentMethodId_grupo_familiar").val(paymentMethod.id);
  } else {
    error("Compruebe que el número de la tarjeta sea correcto");
  }
}


function calcular_total_precio_grupo_familiar() {
  $.ajax({
    type: "GET",
    url: `${url_ajax}afiliacion_grupo_familiar/calcular_precio_total_grupo_familiar.php`,
    data: {
      array_datos_beneficiario_grupo_familiar,
      array_servicios_agregados_grupo_familiar
    },
    dataType: "JSON",
    success: function (response) {
      if (response.error == false) {
        let importe_total = response.importe_total;
        $("#span_precio_total_a_pagar_pago_grupo_familiar").text(`$UY ${importe_total}`);
      } else {
        $("#span_precio_total_a_pagar_pago_grupo_familiar").text(`$UY 0`);
      }
    }
  });
}


function vaciar_datos_titular_tarjeta_grupo_familiar() {
  //Elimino los datos del array
  array_tarjeta_titular_grupo_familiar = [];
  //Limpio los campos
  $("#span_precio_total_a_pagar_pago_grupo_familiar").text("");
  $("#txt_numero_tarjeta_pago_grupo_familiar").val("");
  $("#txt_numero_cvv_tarjeta_pago_grupo_familiar").val("");
  $("#select_banco_emisor_tarjeta_pago_grupo_familiar").val("");
  $("#txt_cedula_titular_tarjeta_pago_grupo_familiar").val("");
  $("#txt_nombre_titular_tarjeta_pago_grupo_familiar").val("");
  $("#select_mes_vencimiento_tarjeta_pago_grupo_familiar").val("");
  $("#select_anio_vencimiento_tarjeta_pago_grupo_familiar").val("");
  $("#txt_correo_electronico_titular_tarjeta_pago_grupo_familiar").val("");
  $("#txt_celular_titular_tarjeta_pago_grupo_familiar").val("");
  $("#txt_telefono_titular_tarjeta_pago_grupo_familiar").val("");
}


function llenar_datos_tarjeta_grupo_familiar() {
  $("#txt_numero_tarjeta_pago_grupo_familiar").val("5222222222222222");
  $("#txt_numero_cvv_tarjeta_pago_grupo_familiar").val("123");
  $("#select_banco_emisor_tarjeta_pago_grupo_familiar").val("1");
  $("#txt_cedula_titular_tarjeta_pago_grupo_familiar").val("53249776");
  $("#txt_nombre_titular_tarjeta_pago_grupo_familiar").val("Sebastian Nuñez");
  $("#select_mes_vencimiento_tarjeta_pago_grupo_familiar").val("08");
  $("#select_anio_vencimiento_tarjeta_pago_grupo_familiar").val("2024");
  $("#txt_correo_electronico_titular_tarjeta_pago_grupo_familiar").val("sebanunez019@gmail.com");
  $("#txt_celular_titular_tarjeta_pago_grupo_familiar").val("093300741");
  $("#txt_telefono_titular_tarjeta_pago_grupo_familiar").val("52657894");
}
