//-- Au lancement de la page index il vide la variable stocké pour évite de pouvoir joué sans passé par le choix ------------
window.onload = localStorage.setItem('laDifficulteChoisie', '');

//-- Recupére la diffucté celon le btn cliqué et le stoque dans le storage avec localStorage ------------
function getDifficulte(difficulte) {
    localStorage.setItem('laDifficulteChoisie', difficulte)
    window.location.href = "./pages/jeu.html"
}