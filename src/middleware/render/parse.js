const drafter = require('drafter')
const normalizeNewline = require('normalize-newline')
const fs = require('fs')

module.exports = (async () => {
    let dir = `${__dirname}/../../../upload/`
    let fileNameList = await new Promise((resolve, reject) => {
        fs.readdir(dir, (err, content) => {
            if (err) {
                return reject(err)
            }
            resolve(content)
        })
    })
    let result = await (async () => {
        let arr = []
        await new Promise((resolve, reject) => {
            fileNameList.forEach(async (fileName, index) => {
                let result = await new Promise((resolve, reject) => {
                    fs.readFile(`${dir}/${fileName}`, 'utf-8', (err, content) => {
                        if (err) {
                            return reject(err)
                        }
                        resolve(content)
                    })
                })
                let str = await drafter.parse(normalizeNewline(result), { type: 'ast' }, (err, result) => {
                    if (err) return err
                    return result
                })
                arr.push(str)
                if (index + 1 === fileNameList.length) resolve(arr)
            })
        })
        return arr
    })()

    result.forEach(item => {
        console.log(item.ast.resourceGroups)
    })
})()
