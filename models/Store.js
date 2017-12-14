const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const StoreModel = new Schema({
    firebaseKey:{
        type:String,
    },
    responsable:{
        type: String
    },
    title:{
        type:String
    },
    location:{
        type:{
            type:String,
            default:"Point"
        },
        address:String,
        coordinates:[
            {
                type:Number,
                //required:true
            }
        ]
    },
    photo:String,
    email:String,
    coord:{
        latitude:Number,
        longitude:Number
    }

});

module.exports = mongoose.model("Store", StoreModel);