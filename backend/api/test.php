<?php
include_once '../config/db.php';

$database = new Database();
$db = $database->getConnection();

if($db) {
    echo "Conexión exitosa a la base de datos.";
} else {
    echo "No se pudo conectar a la base de datos.";
}
?>
