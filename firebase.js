const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyBcaQr-uMH7LQcFETQLiXk5LQ1WuG9nrwY",
    authDomain: "togomx-d4928.firebaseapp.com",
    databaseURL: "https://togomx-d4928.firebaseio.com",
    projectId: "togomx-d4928",
    storageBucket: "togomx-d4928.appspot.com",
    messagingSenderId: "87733822528"
};
firebase.initializeApp(config);


exports.notifyStores = function(stores, order){
    let updates = {};
    for (let s of stores){
        const key = firebase.database().ref("notifications").push().key;
        updates[`/notifications/${key}`] = {
            has:false,
            key:key,
            tiendaId:s.firebaseKey,
            visto:false,
            items:order.products
        };
    }
    firebase.database().ref().update(updates);
};

module.exports = firebase;
