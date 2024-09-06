<?php
include_once '../../configuraciones.php';


$cedula = $_REQUEST['cedula'];
if ($cedula == "") devolver_error(ERROR_GENERAL);


$servicios_actuales = obtener_servicios_actuales($cedula);
if ($servicios_actuales == false) devolver_error("Ocurrieron errores al obtener los servicios actuales");


$array_nombre_servicios_agregados = [];
while ($row = mysqli_fetch_assoc($servicios_actuales)) {
    $numero_servicio = $row['servicio'];
    $nombre_servicio = obtener_datos_servicio($numero_servicio);
    $horas = $row['horas'];
    $importe = $row['importe'];
    $cod_promo = $row['cod_promo'];
    $nombre_promo = $cod_promo != "" ? obtener_nombre_promo($cod_promo) : "";


    if (count($array_nombre_servicios_agregados) <= 0) {
        $lista_previa_servicios[] = [
            "numero_servicio" => $numero_servicio,
            "nombre_servicio" => $nombre_servicio,
            "horas" => $horas,
            "importe" => $importe,
            "cod_promo" => $cod_promo,
            "nombre_promo" => $nombre_promo,
        ];
        array_push($array_nombre_servicios_agregados, $nombre_servicio);
    } else {

        foreach ($array_nombre_servicios_agregados as $ansa) {
            if ($ansa != $nombre_servicio) {
                $lista_previa_servicios[] = [
                    "numero_servicio" => $numero_servicio,
                    "nombre_servicio" => $nombre_servicio,
                    "horas" => $horas,
                    "importe" => $importe,
                    "cod_promo" => $cod_promo,
                    "nombre_promo" => $nombre_promo,
                ];
                array_push($array_nombre_servicios_agregados, $nombre_servicio);
            }
        }
    }
}



$count = 1;
$total_importe = 0;
while ($row = mysqli_fetch_assoc($lista_previa_servicios)) {
    $numero_servicio = $row['numero_servicio'];
    $nombre_servicio = $row['nombre_servicio'];
    $horas = $row['horas'];
    $importe = $row['importe'];
    $cod_promo = $row['cod_promo'];
    $nombre_promo = $row['nombre_promo'];

    $nombre_servicio = obtener_datos_servicio($numero_servicio);
    $nombre_promo = $cod_promo != "" ? obtener_nombre_promo($cod_promo) : "";
    $cod_promo = $cod_promo != "" ? "- 🚀 $nombre_promo" : "";
    $lista_servicios[] = "<li class='list-group-item list-group-item-secondary'><strong>" . $count++ . ".</strong> {$nombre_servicio} - ⏰ {$horas}hrs {$cod_promo}</li>";
    $total_importe = $total_importe + $importe;
}



$response['error'] = false;
$response['lista_servicios'] = $lista_servicios;
$response['importe_total'] = $total_importe;
echo json_encode($response);




function obtener_servicios_actuales($cedula)
{
    $conexion = connection(DB);
    $tabla = TABLA_PADRON_PRODUCTO_SOCIO;

    try {
        $sql = "SELECT servicio, SUM(hora) AS 'horas', importe, cod_promo FROM {$tabla} WHERE cedula = '$cedula' GROUP BY servicio";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "lista_servicios_actuales.php", $error);
        $consulta = false;
    }

    return $consulta;
}


function obtener_datos_servicio($numero_servicio)
{
    $conexion = connection(DB);
    $tabla1 = TABLA_SERVICIOS;
    $tabla2 = TABLA_NUMEROS_SERVICIOS;

    try {
        $sql = "SELECT 
                 s.nombre_servicio 
                FROM 
                 {$tabla1} s 
                 INNER JOIN {$tabla2} ns ON s.id = ns.id_servicio 
                WHERE 
                 ns.numero_servicio = '$numero_servicio' 
                LIMIT 1;";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "lista_servicios_actuales.php", $error);
        $consulta = false;
    }

    $resultados = $consulta != false ? mysqli_fetch_assoc($consulta)['nombre_servicio'] : false;

    return $resultados;
}


function obtener_nombre_promo($cod_promo)
{
    $conexion = connection(DB);
    $tabla = TABLA_PROMOCIONES;

    try {
        $sql = "SELECT * FROM {$tabla} WHERE numero_promo = '$cod_promo'";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "lista_servicios_actuales.php", $error);
        $consulta = false;
    }

    $resultados = $consulta != false ? mysqli_fetch_assoc($consulta)['nombre_promocion'] : false;

    return $resultados;
}
