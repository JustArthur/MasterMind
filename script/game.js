//-- S'il n'y a pas de difficulté choisi alors il renvoie à la page index ------------
let difficulte = localStorage.getItem('laDifficulteChoisie');

if(difficulte === null || difficulte === undefined || difficulte === '') {
    window.location.href = "https://justarthur.github.io/MasterMind/"
}



//-- Définir les sons de victoire, défaite et d'attente ------------
var audioWin = new Audio('../sounds/win-audio.mp3'),
    audioLoose = new Audio('../sounds/loose-audio.mp3'),
    musicAttente = new Audio('../sounds/waiting.mp3')

//-- Met la musique d'attente en boucle si le fichier se fini ------------
musicAttente.loop = true

//-- Joue un son différent selon le niveau de difficulté choisi ------------
switch(difficulte) {
    case 'bleusaille':
        var music = new Audio('../sounds/game-bleusaille.mp3')
        music.play()
        break;

    case 'violence':
        var music = new Audio('../sounds/game-violence.mp3')
        music.play()
        break;

    case 'ultraViolence':
        var music = new Audio('../sounds/game-ultraViolence.mp3')
        music.play()
        break;

    case 'cauchemar':
        var music = new Audio('../sounds/game-cauchemar.mp3')
        music.play()
        break;

    case 'ultraCauchemar':
        var music = new Audio('../sounds/game-ultraCauchemar.mp3')
        music.play()
        break;
}

//-- Pour ajouter la couleur à la case suivante ------------
let ordreCouleur = 0;

//-- Pour voir sur quelle colonne on se trouve ------------
let numColumn = 0;

//-- Le nombre d'essaie avant de trouver ou perdre pour le tableau des scores ------------
let nbrEssai = 0;

//-- Tableau des couleurs que l'utilisateurs à saisi sur une ligne ------------
let ligneCouleur = [];

//-- Pour un message de victoire, de loose et les couleurs bonne------------
const popup = document.getElementById('main-popup'),
    titre = document.getElementById('titre'),
    logLigne = document.getElementById('ligne');

//-- Récupère le tableau des scores en JSON -----------
let scores = JSON.parse(localStorage.getItem("scores")) || [];

//-- Défini le tableau pour les couleurs à trouvé ------------
let combinaisonCouleurs = [];

//-- Pour la version française des couleurs (uniquement pour rendre le jeu plus beau visuellement lorque nous perdons) ------------
let combinaisonCouleursFR = [];



//-- Valeurs des int pour le choix des couleurs plus tard ------------
let valeurs = [1, 2, 3, 4];

//-- S'il vois qu'il y a un doublons il continue à cherche un autre int ------------
for (let i = 0; i < 4; i++) {


    let index = Math.floor(Math.random() * valeurs.length);
    combinaisonCouleurs.push(valeurs[index]);
    valeurs.splice(index, 1);
}

//-- Change les int en texte pour les couleurs ------------
for (let i = 0; i < combinaisonCouleurs.length; i++) {
  switch (combinaisonCouleurs[i]) {

    //-- Si c'est = 1 alors il push la couleur bleu dans le tableau des couleurs ------------
    case 1:
        combinaisonCouleurs[i] = 'blue';
        combinaisonCouleursFR[i] = 'bleu';
        break;

    //-- Si c'est = 2 alors il push la couleur rouge dans le tableau des couleurs ------------
    case 2:
        combinaisonCouleurs[i] = 'red';
        combinaisonCouleursFR[i] = 'rouge';
        break;

    //-- Si c'est = 3 alors il push la couleur jaune dans le tableau des couleurs ------------
    case 3:
        combinaisonCouleurs[i] = 'yellow';
        combinaisonCouleursFR[i] = 'jaune';
        break;

    //-- Si c'est = 4 alors il push la couleur vert dans le tableau des couleurs ------------
    case 4:
        combinaisonCouleurs[i] = 'green';
        combinaisonCouleursFR[i] = 'vert';
        break;
  }
}





//-- Ajoute un score au tableau avec ses paramètres ------------
function addScore(dateHeureNow, nbrEssai, difficulte, status) {
    //-- Il push dans le tableau score la date et l'heure de la partie, le nombres d'essais  avant de trouver ou perdre, la difficulté choisi, et si la partie est gagné ou perdu ------------
    scores.push({
        dateHeureNow: dateHeureNow,
        nbrEssai: nbrEssai,
        difficulte: difficulte,
        status: status
    });

    //-- La fonction saveScore est apelé ------------
    saveScores();
}




//-- Enregistrer le tableau de score dans le localStorage en JSON ------------
function saveScores() {
    localStorage.setItem("scores", JSON.stringify(scores));
}




//-- Quand un bouton d'une couleur est cliqué ------------
function clickBtn(couleur) {
    const boiteCouleur = document.getElementsByClassName('boite-couleur'),
        nbrCase = boiteCouleur.length;

    //-- Récupère la date et l'heure pour le score ------------
    let date = new Date()
    let jour = date.getDate()
    let mois = date.getMonth()+1
    let annee = date.getFullYear()
    let heure = date.getHours()
    let minutes = date.getMinutes()

    let dateHeureNow = `${jour}/${mois}/${annee} à ${heure}:${minutes}`

    //-- Rajoute la couleur selon la couleur choisi ------------
    boiteCouleur[ordreCouleur].style.backgroundColor = couleur;

    //-- Rajoute la couleur ajouté par l'utilisateur dans un tableau ------------
    ligneCouleur.push(couleur);

    //-- Auto-increment pour les lignes ------------
    ordreCouleur++
    numColumn++

    //-- S'il n'y a plus de possibilté de jouer alors il pert ------------
    if(ordreCouleur === nbrCase && JSON.stringify(combinaisonCouleurs) !== JSON.stringify(ligneCouleur)) {
        //-- Ajoute un essaie qu'il soit bon ou non ------------
        nbrEssai++
        
        //-- Ajoute un score en tant que perdu ------------
        addScore(dateHeureNow, nbrEssai, localStorage.getItem('laDifficulteChoisie'), 'Perdu');

        //-- Met en pause la musique de fond joué ------------
        music.pause()

        //-- Lance le son de defaite ------------
        audioLoose.play()

        //-- Ecrit le texte de défaite ------------
        titre.innerHTML = 'Vous avez perdu !<br>Les couleurs gagantes sont ' + combinaisonCouleursFR.join(', ');

        //-- Affiche la popup ------------
        popup.classList.add('active');

        //-- Après 10 secondes un son d'attente est lancé ------------
        setTimeout(() => { musicAttente.play() }, 10000)

    //-- Sinon si une ligne est rempli ------------
    } else if(numColumn == 4) {
        //-- Ajoute un essaie qu'il soit bon ou non ------------
        nbrEssai++

        //-- Il vérifie si les tableaux sont égaux ------------
        if(JSON.stringify(combinaisonCouleurs) === JSON.stringify(ligneCouleur)) {

            //-- Ajoute un score en tant que gagnant ------------
            addScore(dateHeureNow, nbrEssai, localStorage.getItem('laDifficulteChoisie'), 'Gagné');

            //-- Joue le son de la victoire avec le son de vistoire ------------
            music.pause()
            audioWin.play()

            //-- Affiche la popup de victoire ------------
            titre.innerHTML = 'Vous avez gagné !';
            popup.classList.add('active');

            //-- Après 10 secondes un son d'attente est mis ------------
            setTimeout(() => {
                musicAttente.play()
            }, 10000)

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

            //-- Remet à zero les variables pour continuer le jeu ------------
            numColumn = 0;

            //-- Vide le tableau ------------
            ligneCouleur.splice(ligneCouleur);
        }    
    }
}
