const router = require('koa-router')()

// 项目
const project = require('../services/project')
router.post('/project', async (ctx, next) => {
    let body = await project.add(ctx.request.body)
    // let res = ''
    // console.log(body)
    // if (body) {
    //     if (body[1]) {
    //         res = body[0]
    //     } else {
    //         res = `${body[0].name}已存在`
    //     }
    // } else {
    //     res = `添加失败`
    // }
    ctx.body = body
})

router.del('/project/:id', async (ctx, next) => {
    let body = await project.del(ctx.params.id, ctx.request.body)
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

// 用户
const users = require('../services/users')
router.post('/users', async (ctx, next) => {
    let body = await users.add(ctx.request.body)
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

router.del('/users/:id', async (ctx, next) => {
    let body = await users.del(ctx.params.id)
    if (body) {
        ctx.body = `删除成功`
    } else {
        ctx.body = `删除失败`
    }
})

router.put('/users/:id', async (ctx, next) => {
    let body = await users.modify(ctx.params.id, ctx.request.body)
    ctx.body = body[0] ? `修改成功` : `修改失败`
})

router.get('/users', async (ctx, next) => {
    ctx.body = await users.list()
})

router.get('/users/:id', async (ctx, next) => {
    ctx.body = await users.list({ id: ctx.params.id })
})

// 接口
const interfaces = require('../services/interfaces')
router.post('/interfaces', async (ctx, next) => {
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

router.del('/interfaces/:id', async (ctx, next) => {
    let body = await interfaces.del(ctx.params.id)
    if (body) {
        ctx.body = `删除成功`
    } else {
        ctx.body = `删除失败`
    }
})

router.put('/interfaces/:id', async (ctx, next) => {
    let body = await interfaces.modify(ctx.params.id, ctx.request.body)
    ctx.body = body[0] ? `修改成功` : `修改失败`
})

router.get('/interfaces', async (ctx, next) => {
    ctx.body = await interfaces.list()
})

router.get('/interfaces/:id', async (ctx, next) => {
    ctx.body = await interfaces.list({ id: ctx.params.id })
})

module.exports = router
