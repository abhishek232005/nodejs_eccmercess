const Order = require('../model/orderschame');


const order_create = async (req, res) => {
    try {
        const {
            shippingInfo,
            orderItems,
            itemPrice,
            taxtPrice, 
            shippingPrice,
            totalPrice
        } = req.body;

        // Uncomment the following lines to enable validation
        // if (!shippingInfo || !orderItems || !itemPrice || !fshippingPrice || !totalPrice || !taxPrice) {
        //     res.status(401).send({ message: "shippingInfo, orderItems, itemPrice, taxPrice, shippingPrice, and totalPrice are required" })
        // }
        
        const newOrder = await Order.create({
            userId:req.user._id,
            shippingInfo,
            orderItems,
            itemPrice,
            taxtPrice, 
            shippingPrice,
            totalPrice
        });
        console.log(newOrder);
        res.status(201).send(newOrder);
    } catch (error) {
        // console.log(error);
        res.status(501).send({ message: error.message });
    }
}


// order_get
const order_get = async (req,res)=>{
    try {
        const orders_find = await Order.find()
        res.status(201).send(orders_find)
    } catch (error) {
        console.log(error);
    }
}

// order_singel
const order_singel = async (req, res) => {
    try {
        const _id = req.params.id;
        console.log("Order ID:", _id); 
        const order = await Order.findById(_id);
      
        res.status(200).send(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.messsage});
    }
};




module.exports = { order_create,order_get ,order_singel}


// {
//     "shippingInfo":{
//         "address":"dayana",
//         "city"  :"beawer",
//         "state":"jaipur",
//         " quantity":2,
//         " pincode": 23032005,"phone":9521804871
      
//     },
//     "orderItem":
//      [{
//         "name":"abhishek","price":345,  "quantity":2,"image":"download (1).jpg"   
        
//        },  {
//         "name":"prashant","price":500,  "quantity":2,"image":"download (1).jpg"
        
//       },
//       {
//         "name":"prashant","price":500,  "quantity":2,"image":"download (1).jpg"," productId":"65db0c9ce9314df1524a3462"
        
//       }
//         ],
       
      
      
//       "itemPrice":90,
//       "taxtPrice":10,
//       "shippingPrice":400,
//       "totalPrice":500
    
    
//   }

// {
//     "shippingInfo":{
//         "address":"dayana",
//         "city"  :"beawer",
//         " state":"jaipur",
//         " quantity":2,
//         "  pincode": 23032005,"phone":9521804871
      
//     },
//     "orderItem":
//      [{
//         "name":"abhishek","price":345,  "quantity":2,"image":"download (1).jpg","productId":"65db0c9ce9314df1524a3462"  
        
//        },  {
//         "name":"prashant","price":500,  "quantity":2,"image":"download (1).jpg","productId":"65db0c9ce9314df1524a3462"  
        
//       },
//       {
//         "name":"prashant","price":500,  "quantity":2,"image":"download (1).jpg"," productId":"65db0c9ce9314df1524a3462"
        
//       }
//         ],
       
      
      
//       "itemPrice":90,
//       "taxtPrice":10,
//       "shippingPrice":400,
//       "totalPrice":500
    
    
//   }