<?php
include_once '../../configuraciones.php';

$id_metodo_pago = $_REQUEST['id_metodo_pago'];
$metodo_pago = $_REQUEST['metodo_pago'];
$array_cedula_integrantes = $_REQUEST['array_personas_grupo_familiar'];
$array_datos_integrantes = $_REQUEST['array_datos_beneficiario_grupo_familiar'];
$array_productos_integrantes = $_REQUEST['array_servicios_agregados_grupo_familiar'];
$array_observacion_convenio_integrante = $_REQUEST['array_guardar_datos_servicios'];
$array_datos_titular_tarjeta = $_REQUEST['array_tarjeta_titular_grupo_familiar'];

if (
    $id_metodo_pago == "" ||
    $metodo_pago == "" ||
    count($array_cedula_integrantes) <= 0 ||
    count($array_datos_integrantes) < count($array_cedula_integrantes) ||
    count($array_productos_integrantes) <= 0 ||
    count($array_observacion_convenio_integrante) < count($array_cedula_integrantes) ||
    count($array_datos_titular_tarjeta) <= 0
) devolver_error(ERROR_GENERAL);



$mensaje = "";
foreach ($array_cedula_integrantes as $integrante) {
    $cedula = $integrante['cedula'];

    $registrar_socio = agregar_padron_datos_socios($cedula, $id_metodo_pago, $metodo_pago);
    if ($registrar_socio == false) $mensaje .= "Error al registrar el socio de cédula <strong>$cedula</strong>";

    $registrar_productos = agregar_padron_producto_socios($cedula, $id_metodo_pago);
    if ($registrar_productos == false) $mensaje .= "Error al registrar productos para la cédula <strong>$cedula</strong>";
}



$response['error'] = $mensaje != "" ? true : false;
$response['mensaje'] = $mensaje != "" ? $mensaje : "Se registraron los datos del grupo con éxito!";
echo json_encode($response);




function agregar_padron_datos_socios($cedula_persona, $id_metodo_pago, $metodo_pago)
{
    $conexion = connection(DB, false);
    $tabla = TABLA_PADRON_DATOS_SOCIO;


    foreach ($_REQUEST['array_datos_beneficiario_grupo_familiar'] as $datos_beneficiario) {
        if ($cedula_persona == $datos_beneficiario["cedula"]) {
            /** Datos del beneficiario **/
            $cedula = $datos_beneficiario["cedula"];
            $nombre_completo = $datos_beneficiario["nombre_completo"];
            $celular = $datos_beneficiario["celular"];
            $telefono_fijo = $datos_beneficiario["telefono_fijo"];
            $telefono_alternativo = $datos_beneficiario["telefono_alternativo"];
            $tel = "";
            if ($celular != "") $tel .= "$celular ";
            if ($telefono_fijo != "") $tel .= "$telefono_fijo ";
            if ($telefono_alternativo != "") $tel .= $telefono_alternativo;
            $tel = trim($tel);
            $direccion = $datos_beneficiario["direccion"];
            $id_localidad = $datos_beneficiario["id_localidad"];
            $nombre_localidad = $datos_beneficiario["nombre_localidad"];
            $fecha_nacimiento = $datos_beneficiario["fecha_nacimiento"];
            $edad = date("Y") - date("Y", strtotime($fecha_nacimiento));
            $correo_electronico = $datos_beneficiario["correo_electronico"] != "" ? $datos_beneficiario["correo_electronico"] : "";
            $dato_extra = $datos_beneficiario["dato_extra"];
            /** End Datos del beneficiario **/
        }
    }

    $importe_total = 0;
    foreach ($_REQUEST['array_servicios_agregados_grupo_familiar'] as $datos_servicios) {
        if ($cedula_persona == $datos_servicios["cedula"]) {
            $id_servicio = $datos_servicios["numero_servicio"];
            $cantidad_horas = $datos_servicios["cantidad_horas"] == "" ? 8 : $datos_servicios["cantidad_horas"];
            $promo_estaciones = $datos_servicios["promo_estaciones"];
            $total_importe = $datos_servicios['total_importe'];
            $importe_total = $importe_total + calcular_precio_servicio($edad, $id_servicio, $cantidad_horas, $promo_estaciones, $total_importe);
        }
    }

    foreach ($_REQUEST['array_guardar_datos_servicios'] as $datos) {
        if ($cedula_persona == $datos["cedula"]) {
            $observacion = $datos["observacion"];
            $convenio = $datos["convenio"];
        }
    }

    /** Datos de la tarjeta **/
    $array_tarjeta_titular = $_REQUEST['array_tarjeta_titular_grupo_familiar'];
    $numero_tarjeta = $array_tarjeta_titular["numero_tarjeta"];
    $tipo_tarjeta = $array_tarjeta_titular["tipo_tarjeta"];
    $cvv_tarjeta = $array_tarjeta_titular["cvv_tarjeta"];
    $banco_emisor = $array_tarjeta_titular["banco_emisor"];
    $cedula_titular = $array_tarjeta_titular["cedula_titular"];
    $nombre_titular = $array_tarjeta_titular["nombre_titular"];
    $nombre_titular = $array_tarjeta_titular["nombre_titular"];
    $mes_vencimiento = $array_tarjeta_titular["mes_vencimiento"];
    $anio_vencimiento = $array_tarjeta_titular["anio_vencimiento"];
    $email_titular = $array_tarjeta_titular["email_titular"];
    $celular_tarjeta_titular = $array_tarjeta_titular["celular_titular"];
    $telefono_tarjeta_titular = $array_tarjeta_titular["telefono_titular"];
    $tel_titular =
        ($celular_tarjeta_titular != "" && $telefono_tarjeta_titular != "") ?
        "$celular_tarjeta_titular $telefono_tarjeta_titular" : (($celular_tarjeta_titular != "" && $telefono_tarjeta_titular == "") ? $celular : (($telefono_tarjeta_titular != "" && $telefono_tarjeta_titular == "") ? $telefono_tarjeta_titular : ""));
    /** End Datos de la tarjeta **/

    $obtener_radio_ruta = obtener_radio_ruta($id_metodo_pago, $metodo_pago, $nombre_localidad);
    $cantidad_radio_ruta = mysqli_num_rows($obtener_radio_ruta);
    $resultados_radio_ruta = mysqli_fetch_assoc($obtener_radio_ruta);
    $ruta = $cantidad_radio_ruta > 1 ? "" : $resultados_radio_ruta['ruta'];
    $radio = $cantidad_radio_ruta > 1 ? $resultados_radio_ruta['radio'][0] : $resultados_radio_ruta['radio'];

    $sucursal = "1372";
    $sucursal_cobranzas = $convenio != "" ? $convenio : $sucursal;
    $empresa_marca = '99';
    $empresa_rut = "05";
    $id_relacion = "99-$cedula"; // Si es tarjeta 99-cedula
    $rutcentralizado = '99';

    try {
        $sql = "INSERT INTO {$tabla} SET 
                id = NULL,
                nombre = '$nombre_completo',
                tel = '$tel',
                cedula = '$cedula',
                direccion = '$direccion',
                sucursal = '$sucursal',
                ruta = '$ruta',
                radio = '$radio',
                activo = '1',
                fecha_nacimiento = '$fecha_nacimiento',
                edad = '$edad',
                tarjeta = '$tipo_tarjeta',
                tipo_tarjeta = '$tipo_tarjeta',
                numero_tarjeta = '$numero_tarjeta',
                nombre_titular = '$nombre_titular',
                cedula_titular = '$cedula_titular',
                telefono_titular = '$tel_titular',
                anio_e = '$anio_vencimiento',
                mes_e = '$mes_vencimiento',
                cuotas_mercadopago = '0', 
                sucursal_cobranzas = '$sucursal_cobranzas',
                sucursal_cobranza_num = '$sucursal',
                empresa_marca = '$empresa_marca',
                flag = '1',
                count = '0',
                observaciones = '$observacion',
                grupo = '0',
                idrelacion = '$id_relacion',
                empresa_rut = '$empresa_rut',
                total_importe = '$importe_total',
                nactual = '1',
                `version` = '1',
                flagchange = '1',
                rutcentralizado = '$rutcentralizado',
                `PRINT` = '0',
                EMITIDO = '1',
                movimientoabm = 'ALTA',
                abm = 'ALTA',
                abmactual = '1',
                `check` = '0',
                usuario = '0',
                usuariod = '0',
                fechafil = NOW(),
                radioViejo = '0',
                extra = '0',
                nomodifica = '0',
                metodo_pago = '$id_metodo_pago',
                cvv = '$cvv_tarjeta',
                existe_padron = '0',
                email = '$correo_electronico',
                email_titular = '$email_titular',
                tarjeta_vida = '0',
                banco_emisor = '$banco_emisor',
                accion = '1',
                estado = '1',
                localidad = '$id_localidad',
                dato_extra = '$dato_extra',
                llamada_entrante = '0',
                origen_venta = '0',
                alta = '1',
                es_admin = '0',
                id_usuario = '0'";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "completar_afiliacion_grupo_familiar.php", $error);
        $consulta = false;
    }

    $resultados = $consulta ? mysqli_insert_id($conexion) : false;

    mysqli_close($conexion);
    return $resultados;
}


function registrar_direccion_socio($id_socio_padron, $array_datos_beneficiario)
{
    $conexion = connection(DB, false);
    $tabla = TABLA_DIRECCIONES_SOCIOS;

    $cedula = $array_datos_beneficiario["cedula"];
    $calle = mysqli_real_escape_string($conexion, $array_datos_beneficiario["calle"]);
    $puerta = $array_datos_beneficiario["puerta"];
    $manzana = $array_datos_beneficiario["manzana"];
    $solar = $array_datos_beneficiario["solar"];
    $apartamento = $array_datos_beneficiario["apartamento"];
    $esquina = mysqli_real_escape_string($conexion, $array_datos_beneficiario["esquina"]);
    $referencia = mysqli_real_escape_string($conexion, $array_datos_beneficiario["referencia"]);

    try {
        $sql = "INSERT INTO {$tabla} (
             id_socio,
             calle,
             puerta,
             manzana,
             solar,
             apartamento,
             esquina,
             referencia,
             cedula_socio
            ) VALUES (
             $id_socio_padron,
             '$calle',
             '$puerta',
             '$manzana',
             '$solar',
             '$apartamento',
             '$esquina',
             '$referencia',
             '$cedula')";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "completar_afiliacion_grupo_familiar.php", $error);
        $consulta = false;
    }

    mysqli_query($conexion, $sql);
    return $consulta;
}


function agregar_padron_producto_socios($cedula_persona, $id_metodo_pago)
{
    $conexion = connection(DB, false);
    $tabla = TABLA_PADRON_PRODUCTO_SOCIO;


    foreach ($_REQUEST['array_datos_beneficiario_grupo_familiar'] as $datos_beneficiario) {
        if ($cedula_persona == $datos_beneficiario["cedula"]) {
            /** Datos del beneficiario **/
            $cedula = $datos_beneficiario["cedula"];
            $celular = $datos_beneficiario["celular"];
            $telefono_fijo = $datos_beneficiario["telefono_fijo"];
            $telefono_alternativo = $datos_beneficiario["telefono_alternativo"];
            $tel = "";
            if ($celular != "") $tel .= "$celular ";
            if ($telefono_fijo != "") $tel .= "$telefono_fijo ";
            if ($telefono_alternativo != "") $tel .= $telefono_alternativo;
            $tel = trim($tel);
            $fecha_nacimiento = $datos_beneficiario["fecha_nacimiento"];
            $edad = date("Y") - date("Y", strtotime($fecha_nacimiento));
            /** End Datos del beneficiario **/
        }
    }

    foreach ($_REQUEST['array_guardar_datos_servicios'] as $datos) {
        if ($cedula_persona == $datos["cedula"]) {
            $observacion = $datos["observacion"];
        }
    }

    $errores = 0;
    //Recorro los servicios
    foreach ($_REQUEST['array_servicios_agregados_grupo_familiar'] as $servicios) {
        if ($cedula_persona == $servicios["cedula"]) {
            $id_servicio = $servicios['numero_servicio'];
            $numeros_servicio = obtener_numeros_servicio($id_servicio);
            $cantidad_horas = $servicios['cantidad_horas'] != "" ? $servicios['cantidad_horas'] : 8;
            $modulos_horas = $cantidad_horas == 8 ? 1 : ($cantidad_horas == 16 ? 2 : 3);
            $promo_estaciones = $servicios['promo_estaciones'];
            $numero_promo = obtener_datos_promocion($servicios['numero_promo']);
            $total_importe = $servicios['total_importe'];
            $total_importe = calcular_precio_servicio($edad, $id_servicio, $cantidad_horas, $promo_estaciones, $total_importe);
            $empresa_rut = "05";
            $id_relacion = "99-$cedula"; // Si es tarjeta 99-cedula


            //Recorro los números de servicio
            while ($row = mysqli_fetch_assoc($numeros_servicio)) {
                $servicio = $row["numero_servicio"];
                //Registro los productos en módulos de 8 horas
                for ($i = 0; $i < $modulos_horas; $i++) {
                    try {
                        $sql = "INSERT INTO {$tabla} SET
                                id = NULL,
                                cedula = '$cedula',
                                servicio = '$servicio',
                                hora = '8',
                                importe = '$total_importe',
                                cod_promo = '$numero_promo',
                                fecha_registro = NOW(),
                                numero_contrato = '0',
                                fecha_afiliacion = NOW(),
                                nombre_vendedor = '0',
                                observaciones = '$observacion',
                                lugar_venta = '0',
                                vendedor_independiente = '0',
                                activo = '999',
                                movimiento = 'ALTA',
                                fecha_inicio_derechos = '2015-09-15',
                                numero_vendedor = '0',
                                keepprice1 = '$total_importe',
                                promoactivo = '0',
                                tipo_de_cobro = '0',
                                tipo_iva = '2',
                                idrelacion = '$id_relacion',
                                codigo_precio = '0',
                                aumento = '0',
                                empresa = '$empresa_rut',
                                nactual = '1',
                                servdecod = '$servicio',
                                count = '0',
                                `version` = '1',
                                abm = 'ALTA',
                                abmactual = '1',
                                usuario = '0',
                                usuariod = '0',
                                extra = '0',
                                nomodifica = '0',
                                precioOriginal = '$total_importe',
                                abitab = '0',
                                id_padron = '0',
                                accion = '5',
                                cedula_titular_gf = NULL";
                        $consulta = mysqli_query($conexion, $sql);
                    } catch (\Throwable $error) {
                        registrar_errores($sql, "completar_afiliacion_grupo_familiar.php", $error);
                        $errores++;
                    }
                }
            }
        }
    }

    return $errores > 0 ? false : true;
}
