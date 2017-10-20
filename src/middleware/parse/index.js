const urlParser = require('./url')
const { jsonParse, getDrafterResult } = require('./utils')

module.exports = (router) => {
    return async (ctx, next) => {
        let result = await getDrafterResult(`${__dirname}/../../../upload/`)
        let urlList = []
        // TODO
        result.forEach(item => {
            item.ast.resourceGroups.forEach(resourceGroup => {
                resourceGroup.resources.forEach(resource => {
                    let parsedUrl = urlParser.parse(resource.uriTemplate)
                    resource.actions.forEach(action => {
                        action.url = parsedUrl.url
                        urlList.push(action)
                    })
                })
            })
        })
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
