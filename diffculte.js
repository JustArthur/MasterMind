window.onload = nbrLigneDifficulte()

function nbrLigneDifficulte() {
    const plateau = document.getElementById('plateau');

    let difficulte = localStorage.getItem('laDifficulteChoisie')
    console.log(difficulte)

    switch(difficulte) {
        case 'bleusaille':
            nbrLigne = 10;
            break;

        case 'violence':
            nbrLigne = 8;
            break;

        case 'ultraViolence':
            nbrLigne = 6;
            break;

        case 'cauchemar':
            nbrLigne = 3;
            break;

        case 'ultraCauchemar':
            nbrLigne = 1;
            break;
    }

    for(var i = 1; i <= nbrLigne; i++) {
        plateau.insertAdjacentHTML('afterbegin', '<div class="ligne-couleur"><div class="boite-couleur"></div><div class="boite-couleur"></div><div class="boite-couleur"></div><div class="boite-couleur"></div></div>')
    }
}