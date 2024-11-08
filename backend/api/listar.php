<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/db.php';
include_once '../models/users.php';

$database = new Database();
$db = $database->getConnection();

$users = new Users($db);

$stmt = $users->listar();
$num = $stmt->rowCount();

if($num > 0) {
    $users_arr = array();
    $users_arr["users"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $users_item = array(
            "id" => $id,
            "nombre" => $nombre,
            "email" => $email
        );

        array_push($users_arr["users"], $users_item);
    }

    http_response_code(200);

    echo json_encode($users_arr);
} else {
    http_response_code(404);

    echo json_encode(array("mensaje" => "No se encontraron usuarios."));
}
?>
