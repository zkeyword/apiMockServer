module.exports = function () {
    return function (ctx, next) {
        switch (ctx.status) {
            case 404:
                ctx.body = '没有找到内容 - 404'
                break
            case 500:
                ctx.body = ' - 500'
                break
        }
        return next()
    }
}
