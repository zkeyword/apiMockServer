module.exports = (sequelize, DataTypes) => {
    const interfaces = sequelize.define('interfaces',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '接口文档模块名'
            },
            requst: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: 'requst模板'
            },
            response: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: 'response模板'
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: '接口文档内容'
            }
        },
        {
            underscored: false,
            freezeTableName: true,
            autoIncrement: true,
            comment: '接口表'
        }
    )

    interfaces.associate = (models) => {
        interfaces.belongsTo(models.project)
    }

    return interfaces
}
