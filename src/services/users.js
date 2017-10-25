const { users } = require('../models')

exports.add = async req => {
    console.log(req)
    if (!Object.keys(req).length || !req.username) return
    return await users.findOrCreate({
        where: {
            username: req.username
        },
        defaults: req
    })
}

exports.del = async id => {
    if (!id) return false
    return await users.destroy({
        where: {
            id
        }
    })
}

exports.modify = async (id, req) => {
    if (!(Object.keys(req).length && id)) return false
    return await users.update(req, {
        where: {
            id
        }
    })
}

exports.list = async req => {
    let obj = {}
    if (req) {
        obj = {
            where: {
                ...req
            }
        }
    }
    return await users.findAll(obj)
}

exports.getUserByIdOrName = async obj => {
    if (!Object.keys(obj).length) return []
    return await users.findAll({
        where: {
            ...obj
        }
    })
}
