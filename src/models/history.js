module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('history',
        {
            user: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '操作人'
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: '修改内容'
            }
        },
        {
            underscored: false,
            freezeTableName: true,
            autoIncrement: true,
            comment: '接口操作历史'
        }
    )

    History.associate = (models) => {
    }

    return History
}
