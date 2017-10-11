module.exports = function () {
    console.log(1212)
    return function (ctx, next) {
        switch (ctx.status) {
            case 404:
                ctx.body = '没有找到内容 - 404'
                break
        }
        return next()
    }
}
