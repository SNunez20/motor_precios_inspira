<?php
include_once '../../configuraciones.php';


$acotado = $_REQUEST['acotado'];
$array_numeros_servicios = $_REQUEST['array_numeros_servicios'];
if ($acotado == "" || count($array_numeros_servicios) <= 0) devolver_error(ERROR_GENERAL);


$consultar_servicios = $acotado == 1 ? obtener_datos_servicios(1) : obtener_datos_servicios(2);
if ($consultar_servicios == false) devolver_error("Ocurrieron errores al obtener los servicios");

while ($row = mysqli_fetch_assoc($consultar_servicios)) {
    $listado_servicios[] = $row;
}




$response['error'] = false;
$response['lista_servicios'] = $listado_servicios;
echo json_encode($response);




function obtener_datos_servicios($opcion)
{
    $conexion = connection(DB);
    $tabla = TABLA_SERVICIOS;

    $where = $opcion == 1 ? "id = 1" : "id NOT IN (13, 15)";

    //die(json_encode($where));

    try {
        $sql = "SELECT * FROM {$tabla} WHERE $where AND mostrar = 1 AND activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "lista_servicios_permitidos.php", $error);
        $consulta = false;
    }

    return $consulta;
}
