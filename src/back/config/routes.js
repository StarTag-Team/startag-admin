const resources = require('../constants/constants').resources
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const multer = require('multer')
const fs = require('fs')
const parse = require('csv-parse')
const sha256 = require('js-sha256')
const bcrypt = require('bcrypt')

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


        app.all('*', (req, res, next) => {
            const isVerified = AuthProvider._verifyToken(userCollection, req.headers.authorization)
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
            if (allowedResources.success)
                return res.send({
                    success: true,
                    allowed: allowedResources.list
                })
            else
                return res.send({
                    success: false,
                    allowed: allowedResources.msg
                })
        })

        app.post('/login', async (req, res) => {
            const {email, password} = req.body
            const user = {
                email: email.toLowerCase()
            }
            const result = await AuthProvider.checkLogin(userCollection, user, password)
            if (result.success)
                return res.send({
                    success: true,
                    token: result.token
                })
            else
                return res.send({
                    success: false,
                    msg: result.msg
                })
        })

        app.get('/profile', (req, res) => {
            const token = req.headers.authorization
            const user = AuthProvider.decode(token)
            if (user)
                return res.send({
                    success: true,
                    user: user.email
                })
            else
                return res.send({
                    success: false,
                    msg: 'Пользователь не найден'
                })
        })

        app.post('/profile', async (req, res) => {
            const profile = req.body
            const token = req.headers.authorization
            const oldUser = AuthProvider.decode(token)
            const newToken = AuthProvider._getToken({email: profile.user}, 'myfuckingsecretkey')
            await resourceCollection('users').update({email: oldUser.email}, {$set: {email: profile.user}})
            const newUser = await resourceCollection('users').findOne({email: profile.user})
            return res.send({
                success: true,
                token: newToken,
                profile: newUser
            })
        })

        resources.forEach((resource) => {
            app.get('/' + resource, async (req, res) => {
                const resources = await resourceCollection(resource).find({}).toArray()
                const count = await resourceCollection(resource).count()
                if (!resources && !count)
                    return res.send({
                        success: false,
                        msg: `${resource} не найдены!`
                    })
                let data = {
                    success: true,
                    total: count
                }
                data[resource] = resources
                return res.send(data)
            })

            app.get('/' + resource + '/:id', async (req, res) => {
                const item = await resourceCollection(resource).findOne({_id: ObjectID(req.params.id)})
                if (!item)
                    return res.send({
                        success: false,
                        msg: 'Ресурс не найден!'
                    })
                return res.send(item)
            })

            app.post('/' + resource, async (req, res) => {
                if (resource === 'users') {
                    let user = req.body
                    user.password = await AuthProvider.getHash(req.body.password)
                    try {
                        resourceCollection(resource).insert(user)
                    } catch (error) {
                        return res.send({
                            success: false,
                            msg: 'Ошибка создания пользователя'
                        })
                    }
                    return res.send({
                        success: true
                    })
                }
                try {
                    resourceCollection(resource).insert(req.body)
                } catch (error) {
                    return res.send({
                        success: false,
                        msg: 'Ошибка создания пользователя'
                    })
                }
                return res.send({
                    success: true
                })
            })

            app.post('/' + resource + '/:id', (req, res) => {
                if (resource === 'users') {
                    let user = req.body
                    user.password = AuthProvider.getHash(req.body.password)
                    user._id = ObjectID(req.params.id)
                    resourceCollection(resource).findOneAndUpdate({_id: ObjectID(req.params.id)}, user)
                        .catch(() => {
                            return res.send({
                                success: false,
                                msg: 'Ошибка редактирования ресурса'
                            })
                        })
                    return res.send({
                        success: true
                    })
                }
                let newResource = req.body
                newResource._id = ObjectID(newResource._id)
                resourceCollection(resource).findOneAndUpdate({_id: ObjectID(req.params.id)}, newResource)
                    .catch(() => {
                        return res.send({
                            success: false,
                            msg: 'Ошибка редактирования ресурса'
                        })
                    })
            })

            app.post('/:resource/:id/delete', (req, res) => {
                resourceCollection(req.params.resource).deleteOne({_id: ObjectID(req.params.id)})
            })

            const upload_middleware = multer({dest: './'})

            app.post('/export/:resource', upload_middleware.single('file'), (req, res) => {
                fs.readFile(req.file.path, {encoding: 'utf-8'}, (err, data) => {
                    if (err) throw err
                    fs.unlinkSync(req.file.path)
                    parse(data, {delimiter: ';', columns: true}, async (err, output) => {
                        if (err) throw err
                        output.forEach(item => {
                            const resources = ['categories', 'products', 'users', 'roles', 'clients', 'orders', 'attributes', 'attribute-sets', 'tabs', 'tab-sets', 'statuses', 'photos']
                            if (req.params.resource === 'categories') {
                                item.seo = {
                                    title: item.seo_title,
                                    description: item.seo_description,
                                    keywords: item.seo_keywords
                                }
                                if (item.isActive === 'TRUE')
                                    item.isActive = true
                                else
                                    item.isActive = false
                                delete item.seo_title
                                delete item.seo_description
                                delete item.seo_keywords
                            }
                            if (req.params.resource === 'roles') {
                                item.resources = {}
                                resources.forEach(resource => {
                                    let permissions = []
                                    if (item[`${resource}_permissions`].indexOf('get') !== -1)
                                        permissions.push('get')
                                    if (item[`${resource}_permissions`].indexOf('post') !== -1)
                                        permissions.push('post')
                                    if (item[`${resource}_permissions`].indexOf('put') !== -1)
                                        permissions.push('put')
                                    if (item[`${resource}_permissions`].indexOf('delete') !== -1)
                                        permissions.push('delete')
                                    if (item[`${resource}_showInMenu`] === 'TRUE')
                                        item[`${resource}_showInMenu`] = true
                                    else
                                        item[`${resource}_showInMenu`] = false
                                    item.resources[resource] = {
                                        showInMenu: item[`${resource}_showInMenu`],
                                        permissions: permissions
                                    }
                                    delete item[`${resource}_permissions`]
                                    delete item[`${resource}_showInMenu`]
                                })
                            }
                            if (req.params.resource === 'users' || req.params.resource === 'clients') {
                                const hashedPassword = sha256('#!f$55723e.12d68,,b36fdcCC0ba7cf^%^d8f8e1c1793453_32' + item.password)
                                const salt = bcrypt.genSaltSync(10)
                                item.password = bcrypt.hashSync(hashedPassword, salt)
                            }
                            item.creationDate = new Date()
                            item.modificationDate = new Date()
                        })
                        await resourceCollection(req.params.resource).insert(output)
                        await resourceCollection(req.params.resource).find({}).toArray()
                        await resourceCollection(req.params.resource).count()
                        res.send({
                            success: true
                        })
                    })
                })
            })
        })
    })
}