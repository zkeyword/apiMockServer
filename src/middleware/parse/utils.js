
const fs = require('fs')
const drafter = require('drafter')
const normalizeNewline = require('normalize-newline')
const { mock } = require('mockjs')
const nanoRender = require('nano-json')

exports.readDir = dir => {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, content) => {
            if (err) return reject(err)
            resolve(content)
        })
    })
}

exports.readFile = url => {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf-8', (err, content) => {
            if (err) return reject(err)
            resolve(content)
        })
    })
}

exports.getFileFormat = fileName => {
    let fileFormat = fileName.split('.')
    return fileFormat[fileFormat.length - 1]
}

exports.getDrafterResult = dir => {
    return new Promise(async (resolve, reject) => {
        let list = await this.readDir(dir)
        let count = 0
        let arr = []
        list.forEach(async (fileName, index) => {
            if (this.getFileFormat(fileName) === 'md') {
                let result = await this.readFile(`${dir}/${fileName}`)
                let item = drafter.parseSync(normalizeNewline(result), { type: 'ast' })
                if (result) {
                    item.ast.fileName = fileName
                    arr[index] = item // 保证顺序
                }
            }
            if (count === list.length - 1) resolve(arr.filter(x => x))
            count++
        })
    })
}

exports.jsonParse = str => {
    if (!str) return str
    str = str.replace(/\'/g, '"')
    str = str.replace(/Random\.(.*?)\)/g, '"@$1)"')
    try {
        str = mock(JSON.parse(str))
    } catch (error) {
        return str
    }
    return typeof str === 'string' ? str : nanoRender.render(str)
}
