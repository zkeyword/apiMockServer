const { project } = require('../models')

exports.add = async req => {
    if (req && req.id) {
        return await project.findOrCreate(req)
    }
}

exports.del = async id => {
    if (!id) return false
    project.destroy({
        where: {
            id
        }
    })
}

exports.modify = async req => {
    if (!(req && req.id)) return false
    return await project.update(req, {
        where: {
            id: req.id
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
    return await project.findAll(obj)
}

exports.alias = async id => {
    if (!id) return {}
    return await project.findById(id)
}
