<?php
include_once '../configuraciones.php';

$cedula = $_REQUEST['cedula'];
if ($cedula == "") devolver_error(ERROR_GENERAL);
$datos = "";


$comprobar_en_piscina = comprobar_cedula(1, $cedula);
if ($comprobar_en_piscina == false) devolver_error("Ocurrieron errores al verificar la cédula en piscina");
$resultados_piscina = mysqli_num_rows($comprobar_en_piscina) > 0 ? true : false;
if ($resultados_piscina) {
    $datos = mysqli_fetch_assoc($comprobar_en_piscina);
    $tel = $datos['tel'];
    $numeros = explode(" ", $tel);
    $datos['celular'] = isset($numeros[0]) && $numeros[0] != "" ? $numeros[0] : "";
    $datos['telefono_fijo'] = isset($numeros[1]) && $numeros[1] != "" ? $numeros[1] : "";
    $datos['telefono_alternativo'] = isset($numeros[2]) && $numeros[2] != "" ? $numeros[2]  : "";
}


$comprobar_en_padron = comprobar_cedula(2, $cedula);
if ($comprobar_en_padron == false) devolver_error("Ocurrieron errores al verificar la cédula en padrón");
$resultados_padron = mysqli_num_rows($comprobar_en_padron) > 0 ? true : false;
if ($resultados_padron) {
    $datos = mysqli_fetch_assoc($comprobar_en_padron);
    $tel = $datos['tel'];
    $numeros = explode(" ", $tel);
    $datos['celular'] = isset($numeros[0]) && $numeros[0] != "" ? $numeros[0] : "";
    $datos['telefono_fijo'] = isset($numeros[1]) && $numeros[1] != "" ? $numeros[1] : "";
    $datos['telefono_alternativo'] = isset($numeros[2]) && $numeros[2] != "" ? $numeros[2]  : "";
}



$response['error'] = false;
$response['socio'] = $resultados_piscina || $resultados_padron ? true : false;
$response['datos'] = $datos != "" ? $datos : false;
echo json_encode($response);




function comprobar_cedula($opcion, $cedula)
{
    $conexion = $opcion == 1 ? connection(DB_CALL, false) : connection(DB, false);
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
