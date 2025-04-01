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

    $nom = $inputData["nom"] ?? "";
    $prenom = $inputData["prenom"] ?? "";
    $pseudo = $inputData["pseudo"] ?? "";
    $email = $inputData["mail"] ?? "";
    $password = $inputData["password"] ?? "";
    $url = $inputData["url"] ?? "";

    if (!empty($nom) && !empty($prenom) && !empty($pseudo) && !empty($email) && !empty($password)) {

        try {
            $stmt = $pdo->prepare("INSERT INTO COMPTE (NOM, PRENOM, PSEUDO, MAIL, MDP, URLIMAGECOMPTE) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$nom, $prenom, $pseudo, $email, $password, $url]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $user_id = $result['idcompte'];
            echo json_encode(["success" => true, "message" => "Compte créé avec succès", "user_id" => $user_id]);
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => "Erreur lors de la création du compte: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Veuillez remplir tous les champs." . $nom]);
    }
}
?>