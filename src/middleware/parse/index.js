const urlParser = require('./url')
const { jsonParse, getDBDrafterResult } = require('./utils')
const interfaces = require('../../services/interfaces')

let router = require('koa-router')()

/* 根据接口名查接口内容 */
let getItemResult = async (id) => {
    let interfacesList = await interfaces.fetch(id)
    return getDBDrafterResult([interfacesList])
}

/* 路由 */
let handleRouer = ({ reqUrl, method, projectAlias, interfacesId }) => {
    console.log(1212121212, reqUrl)
    return router[method.toLocaleLowerCase()](reqUrl, async (ctx, next) => {
        let type = ctx.request.headers['content-type']
        let isAjaxAccept = ctx.request.header['accept'] === '*/*'
        let result = await getItemResult(interfacesId)
        handleParse({ reqUrl, method, result, projectAlias }, (interfacesId, actions) => {
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
let handleParse = ({ reqUrl, method, result, projectAlias }, callback) => {
    result.forEach(item => {
        item.resourceGroups.forEach(resourceGroup => {
            resourceGroup.resources.forEach(resource => {
                resource.actions.forEach(actions => {
                    let parsedUrl = urlParser.parse(actions.attributes.uriTemplate)
                    let url = `/project/${projectAlias}${parsedUrl.url}`
                    if (actions.method === method) {
                        // callback(item.interfacesId, actions)
                        if (reqUrl === url) {
                            callback(item.interfacesId, actions)
                        } else {
                            let parsedReqUrl = urlParser.parse(reqUrl)
                            url = url.replace(/\/:\w+/g, '/')
                            if (parsedReqUrl.url === url) {
                                callback(item.interfacesId, actions)
                            } else if ((new RegExp(url)).test(reqUrl)) { // 判断reqUrl是不是在uriTemplate解析的结果内
                                callback(item.interfacesId, actions)
                            }
                        }
                    }
                })
            })
        })
    })
}

/* 根据项目名获取路由 */
let getParse = async (projectAlias, reqUrl, method) => {
    let interfacesList = await interfaces.list({ alias: projectAlias })
    let result = getDBDrafterResult(interfacesList)
    return new Promise((resolve, reject) => {
        let tmp = null
        handleParse({ reqUrl, method, result, projectAlias }, (interfacesId, actions) => {
            tmp = {
                reqUrl,
                method,
                projectAlias,
                interfacesId
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
        console.log(parse)
        if (parse) {
            router = handleRouer(parse)
            app.use(router.routes(), router.allowedMethods())
        }
        await next()
    }
}
