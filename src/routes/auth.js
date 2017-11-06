const md5 = require('md5')
const router = require('koa-router')()
const users = require('../services/users')
const { signToke, checkToken } = require('../utils')

router.post('/', async (ctx, next) => {
    let req = ctx.request.body
    let body = await users.getUserByIdOrName({ username: req.username })
    let token = signToke({ id: 1 })
    let pay = await checkToken(token)
    console.log(token, pay)
    if (md5(req.password) === body.password) {
        ctx.body = '登录成功'
    } else {
        ctx.body = '密码出错'
    }
})

module.exports = router
