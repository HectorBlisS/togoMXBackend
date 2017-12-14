const express = require('express');
const mongoose = require('mongoose');
const Store = mongoose.model("Store");

const storeRouter = express.Router();

function changeToRadians(km=5){
    const miles = km * .621371;
    console.log(miles / 3963.2);
    return miles / 3963.2;
}

storeRouter.route("/")
    .get((req, res)=> {
        //if(req.query.genre) query.genre = req.query.genre;
        const query = req.query;
        Store.find(query, (err, stores)=>{
            if(err) {
                console.log(err);
                res.status(500).send(err);
            }else res.json(stores);
        });
    })
    .post((req,res)=>{
        console.log(req);
        const coord = {
            latitude:req.body.lat,
            longitude:req.body.lng
        };
        req.body.coord = coord;
        const store = new Store(req.body);
        store.save();
        res.status(201).send(store);
    });

storeRouter.route("/get-nearest-stores")
    .get(async (req, res)=>{
        const repartidor = req.body.coordinates;
        if(!repartidor) return res.status(500).send("No sabemos donde estas");
        const distance = changeToRadians(req.body.distance);
        const query = await Store.find({location: {$geoWithin: { $centerSphere: [ repartidor, distance ]}}});
        if(query.length < 1) {
            res.status(401).send("Not Found");
            return;
        }
        res.json(query);
    });




module.exports = storeRouter;


//{location: {$geoWithin: { $centerSphere: [ [ -98.79593212293216, 20.116913622591184 ], 0.0002606488822898683 ]}}}
