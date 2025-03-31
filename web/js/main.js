document.addEventListener("DOMContentLoaded", function() {
    // Récupération et affichage des posts.
    fetch('back/fetch_posts.php')
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('posts-container');
            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <div class="user-info">
                        <img src="https://via.placeholder.com/40" alt="User Avatar" />
                        <div>
                            <span class="username">Utilisateur ${post.IDCOMPTE}</span>
                            <span style="color: #aaa">· ${post.COMPTEURLIKE} likes</span>
                        </div>
                    </div>
                    <div class="content">
                        <p>${post.DESCRIPTION}</p>
                        <img src="${post.URLIMAGE}" alt="Post Image">
                    </div>
                    <div class="actions">
                        <span>${post.COMPTEURLIKE} likes</span>
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('JS : Erreur lors de la récupération des posts:', error));
});