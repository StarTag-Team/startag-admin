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

    static isAuthorizedSession() {
        return !!Auth._token
    }

    static logout() {
        Auth._clearToken()
        Auth.onLogoutAction()
    }

    static async login(email, password) {
        const responseData = await axios.post(config.login, {email, password})
        if (responseData.data.status === 'success') {
            Auth._token = responseData.data.data.login.token
            Auth.onLoginAction()
        }
        return {status: responseData.data.status}
    }
}