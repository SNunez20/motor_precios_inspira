<?php
include_once '../../../configuraciones.php';


$obtener_datos = obtener_bancos_emisores();
if ($obtener_datos == false) devolver_error("Ocurrieron errores al obtener el listado de bancos emisores");


while ($row = mysqli_fetch_assoc($obtener_datos)) {
    $array_datos[] = $row;
}



$response['error'] = false;
$response['datos'] = $array_datos;
echo json_encode($response);




function obtener_bancos_emisores()
{
    $conexion = connection(DB);
    $tabla = TABLA_BANCOS_EMISORES;

    $sql = "SELECT id, banco AS 'nombre' FROM {$tabla} WHERE mostrar = '1'";
    $consulta = mysqli_query($conexion, $sql);

    mysqli_close($conexion);
    return $consulta;
}
