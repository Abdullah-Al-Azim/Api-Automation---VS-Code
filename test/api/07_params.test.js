const axios = require('axios');
const { expect } = require('chai');
const config = require('../../config/config');

const BASE_URL = config.baseURL;

describe('🔍 Query Parameters Testing', () => {

    // ============================
    // Basic Query Parameters
    // ============================
    describe('Basic Query Parameters', () => {

        it('✅ Filter posts by userId', async () => {
            const response = await axios.get(`${BASE_URL}/posts`, {
                params: {
                    userId: 1
                }
            });

            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');
            // All posts should have userId 1
            response.data.forEach((post) => {
                expect(post.userId).to.equal(1);
            });

            console.log(`   📊 Total posts for User 1: ${response.data.length}`);
        });

        it('✅ Filter comments by postId', async () => {
            const response = await axios.get(`${BASE_URL}/comments`, {
                params: {
                    postId: 1
                }
            });

            expect(response.status).to.equal(200);
            response.data.forEach((comment) => {
                expect(comment.postId).to.equal(1);
            });

            console.log(`   📊 Total comments for Post 1: ${response.data.length}`);
        });
    });

    // ============================
    // Nested Resource Parameters
    // ============================
    describe('Nested Resource (Path Parameters)', () => {

        it('✅ Fetch user posts - /users/1/posts', async () => {
            const userId = 1;
            const response = await axios.get(`${BASE_URL}/users/${userId}/posts`);

            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');
            response.data.forEach((post) => {
                expect(post.userId).to.equal(userId);
            });
        });

        it('✅ Fetch post comments - /posts/1/comments', async () => {
            const postId = 1;
            const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`);

            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');
            response.data.forEach((comment) => {
                expect(comment.postId).to.equal(postId);
            });
        });

        it('✅ Fetch user todos - /users/1/todos', async () => {
            const userId = 1;
            const response = await axios.get(`${BASE_URL}/users/${userId}/todos`);

            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');
        });
    });

    // ============================
    // Multiple Query Parameters
    // ============================
    describe('Multiple Query Parameters', () => {

        it('✅ Filter using multiple parameters', async () => {
            const response = await axios.get(`${BASE_URL}/posts`, {
                params: {
                    userId: 1,
                    id: 1
                }
            });

            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');
            if (response.data.length > 0) {
                expect(response.data[0].userId).to.equal(1);
                expect(response.data[0].id).to.equal(1);
            }
        });

        it('✅ Direct query string in URL', async () => {
            const response = await axios.get(
                `${BASE_URL}/comments?postId=1&id=1`
            );

            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');
        });
    });

    // ============================
    // Dynamic Parameters Testing
    // ============================
    describe('Dynamic Parameter Testing', () => {

        // Test with different user IDs
        const userIds = [1, 2, 3, 4, 5];

        userIds.forEach((userId) => {
            it(`✅ Check if User ID ${userId} has posts`, async () => {
                const response = await axios.get(`${BASE_URL}/posts`, {
                    params: { userId }
                });

                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
                expect(response.data.length).to.be.greaterThan(0);
            });
        });
    });
});