const urlParser = require('./url')
const { jsonParse, getDBDrafterResult } = require('./utils')
const interfaces = require('../../services/interfaces')

module.exports = (router) => {
    return async (ctx, next) => {
        if (!/^\/project/.test(ctx.url)) return await next()
        let interfacesList = await interfaces.list()
        let result = getDBDrafterResult(interfacesList)
        let handleRouer = (actions, url, projectName) => {
            router[actions.method.toLocaleLowerCase()](`/project/${projectName}${url}`, async (ctx, next) => {
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
            item.resourceGroups.forEach(resourceGroup => {
                resourceGroup.resources.forEach(resource => {
                    // console.log(resourceGroup.resources)
                    resource.actions.forEach(actions => {
                        let parsedUrl = urlParser.parse(actions.attributes.uriTemplate)
                        let url = parsedUrl.url
                        console.log(url)
                        handleRouer(actions, url, item.alias)
                    })
                })
            })
        })

        await next()
    }
}
