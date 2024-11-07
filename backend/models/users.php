<?php
class users {
    private $conn;
    private $tabla = "users";

    public $id;
    public $nombre;
    public $email;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function listar() {
        $query = "SELECT id, nombre, email FROM " . $this->tabla . " ORDER BY nombre";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    

}
?>
