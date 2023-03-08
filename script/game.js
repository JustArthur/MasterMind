//-- S'il n'y a pas de difficulté choisi alors il renvoie à la page index ------------
let difficulte = localStorage.getItem('laDifficulteChoisie')
if(difficulte === null || difficulte === undefined || difficulte === '') {
    window.location.href = "https://justarthur.github.io/MasterMind/"
}

//-- -- Pour ajouter la couleur à la case suivante ------------
let ordreCouleur = 0;

//-- Pour voir sur quelle colonne on se trouve ------------
let numColumn = 0;

//-- Le nombre d'essaie avant de trouver ou perdre pour le tableau des scores ------------
let nbrEssai = 0;

//-- Tableau des couleurs à trouvé (Reponse permet de mettre els couleurs en français avec le switch) ------------
let combinaisonCouleursReponse = [];

//-- Tableau des couleurs que l'utilisateurs à saisi sur une ligne ------------
let ligneCouleur = [];

//-- Points par défault pour une game ------------
let defaultPoints = 500;

//-- Pour un message de victoire, de loose et les couleurs bonne------------
const popup = document.getElementById('main-popup'),
    titre = document.getElementById('titre'),
    logLigne = document.getElementById('ligne');



//-- Défini des tableaux pour le random de couleur SANS doublons ------------
let valeurs = [1, 2, 3, 4];
let combinaisonCouleurs = [];

//-- Pour la version française des couleurs ------------
let combinaisonCouleursFR = [];


//-- S'il vois qu'il y a un doublons il continue à faire le for ------------
for (let i = 0; i < 4; i++) {
  let index = Math.floor(Math.random() * valeurs.length);
  combinaisonCouleurs.push(valeurs[index]);
  valeurs.splice(index, 1);
}

//-- Change les int en texte pour les couleurs ------------
for (let i = 0; i < combinaisonCouleurs.length; i++) {
  switch (combinaisonCouleurs[i]) {
    case 1:
        combinaisonCouleurs[i] = 'blue';
        combinaisonCouleursFR[i] = 'bleu';
        break;

    case 2:
        combinaisonCouleurs[i] = 'red';
        combinaisonCouleursFR[i] = 'rouge';
        break;

    case 3:
        combinaisonCouleurs[i] = 'yellow';
        combinaisonCouleursFR[i] = 'jaune';
        break;

    case 4:
        combinaisonCouleurs[i] = 'green';
        combinaisonCouleursFR[i] = 'vert';
        break;
  }
}





//-- Ajouter un score au tableau ------------
function addScore(name, nbrEssai, difficulte, status) {
    scores.push({ name: name, nbrEssai: nbrEssai, difficulte: difficulte, status: status});
    saveScores();
}




//-- Enregistrer le tableau de score dans le localStorage ------------
function saveScores() {
    localStorage.setItem("scores", JSON.stringify(scores));
}




//-- Function pour quand une couleur est cliqué il l'a rajoute à la ligne ------------
function clickBtn(couleur) {
    const boiteCouleur = document.getElementsByClassName('boite-couleur'),
        nbrCase = boiteCouleur.length,
        userInput = document.getElementById('inputUser')

    //-- Rajoute la couleur selon la couleur choisi ------------
    boiteCouleur[ordreCouleur].style.backgroundColor = couleur;

    //-- Rajoute la couleur ajouté par l'utilisateur dans un tableau ------------
    ligneCouleur.push(couleur);

    //-- Auto-increment pour les lignes ------------
    ordreCouleur++
    numColumn++

    //-- S'il n'y a plus de possibilté de joué alors il pert ------------
    if(ordreCouleur === nbrCase) {
        //-- Ajoute un essaie qu'il soit bon ou non ------------
        nbrEssai++
 
        if(localStorage.getItem('laDifficulteChoisie') === 'ultraCauchemar' && JSON.stringify(combinaisonCouleurs) === JSON.stringify(ligneCouleur)) {

            addScore(userInput.value, nbrEssai, localStorage.getItem('laDifficulteChoisie'), 'Gagné');

            titre.innerHTML = 'Vous avez gagné !';
            popup.classList.add('active');
            
        } else {

            addScore(userInput.value, nbrEssai, localStorage.getItem('laDifficulteChoisie'), 'Perdu');

            titre.innerHTML = 'Vous avez perdu !<br>Les couleurs gagantes sont ' + combinaisonCouleursFR.join(', ');
            popup.classList.add('active');
        }

    //-- Sinon si une ligne est rempli ------------
    } else if(numColumn == 4) {
        //-- Ajoute un essaie qu'il soit bon ou non ------------
        nbrEssai++

        //-- Il vérifie si les tableaux sont égaux ------------
        if(JSON.stringify(combinaisonCouleurs) === JSON.stringify(ligneCouleur)) {

            addScore(userInput.value, nbrEssai, localStorage.getItem('laDifficulteChoisie'), 'Gagné');

            titre.innerHTML = 'Vous avez gagné !';
            popup.classList.add('active');

        //-- Sinon il remet à zero ------------
        } else {

            //-- Tableaux comparateur pour voir si oui ou non les couleurs sont au bon endroit ou un endroit différent ------------
            let memeEmplacement = [];

            //-- Vérifier si les tableaux contiennent les mêmes éléments dans la même position ------------
            for (let i = 0; i < combinaisonCouleurs.length; i++) {
                memeEmplacement.push(combinaisonCouleurs[i]);
            }

            //-- Défini un texte différent selon le nombre de couleurs bonne ------------
            if(memeEmplacement.length === 0) {
                logLigne.innerHTML = `Aucune couleurs sont au bon endroit`;

            } else if(memeEmplacement.length === 1) {
                logLigne.innerHTML = `Une seule couleur est bien placé`;

            } else if(memeEmplacement.length === 2){
                logLigne.innerHTML = `Deux couleurs sont bien placé`;

            } else {
                logLigne.innerHTML = `Trois couleurs sont bien placé`
            }

            //-- Remet à zero les variable pour continuer le jeu ------------
            numColumn = 0;
            ligneCouleur.splice(ligneCouleur);
        }    
    }
}