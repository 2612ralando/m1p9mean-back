"use strict";

var express = require('express');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var _require = require('../models/orderDetails'),
    OrderDetail = _require.OrderDetail;

var _require2 = require('../models/dishes'),
    Dishes = _require2.Dishes; // => localhost:3000/orderDetail/


router.get('/', function (req, res) {
  OrderDetail.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving OrderDetail :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/orderDetail/_id

router.get('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  OrderDetail.findById(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving OrderDetail :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/orderDetails/order/id_order [GetOrderDetailByOrder]

router.get('/order/:id_order', function (req, res) {
  if (!ObjectId.isValid(req.params.id_order)) return res.status(400).send("No record with given id : ".concat(req.params.id_order));
  OrderDetail.find({
    id_order: req.params.id_order
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving OrderDetail :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/orderDetail/_id
// router.put('/:id', (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No record with given id : ${req.params.id}`);
//     var orderDetail = new OrderDetail({
//         created_at: null,
//         updated_at: null,
//         quantity: req.body.quantity,
//         id_order: req.body.id_order,
//         id_dishes: req.body.id_dishes,
//     });
//     OrderDetail.findByIdAndUpdate(req.params.id, { $set: orderDetail }, { new: true }, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in OrderDetail Update :' + JSON.stringify(err, undefined, 2)); }
//     });
// });
// => localhost:3000/orderDetails/order/id_order
// router.delete('/order/:id_order', (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No record with given id : ${req.params.id}`);
//     OrderDetail.findByIdAndRemove(req.params.id, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in OrderDetail Delete :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

module.exports = router;