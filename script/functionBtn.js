//-- Recupére la diffucté celon le btn cliqué et la sauvegarde en local ------------
function getDifficulte(difficulte) {
    localStorage.setItem('laDifficulteChoisie', difficulte)
    
    window.location.href = "https://justarthur.github.io/MasterMind/pages/jeu.html"    
}

//-- Redirige vers une page ------------
function redirectionPage(page) {
    //-- Re-défini la variable à vide (au-cas où on voudrais ne pas remettre une difficulté en passant par une autre page en plein jeu) ------------
    localStorage.removeItem('laDifficulteChoisie')

    //-- Redirige l'uitlisateur selon le bouton cliqué ------------
    switch(page) {
        case 'score':
            //-- Redirige vers la page des scores ------------
            window.location.href = "https://justarthur.github.io/MasterMind/pages/score.html"
            break;

        case 'retour': 
            //-- Redirige vers la page index ------------          
            window.location.href = "https://justarthur.github.io/MasterMind/"
            break;

        case 'credit':
            //-- Redirige vers la page credit ------------          
            window.location.href = "https://justarthur.github.io/MasterMind/pages/credits.html"
            break;
    }
}