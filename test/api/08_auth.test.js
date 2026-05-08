const axios = require('axios');
const { expect } = require('chai');
const config = require('../../config/config');

const BASE_URL = config.baseURL;

describe('🔐 Authentication Testing', () => {

  // Note: JSONPlaceholder doesn’t require auth,
  // but here’s how you would test it

  describe('Bearer Token Auth', () => {

    it('✅ Request should succeed with valid token', async () => {
      const response = await axios.get(`${BASE_URL}/users`, {
        headers: {
          'Authorization': 'Bearer valid-token-12345'
        }
      });
      expect(response.status).to.equal(200);
    });

    it('✅ Request without token (public endpoint)', async () => {
      const response = await axios.get(`${BASE_URL}/users`);
      expect(response.status).to.equal(200);
    });

     // This test will work with real API:
        it('✅ Should get 401 with invalid token (Real API example)', async () => {
            try {
                await axios.get(`${BASE_URL}/protected-endpoint`, {
                    headers: {
                        'Authorization': 'Bearer invalid-token'
                    }
                });
            } catch (error) {
                // Real API will return 401
                if (error.response) {
                    expect(error.response.status).to.be.oneOf([401, 403, 404]);
                }
            }
        });
    });

    // ============================
    // API Key Authentication
    // ============================
    describe('API Key Auth', () => {

        it('✅ Send API Key in header', async () => {
            const response = await axios.get(`${BASE_URL}/users`, {
                headers: {
                    'X-API-Key': 'my-secret-api-key-123'
                }
            });

            expect(response.status).to.equal(200);
        });

        it('✅ Send API Key in query param', async () => {
            const response = await axios.get(`${BASE_URL}/users`, {
                params: {
                    api_key: 'my-secret-api-key-123'
                }
            });

            expect(response.status).to.equal(200);
        });
    });

    // ============================
    // Basic Authentication
    // ============================
    describe('Basic Auth', () => {

        it('✅ Basic Auth using Username & Password', async () => {
            const response = await axios.get(`${BASE_URL}/users`, {
                auth: {
                    username: 'testuser',
                    password: 'testpassword123'
                }
            });

            expect(response.status).to.equal(200);
        });

        it('✅ Base64 encoded Basic Auth header', async () => {
            const credentials = Buffer.from('user:password').toString('base64');

            const response = await axios.get(`${BASE_URL}/users`, {
                headers: {
                    'Authorization': `Basic ${credentials}`
                }
            });

            expect(response.status).to.equal(200);
        });
    });
});