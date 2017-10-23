module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            alias: {
                type: DataTypes.STRING,
                allowNull: true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            freezeTableName: true,
            autoIncrement: true
        }
    )

    return Project
}
