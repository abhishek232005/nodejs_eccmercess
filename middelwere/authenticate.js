const jwt = require('jsonwebtoken')
const user = require('../model/user')

const authenticate = async(req,res,next)=>{
    try {
        const {token} = req.headers
        if(!token){
            res.status(401).send({message:"token is required"})
        }
        const decode = await jwt.sign(token,"abhihskegwala2005")
        console.log(decode);

        const find_user = await user.findOne({id:decode._id})
        if(!find_user){
            res.status(401).send({message:"user not fund"})
        }
        req.user = find_user

        next()

    } catch (error) {
        console.log(error);
    }
}

module.exports = authenticate