<?php
    // Atributos de la bbdd
    $host = "localhost";
    $usuario = "adri";
    $contrasena = "nA2T76xH3r9";
    $base_de_datos = "sudoku";

    // Conexión a la bbdd
    $conexion = new mysqli($host, $usuario, $contrasena, $base_de_datos);

    // Comprobar conexión
    if ($conexion->connect_error) {
        die("Error de conexión a la base de datos: " . $conexion->connect_error);
    }
?>