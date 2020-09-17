import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://the-burger-builder-df9e4.firebaseio.com/',
});

export default instance;