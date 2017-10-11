module.exports = function () {
    return function (ctx, next) {
        console.log(1111111111111, ctx.status)
        switch (ctx.status) {
            case 404:
                ctx.body = '没有找到内容 - 404'
                break
        }
        return next()
    }
}
