module.exports = {
    outputDir:__dirname+'/../server/admin',
    //判断当前环境是在开发还是编译？如果是开发环境，后台地址就用根路径，如果是编译环境，后台地址就选择使用域名后的admin目录
    publicPath:process.env.NODE_ENV ==='production'
    ? '/admin/'
    : '/'
}