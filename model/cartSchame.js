const mongoose = require('mongoose')

const cartSchame = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    
    quantity:{
        type:Number
    }
},{
    timestamps:true
})

const Addtocart = mongoose.model('addtocarts',cartSchame)
module.exports = Addtocart