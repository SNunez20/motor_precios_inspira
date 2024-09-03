<h6 class="mt-3 mb-4">Validar cédula de los integrantes del grupo</h6>


<div class="row mb-5">
    <div class="col-lg-4">
        <div class="form-floating">
            <input type="text" class="form-control" id="txt_cedula_persona_gropo_familiar" placeholder="Ingrese una cédula" maxlength="8">
            <label for="txt_cedula_persona_gropo_familiar">Ingrese una cédula: <span class="fw-bolder text-danger">*</span></label>
        </div>
    </div>
    <div class="col-lg-4">
        <button class="btn btn-success" onclick="agregar_persona_grupo_familiar()">Agregar persona</button>
    </div>
</div>


<div class="mb-3">
    <ol class="list-group list-group-numbered" id="div_lista_personas_grupo_familiar">
    </ol>
</div>