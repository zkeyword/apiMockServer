
module.exports = (sequelize, DataTypes) => {
    const UsersProject = sequelize.define('usersProject',
        {
            pid: {
                type: DataTypes.BIGINT,
                allowNull: true,
                comment: '项目ID'
            },
            uid: {
                type: DataTypes.BIGINT,
                allowNull: true,
                comment: '用户ID'
            }
        },
        {
            freezeTableName: true,
            autoIncrement: true,
            timestamps: false,
            comment: '项目和用户的中间表'
        }
    )

    return UsersProject
}
