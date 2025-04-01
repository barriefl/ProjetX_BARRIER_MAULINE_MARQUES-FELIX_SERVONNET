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

$data = json_decode(file_get_contents("php://input"));
$text = $data->text;

    // Récupérer les posts likés par l'utilisateur
    $stmt = $pdo->prepare("SELECT * 
                            FROM POST p
                            LEFT JOIN compte c ON p.IDCOMPTE = c.IDCOMPTE
                            WHERE p.DESCRIPTION like ? ");
    
    $stmt->execute([$text]);
    $postrecherche = $stmt->fetchAll(PDO::FETCH_ASSOC);    
    echo json_encode($postrecherche);
