const mongoose = require("mongoose");
const MaliOglas = mongoose.model("MaliOglas");

const prikaziVse = (req, res) => {
    MaliOglas
        .find()
        .exec((napaka, teme) => {
            if (napaka) {
                res.status(500).json(napaka);
            }
            else {
                res.status(200).json(
                    teme.map(maliOglas => {
                        return {
                            "_id": maliOglas.id,
                            "naslov": maliOglas.naslov,
                            "avtor": maliOglas.avtor,
                            "tipOglasa": maliOglas.tipOglasa,
                            "besedilo": maliOglas.besedilo,
                            "cena": maliOglas.cena,
                            "kontaktnaStevilka": maliOglas.kontaktnaStevilka,
                            "kontaktenMail": maliOglas.kontaktenMail
                        };
                    })
                );
            }
        });
}

const posljiMaliOglas = (req, res) => {
    MaliOglas.create({
        naslov: req.body.naslov,
        avtor: req.body.avtor,
        tipOglasa: req.body.tipOglasa,
        besedilo: req.body.besedilo,
        cena: req.body.cena,
        kontaktnaStevilka: req.body.kontaktnaStevilka,
        kontaktenMail: req.body.kontaktenMail
    }, (napaka, maliOglas) => {
        if (napaka) {
            return res.status(400).json(napaka);
        }
        else {
            return res.status(201).json(maliOglas);
        }
    });
}

const prikaziIzbrano = (req, res) => {
    MaliOglas
        .findById(req.params.idOglasa)
        .exec((napaka, maliOglas) => {
            if (napaka) {
                return res.status(500).json(napaka);
            }
            else if (!maliOglas) {
                return res.status(404).json({
                    "sporočilo": "Ne najdem oglasa. Id oglasa je obvezen parameter."
                });
            }
            return res.status(200).json(maliOglas);
        });
}

const izbrisiIzbrano = (req, res) => {
    const { idOglasa } = req.params;
    if (idOglasa) {
        MaliOglas
            .findByIdAndRemove(idOglasa)
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
        return res.status(404).json({ "sporočilo": "Ne najdem oglasa. Id oglasa je obvezen parameter." });
    }
}

const posodobiIzbrano = (req, res) => {
    MaliOglas
        .updateOne({ "_id": req.params.idOglasa },
            {
                $set: {
                    posodobljen: Date.now,
                    besedilo: req.body.novoBesedilo
                }
            },
            (napaka) => {
                if (napaka) {
                    return res.status(400).json(napaka);
                } else {
                    return res.status(200).json({
                        "sporočilo": " uspešno spremenjena."
                    });
                }
            }
        );
}

module.exports = {
    prikaziVse,
    posljiMaliOglas,
    prikaziIzbrano,
    izbrisiIzbrano,
    posodobiIzbrano
}
