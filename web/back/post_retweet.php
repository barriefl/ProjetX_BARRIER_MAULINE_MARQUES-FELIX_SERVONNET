<?php
$host = 'db';
$dbname = 'mydb';
$user = 'myuser';
$password = 'mypassword';

header("Content-Type: application/json");

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) { 
    echo json_encode(["success" => false, "message" => "Erreur BD : " . $e->getMessage()]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['userId']) && isset($data['postId'])) {

        $userId = $data['userId'];
        $postId = $data['postId'];

        try {
            $stmt = $pdo->prepare("INSERT INTO A_RETWEET (IDCOMPTE, IDPOST) VALUES (?, ?)");
            $stmt->execute([$userId, $postId]);

            echo json_encode(["success" => true, "message" => "Retweet ajouté avec succès"]);
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => "Erreur lors de l'insertion dans la base de données : " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Données manquantes : userId ou postId"]);
    }
}
?>
