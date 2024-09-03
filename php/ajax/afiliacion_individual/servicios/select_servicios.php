<?php
include_once '../../../configuraciones.php';


$obtener_datos = obtener_servicios();
if ($obtener_datos == false) devolver_error("Ocurrieron errores al obtener los servicios");

while ($row = mysqli_fetch_assoc($obtener_datos)) {
    $array_datos[] = $row;
}


$response['error'] = false;
$response['datos'] = $array_datos;
echo json_encode($response);




function obtener_servicios()
{
    $conexion = connection(DB);
    $tabla = TABLA_SERVICIOS;

    try {
        $sql = "SELECT id, nombre_servicio AS 'nombre' FROM {$tabla} WHERE activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "select_servicios.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}
