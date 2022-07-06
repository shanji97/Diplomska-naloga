const mongoose = require("mongoose");

const maliOglasShema = new mongoose.Schema({
    naslov: { type: String, required: true, unique: true },
    avtor: { type: String, required: true },
    kreiran: { type: Date, "default": Date.now },
    posodobljen: {type: Date, "default":null},
    tipOglasa: { type: String, "default": "Prodam" },
    besedilo: { type: String, required: true },
    cena: { type: Number, required: true, "default": 0 },
    kontaktnaStevilka: { type: String, "default": "N/A" },
    kontaktenMail: { type: String, "default": "N/A" }
});

mongoose.model('MaliOglas', maliOglasShema, 'maliOglasi');