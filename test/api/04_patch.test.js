const axios = require('axios');
const { expect } = require('chai');
const config = require('../../config/config');

const BASE_URL = config.baseURL;

describe('✏️ PATCH Request Tests (Partial Update)', () => {

    describe('PATCH /users/:id - Partial Update', () => {

        it('✅ Updating only name should keep other data', async () => {
            const response = await axios.patch(
                `${BASE_URL}/users/1`,
                { name: 'Partially Updated Name' },
                { headers: config.headers }
            );

            expect(response.status).to.equal(200);
            expect(response.data.name).to.equal('Partially Updated Name');
            // Other fields should also be present
            expect(response.data).to.have.property('email');
            expect(response.data).to.have.property('username');
        });

        it('✅ Should be able to update only email', async () => {
            const response = await axios.patch(
                `${BASE_URL}/users/1`,
                { email: 'newemail@example.com' }
            );

            expect(response.status).to.equal(200);
            expect(response.data.email).to.equal('newemail@example.com');
        });

        it('✅ Should be able to partially update post title', async () => {
            const response = await axios.patch(
                `${BASE_URL}/posts/1`,
                { title: 'Only Title Changed' }
            );

            expect(response.status).to.equal(200);
            expect(response.data.title).to.equal('Only Title Changed');
        });
    });
});