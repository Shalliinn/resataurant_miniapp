const Category=require('../models/category');
const Item=require('../models/item');

exports.newcategory=(req,res,next)=>{
    const {category_name}=req.body;
    const user_id=req.user.id;
    Category.create({
        category_name:category_name ,
        userId:user_id
    })
    .then((data)=>{
        console.log("category created");
        res.json(data)
    }).catch(err=>console.log(err))
}

exports.newitem=(req,res,next)=>{
    const {item_name,item_prize,item_url,categoryId}=req.body;
        Item.create({
        item_name:item_name,
        item_prize:item_prize,
        item_url:item_url,
        categoryId:categoryId
    })
    .then((data)=>{
        console.log("item created");
        res.json(data)
    }).catch(err=>console.log(err))
}

exports.getcategory=(req,res,next)=>{
    const id=req.user.id
 Category.findAll({where:{userId:id}}).then((category)=>{
res.status(200).json({Category:category})
}).catch((err)=>{console.log(err)})
   
}

exports.getitem=(req,res,next)=>{
    const categoryId=req.params.id
    Item.findAll({where:{categoryId:categoryId}})
    .then((item)=>{
        res.status(200).json({Items:item})
    }).catch((err)=>{
        console.log(err);
    })
      
   }