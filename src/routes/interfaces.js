const router = require('koa-router')()
const project = require('../services/project')
const interfaces = require('../services/interfaces')
const marked = require('marked')
const { jsonParse, getDBDrafterResult, revertString, replaceParentheses } = require('../middleware/parse/utils')

router.post('/', async (ctx, next) => {
    let projectObj = await project.getProjectbyIdAndUserId(ctx.request.body.projectId, ctx.user.id)
    if (!projectObj) ctx.body = `没有权限`
    let body = await interfaces.add(ctx.request.body)
    let res = ''
    if (body) {
        if (body[1]) {
            res = body[0]
        } else {
            res = `${body[0].name}已存在`
        }
    } else {
        res = `添加失败`
    }
    ctx.body = res
})

router.del('/:id', async (ctx, next) => {
    let projectObj = await project.getProjectbyIdAndUserId(ctx.request.body.projectId, ctx.user.id)
    if (!projectObj) ctx.body = `没有权限`
    let body = await interfaces.del(ctx.params.id)
    if (body) {
        ctx.body = `删除成功`
    } else {
        ctx.body = `删除失败`
    }
})

router.put('/:id', async (ctx, next) => {
    let projectObj = await project.getProjectbyIdAndUserId(ctx.request.body.projectId, ctx.user.id)
    if (!projectObj) ctx.body = `没有权限`
    let body = await interfaces.modify(ctx.params.id, ctx.request.body)
    ctx.body = body[0] ? `修改成功` : `修改失败`
})

router.get('/', async (ctx, next) => {
    ctx.body = await interfaces.list()
})

router.get('/:id', async (ctx, next) => {
    ctx.body = await interfaces.list({ id: ctx.params.id })
})

router.get('/content/:id', async (ctx, next) => {
    ctx.body = await interfaces.fetch(ctx.params.id)
})

router.get('/preview/:id', async (ctx, next) => {
    let interfacesList = await interfaces.fetch(ctx.params.id)
    let body = getDBDrafterResult([interfacesList])[0]
    await ctx.render('preview', {
        jsonParse,
        marked,
        body,
        revertString,
        replaceParentheses
    })
})

module.exports = router
