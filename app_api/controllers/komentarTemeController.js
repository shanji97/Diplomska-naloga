const mongoose = require("mongoose");

const Tema = mongoose.model("Tema");

const kreirajKomentar = (req, res) => {
    const idTeme = req.params.idTeme;
    Tema
        .findbyId(idTeme)
        .select("komentarjiTeme")
        .exec((napaka, tema) => {
            if (napaka) {
                res.status(400).json(napaka);
            } else {
                dodajKomentar(req, res, tema);
            }
        });
}
const dodajKomentar = (req, res, tema) => {
    tema.komentarji.push({
        avtor: req.body.naziv,
        besedilo: req.body.komentar
    });
    tema.save((napaka, tema) => {
        if (napaka) {
            res.status(400).json(napaka);
        }
        else {
            res.status(201).json(tema.komentarjiTeme.slice(-1).pop());
        }
    })
}

const posodobiKomentar = (req, res) => {
    var idTeme = req.params.idTeme;
    var idKomentarja = req.params.idKomentarja;
    Tema
        .findbyId(idTeme)
        .select("komentarjiTeme")
        .exec((napaka, tema) => {
            if (napaka) {
                return res.status(500).json(napaka);
            }
            const trenuniKomentar = tema.komentarjiTeme.id(idKomentarja);
            trenutniKomentar.avtor = req.body.avtorKomentarja;
            trenutniKomentar.besedilo = req.body.besedilo;

        });
}

const izbrisiKomentar = (req, res) => {
    const { idTeme, idKomentarja } = req.params;
    Tema
        .findbyId(idTeme)
        .select("komentarjiTeme")
        .exec((napaka, tema) => {
            if (!tema) {
                return res.status(404).json({ sporočilo: "Ne najdem lokacije." });
            }
            else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (tema.komentarjiTeme && tema.komentarjiTeme.length > 0) {
                tema.komentarjiTeme.id(idKomentarja).remove();
                noviva.save((napaka) => {
                    if (napaka) {
                        return res.status(500).json(napaka);
                    }
                });
            }
        });
}

const preberiIzbranega = (req, res) => {
    Tema
        .findbyId(req.params.idTeme)
        .select("komentarjiTeme")
        .exec((napaka, tema) => {
            if (!tema) {
                res.status(404).json({ "sporocilo": "Ni in ni!" });
            }
            else if (napaka) {
                res.status(500).json(napaka);
            }
            const izbranKomentar = tema.komentarjiTeme.id(req.params.idKomentarja);
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