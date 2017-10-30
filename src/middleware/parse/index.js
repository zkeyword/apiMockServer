const urlParser = require('./url')
const { jsonParse, getDrafterResult } = require('./utils')

module.exports = (router) => {
    return async (ctx, next) => {
        let result = await getDrafterResult(`${__dirname}/../../../upload/`)
        let handleRouer = (actions, url) => {
            // console.log(url, actions.method.toLocaleLowerCase())
            router[actions.method.toLocaleLowerCase()](url, async (ctx, next) => {
                let type = ctx.request.headers['content-type']
                let isAjaxAccept = ctx.request.header['accept'] === '*/*'
                actions.examples.forEach(example => {
                    example.responses.forEach(response => {
                        if (response.headers.length) {
                            // TODO
                            response.headers.forEach(header => {
                                header.body = response.body
                                header.status = response.name | 0
                                if (header.value === 'text/plain' && !isAjaxAccept) {
                                    ctx.set(header.name, header.value)
                                    ctx.status = header.status
                                    ctx.body = jsonParse(header.body, true)
                                }
                                if (header.value === 'application/json' && !isAjaxAccept) {
                                    ctx.set(header.name, header.value)
                                    ctx.status = header.status
                                    ctx.body = jsonParse(header.body, true)
                                }
                                if (header.value === 'application/json' && isAjaxAccept) {
                                    ctx.set(header.name, header.value)
                                    ctx.status = header.status
                                    ctx.body = jsonParse(header.body, true)
                                }
                                if (header.value === type) {
                                    ctx.set(header.name, header.value)
                                    ctx.status = header.status
                                    ctx.body = jsonParse(header.body, true)
                                }
                            })
                        } else {
                            ctx.status = response.name | 0
                            ctx.body = jsonParse(response.body, true)
                        }
                    })
                })
            })
        }

        result.forEach(item => {
            item.ast.resourceGroups.forEach(resourceGroup => {
                resourceGroup.resources.forEach(resource => {
                    let parsedUrl = urlParser.parse(resource.uriTemplate)
                    let url = parsedUrl.url
                    resource.actions.forEach(actions => {
                        handleRouer(actions, url)
                    })
                })
            })
        })

        await next()
    }
}
