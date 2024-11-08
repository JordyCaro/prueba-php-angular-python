# Aplicación Web Completa: Angular, PHP y Python

Este proyecto es una aplicación web completa que consiste en un **backend en PHP** para la gestión de datos, un **frontend en Angular** que consume los servicios de backend, y un **script en Python** que interactúa con una API externa y procesa datos.

## Estructura del Proyecto

- **Backend (PHP)**: Proporciona una API para operaciones CRUD (Create, Read, Update, Delete) de usuarios. Este backend también expone un endpoint para ejecutar un script en Python y obtener datos de criptomonedas.
- **Frontend (Angular)**: Permite la gestión de usuarios (listar, agregar, editar y eliminar) y muestra los datos generados por el script Python.
- **Script (Python)**: Se conecta a la API de CoinGecko para obtener precios de criptomonedas y guarda los datos en un archivo JSON. El backend PHP ejecuta este script y retorna el contenido del JSON al frontend.

## Configuración y Ejecución

### Prerrequisitos

1. **PHP** (versión 7.4 o superior).
2. **MySQL** (o cualquier base de datos compatible).
3. **XAMPP** (opcional, para configurar el servidor PHP en local).
4. **Node.js** (versión 14 o superior).
5. **Angular CLI**.
6. **Python** (versión 3.6 o superior).

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/JordyCaro/prueba-php-angular-python.git
```
```bash
cd nombre_del_repositorio
```
### Paso 2: Configuración del Backend (PHP)
Configurar el Servidor:

Si estás usando XAMPP, copia el backend a la carpeta htdocs de XAMPP y asegúrate de que Apache y MySQL estén ejecutándose.
Si usas otro servidor, asegúrate de que los archivos PHP estén accesibles.
Base de Datos:

Crea una base de datos en MySQL (por ejemplo, app_db).
Importa el archivo database.sql (si está disponible) para crear la tabla users.
Configurar Conexión a la Base de Datos:

Edita el archivo config/db.php con tus credenciales de base de datos:

```bash
php
<?php
class Database {
    private $host = "localhost";
    private $db_name = "app_db";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
```
Probar la API:

Navega a http://localhost/backend/api/listar.php para verificar que el backend esté funcionando.
Paso 3: Configuración del Frontend (Angular)
Instalar Dependencias:

```bash
cd frontend
npm install
```
Iniciar la Aplicación Angular:

```bash
ng serve 
```
Esto abrirá la aplicación en el navegador en http://localhost:4200.

### Paso 4: Configuración del Script en Python
Configurar el Entorno Python:

Asegúrate de tener Python instalado.
Instala las dependencias necesarias (si tuvieras alguna librería específica en el script).
Ubicación del Script:

Probar el Script en Python:

Puedes ejecutar el script directamente para verificar que funciona:

```bash
python3 python-script.py
```
El script generará un archivo JSON con los precios de criptomonedas en la misma carpeta.

Funcionalidades
Gestión de Usuarios:

Desde el frontend Angular, puedes agregar, editar, eliminar y listar usuarios. Las operaciones están conectadas al backend PHP.
Ejecución del Script de Criptomonedas:

En la página de lista de usuarios, encontrarás un botón que dice "Mostrar Precios de Criptomonedas". Al hacer clic en este botón, el frontend hace una solicitud al backend PHP, el cual ejecuta el script Python y devuelve los datos de precios en tiempo real.

Prueba del Funcionamiento
Abrir la Aplicación Angular en http://localhost:4200.
Gestión de Usuarios:
En la página principal, puedes agregar, editar y eliminar usuarios.
Mostrar Precios de Criptomonedas:
Haz clic en el botón "Mostrar Precios de Criptomonedas" en la lista de usuarios para ejecutar el script Python y ver el resultado JSON.
Notas
Asegúrate de que el backend PHP tenga permisos para ejecutar scripts Python.
Si encuentras problemas de CORS, revisa que los encabezados CORS estén configurados correctamente en los archivos PHP.
El script Python puede necesitar permisos de escritura en la carpeta scripts para generar archivos JSON.
Créditos
Este proyecto fue desarrollado para demostrar la integración de un frontend en Angular, un backend en PHP y un script en Python para procesar datos de una API externa.

---

Este archivo `README.md` proporciona una descripción completa del proyecto, su estructura, la configuración y los pasos necesarios para que cualquier persona pueda entender y ejecutar la prueba.
