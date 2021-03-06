const router = require('koa-router')()
const project = require('../services/project')

router.post('/', async (ctx, next) => {
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

router.del('/:id', async (ctx, next) => {
    let body = await project.del(ctx.params.id, ctx.request.body)
    ctx.body = body ? 1 : 0
})

router.put('/:id', async (ctx, next) => {
    let body = await project.modify(ctx.params.id, ctx.request.body)
    ctx.body = body[0] ? 1 : 0
})

router.get('/', async (ctx, next) => {
    ctx.body = await project.list()
})

router.get('/:id', async (ctx, next) => {
    ctx.body = await project.list({ id: ctx.params.id })
})

module.exports = router
