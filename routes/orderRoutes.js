const express = require('express');
const firebase = require("../firebase");
const notifyStores = require('../firebase');
const mongoose = require("mongoose");
const Store = mongoose.model("Store");
const orderRouter = express.Router();

function changeToRadians(km=5){
    const miles = km * .621371;
    //console.log(miles / 3963.2);
    return miles / 3963.2;
}

orderRouter.route("/")
    .get((req, res)=>{
        firebase.database().ref("ordersP")
            .once("value")
            .then(s=>{
                res.json(s.val());
            })
    });

orderRouter.route("/deliver")
    .post(async (req, res)=>{

        //{order:{}, location:{coordinates:[]}}
        const body = req.body;
        //console.log(body);
        const repartidor = body.position.coordinates;
        const order = body.order;
        //aquí seteamos al repartidor con su orden actual
        if(!repartidor) return res.status(500).send("No sabemos donde estas");
        const distance = changeToRadians(req.body.distance);
        const query = await Store.find({location: {$geoWithin: { $centerSphere: [ repartidor, distance ]}}});
        if(query.length < 1) {
            res.status(401).send("Not Found");
            return;
        }
        // y aquí notificamos a las tiendas
        notifyStores(query, order);
        res.json(query);
    });

module.exports = orderRouter;