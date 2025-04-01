// Récupérer l'ID de l'utilisateur à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
// Si un ID est présent, faire une requête pour récupérer les informations de l'utilisateur
if (userId) {
    fetch(`back/get_user.php?id=${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                // Afficher les données récupérées dans l'interface
                const imgsavatars = document.querySelectorAll(".avatar");

                imgsavatars.forEach(img => {
                    img.src = data.user.urlimagecompte;
                });

                document.getElementById("username").textContent = data.user.pseudo;
                // Ajouter d'autres éléments à afficher selon ce que tu souhaites
            } else {
                console.error("Erreur de récupération des données utilisateur");
            }
        })
        .catch(error => console.error("Erreur :", error));

    const butprofil = document.getElementById('butprofil') 
    butprofil.addEventListener("click", () => {
        window.location.href = `profil.html?id=${userId}`;
    })
}

document.addEventListener("DOMContentLoaded", () => {
    fetch('../back/fetch_posts.php')
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.querySelector('.posts-container');
            data.forEach(post => {
                // Création de l'élément principal du post
                const postElement = document.createElement('div');
                postElement.classList.add('content');

                // Création de la section user-info
                const userInfo = document.createElement('div');
                userInfo.classList.add('user-info');

                const userAvatar = document.createElement('img');
                userAvatar.src = post.urlimagecompte;
                userAvatar.alt = "User Avatar";

                const userDetails = document.createElement('div');

                const username = document.createElement('span');
                username.classList.add('username');
                username.textContent = `${post.pseudo}`;

                const likesCount = document.createElement('span');
                likesCount.style.color = "#aaa";
                likesCount.textContent = ` · ${post.compteurlike} likes`;

                userDetails.appendChild(username);
                userDetails.appendChild(likesCount);
                userInfo.appendChild(userAvatar);
                userInfo.appendChild(userDetails);

                // Création de la section content
                const content = document.createElement('div');
                content.classList.add('item');

                const description = document.createElement('p');
                description.textContent = post.description;

                const postImage = document.createElement('img');
                postImage.src = post.urlimage;
                postImage.alt = "Post Image";
                postImage.classList.add('post-image');

                content.appendChild(description);
                content.appendChild(postImage);

                // Création de la section actions
                const actions = document.createElement('div');
                actions.classList.add('actions');

                // Div contenant le bouton de like et le compteur de likes
                const likeContainer = document.createElement('div');
                likeContainer.classList.add('like-container');

                const buttonLike = document.createElement('button');
                buttonLike.classList.add('butlike');
                const iconLike = document.createElement('i');
                iconLike.classList.add('bi', 'bi-heart');
                buttonLike.appendChild(iconLike);

                const likes = document.createElement('span');
                likes.textContent = `${post.compteurlike}`;

                likeContainer.appendChild(buttonLike);
                likeContainer.appendChild(likes);

                // Ajouter un événement pour gérer le clic sur le bouton like
                buttonLike.addEventListener("click", () => {
                    fetch('../back/like_post.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `post_id=${post.idpost}&user_id=${userId}` 
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Incrémenter le compteur de likes
                            likes.textContent = parseInt(likes.textContent) + 1;
                            // Changer l'image du bouton de like
                            iconLike.classList.replace('bi-heart', 'bi-heart-fill'); // Remplacez par le chemin de votre image "liked"
                        } else {
                            // Incrémenter le compteur de likes
                            likes.textContent = parseInt(likes.textContent) - 1;
                            // Changer l'image du bouton de like
                            iconLike.classList.replace('bi-heart-fill', 'bi-heart'); // Remplacez par le chemin de votre image "liked"
                        }
                    })
                    .catch(error => console.error("Erreur lors du like du post :", error));
                });

                const divRetweet = document.createElement("div");
                divRetweet.classList.add("divretweet");
                const retweetsCount = document.createElement('span');
                retweetsCount.textContent = `${post.compteurretweet}`;
                const buttonRetweet = document.createElement('button');
                buttonRetweet.classList += "butretweet"
                const iconRetweet = document.createElement("i");
                iconRetweet.classList.add('bi', 'bi-arrow-left-right');
                buttonRetweet.appendChild(iconRetweet);
                divRetweet.appendChild(buttonRetweet)
                divRetweet.appendChild(retweetsCount);
                actions.appendChild(divRetweet);
                divRetweet.addEventListener("click", () => {

                    if (userId){
                        // Envoi de la requête fetch
                        fetch('back/post_retweet.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                userId: userId,
                                postId: post.idpost
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                console.log("Retweet effectuée avec succès");
                                iconRetweet.classList.add('retweet');
                            } else {
                                alert("Vous avez deja retweeté ce post")
                                iconRetweet.classList.remove('retweet');
                            }
                        })
                        .catch(error => {
                            console.error('Erreur de communication avec le serveur : ', error);
                        });
                    }
                    else {
                        window.alert("Vous devez être connecté");
                    }
                    
                })

                // Bouton pour les commentaires avec une image
                const buttonComment = document.createElement('button');
                buttonComment.classList.add('butcomment');
                const iconComment = document.createElement('i');
                iconComment.classList.add('bi', 'bi-chat');
                buttonComment.appendChild(iconComment);

                // Ajout de l'événement pour afficher/masquer les commentaires
                const divComment = document.createElement('div');
                divComment.id = "comment" + post.idpost;

                buttonComment.addEventListener("click", () => {
                    if (divComment.innerHTML !== "") {
                        divComment.innerHTML = ""; // Enlever les commentaires
                    } else {
                        fetch(`../back/fetch_comment.php?idpost=${post.idpost}`)
                            .then(response => response.json())
                            .then(data => {
                                divComment.innerHTML = "";
                                data.forEach(comment => {

                                    console.log(comment);

                                    const commentDiv = document.createElement("div");
                                    commentDiv.classList.add("comment");

                                    const pseudo = document.createElement("strong");
                                    pseudo.textContent = comment.pseudo + " : ";

                                    const texte = document.createElement("span");
                                    texte.textContent = comment.texte;

                                    commentDiv.appendChild(pseudo);
                                    commentDiv.appendChild(texte);
                                    divComment.appendChild(commentDiv);
                                });
                            })
                            .catch(error => console.error("Erreur lors du fetch des commentaires :", error));
                    }
                });

                actions.appendChild(likeContainer);
                actions.appendChild(buttonComment);

                // Assemblage de toutes les sections dans le postElement
                postElement.appendChild(userInfo);
                postElement.appendChild(content);
                postElement.appendChild(actions);
                postElement.appendChild(divComment);

                // Ajout du post au conteneur
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des posts:', error));
});