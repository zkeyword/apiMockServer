const { interfaces, history } = require('../models')

exports.add = async (interfaceId, req) => {
    if (!interfaceId && req.userId && req.content) return false
    let interfacesItem = await interfaces.findById(interfaceId)
    if (!interfacesItem) return null
    let historyList = await exports.list(interfaceId)
    let len = historyList.length
    if (len > 8) {
        // historyList.reverse()
        let delArr = []
        for (let i = 0; i < len; i++) {
            if (i > 8) {
                delArr.push(historyList[i].id)
            }
        }
        await history.destroy({
            where: {'id': delArr}
        })
    }
    let inte = await history.findOrCreate({
        where: {
            userId: req.userId,
            content: req.content,
            interfaceId
        },
        defaults: req
    })
    if (inte.id && inte[1]) await interfacesItem.addHistory(inte)
    return inte
}

exports.list = async interfaceId => {
    let historyList = await history.findAll({
        where: {
            interfaceId
        },
        order: [
            ['id', 'DESC']
        ]
    })
    return historyList
}

exports.detail = async (interfaceId, id) => {
    let historyItemDetail = await history.findOne({
        where: {
            interfaceId,
            id
        }
    })
    return historyItemDetail
}
