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
$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'];
$postId = $data['postId'];


$stmt = $pdo->prepare("SELECT * FROM A_RETWEET WHERE IDCOMPTE = ? AND IDPOST = ?");
$stmt->execute([$userId, $postId]);
$retweet = $stmt->fetch();
if($retweet)
{
    echo json_encode(["success" => false, "message" => "Retweet deja existant"]);
}
else{
    echo json_encode(["success" => true, "message" => "Retweet n'existe pas"]);
}