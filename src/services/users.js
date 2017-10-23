const { users } = require('../models')

exports.getUserByName = async (name) => {
    if (!name) return []
    let userInfo = await users.findAll({
        where: {
            name: name
        }
    })
    return userInfo
}
