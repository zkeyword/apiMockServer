const parse = require('./parse')
const Mock = require('mockjs')

module.exports = (router) => {
    return async (ctx, next) => {
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
    }
}
