function generirajObnovitveniZeton(dolzina = 40){
    var rezultat = "";
    var znaki ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var dolzinaZnakov  = znaki.length;
    for(var i = 0; i < dolzina; i++){
        rezultat += znaki.charAt(Math.floor(Math.random()*dolzinaZnakov));
    }
    return rezultat;
}

module.exports = generirajObnovitveniZeton;