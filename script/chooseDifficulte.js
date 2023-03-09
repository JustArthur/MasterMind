//-- Exécute la fonction au lancement de la page ------------
window.onload = nbrLigneDifficulte()



function nbrLigneDifficulte() {
    const plateau = document.getElementById('plateau');

    //-- Récupère dans une variable la difficulté choisi et stocké dans le storage précédamment ------------
    let difficulte = localStorage.getItem('laDifficulteChoisie')

    //-- Défini le nombre de ligne selon la difficulté choisi ------------
    switch(difficulte) {
        case 'bleusaille':
            nbrLigne = 10;
            break;

        case 'violence':
            nbrLigne = 7;
            break;

        case 'ultraViolence':
            nbrLigne = 5;
            break;

        case 'cauchemar':
            nbrLigne = 3;
            break;

        case 'ultraCauchemar':
            nbrLigne = 1;
            break;
    }

    //-- Une boucle qui permet l'ajout des nombres de ligne selon la difficulté ------------
    for(var i = 1; i <= nbrLigne; i++) {
        plateau.insertAdjacentHTML('afterbegin', '<div class="ligne-couleur"><div class="boite-couleur"></div><div class="boite-couleur"></div><div class="boite-couleur"></div><div class="boite-couleur"></div></div>')
    }
}