const urlParser = require('./url')
const { jsonParse, getDBDrafterResult } = require('./utils')
const interfaces = require('../../services/interfaces')

let router = require('koa-router')()

/* 根据接口名查接口内容 */
let getItemResult = async (name) => {
    let interfacesList = await interfaces.fetchByName(name)
    return getDBDrafterResult([interfacesList])
}

/* 路由 */
let handleRouer = ({ reqUrl, method, projectName, interfacesName }) => {
    return router[method.toLocaleLowerCase()](reqUrl, async (ctx, next) => {
        let type = ctx.request.headers['content-type']
        let isAjaxAccept = ctx.request.header['accept'] === '*/*'
        let result = await getItemResult(interfacesName)
        handleParse({ reqUrl, method, result, projectName }, (interfacesName, actions) => {
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
    })
}

/* 处理根据项目查询出来的结果，并匹配url */
let handleParse = ({ reqUrl, method, result, projectName }, callback) => {
    result.forEach(item => {
        item.resourceGroups.forEach(resourceGroup => {
            resourceGroup.resources.forEach(resource => {
                resource.actions.forEach(actions => {
                    let parsedUrl = urlParser.parse(actions.attributes.uriTemplate)
                    let url = `/project/${projectName}${parsedUrl.url}`
                    if (reqUrl === url && actions.method === method) {
                        callback(item.interfacesName, actions)
                    }
                })
            })
        })
    })
}

/* 根据项目名获取路由 */
let getParse = async (projectName, reqUrl, method) => {
    let interfacesList = await interfaces.list({ name: projectName })
    let result = getDBDrafterResult(interfacesList)
    return new Promise((resolve, reject) => {
        let tmp = null
        handleParse({ reqUrl, method, result, projectName }, (interfacesName, actions) => {
            tmp = {
                reqUrl,
                method,
                projectName,
                interfacesName
            }
        })
        resolve(tmp)
    })
}

module.exports = (app) => {
    return async (ctx, next) => {
        let urlArr = ctx.url.split('/')
        if (urlArr.length < 3 || urlArr[1] !== 'project') return await next()
        let parse = await getParse(urlArr[2], ctx.url, ctx.method)
        router.stack = []
        if (parse) {
            router = handleRouer(parse)
            app.use(router.routes(), router.allowedMethods())
        }
        await next()
    }
}
