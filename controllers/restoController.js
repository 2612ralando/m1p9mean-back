// import escapeStringRegexp from 'escape-string-regexp';
var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

// const escapeRegex = require('escape-string-regexp');

var { Resto } = require('../models/Resto');
let Plat = require('../models/Plat');


// => localhost:3000/delivery/
router.get('/', (req, res) => {
    Resto.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Resto :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('read/:idResto',(req, res) => {
    if(!ObjectId.isValid(req.params.idResto))
    return res.status(400).send(`No record with given idResto : ${req.params}`)
  
    Resto.findById(req.params.idResto, (error, doc) => {
      if (!err) {res.send(doc);}
      else {console.log('Error in Retriving Plat  :' + JSON.stringify(err, undefined, 2));}
    });
  });


//Get plat par resto
router.get('resto/:idResto',(req, res) => {
    if(!ObjectId.isValid(req.params.idResto))
    return res.status(400).send(`No record with given id : ${req.params}`)
  
    Plat.find({
      idResto : req.params.idResto
    },(err, doc) => {
      if (!err) {res.send(doc);}
      else {console.log('Error in Retriving Plat  :' + JSON.stringify(err, undefined, 2));}
    });
  });

// Update Resto
router.put('/update/:idResto',(req, res, next) => {
    if(!ObjectId.isValid(req.params.idResto))
    return res.status(400).send(`No record with given idResto : ${req.params}`)
  
    var resto = {
      idResto : req.body.idResto,
      name : req.body.name,
      adresse : req.body.adresse,
      email : req.body.email,
      phoneNumber : req.body.phoneNumber,
    };
  
    Resto.findByIdAndUpdate(req.params.idResto, {$set: resto},{new : true}, (err,doc)=>{
      if (!err) {res.send(doc);}
      else {console.log('Error in Plat Update :' + JSON.stringify(err, undefined, 2));}
  
    });
  });

// Delete Resto
router.delete('/delete/:idResto',(req, res, next) => {
    if(!ObjectId.isValid(req.params.idResto))
    return res.status(400).send(`No record with given idResto : ${req.params}`)
    
    Resto.findOneAndRemove(req.params.idResto, (err, doc) => {
      if (!err) {res.send(doc);}
      else {console.log('Error in Plat Delete :' + JSON.stringify(err, undefined, 2));}
    });
  
  })


module.exports = router;