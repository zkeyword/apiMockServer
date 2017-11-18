const router = require('koa-router')()
const project = require('../services/project')
const interfaces = require('../services/interfaces')
const marked = require('marked')
const { jsonParse, getDBDrafterResult } = require('../middleware/parse/utils')

router.post('/', async (ctx, next) => {
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
    // let userId = ctx.body.userId
    // let projectObj = await project.list({ id: userId })
    // console.log(projectObj)
    let body = await interfaces.del(ctx.params.id, ctx.request.body)
    if (body) {
        ctx.body = `删除成功`
    } else {
        ctx.body = `删除失败`
    }
})

router.put('/:id', async (ctx, next) => {
    let body = await interfaces.modify(ctx.params.id, ctx.request.body)
    ctx.body = body[0] ? `修改成功` : `修改失败`
})

router.get('/', async (ctx, next) => {
    ctx.body = await interfaces.list()
})

router.get('/:id', async (ctx, next) => {
    ctx.body = await interfaces.list({ id: ctx.params.id })
})

router.get('/preview/:id', async (ctx, next) => {
    let interfacesList = await interfaces.list({ id: ctx.params.id })
    let body = getDBDrafterResult(interfacesList)[0]
    let revertString = (str, type) => {
        let reg = /^\/SOCKET/g
        if (reg.test(str)) {
            if (!type) return false
            str = str.replace(reg, '')
        }
        return str
    }
    await ctx.render('preview', {
        jsonParse,
        marked,
        body,
        revertString
    })
})

module.exports = router
