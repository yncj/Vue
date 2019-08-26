//引入express模块
const express = require("express")

//定义一个常量来接收实例化的express
const app = express()

const cors=require('cors')

app.set('secret','monologue')   //在express的实例上设置一个全局变量  

app.use(cors())
app.use(express.json())

app.use('/',express.static(__dirname+'/web'))

app.use('/admin',express.static(__dirname+'/admin'))

app.use('/uploads',express.static(__dirname+'/uploads'))

require('./plugins/db')(app)
require('./routes/admin/index')(app)
require('./routes/web')(app)

app.listen(3000,()=>{
    console.log('App listening on port 3000!')
})