const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
var pseudo = ""
var urlimage = ""
const home = document.querySelectorAll('#home') 
home.forEach(but => {
    but.addEventListener("click", () => {
        window.location.href = `main.html?id=${userId}`;
    })
});
// Si un ID est présent, faire une requête pour récupérer les informations de l'utilisateur
if (userId) {
    fetch(`back/get_user.php?id=${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                urlimage =data.user.urlimagecompte
                pseudo = data.user.pseudo
                // Afficher les données récupérées dans l'interface
                const imgsavatars = document.querySelectorAll(".avatar");
                imgsavatars.forEach(img => {
                    img.src = data.user.urlimagecompte;
                });

                const usernames = document.querySelectorAll("#username");
                usernames.forEach(span => {
                    span.textContent = data.user.pseudo;
                });
                // Ajouter d'autres éléments à afficher selon ce que tu souhaites
            } else {
                console.error("Erreur de récupération des données utilisateur");
            }
        })
        .catch(error => console.error("Erreur :", error));

}


document.addEventListener("DOMContentLoaded", () => {
    // Exemple de userId (vous pouvez le récupérer dynamiquement selon votre logique)

    // Fonction pour effectuer un appel à un fichier PHP et afficher les données avec createElement et appendChild
    function loadData(endpoint, userId) {
        const requestData = { userId: userId };

        fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        })
        .then(response => response.json())
        .then(data => {
            const containerDiv = document.querySelector(".posts-container");
            containerDiv.innerHTML = '';
            
            // Selon l'endpoint, on appelle la fonction correspondante
            if (endpoint.includes("posts")) {
                displayPosts(data, containerDiv);
            } else if (endpoint.includes("retweets")) {
                displayRetweets(data, containerDiv);
            } else if (endpoint.includes("comments")) {
                displayComments(data, containerDiv);
            } else if (endpoint.includes("likes")) {
                displayLikes(data, containerDiv);
            }
        })
        .catch(error => {
            console.error("Error loading data:", error);
            const containerDiv = document.getElementById("content");
            containerDiv.innerHTML = "Erreur de chargement des données.";
        });
    }

    // Récupérer les boutons
    const postsBtn = document.getElementById("postsBtn");
    const retweetsBtn = document.getElementById("retweetsBtn");
    const commentsBtn = document.getElementById("commentsBtn");
    const likesBtn = document.getElementById("likesBtn");

    // Ajouter un événement pour chaque bouton
    postsBtn.addEventListener("click", () => {
        loadData("back/posts.php", userId);  // Passe userId ici dans la requête POST
        setActiveButton(postsBtn);
    });

    retweetsBtn.addEventListener("click", () => {
        loadData("back/retweets.php", userId);
        setActiveButton(retweetsBtn);
    });

    commentsBtn.addEventListener("click", () => {
        loadData("back/comments.php", userId);
        setActiveButton(commentsBtn);
    });

    likesBtn.addEventListener("click", () => {
        loadData("back/likes.php", userId);
        setActiveButton(likesBtn);
    });

    // Fonction pour mettre à jour l'état actif des boutons
    function setActiveButton(activeButton) {
        // Enlever la classe 'active' de tous les boutons
        const buttons = document.querySelectorAll(".tab-menu button");
        buttons.forEach(button => button.classList.remove("active"));

        // Ajouter la classe 'active' au bouton cliqué
        activeButton.classList.add("active");
    }

    // Fonction pour afficher les posts
    function displayPosts(data, containerDiv) {
        data.forEach(item => {
            console.log(item)
            const contentDiv = document.createElement("div");
            contentDiv.classList.add('content');

            const itemDiv = document.createElement("div");
            itemDiv.classList.add('item');

            const title = document.createElement("h3");
            title.textContent = item.description;
            itemDiv.appendChild(title);

            const image = document.createElement("img");
            image.classList.add('post-image');
            image.alt = "Post Image";
            image.src = item.urlimage;
            itemDiv.appendChild(image);
            console.log(item.idpost)
            const butsupprimer = document.createElement('button')
            butsupprimer.classList.add(item.idpost)
            butsupprimer.addEventListener("click", () => {
                console.log("salut")
                const postid= butsupprimer.classList.value
                console.log(postid)
                fetch("back/delete_post.php", {  // Vérifie bien le chemin ici (selon ton projet)
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id:postid,
                    })
                })
                .then(response => response.json()) // Convertit la réponse en JSON
                .then(data => {
                    console.log(data);
                    if (data.success) {
                        window.location.href = `profil.html?id=${userId}`; // Redirige vers main.html si succès
                    }
                })
                    .catch(error => console.error("Erreur :", error))
            })

            butsupprimer.textContent = "Supprimer mon post"
            butsupprimer.classList.add('post-button');

            contentDiv.appendChild(itemDiv);
            contentDiv.appendChild(butsupprimer);

            containerDiv.appendChild(contentDiv);
        });
    }

    // Fonction pour afficher les retweets
    function displayRetweets(data, containerDiv) {
        data.forEach(item => {
            const contentDiv = document.createElement("div");
            contentDiv.classList.add('content');

            const itemDiv = document.createElement("div");
            itemDiv.classList.add('item');

            const retweetDiv = document.createElement("div");
            retweetDiv.classList.add('retweet-profil-container');

            const iconRetweet = document.createElement("i");
            iconRetweet.classList.add('bi', 'bi-arrow-left-right', 'retweet-icon-profil');
            retweetDiv.appendChild(iconRetweet);

            const retweetProfil = document.createElement("span");
            retweetProfil.classList.add('retweet-profil');
            retweetProfil.textContent = "vous avez reposté"
            retweetDiv.appendChild(retweetProfil);

            contentDiv.appendChild(retweetDiv);

            const userInfo = document.createElement('div');
            userInfo.classList.add('user-info-post');

            if (item.descriptionrt != "") {
                
                const userInfocommment = document.createElement('div');
                userInfocommment.classList.add('user-info-profil');

                const userAvatarcomment = document.createElement('img');
                userAvatarcomment.src=urlimage
                userAvatarcomment.classList.add('avatar');

                const usernamecomment = document.createElement('span')
                usernamecomment.textContent = pseudo
                usernamecomment.classList.add('username')
                usernamecomment.setAttribute("id", "username")
                
                const descriptionrt = document.createElement("p");
                descriptionrt.textContent = item.descriptionrt;
                userInfocommment.appendChild(descriptionrt);

                userInfocommment.appendChild(userAvatarcomment)
                userInfocommment.appendChild(usernamecomment)
                contentDiv.appendChild(userInfocommment);
                contentDiv.appendChild(descriptionrt);

                const postDiv = document.createElement("div");
                postDiv.classList.add('post-retweet-container');

                const userAvatar = document.createElement('img');
                userAvatar.classList.add('avatar');
                userAvatar.src = item.urlimagecompte;
                userAvatar.alt = "User Avatar";
                userInfo.appendChild(userAvatar)

                const username = document.createElement("p");
                username.textContent = `${item.pseudo}`;
                username.classList.add('username');
                userInfo.appendChild(username);

                postDiv.appendChild(userInfo);
                
                const description = document.createElement("p");
                description.textContent = item.description;
                itemDiv.appendChild(description);

                const image = document.createElement("img");
                image.classList.add('post-image');
                image.src = item.urlimage;
                itemDiv.appendChild(image);

                postDiv.appendChild(itemDiv);

                contentDiv.appendChild(postDiv);

                containerDiv.appendChild(contentDiv);
            }
            else {
                
            const userAvatar = document.createElement('img');
            userAvatar.classList.add('avatar');
            userAvatar.src = item.urlimagecompte;
            userAvatar.alt = "User Avatar";
            userInfo.appendChild(userAvatar)

            const username = document.createElement("p");
            username.textContent = `${item.pseudo}`;
            username.classList.add('username');
            userInfo.appendChild(username);

            contentDiv.appendChild(userInfo);
            
            const description = document.createElement("p");
            description.textContent = item.description;
            itemDiv.appendChild(description);

            const image = document.createElement("img");
            image.classList.add('post-image');
            image.src = item.urlimage;
            itemDiv.appendChild(image);

            contentDiv.appendChild(itemDiv);

            containerDiv.appendChild(contentDiv);
            
            }
        });
    }

    // Fonction pour afficher les commentaires
    function displayComments(data, containerDiv) {
        data.forEach(item => {
            console.log(item)
            const contentDiv = document.createElement("div");
            contentDiv.classList.add('content');

            const itemDiv = document.createElement("div");
            itemDiv.classList.add('item');

            const userInfo = document.createElement('div');
            userInfo.classList.add('user-info-post');

            const userAvatar = document.createElement('img');
            userAvatar.classList.add('avatar');
            userAvatar.src = item.urlimagecompte;
            userAvatar.alt = "User Avatar";

            const username = document.createElement('span');
            username.classList.add('username');
            username.textContent = `${item.pseudo}`;

            userInfo.appendChild(userAvatar);
            userInfo.appendChild(username);

            contentDiv.appendChild(userInfo);

            const title = document.createElement("p");
            title.textContent = item.description;
            itemDiv.appendChild(title);

            const image = document.createElement("img");
            image.classList.add('post-image');
            image.src = item.urlimage;
            itemDiv.appendChild(image);

            contentDiv.appendChild(itemDiv);

            const userInfocommment = document.createElement('div');
            userInfocommment.classList.add('user-info-profil');

            const userAvatarcomment = document.createElement('img');
            userAvatarcomment.src=urlimage
            userAvatarcomment.classList.add('avatar');

            const usernamecomment = document.createElement('span')
            usernamecomment.textContent=pseudo
            usernamecomment.setAttribute("id", "username")

            const commentText = document.createElement("p");
            commentText.classList.add('comment-text');
            commentText.textContent = item.texte;
            console.log(item.idcommentaire)
            const butsupprimer = document.createElement('button')
            butsupprimer.id = item.idpost
            butsupprimer.classList.add(item.idcommentaire)
            butsupprimer.addEventListener("click", () => {
                const idcom = butsupprimer.classList.value
                const idpost = butsupprimer.id
                console.log(idpost)
                fetch("back/delete_commentaire.php", {  // Vérifie bien le chemin ici (selon ton projet)
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id:idcom,
                        idpost:idpost
                    })
                })
                .then(response => response.json()) // Convertit la réponse en JSON
                .then(data => {
                    if (data.success) {
                        console.log(data)
                        window.location.href = `profil.html?id=${userId}`; // Redirige vers main.html si succès
                    }
                })
                    .catch(error => console.error("Erreur :", error))
            })

            butsupprimer.textContent = "Supprimer mon commentaire"
            butsupprimer.classList.add('post-button')

            userInfocommment.appendChild(userAvatarcomment)
            userInfocommment.appendChild(usernamecomment)
            contentDiv.appendChild(userInfocommment);
            contentDiv.appendChild(commentText);
            contentDiv.appendChild(butsupprimer)


            containerDiv.appendChild(contentDiv);
        });
    }

    // Fonction pour afficher les likes
    function displayLikes(data, containerDiv) {
        data.forEach(item => {
                        
            const contentDiv = document.createElement("div");
            contentDiv.classList.add('content');

            const itemDiv = document.createElement("div");
            itemDiv.classList.add('item');

            const userInfo = document.createElement('div');
            userInfo.classList.add('user-info-post');

            const userAvatar = document.createElement('img');
            userAvatar.classList.add('avatar');
            userAvatar.src = item.urlimagecompte;
            userAvatar.alt = "User Avatar";

            const userDetails = document.createElement('div');
            const username = document.createElement('span');
            username.classList.add('username');
            username.textContent = `${item.pseudo}`;

            userDetails.appendChild(username);
            userInfo.appendChild(userAvatar);
            userInfo.appendChild(userDetails);

            contentDiv.appendChild(userInfo);

            const description = document.createElement('p');
            description.textContent = item.description;
            itemDiv.appendChild(description);

            const postImage = document.createElement('img');
            postImage.classList.add('post-image');
            postImage.src = item.urlimage;
            postImage.alt = "Post Image";
            itemDiv.appendChild(postImage);

            contentDiv.appendChild(itemDiv);

            containerDiv.appendChild(contentDiv);
        });
    }

});




