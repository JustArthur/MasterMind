//-- S'il n'y a pas de difficulté choisi alors il renvoie à la page index ------------
let difficulte = localStorage.getItem('laDifficulteChoisie')
if(difficulte === null || difficulte === undefined || difficulte === '') {
    window.location.href = "https://justarthur.github.io/MasterMind/"
}



//-- Sons de win et loose ------------
var audioWin = new Audio('../sounds/victory-sound-effect.mp3')

//-- Sons de fonds ------------
var audioBleusaille = new Audio('../sounds/game-bleusaille.mp3'),
    audioViolence = new Audio('../sounds/game-violence.mp3'),
    audioUltraViolence = new Audio('../sounds/game-ultraViolence.mp3'),
    audioCauchemar = new Audio('../sounds/game-cauchemar.mp3'),
    audioUltraCauchemar = new Audio('../sounds/game-ultraCauchemar.mp3')


//-- Joue un son différent celon le niveau de difficulté choisi ------------
switch(difficulte) {
    case 'bleusaille':
        audioBleusaille.play();
        break;

    case 'violence':
        audioViolence.play();
        break;

    case 'ultraViolence':
        audioUltraViolence.play();
        break;

    case 'cauchemar':
        audioCauchemar.play();
        break;

    case 'ultraCauchemar':
        audioUltraCauchemar.play();
        break;
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

//-- Récupère le tableau des scores ------------
let scores = JSON.parse(localStorage.getItem("scores")) || [];

//-- Défini des tableaux pour le random de couleur SANS doublons ------------
let valeurs = [1, 2, 3, 4];
let combinaisonCouleurs = [];

//-- Pour la version française des couleurs (uniquement pour rendre le jeu plus beau visuellement ------------
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
function addScore(nbrEssai, difficulte, status) {
    scores.push({
        nbrEssai: nbrEssai,
        difficulte: difficulte,
        status: status
    });
    saveScores();
}




//-- Enregistrer le tableau de score dans le localStorage ------------
function saveScores() {
    localStorage.setItem("scores", JSON.stringify(scores));
}




//-- Function pour quand une couleur est cliqué il l'a rajoute à la ligne ------------
function clickBtn(couleur) {
    const boiteCouleur = document.getElementsByClassName('boite-couleur'),
        nbrCase = boiteCouleur.length;

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
 
        //-- Si le choix est en ultra-cauchemar il regarde si le choix de l'utilisateur est bon ou non ------------
        if(localStorage.getItem('laDifficulteChoisie') === 'ultraCauchemar' && JSON.stringify(combinaisonCouleurs) === JSON.stringify(ligneCouleur)) {

            //-- Ajoute un score en tant que gagnant ------------
            addScore(nbrEssai, localStorage.getItem('laDifficulteChoisie'), 'Gagné');

            //-- Joue le son de la victoire ------------
            audioWin.play()

            //-- Affiche la popup de victoire ------------
            titre.innerHTML = 'Vous avez gagné !';
            popup.classList.add('active');
            
        } else {

            //-- Ajoute un score en tant que perdu ------------
            addScore(nbrEssai, localStorage.getItem('laDifficulteChoisie'), 'Perdu');

            //-- Affiche la popup de défaite ------------
            titre.innerHTML = 'Vous avez perdu !<br>Les couleurs gagantes sont ' + combinaisonCouleursFR.join(', ');
            popup.classList.add('active');
        }

    //-- Sinon si une ligne est rempli ------------
    } else if(numColumn == 4) {
        //-- Ajoute un essaie qu'il soit bon ou non ------------
        nbrEssai++

        //-- Il vérifie si les tableaux sont égaux ------------
        if(JSON.stringify(combinaisonCouleurs) === JSON.stringify(ligneCouleur)) {

            //-- Ajoute un score en tant que gagnant ------------
            addScore(nbrEssai, localStorage.getItem('laDifficulteChoisie'), 'Gagné');

            //-- Joue le son de la victoire ------------
            audioWin.play()

            //-- Affiche la popup de victoire ------------
            titre.innerHTML = 'Vous avez gagné !';
            popup.classList.add('active');

        //-- Sinon il remet à zero ------------
        } else {

            //-- Tableaux comparateur pour voir si oui ou non les couleurs sont au bon endroit ou un endroit différent ------------
            let memeEmplacement = [];
            let autreEmplacement = [];

            //-- Vérifier si les tableaux contiennent les mêmes éléments dans la même position ------------
            for (let i = 0; i < combinaisonCouleurs.length; i++) {

                //-- Si l'un deux est au bon endroit il le rajoute dans le tableau ------------
                if(combinaisonCouleurs[i] === ligneCouleur[i]) {
                    memeEmplacement.push(combinaisonCouleurs[i]);

                //-- Si l'un deux est pas au bon endroit il le rajoute dans le tableau ------------
                } else if (combinaisonCouleurs.indexOf(ligneCouleur[i]) !== -1) {
                    autreEmplacement.push(ligneCouleur[i]);
                }
            }

            //-- Défini un texte différent selon le nombre de couleurs au bon endroit ------------
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