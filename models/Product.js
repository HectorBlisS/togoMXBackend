const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const ProductModel = new Schema({
    firebaseKey:String,
    category:[{
        type:String
    }],
    name:String,
    image:String,
    sell_price:Number,
    desc:String
});

module.exports = mongoose.model('Product', ProductModel);
