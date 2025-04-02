# ProjetX_BARRIER_MAULINE_MARQUES-FELIX_SERVONNET


## Contributeurs
- **BARRIER Florian** : Back-end, README, Diaporama ([GitHub](https://github.com/barriefl))
- **MAULINE Yannis** : Compte rendu, Back-end ([GitHub](https://github.com/YannisUsmb))
- **MARQUES-FELIX Anthony** : Front-end, Back-end ([GitHub](https://github.com/Anthony-mf))
- **SERVONNET Matthieu** : Base de données, Back-end, Dockerfile et Docker Compose ([GitHub](https://github.com/Mat7475))


## Description du projet
Le projet "ProjetX" a pour objectif de créer une copie de Twitter avec un front-end et un back-end interconnectés.
L'application utilise une base de données PostgreSQL et inclut les fonctionnalités suivantes :
-   • Gestion des utilisateurs (COMPTES)
-   • Publication et suppression des posts (POST)
-   • Ajout et suppression de commentaires et de likes
-   • Fonctionnalités de retweet


## Technologies utilisées
- • Back-end : PHP
- • Base de données : PostgreSQL
- • Front-end : HTML, CSS, JavaScript
- • Docker : Dockerfile et Docker Compose pour faciliter la gestion des environnements de développement.


## Prérequis
Avant de commencer, il faut avoir installé les outils suivants :
-   • Docker
-   • Docker Compose


## Structure du projet
Le projet est structuré comme suit :
/ProjetX
    /data                       -> Contient toutes les données de la base, évitant de réutiliser le fichier init_db.sql
    /sql                        -> Contient un fichier init_db.sql contenant les tables et les inserts de la base de données.
    /web                        -> Dossier contenant le back et le front du projet.
        /back                   -> Dossier contenant tous les fichiers php permettant d'intéragir avec les données.
        /images                 -> Dossier contenant toutes les images du projet.
        /js                     -> Dossier contenant tous les fichiers JavaScript qui gère nos éléments en front et interagissent avec la partie back.
        /style                  -> Dossier contenant plusieurs fichiers CSS.
        index.html              -> Page de connexion.
        main.html               -> Accueil du ProjetX.
        profil.html             -> Page de notre profil.
    docker-compose.yml          -> Fichier qui définit nos services et la partie web.
    Dockerfile                  -> Installe les extensions nécessaires.


## Base de données
SGBD : PostgreSQL 8
Tables : COMPTE, COMMENTAIRE, POST, A_LIKE, A_RETWEET


## Commandes pour lancer le projet
### GitHub
Pour cloner ce dépôt sur votre machine locale :
git clone [https:](https://github.com/barriefl/ProjetX_BARRIER_MAULINE_MARQUES-FELIX_SERVONNET)
cd ProjetX
docker-compose up -d
### DockerHub



## URL de la page d'accueil
localhost:12500


## Aide
Pour toute question ou assistance, n'hésitez pas à contacter l'un des contributeurs ci-dessus.