<?php
include_once '../../configuraciones.php';


$response = ['error' => true, 'mensaje' => 'Intentelo nuevamente mas tarde !!'];

$data = array_map('stripslashes', $_POST);
$cedula = $data['cedula'];

$fecha        = date("Y-m-d H:i:s");
$tRojo        = "No autorizado, consultar con Comercial";
$tRojo2       = "Figura en padrón.";
$tVerdeClaro  = "A esta persona se le puede vender SOLO productos acotados con cualquier medio de pago.";
$tVerdeClaro2 = "A esta persona se le puede vender SOLO productos acotados SOLO con tarjeta de crédito.";
$tVerde       = "A esta persona se le puede vender con TODO (tradicional) o productos acotados con cualquier medio de pago.";
$meses        = "none";
$code         = 0;
$vuelve_antes = false;


/**
 * 0 - Figura en padrón.
 * 1 - No es socio ni esta en baja.
 * 2 - Clearing.
 * 3 - Todos los productos con cualquier medio de pago.
 * 4 - Solo productos acotados con culaquier medio de pago.
 * 5 - Solo productos actotados SOLO con tarjeta de crédito.
 */
$comprobar_padron_socio = comprobar_existe_socio(2, $cedula);
if (mysqli_num_rows($comprobar_padron_socio) > 0) {
    //ACÁ SI ESTA EN PADRÓN
    $color      = "rojo_claro";
    $color_code = "#edb9b9";
    $font_color = "black";
    $texto      = $tRojo2;
} else {

    $comprobar_baja_padron = comprobar_baja($cedula);
    if (mysqli_num_rows($comprobar_baja_padron) > 0) {
        //ACÁ SI ESTA EN BAJAS
        while ($row = mysqli_fetch_assoc($comprobar_baja_padron)) {
            $fecha_baja    = $row['fecha_baja'];
            $tipo_producto = $row['tipo_producto'];
            $clearing      = $row['clearing'];
            $count         = $row['count'];
        }

        if ($clearing == 1) {
            $color      = "rojo";
            $color_code = "red";
            $font_color = "white";
            $texto      = $tRojo;
            $code       = 2;
        } else {
            $fechaBaja = new DateTime($fecha_baja);
            $fechaHoy  = new DateTime($fecha);
            $interval  = $fechaHoy->diff($fechaBaja);
            $meses     = ($interval->y * 12) + $interval->m;

            if ($meses >= 7 || ($count >= 36 && $meses >= 3)) {
                //ACÁ SI ESTA EN BAJA PERO YA PASO LAS 7 EMISIONES
                $color      = "verde";
                $color_code = "green";
                $font_color = "white";
                $texto      = $tVerde;
                $code       = 3;
                $vuelve_antes = ($meses < 7) ? true : false;
            } elseif ($tipo_producto == "T") {
                //ACÁ SI ES BAJA HACE MENOS DE 7 EMISIONES DE UN PRODUCTO TRADICIONAL
                $color      = "verde_claro";
                $color_code = "#9FF781";
                $font_color = "black";
                $texto      = $tVerdeClaro;
                $code       = 4;
            } elseif ($tipo_producto == "A") {
                //ACÁ SI ES BAJA HACE MENOS DE 7 EMISIONES DE UN PRODUCTO ACOTADO
                $color      = "verde_claro2";
                $color_code = "#cef5c1";
                $font_color = "black";
                $texto      = $tVerdeClaro2;
                $code       = 5;
            }
        }
    } else {
        //ACÁ SI NO ES SOCIO NI ESTA DE BAJA
        $color      = "verde";
        $color_code = "green";
        $font_color = "white";
        $texto      = $tVerde;
        $code       = 1;
    }
}


if ($color != "")
    $response = [
        'error' => false,
        'mensaje' => 'Correcto',
        'meses' => $meses,
        'color' => $color,
        'color_code' => $color_code,
        'font_color' => $font_color,
        'texto' => $texto,
        "code" => $code,
        "vuelve_antes" => $vuelve_antes,
    ];



echo json_encode($response);




function comprobar_existe_socio($opcion, $cedula)
{
    $conexion = $opcion == 1 ? connection(DB) : connection(DB);
    $tabla = TABLA_PADRON_DATOS_SOCIO;

    try {
        $sql = "SELECT * FROM {$tabla} WHERE cedula = '$cedula'";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "buscar_baja.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}


function comprobar_baja($cedula)
{
    $conexion = connection(DB);
    $tabla = TABLA_BAJAS;

    try {
        $sql = "SELECT fecha_baja, tipo_producto, clearing, `count` FROM {$tabla} WHERE cedula = '$cedula'";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "buscar_baja.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}
