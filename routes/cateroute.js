const express = require("express")
const authenticate = require("../middelwere/authenticate")
const upload = require("../middelwere/fileupload")
const { categary_create, get_categary, get_singel_categary, update_categary } = require("../controler/categarycontorler")
const categaryroute = express.Router()
categaryroute.post('/categary_create',upload.single('image'),authenticate,categary_create)
categaryroute.post('/get_categary',authenticate,get_categary)
categaryroute.get('/get_singel_categary/:id',authenticate,get_singel_categary)
categaryroute.patch('/updatecategary',upload.single('image'),authenticate,update_categary)

module.exports = categaryroute