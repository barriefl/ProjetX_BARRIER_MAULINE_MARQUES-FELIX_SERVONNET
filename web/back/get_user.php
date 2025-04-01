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

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $userId = $_GET['id'] ?? null;
    
    if ($userId) {
        try {
            $stmt = $pdo->prepare("SELECT PSEUDO, MAIL, NOM, PRENOM, URLIMAGECOMPTE FROM COMPTE WHERE IDCOMPTE = ?");
            $stmt->execute([$userId]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user) {
                echo json_encode(["success" => true, "user" => $user]);
            } else {
                echo json_encode(["success" => false, "message" => "Utilisateur non trouvé"]);
            }
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => "Erreur de récupération des données : " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "ID utilisateur manquant"]);
    }
}
?>
