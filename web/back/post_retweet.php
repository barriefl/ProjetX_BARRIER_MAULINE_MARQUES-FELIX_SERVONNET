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
        $texte = $data['texte'];

        $stmt = $pdo->prepare("SELECT * FROM A_RETWEET WHERE IDCOMPTE = ? AND IDPOST = ?");
        $stmt->execute([$userId, $postId]);
        $retweet = $stmt->fetch();
    
        if ($retweet) {
            // Supprimer un like
            $stmt = $pdo->prepare("DELETE FROM A_RETWEET WHERE (IDCOMPTE = ? AND IDPOST = ?)");
            $stmt->execute([$userId, $postId]);
    
            // Décrementer le compteur de likes
            $stmt = $pdo->prepare("UPDATE POST SET COMPTEURRETWEET = COMPTEURRETWEET - 1 WHERE IDPOST = ?");
            $stmt->execute([$postId]);
    
            echo json_encode(["success" => false, "message" => "Retweet supprimé"]);
        } else {
            // Ajouter un like
            $stmt = $pdo->prepare("INSERT INTO A_RETWEET (IDCOMPTE, IDPOST, DESCRIPTIONRT) VALUES (?, ?, ?)");
            $stmt->execute([$userId, $postId,$texte]);
    
            // Incrémenter le compteur de likes
            $stmt = $pdo->prepare("UPDATE POST SET COMPTEURRETWEET = COMPTEURRETWEET + 1 WHERE IDPOST = ?");
            $stmt->execute([$postId]);
    
            echo json_encode(["success" => true, "message" => "Post retweeté"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Données manquantes : userId ou postId"]);
    }
}
?>
