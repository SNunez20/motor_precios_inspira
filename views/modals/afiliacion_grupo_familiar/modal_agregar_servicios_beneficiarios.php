<!-- Modal -->
<div class="modal fade" id="modal_agregar_servicios_beneficiario_grupo_familiar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header bg-success">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Agregar servicios a <span class="fw-bolder" id="span_cedula_nombre_beneficiario_servicio_grupo_familiar"></span></h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">


                <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
                    <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                    </symbol>
                </svg>
                <div class="alert alert-warning d-flex align-items-center mt-2 mb-4" role="alert">
                    <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Warning:">
                        <use xlink:href="#exclamation-triangle-fill"></use>
                    </svg>
                    <div>
                        IMPORTANTE: Los campos con <span class="text-danger fw-bolder">*</span> son obligatorios
                    </div>
                </div>


                <input type="hidden" id="txt_cedula_agregar_servicios_beneficiarios">


                <div class="row justify-content-center mb-4">
                    <div class="col-lg-4 col-md-6">
                        <div class="form-floating">
                            <select class="form-select mx-auto" id="select_convenio_servicios_grupo_familiar" aria-label="Seleccione un convenio">
                            </select>
                            <label for="select_convenio_servicios_grupo_familiar">Seleccione un convenio (opcional):</label>
                        </div>
                    </div>
                </div>


                <h4 class="mb-4">Seleccione los servicios</h4>


                <div class="row">
                    <div class="col-auto">
                        <div class="form-floating mb-3">
                            <select class="form-select" id="select_servicios_servicios_grupo_familiar" aria-label="Seleccione un servicio">
                            </select>
                            <label for="select_servicios_servicios_grupo_familiar">Seleccione un servicio: <span class="text-danger fw-bolder">*</span></label>
                        </div>
                    </div>


                    <div class="col-auto div_cantidad_horas_servicios_grupo_familiar">
                        <div class="form-floating mb-3">
                            <select class="form-select" id="select_cantidad_horas_servicios_grupo_familiar" aria-label="Seleccione un servicio">
                            </select>
                            <label for="select_cantidad_horas_servicios_grupo_familiar">Seleccione cantidad de horas: <span class="text-danger fw-bolder">*</span></label>
                        </div>
                    </div>


                    <div class="col-auto div_lista_de_precios_grupo_familiar">
                        <div class="form-check mt-3">
                            <input class="form-check-input" type="checkbox" value="" id="chbox_lista_de_precios_grupo_familiar">
                            <label class="form-check-label" for="chbox_lista_de_precios_grupo_familiar">
                                Sanatorio Estaciones
                            </label>
                        </div>
                    </div>

                    <div class="col-auto div_socio_adeom_grupo_familiar">
                        <div class="form-check mt-3">
                            <input class="form-check-input" type="checkbox" value="" id="chbox_socio_adeom_grupo_familiar">
                            <label class="form-check-label" for="chbox_socio_adeom_grupo_familiar">
                                Socio por Adeom
                            </label>
                        </div>
                    </div>


                    <div class="col-auto div_promocion_servicios_grupo_familiar">
                        <div class="form-floating mb-3">
                            <select class="form-select" id="select_promocion_servicios_grupo_familiar" aria-label="Seleccione un servicio">
                            </select>
                            <label for="select_promocion_servicios_grupo_familiar">Seleccione una promo:</label>
                            <div class="form-text" id="basic-addon4">Esta promoción sólo es válida para pago con tarjeta.</div>
                        </div>
                    </div>


                    <div class="col-auto div_ingresar_importe_total_grupo_familiar">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="txt_importe_total_servicios_grupo_familiar" placeholder="Ingresar importe">
                            <label for="txt_importe_total_servicios_grupo_familiar">Ingresar importe:</label>
                            <div class="form-text" id="basic-addon4">El importe es el equivalente al 50% que abona en la competencia.</div>
                        </div>
                    </div>
                </div>


                <button class="btn btn-primary me-3 mb-3" onclick="agregar_servicios_beneficiario_grupo_familiar(false)">Agregar servicio</button>


                <div class="mb-5">
                    <ol class="list-group list-group-numbered" id="div_servicios_agregados_listado_grupo_familiar">
                    </ol>
                </div>


                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-4">
                        <div class="form-floating mb-3">
                            <textarea class="form-control" placeholder="Escriba una observación" id="txt_observacion_servicios_grupo_familiar" style="height: 100px"></textarea>
                            <label for="txt_observacion_servicios_grupo_familiar">Observación: <span class="text-danger fw-bolder">*</span></label>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-4">
                        <div class="alert alert-success border-success d-flex align-items-center justify-content-center" role="alert" style="height: 100px">
                            <p class="fw-bolder">Total ($UY):
                                <span class="text-danger" id="span_total_precio_servicios_grupo_familiar">0</span>
                            </p>
                        </div>
                    </div>
                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-success" onclick="guardar_datos_servicios()">Guardar</button>
            </div>
        </div>
    </div>
</div>