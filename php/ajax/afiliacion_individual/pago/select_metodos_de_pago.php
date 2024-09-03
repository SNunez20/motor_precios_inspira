<?php
include_once '../../../configuraciones.php';


$obtener_datos = obtener_metodos_de_pago();
if ($obtener_datos == false) devolver_error("Ocurrieron errores al obtener los métodos de pago");

while ($row = mysqli_fetch_assoc($obtener_datos)) {
    $array_datos[] = $row;
}


$response['error'] = false;
$response['datos'] = $array_datos;
echo json_encode($response);




function obtener_metodos_de_pago()
{
    $conexion = connection(DB);
    $tabla = TABLA_METODOS_DE_PAGO;

    try {
        $sql = "SELECT id, nombre FROM {$tabla} WHERE activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "select_metodos_de_pago.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}
