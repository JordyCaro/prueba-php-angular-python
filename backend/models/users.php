<?php
class Users {
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
    
    public function crear() {
        $query = "INSERT INTO " . $this->tabla . " SET nombre=:nombre, email=:email";

        $stmt = $this->conn->prepare($query);

        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->email = htmlspecialchars(strip_tags($this->email));

        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":email", $this->email);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function actualizar() {
        $query = "UPDATE " . $this->tabla . " SET nombre = :nombre, email = :email WHERE id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->id = htmlspecialchars(strip_tags($this->id));
    
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":id", $this->id);
    
        if($stmt->execute()) {
            return true;
        }
    
        return false;
    }

    public function eliminar() {
        $query = "DELETE FROM " . $this->tabla . " WHERE id = ?";
    
        $stmt = $this->conn->prepare($query);
    
        $this->id = htmlspecialchars(strip_tags($this->id));
    
        $stmt->bindParam(1, $this->id);
    
        if($stmt->execute()) {
            return true;
        }
    
        return false;
    }

}
?>