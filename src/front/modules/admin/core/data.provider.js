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
            success: response.data.success,
            allowed: response.data.allowed
        }
    }

    static async getData(uri) {
        const resource = uri.slice(1)
        const response = await axios.get(config.uri.admin + uri, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        if (response.data.success) {
            return {
                success: true,
                data: response.data[resource],
                total: response.data.total
            }
        } else {
            return {
                success: false,
                data: [],
                total: 0,
                msg: response.data.msg
            }
        }
    }
}