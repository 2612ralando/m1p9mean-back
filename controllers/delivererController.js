var express = require('express');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const SECRET = 'ekalykey';


var { Deliverer } = require('../models/deliverer');

// => localhost:3000/deliverers/
router.get('/', (req, res) => {
    Deliverer.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Deliverers :' + JSON.stringify(err, undefined, 2)); }
    });
});

// => localhost:3000/deliverers/_id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Deliverer.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Deliverers :' + JSON.stringify(err, undefined, 2)); }
    });

});

// => localhost:3000/deliverers/ ---------- SIMPLE SAVE USER
router.post('/', async (req, res) => {
    var deliverer = new Deliverer({
        created_at: null,
        updated_at: null,
        deliverer_name: req.body.deliverer_name,
        deliverer_email: req.body.deliverer_email,
        deliverer_phone: req.body.deliverer_phone,
        deliverer_password: req.body.deliverer_password,
        deliverer_disponibility: req.body.deliverer_disponibility,
    });

    deliverer.save((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Deliverer Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

// => localhost:3000/deliverers/ ----------SAVE USER WITH B-CRYPT
// router.post('/', async (req, res) => {

//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash(req.body.password, salt);

//     var deliverer = new Deliverer({
//         created_at: null,
//         updated_at: null,
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         password: password,
//         id_profile: req.body.id_profile,
//     });

//     deliverer.save((err, docs) => {
//         if (!err) { res.send(docs); }
//         else { console.log('Error in Deliverer Save :' + JSON.stringify(err, undefined, 2)); }
//     });
// });



// => localhost:3000/deliverers/_id
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var deliverer = {
        created_at: null,
        updated_at: null,
        deliverer_name: req.body.deliverer_name,
        deliverer_email: req.body.deliverer_email,
        deliverer_phone: req.body.deliverer_phone,
        deliverer_password: req.body.deliverer_password,
        deliverer_disponibility: req.body.deliverer_disponibility,
    };

    Deliverer.findByIdAndUpdate(req.params.id, { $set: deliverer }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Deliverer Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

// => localhost:3000/deliverers/_id
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Deliverer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Deliverer Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

// GetDelivererByEmailAndPassword
router.get('/check_deliverer/:deliverer_email/deliverer/:deliverer_password', (req, res) => {
    var query = { "deliverer_email": req.params.deliverer_email, "deliverer_password": req.params.deliverer_password };
    
    Deliverer.find(query, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Deliverer :' + JSON.stringify(err, undefined, 2)); }
    });
});

// CheckDelivererPassword
router.post('/login', async(req, res) => {
  var query = { "deliverer_email": req.body.deliverer_email };
  console.log("VALID PASSWORD =" + query);
  const deliverer = await Deliverer.find(query);
    if (deliverer[0]) {
      // check deliverer password with hashed password stored in the database
      const validPassword = await bcrypt.compare(req.body.deliverer_password, deliverer[0].deliverer_password);
      if (validPassword) {
        const token = jwt.sign({
          id: deliverer[0].id,
          deliverer_name: deliverer[0].deliverer_name,
          deliverer_email: deliverer[0].deliverer_email,
      }, SECRET, { expiresIn: '23 hours' });

        res.status(200).json({
          accessToken: token
        });
      } else {
        res.status(400).json({ 
          authentified: false,
          error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "Deliverer does not exist" });
    }  
});

module.exports = router;