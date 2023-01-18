const jwt=require('jsonwebtoken')
const User=require('../models/user')


exports.authenticate=(req,res,next)=>{
    try{
        const token=req.header('token');
        console.log(token);
        const user=jwt.verify(token,'secretkey');
        console.log(user);
    User.findByPk(user.userId).then(user=>{
            req.user=user;
            next()
        })
    }catch(err){
        console.log(err);
        return res.status(401).json({success:false})
        }
}
