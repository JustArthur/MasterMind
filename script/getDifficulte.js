//Recupére la diffucté celon le btn cliqué et le stoque dans le storage avec localStorage
function getDifficulte(difficulte) {
    localStorage.setItem('laDifficulteChoisie', difficulte)
    window.location.href = "../pages/jeu.html"
}