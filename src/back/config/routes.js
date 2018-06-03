const url = require('../constants/constants').url
const resources = require('../constants/constants').resources
const mongoClient = require("mongodb").MongoClient

module.exports = (app) => {
    mongoClient.connect(url, {useNewUrlParser: true}, (err, mongo) => {
        const collection = (resource) => mongo.db("testdb").collection(resource)
        resources.forEach((resource) => {

            app.get('/' + resource, (req, res) => {
                collection(resource).find({}).toArray((err, item) => {
                    collection(resource).count().then(count => {
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
                console.log(req.body)
                collection(resource).insert(req.body, (err, st) => {
                    console.log(resource, ' has been insered')
                })
                res.send({
                    success: true
                })
            })
        })

        // Спросить у Валеры по поводу прав пользователя: у какой роли какие права?!

        app.get('/allowed', (req, res) => {
            res.send({
                "status": "success",
                "data": {
                    "allowed": [{"id": "photos", "allowDelete": true}, {
                        "id": "statuses",
                        "allowDelete": true
                    }, {"id": "tab-sets", "allowDelete": true}, {
                        "id": "tabs",
                        "allowDelete": true
                    }, {"id": "attribute-sets", "allowDelete": true}, {
                        "id": "attributes",
                        "allowDelete": true
                    }, {"id": "orders", "allowDelete": true}, {"id": "clients", "allowDelete": true}, {
                        "id": "roles",
                        "allowDelete": true
                    }, {"id": "users", "allowDelete": true}, {
                        "id": "categories",
                        "allowDelete": true
                    }, {"id": "products", "allowDelete": true}]
                }
            })
        })

        app.post('/login', (req, res) => {

        })
    })
}