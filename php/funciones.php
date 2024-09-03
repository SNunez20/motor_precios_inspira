<?php

/** Registrar errores en la base de datos **/
function registrar_errores($consulta, $nombre_archivo, $error)
{
    $conexion = connection(DB);
    $tabla = TABLA_LOG_ERRORES;

    $consulta = str_replace("'", '"', $consulta);
    $error = str_replace("'", '"', $error);

    $sql = "INSERT INTO {$tabla} (consulta, nombre_archivo, error, fecha_registro) VALUES ('$consulta', '$nombre_archivo', '$error', NOW())";
    $consulta = mysqli_query($conexion, $sql);

    mysqli_close($conexion);
    return $consulta;
}


/** Obtener datos de padron del socio **/
function obtener_datos_padron_del_socio($cedula)
{
    $conexion = connection(DB_ABMMOD);
    $tabla = TABLA_PADRON_DATOS_SOCIO;

    try {
        $sql = "SELECT * FROM {$tabla} WHERE cedula = '$cedula' ORDER BY id DESC LIMIT 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "funciones.php", $error);
        $consulta = false;
    }

    $resultados = $consulta ? mysqli_fetch_assoc($consulta) : false;

    mysqli_close($conexion);
    return $resultados;
}


/** Obtener datos de padron del socio **/
function obtener_productos_del_socio($cedula)
{
    $conexion = connection(DB_ABMMOD);
    $tabla = TABLA_PADRON_PRODUCTO_SOCIO;

    try {
        $sql = "SELECT * FROM {$tabla} WHERE cedula = '$cedula' ORDER BY id DESC LIMIT 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "funciones.php", $error);
        $consulta = false;
    }

    $resultados = $consulta ? mysqli_fetch_assoc($consulta) : false;

    mysqli_close($conexion);
    return $resultados;
}


function obtener_numeros_servicio($id_servicio)
{
    $conexion = connection(DB);
    $tabla = TABLA_NUMEROS_SERVICIOS;

    try {
        $sql = "SELECT numero_servicio FROM {$tabla} WHERE id_servicio = '$id_servicio' AND activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "funciones.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}


function obtener_radio_ruta($id_metodo_pago, $metodo_pago, $nombre_localidad)
{
    $conexion = connection(DB);
    $tabla = TABLA_RUTAS_COBRADOR;

    $where = $id_metodo_pago == 3 ? $nombre_localidad : $metodo_pago;

    try {
        $sql = "SELECT * FROM {$tabla} WHERE localidad = '$where'";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "funciones.php", $error);
        $consulta = false;
    }

    mysqli_close($conexion);
    return $consulta;
}


function obtener_precio_promo_estacion($cantidad_horas)
{
    $conexion = connection(DB);
    $tabla = TABLA_PRECIOS_PROMO_ESTACIONES;

    try {
        $sql = "SELECT precio FROM {$tabla} WHERE horas = '$cantidad_horas' AND activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "funciones.php", $error);
        $consulta = false;
    }

    $resultado = $consulta != false ? mysqli_fetch_assoc($consulta) : false;

    mysqli_close($conexion);
    return $resultado;
}


function obtener_datos_promocion($id_promocion)
{
    $conexion = connection(DB);
    $tabla = TABLA_PROMOCIONES;

    try {
        $sql = "SELECT numero_promo FROM {$tabla} WHERE id = '$id_promocion' AND activo = 1 LIMIT 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "funciones.php", $error);
        $consulta = false;
    }

    $resultado = $consulta != false ? mysqli_fetch_assoc($consulta)['numero_promo'] : false;

    mysqli_close($conexion);
    return $resultado;
}


function calcular_precios($numero_servicio, $cantidad_horas, $edad)
{
    $conexion = connection(DB);
    $tabla = TABLA_LISTA_DE_PRECIOS;

    $where = "";
    if (in_array($numero_servicio, [1, 2])) {
        $where = $edad < 65 ? "AND $edad BETWEEN edad_desde AND edad_hasta" : "AND edad_desde > 65";
    }

    try {
        $sql = "SELECT precio FROM {$tabla} WHERE id_servicio = '$numero_servicio' AND horas = '$cantidad_horas' $where AND activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "funciones.php", $error);
        $consulta = false;
    }

    $resultado = $consulta != false ? mysqli_fetch_assoc($consulta) : false;

    mysqli_close($conexion);
    return $resultado;
}


function obtener_precio_servicio($numero_servicio, $cantidad_horas)
{
    $conexion = connection(DB);
    $tabla = TABLA_LISTA_DE_PRECIOS;

    try {
        $sql = "SELECT precio FROM {$tabla} WHERE id_servicio = '$numero_servicio' AND horas = '$cantidad_horas' AND activo = 1";
        $consulta = mysqli_query($conexion, $sql);
    } catch (\Throwable $error) {
        registrar_errores($sql, "funciones.php", $error);
        $consulta = false;
    }

    $resultado = $consulta != false ? mysqli_fetch_assoc($consulta) : false;

    mysqli_close($conexion);
    return $resultado;
}


function calcular_precio_servicio($edad, $id_servicio, $cantidad_horas, $promo_estaciones, $total_importe)
{
    if ($total_importe != "false") {
        $obtener_datos_motor_precios['precio'] = $total_importe;
    } else {
        if ($promo_estaciones != "false") {
            $obtener_datos_motor_precios = obtener_precio_promo_estacion($cantidad_horas);
        } else {
            $obtener_datos_motor_precios = $cantidad_horas != "" ?
                calcular_precios($id_servicio, $cantidad_horas, $edad) :
                obtener_precio_servicio($id_servicio, $cantidad_horas);
        }
    }

    return $obtener_datos_motor_precios['precio'];
}





/*
-----------------------------------------------------------------
----------------    Funciones Complementarias    ----------------
-----------------------------------------------------------------
*/


/** Carga los archivos de un directorio especificado, también se obtienen los archivos de los sub directorios **/
function cargar_archivos_desde_ruta($ruta)
{
    $listado = glob("$ruta/*");
    foreach ($listado as $ruta_archivo) {
        $array = explode("/", $ruta_archivo);
        $directorios_y_archivos = $array[4];
        /** Obtenemos la extensión de los resultados para saber si hay archivos **/
        $info = new SplFileInfo($directorios_y_archivos);
        $extension = $info->getExtension();

        if ($extension == "html" || $extension == "php") {
            /** Si es html o php lo incluimos **/
            include_once("$ruta_archivo");
        } else if ($extension == "js") {
            /** Si es js lo incluimos **/
            echo "<script src='$ruta_archivo'></script>";
        } else {
            $listado2 = glob("$ruta_archivo/*");
            foreach ($listado2 as $ruta_archivo2) {
                include_once("$ruta_archivo2");
            }
        }
    }
}


/** Saber si esta en producción mediante la url **/
function comprobar_produccion_con_url()
{
    $url = $_SERVER['REQUEST_URI'];
    $array = explode("/", $url);

    return $array[1];
}


/** Obtener el primer celular o número teléfonico de un string **/
function buscarNumero($numeros)
{
    if ($numeros == "") {
        $respuesta = false;
    } else {

        $primer_numero = substr($numeros, 0, 1);
        $primeros_dos_numeros = substr($numeros, 0, 2);

        if ($primeros_dos_numeros == "09" && strlen($numeros) > 8) {
            $respuesta = substr($numeros, 0, 9);
        } else if (($primer_numero == "2" || $primer_numero == "4") && strlen($numeros) > 7) {
            $respuesta = substr($numeros, 0, 8);
        }
    }

    return $respuesta == "" ? "0" : $respuesta;
}


/** Verificar si el string esta vacío **/
function verificar_letras($cadena)
{
    if (preg_match("/^(?=.{3,18}$)[a-zñA-ZÑ](\s?[a-zñA-ZÑ])*$/", $cadena)) {
        $respuesta = true;
    } else {
        $respuesta = false;
    }

    return $respuesta;
}


/** Generar color random **/
function randomColor()
{
    $str = "#";
    for ($i = 0; $i < 6; $i++) {
        $randNum = rand(0, 15);
        switch ($randNum) {
            case 10:
                $randNum = "A";
                break;
            case 11:
                $randNum = "B";
                break;
            case 12:
                $randNum = "C";
                break;
            case 13:
                $randNum = "D";
                break;
            case 14:
                $randNum = "E";
                break;
            case 15:
                $randNum = "F";
                break;
        }
        $str .= $randNum;
    }
    return $str;
}


/** Reemplazar acento en string **/
function remplazarAcentos($texto)
{
    //  $texto_parseado = eliminarAcentos($texto);
    $texto_parseado = $texto;

    $remplazar_array = array(
        "'" => '',
        '"' => ' ',
        '`' => ' ',
        '`' => '',
        'Š' => 'S',
        'š' => 's',
        'Ž' => 'Z',
        'ž' => 'z',
        'À' => 'A',
        'Á' => 'A',
        'Â' => 'A',
        'Ã' => 'A',
        'Ä' => 'A',
        'Å' => 'A',
        'Æ' => 'A',
        'Ç' => 'C',
        'È' => 'E',
        'É' => 'E',
        'Ê' => 'E',
        'Ë' => 'E',
        'Ì' => 'I',
        'Í' => 'I',
        'Î' => 'I',
        'Ï' => 'I',
        'Ò' => 'O',
        'Ó' => 'O',
        'Ô' => 'O',
        'Õ' => 'O',
        'Ö' => 'O',
        'Ø' => 'O',
        'Ù' => 'U',
        'Ú' => 'U',
        'Û' => 'U',
        'Ü' => 'U',
        'Ý' => 'Y',
        'Þ' => 'B',
        'ß' => 'Ss',
        'à' => 'a',
        'á' => 'a',
        'â' => 'a',
        'ã' => 'a',
        'ä' => 'a',
        'å' => 'a',
        'æ' => 'a',
        'ç' => 'c',
        'è' => 'e',
        'é' => 'e',
        'ê' => 'e',
        'ë' => 'e',
        'ì' => 'i',
        'í' => 'i',
        'î' => 'i',
        'ï' => 'i',
        'ð' => 'o',
        'ò' => 'o',
        'ó' => 'o',
        'ô' => 'o',
        'õ' => 'o',
        'ö' => 'o',
        'ø' => 'o',
        'ù' => 'u',
        'ú' => 'u',
        'û' => 'u',
        'ý' => 'y',
        'þ' => 'b',
        'ÿ' => 'y',
        'Ñ' => 'N',
        'ñ' => 'n',
        '°' => ' ',
        'Â' => ' ',
        'â' => 'a',
        '™' => ' ',
        '€' => '',
        'Âº' => '',
        '/' => '/'
    );

    $texto_parseado = strtr($texto_parseado, $remplazar_array);
    $texto_parseado = preg_replace('([^A-Za-z0-9 ])', '', $texto_parseado);
    return $texto_parseado;
}


/** Eliminar acento en string **/
function eliminarAcentos($cadena)
{
    $especial = @utf8_decode('ÁÀÂÄáàäâªÉÈÊËéèëêÍÌÏÎíìïîÓÒÖÔóòöôÚÙÛÜúùüûÑñÇç³€™º');
    $reemplazar = @utf8_decode('AAAAaaaaaEEEEeeeeIIIIiiiiOOOOooooUUUUuuuuNnCcA    ');
    for ($i = 0; $i <= strlen($cadena); $i++) {
        for ($f = 0; $f < strlen($especial); $f++) {
            $caracteri = substr($cadena, $i, 1);
            $caracterf = substr($especial, $f, 1);
            if ($caracteri === $caracterf) {
                $cadena = substr($cadena, 0, $i) . substr($reemplazar, $f, 1) . substr($cadena, $i + 1);
            }
        }
    }
    return  $cadena;
}


/** Términa el proceso y devuelve el error expecificado **/
function devolver_error($mensaje)
{
    $response['error'] = true;
    $response['mensaje'] = $mensaje;
    die(json_encode($response));
}


/** Genera un hash con el largo requerido **/
function generarHash($largo)
{
    $caracteres_permitidos = '0123456789abcdefghijklmnopqrstuvwxyz';
    return substr(str_shuffle($caracteres_permitidos), 0, $largo);
}


//Controlar extención de un array de archivos
function controlarExtension($files, $tipo)
{
    $validar_extension = $tipo;
    $valido = 0;
    for ($i = 0; $i < count($files["name"]); $i++) {
        $extension_archivo = strtolower(pathinfo(basename($files["name"][$i]), PATHINFO_EXTENSION));

        if (in_array($extension_archivo, $validar_extension)) {
            $valido++;
        } else {
            $valido = 0;
        }
    }
    return $valido;
}


//Suma un array de numeros
function sumar_array($array_numeros)
{
    $total_suma = 0;
    foreach ($array_numeros as $numero) {
        $total_suma = $total_suma + $numero;
    }
    return $total_suma;
}


/** Busca y devuelve el primer número de celular encontrado en el string **/
function buscarCelular($numeros)
{
    preg_match_all('/(09)[1-9]{1}\d{6}/x', $numeros, $respuesta);
    $respuesta = (count($respuesta[0]) !== 0) ? $respuesta[0] : false;
    return $respuesta;
}


function corregir_acentos($texto)
{
    $remplazar_array = [
        "'" => '',
        '"' => ' ',
        '`' => ' ',
        '`' => '',
        "Âº" => "°",
        "NÂª" => "N°",
        "Ã‘" => "Ñ",
        "Ã±" => "ñ",
        "ï¿½" => "Ñ",
        "Ã‰" => "É",
        "Ã©" => "é",
        "JOS?" => "JOSÉ",
        "Ãˆ" => "É",
        "Ã" => "Í",
        "Ã" => "í",
        "ÃŒ" => "í",
        "Ã¬" => "Í",
        "Ã" => "Á",
        "Ã¡" => "Á",
        "Ã€" => "Á",
        "Ã³" => "ó",
        'Ã“' => "Ó",
        "Ã’" => "Ó",
        "N?" => "Ú",
        "Ãº" => "Ú",
        "Ãš" => "Ú",
    ];

    $texto = strtr($texto, $remplazar_array);
    return strtoupper($texto);
}


function texto_con_boton_ver_mas($campo, $largo)
{
    $largo = intval($largo);
    if (strlen($campo) > $largo) {
        $br  = array("<br />", "<br>", "<br/>");
        $campo = str_ireplace($br, "\r\n", $campo);

        $campo_sin_editar = mb_convert_encoding($campo, 'UTF-8', 'UTF-8');
        $campo = substr($campo, 0, $largo) . " ...<button class='btn btn-link btn-sm' onclick='verMasTabla(`" . $campo_sin_editar . "`);'> Ver Más</button>";
        $campo = mb_convert_encoding($campo, 'UTF-8', 'UTF-8');
    }
    return $campo;
}
