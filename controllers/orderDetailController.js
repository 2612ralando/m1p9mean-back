var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { OrderDetail } = require('../models/orderDetails');
var { Dishes } = require('../models/dishes');

// => localhost:3000/orderDetail/
router.get('/', (req, res) => {
    OrderDetail.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving OrderDetail :' + JSON.stringify(err, undefined, 2)); }
    });
});

// => localhost:3000/orderDetail/_id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    OrderDetail.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving OrderDetail :' + JSON.stringify(err, undefined, 2)); }
    });

});


// => localhost:3000/orderDetails/order/id_order [GetOrderDetailByOrder]
router.get('/order/:id_order', (req, res) => {
    if (!ObjectId.isValid(req.params.id_order))
        return res.status(400).send(`No record with given id : ${req.params.id_order}`);

    OrderDetail.find({ id_order: req.params.id_order }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving OrderDetail :' + JSON.stringify(err, undefined, 2)); }
    });

});



// => localhost:3000/orderDetail/_id
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
