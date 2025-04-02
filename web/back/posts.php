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
    // Exemple de requête pour récupérer les posts de l'utilisateur
    $stmt = $pdo->prepare("SELECT URLIMAGE, description, idpost FROM POST 
                            WHERE IDCOMPTE = ?");
    $stmt->execute([$userId]);

    // Vérifier s'il y a des résultats
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($posts) {
        // Renvoyer les résultats en JSON
        echo json_encode($posts);
    } else {
        // Si aucun post trouvé
        echo json_encode([]);
    }
} else {
    // Si l'ID de l'utilisateur est manquant ou incorrect
    echo json_encode(["error" => "User ID is missing or invalid"]);
}