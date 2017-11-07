const fs = require('fs')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt')

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

exports.password = (str1, str2) => {
    return md5(`${str1.substring(0, 2)}${md5(str2)}${str1.substring((str1.length - 2))}123`) // md5(用户名前2位+md5(密码)+用户名后两位+123)
}

exports.signToke = user => {
    console.log(1212, jwt.refresh)
    return jwt.sign(
        {
            ...user
        },
        jwtConfig.secret,
        {
            expiresIn: jwtConfig.expiresIn
        }
    )
}

exports.checkToken = async token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtConfig.secret, (err, decoded) => {
            if (err) reject(err)
            resolve(decoded)
        })
    })
}
