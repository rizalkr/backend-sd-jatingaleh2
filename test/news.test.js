const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/db');
const News = require('../models/News');
const User = require('../models/User');

let token;

beforeAll(async () => {
  // Sinkronisasi database dan buat user untuk mendapatkan token
  await sequelize.sync({ force: true });
  await User.create({
    username: 'newsuser',
    email: 'newsuser@example.com',
    password: 'newspassword'
  });

  // Dapatkan token melalui endpoint login
  const authRes = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'newsuser',
      password: 'newspassword'
    });
  token = authRes.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('News Endpoints', () => {
  let newsId;

  it('POST /api/news - membuat berita baru', async () => {
    const res = await request(app)
      .post('/api/news')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Judul Berita',
        content: 'Isi berita yang menarik'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    newsId = res.body.id;
  });

  it('GET /api/news - mendapatkan semua berita', async () => {
    const res = await request(app)
      .get('/api/news')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/news/:id - mendapatkan satu berita berdasarkan ID', async () => {
    const res = await request(app)
      .get(`/api/news/${newsId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', newsId);
  });

  it('PUT /api/news/:id - mengupdate berita', async () => {
    const res = await request(app)
      .put(`/api/news/${newsId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Judul Berita Updated',
        content: 'Isi berita yang telah diupdate'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title','Judul Berita Updated');
  });

  it('DELETE /api/news/:id - menghapus berita', async () => {
    const res = await request(app)
      .delete(`/api/news/${newsId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});