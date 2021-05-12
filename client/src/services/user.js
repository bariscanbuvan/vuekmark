import ApiService from './api'

const UserService = {
    login: function (user) {
        return ApiService.post('/users/login', user);
    },

    register: function (user) {
        return ApiService.post('/users/register', user);
    }
}

export default UserService

