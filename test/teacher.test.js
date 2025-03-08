const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/db');
const Teacher = require('../models/Teacher');
const User = require('../models/User');

let token;
let teacherId;

beforeAll(async () => {
  // Sinkronisasi database dan buat user penguji
  await sequelize.sync({ force: true });
  await User.create({
    username: 'teacheruser',
    email: 'teacheruser@example.com',
    password: 'teacherpassword'
  });

  // Dapatkan token
  const authRes = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'teacheruser',
      password: 'teacherpassword'
    });
  token = authRes.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Teacher Endpoints', () => {
  it('POST /api/teachers - membuat teacher baru', async () => {
    const res = await request(app)
      .post('/api/teachers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Guru 1',
        email: 'guru1@example.com',
        subject: 'Matematika'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    teacherId = res.body.id;
  });

  it('GET /api/teachers - mendapatkan semua teacher', async () => {
    const res = await request(app)
      .get('/api/teachers')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/teachers/:id - mendapatkan teacher berdasarkan ID', async () => {
    const res = await request(app)
      .get(`/api/teachers/${teacherId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', teacherId);
  });

  it('PUT /api/teachers/:id - update teacher', async () => {
    const res = await request(app)
      .put(`/api/teachers/${teacherId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Guru Updated',
        email: 'guruupdated@example.com',
        subject: 'Fisika'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Guru Updated');
  });

  it('DELETE /api/teachers/:id - menghapus teacher', async () => {
    const res = await request(app)
      .delete(`/api/teachers/${teacherId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});