var router = require('express').Router();

/**Novice */
const ctrlNovice = require("../controllers/noviceController");

router.get("/",ctrlNovice.prikaziVse); // Prikažemo vse novivce.
router.get("/novica/:idNovice", ctrlNovice.prikaziIzbrano); // Prikaži vse novice.

router.post("/posljiNovico",ctrlNovice.posljiNovico); // Pošlji novico.
router.put("/novica/:idNovice",ctrlNovice.posodobiIzbrano); // Posodobi novico. 
router.delete("/novica/:idNovice", ctrlNovice.izbrisiIzbrano); // Izbriši novico.

/*Komentarji*/
const ctrlKomentarji  = require("../controllers/komentarController");

router.post("/novica/:idNovice/komentarji", ctrlKomentarji.dodajKomentar);
router.get("/novica/:idNovice/komentarji/:idKomentarja",ctrlKomentarji.preberiIzbranega);
router.put("/novica/:idNovice/komentarji/:idKomentarja",ctrlKomentarji.posodobiKomentar);
router.delete("/novica/:idNovice/komentarji/:idKomentarja",ctrlKomentarji.izbrisiKomentar);

module.exports = router;