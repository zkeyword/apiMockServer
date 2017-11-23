
const drafter = require('drafter')
const normalizeNewline = require('normalize-newline')
const { mock } = require('mockjs')
const commentJson = require('comment-json')
const stringifyObject = require('stringify-object')
const { readDir, readFile, getFileFormat } = require('../../utils')

function handleRtr(str, isRevert = false) {
    if (isRevert) {
        /* 替换字符串符合mockjs语法 */
        str = str.replace(/❅/g, '-')
        str = str.replace(/✡/g, '|')
        str = str.replace(/☥/g, '(')
        str = str.replace(/♁/g, ')')
        str = str.replace(/\\"/g, '\'')
    } else {
        str = normalizeNewline(str) // 回车编码处理
        str = str.replace(/(@|Random\.)([a-z]+)\((.*)\)/g, function () {
            let fun = arguments[2]
            let val = arguments[3]
            val = val.replace(/\,/g, '_')
            return `@${fun}☥${val}♁`
        }) // 替换 Random. 为 @
        str = str.replace(/(\d)-(\d)/g, '$1❅$2') // 替换 1-10 中的 -
        str = str.replace(/(\w)\|(\d)/g, '$1✡$2') // 替换 string|1-10 中的 |
        str = str.replace(/\[SOCKET\s+(.*)\]/g, '[GET /SOCKET$1]') // 替换SOCKET标记为GET并做记号
    }
    return str
}

exports.getDrafterResult = dir => {
    return new Promise(async (resolve, reject) => {
        try {
            let list = await readDir(dir)
            let count = 0
            let arr = []
            list.forEach(async (fileName, index) => {
                if (getFileFormat(fileName) === 'md') {
                    let result = await readFile(`${dir}/${fileName}`)
                    result = handleRtr(result)
                    let item = drafter.parseSync(result, { type: 'ast' })
                    if (result) {
                        item.ast.fileName = fileName
                        arr[index] = item // 保证顺序
                    }
                }
                if (count === list.length - 1) resolve(arr.filter(x => x))
                count++
            })
        } catch (error) {
            resolve([])
        }
    })
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

/**
 * 替换 SOCKET 标记
 */
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

/**
 * 替换 url 中的大括号
 */
exports.replaceParentheses = (str, type) => {
    let tagReg = /(\{(.+?)\})/g
    if (type) {
        str = str.replace(tagReg, '<span>$1</span>')
    } else {
        str = str.replace(/(\{)\?/g, '/{$1')
        str = str.replace(tagReg, '$1')
    }
    return str
}

/**
 * 校验md解析结果
 */
exports.validateDrafterResult = result => {
    let item = drafter.validateSync(result, { type: 'ast' })
    console.log(item)
}

exports.jsonParse = (str, original) => {
    if (!str) return str
    str = str.replace(/\'/g, '"')
    str = handleRtr(str, true)
    if (original) {
        str = str.replace(/(\/\/.*)|(\/\*.*\*\/)/g, '') // 替换注释
    } else {
        str = commentJson.parse(str) // 转换含有注释的字符串成为对象
        str = mock(str)
        str = commentJson.stringify(str, null, 4) // 把对象还原
    }
    try {
        str = mock(JSON.parse(str))
    } catch (error) {
        return str
    }
    if (typeof str === 'string' || original) return str
    /* 把对象转成字符串并格式化 */
    str = stringifyObject(str, {
        indent: '    ',
        singleQuotes: false
    })
    return str
}
