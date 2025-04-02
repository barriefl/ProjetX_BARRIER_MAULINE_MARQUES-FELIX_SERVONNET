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

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $inputData = json_decode(file_get_contents("php://input"), true);

    $description = $inputData["description"] ?? "";
    $url = $inputData["url"] ?? "";
    $idcompte = $inputData["idcompte"] ?? "";
    $compteur =0;
    if (!empty($description) && !empty($url) && !empty($idcompte)) {

        try {
            $stmtinsert = $pdo->prepare("INSERT INTO POST (DESCRIPTION, URLIMAGE, IDCOMPTE, COMPTEURLIKE, COMPTEURRETWEET) VALUES (?, ?, ?, ?, ?)");
            $stmtinsert->execute([$description, $url, $idcompte,$compteur,$compteur]);

        
            echo json_encode(["success" => true, "message" => "Post créé avec succès", "id" => $user_id]);
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => "Erreur lors de la création du compte: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Veuillez remplir tous les champs." . $nom]);
    }
}
?>