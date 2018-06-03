import axios from 'axios'
import config from '@config'

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
        const resource = uri.slice(1)
        const response = await axios.get(config.uri.admin + uri, {
            // headers: {
            //     'Authorization': localStorage.getItem('token')
            // }
        })
        return {
            success: response.data.success,
            data: response.data[resource],
            total: response.data.total
        }
    }
}