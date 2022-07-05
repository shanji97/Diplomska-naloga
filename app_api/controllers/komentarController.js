// const mongoose = require("mongoose");
const mongoose = require("mongoose");

const Komentar = mongoose.model("Komentar");
const Novica = mongoose.model("Novica");

const kreirajKomentar = (req, res) => {
    const idNovice = req.params.idNovice;
    Novica
        .findbyId(idNovice)
        .select("komentarji")
        .exec((napaka, novica) => {
            if (napaka) {
                res.status(400).json(napaka);
            } else {
                dodajKomentar(req, res, novica);
            }
        });
}
const dodajKomentar = (req, res, novica) => {
    novica.komentarji.push({
        avtor: req.body.naziv,
        besedilo: req.body.komentar
    });
    novica.save((napaka, novica) => {
        if (napaka) {
            res.status(400).json(napaka);
        }
        else {
            res.status(201).json(novica.komentarji.slice(-1).pop());
        }
    })
}

const posodobiKomentar = (req, res) => {
    var idNovice = req.params.idNovice;
    var idKomentarja = req.params.idKomentarja;
    Novica
        .findbyId(idNovice)
        .select("komentarji")
        .exec((napaka, novica) => {
            if (napaka) {
                return res.status(500).json(napaka);
            }
            const trenuniKomentar = novica.komentarji.id(idKomentarja);
            trenutniKomentar.avtor = req.body.avtorKomentarja;
            trenutniKomentar.besedilo = req.body.besedilo;

        });
}

const izbrisiKomentar = (req, res) => {
    const { idNovice, idKomentarja } = req.params;
    Novica
        .findbyId(idNovice)
        .select("komentarji")
        .exec((napaka, novica) => {
            if (!novica) {
                return res.status(404).json({ sporočilo: "Ne najdem lokacije." });
            }
            else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (novica.komentarji && novica.komentarji.length > 0) {
                novica.komentarji.id(idKomentarja).remove();
                noviva.save((napaka) => {
                    if (napaka) {
                        return res.status(500).json(napaka);
                    }
                });
            }
        });
}

const preberiIzbranega = (req, res) => {
    Novica
        .findbyId(req.params.idNovice)
        .select("komentarji")
        .exec((napaka, novica) => {
            if (!novica) {
                res.status(404).json({ "sporocilo": "Ni in ni!" });
            }
            else if (napaka) {
                res.status(500).json(napaka);
            }
            const izbranKomentar = novica.komentarji.id(req.params.idKomentarja);
            res.status(200).json({
                komentar: izbranKomentar
            });
        });
}

module.exports = {
    kreirajKomentar,
    dodajKomentar,
    posodobiKomentar,
    preberiIzbranega,
    izbrisiKomentar
}