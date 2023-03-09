//-- Recupére la diffucté celon le btn cliqué et la sauvegarde en local ------------
function getDifficulte(difficulte) {
    localStorage.setItem('laDifficulteChoisie', difficulte)
    
    window.location.href = "https://justarthur.github.io/MasterMind/pages/jeu.html"    
}

//-- Redirige vers une page ------------
function redirectionPage(page) {
    //-- Re-défini la variable à vide (au-cas où on voudrais ne pas remettre une difficulté en passant par une autre page en plein jeu) ------------
    localStorage.setItem('laDifficulteChoisie', '')

    //-- Redirige selon le bouton cliqué ------------
    switch(page) {
        case 'score':
            window.location.href = "https://justarthur.github.io/MasterMind/pages/score.html"
            break;

        case 'retour':           
            window.location.href = "https://justarthur.github.io/MasterMind/"
            break;
    }
}