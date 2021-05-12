const request = require('supertest');
const app = require('../../src/app');

describe('/users', () => {
    describe('POST /register', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/users/register')
                .send({ username: 'bookmarkUsername' + Math.random(), password: 'bookmarkPassword' + Math.random() });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        })

        it('should not register a user with same username more than once', async () => {
            const random = Math.random();

            await request(app)
                .post('/users/register')
                .send({ username: 'username' + random, password: 'password' });

            const response = await request(app)
                .post('/users/register')
                .send({ username: 'username' + random, password: 'password2' });

            expect(response.status).toBe(409);
        })
    })

    describe('POST /login', () => {
        it('should return token on successful login', async () => {
            const random = Math.random();

            await request(app)
                .post('/users/register')
                .send({ username: 'username' + random, password: 'password' });

            const response = await request(app)
                .post('/users/login')
                .send({ username: 'username' + random, password: 'password' });

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('token');
        })
    })
})