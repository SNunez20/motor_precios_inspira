function acciones_incremento_formulario_2() {
    listar_servicios_actuales_incremento();


    $("#btn_atras_datos_venta_incremento").html(`<button type="button" class="btn btn-primary" onclick="mostrar_div_datos_venta_incremento(1), acciones_incremento_formulario_1();">⬅ Atrás</button>`);
    $("#btn_siguente_datos_venta_incremento").html(`<button type="button" class="btn btn-primary" onclick="validar_nuevo_incremento_2()">Siguiente ➡</button>`);
}


function validar_nuevo_incremento_2() {

}


function listar_servicios_actuales_incremento() {
    $("#div_listado_servicios_actuales_incremento").html("");

    let cedula = $("#txt_cedula_beneficiario_incremento").val();
    if (cedula == "") {
        error("Debe ingresar una cédula");
    } else {

        $.ajax({
            type: "GET",
            url: `${url_ajax}incremento/lista_servicios_actuales.php`,
            data: {
                cedula
            },
            dataType: "JSON",
            success: function (response) {
                if (response.error == false) {
                    let lista_servicios = response.lista_servicios;
                    let importe_total = response.importe_total;
                    let html = "";
                    html += `<li class="list-group-item active text-center fw-bolder list-group-item-secondary" aria-current="true">Servicios actuales:</li>`;

                    lista_servicios.map((val => {
                        html += val;
                    }));

                    html += `
                    <li class="list-group-item active text-end fw-bolder list-group-item-secondary" aria-current="true">
                        Total ($UY): <span class="text-danger">${importe_total}</span>
                    </li>`;
                    $("#div_listado_servicios_actuales_incremento").html(html);
                } else {
                    error(response.mensaje);
                }
            }
        });
    }
}