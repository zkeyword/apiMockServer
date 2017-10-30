const router = require('koa-router')()
const { parseResult } = require('../services/markdown')
const upload = require('../middleware/upload')
const { unlink } = require('../utils')

router.get('/', async (ctx, next) => {
    let body = await parseResult(`${__dirname}/../../upload/`)
    await ctx.render('admin', {
        title: '接口管理',
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
    let isError = await unlink(`${__dirname}/../../upload/${ctx.params.filename}`)
    ctx.body = isError ? '删除失败' : '删除成功'
})

module.exports = router
