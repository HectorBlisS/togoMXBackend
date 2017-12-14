const express  = require('express');
const storeRouter = require("./routes/storeRoutes");
const deliveryManRouter = require('./routes/deliveryManRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//routes
app.get("/", (req, res)=>{
    res.send("ToGoMX Backend");
});

app.use("/stores", storeRouter);
app.use('/deliver', deliveryManRouter);
app.use('/orders', orderRoutes);
//export default app;
module.exports = app;

