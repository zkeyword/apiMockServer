const parse = require('./parse')
const Mock = require('mockjs')

module.exports = (router) => {
    return async (ctx, next) => {
        let urlList = await parse
        console.log(urlList)
        ctx.render('test', urlList)
        await next()
    }
}
