export default {
    uri: {
        admin: 'http://admin.formetoo.ru',
        login: 'http://admin.formetoo.ru/login',
        allowed: 'http://admin.formetoo.ru/allowed'
    },
    headerOptions: {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }
}