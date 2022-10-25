var express = require('express');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const SECRET = 'ekalykey';


var { Plat } = require('../models/Plat');

// => localhost:3000/deliverers/
router.get('/', (req, res) => {
  Plat.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving Deliverers :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.post('/create', (req, res) => {
  var plat = new Plat({
    idPlat: req.body.idPlat,
    nomPlat: req.body.nomPlat,
    categorie: req.body.categorie,
    details: req.body.details,
    prix: req.body.prix,
    idResto: req.body.idResto,
  });
  plat.save((err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Plat Save :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.get('/', (req, res) => {
  Plat.find((err, data) => {
    if (!err) { res.send(data); }
    else { console.log('Error in Retriving Plat  :' + JSON.stringify(err, undefined, 2)); }
  });
});


// Get single Plat
router.get('/read/:idResto', (req, res) => {
  // if (!ObjectId.isValid(req.params.idPlat))
  //   return res.status(400).send(`No record with given Resto : ${req.params.idResto}`)

  // Plat.findById(req.params.idPlat, (error, doc) => {
  //   if (!err) {res.send(doc);}
  //   else {console.log('Error in Retriving Plat  :' + JSON.stringify(err, undefined, 2));}
  // });


  Plat.find({ idResto: req.params.idResto }, (error, doc) => {
    if (!error) { res.send(doc); }
    else { console.log('Error in Retriving Plat  :' + JSON.stringify(error, undefined, 2)); }
  });


});

// Update Plat
router.put('/update/:idPlat', (req, res, next) => {
  if (!ObjectId.isValid(req.params.idPlat))
    return res.status(400).send(`No record with given idPlat : ${req.params}`)

  var plat = {
    idPlat: req.body.idPlat,
    nomPlat: req.body.nomPlat,
    categorie: req.body.categorie,
    details: req.body.details,
    prix: req.body.prix,
    idResto: req.body.idResto,
  };

  Plat.findByIdAndUpdate(req.params.id, { $set: plat }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Plat Update :' + JSON.stringify(err, undefined, 2)); }

  });
});
// Delete Plat
router.delete('/delete/:idPlat', (req, res, next) => {
  if (!ObjectId.isValid(req.params.idPlat))
    return res.status(400).send(`No record with given idPlat : ${req.params}`)

  Plat.findOneAndRemove(req.params.idPlat, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Plat Delete :' + JSON.stringify(err, undefined, 2)); }
  });

})

module.exports = router;