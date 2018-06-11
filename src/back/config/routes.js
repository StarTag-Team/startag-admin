const resources = require('../constants/constants').resources
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

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

        app.get('/profile', (req, res) => {
            const token = req.headers.authorization
            const user =  AuthProvider.decode(token)
            return res.send({
                success: true,
                user: user.email
            })
        })

        app.post('/profile', async (req, res) => {
            const profile = req.body
            const token = req.headers.authorization
            const oldUser =  AuthProvider.decode(token)
            const newToken = AuthProvider._getToken({email: profile.user}, 'myfuckingsecretkey')
            await resourceCollection('users').update({email: oldUser.email}, {$set: {email: profile.user}})
            const newUser = await resourceCollection('users').findOne({email: profile.user})
            res.send({
                success: true,
                token: newToken,
                profile: newUser
            })
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

            app.get('/' + resource + '/:id', async (req, res) => {
                const item = await resourceCollection(resource).findOne({_id: ObjectID(req.params.id)})
                res.send(item)
            })

            app.post('/' + resource, async (req, res) => {
                if (resource === 'users') {
                    let user = req.body
                    user.password = await AuthProvider.getHash(req.body.password)
                    resourceCollection(resource).insert(user, (err, st) => {
                        console.log(resource, ' has been insered')
                    })
                    return true
                }
                await resourceCollection(resource).insert(req.body, (err, result) => {
                    if (err) {
                        throw err
                    }
                    console.log(result)
                    console.log(resource, ' has been insered')
                })
                res.send({
                    success: true
                })
            })

            app.post('/' + resource + '/:id', async (req, res) => {
                if (resource === 'users') {
                    let user = req.body
                    user.password = await AuthProvider.getHash(req.body.password)
                    user._id = ObjectID(req.params.id)
                    resourceCollection(resource).findOneAndUpdate({_id: ObjectID(req.params.id)}, user, (err, result) => {
                    })
                    return true
                }
                let newResource = req.body
                newResource._id = ObjectID(newResource._id)
                resourceCollection(resource).findOneAndUpdate({_id: ObjectID(req.params.id)}, newResource, (err, result) => {
                    console.log(result)
                })
            })

            app.post('/:resource/:id/delete', async (req, res) => {
                /*
                if (req.params.resource === 'photos') {
                    const photo = await resourceCollection('photos').findOne({_id: ObjectID(req.params.id)})
                    await resourceCollection('categories').update({image: photo.key}, {$unset: {image: photo.key}})
                    return true
                }*/
                await resourceCollection(req.params.resource).deleteOne({_id: ObjectID(req.params.id)})
            })
        })
    })
}