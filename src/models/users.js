module.exports = (sequelize, DataTypes) => {
    const UserInfo = sequelize.define('user_info',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            uid: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            nick: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
            // tableName: 'user', // 表名
            timestamps: false // 是否自动添加时间戳createAt，updateAt
        })

    return UserInfo
}
