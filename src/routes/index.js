const router = require('koa-router')()

const home = require('./home')
const upload = require('./upload')
const auth = require('./auth')
const interfaces = require('./interfaces')
const project = require('./project')
const users = require('./users')
const history = require('./history')

router.use('/', home.routes(), home.allowedMethods())
router.use('/upload', upload.routes(), upload.allowedMethods())
router.use('/v0.1/api/auth', auth.routes(), auth.allowedMethods())
router.use('/v0.1/api/interfaces', interfaces.routes(), interfaces.allowedMethods())
router.use('/v0.1/api/project', project.routes(), project.allowedMethods())
router.use('/v0.1/api/users', users.routes(), users.allowedMethods())
router.use('/v0.1/api/history', history.routes(), history.allowedMethods())

module.exports = router
