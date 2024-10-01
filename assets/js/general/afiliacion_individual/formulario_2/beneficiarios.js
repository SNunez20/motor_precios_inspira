let array_beneficiarios_servicio = [];
function agregar_beneficiarios(openModal = false, numero_servicio) {
  if (openModal == true) {
    $("#txt_numero_servicio_beneficiarios_servicio").val(numero_servicio);
    $("#modal_agregar_beneficiarios").modal("show");
  } else {
    let nombre = $("#txt_nombre_beneficiario_servicio").val();
    let cedula = $("#txt_cedula_beneficiario_servicio").val();
    let telefono = $("#txt_telefono_beneficiario_servicio").val();
    let fecha_nacimiento = $("#txt_fecha_nacimiento_beneficiario_servicio").val();
    let servicio = $("#txt_numero_servicio_beneficiarios_servicio").val();
    let cedula_ya_existe = 0;
    let edad_mayor_65 = 0;
    let edad_mayor_50 = 0;
    let edad_entre_18_y_49 = 0;
    let fecha_nacimiento_titular = array_datos_beneficiario.fecha_nacimiento;
    let edad_titular = fecha_actual("fecha").substr(0, 4) - fecha_nacimiento_titular.substr(0, 4);

    if (edad_titular > 65) edad_mayor_65 = edad_mayor_65 + 1;
    if (edad_titular >= 50 && edad_titular <= 65) edad_mayor_50 = edad_mayor_50 + 1;
    if (edad_titular >= 18 && edad_titular <= 49) edad_entre_18_y_49 = edad_entre_18_y_49 + 1;

    if (nombre == "") {
      error("Debe ingresar el nombre del beneficiario");
    } else if (cedula == "") {
      error("Debe ingresar la cédula del beneficiario");
    } else if (!comprobarCI(cedula)) {
      error("Debe ingresar una cédula válida");
    } else if (cedula == array_datos_beneficiario.cedula) {
      error("La cédula del beneficiario no puede ser igual a la del titular del servicio");
    } else if (telefono == "") {
      error("Debe ingresar el teléfono del beneficiario");
    } else if (!comprobarTelefono(telefono, 52) && !comprobarCelular(telefono)) {
      error("Debe ingresar un teléfono válido");
    } else if (fecha_nacimiento == "") {
      error("Debe ingresar la fecha de nacimiento del beneficiario");
    } else if (fecha_nacimiento >= fecha_actual("fecha")) {
      error("La fecha de nacimiento no puede ser mayor a la fecha actual");
    } else if (servicio == "13" && array_beneficiarios_servicio.length > 3) {
      error("Para el servicio G5 se permiten hasta 4 beneficiarios");
    } else if (servicio == "15" && array_beneficiarios_servicio.length > 4) {
      error("Para el servicio G6 se permiten hasta 5 beneficiarios");
    } else {
      let edad = fecha_actual("fecha").substr(0, 4) - fecha_nacimiento.substr(0, 4);
      /* Servicio #13 - G5 (Grupo familiar 1):
          - Hasta 4 beneficiarios
          - max 1 mayor de 65
          - max 2 mayores de 50
          - Sin límite entre 18 y 49
      */
      /* Servicio #15 - G6 (Grupo familiar 2):
          - Hasta 5 beneficiarios
          - max 2 mayor de 65
          - max 2 mayor de 50
          - Sin límite entre 18 y 49
      */
      array_beneficiarios_servicio.map((val) => {
        if (val["cedula"] == cedula) cedula_ya_existe = 1;
        if (val["edad"] > 65) edad_mayor_65 = edad_mayor_65 + 1;
        if (val["edad"] >= 50 && val["edad"] <= 65) edad_mayor_50 = edad_mayor_50 + 1;
        if (val["edad"] >= 18 && val["edad"] <= 49) edad_entre_18_y_49 = edad_entre_18_y_49 + 1;
      });

      if (cedula_ya_existe != 0) {
        error(`Ya se registro un beneficiario con la cédula ${cedula}`);
      } else if (edad < 18) {
        error("El beneficiario debe ser mayor de 18 años");
      } else if (servicio == "13" && edad > 65 && edad_mayor_65 >= 1) {
        error("El servicio G5 puede tener hasta 1 mayor de 65 años");
      } else if (servicio == "13" && edad >= 50 && edad <= 65 && edad_mayor_50 >= 2) {
        error("El servicio G5 puede tener hasta 2 mayores de 50 años");
      } else if (servicio == "15" && edad > 65 && edad_mayor_65 >= 2) {
        error("El servicio G6 puede tener hasta 2 mayores de 65 años");
      } else if (servicio == "15" && edad >= 50 && edad <= 65 && edad_mayor_50 >= 2) {
        error("El servicio G6 puede tener hasta 2 mayores de 50 años");
      } else {
        $("#txt_nombre_beneficiario_servicio").val("");
        $("#txt_cedula_beneficiario_servicio").val("");
        $("#txt_telefono_beneficiario_servicio").val("");
        $("#txt_fecha_nacimiento_beneficiario_servicio").val("");

        let array_beneficiarios = {
          nombre: nombre,
          cedula: cedula,
          telefono: telefono,
          fecha_nacimiento: fecha_nacimiento,
          edad: edad,
        };
        array_beneficiarios_servicio.push(array_beneficiarios);

        listar_beneficiarios_agregados();
      }
    }
  }
}


function listar_beneficiarios_agregados() {
  $("#div_lista_beneficiarios_servicios").html("");
  if (array_beneficiarios_servicio.length > 0) {
    $("#tabla_beneficiarios_agregados").css("display", "block");
    let i = 1;
    array_beneficiarios_servicio.map((val) => {
      let nombre = val["nombre"];
      let cedula = val["cedula"];
      let telefono = val["telefono"];
      let fecha_nacimiento = cambiar_formato_fecha(val["fecha_nacimiento"]);
      let edad = val["edad"];

      document.getElementById("div_lista_beneficiarios_servicios").innerHTML += `
      <tr>
        <td>${i}</td>
        <td>${nombre}</td>
        <td>${cedula}</td>
        <td>${telefono}</td>
        <td>${fecha_nacimiento}</td>
        <td>${edad}</td>
        <td><button class="btn btn-sm btn-danger rounded-circle" onclick="confirmacion_quitar_beneficiario('${nombre}', ${cedula})">❌</button></td>
      </tr>`;
      i++;
    });
  } else {
    $("#tabla_beneficiarios_agregados").css("display", "none");
  }
}


function confirmacion_quitar_beneficiario(nombre, cedula) {
  Swal.fire({
    title: "Estas seguro?",
    text: `Vas a quitar al beneficiario "${nombre}"`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, quitar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      quitar_beneficiarios_agregados_servicio(cedula);
    }
  });
}


function quitar_beneficiarios_agregados_servicio(cedula) {
  array_beneficiarios_servicio = array_beneficiarios_servicio.filter((beneficiario) => beneficiario["cedula"] != cedula);
  listar_beneficiarios_agregados();
}


function vaciar_datos_beneficiario_servicio() {
  //Elimino los datos del array
  array_beneficiarios_servicio = [];
  //Limpio los campos
  $("#txt_numero_servicio_beneficiarios_servicio").val("");
  $("#div_lista_beneficiarios_servicios").html("");
  $("#txt_nombre_beneficiario_servicio").val("");
  $("#txt_cedula_beneficiario_servicio").val("");
  $("#txt_telefono_beneficiario_servicio").val("");
  $("#txt_fecha_nacimiento_beneficiario_servicio").val("");
}
