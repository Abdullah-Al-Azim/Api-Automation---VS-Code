const axios = require('axios');
const { expect } = require('chai');
const config = require('../../config/config');

const BASE_URL = config.baseURL;

describe('📨 Headers Testing', () => {

    // ============================
    // Response Headers Check
    // ============================
    describe('Response Headers Verification', () => {

        let response;

        before(async () => {
            response = await axios.get(`${BASE_URL}/users`);
        });

        it('✅ Check if Content-Type header exists', () => {
            expect(response.headers).to.have.property('content-type');
            expect(response.headers['content-type']).to.include('application/json');
        });

        it('✅ Check if Cache-Control header exists', () => {
            expect(response.headers).to.have.property('cache-control');
        });

        it('✅ Response headers should not be empty', () => {
            expect(Object.keys(response.headers).length).to.be.greaterThan(0);
            console.log('   📋 Response Headers:');
            Object.entries(response.headers).forEach(([key, value]) => {
                console.log(`      ${key}: ${value}`);
            });
        });
    });

    // ============================
    // Sending Custom Headers
    // ============================
    describe('Custom Request Headers', () => {

        it('✅ Should be able to send request with custom headers', async () => {
            const response = await axios.get(`${BASE_URL}/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Custom-Header': 'TestValue123',
                    'User-Agent': 'API-Test-Agent/1.0'
                }
            });

            expect(response.status).to.equal(200);
        });

        it('✅ Determine response format using Accept header', async () => {
            const response = await axios.get(`${BASE_URL}/users/1`, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            expect(response.headers['content-type']).to.include('json');
        });

        it('✅ Send multiple custom headers together', async () => {
            const customHeaders = {
                'X-Request-ID': 'req-12345',
                'X-Client-Version': '2.0.0',
                'X-Platform': 'testing',
                'Accept-Language': 'bn-BD'
            };

            const response = await axios.get(`${BASE_URL}/posts/1`, {
                headers: customHeaders
            });

            expect(response.status).to.equal(200);
        });
    });

    // ============================
    // Authorization Headers
    // ============================
    describe('Authorization Headers', () => {

        it('✅ Send Bearer Token header', async () => {
            const response = await axios.get(`${BASE_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${config.authToken || 'test-token-123'}`
                }
            });

            // JSONPlaceholder auth does not check, so 200 will come
            expect(response.status).to.equal(200);
        });

        it('✅ Send API Key header', async () => {
            const response = await axios.get(`${BASE_URL}/users`, {
                headers: {
                    'X-API-Key': config.apiKey || 'test-api-key'
                }
            });

            expect(response.status).to.equal(200);
        });
    });
});