const Sequelize = require('sequelize')
const sequelize = require('./../utils/sequelize')
const commonAttr = [
    'id',
    'name',
    'info',
    'status',
    [sequelize.col('user_id'), 'userId'],
    [sequelize.col('create_time'), 'createTime'],
    [sequelize.col('update_time'), 'updateTime']
]

const ArticleCategory = sequelize.define('article_category',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        info: {
            type: Sequelize.STRING,
            unique: true
        },
        status: {
            type: Sequelize.INTEGER
        },
        create_time: {
            type: Sequelize.STRING
        },
        update_time: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'article_category',
        timestamps: false
    })

export default {

    create(model) {
        return new Promise((resolve, reject) => {
            ArticleCategory
                .create({
                    name: model.name,
                    info: model.info || '{}',
                    status: 1,
                    create_time: model.createTime,
                    update_time: model.createTime
                })
                .then(() => {
                    ArticleCategory
                        .findOne({
                            where: { name: model.name }
                        }).then(resolve, reject)
                })
        })
    },

    getExistOne(name) {
        return new Promise((resolve, reject) => {
            ArticleCategory
                .findOne({
                    where: { name: name }
                }).then(resolve, reject)
        })
    },

    getListByPage(options) {
        options = options || {}

        let pageCurrent = options.pageCurrent * 1 || 1
        let pageSize = options.pageSize * 1 || 10

        return new Promise((resolve, reject) => {
            ArticleCategory.findAndCountAll({
                offset: (pageCurrent - 1) * pageSize,
                limit: pageSize,
                attributes: commonAttr
            }).then(resolve, (err) => {
                reject(err)
            })
        })
    }

}
