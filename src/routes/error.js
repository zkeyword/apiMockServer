module.exports = () => {
    return (ctx, next) => {
        switch (ctx.status) {
            case 404:
                ctx.status = 404
                ctx.body = '没有找到内容 - 404'
                break
            // case 500: // 500进不来
            //     ctx.status = 500
            //     ctx.body = '服务器出错 - 500'
            //     break
        }
        return next()
    }
}
