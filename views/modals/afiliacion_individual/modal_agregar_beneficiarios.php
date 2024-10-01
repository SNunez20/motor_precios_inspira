<div class="modal fade" id="modal_agregar_beneficiarios" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Agregar Beneficiarios</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <input type="hidden" id="txt_numero_servicio_beneficiarios_servicio">

                <div class="row mb-4">
                    <div class="col-auto">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control solo_letras" id="txt_nombre_beneficiario_servicio" placeholder="Nombre">
                            <label for="txt_nombre_beneficiario_servicio">Nombre:</label>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control solo_numeros" id="txt_cedula_beneficiario_servicio" placeholder="Cédula" maxlength="8">
                            <label for="txt_cedula_beneficiario_servicio">Cédula:</label>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control solo_numeros" id="txt_telefono_beneficiario_servicio" placeholder="Teléfono" maxlength="9">
                            <label for="txt_telefono_beneficiario_servicio">Teléfono:</label>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="form-floating mb-3">
                            <input type="date" class="form-control" id="txt_fecha_nacimiento_beneficiario_servicio" placeholder="Fecha de nacimiento">
                            <label for="txt_fecha_nacimiento_beneficiario_servicio">Fecha de nacimiento:</label>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="mb-3">
                            <button type="button" class="btn btn-success mt-2" onclick="agregar_beneficiarios(false)">Agregar</button>
                        </div>
                    </div>
                </div>


                <div class="table-responsive mb-3" id="tabla_beneficiarios_agregados" style="display: none">
                    <table class="table table-sm table-bordered table-striped table-hover" width="100%">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Cédula</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Fecha Nacimiento</th>
                                <th scope="col">Edad</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="div_lista_beneficiarios_servicios"></tbody>
                    </table>
                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>