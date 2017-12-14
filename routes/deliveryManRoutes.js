import express from 'express';



const deliveryManRouter = express.Router();

deliveryManRouter.route("/position")
    .get((req, res)=>{
        res.send('hola')
    })
    .post((req, res)=>{
        //console.log(req.body)
        res.json(req.body)
    });


export default deliveryManRouter;