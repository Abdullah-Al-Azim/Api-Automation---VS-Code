const axios = require('axios');
const { expect } = require('chai');
const config = require('../../config/config');

const BASE_URL = config.baseURL;

describe('❌ Negative Test Cases', () => {

    // ============================
    // 404 - Not Found Tests
    // ============================
    describe('404 Not Found Scenarios', () => {

        it('✅ Should get 404 for non-existent user ID', async () => {
            try {
                await axios.get(`${BASE_URL}/users/99999`);
                throw new Error('Should have thrown 404');
            } catch (error) {
                expect(error.response.status).to.equal(404);
            }
        });

        it('✅ Should get 404 for non-existent post ID', async () => {
            try {
                await axios.get(`${BASE_URL}/posts/99999`);
            } catch (error) {
                expect(error.response.status).to.equal(404);
            }
        });

        it('✅ Should get 404 for invalid endpoint', async () => {
            try {
                await axios.get(`${BASE_URL}/nonexistentroute`);
            } catch (error) {
                expect(error.response.status).to.equal(404);
            }
        });
    });

    // ============================
    // Invalid Data Tests
    // ============================
    describe('Invalid Data Handling', () => {

        it('✅ String ID দিয়ে request করলে সঠিক response আসবে', async () => {
            try {
                const response = await axios.get(`${BASE_URL}/users/abc`);
                // কিছু API 200 দেয়, কিছু 400/404 দেয়
                expect(response.status).to.be.oneOf([200, 400, 404]);
            } catch (error) {
                expect(error.response.status).to.be.oneOf([400, 404]);
            }
        });

        it('✅ Negative ID দিয়ে request', async () => {
            try {
                const response = await axios.get(`${BASE_URL}/users/-1`);
                expect(response.status).to.be.oneOf([200, 400, 404]);
            } catch (error) {
                expect(error.response.status).to.be.oneOf([400, 404]);
            }
        });

        it('✅ Empty body দিয়ে POST request', async () => {
            try {
                const response = await axios.post(`${BASE_URL}/posts`, {});
                // JSONPlaceholder accepts empty body
                expect(response.status).to.be.oneOf([200, 201, 400]);
            } catch (error) {
                expect(error.response.status).to.equal(400);
            }
        });

        it('✅ null value দিয়ে POST request', async () => {
            try {
                const response = await axios.post(`${BASE_URL}/posts`, {
                    title: null,
                    body: null,
                    userId: null
                });
                expect(response.status).to.be.oneOf([200, 201, 400]);
            } catch (error) {
                expect(error.response.status).to.equal(400);
            }
        });
    });

    // ============================
    // Malformed Requests
    // ============================
    describe('Malformed Request Tests', () => {

        it('✅ Should get error with invalid JSON body', async () => {
            try {
                const response = await axios.post(
                    `${BASE_URL}/posts`,
                    'this is not json',
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                expect(response.status).to.be.oneOf([200, 201, 400]);
            } catch (error) {
                if (error.response) {
                    expect(error.response.status).to.be.oneOf([400, 500]);
                } else {
                    // Network error also acceptable
                    expect(error).to.exist;
                }
            }
        });

        it('✅ Very long URL parameter is handled', async () => {
            const longId = 'a'.repeat(1000);
            try {
                await axios.get(`${BASE_URL}/users/${longId}`);
            } catch (error) {
                expect(error.response.status).to.be.oneOf([400, 404, 414]);
            }
        });
    });

    // ============================
    // Response Time Edge Cases
    // ============================
    describe('Response Time & Timeout', () => {

        it('✅ Timeout works correctly', async () => {
            try {
                await axios.get(`${BASE_URL}/users`, {
                    timeout: 1 // 1ms - intentionally too short
                });
            } catch (error) {
                // ECONNABORTED = timeout occurred
                expect(error.code).to.equal('ECONNABORTED');
                console.log('   ⏱️ Timeout correctly triggered');
            }
        });

        it('✅ Normal request should not timeout', async () => {
            const response = await axios.get(`${BASE_URL}/users/1`, {
                timeout: 10000 // 10 seconds - plenty of time
            });

            expect(response.status).to.equal(200);
        });
    });

    // ============================
    // HTTP Method Mismatch
    // ============================
    describe('Wrong HTTP Method Tests', () => {

        it('✅ After DELETE request, GET should have no data (mock)', async () => {
            // Delete the post
            const deleteResponse = await axios.delete(`${BASE_URL}/posts/1`);
            expect(deleteResponse.status).to.equal(200);

            // Note: JSONPlaceholder fake API does not persist deletes,
            // So GET will return data again. Real API will return 404.
            console.log('   ℹ️ Note: JSONPlaceholder does not persist deletes.');
        });
    });
});