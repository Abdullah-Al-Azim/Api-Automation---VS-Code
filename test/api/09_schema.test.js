const axios = require('axios');
const { expect } = require('chai');
const config = require('../../config/config');

const BASE_URL = config.baseURL;

describe('📐 Schema Validation Tests', () => {

    // ============================
    // User Schema Validation
    // ============================
    describe('User Response Schema', () => {

        let user;

        before(async () => {
            const response = await axios.get(`${BASE_URL}/users/1`);
            user = response.data;
        });

        it('✅ User object should have all required fields', () => {
            const requiredFields = ['id', 'name', 'username', 'email', 'phone', 'website'];
            requiredFields.forEach(field => {
                expect(user).to.have.property(field);
            });
        });

        it('✅ Field types should be correct', () => {
            expect(user.id).to.be.a('number');
            expect(user.name).to.be.a('string');
            expect(user.username).to.be.a('string');
            expect(user.email).to.be.a('string');
            expect(user.phone).to.be.a('string');
            expect(user.website).to.be.a('string');
        });

        it('✅ Nested address object structure should be correct', () => {
            expect(user.address).to.be.an('object');
            expect(user.address).to.have.property('street').that.is.a('string');
            expect(user.address).to.have.property('suite').that.is.a('string');
            expect(user.address).to.have.property('city').that.is.a('string');
            expect(user.address).to.have.property('zipcode').that.is.a('string');
            expect(user.address).to.have.property('geo').that.is.an('object');
        });

        it('✅ Geo coordinates structure should be correct', () => {
            expect(user.address.geo).to.have.property('lat').that.is.a('string');
            expect(user.address.geo).to.have.property('lng').that.is.a('string');
        });

        it('✅ Company object structure should be correct', () => {
            expect(user.company).to.be.an('object');
            expect(user.company).to.have.property('name').that.is.a('string');
            expect(user.company).to.have.property('catchPhrase').that.is.a('string');
            expect(user.company).to.have.property('bs').that.is.a('string');
        });

        it('✅ Email format should be valid (Regex check)', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            expect(user.email).to.match(emailRegex);
        });

        it('✅ id should be a positive integer', () => {
            expect(user.id).to.be.a('number');
            expect(user.id).to.be.greaterThan(0);
            expect(Number.isInteger(user.id)).to.be.true;
        });
    });

    // ============================
    // Post Schema Validation
    // ============================
    describe('Post Response Schema', () => {

        let post;

        before(async () => {
            const response = await axios.get(`${BASE_URL}/posts/1`);
            post = response.data;
        });

        it('✅ Post object should have all required fields', () => {
            expect(post).to.have.all.keys('userId', 'id', 'title', 'body');
        });

        it('✅ Post field types should be correct', () => {
            expect(post.userId).to.be.a('number');
            expect(post.id).to.be.a('number');
            expect(post.title).to.be.a('string');
            expect(post.body).to.be.a('string');
        });

        it('✅ Title should not be empty', () => {
            expect(post.title).to.have.lengthOf.greaterThan(0);
        });

        it('✅ Body should not be empty', () => {
            expect(post.body).to.have.lengthOf.greaterThan(0);
        });
    });

    // ============================
    // Array Response Schema
    // ============================
    describe('Array Response Schema', () => {

        it('✅ Each item in users list should have same structure', async () => {
            const response = await axios.get(`${BASE_URL}/users`);
            const users = response.data;

            expect(users).to.be.an('array');

            users.forEach((user, index) => {
                expect(user, `User at index ${index}`).to.have.property('id');
                expect(user, `User at index ${index}`).to.have.property('name');
                expect(user, `User at index ${index}`).to.have.property('email');
                expect(user.id).to.be.a('number');
                expect(user.name).to.be.a('string');
            });
        });

        it('✅ Comments list schema should be correct', async () => {
            const response = await axios.get(`${BASE_URL}/comments?postId=1`);

            response.data.forEach(comment => {
                expect(comment).to.have.property('postId').that.is.a('number');
                expect(comment).to.have.property('id').that.is.a('number');
                expect(comment).to.have.property('name').that.is.a('string');
                expect(comment).to.have.property('email').that.is.a('string');
                expect(comment).to.have.property('body').that.is.a('string');
            });
        });
    });
});