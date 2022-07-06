const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const komentarjiTemeShema = new mongoose.Schema({
    avtor: { type: String, required: true },
    kreiran: { type: Date, "default": Date.now },
    besedilo: { type: String, required: true },
    posodobjeno: { type: Date, "default": Date.now}
});

const temaShema = new mongoose.Schema({
    naslov: { type: String, required: true, unique: true },
    avtor: { type: String, required: true },
    zadnjiAvtor: { type: String, required: true },
    kategorija: { type: String, required: true, "default": "Loža" },
    posodobjena: { type: Date, "default": null },
    besedilo: { type: String, required: true },
    komentarjiTeme: ["komentarjTemeShema"]
});

mongoose.model('Tema', temaShema, 'teme');
mongoose.model('KomentarTeme', komentarjiTemeShema, 'komentarjiTem');
