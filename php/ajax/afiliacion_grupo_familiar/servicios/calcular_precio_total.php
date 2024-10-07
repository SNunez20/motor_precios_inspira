<?php
include_once '../../../configuraciones.php';


$cedula = $_REQUEST['cedula'];
$fecha_nacimiento = $_REQUEST['fecha_nacimiento'];
$datos = $_REQUEST['array_servicios_agregados_grupo_familiar'];
$beneficiarios = $_REQUEST['array_datos_beneficiario_grupo_familiar'];
if ($cedula == "" || $fecha_nacimiento == "" || !is_array($datos) || count($datos) <= 0) devolver_error(ERROR_GENERAL);


$edad = calcular_edad($fecha_nacimiento);


$precio_total = 0;
foreach ($datos as $data) {
    if ($cedula == $data['cedula']) {
        $numero_servicio = $data['numero_servicio'];
        $cantidad_horas = $data['cantidad_horas'] == "" ? 8 : $data['cantidad_horas'];
        $promo_estaciones = $data['promo_estaciones'];
        $total_importe = $data['total_importe'];

        $precio = calcular_precio_servicio($edad, $numero_servicio, $cantidad_horas, $promo_estaciones, $total_importe);

        if ($numero_servicio == "01" && $promo_estaciones == "false") {
            $porcentaje = 0;
            if (count($beneficiarios) == 2) $porcentaje = 0.10; //10%
            if (count($beneficiarios) == 3) $porcentaje = 0.15; //15%
            if (count($beneficiarios) >= 4) $porcentaje = 0.20; //20%

            $descuento = $precio * $porcentaje;
            $precio = round($precio - $descuento);
        }

        $precio_total = $precio_total + $precio;
    }
}



$response['error'] = false;
$response['precio'] = $precio_total;
echo json_encode($response);
