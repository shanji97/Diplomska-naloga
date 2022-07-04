const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type:String, required: true/*, unique: true*/},
    email: {type:String, required: true, unique: true},
    randomHash: String, 
    passwordHash: {type:String, required:true},
    zetonZaObnavljanjeGesla: {type: String, "default":"obnovljeno"},
    isAdmin: {type: Boolean, "default":false},
    naslov: String,
    kraj: {type: String, "default": "Ljubljana", required: true},
    posta: {type: Number, min:1000, max:9999,"default":1000, required: true}   
});

mongoose.model('User', userSchema, 'Users');