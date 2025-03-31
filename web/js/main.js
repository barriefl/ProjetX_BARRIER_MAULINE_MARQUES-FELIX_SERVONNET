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
                username.textContent = `${post.nom}`;

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

                actions.appendChild(likes);

                // Assemblage de toutes les sections dans le postElement
                postElement.appendChild(userInfo);
                postElement.appendChild(content);
                postElement.appendChild(actions);

                // Ajout du post au conteneur
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des posts:', error));
});
