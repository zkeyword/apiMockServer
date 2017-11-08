const md5 = require('md5')
const router = require('koa-router')()
const users = require('../services/users')
const { signToke, checkToken } = require('../utils')

router.post('/', async (ctx, next) => {
    let req = ctx.request.body
    let body = await users.getUserByIdOrName({ username: req.username })
    if (md5(req.password) === body.password) {
        let token = signToke({ id: 1 })
        let pay = await checkToken(token)
        let serverTime = +(new Date())
        ctx.body = {
            userId: body.id,
            tokenType: 'Bearer',
            accessToken: token,
            expiresAt: serverTime + pay.exp,
            serverTime,
            refreshToken: ''
        }
    } else {
        ctx.body = '密码出错'
    }
})

router.put('/refresh', async (ctx, next) => {

})

router.del('/:token', async (ctx, next) => {

})

router.get('/', async (ctx, next) => {
    ctx.body = ctx.user
})

module.exports = router
