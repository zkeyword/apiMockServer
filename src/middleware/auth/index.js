// 用户认证
exports.userAUTH = async function (ctx, next) {
    // 未做用户认证
    return next()
}

// 接口访问认证
exports.apiAUTH = async function (ctx, next) {
    // 未做接口认证
    return next()
}
