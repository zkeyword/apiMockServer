let { checkToken } = require('../../utils')
let jwtConfig = require('../../../config/jwt')
exports.userAUTH = async (ctx, next) => {
    // TODO

    return next()
}

exports.apiAUTH = async (ctx, next) => {
    // try {
    //     const token = ctx.header.authorization
    //     //     if (token) {
    //     //         let payload
    //     //         try {
    //     payload = await checkToken(token, jwtConfig.secret)
    //     console.log(12121212, payload)
    //     //             ctx.user = {
    //     //                 name: payload.name,
    //     //                 id: payload.id
    //     //             }
    //     //         } catch (err) {
    //     //             console.log('token verify fail: ', err)
    //     //         }
    //     //     }
    //     //     console.log(`token: ${token}`)
    //     //     await next()
    // } catch (err) {
    //     //     if (err.status === 401) {
    //     //         ctx.body = {
    //     //             code: -1,
    //     //             message: '认证失败'
    //     //         }
    //     //     } else {
    //     //         err.status = 404
    //     //         ctx.body = '404'
    //     //         console.log('不服就是怼：', err)
    //     //     }
    // }
    return next()
}
