//-- Charge les scores sauvegardé dans le stockage ------------
let scores = JSON.parse(localStorage.getItem("scores")) || [];

//-- Pour le style d'une partie gagné ou perdu ------------
var couleur = '';

//-- Récupère le tableau sur la page HTML ------------
const tableau = document.getElementById('tableau')

//-- Ajoute au tableau les scores sauvegardé ------------
for(let i = 0; i < scores.length; i++) {

    //-- Pour rendre le tableau plus beau ------------
    switch(scores[i].difficulte) {
        case 'bleusaille':
            difficulte = 'Bleusaille';
            break;
    
        case 'violence':
            difficulte = 'Violence';
            break;
    
        case 'ultraViolence':
            difficulte = 'Ultra-Violence';
            break;
    
        case 'cauchemar':
            difficulte = 'Cauchemar';
            break;
    
        case 'ultraCauchemar':
            difficulte = 'Ultra-Cauchemar';
            break;
    }

    //-- Change la couleur du fond pour qu'il soit plus compréhensible ------------
    if(scores[i].status === 'Gagné') {
        couleur = 'green';
    } else {
        couleur = 'red'
    }

    //-- Insert la ligne dans le tableau ------------
    tableau.insertAdjacentHTML('beforeend', `<tr><td>${scores[i].nbrEssai}</td><td>${difficulte}</td><td style="background-color:${couleur}; color:#FFFFFF">${scores[i].status}</td></tr>`)
}