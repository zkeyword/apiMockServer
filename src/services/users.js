const { user_info } = require('../models')

exports.getUserByName = async (name) => {
    if (!name) return []
    let userInfo = await user_info.findAll({
        where: {
            name: name
        }
    })
    return userInfo
}
