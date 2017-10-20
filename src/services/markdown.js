const { getDrafterResult, jsonParse } = require('../middleware/parse/utils')

exports.parseResult = async () => {
    let result = await getDrafterResult(`${__dirname}/../../upload/`)
    let body = []
    result.forEach(item => {
        body.push(item.ast)
        // console.log(item.ast.resourceGroups[0].resources[0].actions[0].examples[0].responses[0].body)
        // console.log(item.ast)
    })
    return body
}

exports.jsonParse = (() => {
    return jsonParse
})()
