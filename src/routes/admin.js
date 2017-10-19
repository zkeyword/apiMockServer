const router = require('koa-router')()
const upload = require('../middleware/upload')

router.get('/', async (ctx, next) => {
    await ctx.render('admin', {
        title: '接口管理'
    })
})

router.post('/upload', upload.single('file'), async (ctx, next) => {
    ctx.body = {
        filename: ctx.req.file.filename
    }
})

module.exports = router
