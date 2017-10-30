module.exports = (sequelize, DataTypes) => {
    const interfaces = sequelize.define('interfaces',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '接口文档模块名'
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '接口文档内容'
            }
        },
        {
            freezeTableName: true,
            autoIncrement: true,
            comment: '接口表'
        }
    )

    // interfaces.associate = (models) => {
    //     interfaces.belongsTo(models.Project)
    // }

    return interfaces
}
