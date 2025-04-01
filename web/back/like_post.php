<?php
session_start();
$host = 'db';
$dbname = 'mydb';
$user = 'myuser';
$password = 'mypassword';

header("Content-Type: application/json");

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $user_id = $_POST['user_id'];
    $post_id = $_POST['post_id'];

    // Vérifiez si l'utilisateur a déjà liké le post
    $stmt = $pdo->prepare("SELECT * FROM A_LIKE WHERE IDCOMPTE = ? AND IDPOST = ?");
    $stmt->execute([$user_id, $post_id]);
    $like = $stmt->fetch();

    if ($like) {
        // Supprimer un like
        $stmt = $pdo->prepare("DELETE FROM A_LIKE WHERE (IDCOMPTE = ? AND IDPOST = ?)");
        $stmt->execute([$user_id, $post_id]);

        // Décrementer le compteur de likes
        $stmt = $pdo->prepare("UPDATE POST SET COMPTEURLIKE = COMPTEURLIKE - 1 WHERE IDPOST = ?");
        $stmt->execute([$post_id]);

        echo json_encode(["success" => false, "message" => "Like supprimé"]);
    } else {
        // Ajouter un like
        $stmt = $pdo->prepare("INSERT INTO A_LIKE (IDCOMPTE, IDPOST) VALUES (?, ?)");
        $stmt->execute([$user_id, $post_id]);

        // Incrémenter le compteur de likes
        $stmt = $pdo->prepare("UPDATE POST SET COMPTEURLIKE = COMPTEURLIKE + 1 WHERE IDPOST = ?");
        $stmt->execute([$post_id]);

        echo json_encode(["success" => true, "message" => "Post liké"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erreur : " . $e->getMessage()]);
}
?>