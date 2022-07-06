var router = require('express').Router();

/**Novice */
const ctrlNovice = require("../controllers/noviceController");

router.get("/",ctrlNovice.prikaziVse); // Prikažemo vse novivce.
router.get("/:idNovice", ctrlNovice.prikaziIzbrano); // Prikaži vse novice.

router.post("/posljiNovico",ctrlNovice.posljiNovico); // Pošlji novico.
router.put("/:idNovice",ctrlNovice.posodobiIzbrano); // Posodobi novico. 
router.delete("/:idNovice", ctrlNovice.izbrisiIzbrano); // Izbriši novico.

/*Komentarji*/
const ctrlKomentarji  = require("../controllers/komentarController");

router.post("/:idNovice/komentarji", ctrlKomentarji.dodajKomentar);
router.get("/:idNovice/komentarji/:idKomentarja",ctrlKomentarji.preberiIzbranega);
router.put("/:idNovice/komentarji/:idKomentarja",ctrlKomentarji.posodobiKomentar);
router.delete("/:idNovice/komentarji/:idKomentarja",ctrlKomentarji.izbrisiKomentar);

module.exports = router;