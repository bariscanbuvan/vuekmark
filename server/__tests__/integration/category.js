const request = require('supertest');
const app = require('../../src/app');

let token = null;
let dashboard = null;

async function createUser() {
    const registerResponse = await request(app)
        .post('/users/register')
        .send({ username: 'bookmarkUsername' + Math.random(), password: 'bookmarkPassword' + Math.random() });

    token = registerResponse.body.token;
}

async function createDashboard() {
    const createDashboardResponse = await request(app)
        .post('/dashboards')
        .set('Authorization', 'Bearer ' + token)
        .send({
            'name': 'newly created dashboard',
            'color': '#fff'
        });

    dashboard = createDashboardResponse.body;
}

beforeAll(async () => {
    await createUser();
    await createDashboard();
});

describe('/categories', () => {
    describe('POST /', () => {
        it('should create a new category and return 201', async () => {
            const response = await request(app)
                .post('/categories')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'name': 'newly created category',
                    'color': '#fff',
                    'dashboard': dashboard._id
                });

            expect(response.status).toBe(201);
        });

        it('should fail on invalid data and return 400', async () => {
            const response = await request(app)
                .post('/categories')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(400);
        });
    })

    describe('GET /:id', () => {
        it('should return a category', async () => {
            const savedcategory = await request(app)
                .post('/categories')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'name': 'newly created category',
                    'color': '#fff',
                    'dashboard': dashboard._id
                });

            const response = await request(app)
                .get('/categories/' + savedcategory.body._id)
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(200);
        });

        it('should return 404 if category does not exist', async () => {
            const response = await request(app)
                .get('/categories/' + '606613e4703d23255070c87c')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(404);
        });
    })

    describe('DELETE /:id', () => {
        it('should delete category', async () => {
            const response = await request(app)
                .delete('/categories/' + '606613e4703d23255070c87e')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(204);
        });

        it('should return 400 on corrupted object id', async () => {
            const response = await request(app)
                .delete('/categories/' + 'corrupted')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(400);
        });
    })

    describe('PUT /:id', () => {
        it('should update category', async () => {

            const savedcategory = await request(app)
                .post('/categories')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'name': 'newly created category',
                    'color': '#fff',
                    'dashboard': dashboard._id
                });

            const response = await request(app)
                .put('/categories/' + savedcategory.body._id)
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'name': 'updated category name',
                    'color': '#fff',
                    'dashboard': savedcategory.body._id
                });

            expect(response.body.name).toBe('updated category name');
        });

        it('should return 400 on invalid data', async () => {
            const savedcategory = await request(app)
                .post('/categories')
                .set('Authorization', 'Bearer ' + token)

            const response = await request(app)
                .put('/categories/' + savedcategory.body._id)
                .set('Authorization', 'Bearer ' + token);


            expect(response.status).toBe(400);
        });
    })
});