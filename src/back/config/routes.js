const resources = require('../constants/constants').resources
const MongoClient = require('mongodb').MongoClient

const AuthProvider = require('../core/auth.provider')
const DataProvider = require('../core/data.provider')
const url = require('../constants/constants').url

module.exports = (app) => {
    MongoClient.connect(url, (err, mongo) => {
        if (err) {
            throw err
        }

        const userCollection = mongo.db("testdb").collection('users')
        const resourceCollection = (resource) => mongo.db("testdb").collection(resource)


        app.all('*', async (req, res, next) => {
            const isVerified = await AuthProvider._verifyToken(userCollection, req.headers.authorization)
            if (!isVerified && !!req.headers.authorization) {
                return res.send({
                    success: false,
                    msg: 'Не авторизованы!'
                })
            } else {
                next()
            }
        })

        app.get('/allowed', async (req, res) => {
            const allowedResources = await DataProvider.sendAllowedResources(userCollection, resourceCollection, req.headers.authorization)
            res.send({
                success: true,
                allowed: allowedResources
            })
        })

        app.post('/login', async (req, res) => {
            const {email, password} = req.body
            const user = {
                email: email.toLowerCase()
            }
            const result = await AuthProvider.checkLogin(userCollection, user, password)
            if (result.success) {
                res.send({
                    success: true,
                    token: result.token
                })
            } else {
                res.send({
                    success: false,
                    msg: result.msg
                })
            }
        })

        resources.forEach((resource) => {
            app.get('/' + resource, (req, res) => {
                resourceCollection(resource).find({}).toArray((err, item) => {
                    resourceCollection(resource).count().then(count => {
                        let data = {
                            success: true,
                            total: count
                        }
                        data[resource] = item
                        return res.send(data)
                    })
                    console.log(resource, ' has been sent')
                })
            })

            app.post('/' + resource, (req, res) => {
                resourceCollection(resource).insert(req.body, (err, st) => {
                    console.log(resource, ' has been insered')
                })
                res.send({
                    success: true
                })
            })
        })
    })
}