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

    static _getToken(payload, secret) {
        return jwt.sign(payload, secret)
    }
    //
    static async getHash(password) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        console.log(hash)
        return hash
    }

    static async checkLogin(collection, user, password) {
        const result = await collection.findOne(user)
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash('#!f$55723e.12d68,,b36fdcCC0ba7cf^%^d8f8e1c1793453_32123', salt, function(err, hash) {
                console.log(hash)
            })
        })
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