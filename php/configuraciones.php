<?php

if (session_status() !== PHP_SESSION_ACTIVE)    session_start();

date_default_timezone_set('America/Montevideo');

define("PATH_APP", __DIR__);

const PRODUCCION = false; // para definir si es test o produccion la APP
const PROTOCOL = "https";
const SERVER = PRODUCCION ? "vida-apps.com" : "vida-apps.com";
const APP = PRODUCCION ? "motor_precios_inspira" : "motor_precios_inspira";
const URL_APP = PROTOCOL . "://" . SERVER . "/" . APP;
const URL_AJAX = URL_APP . "/" . "php/ajax/";

error_reporting(PRODUCCION ? 0 : E_ALL);

//HEADERS
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: GET, POST');
//header('Access-Control-Allow-Origin: *');


const PATH_FUNCIONEs = "modelos/";

//DB Conexiones
include_once PATH_APP . "/db.php";

//FUNCIONES
include_once PATH_APP . "/funciones.php";

//LOGS
const LOGS_DIR = PATH_APP . "../logs";

//Utils /Functions
//include_once "utils.php";


// DB PRODUCCION
const DB_PROD        = array("host" => "192.168.13.10", "user" => "root", "password" => "sist.2k8", "db" => "motor_de_precios_inspira");
const DB_CALL_PROD   = array("host" => "192.168.1.13", "user" => "root", "password" => "sist.2k8", "db" => "call");
const DB_ABMMOD_PROD = array("host" => "192.168.1.250", "user" => "root", "password" => "sist.2k8", "db" => "abmmod");


//DEV O DB TEST
const DB_TEST        = array("host" => "192.168.13.10", "user" => "root", "password" => "sist.2k8", "db" => "motor_de_precios_inspira");
const DB_CALL_TEST   = array("host" => "192.168.1.13", "user" => "root", "password" => "sist.2k8", "db" => "call");
const DB_ABMMOD_TEST = array("host" => "192.168.1.250", "user" => "root", "password" => "sist.2k8", "db" => "abmmod");


//BD PROD O TEST
const DB        = PRODUCCION ? DB_PROD        : DB_TEST;
const DB_CALL   = PRODUCCION ? DB_CALL_PROD   : DB_CALL_TEST;
const DB_ABMMOD = PRODUCCION ? DB_ABMMOD_PROD : DB_ABMMOD_TEST;



//TABLAS BD

//SERVER - 250
const TABLA_PADRON_DATOS_SOCIO       = "padron_datos_socio";
const TABLA_DIRECCIONES_SOCIOS       = "direcciones_socios";
const TABLA_PADRON_PRODUCTO_SOCIO    = "padron_producto_socio";

//SERVER - 13.10
const TABLA_LISTA_DE_PRECIOS         = "lista_de_precios";
const TABLA_LOCALIDADES              = "localidades";
const TABLA_PROMOCIONES              = "promociones";
const TABLA_SERVICIOS_PROMOS         = "servicio_promos";
const TABLA_SERVICIOS                = "servicios";
const TABLA_PRECIOS_PROMO_ESTACIONES = "precios_promo_estaciones";
const TABLA_METODOS_DE_PAGO          = "metodos_de_pago";
const TABLA_NUMEROS                  = "numeros";
const TABLA_NUMEROS_SERVICIOS        = "numeros_servicios";
const TABLA_BANCOS_EMISORES          = "bancos_emisores";
const TABLA_CONVENIOS                = "convenios";
const TABLA_RUTAS_COBRADOR           = "rutas_cobrador";
const TABLA_BAJAS                    = "bajas";
const TABLA_LOG_ERRORES              = "log_errores";




//HASH o TOKEN
//include_once "token.php";

//MENESAJES 
const ERROR_GENERAL         = "Ha ocurrido un error, comuniquese con el administrador";
const ERROR_AL_MODIFICAR    = "Error al intentar modificar el registro";
const EXITO_AL_MODIFICAR    = "Se modifico el registro con éxito";
const EXITO_AL_REGISTRAR    = "Se ha registrado con éxito";
const SIN_REGISTROS         = "No se han encontrado registros";
const ERROR_CREAR_TABLA     = "Error al crear la tabla";
const ERROR_VACIAR_TABLA    = "Error al vaciar la tabla";
