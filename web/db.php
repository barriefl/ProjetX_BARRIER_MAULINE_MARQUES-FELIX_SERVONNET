<?php
$host = 'db';  // Nom du service PostgreSQL dans Docker Compose
$dbname = 'mydb';
$user = 'myuser';
$password = 'mypassword';

header("Content-Type: application/json"); // On envoie une réponse JSON

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo ("Salut yannis");
} catch (PDOException $e) { 
    echo json_encode(["success" => false, "message" => "Erreur BD : " . $e->getMessage()]);
    exit;
}

// Vérifier si la requête est bien une POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["email"] ?? "";
    $password = $_POST["password"] ?? "";

    if (!empty($email) && !empty($password)) {
        $stmt = $pdo->prepare("SELECT password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user["password"])) {
            echo json_encode(["success" => true, "message" => "Connexion réussie"]);
        } else {
            echo json_encode(["success" => false, "message" => "Identifiants incorrects"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Veuillez remplir tous les champs."]);
    }
}

// Récupère les données des posts X.
try {
    $stmt = $pdo->query("SELECT * FROM POST");
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Erreur lors de la récupération des posts : " . $e->getMessage();
    exit;
}
?>