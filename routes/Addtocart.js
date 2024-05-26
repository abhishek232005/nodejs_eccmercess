const express = require('express')
const { addtocart, addtocart_get, addtocart_singel, delete_cart, update_cart } = require('../controler/AddTocart')
const authenticate = require('../middelwere/authenticate')
const cartroute = express.Router()

cartroute.post('/cart_create',authenticate,addtocart)
cartroute.post('/cart_find',addtocart_get)
cartroute.get('/cart_singel/:id',authenticate,addtocart_singel)
cartroute.delete('/cart/:id',delete_cart)
cartroute.put('/cart/:id',authenticate,update_cart)

module.exports = cartroute