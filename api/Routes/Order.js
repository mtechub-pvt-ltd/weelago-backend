const express = require('express');
const route = express.Router();
const OrderServices = require('../../Services/OrderServices')
const { authenticate } = require('../Middleware/auth')
/***************Routes************/


route.post('/Add', OrderServices.Add);
route.post('/GetOrdersByUser',  OrderServices.GetOrdersByUser);
route.post('/GetOrderByStatus',  OrderServices.GetOrderByStatus);
route.post('/UpdateStatus',  OrderServices.UpdateStatus);
route.get('/GetAll',  OrderServices.GetAllOrders);
route.post('/AssignDriver',  OrderServices.AssignDriver);

module.exports = route;