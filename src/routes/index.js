const router = require('koa-router')()
let tools = require('../middleware/parse/utils')

router.get('/', async (ctx, next) => {
    let result = await tools.getDrafterResult(`${__dirname}/../../upload/`)
    let arr = []
    result.forEach(item => {
        arr.push(item.ast)
        // console.log(1, item.ast.resourceGroups[0].resources[0], 1212)
    })

    await ctx.render('index', {
        title: 'Hello Koa 2!',
        body: arr
    })
})

module.exports = router
