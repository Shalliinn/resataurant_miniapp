
const User=require(('../models/user'))
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.newuser=  (req,res,next)=>{
  console.log(req.body)
  const {first_name,last_name,email,phoneNumber,password}=req.body
if(first_name.length==0 || email.length==0 || password.length==0){
  return res.status(400).json({err: "somethings missing"})
}
bcrypt.hash(password,10,(err,hash)=>{
  User.findAll({where:{email:email}})
  .then((user)=>{
     if(user.length>0){
        res.status(200).json({message:"User already exist"})
        }
     else{
      User.create({
        first_name:first_name,
        last_name:last_name,
             email:email,
             phoneNumber:phoneNumber,
             password:hash,
         })
         .then(()=>{
          console.log('user created');
             res.status(200).json({message:"User Created"})
         }).catch(err=>console.log(err))
     }
  })   
})
}
function generateAccessToken(id,first_name){
  return jwt.sign({userId:id,first_name:first_name},'secretkey')
  }

exports.existinguser=(req,res,next)=>{
  const {email,password}=req.body
  if(email.length==0 || password.length==0){
      return res.status(400).json({err: "somethings missing"})
  }
  User.findAll({where:{email:email}})
  .then((user)=>{
      if(user.length>0){
          const users=user[0].toJSON()
          console.log(users.email,'41');

          bcrypt.compare(password,users.password,(err,result)=>{
              if(err){
                  res.status(500).json({message:"something went wrong"})
               }
               else if(result===true){
                console.log('succesfully logged in');
                  res.status(200).json({message:"Successfully logged in",token:generateAccessToken(users.id,users.first_name)})
               }
               else{
                  res.status(401).json({message:"Password is incoorect"})
               }
          })
      }
   else{
      res.status(404).json({message:"User not exist"})
   }
  })
  .catch(err=>{console.log(err)})
}