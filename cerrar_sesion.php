<?php
session_start();

unset($_SESSION["mpi_id_vendedor"]);
unset($_SESSION["mpi_cedula_vendedor"]);
unset($_SESSION["mpi_nombre_vendedor"]);
unset($_SESSION["mpi_grupo_vendedor"]);

header('Location: index.php');
