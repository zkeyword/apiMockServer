
const drafter = require('drafter')
const normalizeNewline = require('normalize-newline')
const { mock } = require('mockjs')
const commentJson = require('comment-json')
const stringifyObject = require('stringify-object')
const urlParser = require('./url')

function handleRtr(str, isRevert = false) {
    if (isRevert) {
        str = str.replace(/❅/g, '-')
        str = str.replace(/✡/g, '|')
        str = str.replace(/☥/g, '(')
        str = str.replace(/♁/g, ')')
        str = str.replace(/\\"/g, '\'')
    } else {
        str = normalizeNewline(str)
        str = str.replace(/(@|Random\.)([a-z]+)\((.*)\)/g, function () {
            let fun = arguments[2]
            let val = arguments[3]
            val = val.replace(/\,/g, '_')
            return `@${fun}☥${val}♁`
        }) // 替换 Random. 为 @
        str = str.replace(/(\d)-(\d)/g, '$1❅$2') // 替换 1-10 中的 -
        str = str.replace(/(\w)\|(\d)/g, '$1✡$2') // 替换 string|1-10 中的 |
        str = str.replace(/\[SOCKET\s+(.*)\]/g, '[GET /SOCKET$1]')
    }
    return str
}

exports.getDBDrafterResult = list => {
    let arr = []
    list.forEach(async (itm, index) => {
        let result = itm.content
        result = handleRtr(result)
        // let a = drafter.validateSync(result, { type: 'ast' })
        // console.log(a)
        let item = drafter.parseSync(result, { type: 'ast' })
        if (result) {
            let ast = item.ast
            ast.alias = itm.project.alias
            ast.interfacesName = itm.name
            ast.createdAt = itm.createdAt
            ast.updatedAt = itm.updatedAt
            arr[index] = ast
        }
    })
    return arr.filter(x => x)
}

exports.revertString = (str, type) => {
    let socketReg = /^\/SOCKET/g
    let tagReg = /(\{(.+?)\})/g
    if (socketReg.test(str)) {
        if (!type) return false
        str = str.replace(socketReg, '')
    }
    str = str.replace(tagReg, '<span>$1</span>')
    return str
}

exports.replaceParentheses = (str, type) => {
    let tagReg = /(\{(.+?)\})/g
    if (type) {
        str = str.replace(tagReg, '<span>$1</span>')
    } else {
        str = urlParser.parse(str)
        return str.url
        // str = str.replace(/(\{)\?/g, '/{$1')
        // str = str.replace(tagReg, '$1')
    }
    return str
}

exports.validateDrafterResult = result => {
    let item = drafter.validateSync(result, { type: 'ast' })
    console.log(item)
}

exports.jsonParse = (str, original) => {
    if (!str) return str
    str = str.replace(/\'/g, '"')
    str = handleRtr(str, true)
    if (original) {
        str = str.replace(/(\/\/.*)|(\/\*.*\*\/)/g, '')
    } else {
        try {
            str = commentJson.parse(str)
            str = mock(str)
            str = commentJson.stringify(str, null, 4)
        } catch (error) {
            return str
        }
    }
    try {
        str = mock(JSON.parse(str))
    } catch (error) {
        return str
    }
    if (typeof str === 'string' || original) return str
    // str = nanoRender.render(str)
    str = stringifyObject(str, {
        indent: '    ',
        singleQuotes: false
    })
    return str
}
