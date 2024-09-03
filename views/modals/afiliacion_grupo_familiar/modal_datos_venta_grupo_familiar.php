<!-- Modal -->
<div class="modal fade" id="modal_datos_venta_grupo_familiar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Datos de la venta</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div id="contenedor_formulario_alta_grupo_familiar_1">
                    <?php include __DIR__ . '/../../content/afiliacion_grupo_familiar/formulario_1.php'; ?>
                </div>

                <div id="contenedor_formulario_alta_grupo_familiar_2">
                    <?php include __DIR__ . '/../../content/afiliacion_grupo_familiar/formulario_2.php'; ?>
                </div>

            </div>
            <div class="modal-footer">
                <div id="btn_atras_datos_venta_grupo_familiar"></div>
                <div id="btn_siguente_datos_venta_grupo_familiar"></div>
            </div>
        </div>
    </div>
</div>