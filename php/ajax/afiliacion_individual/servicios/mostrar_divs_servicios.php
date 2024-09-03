<?php
include_once '../../../configuraciones.php';


$opcion = $_REQUEST['opcion'];
$id_servicio = $_REQUEST['id_servicio'];

if ($opcion == "" || $id_servicio == "") devolver_error(ERROR_GENERAL);



$obtener_validacion_promo = obtener_promociones_servicio($id_servicio);
if ($obtener_validacion_promo == false) devolver_error("Ocurrieron errores al validar si se muestra el campo para ingresar las horas");


if ($opcion == 1) {
    $obtener_validacion_mostrar_horas_importe = validar_mostrar_horas_importe($id_servicio);
    if ($obtener_validacion_mostrar_horas_importe == false) devolver_error("Ocurrieron errores al validar si se muestra el campo para ingresar las horas");
    $resultados_validacion_mostrar_horas_importe = mysqli_fetch_assoc($obtener_validacion_mostrar_horas_importe);
    $mostrar_horas = $resultados_validacion_mostrar_horas_importe['horas_servicio'];
    $mostrar_div_importe_total = $resultados_validacion_mostrar_horas_importe['importe_manual'];

    $response['mostrar_horas']        = intval($mostrar_horas);
    $response['mostrar_lista_precios'] = $id_servicio == 1 ? 1 : 0;
    $response['mostrar_promociones']  = mysqli_num_rows($obtener_validacion_promo) > 0 ? 1 : 0;
    $response['mostrar_div_importe_total'] = $mostrar_div_importe_total;
}


if ($opcion == 2) {
    while ($row = mysqli_fetch_assoc($obtener_validacion_promo)) {
        $array_datos[] = $row;
    }
    $response['datos'] = $array_datos;
}



$response['error'] = false;
echo json_encode($response);




function validar_mostrar_horas_importe($id_servicio)
{
    $conexion = connection(DB);
    $tabla = TABLA_SERVICIOS;

    try {
        $sql = "SELECT horas_servicio, importe_manual FROM {$tabla} WHERE id='$id_servicio' AND activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "mostrar_divs_servicios.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}


function obtener_promociones_servicio($id_servicio)
{
    $conexion = connection(DB);
    $tabla1 = TABLA_SERVICIOS;
    $tabla2 = TABLA_SERVICIOS_PROMOS;
    $tabla3 = TABLA_PROMOCIONES;

    try {
        $sql = "SELECT
             p.id,
             p.nombre_promocion AS 'nombre'
            FROM
             {$tabla1} s 
             INNER JOIN {$tabla2} sp ON sp.id_servicio = s.id
             INNER JOIN {$tabla3} p ON p.id = sp.id_promo
            WHERE
             s.id = '$id_servicio' AND 
             s.activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "mostrar_divs_servicios.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}
