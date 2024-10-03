<?php
include_once '../../configuraciones.php';

$cedula = $_REQUEST['cedula'];
$numero_servicio_nuevo = $_REQUEST['nro_servicio'];
$numero_servicio_nuevo = obtener_numeros_servicio($numero_servicio_nuevo);
$numero_servicio_nuevo = mysqli_fetch_assoc($numero_servicio_nuevo)['numero_servicio'];
$nombre_servicio_nuevo = $_REQUEST['nombre_servicio'];
$cantidad_horas_nuevo = $_REQUEST['cant_horas'];
$promo_estaciones_nuevo = $_REQUEST['promo_estaciones'];
$numero_promo_nuevo = $_REQUEST['nro_promo'];
$nombre_promo_nuevo = $_REQUEST['nombre_promo'];
$total_importe_nuevo = $_REQUEST['total_importe'];

if ($cedula == "" || $numero_servicio_nuevo == "") devolver_error(ERROR_GENERAL);


$comprobacion = comprobar_servicio($cedula, $numero_servicio_nuevo);
if (!$comprobacion) devolver_error("Ocurrieron errores al comprobar el servicio");
$cantidad_registros = mysqli_num_rows($comprobacion);

if ($cantidad_registros > 0) {
    while ($row = mysqli_fetch_assoc($comprobacion)) {
        $numero_servicio_registrado = $row['servicio'];
        $horas = $row['horas'];
        $importe = $row['importe'];
        $cod_promo = $row['cod_promo'];

        $validar_ingreso_servicio = comprobar_servicio_ya_ingresado($numero_servicio_registrado);
        if ($validar_ingreso_servicio == 0) devolver_error("El servicio ya fue agregado");

        /*
        if ($numero_servicio_registrado == "01") {
            $es_promo_estaciones = comprobar_promo_estaciones($importe);
            if (!$es_promo_estaciones) devolver_error("Ocurrieron errores al corroborar Sanatorio Estaciones");

            if (mysqli_num_rows($es_promo_estaciones) > 0 && $promo_estaciones_nuevo == "false") {
                devolver_error("El servicio esta con Sanatorio Estaciones, deberá incrementar con la misma linea de precios");
            } else if (mysqli_num_rows($es_promo_estaciones) <= 0 && $promo_estaciones_nuevo == "true") {
                devolver_error("El servicio no esta registrado con Sanatorio Estaciones");
            }
        }
        */

        if ($numero_servicio_registrado != $numero_servicio_nuevo) devolver_error(ERROR_GENERAL);
        if ($horas == 24) devolver_error("No se le pueden agregar más horas a este servicio");
        $suma_horas = $cantidad_horas_nuevo + $horas;
        if ($suma_horas > 24) devolver_error("El servicio no puede superar las 24 horas");
    }
}



$response['error'] = false;
$response['mensaje'] = "Todo OK";
echo json_encode($response);




function comprobar_servicio($cedula, $numero_servicio)
{
    $conexion = connection(DB_CALL, false);
    $tabla = TABLA_PADRON_PRODUCTO_SOCIO;

    //Con el "NOT IN" filtro los servicios son "duplicados" porque se ofrecen en paquetes EJ. 06 y 08 es Reintegro Opcional.
    $filtro_paquete = "AND servicio NOT IN (08, 110)";

    try {
        $sql = "SELECT servicio, SUM(hora) AS 'horas', importe, cod_promo FROM {$tabla} WHERE cedula = '$cedula' AND servicio = '$numero_servicio' $filtro_paquete GROUP BY servicio";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "comprobar_condiciones_servicio.php", $error);
        $consulta = false;
    }

    return $consulta;
}


function comprobar_servicio_ya_ingresado($numero_servicio)
{
    $conexion = connection(DB, false);
    $tabla1 = TABLA_SERVICIOS;
    $tabla2 = TABLA_NUMEROS_SERVICIOS;

    try {
        $sql = "SELECT s.horas_servicio FROM {$tabla1} s INNER JOIN {$tabla2} ns ON s.id = ns.id_servicio WHERE ns.numero_servicio = '$numero_servicio'";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "comprobar_condiciones_servicio.php", $error);
        $consulta = false;
    }

    $resultados = $consulta != false ? mysqli_fetch_assoc($consulta)['horas_servicio'] : false;

    return $resultados;
}


function comprobar_promo_estaciones($importe)
{
    $conexion = connection(DB, false);
    $tabla = TABLA_PRECIOS_PROMO_ESTACIONES;

    try {
        $sql = "SELECT * FROM {$tabla} WHERE precio = '$importe' LIMIT 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "comprobar_condiciones_servicio.php", $error);
        $consulta = false;
    }

    return $consulta;
}
