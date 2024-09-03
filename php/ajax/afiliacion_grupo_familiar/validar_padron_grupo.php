<?php
include_once '../../configuraciones.php';

$afiliados = $_REQUEST['array_personas_grupo_familiar'];
if (count($afiliados) <= 0) devolver_error(ERROR_GENERAL);


foreach ($afiliados as $key => $val) {
    $cedula = $val['cedula'];
    $mensaje = "";

    $comprobar_padron = comprobar_existe_socio(2, $cedula);
    if (!$comprobar_padron) $response["mensaje"] .= "Ocurrieron errores al verificar la cédula $cedula en padrón";
    $comprobar_piscina = comprobar_existe_socio(1, $cedula);
    if (!$comprobar_piscina) $response["mensaje"] .= "Ocurrieron errores al verificar la cédula $cedula en piscina";
    $socio = false;

    if (($comprobar_padron) && mysqli_num_rows($comprobar_padron) > 0) {
        $socio = true;
        $response["socio"] = false;
        $response["result"] = false;
        $response["mensaje"] .= "La cédula $cedula se encuentra en proceso de afiliación";
    } else if (mysqli_num_rows($comprobar_piscina) == 1) {
        $socio = true;
        $response["socio"] = false;
        $response["result"] = false;
        $response["mensaje"] .= "La cédula $cedula ya se encuentra en padrón";
    }

    ####################################################################################################
    // Compruebo si es SOCIO, para de esta manera tener en cuenta que productos ofrecer
    // Abrimos la sesión cURL
    //$resultados_curl_comprobar_baja = curl_comprobar_baja($cedula);
    ####################################################################################################

    if (!$socio) {
        $response['error'] = false;
        $response["socio"] = false;
        $response["mensaje"] = "";
        //$response["data_socios"][$key]["code"] = $resultados_curl_comprobar_baja->code;
        //$response["data_socios"][$key]["cedula"] = $cedula;
    } else {
        $response['error'] = true;
        $response["socio"] = true;
        $response["mensaje"] = "La cédula $cedula corresponde a un socio en el sistema";
    }
}



echo json_encode($response);




function comprobar_existe_socio($opcion, $cedula)
{
    $conexion = $opcion == 1 ? connection(DB_CALL) : connection(DB_ABMMOD);
    $tabla = TABLA_PADRON_DATOS_SOCIO;

    try {
        $sql = "SELECT * FROM {$tabla} WHERE cedula = '$cedula'";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "validar_padron_grupo.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}


function curl_comprobar_baja($cedula)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, URL_AJAX . "afiliacion_grupo_familiar/buscar_baja.php");
    // curl_setopt($ch,CURLOPT_URL,"http://localhost/call_prueba/Ajax/buscarBaja.php");
    // indicamos el tipo de petición
    curl_setopt($ch, CURLOPT_POST, true);
    // definimos cada uno de los párametros
    curl_setopt($ch, CURLOPT_POSTFIELDS, "cedula=$cedula");
    // recibimos la respuesta
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $res = json_decode(curl_exec($ch));
    curl_close($ch);

    return $res;
}
