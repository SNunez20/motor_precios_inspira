<?php
include_once '../../configuraciones.php';

$id_metodo_pago = $_REQUEST['id_metodo_pago'];
$metodo_pago = $_REQUEST['metodo_pago'];
$array_datos_beneficiario = $_REQUEST['array_datos_beneficiario_incremento'];
$array_servicios_agregados = $_REQUEST['array_servicios_agregados_incremento'];
$array_tarjeta_titular = $_REQUEST['array_tarjeta_titular_incremento'];
$observacion = $_REQUEST['observacion'];
$importe_total = $_REQUEST['importe_total'];

if (
    $id_metodo_pago == "" ||
    $metodo_pago == "" ||
    count($array_datos_beneficiario) <= 0 ||
    count($array_servicios_agregados) <= 0 ||
    count($array_tarjeta_titular) <= 0 ||
    $observacion == "" ||
    $importe_total == ""
) devolver_error(ERROR_GENERAL);



$cedula = $array_datos_beneficiario['cedula'];


/** Se comprueba que exista el socio en piscina*/
$existe_socio_piscina = comprobar_existe_socio(1, $cedula);
if ($existe_socio_piscina == false) devolver_error("Ocurrieron errores al verificar si existe el socio en piscina");
$cantidad_socio_piscina = mysqli_num_rows($existe_socio_piscina);

/** Se comprueba que exista el socio en padrón*/
$existe_socio_padron = comprobar_existe_socio(2, $cedula);
if ($existe_socio_padron == false) devolver_error("Ocurrieron errores al verificar si existe el socio en padrón");
$cantidad_socio_padron = mysqli_num_rows($existe_socio_padron);

/** Si no existe socio con la cédula ingresada se retornara un error */
if ($cantidad_socio_piscina <= 0 && $cantidad_socio_padron <= 0)
    devolver_error("No se han encontrado socios con la cédula ingresada");


if ($cantidad_socio_piscina > 0 && $cantidad_socio_padron <= 0) {
    /** Si el socio esta en piscina, se actualizan los datos **/
    $modificar_padron_socios = modificar_padron_socios();
    if ($modificar_padron_socios == false) devolver_error("Ocurrieron errores al actualizar los datos del socio en piscina");
} else if ($cantidad_socio_piscina <= 0 && $cantidad_socio_padron > 0) {
    /** Si el socio esta en padrón, se actualizan los datos **/
    $modificar_padron_socios = modificar_padron_socios();
    if ($modificar_padron_socios == false) devolver_error("Ocurrieron errores al actualizar los datos del socio en padrón");
}


/** Se comprueba con la cédula que el socio tenga una dirección registrada */
$comprobar_direccion_socio = comprobar_direccion_socio();
if ($comprobar_direccion_socio == false) devolver_error("Ocurrieron errores al comprobar la dirección del socio");

if (mysqli_num_rows($comprobar_direccion_socio) <= 0) {
    /** Si no tiene una dirección registrada se le agrega */
    $registrar_direccion = registrar_direccion_socio($id_socio_padron);
    if ($registrar_direccion == false) devolver_error("Ocurrieron errores al registrar la dirección del socio");
} else {
    /** Si tiene una dirección registrada se le actualizan */
    $modificar_direccion_socio = modificar_direccion_socio();
    if ($modificar_direccion_socio == false) devolver_error("Ocurrieron errores al actualizar la dirección del socio");
}


/** Se le agregan los nuevos productos y los incrementos */
$registrar_productos = agregar_padron_producto_socios($observacion, $id_metodo_pago);
if ($registrar_productos == false) devolver_error("Ocurrieron errores al registrar los productos");


$datos_piscina = mysqli_fetch_assoc($existe_socio_piscina);
$datos_padron = mysqli_fetch_assoc($existe_socio_padron);
$id_padron = $datos_piscina != "" ? $datos_piscina['id'] : $datos_padron['id'];

/** Se registra en el historial de venta */
$registro_historial = registrar_historial_venta($id_padron, "INCREMENTO A TRAVES DE CALL");
if ($registrar_productos == false) devolver_error("Ocurrieron errores al registrar en el historial de venta");



$response['error'] = false;
$response['mensaje'] = 'Se ha completado la afiliación con éxito!';
echo json_encode($response);




/** Función para comprobar si existe el socio con $opcion=1 piscina y $opcion=2 padron */
function comprobar_existe_socio($opcion, $cedula)
{
    $conexion = $opcion == 1 ? connection(DB_CALL) : connection(DB, false);
    $tabla = TABLA_PADRON_DATOS_SOCIO;

    try {
        $sql = "SELECT * FROM {$tabla} WHERE cedula = '$cedula'";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "completar_afiliacion_incremento.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}


/** Función para agregar socio */
function agregar_padron_datos_socios()
{
    $conexion = connection(DB, false);
    $tabla = TABLA_PADRON_DATOS_SOCIO;

    $observacion = $_REQUEST['observacion'];
    $id_metodo_pago = $_REQUEST['id_metodo_pago'];
    $metodo_pago = $_REQUEST['metodo_pago'];
    $importe_total = $_REQUEST['importe_total'];
    $convenio = $_REQUEST['convenio'];

    /** Datos del beneficiario **/
    $array_datos_beneficiario = $_REQUEST['array_datos_beneficiario_incremento'];
    $nombre_completo = $array_datos_beneficiario["nombre_completo"];
    $celular = $array_datos_beneficiario["celular"];
    $telefono_fijo = $array_datos_beneficiario["telefono_fijo"];
    $telefono_alternativo = $array_datos_beneficiario["telefono_alternativo"];
    $tel = "";
    if ($celular != "") $tel .= "$celular ";
    if ($telefono_fijo != "") $tel .= "$telefono_fijo ";
    if ($telefono_alternativo != "") $tel .= $telefono_alternativo;
    $tel = trim($tel);
    $cedula = $array_datos_beneficiario["cedula"];
    $direccion = $array_datos_beneficiario["direccion"];
    $id_localidad = $array_datos_beneficiario["id_localidad"];
    $nombre_localidad = $array_datos_beneficiario["nombre_localidad"];
    $fecha_nacimiento = $array_datos_beneficiario["fecha_nacimiento"];
    $edad = date("Y") - date("Y", strtotime($fecha_nacimiento));
    $correo_electronico = $array_datos_beneficiario["correo_electronico"] != "" ? $array_datos_beneficiario["correo_electronico"] : "";
    $dato_extra = $array_datos_beneficiario["dato_extra"];
    /** End Datos del beneficiario **/

    /** Datos de la tarjeta **/
    $array_tarjeta_titular = isset($_REQUEST['array_tarjeta_titular_incremento']) ? $_REQUEST['array_tarjeta_titular_incremento'] : [];
    $numero_tarjeta = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["numero_tarjeta"] : 0;
    $tipo_tarjeta = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["tipo_tarjeta"] : 0;
    $cvv_tarjeta = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["cvv_tarjeta"] : 0;
    $banco_emisor = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["banco_emisor"] : 0;
    $cedula_titular = (count($array_tarjeta_titular) > 0) ? $array_tarjeta_titular["cedula_titular"] : 0;
    $nombre_titular = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["nombre_titular"] : 0;
    $nombre_titular = (count($array_tarjeta_titular) > 0) ? $array_tarjeta_titular["nombre_titular"] : 0;
    $mes_vencimiento = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["mes_vencimiento"] : 0;
    $anio_vencimiento = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["anio_vencimiento"] : 0;
    $email_titular = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["email_titular"] : "";
    $tel_titular = "";
    if (count($array_tarjeta_titular) > 0) {
        $celular_tarjeta_titular = $array_tarjeta_titular["celular_titular"];
        $telefono_tarjeta_titular = $array_tarjeta_titular["telefono_titular"];
        $tel_titular =
            ($celular_tarjeta_titular != "" && $telefono_tarjeta_titular != "") ?
            "$celular_tarjeta_titular $telefono_tarjeta_titular" : (($celular_tarjeta_titular != "" && $telefono_tarjeta_titular == "") ? $celular : (($telefono_tarjeta_titular != "" && $telefono_tarjeta_titular == "") ? $telefono_tarjeta_titular : ""));
    }
    /** End Datos de la tarjeta **/

    $obtener_radio_ruta = obtener_radio_ruta($id_metodo_pago, $metodo_pago, $nombre_localidad);
    $cantidad_radio_ruta = mysqli_num_rows($obtener_radio_ruta);
    $resultados_radio_ruta = mysqli_fetch_assoc($obtener_radio_ruta);
    /*
    La ruta si es convenio con AJUPECS toma la ruta de la misma. Si no tiene convenio con AJUPECS y la localidad tiene varias rutas 
    se ingresa vació para que en comercial lo actualicen y si se tiene solo una ruta de esa localidad entonces se registra la misma.
    */
    //$ruta = ($convenio == "1373") ? "000AJUPECS" : (($cantidad_radio_ruta > 1) ? "" : $resultados_radio_ruta['ruta']);
    $ruta = $cantidad_radio_ruta > 1 ? "" : $resultados_radio_ruta['ruta'];
    $radio = $resultados_radio_ruta['radio'];

    $sucursal = "1372";
    $sucursal_cobranzas = $convenio != "" ? $convenio : $sucursal;
    $sucursal_cobranza_num = in_array($radio, ["1372", "13728"]) ? '1372' : '99';
    $empresa_marca = in_array($radio, ["1372", "13728"]) ? '18' : '99';
    $empresa_rut = "08";
    $id_relacion = in_array($id_metodo_pago, ["4", "5", "6", "7", "8", "9", "10"]) ? "99-$cedula" : "$empresa_rut-$cedula"; // Si es tarjeta 99-cedula
    $rutcentralizado = '08';
    $metodo_pago = obtener_metodo_pago($radio);

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
                sucursal_cobranza_num = '$sucursal_cobranza_num',
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
                metodo_pago = '$metodo_pago',
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
        registrar_errores($sql, "completar_afiliacion_incremento.php", $error);
        $consulta = false;
    }

    $resultados = $consulta ? mysqli_insert_id($conexion) : false;


    if ($convenio != "" && $resultados != false) {
        $id_convenio = obtener_id_convenio($convenio);
        if ($id_convenio == false) devolver_error("Ocurrieron errores al consultar el convenio");

        $registro_relacion_socio_convenio = registrar_relacion_socio_convenio($resultados, $id_convenio);
        if ($registro_relacion_socio_convenio == false) devolver_error("Ocurrieron errores al registrar el convenio");
    }


    mysqli_close($conexion);
    return $resultados;
}


/** Función para actualizar los datos del socio */
function modificar_padron_socios()
{
    $conexion = connection(DB, false);
    $tabla = TABLA_PADRON_DATOS_SOCIO;

    $observacion = $_REQUEST['observacion'];
    $id_metodo_pago = $_REQUEST['id_metodo_pago'];
    $metodo_pago = $_REQUEST['metodo_pago'];
    $importe_total = $_REQUEST['importe_total'];
    $convenio = $_REQUEST['convenio'];

    /** Datos del beneficiario **/
    $array_datos_beneficiario = $_REQUEST['array_datos_beneficiario_incremento'];
    $nombre_completo = $array_datos_beneficiario["nombre_completo"];
    $celular = $array_datos_beneficiario["celular"];
    $telefono_fijo = $array_datos_beneficiario["telefono_fijo"];
    $telefono_alternativo = $array_datos_beneficiario["telefono_alternativo"];
    $tel = "";
    if ($celular != "") $tel .= "$celular ";
    if ($telefono_fijo != "") $tel .= "$telefono_fijo ";
    if ($telefono_alternativo != "") $tel .= $telefono_alternativo;
    $tel = trim($tel);
    $cedula = $array_datos_beneficiario["cedula"];
    $direccion = $array_datos_beneficiario["direccion"];
    $id_localidad = $array_datos_beneficiario["id_localidad"];
    $nombre_localidad = $array_datos_beneficiario["nombre_localidad"];
    $fecha_nacimiento = $array_datos_beneficiario["fecha_nacimiento"];
    $edad = date("Y") - date("Y", strtotime($fecha_nacimiento));
    $correo_electronico = $array_datos_beneficiario["correo_electronico"] != "" ? $array_datos_beneficiario["correo_electronico"] : "";
    /** End Datos del beneficiario **/

    /** Datos de la tarjeta **/
    $array_tarjeta_titular = isset($_REQUEST['array_tarjeta_titular_incremento']) ? $_REQUEST['array_tarjeta_titular_incremento'] : [];
    $numero_tarjeta = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["numero_tarjeta"] : 0;
    $tipo_tarjeta = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["tipo_tarjeta"] : 0;
    $cvv_tarjeta = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["cvv_tarjeta"] : 0;
    $banco_emisor = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["banco_emisor"] : 0;
    $cedula_titular = (count($array_tarjeta_titular) > 0) ? $array_tarjeta_titular["cedula_titular"] : 0;
    $nombre_titular = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["nombre_titular"] : 0;
    $nombre_titular = (count($array_tarjeta_titular) > 0) ? $array_tarjeta_titular["nombre_titular"] : 0;
    $mes_vencimiento = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["mes_vencimiento"] : 0;
    $anio_vencimiento = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["anio_vencimiento"] : 0;
    $email_titular = count($array_tarjeta_titular) > 0 ? $array_tarjeta_titular["email_titular"] : "";
    $tel_titular = "";
    if (count($array_tarjeta_titular) > 0) {
        $celular_tarjeta_titular = $array_tarjeta_titular["celular_titular"];
        $telefono_tarjeta_titular = $array_tarjeta_titular["telefono_titular"];
        $tel_titular =
            ($celular_tarjeta_titular != "" && $telefono_tarjeta_titular != "") ?
            "$celular_tarjeta_titular $telefono_tarjeta_titular" : (($celular_tarjeta_titular != "" && $telefono_tarjeta_titular == "") ? $celular : (($telefono_tarjeta_titular != "" && $telefono_tarjeta_titular == "") ? $telefono_tarjeta_titular : ""));
    }
    /** End Datos de la tarjeta **/

    $obtener_radio_ruta = obtener_radio_ruta($id_metodo_pago, $metodo_pago, $nombre_localidad);
    $cantidad_radio_ruta = mysqli_num_rows($obtener_radio_ruta);
    $resultados_radio_ruta = mysqli_fetch_assoc($obtener_radio_ruta);
    /*
    La ruta si es convenio con AJUPECS toma la ruta de la misma. Si no tiene convenio con AJUPECS y la localidad tiene varias rutas 
    se ingresa vació para que en comercial lo actualicen y si se tiene solo una ruta de esa localidad entonces se registra la misma.
    */
    //$ruta = ($convenio == "1373") ? "000AJUPECS" : (($cantidad_radio_ruta > 1) ? "" : $resultados_radio_ruta['ruta']);
    $ruta = $cantidad_radio_ruta > 1 ? "" : $resultados_radio_ruta['ruta'];
    $radio = $cantidad_radio_ruta > 1 ? $resultados_radio_ruta['radio'][0] : $resultados_radio_ruta['radio'];

    $sucursal = "1372";
    $sucursal_cobranzas = $convenio != "" ? $convenio : $sucursal;
    $sucursal_cobranza_num = in_array($radio, ["1372", "13728"]) ? '1372' : '99';
    $empresa_marca = in_array($radio, ["1372", "13728"]) ? '18' : '99';
    $empresa_rut = "08";
    $id_relacion = in_array($id_metodo_pago, ["4", "5", "6", "7", "8", "9", "10"]) ? "99-$cedula" : "$empresa_rut-$cedula"; // Si es tarjeta 99-cedula
    $rutcentralizado = '08';
    $metodo_pago = obtener_metodo_pago($radio);

    try {
        $sql = "UPDATE {$tabla} SET
                 nombre = '$nombre_completo',
                 tel = '$tel',
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
                 sucursal_cobranza_num = '$sucursal_cobranza_num',
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
                 metodo_pago = '$metodo_pago',
                 cvv = '$cvv_tarjeta',
                 existe_padron = '1',
                 email = '$correo_electronico',
                 email_titular = '$email_titular',
                 tarjeta_vida = '0',
                 banco_emisor = '$banco_emisor',
                 accion = '4',
                 estado = '1',
                 localidad = '$id_localidad',
                 dato_extra = '3',
                 llamada_entrante = '0',
                 origen_venta = '0',
                 alta = '0',
                 es_admin = '0',
                 id_usuario = '0'
                WHERE
                 `cedula` = '$cedula'";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "completar_afiliacion_incremento.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}


/** Función para comprobar la dirección del socio */
function comprobar_direccion_socio()
{
    $conexion = connection(DB, false);
    $tabla = TABLA_DIRECCIONES_SOCIOS;

    $array_datos_beneficiario = $_REQUEST['array_datos_beneficiario_incremento'];
    $cedula = $array_datos_beneficiario["cedula"];

    try {
        $sql = "SELECT * FROM {$tabla} WHERE cedula_socio = '$cedula'";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "completar_afiliacion_incremento.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}


/** Función para registrar la dirección del socio */
function registrar_direccion_socio($id_socio_padron)
{
    $conexion = connection(DB, false);
    $tabla = TABLA_DIRECCIONES_SOCIOS;

    $array_datos_beneficiario = $_REQUEST['array_datos_beneficiario_incremento'];
    $cedula = $array_datos_beneficiario["cedula"];
    $calle = mysqli_real_escape_string($conexion, $array_datos_beneficiario["calle"]);
    $puerta = $array_datos_beneficiario["puerta"];
    $manzana = $array_datos_beneficiario["manzana"];
    $solar = $array_datos_beneficiario["solar"];
    $apartamento = $array_datos_beneficiario["apartamento"];
    $esquina = mysqli_real_escape_string($conexion, $array_datos_beneficiario["esquina"]);
    $referencia = mysqli_real_escape_string($conexion, $array_datos_beneficiario["referencia"]);

    try {
        $sql = "INSERT INTO {$tabla} SET 
                id_socio = '$id_socio_padron',
                calle = '$calle',
                puerta = '$puerta',
                manzana = '$manzana',
                solar = '$solar',
                apartamento = '$apartamento',
                esquina = '$esquina',
                referencia = '$referencia',
                cedula_socio = '$cedula'";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "completar_afiliacion_incremento.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}


/** Función para actualizar la dirección del socio */
function modificar_direccion_socio()
{
    $conexion = connection(DB, false);
    $tabla = TABLA_DIRECCIONES_SOCIOS;

    $array_datos_beneficiario = $_REQUEST['array_datos_beneficiario_incremento'];
    $cedula = $array_datos_beneficiario["cedula"];
    $calle = mysqli_real_escape_string($conexion, $array_datos_beneficiario["calle"]);
    $puerta = $array_datos_beneficiario["puerta"];
    $manzana = $array_datos_beneficiario["manzana"];
    $solar = $array_datos_beneficiario["solar"];
    $apartamento = $array_datos_beneficiario["apartamento"];
    $esquina = mysqli_real_escape_string($conexion, $array_datos_beneficiario["esquina"]);
    $referencia = mysqli_real_escape_string($conexion, $array_datos_beneficiario["referencia"]);

    try {
        $sql = "UPDATE {$tabla} SET 
                 calle = '$calle', 
                 puerta = '$puerta', 
                 apartamento = '$apartamento', 
                 manzana = '$manzana', 
                 solar = '$solar', 
                 esquina = '$esquina', 
                 referencia = '$referencia' 
                WHERE 
                 cedula_socio = '$cedula'";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "completar_afiliacion_incremento.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}


/** Función para agregar los productos */
function agregar_padron_producto_socios($observacion, $id_metodo_pago)
{
    $conexion = connection(DB, false);
    $tabla = TABLA_PADRON_PRODUCTO_SOCIO;

    $datos_beneficiario = $_REQUEST['array_datos_beneficiario_incremento'];
    $cedula = $datos_beneficiario['cedula'];
    $fecha_nacimiento = $datos_beneficiario['fecha_nacimiento'];
    $edad = date("Y") - date("Y", strtotime($fecha_nacimiento));

    $array_servicios = $_REQUEST['array_servicios_agregados_incremento'];
    $errores = 0;
    //Recorro los servicios
    foreach ($array_servicios as $servicios) {
        $id_servicio = $servicios['numero_servicio'];
        $numeros_servicio = obtener_numeros_servicio($id_servicio);
        $cantidad_horas = $servicios['cantidad_horas'] != "" ? $servicios['cantidad_horas'] : 8;
        $modulos_horas = $cantidad_horas == 8 ? 1 : ($cantidad_horas == 16 ? 2 : 3);
        $promo_estaciones = $servicios['promo_estaciones'];
        $numero_promo = obtener_datos_promocion($servicios['numero_promo']);
        $total_importe = $servicios['total_importe'];
        $total_importe = $total_importe != "false" ? $total_importe : calcular_precio_servicio($edad, $id_servicio, $cantidad_horas, $promo_estaciones, $total_importe);
        $empresa_rut = "05";
        $id_relacion = in_array($id_metodo_pago, ["4", "5", "6", "7", "8", "9", "10"]) ? "99-$cedula" : "$empresa_rut-$cedula"; // Si es tarjeta 99-cedula


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
                    abm = 'ALTA-PRODUCTO',
                    abmactual = '1',
                    usuario = '0',
                    usuariod = '0',
                    extra = '0',
                    nomodifica = '0',
                    precioOriginal = '$total_importe',
                    abitab = '0',
                    id_padron = '0',
                    accion = '1',
                    cedula_titular_gf = NULL";
                    $consulta = mysqli_query($conexion, $sql);
                } catch (\Throwable $error) {
                    registrar_errores($sql, "completar_afiliacion_incremento.php", $error);
                    $errores++;
                }
            }
        }
    }

    return $errores > 0 ? false : true;
}
