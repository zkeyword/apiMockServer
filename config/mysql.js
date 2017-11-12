module.exports = {
    database: 'apiMockServer',
    username: 'root',
    password: '123456',
    port: '3306',
    host: 'localhost',
    dialect: 'mysql',
    'dialectOptions': {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    'define': {
        'underscored': true,
        'charset': 'utf8mb4'
    }
}
