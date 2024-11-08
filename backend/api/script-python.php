<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$pythonScript = '../../python/script-python.py'; 

exec("python3 " . escapeshellcmd($pythonScript), $output, $return_var);

if ($return_var === 0) {
    $jsonFiles = glob("../../python/crypto_prices_*.json"); 
    usort($jsonFiles, function($a, $b) {
        return filemtime($b) - filemtime($a); 
    });

    $latestFile = !empty($jsonFiles) ? $jsonFiles[0] : null;

    if ($latestFile && file_exists($latestFile)) {
        $jsonData = file_get_contents($latestFile);
        echo $jsonData;
    } else {
        http_response_code(500);
        echo json_encode(array("mensaje" => "No se pudo encontrar el archivo JSON generado."));
    }
} else {
    http_response_code(500);
    echo json_encode(array("mensaje" => "Error al ejecutar el script de Python."));
}
?>
