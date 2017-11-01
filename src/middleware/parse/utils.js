
const drafter = require('drafter')
const normalizeNewline = require('normalize-newline')
const { mock } = require('mockjs')
const nanoRender = require('nano-json')
const commentJson = require('comment-json')
const { readDir, readFile, getFileFormat } = require('../../utils')

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

exports.jsonParse = (str, original) => {
    if (!str) return str
    str = str.replace(/\'/g, '"')
    str = handleRtr(str, true)
    if (original) {
        str = str.replace(/(\/\/.*)|(\/\*.*\*\/)/g, '')
    } else {
        str = commentJson.parse(str)
        str = mock(str)
        str = commentJson.stringify(str, null, 4)
    }
    try {
        str = mock(JSON.parse(str))
    } catch (error) {
        return str
    }
    if (typeof str === 'string' || original) return str
    str = nanoRender.render(str)
    return str
}
