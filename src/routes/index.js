const router = require('koa-router')()
const Mock = require('mockjs')
const parse = require('../middleware/parse')
module.exports = app => {
    router.get('/', async (ctx, next) => {
        await ctx.render('index', {
            title: 'Hello Koa 2!'
        })
    })

    app.use(async (ctx, next) => {
        let urlList = await parse
        urlList.forEach(re => {
            re.examples.forEach(exp => {
                router[re.method.toLocaleLowerCase()](re.url, async (ctx, next) => {
                    exp.responses[0].headers.forEach(header => {
                        ctx.set(header.name, header.value)
                    })
                    ctx.body = Mock.mock(JSON.parse(exp.responses[0].body))
                })
            })
        })
        await next()
    })

    app.use(router.routes(), router.allowedMethods())
}

// const router = require('koa-router')()

// // router.get('/', async (ctx, next) => {
// //     await ctx.render('index', {
// //         title: 'Hello Koa 2!'
// //     })
// // })

// // router.get('/string', async (ctx, next) => {
// //     ctx.body = 'koa2 string'
// // })

// // router.get('/json', async (ctx, next) => {
// //     ctx.body = {
// //         title: 'koa2 json'
// //     }
// // })

// let urlList = require('../lib/parse')
// console.log(urlList)

// router.get('/test', async (ctx, next) => {
//     ctx.body = {
//         title: 'koa2 json'
//     }
// })

// module.exports = router
