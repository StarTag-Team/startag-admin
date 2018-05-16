import axios from 'axios'
import config from './config'

export default class Auth {
    static get _token() {
        return localStorage.getItem('token')
    }

    static set _token(token) {
        localStorage.setItem('token', token)
    }

    static _clearToken() {
        localStorage.removeItem('token')
    }

    static init(onLoginAction, onLogoutAction) {
        Auth.onLoginAction = onLoginAction || (() => undefined)
        Auth.onLogoutAction = onLogoutAction || (() => undefined)
    }

    static async isAuthorizedSession() {
        return !!Auth._token
    }

    static logout() {
        Auth._clearToken()
        Auth.onLogoutAction()
    }

    static async login(email, password) {
        const response = await axios.post(config.uri.login, {email, password})
        if (response.data.status === 'success') {
            Auth._token = response.data.data.login.token
            Auth.onLoginAction()
        }
        return {
            status: responseData.data.status
        }
    }
}