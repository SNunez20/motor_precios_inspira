<?php
include_once '../../configuraciones.php';

$array_servicios = $_REQUEST['array_servicios_agregados_grupo_familiar'];
$beneficiarios = $_REQUEST['array_datos_beneficiario_grupo_familiar'];
if (count($array_servicios) <= 0) devolver_error(ERROR_GENERAL);


$precio_total = 0;
foreach ($array_servicios as $servicio) {
    foreach ($beneficiarios as $datos_beneficiario) {
        if ($servicio['cedula'] == $datos_beneficiario['cedula']) {
            $fecha_nacimiento = $datos_beneficiario["fecha_nacimiento"];
            $edad = date("Y") - date("Y", strtotime($fecha_nacimiento));
        }
    }

    $id_servicio = $servicio['numero_servicio'];
    $cantidad_horas = $servicio['cantidad_horas'] != "" ? $servicio['cantidad_horas'] : 8;
    $promo_estaciones = $servicio['promo_estaciones'];
    $total_importe = $servicio['total_importe'];
    $precio = calcular_precio_servicio($edad, $id_servicio, $cantidad_horas, $promo_estaciones, $total_importe);

    if ($id_servicio == 1) {
        $porcentaje = 0;
        if (count($beneficiarios) == 2) $porcentaje = 0.10; //10%
        if (count($beneficiarios) == 3) $porcentaje = 0.15; //15%
        if (count($beneficiarios) >= 4) $porcentaje = 0.20; //20%

        $descuento = $precio * $porcentaje;
        $precio = round($precio - $descuento);
    }

    $precio_total = $precio_total + $precio;
}



$response['error'] = false;
$response['importe_total'] = $precio_total;
echo json_encode($response);
