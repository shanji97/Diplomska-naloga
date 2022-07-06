var router = require('express').Router();

/**Mali oglas */
const ctrlMaliOglasi = require("../controllers/maliOglasController");
router.get("/", ctrlMaliOglasi.prikaziVse);
router.get("/:idOglasa",ctrlMaliOglasi.prikaziIzbrano);
router.post("/posljiOglas",ctrlMaliOglasi.posljiMaliOglas);
router.delete("/:idOglasa",ctrlMaliOglasi.izbrisiIzbrano);
router.put("/:idOglasa",ctrlMaliOglasi.posodobiIzbrano); 

module.exports = router;
