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

    $comid = $inputData["id"] ?? "";
    $postid = $inputData["idpost"] ?? "";
    if (!empty($comid)) {

        try {
            $stmtinsert = $pdo->prepare("DELETE FROM COMMENTAIRE WHERE IDCOMMENTAIRE = ? ");
            $stmtinsert->execute([$comid]);

            $stmt = $pdo->prepare("UPDATE POST SET COMPTEURCOMM = COMPTEURCOMM - 1 WHERE IDPOST = ?");
            $stmt->execute([$postid]);

        
            echo json_encode(["success" => true, "message" => "Commentaire supprimée avec succès"]);
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => "Erreur lors de la création du compte: " . $e->getMessage(),"id" =>$id]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Veuillez remplir tous les champs." ,"id" =>$id]);
    }
}