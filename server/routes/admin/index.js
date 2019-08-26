module.exports = app =>{
    const express = require('express')
    const router = express.Router({
        mergeParams:true     //把父级的参数合并到router子级路由里面使用
    })
    const AdmainUser=require('../../models/AdmainUser')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')


    //封装中间件
    /*验证登录接口*/
    const authMiddleware = require('../../middleware/auth')
    /*查找数据库模板*/
    const resourceMiddleware = require('../../middleware/resource')

    //发送数据接口，接受web端传递的数据

    //创建资源
    router.post('/', async(req,res)=>{

       const model= await  req.Model.create(req.body)
       res.send(model)
    })

    //获取数据的接口

    //资源列表
    router.get('/', 
    async(req,res)=>{
       const queryOptions={}
       if(req.Model.modelName==='Category'){
           queryOptions.populate='parent'
       }
        const items= await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
     })

     //资源详情
     router.get('/:id', async(req,res)=>{
        const item= await  req.Model.findById(req.params.id)
        res.send(item)
     })
    
     //更新资源
     router.put('/:id', async(req,res)=>{
        const item= await  req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(item)
     })

     //删除资源
     router.delete('/:id', async(req,res)=>{
         await  req.Model.findByIdAndDelete(req.params.id,req.body)
            res.send({
            success:true
        })
     })


    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)

    const multer = require('multer')
    const upload = multer({dest:__dirname + '/../../uploads'})

    app.post('/admin/api/upload',upload.single('file'),async (req,res)=>{
        const file = req.file
        file.url=`http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async (req,res)=>{
        const { userName,password }=req.body
        //根据用户名查找用户
        
        const user =await AdmainUser.findOne({userName}).select('+password')
        
        // res.send(user)
        assert(user,422,'用户姓名不存在')
        // if(!user){
        //     return res.status(422).send({
        //         message:'用户名不存在'
        //     })
        // }

        //效验密码
        const isValid= require('bcrypt').compareSync(password,user.password)

        assert(isValid,422,'输入密码错误')
        // if(!isValid){
        //     return res.status(422).send({
        //         message:'输入密码错误'
        //     })
        // }


        //返回token
        const token= jwt.sign({id:user._id,username:user.userName},app.get('secret'))
        res.send({token})
    })

    //错误处理函数
    app.use(async (err,req,res,next)=>{
        res.status(err.statusCode||500).send({
            message:err.message
        })
    })
}