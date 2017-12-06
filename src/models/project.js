module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '项目名称'
            },
            alias: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: '别名'
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '状态'
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: '描述'
            }
        },
        {
            underscored: false,
            freezeTableName: true,
            autoIncrement: true,
            comment: '项目表'
        }
    )

    Project.associate = (models) => {
        Project.belongsTo(models.users)
        Project.hasMany(models.interfaces)
    }

    return Project
}
