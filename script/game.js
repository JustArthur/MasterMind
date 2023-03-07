//-- S'il n'y a pas de difficulté choisi alors il renvoie à la page index ------------
let difficulte = localStorage.getItem('laDifficulteChoisie')
if(difficulte === null || difficulte === undefined || difficulte === '') {
    window.location.href = "../index.html"
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

//-- Tableau des scores de la partie ------------
let gameScore = [];

//-- Pour un message de victoire ou de loose ------------
const popup = document.getElementById('main-popup');
const titre = document.getElementById('titre');



//-- Défini des tableaux pour le random de couleur SANS doublons ------------
let valeurs = [1, 2, 3, 4];
let combinaisonCouleurs = [];

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
      break;
    case 2:
        combinaisonCouleurs[i] = 'red';
      break;
    case 3:
        combinaisonCouleurs[i] = 'yellow';
      break;
    case 4:
        combinaisonCouleurs[i] = 'green';
      break;
  }
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
        titre.innerHTML = 'Vous avez perdu !';
        popup.classList.add('active');

    //-- Sinon si une ligne est rempli ------------
    } else if(numColumn == 4) {
        //-- Ajoute un essaie qu'il soit bon ou non ------------
        nbrEssai++

        //-- Il vérifie si les tableaux sont égaux ------------
        if(JSON.stringify(combinaisonCouleurs) === JSON.stringify(ligneCouleur)) {

            titre.innerHTML = 'Vous avez gagné !';
            popup.classList.add('active');

        //-- Sinon il remet à zero ------------
        } else {

            //-- Tableaux comparateur pour voir si oui ou non les couleurs sont au bon endroit ou un endroit différent ------------
            let memeEmplacement = [];
            let autreEmplacement = [];

            //-- Vérifier si les tableaux contiennent les mêmes éléments dans la même position ------------
            for (let i = 0; i < combinaisonCouleurs.length; i++) {
                if (combinaisonCouleurs[i] === ligneCouleur[i]) {  
                    memeEmplacement.push(combinaisonCouleurs[i]);

                } else if (combinaisonCouleurs.indexOf(ligneCouleur[i]) !== -1) {
                    autreEmplacement.push(ligneCouleur[i]);
                }
            }
            console.log(`Les couleurs suivantes sont présentes dans le même emplacement : ${memeEmplacement.join(', ')}.`);
            console.log(`Les couleurs suivantes sont présentes mais pas dans le bon emplacement : ${autreEmplacement.join(', ')}.`);

            numColumn = 0;
            ligneCouleur.splice(ligneCouleur);
        }    
    }

}