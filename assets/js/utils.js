// Funciones de control

function comprobarCI(cedi) {
  if (cedi == "93233611" || cedi == "78183625") return true;

  let arrCoefs = [2, 9, 8, 7, 6, 3, 4, 1];
  let suma = 0;
  let difCoef = parseInt(arrCoefs.length - cedi.length);
  for (let i = cedi.length - 1; i > -1; i--) {
    let dig = cedi.substring(i, i + 1);
    let digInt = parseInt(dig);
    let coef = arrCoefs[i + difCoef];
    suma = suma + digInt * coef;
  }
  return suma % 10 == 0;
}

function comprobarCelular(celular) {
  let primeros_dos_digitos = celular.substring(0, 2);
  return primeros_dos_digitos != 09 || celular.length != 9 ? false : true;
}

function comprobarTelefono(telefono, codigo) {
  let primeros_dos_digitos = telefono.substring(0, 2);
  return primeros_dos_digitos != `${codigo}` || telefono.length != 8 ? false : true;
}

function validarEmail(email) {
  // Expresión regular para validar un correo electrónico
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

function controlCargo(param) {
  let mensaje = "";
  if (param == 0) {
    if ($("#observacionesNSR").val() == "")
      mensaje += "Es necesario que agregue una observación.";
  } else if (param == 1) {
    if ($("#nombreNS").val() == "")
      mensaje += 'Es necesario que llene el campo "nombre".\n';
    if ($("#apellidoNS").val() == "")
      mensaje += 'Es necesario que llene el campo "apellido".\n';
    if ($("#telefonoNS").val() == "" && $("#celularNS").val() == "")
      mensaje += "Es necesario que agregue un teléfono o un celular.\n";
    else {
      if ($("#telefonoNS").val() != "") {
        if (!/^([0-9])*$/.test($("#telefonoNS").val()))
          mensaje += 'El campo "Telefono" sólo puede contener números.\n';
        else if ($("#telefonoNS").val().length != 8)
          mensaje += 'El campo "Teléfono" debe de tener 8 números.\n';
        else if (
          $("#telefonoNS").val().substring(0, 1) != 2 &&
          $("#telefonoNS").val().substring(0, 1) != 4
        )
          mensaje +=
            'El telefono ingresado en el campo "Teléfono" es inválido.\n';
      }
      if ($("#celularNS").val() != "") {
        if (!/^([0-9])*$/.test($("#celularNS").val()))
          mensaje += 'El campo "Celular" sólo puede contener números.\n';
        else if ($("#celularNS").val().length != 9)
          mensaje += 'El campo "Celular" debe de tener 9 números.\n';
        else if ($("#celularNS").val().substring(0, 2) != 09)
          mensaje +=
            'El celular ingresado en el campo "Celular" es inválido.\n';
      }
    }
    if ($("#observacionesNS").val() == "")
      mensaje += "Es necesario que agregue una observación.";
  } else {
    if ($("#obser").val() == "")
      mensaje = "Es necesario que agregue una observación.";
  }

  return mensaje;
}

function verMasTabla(observacion) {
  $("#todo_comentario_funcionarios").val(observacion);
  $("#modalVerMasFuncionarios").modal("show");
}

function alerta(titulo, mensaje, icono) {
  Swal.fire({ title: titulo, html: mensaje, icon: icono });
}

function error(mensaje) {
  Swal.fire({ title: "Error!", html: mensaje, icon: "error" });
}

function warning(mensaje, titulo = "") {
  Swal.fire({ title: titulo, html: mensaje, icon: "warning" });
}

function correcto(mensaje) {
  Swal.fire({ title: "Éxito!", html: mensaje, icon: "success" });
}

function alerta_ancla(titulo, mensaje, icono) {
  Swal.fire({
    icon: icono,
    title: titulo,
    html: mensaje,
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
}

function cargando(opcion = "M", mensaje = null) {
  if (opcion === "M") {
    $loader = Swal.fire({
      icon: "info",
      title: "Cargando...",
      html: mensaje,
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
    Swal.showLoading();
  } else {
    Swal.hideLoading();
    Swal.close();
  }
}

function showLoading(mostrar = true, title = "Cargando...") {
  if (mostrar == true) {
    Swal.fire({
      title,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
  } else {
    Swal.close();
  }
}

function hideLoading() {
  Swal.close();
}

function mostrarLoader(opcion = "M") {
  $loader =
    opcion == "M"
      ? Swal.fire({
        title: "Cargando...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          swal.showLoading();
        },
      })
      : $loader.close();
}

function loading(mostrar = false) {
  if (mostrar == true) {
    Swal.fire({
      title: "Cargando...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
  } else {
    Swal.close();
  }
}

function correcto_pasajero(mensaje) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: mensaje,
  });
}

function btn_cargando(div, color) {
  $(`#${div}`).html(`
    <button class="btn btn-${color}" id="btn_cargando" type="button" disabled>
        <span class="spinner-border spinner-border-sm"></span>
        <span role="status">Cargando...</span>
    </button>`);
}

function fecha_hora_actual() {
  let fecha = new Date();
  let hora = fecha.getHours();
  let minutos = fecha.getMinutes();
  fecha = fecha.toJSON().slice(0, 10);
  hora = String(hora).length == 1 ? `0${hora}` : hora;
  minutos = String(minutos).length == 1 ? `0${minutos}` : minutos;

  return `${fecha} ${hora}:${minutos}`;
}

function fecha_actual(obtener) {
  let devolver = "";
  let fecha = new Date();
  if (obtener == "fecha") devolver = fecha.toJSON().slice(0, 10);
  if (obtener == "anio") devolver = fecha.getFullYear();
  if (obtener == "mes") devolver = fecha.getMonth() + 1;
  if (obtener == "dia") devolver = fecha.getDay();

  return `${devolver}`;
}

function esNumero(cadena) {
  const regex_numeros = /^[0-9]*$/;
  return regex_numeros.test(cadena);
}

function soloNumeros(e) {
  if (
    $.inArray(e.keyCode, [46, 8, 9, 27, 13, 40]) !== -1 ||
    (e.keyCode >= 35 && e.keyCode <= 39)
  )
    return;

  if (
    (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
    (e.keyCode < 96 || e.keyCode > 105)
  )
    e.preventDefault();

  if (e.altKey) return false;
}

function soloLetras(e) {
  key = e.keyCode || e.which;
  tecla = String.fromCharCode(key).toLowerCase();
  letras = "áéíóúabcdefghijklmnñopqrstuvwxyz ";
  especiales = "8-37-39-46";

  if (letras.indexOf(tecla) == -1) return false;
}

function maxLengthCheck(object) {
  if (object.value.length > object.maxLength)
    object.value = object.value.slice(0, object.maxLength);
}

function cambiar_formato_fecha(fecha) {
  return fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1");
}
