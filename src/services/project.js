const { project, usersProject, users } = require('../models')

exports.add = async req => {
    if (!Object.keys(req).length || !req.name) return
    return await project.findOrCreate({
        where: {
            name: req.name
        },
        defaults: req
    })
}

exports.del = async id => {
    if (!id) return false
    return await project.destroy({
        where: {
            id
        }
    })
}

exports.modify = async (id, req) => {
    if (!(Object.keys(req).length && id)) return false
    return await project.update(req, {
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
    return await project.findAll(obj, {
        include: [{
            model: users,
            attributes: ['id']
        }]
    })
}

exports.alias = async id => {
    if (!id) return {}
    return await project.findById(id)
}
