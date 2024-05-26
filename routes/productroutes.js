const express = require("express")
const upload = require("../middelwere/fileupload")
const authenticate = require("../middelwere/authenticate")
const { product_create, get_product, get_singel_product, product_update, Update_product } = require("../controler/productcontorler")
const productroute = express.Router()

productroute.post("/create_product",upload.array("image",5), authenticate,product_create)
productroute.get("/getproduct",get_product)
productroute.get('/get_singel_product/:id',get_singel_product)
productroute.patch("/updateproduct",upload.single('image'),authenticate,Update_product)

module.exports = productroute