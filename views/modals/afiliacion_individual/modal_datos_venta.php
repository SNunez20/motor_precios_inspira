<div class="modal fade mt-5 mb-5" id="modal_datos_venta" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel">
    <div class="modal-dialog modal-xl">
        <div class="modal-content modal_margin">
            <div class="modal-header bg-primary">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Datos de la venta</h1>
            </div>
            <div class="modal-body">


                <div id="contenedor_formulario_alta_1">
                    <?php include __DIR__ . '/../../content/afiliacion_individual/formulario_1.php'; ?>
                </div>

                <div id="contenedor_formulario_alta_2">
                    <?php include __DIR__ . '/../../content/afiliacion_individual/formulario_2.php'; ?>
                </div>

                <div id="contenedor_formulario_alta_3">
                    <?php include __DIR__ . '/../../content/afiliacion_individual/formulario_3.php'; ?>
                </div>


            </div>
            <div class="modal-footer">
                <div id="btn_atras_datos_venta"></div>
                <div id="btn_siguente_datos_venta"></div>
            </div>
        </div>
    </div>
</div>