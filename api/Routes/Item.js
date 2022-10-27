const express = require('express');
const route = express.Router();
const ItemService = require('../../Services/ItemService')
const { authenticate, C} = require('../Middleware/auth')
/***************Routes************/


route.post('/Add', ItemService.Add);
route.post('/Update', ItemService.Update);
route.get('/GetAll',  ItemService.GetAll);
route.post('/GetOne', ItemService.GetOne);
route.post('/Delete',  ItemService.Delete);
route.get('/GetDealItem', ItemService.GetDealItem);


module.exports = route;