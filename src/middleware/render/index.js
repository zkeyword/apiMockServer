const { mock } = require('mockjs')
const nanoRender = require('nano-json')

module.exports = () => {
    return async (ctx, next) => {
        ctx.state = {
            jsonParse: str => {
                if (!str) return
                str = str.replace(/\'/g, '"')
                str = str.replace(/Random\.(.*?)\)/g, '"@$1)"')
                try {
                    str = JSON.parse(str)
                } catch (error) {

                }
                return nanoRender.render(mock(str))
            }
        }
        await next()
    }
}
