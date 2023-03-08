//-- Recupére la diffucté celon le btn cliqué et le stoque dans le storage avec localStorage ------------
function getDifficulte(difficulte) {
    localStorage.setItem('laDifficulteChoisie', difficulte)

    if(window.location.pathname == '/' || window.location.pathname == '/index.html') {
        window.location.href = "https://justarthur.github.io/MasterMind/pages/jeu.html"

    } else {
        window.location.href = "https://justarthur.github.io/MasterMind/pages/jeu.html"
    }
    
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