const mongoose = require("mongoose")

const EmployeeSchame = new mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const Employeemodel = mongoose.model("employee",EmployeeSchame)
module.exports = Employeemodel