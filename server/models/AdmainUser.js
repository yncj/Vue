const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    userName:{type:String},
    password:{
        select:false,    //密码显示为空，防止编辑保存后的密码再次散列，如果密码为空就不会在继续散列
        type:String,     
        set(val){       //刚方法接收传递的参数，然后引入‘bcrypt’的hashSync方法，来对参数进行散列，数字越大，散列越复杂，时间长度越长
            return require('bcrypt').hashSync(val,12)  
        }
    }
})

module.exports = mongoose.model('Admain_user',schema)