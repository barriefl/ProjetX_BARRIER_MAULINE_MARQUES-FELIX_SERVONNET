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
            console.log(data);
            const postsContainer = document.querySelector('.posts-container');
            console.log(postsContainer)
            data.forEach(post => {
                console.log(post)
                // Création de l'élément principal du post
                const postElement = document.createElement('div');
                postElement.classList.add('post');

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
                content.classList.add('content');

                const description = document.createElement('p');
                description.textContent = post.description;

                const postImage = document.createElement('img');
                postImage.src = post.urlimage;
                postImage.alt = "Post Image";

                content.appendChild(description);
                content.appendChild(postImage);

                // Création de la section actions
                const actions = document.createElement('div');
                actions.classList.add('actions');

                const likes = document.createElement('span');
                likes.textContent = `${post.compteurlike} likes`;

                const divcomment = document.createElement('div')
                divcomment.id = "comment" + post.idpost
                

                const buttonLike = document.createElement('button')
                buttonLike.classList="butlike"
                const imglike = document.createElement('img')
                imglike.classList = "imglike"


                const buttoncomment = document.createElement('button')
                buttoncomment.classList="butcomment"
                const imgcommment = document.createElement('img')
                imgcommment.classList = "imgcomment"
                imgcommment.src = "./image/inverted_image.png"
                buttoncomment.appendChild(imgcommment)
                buttoncomment.addEventListener("click", () => {
         
                    const div = document.getElementById('comment' + post.idpost); // Trouver la div des commentaires
                    
                    // Si la div n'est pas vide, cela signifie que les commentaires sont déjà affichés, donc on les vide
                    if (div.innerHTML !== "") {
                        div.innerHTML = ""; // Enlever les commentaires
                    } else {
                        // Sinon, on récupère les commentaires
                        fetch(`../back/fetch_comment.php?idpost=${post.idpost}`)
                            .then(response => response.json())
                            .then(data => {
                                // Vider la div pour éviter les doublons
                                div.innerHTML = "";

                                console.log(data)
                
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
                                    div.appendChild(commentDiv);
                                });
                            })
                            .catch(error => console.error("Erreur lors du fetch des commentaires :", error));
                    }
                });
                
                actions.appendChild(likes);
                actions.appendChild(buttoncomment);

                // Assemblage de toutes les sections dans le postElement
                postElement.appendChild(userInfo);
                postElement.appendChild(content);
                postElement.appendChild(actions);
                postElement.appendChild(divcomment);

                // Ajout du post au conteneur
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des posts:', error));
});
