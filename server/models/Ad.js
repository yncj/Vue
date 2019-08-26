const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    name:{type:String},
    items:[{
        title:{type:String},
        image:{type:String},
        URL:{type:String},
    }],
    
})

module.exports = mongoose.model('Ad',schema)