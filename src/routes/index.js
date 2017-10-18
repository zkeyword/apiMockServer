const router = require('koa-router')()
let { getDrafterResult, jsonParse } = require('../middleware/parse/utils')

router.get('/', async (ctx, next) => {
    let result = await getDrafterResult(`${__dirname}/../../upload/`)
    let arr = []
    result.forEach(item => {
        arr.push(item.ast)
        // console.log(item.ast.resourceGroups[0].resources[0].actions[0].examples[0].responses[0].body)
        // console.log(item.ast.resourceGroups)
    })
    await ctx.render('index', {
        title: 'Hello Koa 2!',
        body: arr,
        jsonParse
    })
})

module.exports = router
