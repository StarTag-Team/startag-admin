const jwt = require('jsonwebtoken')
const mapObj = require('map-obj')
const ObjectID = require('mongodb').ObjectID

class DataProvider {
    static async sendAllowedResources(user, resources, token) {
        const decoded = jwt.decode(token)
        if (!!decoded) {
            const result = await user.findOne({email: decoded.email})
            if (!!result) {
                const roots = await resources('roles').findOne({_id: ObjectID(result.role)})
                if (!roots)
                    return {
                        success: false,
                        msg: 'Не найдена роль пользователя'
                    }
                let allowedResources = []
                let i = 0
                mapObj(roots.resources, (key, value) => {
                    if (value.showInMenu) {
                        allowedResources[i] = {
                            resource: key,
                            permissions: value.permissions
                        }
                        i = i + 1
                    }
                    return [key, value]
                })
                return {
                    success: true,
                    list: allowedResources
                }
            } else {
                return {
                    success: false,
                    msg: 'По указаной в токене почте пользователь был не найден'
                }
            }
        } else {
            return {
                success: false,
                msg: 'По указаному authorization token пользователь был не найден'
            }
        }
    }
}

module.exports = DataProvider