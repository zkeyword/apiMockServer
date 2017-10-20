
const drafter = require('drafter')
const normalizeNewline = require('normalize-newline')
const { mock } = require('mockjs')
const nanoRender = require('nano-json')
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
    try {
        str = mock(JSON.parse(str))
    } catch (error) {
        return str
    }
    return typeof str === 'string' || original ? str : nanoRender.render(str)
}
