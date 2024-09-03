<div class="modal fade" id="modal_tipo_afiliacion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Elegir tipo de afiliación</h1>
            </div>
            <div class="modal-body">

                <div class="form-floating mb-4">
                    <select class="form-select" id="select_tipo_afiliacion" aria-label="Select tipo de afiliación">
                        <option value="" selected>Seleccione una opción</option>
                        <option value="1">Afiliación individual</option>
                        <option value="2">Afiliación de grupo</option>
                    </select>
                    <label for="select_tipo_afiliacion">Seleccione un tipo de afiliación</label>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="validar_afiliacion()">Siguiente</button>
            </div>
        </div>
    </div>
</div>