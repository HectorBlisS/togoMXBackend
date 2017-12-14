//variables de entorno
const mongoose = require("mongoose");
const PORT = 8000;
//import app from './app';

require('dotenv').config({ path: 'variables.env' });
mongoose.connect(process.env.DATABASE, {useMongoClient:true});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

//registring models
require("./models/Store");
require("./models/Product");

//app
const app = require("./app");

app.set('port', process.env.PORT || PORT);
app.listen(app.get('port'), ()=>{
    console.log("corriendo en el ", app.get('port'));
});