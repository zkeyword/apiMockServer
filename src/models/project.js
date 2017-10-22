module.exports = (sequelize, DataTypes) => {
    const UserInfo = sequelize.define('project',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
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
            freezeTableName: true
        })

    return UserInfo
}
