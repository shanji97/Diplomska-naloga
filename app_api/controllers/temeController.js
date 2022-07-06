const mongoose = require("mongoose");
const Tema = mongoose.model("Tema");

const prikaziVse = (req, res) => {
    Tema
        .find()
        .exec((napaka, teme) => {
            if (napaka) {
                res.status(500).json(napaka);
            }
            else {
                res.status(200).json(
                    teme.map(tema => {
                        return {
                            "_id": tema.id,
                            "naslov": tema.naslov,
                            "avtor": tema.avtor,
                            "zadnjiAvtor": tema.zadnjiAvtor,
                            "posodobljena":tema.posodobljena,
                            "kreirana": tema.kreirana,
                            "besedilo": tema.besedilo,
                            "komentarji": tema.komentarjiTeme
                        };
                    })
                );
            }
        });
}

const posljiTemo = (req, res) => {
    Tema.create({
        naslov: req.body.naslov,
        avtor: req.body.avtor,
        zadnjiAvtor: req.body.avtor,
        kategorija: req.body.kategorija,
        besedilo: req.body.besedilo
    }, (napaka, tema) => {
        if (napaka) {
            return res.status(400).json(napaka);
        }
        else {
            return res.status(201).json(tema);
        }
    });
}

const prikaziIzbrano = (req, res) => {
    Tema
        .findById(req.params.idTeme)
        .exec((napaka, tema) => {
            if (napaka) {
                return res.status(500).json(napaka);
            }
            else if (!tema) {
                return res.status(404).json({
                    "sporočilo": "Ne najdem teme. Id teme je obvezen parameter."
                });
            }
            return res.status(200).json(tema);
        });
}

const izbrisiIzbrano = (req, res) => {
    const { idTeme } = req.params;
    if (idTeme) {
        Tema
            .findByIdAndRemove(idTeme)
            .exec((napaka) => {
                if (napaka) {
                    return res.status(500).json(napaka);
                }
                else {
                    return res.status(204).json(null);
                }
            });
    }
    else {
        return res.status(404).json({ "sporočilo": "Ne najdem teme. Id teme je obvezen parameter." });
    }

}

const posodobiIzbrano = (req, res) => {
    Tema
        .updateOne({ "_id": req.params.idTeme },
            {
                $set: {
                    naslov: req.body.novNaslov,
                    zadnjiAvtor: req.body.novAvtor,
                    posodobljena: Date.now,
                    besedilo: req.body.novoBesedilo
                }
            },
            (napaka) => {
                if (napaka) {
                    return res.status(400).json(napaka);
                } else {
                    return res.status(200).json({
                        "sporočilo": "Teme uspešno spremenjena."
                    });
                }
            }
        );
}

module.exports = {
    prikaziVse,
    posljiTemo,
    prikaziIzbrano,
    izbrisiIzbrano,
    posodobiIzbrano
}
