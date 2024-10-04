<?php
include_once '../../../configuraciones.php';


$valor_actual = $_REQUEST['valor_actual'];


if ($valor_actual != false) {

    $obtener_datos = obtener_localidad_actual($valor_actual);
    if ($obtener_datos == false) devolver_error("Ocurrieron errores al obtener la localidad actual");

    while ($row = mysqli_fetch_assoc($obtener_datos)) {
        $array_datos[] = $row;
    }

    $obtener_demas_localidades = obtener_demas_localidades($valor_actual);
    if ($obtener_demas_localidades == false) devolver_error("Ocurrieron errores al obtener las demás localidades");

    while ($row = mysqli_fetch_assoc($obtener_demas_localidades)) {
        $array_datos[] = $row;
    }
} else {
    $obtener_datos = obtener_localidades();
    if ($obtener_datos == false) devolver_error("Ocurrieron errores al obtener las localidades");

    while ($row = mysqli_fetch_assoc($obtener_datos)) {
        $array_datos[] = $row;
    }
}


$response['error'] = false;
$response['datos'] = $array_datos;
echo json_encode($response);




function obtener_localidades()
{
    $conexion = connection(DB);
    $tabla = TABLA_LOCALIDADES;

    try {
        $sql = "SELECT id, nombre FROM {$tabla} WHERE activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "select_localidades.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}


function obtener_localidad_actual($id)
{
    $conexion = connection(DB);
    $tabla = TABLA_LOCALIDADES;

    try {
        $sql = "SELECT id, nombre FROM {$tabla} WHERE id = '$id' AND activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "select_localidades.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}


function obtener_demas_localidades($id)
{
    $conexion = connection(DB);
    $tabla = TABLA_LOCALIDADES;

    try {
        $sql = "SELECT id, nombre FROM {$tabla} WHERE id NOT IN ('$id') AND activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "select_localidades.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}
