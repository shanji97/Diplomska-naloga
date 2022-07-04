const mongoose = require('mongoose');

const komentarjiShema = new mongoose.Schema({
    datum: { type: Date, "default": Date.now },
    avtor: { type: String, required: true },
    besedilo: { type: String, required: true }
})
const noviceSchema = new mongoose.Schema({
    naslov: { type: String, required: true, unique: true },
    avtor: { type: String, required: true },
    kreirana: { type: Date, "default": Date.now },
    posodobjena: { type: Date, "default": null },
    kategorija: { type: String, default: "Splošne novice" },
    besedilo: { type: String, required: true },
    komentarji: ["komentarjiShema"]
});

mongoose.model('Novica', noviceSchema, 'novice');
mongoose.model('Komentar', komentarjiShema, 'komentarji');