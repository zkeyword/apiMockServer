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

    return Users
}
