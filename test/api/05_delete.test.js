const axios = require('axios');
const { expect } = require('chai');
const config = require('../../config/config');

const BASE_URL = config.baseURL;

describe('🗑️ DELETE Request Tests', () => {

    describe('DELETE /users/:id - User Delete', () => {

        it('✅ Should be able to delete user', async () => {
            const response = await axios.delete(`${BASE_URL}/users/1`);

            expect(response.status).to.equal(200);
        });

        it('✅ Should be able to delete post', async () => {
            const response = await axios.delete(`${BASE_URL}/posts/1`);

            expect(response.status).to.equal(200);
        });

        it('✅ Should be able to delete comment', async () => {
            const response = await axios.delete(`${BASE_URL}/comments/1`);

            expect(response.status).to.equal(200);
        });

        it('✅ After delete, empty object/body should come', async () => {
            const response = await axios.delete(`${BASE_URL}/posts/5`);

            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('object');
        });
    });
});