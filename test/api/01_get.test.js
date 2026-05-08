const axios = require('axios');
const { expect } = require('chai');
const config = require('../../config/config');

const BASE_URL = config.baseURL;

describe('📋 GET Request Tests', () => {

    // ============================
    // TEST 1: Get All Users
    // ============================
    describe('GET /users - Fetch All Users', () => {

        let response;

        // API call will be made before each test
        before(async () => {
            response = await axios.get(`${BASE_URL}/users`);
        });

        it('✅ Status code should be 200', () => {
            expect(response.status).to.equal(200);
        });

        it('✅ Response should be an Array', () => {
            expect(response.data).to.be.an('array');
        });

        it('✅ At least 1 user should exist', () => {
            expect(response.data.length).to.be.greaterThan(0);
        });

        it('✅ Each user should have id, name, email', () => {
            response.data.forEach((user) => {
                expect(user).to.have.property('id');
                expect(user).to.have.property('name');
                expect(user).to.have.property('email');
            });
        });

        it('✅ Content-Type should be application/json', () => {
            expect(response.headers['content-type']).to.include('application/json');
        });

        it('✅ Response time should be less than 2000ms', async () => {
            const start = Date.now();
            await axios.get(`${BASE_URL}/users`);
            const duration = Date.now() - start;

            expect(duration).to.be.lessThan(2000);
            console.log(`   ⏱️ Response Time: ${duration}ms`);
        });
    });

    // ============================
    // TEST 2: Get Single User
    // ============================
    describe('GET /users/:id - Fetch Specific User', () => {

        it('✅ Should be able to fetch User ID 1', async () => {
            const response = await axios.get(`${BASE_URL}/users/1`);

            expect(response.status).to.equal(200);
            expect(response.data.id).to.equal(1);
            expect(response.data.name).to.be.a('string');
            expect(response.data.email).to.be.a('string');
        });

        it('✅ All user fields should be correct', async () => {
            const response = await axios.get(`${BASE_URL}/users/1`);
            const user = response.data;

            // Required fields check
            expect(user).to.have.all.keys(
                'id', 'name', 'username', 'email',
                'address', 'phone', 'website', 'company'
            );

            // Nested object check
            expect(user.address).to.have.property('street');
            expect(user.address).to.have.property('city');
            expect(user.company).to.have.property('name');
        });

        it('✅ Email format should be correct', async () => {
            const response = await axios.get(`${BASE_URL}/users/1`);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            expect(response.data.email).to.match(emailRegex);
        });
    });

    // ============================
    // TEST 3: Get All Posts
    // ============================
    describe('GET /posts - Fetch All Posts', () => {

        it('✅ Should have total 100 posts', async () => {
            const response = await axios.get(`${BASE_URL}/posts`);

            expect(response.status).to.equal(200);
            expect(response.data).to.have.lengthOf(100);
        });

        it('✅ Each post should have userId, title, body', async () => {
            const response = await axios.get(`${BASE_URL}/posts`);

            response.data.forEach((post) => {
                expect(post).to.have.property('userId').that.is.a('number');
                expect(post).to.have.property('title').that.is.a('string');
                expect(post).to.have.property('body').that.is.a('string');
            });
        });
    });
});