// import escapeStringRegexp from 'escape-string-regexp';
var express = require('express');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

// const escapeRegex = require('escape-string-regexp');

var { Restaurant } = require('../models/restaurant');

// => localhost:3000/restaurants/
router.get('/', (req, res) => {
    Restaurant.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Restaurants :' + JSON.stringify(err, undefined, 2)); }
    });
});

// => localhost:3000/restaurants/_id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Restaurant.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Restaurants :' + JSON.stringify(err, undefined, 2)); }
    });

});


// GetRestaurantByRestaurantName : FindLike
router.get('/GetRestaurantByRestaurantName/:restaurant_name', (req, res) => {
    var toFind = req.params.restaurant_name;
    var tofind_regex = new RegExp(toFind);
    var query = { restaurant_name: { $regex: tofind_regex, $options: 'i'  } };
    Restaurant.find(query, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Restaurant :' + JSON.stringify(err, undefined, 2)); }
    });
});

// => localhost:3000/restaurants/  ----------SIMPLE SAVE RESTAURANT
router.post('/', (req, res) => {

    var restaurant = new Restaurant({
        created_at: null,
        updated_at: null,
        restaurant_name: req.body.restaurant_name,
        restaurant_location: req.body.restaurant_location,
        restaurant_phone: req.body.restaurant_phone,
        restaurant_email: req.body.restaurant_email,
        restaurant_password: req.body.restaurant_password,
        restaurant_logo: req.body.restaurant_logo,
    });

    restaurant.save((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Restaurant Save :' + JSON.stringify(err, undefined, 2)); }
    });
});


// => localhost:3000/restaurants/  ----------SAVE RESTAURANT WITH B-CRYPT
// router.post('/', async (req, res) => {


//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash(req.body.restaurant_password, salt);

//     var restaurant = new Restaurant({
//         created_at: null,
//         updated_at: null,
//         restaurant_name: req.body.restaurant_name,
//         restaurant_location: req.body.restaurant_location,
//         restaurant_phone: req.body.restaurant_phone,
//         restaurant_email: req.body.restaurant_email,
//         restaurant_password: password,
//         restaurant_logo: req.body.restaurant_logo,
//     });

//     restaurant.save((err, docs) => {
//         if (!err) { res.send(docs); }
//         else { console.log('Error in Restaurant Save :' + JSON.stringify(err, undefined, 2)); }
//     });
// });




// => localhost:3000/restaurants/_id
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var restaurant = {
        created_at: null,
        updated_at: null,
        restaurant_name: req.body.restaurant_name,
        restaurant_location: req.body.restaurant_location,
        restaurant_phone: req.body.restaurant_phone,
        restaurant_email: req.body.restaurant_email, //optional
        restaurant_password: req.body.restaurant_password,//optional
        restaurant_logo: req.body.restaurant_logo,
    };

    Restaurant.findByIdAndUpdate(req.params.id, { $set: restaurant }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Restaurant Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

// => localhost:3000/restaurants/_id
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Restaurant.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Restaurant Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

// GetRestaurantByEmailAndPassword
router.get('/check_restaurant/:restaurant_email/restaurant/:restaurant_password', (req, res) => {
    var query = { "restaurant_email": req.params.restaurant_email, "restaurant_password": req.params.restaurant_password };
    
    Restaurant.find(query, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Restaurant :' + JSON.stringify(err, undefined, 2)); }
    });
});

//CheckRestaurantPassword
router.post('/loginRestaurant', async(req, res) => {
    var query = { "restaurant_email": req.body.restaurant_email };
    console.log("VALID PASSWORD =" + query);
    const restaurant = await Restaurant.find(query);
      if (restaurant[0]) {
        // check restaurant password with hashed password stored in the database
        const validPassword = await bcrypt.compare(req.body.restaurant_password, restaurant[0].restaurant_password);
        
        if (validPassword) {
          const token = jwt.sign({
            id: restaurant[0].id,
            restaurant_name: restaurant[0].restaurant_name,
            restaurant_email: restaurant[0].restaurant_email,
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
        res.status(401).json({ error: "Restaurant does not exist" });
      }  
  });


module.exports = router;