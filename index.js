var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();

const { mongoose } = require('./dbConnect.js');
var userController = require('./controllers/userController.js');
var profileController = require('./controllers/profileController.js');
var restaurantController = require('./controllers/restaurantController.js');
var dishesController = require('./controllers/dishesController.js');
var orderController = require('./controllers/orderController.js');
var orderDetailController = require('./controllers/orderDetailController.js');
var delivererController = require('./controllers/delivererController.js');
var deliveryController = require('./controllers/deliveryController.js');

var mailHelper = require('./controllers/mailHelper.js');





var app = express();
app.use(bodyParser.json());
// app.use(cors({ origin: "http://localhost:4200" })); //local
app.use(cors({ origin: "*" }));


// app.listen(3000, () => console.log('listening on port : 3000')); //local
app.listen(process.env.PORT, () => console.log(`listening on port : ${process.env.PORT}`));


// Router for userController into the application
app.use('/users', userController);

// Router for userController into the application
app.use('/profiles', profileController);

// Router for restaurantController into the application
app.use('/restaurants', restaurantController);

// Router for dishesController into the applicationa
app.use('/dishes', dishesController);

// Router for orderController into the application
app.use('/orders', orderController);

// Router for orderController into the application
app.use('/orderDetails', orderDetailController);

// Router for deliveryController into the application
app.use('/deliverers', delivererController);

// Router for deliveryController into the application
app.use('/delivery', deliveryController);



// Router for mailHelper into the application
// app.use('/sendMail', mailHelper);

// app.use(express.static(path.join(__dirname, 'public'))); //=> Upload Image
// app.use('/images', express.static('images')); //=> Upload Image

app.get('/', (req, res) => {
    res.send('Hello World');
});
