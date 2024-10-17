let array_tarjeta_titular_incremento = [];
function validar_datos_tarjeta_incremento(openModal = false) {
  if (openModal == true) {
    let precio = $("#span_total_precio_servicios_incremento").text();
    $("#span_precio_total_a_pagar_pago_incremento").text(`$UY ${precio}`);
    select_bancos_emisores("select_banco_emisor_tarjeta_pago_incremento");
    select_anio_vencimiento("select_anio_vencimiento_tarjeta_pago_incremento");
    $("#txt_numero_tarjeta_pago_incremento").on("change", function () {
      guessPaymentMethod_incremento();
    });

    $("#modal_datos_tarjeta_incremento").modal("show");
  } else {
    let numero_tarjeta = $("#txt_numero_tarjeta_pago_incremento").val();
    let tipo_tarjeta = $("#paymentMethodId_incremento").val();
    let cvv_tarjeta = $("#txt_numero_cvv_tarjeta_pago_incremento").val();
    let banco_emisor = $("#select_banco_emisor_tarjeta_pago_incremento").val();
    let cedula_titular = $("#txt_cedula_titular_tarjeta_pago_incremento").val();
    let nombre_titular = $("#txt_nombre_titular_tarjeta_pago_incremento").val();
    let mes_vencimiento = $("#select_mes_vencimiento_tarjeta_pago_incremento").val();
    let anio_vencimiento = $("#select_anio_vencimiento_tarjeta_pago_incremento").val();
    let email_titular = $("#txt_correo_electronico_titular_tarjeta_pago_incremento").val();
    let celular_titular = $("#txt_celular_titular_tarjeta_pago_incremento").val();
    let telefono_titular = $("#txt_telefono_titular_tarjeta_pago_incremento").val();

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
      /*
      } else if (email_titular == "") {
        error("Debe ingresar el email del titular de la tarjeta");
        */
    } else if (email_titular != "" && !validarEmail(email_titular)) {
      error("Debe ingresar un correo electrónico válido");
    } else if (nombre_titular == "") {
      error("Debe ingresar el nombre del titular de la tarjeta");
    } else if (celular_titular == "") {
      error("Debe ingresar el celular del titular de la tarjeta");
    } else if (!comprobarCelular(celular_titular)) {
      error("Debe ingresar un celular válido");
      /*
      } else if (telefono_titular == "") {
        error("Debe ingresar el teléfono del titular de la tarjeta");
        */
    } else if (telefono_titular != "" && (telefono_titular.length < 8 || telefono_titular.length > 9)) {
      error("Debe ingresar un teléfono válido");
    } else if (array_tarjeta_titular_incremento.length > 0) {
      error("Ya ha ingresado los datos del titular de la tarjeta");
    } else {
      array_tarjeta_titular_incremento = [];
      array_tarjeta_titular_incremento = {
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
      if (array_tarjeta_titular_incremento.precio != "") {
        correcto("Se guardaron los datos de la tarjeta con éxito!");
        $("#modal_datos_tarjeta_incremento").modal("hide");
      }
    }
  }
}


function guessPaymentMethod_incremento(event) {
  let cardnumber = $("#txt_numero_tarjeta_pago_incremento").val();
  if (cardnumber.length >= 6) {
    let bin = cardnumber.substring(0, 6);
    window.Mercadopago.getPaymentMethod({ bin: bin }, setPaymentMethod_incremento);
  } else {
    $("#img_tarjeta_incremento").html("");
  }
}


function setPaymentMethod_incremento(status, response) {
  $("#img_tarjeta_incremento").html("");
  if (status == 200) {
    let paymentMethod = response[0];
    $("#img_tarjeta_incremento").html(`<img src='${paymentMethod.secure_thumbnail}' alt='${paymentMethod.id}'></img>`);
    $("#paymentMethodId_incremento").val(paymentMethod.id);
  } else {
    error("Compruebe que el número de la tarjeta sea correcto");
  }
}


function vaciar_datos_titular_tarjeta_incremento() {
  //Elimino los datos del array
  array_tarjeta_titular_incremento = [];
  //Limpio los campos
  $("#span_precio_total_a_pagar_pago_incremento").text("");
  $("#txt_numero_tarjeta_pago_incremento").val("");
  $("#txt_numero_cvv_tarjeta_pago_incremento").val("");
  $("#select_banco_emisor_tarjeta_pago_incremento").val("");
  $("#txt_cedula_titular_tarjeta_pago_incremento").val("");
  $("#txt_nombre_titular_tarjeta_pago_incremento").val("");
  $("#select_mes_vencimiento_tarjeta_pago_incremento").val("");
  $("#select_anio_vencimiento_tarjeta_pago_incremento").val("");
  $("#txt_correo_electronico_titular_tarjeta_pago_incremento").val("");
  $("#txt_celular_titular_tarjeta_pago_incremento").val("");
  $("#txt_telefono_titular_tarjeta_pago_incremento").val("");
}