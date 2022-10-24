"use strict";

// import escapeStringRegexp from 'escape-string-regexp';
var express = require('express');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId; // const escapeRegex = require('escape-string-regexp');


var _require = require('../models/delivery'),
    Delivery = _require.Delivery; // => localhost:3000/delivery/


router.get('/', function (req, res) {
  Delivery.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Delivery :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/delivery/_id

router.get('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Delivery.findById(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Delivery :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // GetDeliveryByDeliveryName : FindLike Livreur

router.get('/GetDeliveryByDelivererName/:delivery_deliverer', function (req, res) {
  var toFind = req.params.delivery_deliverer;
  var tofind_regex = new RegExp(toFind);
  var query = {
    delivery_deliverer: {
      $regex: tofind_regex,
      $options: 'i'
    }
  };
  Delivery.find(query, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Delivery :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // GetDeliveryByIdOrder : FindLike IdOrder

router.get('/GetDeliveryByIdOrder/:id_order', function (req, res) {
  var toFind = req.params.id_order;
  var tofind_regex = new RegExp(toFind);
  var query = {
    id_order: {
      $regex: tofind_regex,
      $options: 'i'
    }
  };
  Delivery.findOne(query, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Delivery :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/delivery/

router.post('/', function (req, res) {
  var delivery = new Delivery({
    created_at: Date(),
    updated_at: null,
    delivery_deliverer: req.body.delivery_deliverer,
    delivery_client: req.body.delivery_client,
    delivery_location: req.body.delivery_location,
    delivery_date: req.body.delivery_date,
    delivery_price: req.body.delivery_price,
    delivery_count: req.body.delivery_count,
    id_order: req.body.id_order
  });
  delivery.save(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Delivery Save :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/delivery/_id

router.put('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  var delivery = {
    // created_at: null,
    updated_at: Date(),
    delivery_deliverer: req.body.delivery_deliverer,
    delivery_client: req.body.delivery_client,
    delivery_location: req.body.delivery_location,
    delivery_price: req.body.delivery_price,
    id_order: req.body.id_order
  };
  Delivery.findByIdAndUpdate(req.params.id, {
    $set: delivery
  }, {
    "new": true
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Delivery Update :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/delivery/_id

router["delete"]('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Delivery.findByIdAndRemove(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Delivery Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // GetOrderDelivery : FindLike

router.get('/GetOrderDelivery/Non-choisi', function (req, res) {
  var query = {
    delivery_deliverer: "Non choisi"
  };
  Delivery.find(query, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Delivery :' + JSON.stringify(err, undefined, 2));
    }
  });
});
module.exports = router;