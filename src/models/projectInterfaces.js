module.exports = (sequelize, DataTypes) => {
    const ProjectInterfaces = sequelize.define('projectInterfaces',
        {
            pid: {
                type: DataTypes.BIGINT,
                allowNull: true,
                comment: '项目ID'
            },
            iid: {
                type: DataTypes.BIGINT,
                allowNull: true,
                comment: '接口ID'
            }
        },
        {
            freezeTableName: true,
            autoIncrement: true,
            timestamps: false,
            comment: '项目和接口的中间表'
        }
    )

    return ProjectInterfaces
}
