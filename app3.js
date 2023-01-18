const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const app = express();
const User=require('./models/user')
const Category=require('./models/category')
const Item=require('./models/item')
app.use(bodyParser.json({ extended: false }));
var cors=require('cors');
app.use(cors());
const userRoutes=require('./routes/user');
const menuRoutes=require('./routes/menu');

app.use(userRoutes)
app.use(menuRoutes)
User.hasMany(Category);
Category.belongsTo(User);
Category.hasMany(Item);
Item.belongsTo(Category);

sequelize
.sync()
.then(result=>{
    //console.log(result);
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})