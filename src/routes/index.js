const router = require('koa-router')()

const home = require('./home')
const admin = require('./admin')
const api = require('./api')

router.use('/', home.routes(), home.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())

module.exports = router
