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

    $userid = $inputData["userId"] ?? "";
    $postid = $inputData["postId"] ?? "";
    $texte = $inputData["texte"] ?? "";
    if (!empty($userid)) {

        try {
            $stmtinsert = $pdo->prepare("INSERT INTO COMMENTAIRE (IDCOMPTE,IDPOST,TEXTE) values (?,?,?) ");
            $stmtinsert->execute([$userid,$postid,$texte]);

            $stmt = $pdo->prepare("UPDATE POST SET COMPTEURCOMM = COMPTEURCOMM + 1 WHERE IDPOST = ?");
            $stmt->execute([$postid]);
        
            echo json_encode(["success" => true, "message" => "Commentaire supprimée avec succès"]);
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => "Erreur lors de la création du compte: " . $e->getMessage(),"id" =>$id]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Veuillez remplir tous les champs." ,"id" =>$id]);
    }
}