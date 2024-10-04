<?php
include_once '../../../configuraciones.php';

$opcion = $_REQUEST['opcion'];
if($opcion == "") devolver_error(ERROR_GENERAL);


$obtener_datos = obtener_servicios($opcion);
if ($obtener_datos == false) devolver_error("Ocurrieron errores al obtener los servicios");

while ($row = mysqli_fetch_assoc($obtener_datos)) {
    $array_datos[] = $row;
}


$response['error'] = false;
$response['datos'] = $array_datos;
echo json_encode($response);




function obtener_servicios($opcion)
{
    $conexion = connection(DB);
    $tabla = TABLA_SERVICIOS;

    //$where = $opcion == 2 ? "id NOT IN (13, 15) AND" : "";
    $where = $opcion == 2 ? "id IN (1, 2) AND" : "";

    try {
        $sql = "SELECT id, nombre_servicio AS 'nombre' FROM {$tabla} WHERE $where mostrar = 1 AND activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "select_servicios.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}
