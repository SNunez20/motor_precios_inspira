<?php
include_once '../configuraciones.php';

$cedula = $_REQUEST['cedula'];
if ($cedula == "") devolver_error(ERROR_GENERAL);


$comprobar_en_piscina = comprobar_cedula(1, $cedula);
if ($comprobar_en_piscina == false) devolver_error("Ocurrieron errores al verificar la cédula en piscina");
$resultados_piscina = mysqli_num_rows($comprobar_en_piscina) > 0 ? true : false;


$comprobar_en_padron = comprobar_cedula(2, $cedula);
if ($comprobar_en_padron == false) devolver_error("Ocurrieron errores al verificar la cédula en padrón");
$resultados_padron = mysqli_num_rows($comprobar_en_padron) > 0 ? true : false;



$response['error'] = false;
$response['socio'] = $resultados_piscina || $resultados_padron ? true : false;
echo json_encode($response);




function comprobar_cedula($opcion, $cedula)
{
    $conexion = $opcion == 1 ? connection(DB_CALL) : connection(DB_ABMMOD);
    $tabla = TABLA_PADRON_DATOS_SOCIO;

    try {
        $sql = "SELECT * FROM {$tabla} WHERE cedula = '$cedula'";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "comprobar_cedula_padron.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}
