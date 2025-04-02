# ProjetX_BARRIER_MAULINE_MARQUES-FELIX_SERVONNET


## Contributeurs
- **BARRIER Florian** : Back-end, README, Diaporama ([GitHub](https://github.com/barriefl))
- **MAULINE Yannis** : Compte rendu, Back-end ([GitHub](https://github.com/YannisUsmb))
- **MARQUES-FELIX Anthony** : Front-end, Back-end ([GitHub](https://github.com/Anthony-mf))
- **SERVONNET Matthieu** : Base de données, Back-end, Dockerfile et Docker Compose ([GitHub](https://github.com/Mat7475))


## Description du projet
Le projet "ProjetX" a pour objectif de créer une copie de Twitter avec un front-end et un back-end interconnectés.
L'application utilise une base de données PostgreSQL et inclut les fonctionnalités suivantes :
- Gestion des utilisateurs (COMPTES)
- Publication et suppression des posts (POST)
- Ajout et suppression de commentaires et de likes
- Fonctionnalités de retweet


## Technologies utilisées
- Back-end : PHP
- Base de données : PostgreSQL
- Front-end : HTML, CSS, JavaScript
- Docker : Dockerfile et Docker Compose pour faciliter la gestion des environnements de développement.


## Prérequis
Avant de commencer, il faut avoir installé les outils suivants :
- Docker
- Docker Compose


## Structure du projet
Le projet est structuré comme suit :
- `/ProjetX`
    - `/data`               -> Ce dossier est utilisé pour stocker toutes les données de la base de données, afin d'éviter de devoir réutiliser ou réexécuter le fichier `init_db.sql`. 
    - `/sql`                -> Ce dossier contient le fichier `init_db.sql`, qui est responsable de la création des tables et de l'insertion des données initiales dans la base PostgreSQL.
    - `/web`                -> C'est la partie principale du projet, comprenant à la fois le back-end et le front-end.
        - `/back`           -> Contient tous les fichiers PHP qui gèrent les requêtes vers la base de données et le projet.
        - `/images`         -> Ce dossier regroupe toutes les images utilisées pour le design du projet.
        - `/js`             -> Contient les scripts JavaScript nécessaires pour gérer les interactions dynamiques côté front-end et interagir avec le back-end.
        - `/style`          -> Ce dossier contient les fichiers CSS qui gèrent l'aspect visuel du front-end.
        - `index.html`      -> Page d'accueil, utilisée pour la connexion / inscription des utilisateurs.
        - `main.html`       -> La page d'accueil après la connexion, affichant les posts et interactions des utilisateurs.
        - `profil.html`     -> La page de profil de l'utilisateur connecté, affichant ses informations et posts.
    - `docker-compose.yml`  -> Ce fichier configure les services Docker (comme la base de données et le serveur web) nécessaires à l'exécution du projet.
    - `Dockerfile`          -> Ce fichier définit les étapes nécessaires pour construire l'image Docker de l'application, en y ajoutant toutes les extensions et configurations nécessaires.


## Base de données
Le projet utilise PostreSQL pour stocker les données.
- SGBD : PostgreSQL 8
- Tables : 
    - `COMPTE` : Contient les informations des utilisateurs.
    - `COMMENTAIRE` : Contient les commentaires sur les posts.
    - `POST` : Contient les posts publiés par les utilisateurs.
    - `A_LIKE` : Gère les likes sur les posts.
    - `A_RETWEET` : Gère les retweets des posts.


## Commandes pour lancer le projet
### GitHub
- Pour cloner ce dépôt sur votre machine locale :
    - `git clone https://github.com/barriefl/ProjetX_BARRIER_MAULINE_MARQUES-FELIX_SERVONNET`
    - `cd ProjetX_BARRIER_MAULINE_MARQUES-FELIX_SERVONNET`
    - `docker-compose up -d`
    - Et sur un navigateur ouvrir `http://localhost:12500`
- Pour arrêter les services Docker :
    - `docker-compose down`
### DockerHub
- Pour recupérer le projet et directement le lancer taper


## URL de la page d'accueil
http://localhost:12500


## Liens utiles
- **Dépôt GitHub** : ([Lien vers le dépôt GitHub](https://github.com/barriefl/ProjetX_BARRIER_MAULINE_MARQUES-FELIX_SERVONNET))
- **Image DockerHub** : ([Lien vers le dépôt DockerHub]())

## Aide
Pour toute question ou assistance, n'hésitez pas à contacter l'un des contributeurs ci-dessus.