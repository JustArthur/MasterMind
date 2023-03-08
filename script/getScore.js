//-- Charge les scores sauvegardé dans le stockage ------------
let scores = JSON.parse(localStorage.getItem("scores")) || [];

//-- Récupère les valeus du localStorage ------------
let nomJoueur = scores[0],
    nbrEssai = scores[1],
    difficulte = scores[2],
    statut = scores[3];


if(scores[0] === undefined) {
    nomJoueur = 'Aucunes données';
    nbrEssai = 'Aucunes données';
    difficulte = 'Aucunes données';
    statut = 'Aucunes données';
}



const tableau = document.getElementById('tableau')

tableau.insertAdjacentHTML('beforeend', `<tr><td>${nomJoueur}</td><td>${nbrEssai}</td><td>${difficulte}</td><td>${statut}</td></tr>`)