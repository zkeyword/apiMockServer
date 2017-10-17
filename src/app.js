const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// const convert = require('koa-convert')
const Mock = require('mockjs')

const routes = require('./routes')
const error = require('./routes/error')
const parse = require('./middleware/parse')
// const render = require('./middleware/render')

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(`${__dirname}/public`))
app.use(async (ctx, next) => {
    console.log(1111111, ctx)
    ctx.state = {
        Mock,
        JSON
    }
    await next()
})

app.use(views(`${__dirname}/views`, {
    extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(render(routes))
app.use(parse(routes))
app.use(routes.routes(), routes.allowedMethods())
// routes(app)
app.use(error())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
