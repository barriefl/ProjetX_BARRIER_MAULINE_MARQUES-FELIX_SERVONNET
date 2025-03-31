<?php
// Fonction pour se connecter à la base de données
function connectToDatabase() {
    $host = 'db';
    $dbname = 'mydb';
    $user = 'myuser';
    $password = 'mypassword';

    try {
        $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("Erreur de connexion à la base de données : " . $e->getMessage());
    }
}

// Fonction pour récupérer les posts
function fetchPosts($pdo) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM POST");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        throw new Exception("Erreur lors de la récupération des posts : " . $e->getMessage());
    }
}

// Connexion à la base de données
$pdo = connectToDatabase();

// Récupération des posts
try {
    $posts = fetchPosts($pdo);
    // Renvoie les données sous forme de JSON
    header('Content-Type: application/json');
    echo json_encode($posts);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
