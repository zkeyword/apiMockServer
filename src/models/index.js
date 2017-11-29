const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../../config/mysql')

let sequelize = new Sequelize(config.database, config.username, config.password, config)
let db = {}

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db)
    }
})

sequelize.sync()
// sequelize.sync({ force: true }) // 直接删表重建
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
