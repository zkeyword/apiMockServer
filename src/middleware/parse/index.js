const urlParser = require('./url')
const { jsonParse, getDBDrafterResult } = require('./utils')
const interfaces = require('../../services/interfaces')

let getItemResult = async (name) => {
    let interfacesList = await interfaces.fetchByName(name)
    // getDBDrafterResult(interfacesList) // TODO 等待解析
    return interfacesList
}

let handleRouer = (actions, url, projectName, router, interfacesName) => {
    router[actions.method.toLocaleLowerCase()](`/project/${projectName}${url}`, async (ctx, next) => {
        let type = ctx.request.headers['content-type']
        let isAjaxAccept = ctx.request.header['accept'] === '*/*'
        let itemResult = await getItemResult(interfacesName)
        console.log(itemResult) // 防止单个接口数据修改后，数据不是最新的，重新从数据库获取新的数据  -- 衍生问题：所有数据都更新后如何刷新路由
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

let getRouter = async router => {
    let interfacesList = await interfaces.list()
    let result = getDBDrafterResult(interfacesList)
    result.forEach(item => {
        item.resourceGroups.forEach(resourceGroup => {
            resourceGroup.resources.forEach(resource => {
                // console.log(resourceGroup.resources)
                resource.actions.forEach(actions => {
                    let parsedUrl = urlParser.parse(actions.attributes.uriTemplate)
                    let url = parsedUrl.url
                    handleRouer(actions, url, item.alias, router, item.interfacesName)
                })
            })
        })
    })
}

module.exports = (router) => {
    return async (ctx, next) => {
        if (!/^\/project/.test(ctx.url)) return await next()
        await getRouter(router)
        await next()
    }
}
