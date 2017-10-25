const router = require('koa-router')()
const project = require('../services/project')

router.post('/project', async (ctx, next) => {
    let body = await project.add(ctx.request.body)
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

router.del('/project/:id', async (ctx, next) => {
    let body = await project.del(ctx.params.id)
    if (body) {
        ctx.body = `删除成功`
    } else {
        ctx.body = `删除失败`
    }
})

router.put('/project/:id', async (ctx, next) => {
    let body = await project.modify(ctx.params.id, ctx.request.body)
    ctx.body = body[0] ? `修改成功` : `修改失败`
})

router.get('/project', async (ctx, next) => {
    ctx.body = await project.list()
})

router.get('/project/:id', async (ctx, next) => {
    ctx.body = await project.list({ id: ctx.params.id })
})

module.exports = router
