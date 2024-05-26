const mongoose = require("mongoose")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretkey = "abhishekgwala2005"

const addressSchame = new mongoose.Schema({
    address:{
        type: String
    },
    phone:{
        type: Number
    }
})

const userSchame = new mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
    },
    otp:{
        type: Number
    },
    otpexpire:{
        type: Date
    },
    photo:{
        type: String
    },
    address:{
        type: [addressSchame]
    }
})

userSchame.pre('save',async function (next) {
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password,12)
    }
})

const user = mongoose.model('user',userSchame)
module.exports = user

