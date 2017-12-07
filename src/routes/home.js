const router = require('koa-router')()
const marked = require('marked')
const interfaces = require('../services/interfaces')
const { getDBDrafterResult, jsonParse, revertString, replaceParentheses } = require('../middleware/parse/utils')

router.get('/', async (ctx, next) => {
    let interfacesList = await interfaces.list()
    console.log(interfacesList)
    let body = getDBDrafterResult(interfacesList)
    await ctx.render('index', {
        title: '首页',
        jsonParse,
        marked,
        revertString,
        replaceParentheses,
        body,
        rootUrl: ctx.request.href
    })
})

module.exports = router
