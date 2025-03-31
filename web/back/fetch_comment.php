<?php
$host = 'db';  // Nom du service PostgreSQL dans Docker Compose
$dbname = 'mydb';
$user = 'myuser';
$password = 'mypassword';

header("Content-Type: application/json"); // On envoie une réponse JSON

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) { 
    echo json_encode(["success" => false, "message" => "Erreur BD : " . $e->getMessage()]);
    exit;
}

$idpost = $_GET['idpost'] ?? null;

if ($idpost) {
    // Connexion à la base de données
    $pdo = new PDO("pgsql:host=db;dbname=mydb", "myuser", "mypassword");

    // Récupérer les commentaires liés au post
    $stmt = $pdo->prepare("SELECT * FROM COMMENTAIRE p LEFT JOIN compte c ON p.IDCOMPTE = c.IDCOMPTE where p.IDPOST= ?");
    $stmt->execute([$idpost]);
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($comments);
} else {
    echo json_encode(["success" => false, "message" => "ID du post manquant"]);
}
