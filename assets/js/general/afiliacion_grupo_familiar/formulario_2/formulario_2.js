let array_datos_beneficiario_grupo_familiar = [];
function acciones_formulario_grupo_familiar_formulario_2() {
  listar_personas_grupos_familiares();

  if (array_datos_beneficiario_grupo_familiar.length != array_personas_grupo_familiar.length) {
    select_localidades("select_localidades_beneficiario_grupo_familiar");
    select_promociones("select_promocion_beneficiario_grupo_familiar");
  }

  $("#btn_atras_datos_venta_grupo_familiar").html(`<button type="button" class="btn btn-primary" onclick="acciones_formulario_grupo_familiar_formulario_1()">⬅ Atrás</button>`);
  $("#btn_siguente_datos_venta_grupo_familiar").html(`<button type="button" class="btn btn-primary" onclick="validar_formulario_grupo_familiar_2()">Siguiente ➡</button>`);
}


function validar_formulario_grupo_familiar_2() {
  if (array_datos_beneficiario_grupo_familiar.length != array_personas_grupo_familiar.length) {
    error(`Debe ingresar los datos de los ${array_personas_grupo_familiar.length} beneficiarios`);
  } else {
    mostrar_div_datos_venta_grupo_familiar(3);
    acciones_formulario_grupo_familiar_formulario_3();
  }
}


function agregar_datos_beneficiario(openModal = false, cedula = null) {
  if (openModal == true) {
    vaciar_datos_beneficiario_grupo_familiar();

    $("#txt_cedula_beneficiario_grupo_familiar").val(cedula);
    $("#span_cedula_beneficiario_grupo_familiar").text(cedula);

    contador_caracteres("txt_calle_beneficiario_grupo_familiar", "span_calle_beneficiario_grupo_familiar", 20);
    contador_caracteres("txt_puerta_beneficiario_grupo_familiar", "span_puerta_beneficiario_grupo_familiar", 4);
    contador_caracteres("txt_solar_beneficiario_grupo_familiar", "span_solar_beneficiario_grupo_familiar", 4);
    contador_caracteres("txt_manzana_beneficiario_grupo_familiar", "span_manzana_beneficiario_grupo_familiar", 4);
    contador_caracteres("txt_esquina_beneficiario_grupo_familiar", "span_esquina_beneficiario_grupo_familiar", 20);
    contador_caracteres("txt_apartamento_beneficiario_grupo_familiar", "span_apartamento_beneficiario_grupo_familiar", 4);

    $("#rbtn_beneficiario_grupo_familiar_1").prop("checked", true);
    $(".div_rbtn_1_beneficiario_grupo_familiar").css("display", "block");
    $(".div_rbtn_2_beneficiario_grupo_familiar").css("display", "none");

    $("input[name=rbtn_beneficiario_grupo_familiar]").click(function () {
      if ($("input:radio[name=rbtn_beneficiario_grupo_familiar]:checked").val() == "Puerta") {
        $("#txt_solar_beneficiario_grupo_familiar").val("");
        $("#txt_manzana_beneficiario_grupo_familiar").val("");
        $(".div_rbtn_1_beneficiario_grupo_familiar").css("display", "block");
        $(".div_rbtn_2_beneficiario_grupo_familiar").css("display", "none");
      } else {
        $("#txt_puerta_beneficiario_grupo_familiar").val("");
        $(".div_rbtn_1_beneficiario_grupo_familiar").css("display", "none");
        $(".div_rbtn_2_beneficiario_grupo_familiar").css("display", "block");
      }
    });

    $("#modal_cargar_beneficiarios_grupo_familiar").modal("show");
  } else {
    let cedula = $("#txt_cedula_beneficiario_grupo_familiar").val();
    let nombre_completo = $("#txt_nombre_beneficiario_grupo_familiar").val();
    let fecha_nacimiento = $("#txt_fecha_nacimiento_beneficiario_grupo_familiar").val();
    let calle = $("#txt_calle_beneficiario_grupo_familiar").val();
    let radio_buttons = $("input:radio[name=rbtn_beneficiario_grupo_familiar]:checked").val();
    let puerta = $("#txt_puerta_beneficiario_grupo_familiar").val();
    let solar = $("#txt_solar_beneficiario_grupo_familiar").val();
    let manzana = $("#txt_manzana_beneficiario_grupo_familiar").val();
    let esquina = $("#txt_esquina_beneficiario_grupo_familiar").val();
    let apartamento = $("#txt_apartamento_beneficiario_grupo_familiar").val();
    let referencia = $("#txt_referencia_beneficiario_grupo_familiar").val();
    let id_localidad = $("#select_localidades_beneficiario_grupo_familiar").val();
    let nombre_localidad = $("#select_localidades_beneficiario_grupo_familiar option:selected").text();
    let correo_electronico = $("#txt_correo_electronico_beneficiario_grupo_familiar").val();
    let celular = $("#txt_celular_beneficiario_grupo_familiar").val();
    let telefono_fijo = $("#txt_telefono_fijo_beneficiario_grupo_familiar").val();
    let telefono_alternativo = $("#txt_telefono_alternativo_beneficiario_grupo_familiar").val();
    let dato_extra = $("#select_dato_extra_grupo_familiar").val();
    let nombre_dato_extra = $("#select_dato_extra_grupo_familiar option:selected").text();
    //let promocion = $("#select_promocion_beneficiario").val();

    if (cedula == "") {
      error("Debe ingresar la cédula");
    } else if (nombre_completo == "") {
      error("Debe ingresar el nombre completo");
    } else if (fecha_nacimiento == "") {
      error("Debe ingresar la fecha de nacimiento");
    } else if (fecha_nacimiento >= fecha_actual("fecha")) {
      error("La fecha de nacimiento no puede ser mayor a la fecha actual");
    } else if (calle == "") {
      error("Debe ingresar la calle");
    } else if (radio_buttons == undefined) {
      error("Debe seleccinar una opción (Puerta o Solar/manzana)");
    } else if (radio_buttons == "Puerta" && puerta == "") {
      error("Debe ingresar el número de puerta");
    } else if (radio_buttons == "Solar/manzana" && solar == "") {
      error("Debe ingresar el solar");
    } else if (radio_buttons == "Solar/manzana" && manzana == "") {
      error("Debe ingresar la manzana");
    } else if (esquina == "") {
      error("Debe ingresar la esquina");
    } else if (referencia == "") {
      error("Debe ingresar la referencia");
    } else if (id_localidad == "") {
      error("Debe seleccionar una localidad");
    } else if (correo_electronico != "" && !validarEmail(correo_electronico)) {
      error("Debe ingresar un correo válido");
    } else if (celular == "") {
      error("Debe ingresar un celular");
    } else if (!comprobarCelular(celular)) {
      error("Debe ingresar un celular válido");
    } else if (telefono_fijo != "" && !comprobarTelefono(telefono_fijo, 52)) {
      error("Debe ingresar un telefono fijo válido");
    } else if (telefono_alternativo != "" && !comprobarTelefono(telefono_alternativo, 52)) {
      error("Debe ingresar un telefono alternativo válido");
    } else if (dato_extra == "") {
      error("Debe seleccionar un dato adicional");
    } else {

      datos_beneficiario = {
        cedula: cedula,
        nombre_completo: nombre_completo,
        fecha_nacimiento: fecha_nacimiento,
        calle: calle,
        puerta: puerta,
        solar: solar,
        manzana: manzana,
        esquina: esquina,
        apartamento: apartamento,
        referencia: referencia,
        direccion: formar_direccion(radio_buttons, apartamento, calle, puerta, esquina, manzana, solar),
        id_localidad: id_localidad,
        nombre_localidad: nombre_localidad,
        correo_electronico: correo_electronico,
        celular: celular,
        telefono_fijo: telefono_fijo,
        telefono_alternativo: telefono_alternativo,
        dato_extra: dato_extra,
        nombre_dato_extra: nombre_dato_extra,
      };
      array_datos_beneficiario_grupo_familiar.push(datos_beneficiario);
      listar_personas_grupos_familiares();
      correcto("Se ingresaron los datos con éxito!");

      $("#modal_cargar_beneficiarios_grupo_familiar").modal("hide");
    }
  }
}


function listar_personas_grupos_familiares() {
  html = "<ol class='list-group list-group-numbered'>";

  array_personas_grupo_familiar.map((val => {
    let cedula = val['cedula'];
    let cedula_registrada = 0;

    array_datos_beneficiario_grupo_familiar.map((val => {
      if (cedula == val['cedula']) cedula_registrada++;
    }));

    let btn_badge = cedula_registrada != 0 ?
      `<span class="badge text-bg-success rounded-pill me-2">✔</span>` :
      `<button class="badge text-bg-primary rounded-pill" onclick="agregar_datos_beneficiario(true, ${cedula})">Agregar Datos</button>`;
    let btn_ver_datos = cedula_registrada != 0 ?
      `<button class="btn btn-sm btn-outline-info" onclick="ver_datos_beneficiario_grupo_familiar(${cedula})">📝</button>` :
      "";

    html += `
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold">${cedula} ${btn_ver_datos}</div>
      </div>
      ${btn_badge}
    </li>`;
  }));

  html += "</ol>";
  $("#div_lista_personas_grupos_familiares").html(html);
}


function ver_datos_beneficiario_grupo_familiar(cedula) {
  $("#span_titulo_modal_ver_mas").text("Datos del beneficiario:");
  let html = `<ul class="list-group">`;

  array_datos_beneficiario_grupo_familiar.map((val) => {
    if (val['cedula'] == cedula) {
      html += `
          <li class="list-group-item"><strong>Cédula:</strong> ${val['cedula']}</li>
          <li class="list-group-item"><strong>Nombre Completo:</strong> ${val['nombre_completo']}</li>
          <li class="list-group-item"><strong>Fecha de nacimiento:</strong> ${cambiar_formato_fecha(val['fecha_nacimiento'])}</li>
          <li class="list-group-item"><strong>Calle:</strong> ${val['calle']}</li>
          <li class="list-group-item"><strong>Puerta:</strong> ${val['puerta']}</li>
          <li class="list-group-item"><strong>Solar:</strong> ${val['solar']}</li>
          <li class="list-group-item"><strong>Manzana:</strong> ${val['manzana']}</li>
          <li class="list-group-item"><strong>Esquina:</strong> ${val['esquina']}</li>
          <li class="list-group-item"><strong>Apartamento:</strong> ${val['apartamento']}</li>
          <li class="list-group-item"><strong>Referencia:</strong> ${val['referencia']}</li>
          <li class="list-group-item"><strong>Localidad:</strong> ${val['nombre_localidad']}</li>
          <li class="list-group-item"><strong>Correo Electrónico:</strong> ${val['correo_electronico']}</li>
          <li class="list-group-item"><strong>Celular:</strong> ${val['celular']}</li>
          <li class="list-group-item"><strong>Teléfono fijo:</strong> ${val['telefono_fijo']}</li>
          <li class="list-group-item"><strong>Teléfono alternativo:</strong> ${val['telefono_alternativo']}</li>
          <li class="list-group-item"><strong>Promo:</strong> ${val['nombre_dato_extra']}</li>`;
    }
  });

  html += `</ul>`;
  $("#div_mostrar_listado_beneficiarios").html(html);
  $("#modal_mostrar_listado_beneficiarios_grupo_familiar").modal("show");
}


function vaciar_datos_beneficiario_grupo_familiar() {
  //Limpio los campos
  $("#txt_cedula_grupo_familiar").val("");
  $("#txt_nombre_beneficiario_grupo_familiar").val("");
  $("#txt_fecha_nacimiento_beneficiario_grupo_familiar").val("");
  $("#txt_calle_beneficiario_grupo_familiar").val("");
  $("input:radio[name=rbtn_beneficiario_grupo_familiar]").prop("checked", false);
  $("#txt_puerta_beneficiario_grupo_familiar").val("");
  $("#txt_solar_beneficiario_grupo_familiar").val("");
  $("#txt_manzana_beneficiario_grupo_familiar").val("");
  $("#txt_esquina_beneficiario_grupo_familiar").val("");
  $("#txt_apartamento_beneficiario_grupo_familiar").val("");
  $("#txt_referencia_beneficiario_grupo_familiar").val("");
  $("#select_localidades_beneficiario_grupo_familiar").val("");
  $("#txt_correo_electronico_beneficiario_grupo_familiar").val("");
  $("#txt_celular_beneficiario_grupo_familiar").val("");
  $("#txt_telefono_fijo_beneficiario_grupo_familiar").val("");
  $("#txt_telefono_alternativo_beneficiario_grupo_familiar").val("");
  $("#select_promocion_beneficiario_grupo_familiar").val("");
  $("#select_dato_extra_grupo_familiar").val(3);
  //Oculto los divs
  $(".div_rbtn_1_beneficiario_grupo_familiar").css("display", "none");
  $(".div_rbtn_2_beneficiario_grupo_familiar").css("display", "none");
}