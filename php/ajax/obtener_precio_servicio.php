<?php
include_once '../configuraciones.php';


$fecha_nacimiento = $_REQUEST['fecha_nacimiento'];
$numero_servicio = $_REQUEST['numero_servicio'];
$cantidad_horas = $_REQUEST['cantidad_horas'];
$promo_estaciones = $_REQUEST['promo_estaciones'];
$importe_total = $_REQUEST['importe_total'];
$integrantes_nucleo = $_REQUEST['integrantes_nucleo'];
if (
    $fecha_nacimiento == "" ||
    $numero_servicio == "" ||
    $promo_estaciones == "" ||
    $importe_total == ""
) devolver_error(ERROR_GENERAL);


$edad = calcular_edad($fecha_nacimiento);
$cantidad_horas = $cantidad_horas != "" ? $cantidad_horas : 8;
$precio_total = calcular_precio_servicio($edad, $numero_servicio, $cantidad_horas, $promo_estaciones, $importe_total);

if ($integrantes_nucleo != false && $numero_servicio == 1 && $promo_estaciones == "false") {
    $porcentaje = 0;
    if ($integrantes_nucleo == 2) $porcentaje = 0.10; //10%
    if ($integrantes_nucleo == 3) $porcentaje = 0.15; //15%
    if ($integrantes_nucleo >= 4) $porcentaje = 0.20; //20%

    $descuento = $precio_total * $porcentaje;
    $precio_total = round($precio_total - $descuento);
}


$response['error'] = false;
$response['precio'] = intval($precio_total);
echo json_encode($response);
