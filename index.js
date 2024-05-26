const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const route  = require('./routes/userroutes')
const productroute = require('./routes/productroutes')
const categaryroute = require('./routes/cateroute')
const orderroute = require('./routes/orderroute')
const cartroute = require('./routes/Addtocart')
// const Employeemodel = require("./model/Employee")
const path=require('path')
const app = express();
app.use(express.json());

app.use(cors({
    origin:"http://localhost:3000"
    // origin:"*"
}))
app.use("/upload",express.static(path.join(__dirname,"./upload")))
app.use('/',route)
app.use('/',productroute)
app.use('/',categaryroute)
app.use('/',orderroute)
app.use('/',cartroute)

mongoose.connect("mongodb+srv://abhi_new:Jv5fjH6GOtvm04Zn@cluster0.cedjm6o.mongodb.net/Employee?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("mongoose connect");
}).catch((error)=>{
    console.log("No mongoose connect",error);
})

app.get('/',(req,res)=>{
    res.send([
      {name:'Abhishek gwala',email:'abhishekgwala@gmail.com',password:'23032005',contact:'9521804871'},
      {name:'parshant',email:'parshant@gmail.com',password:'23102003',contact:'8107384378'},
      {name:'suraj',email:'suraj@gmail',password:'12345',contact:'3333'},
      {name:'kapil',email:'kapil@gmail.com',password:'12345',contact:'1244556'}
    ])
   })


//     try {
//         const { email, password } = req.body
//         const find_user = await Employeemodel.findOne({ email: email })
//         if (!find_user) {
//             res.status(401).json({ success: false, message: 'user not found' })
//         } else {
//             const compare_password = await bcrypt.compare(password, find_user.password)
//             if (compare_password) {
//                 let token = await jwt.sign({ id: find_user._id }, secretkey, { expiresIn: "1d" })
//                 return (res.status(201).send({ success: true, message: "login sucess", token }))
//             }
//             return (res.status(401).send({ success: false, message: "invalid password" }))
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(501).send(error)
//     }
// })

// app.post("/register", async(req,res)=>{
//     try {
//        // Create a new user using the User model
//     const newUser = new Employeemodel(req.body)
       
//       // Sae the user to the database
//       const savedUser = await newUser.save();
  
//       res.status(201).json({ message: 'User registered successfully', user: savedUser });
//     } catch (error) {
//       console.error(error);
//       res.status(501).json({ message: 'Internal server error' });
//     }
//   });
 



app.listen(4000,()=>{
    console.log("server start 4000");
})

