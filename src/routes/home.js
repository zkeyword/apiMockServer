const router = require('koa-router')()
const marked = require('marked')
const interfaces = require('../services/interfaces')
const { getDBDrafterResult, jsonParse } = require('../middleware/parse/utils')

// const { parseResult } = require('../services/markdown')
// router.get('/', async (ctx, next) => {
//     let body = await parseResult(`${__dirname}/../../upload/`)
//     await ctx.render('index', {
//         title: '首页',
//         body,
//         jsonParse,
//         marked
//     })
// })

router.get('/', async (ctx, next) => {
    let interfacesList = await interfaces.list()
    let body = getDBDrafterResult(interfacesList)
    await ctx.render('index', {
        title: '首页',
        jsonParse,
        marked,
        body
    })
})

module.exports = router
