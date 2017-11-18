const { interfaces, project } = require('../models')

exports.add = async req => {
    if (!(Object.keys(req).length && req.name && req.projectId)) return false
    let proj = await project.findById(req.projectId)
    if (!proj) return null
    let inte = await interfaces.findOrCreate({
        where: {
            name: req.name
        },
        defaults: req
    })
    if (inte[1]) await proj.addInterfaces(inte)
    return inte
}

exports.del = async (id, req) => {
    console.log(req.projectId)
    if (!(Object.keys(req).length && id && req.projectId)) return false
    return await interfaces.destroy({
        include: {
            model: project,
            where: {
                ...req
            }
        },
        where: {
            id,
            projectId: req.projectId
        }
    })
}

exports.modify = async (id, req) => {
    if (!(Object.keys(req).length && id && req.projectId)) return false
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
