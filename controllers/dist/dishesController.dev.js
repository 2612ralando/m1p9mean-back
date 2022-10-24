"use strict";

var express = require('express');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var _require = require('../models/dishes'),
    Dishes = _require.Dishes; // var multer = require('multer');
// Save file to server storage
// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '--' + file.originalname);
//     },
// });
// const upload = multer({ storage: fileStorageEngine });
// router.post("/single", upload.single("dishes_img"), (req, res) => {
//     var url = req.protocol + '://' + req.get('host');
//     var dishes = new Dishes({
//         created_at: null,
//         updated_at: null,
//         dishes_name: req.body.dishes_name,
//         dishes_desc: req.body.dishes_desc,
//         dishes_price: req.body.dishes_price,
//         // dishes_img: url + '/images' + req.file.filename,
//         id_restaurant: req.body.id_restaurant,
//     });
//     console.log('Dishes to save : ' + JSON.stringify(dishes)); //Here
//     console.log(req.file);
//     res.send("Single file upload success");
// });
// => localhost:3000/dishes/


router.get('/', function (req, res) {
  Dishes.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Dishes :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/dishes/_id

router.get('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Dishes.findById(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Dishes :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // GetDishesByDishesName : FindLike

router.get('/GetDishesByDishesName/:dishes_name', function (req, res) {
  var toFind = req.params.dishes_name;
  var tofind_regex = new RegExp(toFind);
  var query = {
    dishes_name: {
      $regex: tofind_regex,
      $options: 'i'
    }
  };
  Dishes.find(query, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Dishes :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/dishes/restaurant/id_restaurant [getDishesByIdRestaurant]

router.get('/restaurant/:id_restaurant', function (req, res) {
  if (!ObjectId.isValid(req.params.id_restaurant)) return res.status(400).send("No record with given id : ".concat(req.params.id_restaurant));
  Dishes.find({
    id_restaurant: req.params.id_restaurant
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Dishes :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/dishes/

router.post('/', function (req, res) {
  var dishes = new Dishes({
    created_at: null,
    updated_at: null,
    dishes_name: req.body.dishes_name,
    dishes_desc: req.body.dishes_desc,
    dishes_price: req.body.dishes_price,
    id_restaurant: req.body.id_restaurant
  });
  dishes.save(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Dishes Save :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/dishes/_id

router.put('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  var dishes = new Dishes({
    created_at: null,
    updated_at: null,
    dishes_name: req.body.dishes_name,
    dishes_desc: req.body.dishes_desc,
    dishes_price: req.body.dishes_price,
    id_restaurant: req.body.id_restaurant,
    _id: req.params.id //required for update

  });
  console.log("Zavatra = " + JSON.stringify(req.params.id));
  Dishes.findByIdAndUpdate(req.params.id, {
    $set: dishes
  }, {
    "new": true
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Dishes Update :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/dishes/_id

router["delete"]('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Dishes.findByIdAndRemove(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Dishes Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
});
module.exports = router;