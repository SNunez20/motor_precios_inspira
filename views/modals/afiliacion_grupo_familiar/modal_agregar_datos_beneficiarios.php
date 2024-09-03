<!-- Modal -->
<div class="modal fade" id="modal_cargar_beneficiarios_grupo_familiar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Cargar Beneficiario - <span class="fw-bolder" id="span_cedula_beneficiario_grupo_familiar"></span></h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">


                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-2">
                        <div class="form-floating mb-4">
                            <input type="text" class="form-control" id="txt_cedula_beneficiario_grupo_familiar" placeholder="Cédula" disabled>
                            <label for="txt_cedula_beneficiario_grupo_familiar">Cédula:</label>
                        </div>
                    </div>


                    <div class="col-lg-4 col-md-4 col-sm-2">
                        <div class="form-floating mb-4">
                            <input type="text" class="form-control" id="txt_nombre_beneficiario_grupo_familiar" placeholder="Nombre completo">
                            <label for="txt_nombre_beneficiario_grupo_familiar">Nombre completo: <span class="text-danger fw-bolder">*</span></label>
                        </div>
                    </div>


                    <div class="col-lg-4 col-md-4 col-sm-2">
                        <div class="form-floating mb-4">
                            <input type="date" class="form-control" id="txt_fecha_nacimiento_beneficiario_grupo_familiar" placeholder="Fecha de nacimiento">
                            <label for="txt_fecha_nacimiento_beneficiario_grupo_familiar">Fecha de nacimiento: <span class="text-danger fw-bolder">*</span></label>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-auto mb-4">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="txt_calle_beneficiario_grupo_familiar" placeholder="Calle" maxlength="20">
                            <label for="txt_calle_beneficiario_grupo_familiar">Calle: <span class="text-danger fw-bolder">*</span></label>
                        </div>
                        <div class="form-text" id="basic-addon4">Caracteres disponibles: <span class="text-danger fw-bolder" id="span_calle_beneficiario_grupo_familiar">20</span></div>
                    </div>


                    <div class="col-auto mb-4">
                        <div>Elige una opción: <span class="text-danger fw-bolder">*</span></div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="rbtn_beneficiario_grupo_familiar" id="rbtn_beneficiario_grupo_familiar" value="Puerta">
                            <label class="form-check-label" for="rbtn_beneficiario_grupo_familiar">
                                Puerta
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="rbtn_beneficiario_grupo_familiar" id="rbtn_beneficiario_grupo_familiar" value="Solar/manzana">
                            <label class="form-check-label" for="rbtn_beneficiario_grupo_familiar">
                                Solar/manzana
                            </label>
                        </div>
                    </div>


                    <div class="col-auto mb-4 div_rbtn_1_beneficiario_grupo_familiar">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="txt_puerta_beneficiario_grupo_familiar" placeholder="Puerta" maxlength="4">
                            <label for="txt_puerta_beneficiario_grupo_familiar">Puerta: <span class="text-danger fw-bolder">*</span></label>
                        </div>
                        <div class="form-text" id="basic-addon4">Caracteres disponibles: <span class="text-danger fw-bolder" id="span_puerta_beneficiario_grupo_familiar">4</span></div>
                    </div>


                    <div class="col-auto mb-4 div_rbtn_2_beneficiario_grupo_familiar">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="txt_solar_beneficiario_grupo_familiar" placeholder="Solar" maxlength="4">
                            <label for="txt_solar_beneficiario_grupo_familiar">Solar: <span class="text-danger fw-bolder">*</span></label>
                        </div>
                        <div class="form-text" id="basic-addon4">Caracteres disponibles: <span class="text-danger fw-bolder" id="span_solar_beneficiario_grupo_familiar">4</span></div>
                    </div>

                    <div class="col-auto mb-4 div_rbtn_2_beneficiario_grupo_familiar">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="txt_manzana_beneficiario_grupo_familiar" placeholder="Manzana" maxlength="4">
                            <label for="txt_manzana_beneficiario_grupo_familiar">Manzana: <span class="text-danger fw-bolder">*</span></label>
                        </div>
                        <div class="form-text" id="basic-addon4">Caracteres disponibles: <span class="text-danger fw-bolder" id="span_manzana_beneficiario_grupo_familiar">4</span></div>
                    </div>


                    <div class="col-auto mb-4">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="txt_esquina_beneficiario_grupo_familiar" placeholder="Esquina" maxlength="20">
                            <label for="txt_esquina_beneficiario_grupo_familiar">Esquina: <span class="text-danger fw-bolder">*</span></label>
                        </div>
                        <div class="form-text" id="basic-addon4">Caracteres disponibles: <span class="text-danger fw-bolder" id="span_esquina_beneficiario_grupo_familiar">20</span></div>
                    </div>


                    <div class="col-auto mb-4">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="txt_apartamento_beneficiario_grupo_familiar" placeholder="Apartamento" maxlength="4">
                            <label for="txt_apartamento_beneficiario_grupo_familiar">Apartamento:</label>
                        </div>
                        <div class="form-text" id="basic-addon4">Caracteres disponibles: <span class="text-danger fw-bolder" id="span_apartamento_beneficiario_grupo_familiar">4</span></div>
                    </div>


                    <div class="col-auto">
                        <div class="form-floating mb-4">
                            <input type="text" class="form-control" id="txt_referencia_beneficiario_grupo_familiar" placeholder="Referencia">
                            <label for="txt_referencia_beneficiario_grupo_familiar">Referencia: <span class="text-danger fw-bolder">*</span></label>
                        </div>
                    </div>


                    <div class="col-auto">
                        <div class="form-floating mb-4">
                            <select class="form-select" id="select_localidades_beneficiario_grupo_familiar" aria-label="Seleccione una localidad">
                            </select>
                            <label for="select_localidades_beneficiario_grupo_familiar">Seleccione una localidad: <span class="text-danger fw-bolder">*</span></label>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-auto">
                        <div class="form-floating mb-4">
                            <input type="email" class="form-control" id="txt_correo_electronico_beneficiario_grupo_familiar" placeholder="Correo electrónico">
                            <label for="txt_correo_electronico_beneficiario_grupo_familiar">Correo electrónico:</label>
                        </div>
                    </div>


                    <div class="col-auto">
                        <div class="form-floating mb-4">
                            <input type="text" class="form-control" id="txt_celular_beneficiario_grupo_familiar" placeholder="Celular" maxlength="9">
                            <label for="txt_celular_beneficiario_grupo_familiar">Celular: <span class="text-danger fw-bolder">*</span></label>
                        </div>
                    </div>


                    <div class="col-auto">
                        <div class="form-floating mb-4">
                            <input type="text" class="form-control" id="txt_telefono_fijo_beneficiario_grupo_familiar" placeholder="Teléfono fijo" maxlength="8">
                            <label for="txt_telefono_fijo_beneficiario_grupo_familiar">Teléfono fijo:</label>
                        </div>
                    </div>


                    <div class="col-auto">
                        <div class="form-floating mb-4">
                            <input type="text" class="form-control" id="txt_telefono_alternativo_beneficiario_grupo_familiar" placeholder="Teléfono alternativo" maxlength="8">
                            <label for="txt_telefono_alternativo_beneficiario_grupo_familiar">Teléfono alternativo:</label>
                        </div>
                    </div>
                </div>


                <div class="form-floating mb-4">
                    <select class="form-select" id="select_dato_extra_grupo_familiar" aria-label="Seleccione una opción en caso de aplicar a alguna">
                        <option value="3" selected>No aplica</option>
                        <option value="2">Herencia</option>
                    </select>
                    <label for="select_dato_extra_grupo_familiar">Elige una opción en caso de aplicar a alguna:</label>
                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick="guardar_datos_beneficiario()">Guardar</button>
            </div>
        </div>
    </div>
</div>