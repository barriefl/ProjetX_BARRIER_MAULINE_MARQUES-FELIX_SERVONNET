document.addEventListener("DOMContentLoaded", () => {
    const modalInscription = document.querySelector(".modal-inscription");
    const modalConnexion = document.querySelector(".modal-connexion");
    const btnCreate = document.querySelector(".btn-create");
    const btnLogin = document.querySelector(".btn-login");
    const closeButtons = document.querySelectorAll(".close-modal");

    // Fonction pour ouvrir une modale
    function openModal(modal) {
        modal.style.display = "flex";
    }

    // Fonction pour fermer une modale
    function closeModal(modal) {
        modal.style.display = "none";
    }

    // Ouvrir la modale d'inscription
    btnCreate.addEventListener("click", () => {
        openModal(modalInscription);
    });

    // Ouvrir la modale de connexion
    btnLogin.addEventListener("click", () => {
        openModal(modalConnexion);
    });

    // Fermer les modales en cliquant sur le bouton (X)
    closeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const modal = event.target.closest(".modal-container");
            closeModal(modal);
        });
    });

    // Fermer la modale en cliquant à l'extérieur du contenu
    window.addEventListener("click", (event) => {
        if (event.target.classList.contains("modal-container")) {
            closeModal(event.target);
        }
    });

        // Gestion de la connexion
// Gestion de la connexion
const connexionForm = document.getElementById("connexionForm");

if (connexionForm) {
    connexionForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("connexionEmail").value;
        console.log(email)
        const password = document.getElementById("connexionPassword").value;
        console.log(password)
        // Récupérer l'attribut data dans le formulaire
        const userData = {
            email: email,
            password: password
        };
        console.log(userData)
        fetch("db.php", {  // Vérifie bien le chemin ici (selon ton projet)
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `data=${encodeURIComponent(JSON.stringify(userData))}`
        })
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => {
            alert(data.message); // Affiche le message du serveur
            if (data.success) {
                // Si la connexion réussie, envoie les informations du compte dans main.html via localStorage
                localStorage.setItem('userData', JSON.stringify(data.user)); // Sauvegarder les infos dans le localStorage
                window.location.href = "main.html"; // Redirige vers main.html
            }
        })
        .catch(error => console.log("Erreur :", error));
    });
}

window.onload = function() {
    // Récupère les données utilisateur depuis le localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        console.log("Utilisateur connecté:", userData); // Affiche les informations utilisateur
        // Tu peux utiliser les données ici, par exemple afficher le nom d'utilisateur dans une balise HTML
        document.getElementById('username').textContent = userData.username;
    } 
};


});
