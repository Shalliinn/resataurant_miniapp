const Sequelize=require('sequelize');
const sequelize=require('../util/database')

const Item=sequelize.define('item',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
},
item_name: Sequelize.STRING,
item_prize: Sequelize.STRING,
item_url: Sequelize.STRING,
})
module.exports=Item;