const request = require('supertest');
const app = require('../../src/app');

let token = null;

async function createUser() {
    const registerResponse = await request(app)
        .post('/users/register')
        .send({ username: 'bookmarkUsername' + Math.random(), password: 'bookmarkPassword' + Math.random() });

    token = registerResponse.body.token;
}

beforeAll(async () => {
    await createUser();
});

describe('/dashboards', () => {
    describe('POST /', () => {
        it('should create a new dashboard and return 201', async () => {
            const response = await request(app)
                .post('/dashboards')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name: 'newly created dashboard',
                    color: '#fff'
                });

            expect(response.status).toBe(201);

        });

        it('should fail on invalid data and return 400', async () => {
            const response = await request(app)
                .post('/dashboards')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(400);
        });

        it('should join dashboard', async () => {
            const newDashboardUserResponse = await request(app)
                .post('/users/register')
                .send({ username: 'dashboardJoinUsername', password: 'dashboardJoinPassword' });

            const newDashboardResponse = await request(app)
                .post('/dashboards')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name: 'newly created dashboard',
                    color: '#fff'
                });

            const response = await request(app)
                .post('/dashboards/' + newDashboardResponse.body._id + '/join')
                .set('Authorization', 'Bearer ' + newDashboardUserResponse.body.token);

            expect(response.status).toBe(200);
        })

        it('should return 404 if dashboard to be joined does not exist', async () => {
            const response = await request(app)
                .post('/dashboards/604e3a111bb32c0013e56df6/join')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(404);
        })

        it('should quit from dashboard', async () => {
            const newDashboardResponse = await request(app)
                .post('/dashboards')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name: 'newly created dashboard',
                    color: '#fff'
                });

            const response = await request(app)
                .post('/dashboards/' + newDashboardResponse.body._id + '/quit')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(200);
        })

        it('should return 404 if dashboard to be quit does not exist', async () => {
            const response = await request(app)
                .post('/dashboards/604e3a111bb32c0013e56df6/join')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(404);
        })

    })

    describe('GET /:id', () => {
        it('should return a dashboard', async () => {
            const savedDashboard = await request(app)
                .post('/dashboards')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name: 'newly created dashboard',
                    color: '#fff'
                });

            const response = await request(app)
                .get('/dashboards/' + savedDashboard.body._id)
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(200);
        });

        it('should return 404 if dashboard does not exists', async () => {
            const response = await request(app)
                .get('/dashboards/' + '606613e4703d23255070c87c')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(404);
        });

        it('should return bookmarks of dashboard', async () => {
            const savedDashboard = await request(app)
                .post('/dashboards')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name: 'newly created dashboard',
                    color: '#fff'
                });

            const savedCategory = await request(app)
                .post('/categories')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'name': 'newly created category',
                    'color': '#fff',
                    'dashboard': savedDashboard.body._id
                });

            const savedBookmark = await request(app)
                .post('/bookmarks')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'url': 'https://stackoverflow.com/questions/39301227/external-api-calls-with-express-node-js-and-require-module',
                    'dashboard': savedDashboard.body._id,
                    'category': savedCategory.body._id
                });

            const response = await request(app)
                .get('/dashboards/' + savedDashboard.body._id + '/bookmarks')
                .set('Authorization', 'Bearer ' + token);

            expect(response.body.length).toBe(1);
        });

        it('should return categories of dashboard', async () => {
            const savedDashboard = await request(app)
                .post('/dashboards')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name: 'newly created dashboard',
                    color: '#fff'
                });

            const savedCategory = await request(app)
                .post('/categories')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'name': 'newly created category',
                    'color': '#fff',
                    'dashboard': savedDashboard.body._id
                });

            const response = await request(app)
                .get('/dashboards/' + savedDashboard.body._id + '/categories')
                .set('Authorization', 'Bearer ' + token);

            expect(response.body.length).toBe(1);
        });
    })

    describe('DELETE /:id', () => {
        it('should delete dashboard', async () => {
            const response = await request(app)
                .delete('/dashboards/' + '606613e4703d23255070c87e')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(204);
        });

        it('should return 400 on corrupted object id', async () => {
            const response = await request(app)
                .delete('/dashboards/' + 'corrupted')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(400);
        });
    })

    describe('PUT /:id', () => {
        it('should update dashboard', async () => {
            const savedDashboard = await request(app)
                .post('/dashboards')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name: 'newly created dashboard',
                    color: '#fff'
                });

            const response = await request(app)
                .put('/dashboards/' + savedDashboard.body._id)
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name: 'updated dashboard name',
                    color: '#fff'
                });

            expect(response.body.name).toBe('updated dashboard name');
        });

        it('should return 400 on invalid data', async () => {
            const savedDashboard = await request(app)
                .post('/dashboards')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name: 'newly created dashboard',
                    color: '#fff'
                });

            const response = await request(app)
                .put('/dashboards/' + savedDashboard.body._id)
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(400);
        });
    })
});