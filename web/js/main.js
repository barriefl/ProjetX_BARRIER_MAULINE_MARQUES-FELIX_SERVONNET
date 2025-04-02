// Récupérer l'ID de l'utilisateur à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

const deco = document.getElementById("Deconnexion")
deco.addEventListener("click", () => {
    window.location.href = `/`;
})
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

    const butprofil = document.getElementById('button-profil') 
    butprofil.addEventListener("click", () => {
        window.location.href = `profil.html?id=${userId}`;
    })
}

const butpost = document.querySelector("#butpost")
console.log(butpost)
butpost.addEventListener("click", () => {
            const description = document.querySelector('#inputpost').value
            const url = document.querySelector('#urlpost').value
            console.log(description)
            console.log(url)
            fetch("back/insert_post.php", {  // Vérifie bien le chemin ici (selon ton projet)
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description: description,
                    url: url,
                    idcompte: userId,
                })
            })
            .then(response => response.json()) // Convertit la réponse en JSON
            .then(data => {
                if (data.success) {
                    console.log(data)
                    window.location.href = `main.html?id=${userId}`; // Redirige vers main.html si succès
                }
            })
                .catch(error => console.error("Erreur :", error))
        })

const postsContainer = document.querySelector('.posts-container');

document.addEventListener("DOMContentLoaded", () => {
    fetch('../back/fetch_posts.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                console.log(post)
                // Création de l'élément principal du post
                const postElement = document.createElement('div');
                postElement.classList.add('content');

                // Création de la section user-info
                const userInfo = document.createElement('div');
                userInfo.classList.add('user-info-post');

                const userAvatar = document.createElement('img');
                userAvatar.classList.add('avatar');
                userAvatar.src = post.urlimagecompte;
                userAvatar.alt = "User Avatar";

                const userDetails = document.createElement('div');

                const username = document.createElement('span');
                username.classList.add('username');
                username.textContent = `${post.pseudo}`;

                const likesCount = document.createElement('span');
                likesCount.style.color = "#aaa";
                likesCount.textContent = ` · ${post.compteurlike} likes`;

                const date = document.createElement('span')
                date.style.color = "#aaa";
                const datepost = post.datepost;
                const dateObject = new Date(datepost);

                const day = String(dateObject.getDate()).padStart(2, '0'); // Ajoute un 0 si besoin
                const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // getMonth() commence à 0
                const year = dateObject.getFullYear();

                const formattedDate = `${day}/${month}/${year}`;
                console.log(formattedDate); // "02/04/2025"
                date.textContent = "  "+ formattedDate

                userDetails.appendChild(username);
                userDetails.appendChild(date);
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
                            likesCount.textContent = ` · ${post.compteurlike +1} likes`;

                        } else {
                            // Incrémenter le compteur de likes
                            likes.textContent = parseInt(likes.textContent) - 1;
                            // Changer l'image du bouton de like
                            iconLike.classList.replace('bi-heart-fill', 'bi-heart'); // Remplacez par le chemin de votre image "liked"
                            likesCount.textContent = ` · ${post.compteurlike } likes`;
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
                iconRetweet.classList.add('bi', 'bi-arrow-left-right', 'icon-retweet');
                buttonRetweet.appendChild(iconRetweet);
                divRetweet.appendChild(buttonRetweet)
                divRetweet.appendChild(retweetsCount);
                actions.appendChild(divRetweet);
                const divRT = document.createElement('div')

                divRetweet.addEventListener("click", () => {

                    fetch('back/check_retweet.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: userId,
                            postId: post.idpost,
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            console.log("True")
                            divRT.innerHTML =""
                            const input = document.createElement('input')
                            input.classList = "inputRt"
                            input.placeholder = "Une petite citation ?"
                            const butconfirm = document.createElement('button')
                            butconfirm.textContent = "Poster"
                            butconfirm.classList = "post-button" 
                            butconfirm.addEventListener("click", () => {
                                const texte = input.value
                                Retweet(post, texte)
                                divRT.removeChild(input)
                                divRT.removeChild(butconfirm)
                            })
                            divRT.appendChild(input)
                            divRT.appendChild(butconfirm)

                        } else {
                            Retweet(post, null)
                        }
                    })
                    .catch(error => {
                        console.error('Erreur de communication avec le serveur : ', error);
                    });
                })
                        

                        function Retweet(post, texte){
                           
                            // Envoi de la requête fetch
                            fetch('back/post_retweet.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    userId: userId,
                                    postId: post.idpost,
                                    texte: texte
                                })
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    retweetsCount.textContent = parseInt(retweetsCount.textContent) + 1;
                                    iconRetweet.classList.add('retweet');
                                } else {
                                    retweetsCount.textContent = parseInt(retweetsCount.textContent) - 1;
                                    iconRetweet.classList.remove('retweet');
                                }
                            })
                            .catch(error => {
                                console.error('Erreur de communication avec le serveur : ', error);
                            });
                        }

                // Bouton pour les commentaires avec une image
                const divCommentaffic = document.createElement('div');
                const commentCount = document.createElement('span');
                commentCount.textContent = `${post.compteurcomm}`;
                const buttonComment = document.createElement('button');
                buttonComment.classList.add('butcomment');
                const iconComment = document.createElement('i');
                iconComment.classList.add('bi', 'bi-chat');
                buttonComment.appendChild(iconComment);
                divCommentaffic.appendChild(buttonComment)
                divCommentaffic.appendChild(commentCount)
                
                // Ajout de l'événement pour afficher/masquer les commentaires
                const divComment = document.createElement('div');
                divComment.id = "comment" + post.idpost;

                buttonComment.addEventListener("click", () => {
                    if (divComment.innerHTML !== "") {
                        divComment.innerHTML = ""; // Enlever les commentaires
                    } else {
                        const input = document.createElement('input')
                            input.classList = "inputRt"
                            input.placeholder = "Une petit commentaire ?"
                            const butconfirm = document.createElement('button')
                            butconfirm.textContent = "Poster"
                            butconfirm.classList = "post-button" 
                            butconfirm.addEventListener("click", () => {
                                const texte = input.value
                                console.log(texte)
                                console.log(userId)
                                console.log(post.idpost)
                                fetch('back/insert_comm.php', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        userId: userId,
                                        postId: post.idpost,
                                        texte: texte
                                    })
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data)
                                    if (data.success) {
                                        
                                        window.location.href = `main.html?id=${userId}`
                                    }
                                })
                                .catch(error => console.error("Erreur :", error))
                            })
                            divComment.appendChild(input)
                            divComment.appendChild(butconfirm)

                        fetch(`../back/fetch_comment.php?idpost=${post.idpost}`)
                            .then(response => response.json())
                            .then(data => {
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
                actions.appendChild(divCommentaffic);

                // Assemblage de toutes les sections dans le postElement
                postElement.appendChild(userInfo);
                postElement.appendChild(content);
                postElement.appendChild(actions);
                postElement.appendChild(divRT);
                postElement.appendChild(divComment);

                // Ajout du post au conteneur
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des posts:', error));
        
        
    



        fetch('../back/fetch_retweet.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                console.log(post)
                const contentDiv = document.createElement("div");
                contentDiv.classList.add("content");
            
                // Retweet Info
                const retweetDiv = document.createElement("div");
                retweetDiv.classList.add("retweet-profil-container");
            
                const iconRetweet = document.createElement("i");
                iconRetweet.classList.add("bi", "bi-arrow-left-right", "retweet-icon-profil");
                retweetDiv.appendChild(iconRetweet);
            
                const retweetProfil = document.createElement("span");
                retweetProfil.classList.add("retweet-profil");
                retweetProfil.textContent = `${post.retweet_auteur} a retweeté le `;
                
                const date = document.createElement('span')
                date.style.color = "#aaa";
                const datepost = post.datert;
                const dateObject = new Date(datepost);

                const day = String(dateObject.getDate()).padStart(2, '0'); // Ajoute un 0 si besoin
                const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // getMonth() commence à 0
                const year = dateObject.getFullYear();

                const formattedDate = `${day}/${month}/${year}`;
                console.log(formattedDate); // "02/04/2025"
                date.innerHTML = `&nbsp;${formattedDate}`;

                retweetDiv.appendChild(retweetProfil);
                retweetDiv.appendChild(date);

                contentDiv.appendChild(retweetDiv);
            
                // Retweet User Info
                const retweetUserInfo = document.createElement("div");
                retweetUserInfo.classList.add("user-info-post");
            
                const retweetAvatar = document.createElement("img");
                retweetAvatar.classList.add("avatar");
                retweetAvatar.src = post.retweet_auteur_image_url;
                retweetUserInfo.appendChild(retweetAvatar);
            
                const retweetUsername = document.createElement("p");
                retweetUsername.textContent = post.retweet_auteur;
                retweetUsername.classList.add("username");
                retweetUserInfo.appendChild(retweetUsername);
            
                contentDiv.appendChild(retweetUserInfo);
            
                // Retweet Description
                if (post.retweet_description) {
                    const retweetDescription = document.createElement("p");
                    retweetDescription.textContent = post.retweet_description;
                    contentDiv.appendChild(retweetDescription);
                }
            
                // Original Post Container
                const postDiv = document.createElement("div");
                postDiv.classList.add("post-retweet-container");
            
                const originalUserInfo = document.createElement("div");
                originalUserInfo.classList.add("user-info-post");
            
                const originalAvatar = document.createElement("img");
                originalAvatar.classList.add("avatar");
                originalAvatar.src = post.original_post_auteur_image_url;
                originalUserInfo.appendChild(originalAvatar);
            
                const originalUsername = document.createElement("p");
                originalUsername.textContent = post.original_post_auteur;
                originalUsername.classList.add("username");
                originalUserInfo.appendChild(originalUsername);
            
                postDiv.appendChild(originalUserInfo);
            
                // Original Post Description
                const originalDescription = document.createElement("p");
                originalDescription.textContent = post.original_post_description;
                postDiv.appendChild(originalDescription);
            
                // Original Post Image
                if (post.original_post_image_url) {
                    const originalImage = document.createElement("img");
                    originalImage.classList.add("post-image");
                    originalImage.src = post.original_post_image_url;
                    postDiv.appendChild(originalImage);
                }
            
                contentDiv.appendChild(postDiv);
                postsContainer.appendChild(contentDiv);
            })
        })

        

});

