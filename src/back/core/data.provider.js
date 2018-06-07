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
                return allowedResources
            } else {
                return null
            }
        } else {
            return null
        }
    }
}

module.exports = DataProvider