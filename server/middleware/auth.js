module.exports = option =>{

    const AdmainUser=require('../models/AdmainUser')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')


    return async (req,res,next)=>{
        const token= String(req.headers.authorization ||"").split(" ").pop()
        console.log(token)
        assert(token,401,'请先登录(请提供有效jwt token)')

        const {id} =jwt.verify(token,req.app.get('secret'))
        assert(id,401,'请先登录(无效jwt token）')

        req.user=await AdmainUser.findById(id)
        assert(req.user,401,'请先登录')
        await next()
    }
}