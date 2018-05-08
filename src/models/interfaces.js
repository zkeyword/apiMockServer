module.exports = (sequelize, DataTypes) => {
    const Interfaces = sequelize.define('interfaces',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '接口文档模块名'
            },
            request: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: 'request模板'
            },
            response: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: 'response模板'
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: '接口文档内容'
            },
            sort: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '接口排序'
            }
        },
        {
            underscored: false,
            freezeTableName: true,
            autoIncrement: true,
            comment: '接口表'
        }
    )

    Interfaces.associate = (models) => {
        Interfaces.belongsTo(models.project)
        Interfaces.hasMany(models.history)
    }

    return Interfaces
}
