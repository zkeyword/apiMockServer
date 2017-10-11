module.exports = function () {
    console.log(11212121212)
    return function (ctx, next) {
        console.log(111, ctx.status)
        switch (ctx.status) {
            case 404:
                ctx.body = '没有找到内容 - 404'
                break
        }
        return next()
    }
}
