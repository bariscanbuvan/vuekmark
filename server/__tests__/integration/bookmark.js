const request = require('supertest');
const app = require('../../src/app');

let token = null;
let category = null;
let dashboard = null;

async function createUser() {
    const registerResponse = await request(app)
        .post('/users/register')
        .send({ username: 'bookmarkUsername' + Math.random(), password: 'bookmarkPassword' + Math.random() });

    token = registerResponse.body.token;
}

async function createCategory() {
    const createdCategoryResponse = await request(app)
        .post('/categories')
        .set('Authorization', 'Bearer ' + token)
        .send({
            'name': 'newly created category',
            'color': '#fff',
            'dashboard': dashboard._id
        });

    category = createdCategoryResponse.body;
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
    await createCategory();
});

/*afterAll(async () => {
    await wipeData()
})*/

describe('/bookmarks', () => {
    describe('POST /', () => {
        it('should create a new bookmark and return 201', async () => {
            const response = await request(app)
                .post('/bookmarks')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'url': 'https://example.com/',
                    'dashboard': dashboard._id,
                    'category': category._id
                });

            expect(response.status).toBe(201);

        });

        it('should fail on invalid data and return 400', async () => {
            const response = await request(app)
                .post('/bookmarks')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(400);
        });
    })

    describe('GET /:id', () => {
        it('should return a bookmark', async () => {
            const savedBookmark = await request(app)
                .post('/bookmarks')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'url': 'https://example.com/',
                    'dashboard': dashboard._id,
                    'category': category._id
                });

            const response = await request(app)
                .get('/bookmarks/' + savedBookmark.body._id)
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(200);
        });

        it('should return 404 if bookmark does not exists', async () => {
            const response = await request(app)
                .get('/bookmarks/' + '606613e4703d23255070c87c')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(404);
        });
    })

    describe('GET /search/:text', () => {
        it('should return bookmarks accordingly search term', async () => {
            await request(app)
                .post('/bookmarks')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'url': 'https://example.com/',
                    'dashboard': dashboard._id,
                    'category': category._id
                });

            await request(app)
                .post('/bookmarks')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'url': 'https://example.com/',
                    'dashboard': dashboard._id,
                    'category': category._id
                });


            const response = await request(app)
                .get('/bookmarks/search/' + 'Example')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should return empty array if search does not have any results', async () => {
            const response = await request(app)
                .get('/bookmarks/search/' + 'adsfgdgasdfgdagsdfadsfadgadffdsfsfsd')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(0);
        });

    })

    describe('DELETE /:id', () => {
        it('should delete bookmark', async () => {
            const response = await request(app)
                .delete('/bookmarks/' + '606613e4703d23255070c87e')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(204);
        });

        it('should return 400 on corrupted object id', async () => {
            const response = await request(app)
                .delete('/bookmarks/' + 'corrupted')
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(400);
        });
    })

    describe('PUT /:id', () => {
        it('should update bookmark', async () => {
            const savedBookmark = await request(app)
                .post('/bookmarks')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'url': 'https://example.com/',
                    'dashboard': dashboard._id,
                    'category': category._id
                });

            const response = await request(app)
                .put('/bookmarks/' + savedBookmark.body._id)
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'url': 'https://example.com/',
                    'dashboard': dashboard._id,
                    'category': category._id,
                    'title': 'updated title'
                });

            expect(response.body.title).toBe('updated title');
        });

        it('should return 400 on invalid data', async () => {
            const savedBookmark = await request(app)
                .post('/bookmarks')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    'url': 'https://example.com/',
                    'dashboard': '604e55bb2c528d0fb0efeaad',
                    'category': '604e3a111bb32c0013e56df7'
                });

            const response = await request(app)
                .put('/bookmarks/' + savedBookmark.body._id)
                .set('Authorization', 'Bearer ' + token);

            expect(response.status).toBe(400);
        });
    })
});