<?php
include_once '../configuraciones.php';


$usuario = $_REQUEST['usuario'];
$password = $_REQUEST['password'];
if ($usuario == "" || $password == "") devolver_error(ERROR_GENERAL);



$verificar_vendedor = comprobar_vendedor($usuario, $password);
if (!$verificar_vendedor) devolver_error("Ha ocurrido un error al verificar el vendedor");

$cant_resultados = mysqli_num_rows($verificar_vendedor);
if ($cant_resultados <= 0) devolver_error("No se ha encontrado un vendedor activo con la cédula $usuario");

$datos_vendedor = mysqli_fetch_assoc($verificar_vendedor);
$id_vendedor = $datos_vendedor['id'];
$cedula_vendedor = $datos_vendedor['usuario'];
$nombre_vendedor = $datos_vendedor['nombre'];
$grupo_vendedor = $datos_vendedor['idgrupo'];



$response['error'] = false;
$response['mensaje'] = "Bienvenid@.";
$_SESSION["mpi_id_vendedor"] = $id_vendedor;
$_SESSION["mpi_cedula_vendedor"] = $cedula_vendedor;
$_SESSION["mpi_nombre_vendedor"] = $nombre_vendedor;
$_SESSION["mpi_grupo_vendedor"] = $grupo_vendedor;
echo json_encode($response);




function comprobar_vendedor($usuario, $password)
{
    $conexion = connection(DB_CALL);
    $tabla = TABLA_USUARIOS;

    try {
        $sql = "SELECT * FROM {$tabla} WHERE usuario = '$usuario' AND contrasena = '$password' AND idgrupo = '10039' AND activo = 2";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "login.php", $error);
        $consulta = false;
    }

    return $consulta;
}
