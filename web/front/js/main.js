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
});
