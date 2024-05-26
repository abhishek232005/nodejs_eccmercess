const express = require('express')
const { singup_user, login_user, get_user, get_singel_user, forget_password, otp_verify, reste_password, user_address, update_user } = require('../controler/usercontroler')
const authenticate = require('../middelwere/authenticate')
const upload = require('../middelwere/fileupload')

const route = express.Router()

route.post('/singup_user',singup_user)
route.post('/login-user',login_user)
route.post('/getuser',get_user)
route.get('/get_singel_user',authenticate,get_singel_user)
route.post('/forget_password',forget_password)
route.post('/otp_verify',otp_verify)
route.post('/reste_password',reste_password)
route.post('/address',authenticate,user_address)
route.put('/update_user',upload.single('photo'),authenticate,update_user)

module.exports = route