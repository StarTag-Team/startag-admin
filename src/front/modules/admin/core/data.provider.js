import axios from 'axios'
import config from '@config'

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtb4964cx/upload'
const CLOUDINARY_UPLOAD_PRESET = 'fgmc43cb'

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

    static async getResource(uri) {
        const response = await axios.get(config.uri.admin + uri, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        return response.data
    }

    static async uploadImage(data) {
        let formData = new FormData()
        formData.append('file', data)
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        const result = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return {
            url: result.data.url,
            id: result.data.etag
        }
    }

    static async create(uri, data) {
        console.log(123)
        const response = await axios.post(config.uri.admin + uri, data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        console.log(response)
    }

    static async edit(uri, data) {
        console.log(123)
        const response = await axios.post(config.uri.admin + uri + '/' + data._id, data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        console.log(response)
    }

    static async remove(uri) {
        const response = await axios.post(config.uri.admin + uri, null, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
    }
}