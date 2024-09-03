<?php
include_once '../../../configuraciones.php';

$nro_servicio = $_REQUEST['servicio'];
if ($nro_servicio == "") devolver_error(ERROR_GENERAL);


$obtener_datos = obtener_horas($nro_servicio);
if ($obtener_datos == false) devolver_error("Ocurrieron errores al obtener las horas del servicio");


while ($row = mysqli_fetch_assoc($obtener_datos)) {
    $array_datos[] = $row;
}



$response['error'] = false;
$response['datos'] = $array_datos;
echo json_encode($response);




function obtener_horas($nro_servicio)
{
    $conexion = connection(DB);
    $tabla = TABLA_LISTA_DE_PRECIOS;

    try {
        $sql = "SELECT horas FROM {$tabla} WHERE id_servicio = '$nro_servicio' AND activo = 1 GROUP BY horas ORDER BY horas ASC";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "select_horas_servicios.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}
