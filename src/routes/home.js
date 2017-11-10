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
    let revertString = (str, type) => {
        let reg = /^\/SOCKET/g
        if (reg.test(str)) {
            if (!type) return false
            str = str.replace(reg, '')
        }
        return str
    }
    await ctx.render('index', {
        title: '首页',
        jsonParse,
        marked,
        revertString,
        body
    })
})

module.exports = router
