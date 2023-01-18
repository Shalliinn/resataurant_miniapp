const path=require('path');
const express=require('express')

const userController=require('../controllers/user')
const router=express.Router();
 
router.post('/signup',userController.newuser);
router.post('/login',userController.existinguser);

module.exports=router;
