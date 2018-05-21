import axios from 'axios'
import config from './config'

export default class Data {
    static async getAllowedResources() {
        const response = await axios.get(config.uri.allowed, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        return {
            status: response.data.status,
            allowed: response.data.data.allowed
        }
    }

    static async getData(uri) {
        const response = await axios.get(config.uri.admin + uri, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        return {
            status: response.data.status,
            data: response.data.data
        }
    }
}