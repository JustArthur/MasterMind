//Pour ajouter la couleur à la case suivante
let ordreCouleur = 0;

//Pour voir sur quelle colonne on se trouve
let numColumn = 0;

//Tableau des couleurs à trouvé
let combinaisonCouleurs = [];

//Tableau des couleurs que l'utilisateurs à saisi sur une ligne
let ligneCouleur = [];

function getDifficulte(difficulte) {
    const plateau = document.getElementById('plateau');

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

    console.log(difficulte)

    for(var i = 1; i <= nbrLigne; i++) {
        plateau.insertAdjacentHTML('afterbegin', '<div class="ligne-couleur"><div class="boite-couleur"></div><div class="boite-couleur"></div><div class="boite-couleur"></div><div class="boite-couleur"></div></div>')
    }
}


//Une boucle pour les quatres couleurs défini
for(let i = 0; i < 4; i++) {
    
    color = Math.floor(Math.random() * 4) + 1;
    
    switch(color) {
        case 1:
            colorText = 'blue';
            break;
            
        case 2:
            colorText = 'red';
            break;
        
        case 3:
            colorText = 'yellow';
            break;
            
        case 4:
            colorText = 'green';
            break;
    }
    
    combinaisonCouleurs.push(colorText);
}

function clickBtn(couleur) {
    const boiteCouleur = document.getElementsByClassName('boite-couleur');
    var nbrCase = boiteCouleur.length;

    boiteCouleur[ordreCouleur].style.backgroundColor = couleur;
    ligneCouleur.push(couleur);

    ordreCouleur++
    numColumn++

    if(ordreCouleur == nbrCase) {
        window.alert('Nul, vous avez perdu ! La réponse était ' + combinaisonCouleurs)
        location.reload()

    } else if(numColumn == 4) {
        if(JSON.stringify(combinaisonCouleurs) === JSON.stringify(ligneCouleur)) {
            window.alert('Bravo, vous avez gagné !')

        } else {
            numColumn = 0;
            ligneCouleur.splice(ligneCouleur);
        }    
    }
}