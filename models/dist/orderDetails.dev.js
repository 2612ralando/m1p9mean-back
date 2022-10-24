"use strict";

var mongoose = require('mongoose');

var OrderDetail = mongoose.model('OrderDetail', {
  created_at: {
    type: String
  },
  updated_at: {
    type: String
  },
  quantity: {
    type: Number
  },
  id_order: {
    type: String
  },
  id_dishes: {
    type: String
  },
  dishes_price: {
    type: String
  }
});
module.exports = {
  OrderDetail: OrderDetail
};