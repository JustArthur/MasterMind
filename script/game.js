//-- S'il n'y a pas de difficulté choisi alors il renvoie à la page index ------------
let difficulte = localStorage.getItem('laDifficulteChoisie')
if(difficulte === null || difficulte === undefined || difficulte === '') {
    window.location.href = "../index.html"
}

//-- -- Pour ajouter la couleur à la case suivante ------------
let ordreCouleur = 0;

//-- Pour voir sur quelle colonne on se trouve ------------
let numColumn = 0;

//-- Tableau des couleurs à trouvé (Reponse permet de mettre els couleurs en français avec le switch) ------------
let combinaisonCouleurs = [];
let combinaisonCouleursReponse = [];

//-- Tableau des couleurs que l'utilisateurs à saisi sur une ligne ------------
let ligneCouleur = [];

//-- Une boucle pour les quatres couleurs défini ------------
for(let i = 0; i < 4; i++) {
    color = Math.floor(Math.random() * 4) + 1;
   
    //-- Celon le chiffre X choisi il défini une couleur ------------
    switch(color) {
        case 1:
            colorText = 'blue';
            colorReponse = 'Bleu';
            break;
            
        case 2:
            colorText = 'red';
            colorReponse = 'Rouge';
            break;
        
        case 3:
            colorText = 'yellow';
            colorReponse = 'Jaune';
            break;
            
        case 4:
            colorText = 'green';
            colorReponse = 'Vert';
            break;
    }
    
    // -- Ajoute dans le tableau les couleurs
    combinaisonCouleurs.push(colorText);
    combinaisonCouleursReponse.push(colorReponse);
}




//-- Function pour quand une couleur est cliqué il l'a rajoute à la ligne ------------
function clickBtn(couleur) {
    const boiteCouleur = document.getElementsByClassName('boite-couleur');
    const nbrCase = boiteCouleur.length;

    //-- Rajoute la couleur selon la couleur choisi ------------
    boiteCouleur[ordreCouleur].style.backgroundColor = couleur;

    //-- Rajoute la couleur ajouté par l'utilisateur dans un tableau ------------
    ligneCouleur.push(couleur);

    //-- Auto-increment pour les lignes ------------
    ordreCouleur++
    numColumn++

    //-- S'il n'y a plus de possibilté de joué alors il pert ------------
    if(ordreCouleur == nbrCase) {
        window.alert('Vous avez perdu ! La réponse était ' + combinaisonCouleursReponse)
        window.location.href = "../index.html"

    //-- Sinon si une ligne est rempli ------------
    } else if(numColumn == 4) {
        
        //-- Il vérifie si les tableaux sont égaux ------------
        if(JSON.stringify(combinaisonCouleurs) === JSON.stringify(ligneCouleur)) {
            window.alert('Bravo, vous avez gagné !')
            window.location.href = "../index.html"

        //-- sinon il remet à zero ------------
        } else {
            numColumn = 0;
            ligneCouleur.splice(ligneCouleur);
        }    
    }
}

//-- Retour au menu home et vide la difficulté ------------
function retourMenu() {

    //-- Re-défini la variable à vide ------------
    localStorage.setItem('laDifficulteChoisie', '')
    window.location.href = "../index.html"
}