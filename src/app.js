const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static')
const cors = require('koa2-cors')
const jwtKoa = require('koa-jwt')

const stylus = require('./middleware/stylus')
const routes = require('./routes')
const error = require('./routes/error')
const parse = require('./middleware/parse')
const { apiAUTH } = require('./middleware/auth')
const jwtConfig = require('../config/jwt')

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(stylus(`${__dirname}/../public`))
app.use(koaStatic(`${__dirname}/../public`))
app.use(views(`${__dirname}/views`, {
    extension: 'ejs'
}))
app.use(cors({
    credentials: true
}))
app.use(jwtKoa({ secret: jwtConfig.secret }).unless({
    path: [/^\/$/, /favicon.ico/, /\/v0.1\/api\/auth\//, /^\/project/]
    // path: [/^\/$/, /^\/project/]
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const end = new Date()
    const ms = end - start
    console.log(`${ctx.ip} - ${end.toLocaleString()}: ${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(apiAUTH)
app.use(parse(routes))
app.use(routes.routes(), routes.allowedMethods())
app.use(error())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
