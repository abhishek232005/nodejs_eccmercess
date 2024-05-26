const category = require('../model/categarySchame')
const fs = require('fs')
const categary_create= async(req,res)=>{
    try {
        const {descripations,categary} = req.body
        const image = req?.file?.path
        if(!descripations || !categary || !image){
            res.status(401).send({message:"categary or descripations or image is required"})
        }
        const find_categary = await category.findOne({ categary: categary })
        if (find_categary) {
            return (res.status(200).send({
                status: false,
                msg: "this categary already exits"
            }))
        }
        const categarycreate = await category.create({
            descripations,categary,image, creater:req.user._id
        })
        console.log(categarycreate);
        res.status(201).send(categarycreate)
    } catch (error) {
        console.log((error));
    }
}

// get_categary
const get_categary = async(req,res)=>{
    try {
        const {categary,limit,page} = req.body
        const skip = (page-1) *limit
        const filter ={}
        if(categary){
            filter.categary = {$regex:categary, $options:"i"}
        }
        console.log(categary,filter);
        const find_categary = await category.find(filter).skip(skip).limit(limit).sort({createdAt:-1})
        const count = await category.countDocuments(filter)
        res.status(201).send({find_categary,count})
    } catch (error) {
        console.log(error);
    }
}

// get_singel_categary
 const get_singel_categary = async(req,res)=>{
    try {
        const _id = req.params.id
        const find_categary = await category.findById(_id)
        res.status(201).send(find_categary)
    } catch (error) {
        console.log(error);
    }
 }

 // update_categary
 const update_categary = async (req, res) => {
    try {
        const { categary, descripations, categaryid } = req.body;
        let imagePath = "";

        // Check if a file is uploaded
        if (req.file) {
            imagePath = req.file.path;

            // Delete the old image file if it exists
            if (req.user.imagePath ) {
                fs.unlink(req.user.imagePath, (err) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                });
            }
        }

        const updateCategory = await category.findByIdAndUpdate(
            categaryid,
            {
                categary,
                descripations,
                Image: imagePath ? imagePath : req.user.Image,
                creater: req.user._id
            },
            // { new: true } // Return the updated document
        );

        res.status(201).send({data:updateCategory, message:"profile update successfull"});
    } catch (error) {
        console.error(error);
        // res.status(501).send({ message: error.message });
    }
};


module.exports = {categary_create,get_categary,get_singel_categary,update_categary}