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
$userId = $data->userId;

if (!empty($userId)) {
    // Récupérer les posts likés par l'utilisateur
    $stmt = $pdo->prepare("SELECT p.DESCRIPTION, p.URLIMAGE, c.PSEUDO, c.URLIMAGECOMPTE, p.compteurlike, p.idpost
                            FROM A_LIKE a
                            JOIN POST p ON p.IDPOST = a.IDPOST
                            JOIN COMPTE c ON c.IDCOMPTE = p.IDCOMPTE
                            WHERE a.IDCOMPTE = ?");
    $stmt->execute([$userId]);
    $likes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($likes);  // Retourne les likes au format JSON
}
?>