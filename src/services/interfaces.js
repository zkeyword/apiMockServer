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
    if (!(Object.keys(req).length && id && req.projectId)) return false
    return await interfaces.destroy({
        where: {
            id
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
    return await interfaces.findAll({
        include: {
            model: project,
            where: {
                ...req
            }
        }
    })
}

exports.alias = async id => {
    if (!id) return {}
    return await interfaces.findById(id)
}
