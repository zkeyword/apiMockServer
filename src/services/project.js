const { project, users } = require('../models')

exports.add = async req => {
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
    if (!req) {
        return await project.findAll({
            // attributes: ['name'], // 查找自定字段 https://segmentfault.com/a/1190000003987871#articleHeader12
            include: {
                model: users,
                where: {
                    ...req
                }
            }
        })
    } else {
        return await project.findOne({
            include: {
                model: users
            },
            where: {
                id: req.id
            }
        })
    }
}

exports.getProjectbyIdAndUserId = async (id, userId) => {
    return await project.findOne({
        where: {
            id,
            userId
        }
    })
}
