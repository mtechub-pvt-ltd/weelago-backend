const express = require('express');
const route = express.Router();
const PromotionServices = require('../../Services/PromotionServices')
const { authenticate, restrictTo } = require('../Middleware/auth')
/***************Routes************/


route.post('/Add', PromotionServices.Add);
route.get('/GetAll', PromotionServices.GetAll);
route.post('/Delete', PromotionServices.Delete);

module.exports = route;