const Addtocart = require('../model/cartSchame');


const addtocart = async (req, res) => {
    try {
        const {  productId, quantity } = req.body;
        const userId = req.user._id
        const find_addtocart = await Addtocart.findOne({productId,userId}) 
        if(find_addtocart){
            const find_update = await Addtocart.findByIdAndUpdate(find_addtocart._id,{quantity:find_addtocart.quantity+1},{
                new:true
            })
            return res.status(201).send(find_update);
        }
        const newItem = new Addtocart({ userId, productId, quantity });
        await newItem.save();
        res.status(201).send({newItem});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}


const addtocart_get = async (req, res) => {
    try {
        const {  limit, page } = req.body; // Assuming query parameters are used for pagination
        const skip = (page - 1) * limit;
        const filter = {};

        console.log( filter);

        // Populate the 'productId' field with details from the 'product' collection
        const cartItems = await Addtocart.find()
            .populate({
                path: 'productId',
                select: 'productname descripation image rating price stock',
            })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });


        const count = await Addtocart.countDocuments(filter);

        console.log(cartItems);
        res.status(200).json({ cartItems, count }); // Adjust status code and response format as needed
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message }); // Adjust status code and error handling as needed
    }
};


const addtocart_singel = async (req, res) => {
    try {
        const _id = req.params.id
        const find_cart = await Addtocart.findById(_id)
        res.status(201).send(find_cart)
    } catch (error) {
        console.log(error);
        res.status(501).send({ message: error.message })
    }
}


// delete

const delete_cart = async (req,res)=>{
    const cartItemId = req.params.id;

    try {
        const deletedCartItem = await Addtocart.findByIdAndDelete(cartItemId);
        if (!deletedCartItem) {
            return res.status(404).json({ error: 'Item not found in the cart' });
        }
        res.json({ message: 'Item deleted from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(501).json({ error: 'Server Error' });
    }
}


const update_cart = async (req,res)=>{
    const cartItems = req.params.id
    try {
        const {quantity} = req.body
        const updatecartItem = await Addtocart.findByIdAndUpdate(cartItems,{
            quantity
        })
     res.status(201).send({message:"Item Update from cart successfully",updatecartItem})
        
        
    } catch (error) {
        console.log(error);
        res.status(501).send({message:error.message})
    }
}

module.exports = { addtocart, addtocart_get, addtocart_singel ,delete_cart,update_cart}