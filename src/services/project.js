const { project, users } = require('../models')

exports.add = async req => {
    console.log(Object.keys(req).length, req.name, req.userId)
    if (!(Object.keys(req).length && req.name && req.userId)) return false
    let user = await users.findById(req.userId)
    if (!user) return null
    let proj = await project.findOrCreate({
        where: {
            name: req.name
        },
        defaults: req
    })
    if (proj[1]) await user.addProject(proj)
    return proj
}

exports.del = async (id, req) => {
    if (!(Object.keys(req).length && id && req.userId)) return false
    return await project.destroy({
        where: {
            id
        }
    })
}

exports.modify = async (id, req) => {
    if (!(Object.keys(req).length && id && req.userId)) return false
    return await project.update(req, {
        where: {
            id
        }
    })
}

exports.list = async req => {
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
