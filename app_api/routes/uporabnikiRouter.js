var router = require('express').Router();

const ctrlUporabniki  = require("../controllers/uporabnikiController");

/*Uporabnik*/ 
router.get("/",ctrlUporabniki.prikazi); //pregled vseh
router.get("/:idUporabnika",ctrlUporabniki.preberiIzbranega);

router.post("/pridobiPrijavljenega", ctrlUporabniki.pridobiPrijavnePodatkeUporabnika);

router.post("/registriraj",ctrlUporabniki.registrirajUporabnika); 

router.put("/:idUporabnika/posodobiUporabniskoIme",ctrlUporabniki.posodobiIzbranega);
router.put("/:idUporabnika/posodobiGeslo",ctrlUporabniki.posodobiGeslo);

router.put("/vnosZetona", ctrlUporabniki.vnosZetona);

router.put("/obnovitevGesla", ctrlUporabniki.obnoviGeslo);

router.delete("/:idUporabnika",ctrlUporabniki.izbrisiIzbranega);

module.exports = router;