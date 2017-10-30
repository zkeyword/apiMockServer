const router = require('koa-router')()
const marked = require('marked')
const { parseResult, jsonParse } = require('../services/markdown')

router.get('/', async (ctx, next) => {
    let body = await parseResult(`${__dirname}/../../upload/`)
    await ctx.render('index', {
        title: '首页',
        body,
        jsonParse,
        marked
    })
})

module.exports = router
