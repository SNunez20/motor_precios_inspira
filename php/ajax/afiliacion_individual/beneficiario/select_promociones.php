<?php
include_once '../../../configuraciones.php';


$obtener_datos = obtener_promociones();
if ($obtener_datos == false) devolver_error("Ocurrieron errores al obtener las promociones");



while ($row = mysqli_fetch_assoc($obtener_datos)) {
    if ($row['nombre'] == "NP") $row['nombre'] .= " (aplica promo para servicios tradicionales)";

    $array_datos[] = $row;
}



$response['error'] = false;
$response['datos'] = $array_datos;
echo json_encode($response);




function obtener_promociones()
{
    $conexion = connection(DB);
    $tabla = TABLA_PROMOCIONES;

    try {
        $sql = "SELECT id, nombre_promocion AS 'nombre' FROM {$tabla} WHERE activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "select_promociones.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}
