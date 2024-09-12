<?php
include_once '../../../configuraciones.php';


$opcion = $_REQUEST['opcion'];
if ($opcion == "") devolver_error(ERROR_GENERAL);


if ($opcion == 3) {
    $array = $_REQUEST['array'];
    $cedula = $array['cedula'];

    $obtener_datos_pago = obtener_datos_actuales_pago($cedula);
    if ($obtener_datos_pago == false) devolver_error("Ocurrieron errores al obtener el método de pago actual");

    while ($row = mysqli_fetch_assoc($obtener_datos_pago)) {
        $array_datos[] = $row;

        $id = $row['id'];
        $obtener_datos = obtener_metodos_de_pago($opcion, "id NOT IN ('$id') AND");
        if ($obtener_datos == false) devolver_error("Ocurrieron errores al obtener los métodos de pago");
        while ($row = mysqli_fetch_assoc($obtener_datos)) {
            $array_datos[] = $row;
        }
    }
} else {
    $obtener_datos = obtener_metodos_de_pago($opcion);
    if ($obtener_datos == false) devolver_error("Ocurrieron errores al obtener los métodos de pago");
    while ($row = mysqli_fetch_assoc($obtener_datos)) {
        $array_datos[] = $row;
    }
}






$response['error'] = false;
$response['datos'] = $array_datos;
echo json_encode($response);




function obtener_metodos_de_pago($opcion, $where2 = "")
{
    $conexion = connection(DB);
    $tabla = TABLA_METODOS_DE_PAGO;

    $where = $opcion == 2 ? "id IN (4, 5, 6, 7, 8, 9, 10) AND" : "";
    if ($opcion == 3) $where = $where2;

    try {
        $sql = "SELECT id, nombre FROM {$tabla} WHERE $where activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "select_metodos_de_pago.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}
