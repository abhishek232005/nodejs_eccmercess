const mongoose = require("mongoose")

const productSchame = new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    categary:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    descripation:{
        type:String,
    },
    image:{
        type:[]
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    rating:{
        type : Number,
        default:0
    },
    price:{
        type: Number
    },
    stock:{
        type:Number
    }

},{
    timestamps:true
})

const product = mongoose.model("product",productSchame)
module.exports = product