<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/db.php';
include_once '../models/users.php';

$database = new Database();
$db = $database->getConnection();

$users = new Users($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->nombre) &&
    !empty($data->email)
) {
    $users->nombre = $data->nombre;
    $users->email = $data->email;

    if ($users->crear()) {
        http_response_code(201);
        echo json_encode(array("mensaje" => "Usuario creado exitosamente."));
    } else {
        http_response_code(503);
        echo json_encode(array("mensaje" => "No se pudo crear el usuario."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("mensaje" => "Datos incompletos. No se pudo crear el usuario."));
}
?>
