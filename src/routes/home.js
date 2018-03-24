const router = require('koa-router')()
const marked = require('marked')
const interfaces = require('../services/interfaces')
const { getDBDrafterResult, jsonParse, revertString, replaceParentheses } = require('../middleware/parse/utils')
const project = require('../services/project')

// router.get('/', async (ctx, next) => {
//     let interfacesList = await interfaces.list()
//     let body = getDBDrafterResult(interfacesList)
//     await ctx.render('index', {
//         title: '首页',
//         jsonParse,
//         marked,
//         revertString,
//         replaceParentheses,
//         body,
//         rootUrl: ctx.request.href
//     })
// })

router.get('/', async (ctx, next) => {
    let projectList = await project.list()
    await ctx.render('project', {
        title: '首页',
        projectList
    })
})

router.get('project/:id', async (ctx, next) => {
    let projectDetail = await interfaces.list({ id: ctx.params.id })
    let body = getDBDrafterResult(projectDetail)
    await ctx.render('projectDetail', {
        title: '首页',
        projectDetail,
        jsonParse,
        marked,
        revertString,
        replaceParentheses,
        body,
        rootUrl: ctx.request.href
    })
})

module.exports = router
