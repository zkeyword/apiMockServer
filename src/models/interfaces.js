module.exports = (sequelize, DataTypes) => {
    const interfaces = sequelize.define('interfaces',
        {
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            autoIncrement: true
        }
    )

    return interfaces
}
