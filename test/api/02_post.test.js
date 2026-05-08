const axios = require('axios');
const { expect } = require('chai');
const config = require('../../config/config');
const testData = require('../../data/testData.json');

const BASE_URL = config.baseURL;

describe('📝 POST Request Tests', () => {

    // ============================
    // TEST 1: Create New User
    // ============================
    describe('POST /users - Create New User', () => {

        it('✅ User should be created with valid data', async () => {
            const response = await axios.post(
                `${BASE_URL}/users`,
                testData.validUser,
                { headers: config.headers }
            );

            expect(response.status).to.equal(201);
            expect(response.data).to.have.property('id');
            expect(response.data.name).to.equal(testData.validUser.name);
            expect(response.data.email).to.equal(testData.validUser.email);

            console.log(`   🆔 Created User ID: ${response.data.id}`);
        });

        it('✅ Created data should be returned in response', async () => {
            const newPost = {
                title: 'Test Post Title',
                body: 'This is a test post body',
                userId: 1
            };

            const response = await axios.post(
                `${BASE_URL}/posts`,
                newPost,
                { headers: config.headers }
            );

            expect(response.status).to.equal(201);
            expect(response.data.title).to.equal(newPost.title);
            expect(response.data.body).to.equal(newPost.body);
            expect(response.data.userId).to.equal(newPost.userId);
        });

        it('✅ Content-Type header should be sent properly', async () => {
            const response = await axios.post(
                `${BASE_URL}/posts`,
                { title: 'Header Test', body: 'Testing headers', userId: 1 },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            expect(response.status).to.equal(201);
        });
    });

    // ============================
    // TEST 2: Create Post with Different Data Types
    // ============================
    describe('POST /posts - Test with different data types', () => {

        it('✅ Should be created with only required fields', async () => {
            const minimalData = {
                title: 'Minimal Post',
                body: 'Only required fields',
                userId: 1
            };

            const response = await axios.post(`${BASE_URL}/posts`, minimalData);
            expect(response.status).to.equal(201);
        });

        it('✅ Should handle large text body', async () => {
            const longText = 'A'.repeat(5000);
            const response = await axios.post(`${BASE_URL}/posts`, {
                title: 'Long Post',
                body: longText,
                userId: 1
            });

            expect(response.status).to.equal(201);
        });

        it('✅ Should handle special characters', async () => {
            const response = await axios.post(`${BASE_URL}/posts`, {
                title: 'বাংলা টাইটেল <script>alert("xss")</script>',
                body: 'Special chars: !@#$%^&*()',
                userId: 1
            });

            expect(response.status).to.equal(201);
        });
    });
});