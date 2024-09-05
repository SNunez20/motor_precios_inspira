<?php
include_once '../../../configuraciones.php';


$opcion = $_REQUEST['opcion'];
if ($opcion == "") devolver_error(ERROR_GENERAL);


$obtener_datos = obtener_metodos_de_pago($opcion);
if ($obtener_datos == false) devolver_error("Ocurrieron errores al obtener los métodos de pago");

while ($row = mysqli_fetch_assoc($obtener_datos)) {
    $array_datos[] = $row;
}



$response['error'] = false;
$response['datos'] = $array_datos;
echo json_encode($response);




function obtener_metodos_de_pago($opcion)
{
    $conexion = connection(DB);
    $tabla = TABLA_METODOS_DE_PAGO;

    $where = $opcion == 2 ? "id IN (4, 5, 6, 7, 8, 9, 10) AND" : "";

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
