<?php
include_once '../../../configuraciones.php';

$opcion = $_REQUEST['opcion'];

if ($opcion == 1) {
    $obtener_datos = obtener_convenios();
    if ($obtener_datos == false) devolver_error("Ocurrieron errores al obtener los convenios");

    while ($row = mysqli_fetch_assoc($obtener_datos)) {
        $array_datos[] = $row;
    }
}

if ($opcion == 2) {
    $array = $_REQUEST['array'];
    $cedula = $array['cedula'];

    $socio_tiene_convenio = comprobar_convenio_socio($cedula);
    $cantidad_resultados_convenio = mysqli_num_rows($socio_tiene_convenio);
    if ($cantidad_resultados_convenio <= 0) {
        $obtener_datos = obtener_convenios();
        if ($obtener_datos == false) devolver_error("Ocurrieron errores al obtener los convenios");

        while ($row = mysqli_fetch_assoc($obtener_datos)) {
            $array_datos[] = $row;
        }

        $response['sin_convenios'] = true;
    } else {
        $convenio = mysqli_fetch_assoc($socio_tiene_convenio)['sucursal_cobranza_num'];
        $obtener_datos = obtener_convenios("sucursal_cobranzas = '$convenio' AND");
        while ($row = mysqli_fetch_assoc($obtener_datos)) {
            $array_datos[] = $row;
        }
        $obtener_datos = obtener_convenios("sucursal_cobranzas NOT IN ($convenio) AND");
        while ($row = mysqli_fetch_assoc($obtener_datos)) {
            $array_datos[] = $row;
        }

        $response['sin_convenios'] = false;
    }
}



$response['error'] = false;
$response['datos'] = $array_datos;
echo json_encode($response);




function obtener_convenios($where = "")
{
    $conexion = connection(DB);
    $tabla = TABLA_CONVENIOS;

    try {
        $sql = "SELECT sucursal_cobranzas, nombre FROM {$tabla} WHERE $where activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "select_convenios.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}


function comprobar_convenio_socio($cedula)
{
    $conexion = connection(DB);
    $tabla = TABLA_PADRON_DATOS_SOCIO;

    try {
        $sql = "SELECT sucursal_cobranza_num FROM {$tabla} WHERE cedula = '$cedula' AND sucursal_cobranza_num IN (1373, 1374, 1375, 1376)";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "select_convenios.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}
