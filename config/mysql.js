// module.exports = {
//     database: 'apiMockServer',
//     username: 'root',
//     password: '',
//     port: '3306',
//     host: 'localhost'
// }
const Sequelize = require('sequelize')

module.exports = new Sequelize(
    'apiMockServer', // 数据库名
    'root', // 用户名
    '', // 用户密码
    {
        'dialect': 'mysql', // 数据库使用mysql
        'host': 'localhost', // 数据库服务器ip
        'port': 3306 // 数据库服务器端口
    }
)
