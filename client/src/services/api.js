import axios from 'axios'
import store from '../store';

const ApiService = {
    init(baseURL) {
        axios.defaults.baseURL = baseURL;
        this.setHeader();
    },

    setHeader() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.getToken}`;
    },

    removeHeader() {
        axios.defaults.headers.common = {};
    },

    get(resource) {
        return axios.get(resource);
    },

    post(resource, data) {
        return axios.post(resource, data);
    },

    put(resource, data) {
        return axios.put(resource, data);
    },

    delete(resource) {
        return axios.delete(resource);
    },
}

export default ApiService