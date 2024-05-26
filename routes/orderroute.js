const express = require('express')
// const upload = require('../middelwere/fileupload')
const authenticate = require('../middelwere/authenticate')
const { order_create, order_get, order_singel } = require('../controler/ordercontorler')
const orderroute = express.Router()
orderroute.post('/order_create',authenticate,order_create)
orderroute.get('/order_get',order_get)
orderroute.get('/order_singel/:id',order_singel)

module.exports = orderroute