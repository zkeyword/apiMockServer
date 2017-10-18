const urlParser = require('./url')
let allRoutesList = []
let { getDrafterResult } = require('./utils')

module.exports = (async () => {
    let result = await getDrafterResult(`${__dirname}/../../../upload/`)

    result.forEach(item => {
        item.ast.resourceGroups.forEach(resourceGroup => {
            resourceGroup.resources.forEach(setupResourceAndUrl)
        })
    })

    function setupResourceAndUrl(resource) {
        var parsedUrl = urlParser.parse(resource.uriTemplate)
        resource.actions.forEach(function (action) {
            saveRouteToTheList(parsedUrl, action)
        })
    }
    function saveRouteToTheList(parsedUrl, action) {
        action.url = parsedUrl.url
        allRoutesList.push(action)
    }

    return allRoutesList
})()
