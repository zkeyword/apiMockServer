const urlParser = require('./url')
const { jsonParse, getDrafterResult } = require('./utils')

module.exports = (router) => {
    return async (ctx, next) => {
        let result = await getDrafterResult(`${__dirname}/../../../upload/`)
        // let urlList = []
        let handleRouer = (actions, example, url) => {
            router[actions.method.toLocaleLowerCase()](url, async (ctx, next) => {
                example.responses.forEach(response => {
                    response.headers.forEach(header => {
                        let type = ctx.request.headers['content-type']
                        let body = response.body
                        let status = response.name | 0
                        console.log(ctx.request.header['content-type'])
                        if (type !== undefined && type === header.value) {
                            ctx.set(header.name, header.value)
                            ctx.status = status
                            ctx.body = jsonParse(body, true)
                        } else if (header.value === 'text/plain') {
                            ctx.status = status
                            ctx.body = jsonParse(body, true)
                        }
                    })
                })
            })
        }
        result.forEach(item => {
            // console.log(JSON.stringify(item))
            item.ast.resourceGroups.forEach(resourceGroup => {
                resourceGroup.resources.forEach(resource => {
                    let parsedUrl = urlParser.parse(resource.uriTemplate)
                    let url = parsedUrl.url
                    resource.actions.forEach(actions => {
                        actions.examples.forEach(example => {
                            handleRouer(actions, example, url)
                        })
                    })
                })
            })
        })
        await next()
    }
}
