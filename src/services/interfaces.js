const { interfaces } = require('../models')

exports.add = async req => {
    if (!Object.keys(req).length || !req.name) return
    return await interfaces.findOrCreate({
        where: {
            name: req.name
        },
        defaults: req
    })
}

exports.del = async id => {
    if (!id) return false
    return await interfaces.destroy({
        where: {
            id
        }
    })
}

exports.modify = async (id, req) => {
    if (!(Object.keys(req).length && id)) return false
    return await interfaces.update(req, {
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
    return await interfaces.findAll(obj)
}

exports.alias = async id => {
    if (!id) return {}
    return await interfaces.findById(id)
}
