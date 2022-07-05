var mongoose = require('mongoose');
var logger = require('../../modules/logger');

var dbURI = "mongodb://localhost/slo-tech_V2";
if (process.env.MONGODB_CLOUD_URI) {
    dbURI = process.env.MONGODB_CLOUD_URI;
}

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    logger.log('Mongoose', `Ustvarjena povezava na ${dbURI}.`);
});

mongoose.connection.on('error', (err) => {
    logger.error('Mongoose', 'Napaka pri povezavi: ', err);
});

mongoose.connection.on('disconnected', () => {
    logger.log('Mongoose', 'Povezava je prekinjena.');
});

require('../models/user.js');
require('../models/novica.js');
// require('../models/tema.js');
// require('../models/maliOglas.js');

const disconnect = async (message) => {
    await mongoose.connection.close();
    logger.log('Mongoose', `Zaprta povezava. Razlog: '${message}'`);
};

// Ponovni zagon nodemon
process.once('SIGUSR2', async () => {
    await disconnect('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});
  

// Izhod iz aplikacije
process.on('SIGINT', async () => {
    await disconnect('Application shutdown');
    process.exit(0);
});
  
// Izhod iz aplikacije na Heroku
process.on('SIGTERM', async () => {
    await disconnect('Termination');
    process.exit(0);
});
