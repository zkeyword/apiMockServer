const { interfaces, project } = require('../models')

exports.add = async req => {
    if (!(Object.keys(req).length && req.name && req.projectId)) return false
    let proj = await project.findById(req.projectId)
    if (!proj) return null
    let inte = await interfaces.findOrCreate({
        where: {
            name: req.name,
            projectId: req.projectId
        },
        defaults: req
    })
    if (inte.id && inte[1]) await proj.addInterfaces(inte)
    return inte
}

exports.del = async (id, req) => {
    if (!id) return false
    return await interfaces.destroy({
        where: {
            id
        }
    })
}

exports.modify = async (id, req) => {
    if (!id) return false
    return await interfaces.update(req, {
        where: {
            id
        }
    })
}

exports.list = async req => {
    if (!req) {
        return await interfaces.findAll({
            include: {
                attributes: ['alias'],
                model: project
            }
        })
    }
    return await interfaces.findAll({
        include: {
            attributes: ['alias'],
            model: project
        },
        where: {
            projectId: req.id
        }
    })
}

exports.fetch = async (id) => {
    if (!id) return false
    return await interfaces.findOne({
        include: {
            attributes: ['alias'],
            model: project
        },
        where: {
            id
        }
    })
}

exports.fetchByName = async (name) => {
    if (!name) return false
    return await interfaces.findOne({
        where: {
            name
        }
    })
}
