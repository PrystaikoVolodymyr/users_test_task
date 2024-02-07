const request = require('supertest');
const app = require('../src/app');

describe('User API Endpoints', () => {
    let userId;

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'Test User', email: 'test@example.com' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name', 'Test User');
        expect(res.body).toHaveProperty('email', 'test@example.com');
        console.log(res.body)
        userId = res.body.id;
    });

    it('should fetch all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(201);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should fetch a user by ID', async () => {
        const res = await request(app).get(`/users/${userId}`);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id', userId);
    });

    it('should update a user', async () => {
        const res = await request(app)
            .put(`/users/${userId}`)
            .send({ name: 'Updated Name' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id', userId);
        expect(res.body).toHaveProperty('name', 'Updated Name');
    });

    it('should delete a user', async () => {
        const res = await request(app).delete(`/users/${userId}`);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id', userId);
    });

    it('should handle invalid user ID for updating', async () => {
        const res = await request(app).put('/users/invalidID');
        expect(res.statusCode).toEqual(400);
    });

    it('should handle invalid user ID for deleting', async () => {
        const res = await request(app).delete('/users/invalidID');
        expect(res.statusCode).toEqual(400);
    });

});