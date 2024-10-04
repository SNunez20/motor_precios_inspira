let array_guardar_datos_servicios = [];
let array_servicios_agregados_grupo_familiar = [];
function acciones_formulario_grupo_familiar_formulario_3() {
    select_convenios_servicios(1, "select_convenio_servicios_grupo_familiar");
    select_servicios(2, "select_servicios_servicios_grupo_familiar");
    listar_personas_servicios_grupos_familiares();

    $("#btn_atras_datos_venta_grupo_familiar").html(`<button type="button" class="btn btn-primary" onclick="
        mostrar_div_datos_venta_grupo_familiar(2), 
        acciones_formulario_grupo_familiar_formulario_2()
    ">⬅ Atrás</button>`);
    $("#btn_siguente_datos_venta_grupo_familiar").html(`<button type="button" class="btn btn-primary" onclick="validar_formulario_grupo_familiar_3()">Siguiente ➡</button>`);
}


function validar_formulario_grupo_familiar_3() {
    let cedula_servicio_falta = 0;
    array_personas_grupo_familiar.map((val => {
        let cedula_persona = val['cedula'];
        let resultado;
        resultado = array_servicios_agregados_grupo_familiar.filter(
            (cedula) => cedula["cedula"] == cedula_persona
        );
        resultado = resultado.length <= 0 ? cedula_servicio_falta++ : resultado;
    }));

    if (array_servicios_agregados_grupo_familiar.length <= 0 || cedula_servicio_falta > 0) {
        error(`Debe ingresar los servicios para los ${array_personas_grupo_familiar.length} beneficiarios`);
    } else {
        mostrar_div_datos_venta_grupo_familiar(4);
        acciones_formulario_grupo_familiar_formulario_4();
    }
}


function listar_personas_servicios_grupos_familiares() {
    html = "<ol class='list-group list-group-numbered'>";

    array_personas_grupo_familiar.map((val => {
        let cedula = val['cedula'];
        let cedula_registrada = 0;

        array_servicios_agregados_grupo_familiar.map((val => {
            if (cedula == val['cedula']) cedula_registrada++;
        }));

        let btn_badge = `<button class="badge text-bg-primary rounded-pill" onclick="agregar_servicios_beneficiario_grupo_familiar(true, ${cedula})">Agregar servicios</button>`;

        html += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${cedula}</div>
            </div>
            ${btn_badge}
        </li>`;
    }));

    html += "</ol>";
    $("#div_lista_personas_servicios_grupos_familiares").html(html);
}