const user = require("../model/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendmail = require('../utilit/muler')
const secrothey = "abhihskegwala2005"
const fs = require("fs")




const  singup_user = async(req,res)=>{
    try {
        const {email} = req.body
        const find_user = await user.findOne({email:email})
        if(find_user){
            res.status(401).send({message:"this email already exist"})
        }
        const users = new user(req.body)
        console.log(req.body);
         const createuser = await users.save()
        const token = jwt.sign({id:createuser._id},secrothey,{expiresIn:"1d"})
        res.status(201).send({createuser,token})
    } catch (error) {
        console.log(error.message);
        res.status(501).send({message:error.message})
        
       
    }
}

const login_user = async(req,res)=>{

    try {
        const {email,password} = req.body
        const find_user = await user.findOne({email:email})
        if(!find_user){
            res.status(401).send({message:"user not  fund"})
        }else{
            const compare_password = await bcrypt.compare(password, find_user.password)
            if(compare_password){
                let token = jwt.sign({id:find_user._id},secrothey,{expiresIn:"1d"})
                console.log(token);
                
              return  res.status(201).send({message:"Login successfull", token})
            }
            return res.status(401).send({message:"invalied password"})
        }

    } catch (error) {
        console.log(error);
        res.status(501).send({message:error.message})
    }
}

// Assuming you have required necessary packages and set up the server


  

// get_user
const get_user = async(req,res)=>{
    try {
        const {fullname,email,phone,limit,page}= req.body
        const skip = (page-1) *limit
        const filter = {}
        if(fullname){
            filter.name = {$regex:fullname, $options: "i"}
        }
        if(email){
            filter.email = {$regex: fullname , $options: "i"}
        }
        if(phone){
            filter.phone = {$regex: phone, $options:"i"}
        }
        console.log(fullname,email,phone,filter);
        const find_user = await user.find(filter).skip(skip).limit(limit).sort({createdAt: -1})
        const count = await user.countDocuments(filter)
        res.status(201).send({find_user, count})
    } catch (error) {
        console.log(error);
    }
}

// get_si8ngel_user
const get_singel_user = async(req,res)=>{
    try {
        const find_user = await user.findById(req.user._id)
        return(
            res.status(201).send(find_user)
        )
    } catch (error) {
        console.log(error);
        res.status(501).send({message: error.message})
    }
}

// forget_password

function generateRandomNumber(){
    const randomNumber = Math.floor(Math.random()*900000) + 100000;
    return randomNumber
}

const forget_password = async(req,res)=>{
    try {
        const {email} =req.body
        const userdata = await user.findOne({email:email})
        if(userdata){
            const otp = generateRandomNumber()
            console.log(otp);
            sendmail(email, `otp is ${otp}`, "forget password", "")
            await user.updateOne({email:email},{$set:{otp:otp, otpexpire:
            new Date().getTime() + 2 * 60000}})
            res.status(201).send({message:"otp send successfull"})
        }else{
            res.status(200).send({message:" this email does not exist"})
        }
    } catch (error) {
        console.log(error);
    }
}

// otp_verify
const otp_verify = async(req,res)=>{
    try {
        const {email,otp} = req.body
        const find_user = await user.findOne({email:email})
        if(find_user){
            if(find_user.otpexpire > new Date().getTime()){
                if(find_user.otp == otp){
                    return(res.status(201).send({message:"otp verify successfull"}))
                }
                return res.status(401).send({message:"otp is wrong"})
            }
            return res.status(401).send({message:"otp is expried"})
        }else{
            res.status(200).send({message:"user not fund"})
        }
    } catch (error) {
        console.log(error);
    }
}

// reste_password
const reste_password = async (req,res)=>{
    try {
        const {email,password}= req.body
        if(!email || !password){
            res.status(401).send({message:"email or password is required"})
        }
        const find_user = await user.findOne({email:email})
        const hashpassword = await bcrypt.hash(password,12)

        if(find_user){
            const userupdate = await user.updateOne({email:email}, {$set:{password: hashpassword}})
            console.log(userupdate);
            if(userupdate.modifiedCount = 1){
                res.status(201).send({message:"profile update successfull"})
            }
            res.status(401).send({message:"update not update"})
        }else{
            res.status(200).send({message:"user not fund"})
        }
    } catch (error) {
        console.log(error);
        res.status(501).send({message:error.message})
    }
}

// address 
const user_address = async (req, res) => {
    try {
        const { address, phone } = req.body;
        if (!address || !phone) {
            return res.status(400).json({ message: "Address and phone are required" });
        }

        // Assuming req.user contains user data

        console.log("New Address:", { address, phone });

        // Assuming req.user.address is an array of addresses
        const updatedAddresses = [...req.user.address, { address, phone }];

        // Assuming user is the model for your user data
        const addressUpdate = await user.findByIdAndUpdate(req.user._id, { address: updatedAddresses }, { new: true });

        if (!addressUpdate) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Address updated successfully", user: addressUpdate });
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// update_user
const update_user = async (req, res) => {
    try {
        const { fullname, email, phone } = req.body
        //  const photo = req.file.path
        // let path = req.file ? req.file.path:""
        let path = ""
        if (req.file) {
            path = req.file.path
            fs.unlink(req.user.photo, (err) => {
                if (err) {
                    console.log(err)
                    throw err
                }
            })
        }
        const userupdate = await user.findByIdAndUpdate(req.user._id, {
            fullname, email,
            phone, photo: path ? path : req.user.photo
        })
        console.log(userupdate);
        res.status(201).send({ msg: "profile update succesfully",data:userupdate })
    } catch (error) {
        console.log(error);
        res.status(501).send({message:error.message})
    }
}
module.exports = {singup_user,login_user,get_user,get_singel_user,forget_password,otp_verify, reste_password,user_address,update_user}