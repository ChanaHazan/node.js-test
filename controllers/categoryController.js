const Category=require('../models/Category')
const Product = require('../models/Product')

exports.DeleteCategory= async (req,res) =>{
 try {
   const cat=await Category.findOne({name:req.body.name})
   if(!cat){
      return res.status(404).json({message: "לא נמצאה קטגוריה כזו"})
   }

   const products= await Product.find({ category: cat._id })
   if(products.length >0){
      return res.status(400).json({
         message:"אי אפשר למחוק את הקטגריה. יש מוצרים שמשויכים אליה."
      })
   }
   const deletedCategory= await Category.findOneAndDelete({name:req.body.name})

   res.status(200).json({message: "הקטוגריה נמחקה" ,deletedCategory:deletedCategory})
 }catch(error){
    res.status(400).json({ message: "שגיאה במחיקת הקטגוריה", error: error.message });
 }
}