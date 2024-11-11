<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$pythonScript = 'python/python-script.py'; 

$output = [];
$return_var = null;

exec("python3 " . escapeshellcmd($pythonScript), $output, $return_var);

    $prices = array_filter($output, function($line) {
        return preg_match('/^(Bitcoin|Ethereum):/', $line);
    });
    
    $pricesData = [];
    foreach ($prices as $line) {
        list($name, $price) = explode(":", $line);
        $pricesData[trim($name)] = trim($price);
    }

    echo json_encode(array("precios" => $pricesData));
?>
