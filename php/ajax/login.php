<?php
include_once '../configuraciones.php';


$usuario = $_REQUEST['usuario'];
$password = $_REQUEST['password'];
if ($usuario == "" || $password == "") devolver_error(ERROR_GENERAL);



$verificar_vendedor = comprobar_vendedor($usuario);
if (!$verificar_vendedor) devolver_error("Ha ocurrido un error al verificar el vendedor");

$cant_resultados = mysqli_num_rows($verificar_vendedor);
if ($cant_resultados <= 0) devolver_error("No se ha encontrado un vendedor activo con la cédula $usuario");

$datos_vendedor = mysqli_fetch_assoc($verificar_vendedor);
$cedula_vendedor = $datos_vendedor['cedula'];
$nombre_vendedor = $datos_vendedor['nombre'];



$response['error'] = false;
$response['mensaje'] = "Bienvenid@.";
$_SESSION["mpi_cedula_vendedor"] = $cedula_vendedor;
$_SESSION["mpi_nombre_vendedor"] = $nombre_vendedor;
echo json_encode($response);




function comprobar_vendedor($cedula)
{
    $conexion = connection(DB);
    $tabla = TABLA_VENDEDORES;

    $sql = "SELECT * FROM {$tabla} WHERE cedula = '$cedula' AND activo = 1";
    $consulta = mysqli_query($conexion, $sql);

    return $consulta;
}
