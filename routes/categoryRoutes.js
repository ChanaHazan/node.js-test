const express = require('express')
const router = express.Router()

const {DeleteCategory}=require('../controllers/categoryController')
const {auth,isAdmin} = require('../middlewares/auth');
router.delete('/delete',auth,isAdmin,DeleteCategory)

module.exports=router
