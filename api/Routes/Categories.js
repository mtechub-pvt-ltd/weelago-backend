const express = require('express');
const route = express.Router();
const CategoriesService = require('../../Services/CategoriesService')
const { authenticate, restrictTo } = require('../Middleware/auth')
/***************Routes************/


route.post('/Add',  CategoriesService.Add);
route.post('/Update',   CategoriesService.Update);
route.get('/GetAll',  CategoriesService.GetAll);
route.post('/GetOne', CategoriesService.GetOne);

module.exports = route;