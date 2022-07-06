var router = require('express').Router();

/**Novice */
const ctrlTeme = require("../controllers/temeController");

router.get("/",ctrlTeme.prikaziVse); // Prikažemo vse novivce.
router.get("/:idTeme", ctrlTeme.prikaziIzbrano); // Prikaži vse Teme.

router.post("/posljiTemo",ctrlTeme.posljiTemo); 
router.put("/:idTeme",ctrlTeme.posodobiIzbrano); 
router.delete("/:idTeme", ctrlTeme.izbrisiIzbrano); 

/*Komentarji*/
const ctrlKomentarTeme  = require("../controllers/komentarTemeController");

router.post("/:idTeme/komentarjiTeme", ctrlKomentarTeme.kreirajKomentar);
router.get("/:idTeme/komentarjiTeme/:idKomentarja",ctrlKomentarTeme.preberiIzbranega);
router.put("/:idTeme/komentarjiTeme/:idKomentarja",ctrlKomentarTeme.posodobiKomentar);
router.delete("/:idTeme/komentarji/:idKomentarja",ctrlKomentarTeme.izbrisiKomentar);

module.exports = router;