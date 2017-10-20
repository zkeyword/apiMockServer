const router = require('koa-router')()
const { parseResult, jsonParse } = require('../services/markdown')

router.get('/', async (ctx, next) => {
    let body = await parseResult()
    await ctx.render('index', {
        title: '首页',
        body,
        jsonParse
    })
})

module.exports = router
