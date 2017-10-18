const multer = require('koa-multer')

let storage = multer.diskStorage({
    // 文件保存路径  
    destination(req, file, cb) {
        cb(null, `${__dirname}/../../../upload/`)
    },
    // 修改文件名称  
    filename(req, file, cb) {
        var fileFormat = (file.originalname).split('.')
        cb(null, `${Date.now()}.${fileFormat[fileFormat.length - 1]}`)
    }
})

module.exports = multer({ dest: 'upload/', storage })
