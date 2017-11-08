const md5 = require('md5')
const { password } = require('../utils')

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users',
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '用户名'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '密码'
            },
            nick: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: '昵称'
            },
            role: {
                type: DataTypes.INTEGER,
                defaultValue: 0, // 0普通用户，1管理员
                comment: '角色'
            }
        },
        {
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
            comment: '用户名'
            // tableName: 'user', // 表名
            // timestamps: false // 是否自动添加时间戳createAt，updateAt
        }
    )

    Users.associate = (models) => {
        Users.hasMany(models.project)
    }

    Users.findOrCreate({
        where: {
            username: 'admin'
        },
        defaults: {
            username: 'admin',
            password: md5(password('admin', '123456')),
            nick: '管理员',
            role: 1
        }
    })

    return Users
}
