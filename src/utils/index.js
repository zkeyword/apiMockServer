const fs = require('fs')

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

exports.unlink = filePath => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, err => {
            if (err) return resolve(err)
            resolve()
        })
    })
}
