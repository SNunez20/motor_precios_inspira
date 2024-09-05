<?php
include_once '../../configuraciones.php';

$array_servicios = $_REQUEST['array_servicios_agregados_grupo_familiar'];
if (count($array_servicios) <= 0) devolver_error(ERROR_GENERAL);


$precio_total = 0;
foreach ($_REQUEST['array_servicios_agregados_grupo_familiar'] as $servicio) {
    foreach ($_REQUEST['array_datos_beneficiario_grupo_familiar'] as $datos_beneficiario) {
        if ($servicio['cedula'] == $datos_beneficiario['cedula']) {
            $fecha_nacimiento = $datos_beneficiario["fecha_nacimiento"];
            $edad = date("Y") - date("Y", strtotime($fecha_nacimiento));
        }
    }

    $id_servicio = $servicio['numero_servicio'];
    $cantidad_horas = $servicio['cantidad_horas'] != "" ? $servicio['cantidad_horas'] : 8;
    $promo_estaciones = $servicio['promo_estaciones'];
    $total_importe = $servicio['total_importe'];
    $precio_total = $precio_total + calcular_precio_servicio($edad, $id_servicio, $cantidad_horas, $promo_estaciones, $total_importe);
}



$response['error'] = false;
$response['importe_total'] = $precio_total;
echo json_encode($response);
