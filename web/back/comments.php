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

$input = json_decode(file_get_contents('php://input'), true);

// Récupérer le userId envoyé par le client
$userId = isset($input['userId']) ? $input['userId'] : null;

if (!empty($userId)) {
    // Récupérer les commentaires de l'utilisateur
    $stmt = $pdo->prepare("SELECT c.TEXTE, comp.PSEUDO, comp.URLIMAGECOMPTE, p.DESCRIPTION, p.URLIMAGE
                            FROM COMMENTAIRE c
                            JOIN POST p ON p.IDPOST = c.IDPOST
                            JOIN COMPTE comp ON comp.IDCOMPTE = p.IDCOMPTE
                            WHERE c.IDCOMPTE = ?");
    $stmt->execute([$userId]);
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($comments);  // Retourne les commentaires au format JSON
}