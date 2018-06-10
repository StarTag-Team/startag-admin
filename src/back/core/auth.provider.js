const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthProvider {
    static async _verifyToken(collection, token) {
        const decoded = jwt.decode(token)
        if (!!decoded) {
            const result = await collection.findOne({email: decoded.email})
            if (!!result) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    static decode(token) {
        return jwt.decode(token)
    }

    static _getToken(payload, secret) {
        return jwt.sign(payload, secret)
    }

    static async getHash(password) {
        const salt = await bcrypt.genSalt(10)
        console.log(await bcrypt.hash(password, salt))
        return await bcrypt.hash(password, salt)
    }

    static async checkLogin(collection, user, password) {
        const result = await collection.findOne(user)
        if (!!result) {
            const success = await bcrypt.compare(password, result.password)
            if (success) {
                return {
                    success: true,
                    token: this._getToken(user, 'myfuckingsecretkey')
                }
            } else {
                return {
                    success: false,
                    msg: 'Неверный пароль!'
                }
            }
        } else {
            return {
                success: false,
                msg: 'Пользователь не найден!'
            }
        }
    }
}

module.exports = AuthProvider