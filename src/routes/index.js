const router = require('koa-router')()
let tools = require('../middleware/parse/utils')

router.get('/', async (ctx, next) => {
    let result = await tools.getDrafterResult(`${__dirname}/../../upload/`)
    let arr = []
    result.forEach(item => {
        arr.push(item.ast)
        // console.log(item.ast.resourceGroups[0].resources[0].actions[0].examples[0].responses[0].body)
    })

    await ctx.render('index', {
        title: 'Hello Koa 2!',
        body: arr,
        test: `{
            "array|1-10": [
                {
                    "name|+1": [
                        "Hello",
                        "Mock.js",
                        "!"
                    ]
                }
            ]
        }`
    })
})

module.exports = router
