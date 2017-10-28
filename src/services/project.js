const { project, users } = require('../models')

exports.add = async req => {
    if (!Object.keys(req).length || !req.name || !req.userId) return
    let user = await users.findById(req.userId)
    let proj = await project.findOrCreate({
        where: {
            name: req.name
        },
        defaults: req
    })
    return await user.addProject(proj)
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
            },
            include: {
                model: users,
                required: true
            }
        }
    }
    return await project.findAll({
        include: {
            model: users,
            where: {
                ...req
            }
            // ,required: true // 加个required: true,即可
        }
    })
}

exports.alias = async id => {
    if (!id) return {}
    return await project.findById(id)
}
