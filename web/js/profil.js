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
        const home = document.getElementById('home') 
        home.addEventListener("click", () => {
            window.location.href = `main.html?id=${userId}`;
        })
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
            const contentDiv = document.getElementById("content");
            contentDiv.innerHTML = ''; // Vider le contenu avant de l'actualiser

            // Selon l'endpoint, on appelle la fonction correspondante
            if (endpoint.includes("posts")) {
                displayPosts(data, contentDiv);
            } else if (endpoint.includes("retweets")) {
                displayRetweets(data, contentDiv);
            } else if (endpoint.includes("comments")) {
                displayComments(data, contentDiv);
            } else if (endpoint.includes("likes")) {
                displayLikes(data, contentDiv);
            }
        })
        .catch(error => {
            console.error("Error loading data:", error);
            const contentDiv = document.getElementById("content");
            contentDiv.innerHTML = "Erreur de chargement des données.";
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
    function displayPosts(data, contentDiv) {
        data.forEach(item => {
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

            contentDiv.appendChild(itemDiv);
        });
    }

    // Fonction pour afficher les retweets
    function displayRetweets(data, contentDiv) {
        data.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add('item');

            const userAvatar = document.createElement('img');
            userAvatar.src = item.urlimagecompte;
            userAvatar.alt = "User Avatar";
            itemDiv.appendChild(userAvatar)

            const author = document.createElement("p");
            author.textContent = `Auteur: ${item.pseudo}`;
            itemDiv.appendChild(author);

            
            const description = document.createElement("p");
            description.textContent = item.description;
            itemDiv.appendChild(description);

            const image = document.createElement("img");
            image.classList.add('post-image');
            image.src = item.urlimage;
            itemDiv.appendChild(image);



            contentDiv.appendChild(itemDiv);
        });
    }

    // Fonction pour afficher les commentaires
    function displayComments(data, contentDiv) {
        data.forEach(item => {

            const itemDiv = document.createElement("div");
            itemDiv.classList.add('item');

            const userAvatar = document.createElement('img');
            userAvatar.src = item.urlimagecompte;
            userAvatar.alt = "User Avatar";
            itemDiv.appendChild(userAvatar)

            const pseudo = document.createElement("p");
            pseudo.textContent = `Auteur: ${item.pseudo}`;
            itemDiv.appendChild(pseudo);

            const title = document.createElement("h3");
            title.textContent = item.description;
            itemDiv.appendChild(title);

            const image = document.createElement("img");
            image.classList.add('post-image');
            image.src = item.urlimage;
            itemDiv.appendChild(image);
            
            const commentText = document.createElement("p");
            commentText.textContent = item.texte;
            itemDiv.appendChild(commentText);

            contentDiv.appendChild(itemDiv);
        });
    }

    // Fonction pour afficher les likes
    function displayLikes(data, contentDiv) {
        data.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add('item');

            const userInfo = document.createElement('div');
            userInfo.classList.add('user-info');

            const userAvatar = document.createElement('img');
            userAvatar.src = item.urlimagecompte;
            userAvatar.alt = "User Avatar";

            const userDetails = document.createElement('div');
            const username = document.createElement('span');
            username.classList.add('username');
            username.textContent = `${item.pseudo}`;

            userDetails.appendChild(username);
            userInfo.appendChild(userAvatar);
            userInfo.appendChild(userDetails);

            const content = document.createElement('div');
            content.classList.add('content');

            const description = document.createElement('p');
            description.textContent = item.description;

            const postImage = document.createElement('img');
            image.classList.add('post-image');
            postImage.src = item.urlimage;
            postImage.alt = "Post Image";

            content.appendChild(description);
            content.appendChild(postImage);

            itemDiv.appendChild(userInfo);
            itemDiv.appendChild(content);

            contentDiv.appendChild(itemDiv);
        });
    }

});




