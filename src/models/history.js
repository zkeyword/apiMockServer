module.exports = (sequelize, DataTypes) => {
    const Historys = sequelize.define('history',
        {
            userId: {
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

    Historys.associate = (models) => {
        Historys.belongsTo(models.interfaces)
    }

    return Historys
}
