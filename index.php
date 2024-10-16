<?php
$version = '?v=1.0.25';
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Motor de precios Inspira</title>


    <!-- Bootstrap 4.1.3 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link href="https://getbootstrap.com/docs/5.3/assets/css/docs.css" rel="stylesheet">
    <!-- Font Awesome 4.5.0 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
    <!-- Ionicons 2.0.1 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Datatables 1.10.16 -->
    <link href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css" rel="stylesheet" />
    <link href="https://cdn.datatables.net/buttons/2.3.6/css/buttons.dataTables.min.css" rel="stylesheet" />

    <link rel="stylesheet" href="./assets/css/index.css">

</head>

<body>

    <?php
    session_start();

    if (!$_SESSION) {
        header("Location: login.php");
    } else {
    ?>


        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark" style="z-index: 2000; margin-bottom: 200px;">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">📞 <?= $_SESSION['mpi_nombre_vendedor'] ?></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    </ul>
                    <div class="d-flex" role="search">
                        <a class="btn btn-outline-success" type="button" href="cerrar_sesion.php">🔒 Cerrar Sesión</a>
                    </div>
                </div>
            </div>
        </nav>


        <?php
        include './views/modals/modal_tipo_afiliacion.php';
        include './views/modals/modal_validar_cedula.php';

        /* Afiliación individual */
        include './views/modals/afiliacion_individual/modal_datos_venta.php';
        include './views/modals/afiliacion_individual/modal_agregar_beneficiarios.php';
        include './views/modals/afiliacion_individual/modal_datos_tarjeta.php';

        /* Afiliación Grupo Familiar */
        include './views/modals/afiliacion_grupo_familiar/modal_datos_venta_grupo_familiar.php';
        include './views/modals/afiliacion_grupo_familiar/modal_agregar_datos_beneficiarios.php';
        include './views/modals/afiliacion_grupo_familiar/modal_editar_datos_beneficiarios.php';
        include './views/modals/afiliacion_grupo_familiar/modal_mostrar_listado_beneficiarios.php';
        include './views/modals/afiliacion_grupo_familiar/modal_agregar_servicios_beneficiarios.php';
        include './views/modals/afiliacion_grupo_familiar/modal_datos_tarjeta.php';

        /* Incremento */
        include './views/modals/incremento/modal_datos_venta.php';
        include './views/modals/incremento/modal_datos_tarjeta.php';
        ?>





        <!-- JQUERY 2.2.3 -->
        <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
        <!-- Bootstrap 4.1.3 -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.2/dist/chart.umd.js" integrity="sha384-eI7PSr3L1XLISH8JdDII5YN/njoSsxfbrkCTnJrzXt+ENP5MOVBxD+l6sEG4zoLp" crossorigin="anonymous"></script>
        <!-- SweetAlert 2@10 -->
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <!-- Datatables 1.10.16 -->
        <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/buttons/2.3.6/js/dataTables.buttons.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
        <script src="https://cdn.datatables.net/buttons/2.3.6/js/buttons.html5.min.js"></script>
        <script src="https://cdn.datatables.net/buttons/2.3.6/js/buttons.print.min.js"></script>

        <script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
        <script>
            Mercadopago.setPublishableKey("APP_USR-6bda2fca-9f81-4147-90e9-e7900560a474");
        </script>


        <!-- Archivos JS -->
        <?php
        $js_cargar = [
            "utils.js",
            "funciones.js",
            "general/index.js",

            /* Afiliación individual */
            "general/afiliacion_individual/formulario_1/formulario_1.js",
            "general/afiliacion_individual/formulario_2/formulario_2.js",
            "general/afiliacion_individual/formulario_2/servicios.js",
            "general/afiliacion_individual/formulario_2/beneficiarios.js",
            "general/afiliacion_individual/formulario_3/tarjeta.js",
            "general/afiliacion_individual/formulario_3/formulario_3.js",

            /* Afiliación Grupo Familiar */
            "general/afiliacion_grupo_familiar/formulario_1/formulario_1.js",
            "general/afiliacion_grupo_familiar/formulario_2/formulario_2.js",
            "general/afiliacion_grupo_familiar/formulario_3/servicios.js",
            "general/afiliacion_grupo_familiar/formulario_3/formulario_3.js",
            "general/afiliacion_grupo_familiar/formulario_4/tarjeta.js",
            "general/afiliacion_grupo_familiar/formulario_4/formulario_4.js",

            /* Incremento */
            "general/incremento/formulario_1/formulario_1.js",
            "general/incremento/formulario_2/formulario_2.js",
            "general/incremento/formulario_2/servicios.js",
            "general/incremento/formulario_3/tarjeta.js",
            "general/incremento/formulario_3/formulario_3.js",
        ];

        foreach ($js_cargar as $archivo) {
            echo '<script src="./assets/js/' . $archivo . $version . '"></script>';
        }
        ?>
        <!-- End Archivos JS -->




    <?php } ?>
</body>

</html>