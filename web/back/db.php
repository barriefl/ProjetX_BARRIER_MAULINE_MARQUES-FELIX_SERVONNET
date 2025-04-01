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

// Vérifier si la requête est bien une POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {


    $emailPseudo = $_POST["email"] ?? "";
    $password = $_POST["password"] ?? "";
    
    if (!empty($emailPseudo) && !empty($password)) {
        $stmt = $pdo->prepare("SELECT IDCOMPTE, MAIL, PSEUDO, MDP FROM COMPTE WHERE MAIL = ? OR PSEUDO = ?");
        $stmt->execute([$emailPseudo,$emailPseudo]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        $user_id = $user['idcompte'] ?? 20;
        if ($password == $user["mdp"]) {
            // Si la connexion réussie, retourne les informations du compte
            echo json_encode([
                "success" => true,
                "message" => "Connexion réussie",
                "id" => $user_id
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Identifiants incorrects " . $user["mdp"] . " " . $password]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Veuillez remplir tous les champs."]);
    }
}
?>