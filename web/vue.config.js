module.exports = {
    outputDir:__dirname+'/../server/web',
    //判断当前环境是在开发还是编译？如果是开发环境，前端页面路径就用根路径，编译环境选择使用域名
    publicPath:process.env.NODE_ENV ==='production'
    ? '/'
    : '/'
}