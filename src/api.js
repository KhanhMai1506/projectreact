import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost/laravel8/public/api/'
});