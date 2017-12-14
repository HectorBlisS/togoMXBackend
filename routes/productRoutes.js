const firebase = require('../firebase');
const express = require('express');
const mongoose = require('mongoose')
const Product = mongoose.model("Product");
const productRouter = express.Router();


productRouter.route('/')
    .get(async (req, res)=>{
        try{
            res.send('los productos')
        }catch(e){
            console.log(e)
        }
    })
    .post(async(req, res)=>{
        try{
            const product = await(new Product(req.body));
            product.save();
            console.log(req.body);
            res.json(req.body)
        }catch(e){

        }
    });

module.exports = productRouter;