import axios from 'axios'

import config from '@config'
import Auth from './auth.provider'

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtb4964cx/upload'
const CLOUDINARY_UPLOAD_PRESET = 'fgmc43cb'

export default class Data {
    static config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }

    static async getAllowedResources() {
        const response = await axios.get(config.uri.allowed, this.config)
        return {
            success: response.data.success,
            allowed: response.data.allowed
        }
    }

    static async getProfile() {
        const response = await axios.get(config.uri.admin + '/profile', this.config)
        if (response.data.success) {
            return {
                success: true,
                profile: response.data.user
            }
        } else {
            return {
                success: false,
                msg: response.data.msg
            }
        }
    }

    static async getData(uri) {
        const resource = uri.slice(1)
        const response = await axios.get(config.uri.admin + uri, this.config)
        if (response.data.success)
            return {
                success: true,
                data: response.data[resource],
                total: response.data.total
            }
        else
            return {
                success: false,
                data: [],
                total: 0,
                msg: response.data.msg
            }
    }

    static async getResource(uri) {
        const response = await axios.get(config.uri.admin + uri, this.config)
        return response.data
    }

    static async uploadImage(data) {
        let formData = new FormData()
        formData.append('file', data)
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        const result = await axios.post(CLOUDINARY_URL, formData, this.config)
        return {
            url: result.data.url,
            id: result.data.etag
        }
    }

    static async uploadXls(uri, data) {
        let formData = new FormData()
        formData.append('file', data)
        const response = await axios.post(config.uri.admin + '/export' + uri, formData, this.config)
        if (response.data.success)
            return {
                success: true
            }
        else
            return {
                success: false
            }
    }

    static async importXls(uri) {
        const response = await axios.get(config.uri.admin + '/import' + uri, this.config)
        console.log(response)
        if (response.data.success)
            return {
                success: true
            }
        else
            return {
                success: false
            }
    }

    static create(uri, data) {
        axios.post(config.uri.admin + uri, data, this.config)
    }

    static async edit(uri, data) {
        if (uri === '/profile') {
            const response = await axios.post(config.uri.admin + uri + '/', data, this.config)
            Auth._token = response.data.token
            return {
                success: true,
                email: response.data.profile.email
            }
        }
        axios.post(config.uri.admin + uri + '/' + data._id, data, this.config)
    }

    static remove(uri) {
        axios.post(config.uri.admin + uri, null, this.config)
    }
}