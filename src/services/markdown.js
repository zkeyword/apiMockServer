const { getDrafterResult, jsonParse } = require('../middleware/parse/utils')

exports.parseResult = async path => {
    let result = await getDrafterResult(path)
    let body = []
    result.forEach(item => {
        body.push(item.ast)
    })
    return body
}

exports.jsonParse = (() => {
    return jsonParse
})()
