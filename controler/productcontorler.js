const product = require('../model/productSchame')
const fs = require("fs")

const product_create = async (req, res) => {
    try {
        const { productname, descripation,  stock, price } = req.body
        const image = req?.files
        // ya file ke path nikal na ma kam ath hai
        let path = req.files.map((it) => {
            return it.path
        })
        console.log(path);
        console.log(productname,descripation,stock,price,image);
        if (!productname || !descripation  || !stock || !price || !image) {
           return( res.status(401).send({ message: "productname,descripation,stock,image,price is required" })
        )
        }

        const createproduct = await product.create({
            productname, descripation, stock, price, image: path
        })
        console.log(createproduct);
        res.status(201).send(createproduct)
    } catch (error) {
        console.log(error);
         res.status(501).send({message:error.message})
    }
}

// get product
const get_product = async (req, res) => {
    try {
        const {productname, startprice, endprice, category, limit, page } = req.query;
        console.log(req.body); 

        const skip = (page - 1) * limit;
        const filter = {};

        if (productname) {
            filter.productname = { $regex:productname,$options:'i' };
        }
        if (startprice && endprice) {
            filter.price = { $gte: startprice, $lte: endprice };
        }
        if (category) {
            filter.category = { $regex: category, $options: "i" };
        }

        console.log(productname, startprice, endprice, category, filter); 

        const find_products = await product.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
            const count = await product.countDocuments(filter);
            console.log(filter,count);

        res.status(200).json({ products: find_products, total: count });
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error.message})
    }
};


// get_singel_product
const get_singel_product = async (req, res) => {
    try {
        const _id = req.params.id
        // const find_user = await product.findById(_id).populate({path:"categary",select:"categary"})
        const find_user = await product.findById(_id).populate('categary', 'categary')
        res.status(201).send(find_user)
    } catch (error) {
        console.log(error);
        res.status(501).send({ message: error.message })
    }
}

// product_update
const Update_product = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        let Imagepath = "";

        // Check if a file is uploaded
        if (req.file) {
            Imagepath = req.file.path;

            // Delete the old image file if it exists
            if (req.user.Imagepath) {
                fs.unlink(req.user.Imagepath, (err) => {
                    if (err) {
                        console.log(err);
                        throw err
                    }
                });
            }
        }

        const productupdate = await product.findOneAndUpdate(
            category, // find by category
            {
                name,
                description,
                price,
                category,
                image: Imagepath ? Imagepath : req.user.Image,
                creater: req.user._id
            },
            { new: true } // Return the updated document
        );
        if (!productupdate) {
            // Handle the case where no document was found
            return res.status(404).send({ message: "Product not found" });
        }

        res.status(201).send({ message: "Profile updated successfully", data: productupdate });
    } catch (error) {
        console.error(error);
        res.status(401).send({ message: error.message });
    }
};
module.exports = { product_create, get_product, get_singel_product, Update_product }