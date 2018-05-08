const router = require('koa-router')()
const history = require('../services/history')

router.post('/:interfaceId', async (ctx, next) => {
    console.log(ctx.params.id, ctx.request.body)
    let body = await history.add(ctx.params.interfaceId, ctx.request.body)
    ctx.body = body
})

router.get('/:interfaceId', async (ctx, next) => {
    let body = await history.list(ctx.params.interfaceId)
    ctx.body = body
})

router.get('/:interfaceId/:id', async (ctx, next) => {
    let body = await history.detail(ctx.params.interfaceId, ctx.params.id)
    ctx.body = body
})

module.exports = router
