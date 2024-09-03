<?php
include_once '../../../configuraciones.php';


$numero = $_REQUEST['telefono'];
if ($numero == "") devolver_error(ERROR_GENERAL);


$grupos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
$grupo_asignado = $grupos[mt_rand(0, count($grupos))];


// Compruebo si existe el número en el sistema
$validar_numero = validar_existencia($numero);
if ($validar_numero == false) devolver_error('Ocurrieron errores al buscar el teléfono en los registros');



if (mysqli_num_rows($result) <= 0) {
    $guardar_numero = registrar_telefono($numero, $grupo_asignado);
    if ($guardar_numero == false) devolver_error("Ocurrieron errores al guardar el teléfono");
    $response["mensaje"] = "El número ha sido guardado con éxito!";
} else {
    $response["mensaje"] = "El número ya existe!";
}



$response['error'] = false;
echo json_encode($response);




function validar_existencia($numero)
{
    $conexion = connection(DB);
    $tabla = TABLA_NUMEROS;

    $sql = "SELECT * FROM {$tabla} WHERE numero = '$numero'";
    $consulta = mysqli_query($conexion, $sql);

    mysqli_close($conexion);
    return $consulta;
}

function registrar_telefono($numero, $grupo_asignado)
{
    $conexion = connection(DB);
    $tabla = TABLA_NUMEROS;

    $sql = "INSERT INTO {$tabla} (numero, grupo, flag, no_contesta, dep_localidad) VALUES('$numero', '$grupo_asignado', 'libre', 0, 'Desconocido')";
    $consulta = mysqli_query($conexion, $sql);

    mysqli_close($conexion);
    return $consulta;
}
