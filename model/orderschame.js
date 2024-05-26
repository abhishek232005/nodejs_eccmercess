const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String,  },
        city: { type: String, },
        state: { type: String,  },
        pincode: { type: Number, },
        phoneNumber: { type: Number,  },
        countery:{type:Number}
    },
    orderItems: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
    }],
   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      
    },
    paymentInfo: {
        id: { type: String, },
        status: { type: String },
        paidAt: { type: Date, default: Date.now }
    },
    itemPrice: { type: Number },
    taxtPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
