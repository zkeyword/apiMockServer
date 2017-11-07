let { checkToken } = require('../../utils')
let jwtConfig = require('../../../config/jwt')

exports.apiAUTH = async (ctx, next) => {
    try {
        let { authorization } = ctx.header
        if (authorization) {
            try {
                authorization = authorization.split(' ')[1]
                let payload = await checkToken(authorization, jwtConfig.secret)
                ctx.user = {
                    ...payload
                }
            } catch (err) {
                console.log('token verify fail: ', err)
            }
        }
        console.log(`token: ${authorization}`)
        return next()
    } catch (err) {
        // if (err.status === 401) {
        //     ctx.body = {
        //         code: -1,
        //         message: '认证失败'
        //     }
        // } else {
        //     err.status = 404
        //     ctx.body = '404'
        //     console.log('不服就是怼：', err)
        // }
    }
    return next()
}
