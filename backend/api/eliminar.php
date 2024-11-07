<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/db.php';
include_once '../models/users.php';

$database = new Database();
$db = $database->getConnection();

$users = new Users($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id)) {
    $users->id = $data->id;

    if($users->eliminar()) {
        http_response_code(200);
        echo json_encode(array("mensaje" => "Usuario eliminado exitosamente."));
    } else {
        http_response_code(503);
        echo json_encode(array("mensaje" => "No se pudo eliminar el usuario."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("mensaje" => "Datos incompletos. No se pudo eliminar el usuario."));
}
?>
