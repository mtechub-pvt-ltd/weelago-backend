const express = require('express');
const route = express.Router();
const UserServices = require('../../Services/userService')
const middleware = require('../../utils/Middleware_validation')

const { authenticate } = require('../Middleware/auth')
/***************Routes************/


route.post('/signup', UserServices.SignUp);
route.post('/login',UserServices.Login);
route.post('/update',UserServices.Update);
route.get('/GetAllDrivers', UserServices.GetAllDrivers);

// route.post('/AddItemToWishList',  UserServices.AddItemToWishList);
// route.post('/RemoveItemFromWishList', UserServices.RemoveItemFromWishList);
// route.post('/GetWishList', UserServices.GetWishList);
 

module.exports = route;