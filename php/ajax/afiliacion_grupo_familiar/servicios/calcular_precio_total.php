<?php
include_once '../../../configuraciones.php';


$cedula = $_REQUEST['cedula'];
$fecha_nacimiento = $_REQUEST['fecha_nacimiento'];
$datos = $_REQUEST['array_servicios_agregados_grupo_familiar'];
if ($cedula == "" || $fecha_nacimiento == "" || !is_array($datos) || count($datos) <= 0) devolver_error(ERROR_GENERAL);


$fecha_actual = date("Y-m-d");
$edad = $fecha_actual - $fecha_nacimiento;


$precio_total = 0;
foreach ($datos as $data) {
    $data_cedula = $data['cedula'];

    if ($cedula == $data_cedula) {
        $numero_servicio = $data['numero_servicio'];
        $cantidad_horas = $data['cantidad_horas'] == "" ? 8 : $data['cantidad_horas'];
        $promo_estaciones = $data['promo_estaciones'];
        $total_importe = $data['total_importe'];

        $precio = calcular_precio_servicio($edad, $numero_servicio, $cantidad_horas, $promo_estaciones, $total_importe);
        $precio_total = $precio_total + $precio;
    }
}



$response['error'] = false;
$response['precio'] = $precio_total;
echo json_encode($response);
