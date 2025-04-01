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
    // Récupérer les retweets de l'utilisateur
    $stmt = $pdo->prepare("SELECT p.IDPOST, p.DESCRIPTION, p.URLIMAGE, c.PSEUDO, c.URLIMAGECOMPTE 
                            FROM A_RETWEET a
                            JOIN POST p ON p.IDPOST = a.IDPOST
                            JOIN COMPTE c ON c.IDCOMPTE = p.IDCOMPTE
                            WHERE a.IDCOMPTE = ?");
    $stmt->execute([$userId]);
    $retweets = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($retweets);  // Retourne les retweets au format JSON
}