const multer = require('koa-multer')
const { getFileFormat } = require('../../utils')

let storage = multer.diskStorage({
    // 文件保存路径  
    destination(req, file, cb) {
        cb(null, `${__dirname}/../../../upload/`)
    },
    // 修改文件名称  
    filename(req, file, cb) {
        // var fileFormat = (file.originalname).split('.')
        // cb(null, `${Date.now()}.${fileFormat[fileFormat.length - 1]}`)
        cb(null, file.originalname)
    }
})

module.exports = multer({
    dest: 'upload/',
    storage,
    fileFilter(req, file, cb) {
        if (getFileFormat(file.originalname) === 'md') return cb(null, true)
        return cb(null, false)
    }
})
