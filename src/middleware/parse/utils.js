
const drafter = require('drafter')
const normalizeNewline = require('normalize-newline')
const { mock } = require('mockjs')
const nanoRender = require('nano-json')
const commentJson = require('comment-json')
const { readDir, readFile, getFileFormat } = require('../../utils')

exports.getDrafterResult = dir => {
    return new Promise(async (resolve, reject) => {
        try {
            let list = await readDir(dir)
            let count = 0
            let arr = []
            list.forEach(async (fileName, index) => {
                if (getFileFormat(fileName) === 'md') {
                    let result = await readFile(`${dir}/${fileName}`)
                    let item = drafter.parseSync(normalizeNewline(result), { type: 'ast' })
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
    str = str.replace(/Random\.(.*?)\)/g, '"@$1)"')
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
