const path=require('path');
const express=require('express')
const userauthentication=require('../middleware/auth')
const menuController=require('../controllers/menu')
const router=express.Router();
router.post('/post-category', userauthentication.authenticate,menuController.newcategory);
router.post('/post-item',userauthentication.authenticate,menuController.newitem);
router.get('/get-category',userauthentication.authenticate,menuController.getcategory);
router.get('/get-item/:id',userauthentication.authenticate,menuController.getitem);
module.exports=router;