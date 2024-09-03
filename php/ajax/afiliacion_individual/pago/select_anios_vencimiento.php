<?php
include_once '../../../configuraciones.php';


$anio = date("Y");
$max_year = $anio + 10;


for ($anio; $anio <= $max_year; $anio++) {
    $array_datos[] = $anio;
}



$response['error'] = false;
$response['datos'] = $array_datos;
echo json_encode($response);
