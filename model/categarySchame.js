const mongoose = require("mongoose")

const categarySchame = new mongoose.Schema({
    categary:{
        type:String,
        required: true
    },
    descripations:{
        type:String
    },
    image:{
        type:String
    }
})

const category = mongoose.model("category",categarySchame)
module.exports = category