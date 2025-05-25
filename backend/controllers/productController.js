import { v2 as cloudinary  } from "cloudinary"
import productModel from "../models/productModel.js"
// Function for add product

const addProduct = async (req, res) => {
    try {
        const { name, price, description,category,subCategory , bestSeller , sizes, isVisible } = req.body;

        console.log('Received files:', req.files);

      
        const images = [];
        const expectedFields = ['image1', 'image2', 'image3', 'image4'];
        expectedFields.forEach(field => {
            const file = req.files.find(f => f.fieldname === field);
            if (file) images.push(file);
        });
     
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )  
       const productData = {
        name,
        price: Number(price), 
        description,
        category,
        subCategory,
        bestSeller: bestSeller === "true"? true : false ,
        sizes: JSON.parse(sizes),
        image: imagesUrl,
        isVisible: isVisible === undefined ? true : (isVisible === "true" ? true : false),
        date: Date.now()
       }

       console.log(productData);

       const product = new productModel(productData);
       await product.save()
        // res.json({success:true, message:'Files received', files: req.files});

        res.json({success:true, images: imagesUrl,message: "product Added"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

 // Function for list product
 const listProduct = async (req, res) => {
       try {
         const products = await productModel.find({})
         console.log('listProduct: fetched products count:', products.length);
         res.json({success:true,products})
       } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
       }
 }


 // function for remove product
 const removeProduct = async (req, res) => {
   try {
     
     await productModel.findByIdAndDelete(req.body.id)
     res.json({success:true,message:"product Removed"})
   } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message})
   }
 }

 // function for single product info
 // Route: /api/product/:productId
 const singleProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProduct = async (req, res) => {
  try {
    const { id, isVisible } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { isVisible },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {listProduct,addProduct,removeProduct,singleProduct,updateProduct}
