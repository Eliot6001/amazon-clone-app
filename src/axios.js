const axios = require('axios');

const instance = axios.create({
	baseURL: 'http://localhost:4000/fir-faf42/us-central1/api',
});
export default instance;