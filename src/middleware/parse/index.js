const parse = require('./parse')
const { jsonParse } = require('./utils')

module.exports = (router) => {
    return async (ctx, next) => {
        let urlList = await parse
        urlList.forEach(re => {
            re.examples.forEach(exp => {
                router[re.method.toLocaleLowerCase()](re.url, async (ctx, next) => {
                    exp.responses[0].headers.forEach(header => {
                        ctx.set(header.name, header.value)
                    })
                    ctx.body = jsonParse(exp.responses[0].body, true)
                })
            })
        })
        await next()
    }
}
