const Product = require('../models/Product');
const Category=require('../models/Category')
const fs = require('fs')

const writeToLogDeletion = (productId)=>{
    const log=`product deleted: ${productId}, at the date: ${new Date()}\n`
    fs.appendFile('../files/Log.txt',log,(err) => {
        if (err) console.error(err);
    })
}

exports.CreateProduct = async (req, res) => {
    try {
       const {title,price,stock,category,isActive}=req.body

       const foundCategory= await Category.findOne({name:category})
       if(!foundCategory)
       {
           return res.status(400).json({message: "הקטגוריה לא קיימת במערכת"})
       }
       const newProduct = new Product({
           title: title,
           price: price,
           stock:stock,
           category:foundCategory._id,
           isActive:isActive
       });

       const savedProduct = await newProduct.save();
       res.status(201).json({
           message: "המוצר נוסף בהצלחה!",
           product: savedProduct
       });
   } catch (error) {
       res.status(400).json({ message: "שגיאה בהוספת המוצר", error: error.message });
   }
}

exports.UpdateProduct = async (req, res) => {
    try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
        return res.status(404).json({ message: "מוצר לא נמצא לעדכון" });
    }
    res.status(200).json({ message: "המוצר עודכן בהצלחה!", updatedProduct: updatedProduct });
} catch (error) {
    res.status(400).json({ message: "שגיאה בעדכון המוצר", error: error.message });
}
}

exports.DeleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndUpdate(req.params.id,{isActive:false},{ new: true });
        if (!deletedProduct) {
            return res.status(404).json({ message: "מוצר לא נמצא למחיקה" });
        }
        writeToLogDeletion(req.params.id)
        res.status(200).json({ message: "המוצר נמחק בהצלחה!", deletedProduct: deletedProduct });
    } catch (error) {
        res.status(400).json({ message: "שגיאה במחיקת המוצר", error: error.message });
    }
}

exports.GetProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "מוצר לא נמצא" });
        }
        res.status(200).json({
            message: "מוצר:",
            product: product
        });
    } catch (error) {
        res.status(400).json({ message: "שגיאה בקריאת המוצרים", error: error.message });
    }
}

exports.GetAllProducts = async (req, res) => {
    try {
        const products = await Product.find({isActive:true});
        res.status(200).json({
            message: "כל המוצרים:",
            products: products
        });
    } catch (error) {
        res.status(400).json({ message: "שגיאה בקריאת המוצרים", error: error.message });
    }
}