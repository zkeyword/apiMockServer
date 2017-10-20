const router = require('koa-router')()
const upload = require('../middleware/upload')
const { getDrafterResult } = require('../middleware/parse/utils')
const fs = require('fs')

router.get('/', async (ctx, next) => {
    let result = await getDrafterResult(`${__dirname}/../../upload/`)
    let body = []
    result.forEach(item => {
        body.push(item.ast)
    })
    await ctx.render('admin', {
        title: '接口管理!',
        body
    })
})

router.post('/upload', upload.single('file'), async (ctx, next) => {
    let file = ctx.req.file
    let body = {}
    if (file) {
        body.filename = file.filename
        body.msg = '上传成功'
    } else {
        body.msg = '上传的格式不是md'
    }
    ctx.body = body
})

router.get('/delfile/:filename', async (ctx, next) => {
    let unlink = filePath => {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, err => {
                if (err) return reject(err)
                resolve()
            })
        })
    }
    let msg
    try {
        await unlink(`${__dirname}/../../upload/${ctx.params.filename}`)
        msg = '删除成功'
    } catch (error) {
        msg = '删除失败'
    }
    ctx.body = msg
})

module.exports = router
