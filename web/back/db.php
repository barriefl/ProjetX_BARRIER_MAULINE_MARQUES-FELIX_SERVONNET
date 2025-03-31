<?php
$host = 'db';  // Nom du service PostgreSQL dans Docker Compose
$dbname = 'mydb';
$user = 'myuser';
$password = 'mypassword';

header("Content-Type: application/json"); // On envoie une réponse JSON

// Fonction pour se connecter à la base de données
function connectToDatabase($host, $dbname, $user, $password) {
    try {
        $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Erreur BD : " . $e->getMessage()]);
        exit;
    }
}

// Fonction pour récupérer les posts
function fetchPosts($pdo) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM POST");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Erreur lors de la récupération des posts : " . $e->getMessage()]);
        exit;
    }
}

// Connexion à la base de données
$pdo = connectToDatabase($host, $dbname, $user, $password);

// Récupération des posts
$posts = fetchPosts($pdo);
echo json_encode(["success" => true, "data" => $posts]);
?>
