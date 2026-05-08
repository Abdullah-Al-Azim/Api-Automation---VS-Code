const axios = require('axios');
const { expect } = require('chai');
const config = require('../../config/config');
const testData = require('../../data/testData.json');

const BASE_URL = config.baseURL;

describe('🔄 PUT Request Tests (Full Update)', () => {

    describe('PUT /users/:id - Full User Update', () => {

        it('✅ User ID 1 should be fully updated', async () => {
            const updatedUser = {
                id: 1,
                name: 'Completely Updated Name',
                username: 'updateduser',
                email: 'updated@example.com',
                phone: '01898765432',
                website: 'updated.com',
                address: {
                    street: 'New Street',
                    suite: 'Suite 100',
                    city: 'Chittagong',
                    zipcode: '4000'
                },
                company: {
                    name: 'Updated Company'
                }
            };

            const response = await axios.put(
                `${BASE_URL}/users/1`,
                updatedUser,
                { headers: config.headers }
            );

            expect(response.status).to.equal(200);
            expect(response.data.name).to.equal(updatedUser.name);
            expect(response.data.email).to.equal(updatedUser.email);
        });

        it('✅ Should be able to update post', async () => {
            const updatedPost = {
                id: 1,
                title: 'Updated Title',
                body: 'Updated body content',
                userId: 1
            };

            const response = await axios.put(
                `${BASE_URL}/posts/1`,
                updatedPost
            );

            expect(response.status).to.equal(200);
            expect(response.data.title).to.equal('Updated Title');
        });
    });
});