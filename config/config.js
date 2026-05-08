require('dotenv').config();

const config = {
    baseURL: process.env.BASE_URL || 'https://jsonplaceholder.typicode.com',
    timeout: parseInt(process.env.TIMEOUT) || 10000,
    authToken: process.env.AUTH_TOKEN || '',
    apiKey: process.env.API_KEY || '',

    // Common Headers
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },

    // Endpoints
    endpoints: {
        users: '/users',
        posts: '/posts',
        comments: '/comments',
        todos: '/todos'
    }
};

module.exports = config;