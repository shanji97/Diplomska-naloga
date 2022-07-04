var router = require('express').Router();

const ctrlNovice = require("../controllers/noviceController");

/**Novice */
router.get("/",ctrlNovice.prikaziVse); // Prikažemo vse novivce.
router.get("/:idNovice", ctrlNovice.prikaziIzbrano); // Prikaži vse novice.

router.post("/posljiNovico",ctrlNovice.posljiNovico); // Pošlji novico.
router.put(":/idNovice",ctrlNovice.posodobiNovico); // Posodobi novico. 
routet.delete(":/idNovice", ctrlNovice.izbrisiIzbrano); // Izbriši novico.