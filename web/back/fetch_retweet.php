<?php
// Fonction pour se connecter à la base de données
function connectToDatabase() {
    $host = 'db';
    $dbname = 'mydb';
    $user = 'myuser';
    $password = 'mypassword';

    try {
        $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("Erreur de connexion à la base de données : " . $e->getMessage());
    }
}

// Fonction pour récupérer les posts
function fetchPosts($pdo) {
    try {
        $query = "
            SELECT 
                r.IDPOST AS retweet_post_id,
                r.DESCRIPTIONRT AS retweet_description,
                rc.PSEUDO AS retweet_auteur,
                rc.URLIMAGECOMPTE AS retweet_auteur_image_url,
                p.DESCRIPTION AS original_post_description,
                p.URLIMAGE AS original_post_image_url,
                c.PSEUDO AS original_post_auteur,
                c.URLIMAGECOMPTE AS original_post_auteur_image_url,
                r.datert
            FROM 
                A_RETWEET r
            JOIN 
                POST p ON r.IDPOST = p.IDPOST  
            JOIN 
                COMPTE rc ON r.IDCOMPTE = rc.IDCOMPTE 
            JOIN 
                COMPTE c ON p.IDCOMPTE = c.IDCOMPTE 
            ORDER BY 
                r.datert desc;
        ";
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        throw new Exception("Erreur lors de la récupération des posts : " . $e->getMessage());
    }
}

// Connexion à la base de données
$pdo = connectToDatabase();

// Récupération des posts
try {
    $posts = fetchPosts($pdo);
    // Renvoie les données sous forme de JSON
    header('Content-Type: application/json');
    echo json_encode($posts);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
