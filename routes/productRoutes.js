const express=require('express');
const router=express.Router();

const {GetAllProducts,GetProductById,DeleteProduct,UpdateProduct,CreateProduct}=require('../controllers/productController');
const {auth,isAdmin} = require('../middlewares/auth');
router.get('/all',GetAllProducts);
router.post('/add',auth,isAdmin,CreateProduct);
router.delete('/delete/:id',auth,isAdmin,DeleteProduct);
router.put('/update/:id',auth,isAdmin,UpdateProduct);
router.get('/getById/:id',auth,GetProductById);

module.exports =router;