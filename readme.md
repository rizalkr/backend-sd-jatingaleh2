# Dokumentasi API SD Jatingaleh 2

## Daftar Isi
- [Pengenalan](#pengenalan)
- [Autentikasi](#autentikasi)
- [Admin](#admin)
- [Guru (Teacher)](#guru-teacher)
- [Siswa (Student)](#siswa-student)
- [Berita (News)](#berita-news)
- [Aduan (Complaint)](#aduan-complaint)
- [Galeri (Gallery)](#galeri-gallery)

---

## Pengenalan

API ini digunakan untuk mengelola data pada aplikasi web profile SD Jatingaleh 2. API ini dibangun menggunakan Node.js, Express, Sequelize, dan PostgreSQL. Semua endpoint yang memerlukan autentikasi menggunakan token JWT.

**URL Dasar API**: `http://localhost:3000/api`

---

## Autentikasi

### Login

**Endpoint**: `POST /auth/login`

**Deskripsi**: Endpoint untuk melakukan login admin dan mendapatkan token JWT.

**Request Body**:
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response Sukses**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response Gagal**:
- 404 Not Found: Admin tidak ditemukan
- 401 Unauthorized: Password salah

---

## Admin

**Base URL**: `/admin`

### Mendapatkan Semua Admin
**Endpoint**: `GET /admin`

**Response Sukses**:
```json
[
  {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "createdAt": "2025-05-01T07:00:00.000Z",
    "updatedAt": "2025-05-01T07:00:00.000Z"
  }
]
```

### Membuat Admin Baru
**Endpoint**: `POST /admin`

**Request Body**:
```json
{
  "username": "newadmin",
  "email": "newadmin@example.com",
  "password": "password123"
}
```

**Response Sukses**:
```json
{
  "id": 2,
  "username": "newadmin",
  "email": "newadmin@example.com",
  "createdAt": "2025-05-01T07:00:00.000Z",
  "updatedAt": "2025-05-01T07:00:00.000Z"
}
```

---

## Guru (Teacher)

**Base URL**: `/teachers`

### Mendapatkan Semua Guru
**Endpoint**: `GET /teachers`

**Response Sukses**:
```json
[
  {
    "id": 1,
    "name": "Supriyadi, S.Pd.",
    "username": "supriyadi",
    "email": "supriyadi@jatingaleh2.sch.id",
    "subject": "Matematika",
    "nuptk": "1234567890",
    "image": "public/uploads/teachers/image-1234567890.jpg",
    "createdAt": "2025-05-01T07:00:00.000Z",
    "updatedAt": "2025-05-01T07:00:00.000Z"
  }
]
```

### Membuat Guru Baru
**Endpoint**: `POST /teachers`

**Request Format**: `multipart/form-data`

**Request Form Fields**:
- `name`: Nama guru (wajib)
- `username`: Username guru (wajib)
- `email`: Email guru (wajib)
- `subject`: Mata pelajaran yang diampu
- `nuptk`: Nomor Unik Pendidik dan Tenaga Kependidikan
- `image`: File gambar guru (opsional)

**Response Sukses**:
```json
{
  "id": 2,
  "name": "Guru Baru",
  "username": "guru_baru",
  "email": "guru_baru@example.com",
  "subject": "IPA",
  "nuptk": "9876543210",
  "image": "public/uploads/teachers/image-9876543210.jpg",
  "createdAt": "2025-05-01T07:00:00.000Z",
  "updatedAt": "2025-05-01T07:00:00.000Z"
}
```

---

## Siswa (Student)

**Base URL**: `/students`

### Mendapatkan Semua Siswa
**Endpoint**: `GET /students`

**Response Sukses**:
```json
[
  {
    "id": 1,
    "name": "Budi Santoso",
    "age": 7,
    "class": "1",
    "spesifiClass": "A",
    "image": "public/uploads/students/image-1234567890.jpg",
    "nisn": "1234567890",
    "parent": "Ahmad Santoso",
    "address": "Jl. Jatingaleh No. 10, Semarang",
    "createdAt": "2025-05-01T07:00:00.000Z",
    "updatedAt": "2025-05-01T07:00:00.000Z"
  }
]
```

### Membuat Siswa Baru
**Endpoint**: `POST /students`

**Request Format**: `multipart/form-data`

**Request Form Fields**:
- `name`: Nama siswa (wajib)
- `age`: Usia siswa (wajib)
- `class`: Kelas siswa (wajib, nilai 1-6)
- `spesifiClass`: Sub-kelas (opsional, misal A/B/C)
- `nisn`: Nomor Induk Siswa Nasional (opsional)
- `parent`: Nama orang tua/wali (opsional)
- `address`: Alamat siswa (opsional)
- `image`: File gambar siswa (opsional)

**Response Sukses**:
```json
{
  "id": 3,
  "name": "Siswa Baru",
  "age": 8,
  "class": "2",
  "spesifiClass": "A",
  "image": "public/uploads/students/image-9876543210.jpg",
  "nisn": "9876543210",
  "parent": "Orang Tua Siswa",
  "address": "Jl. Contoh No. 123",
  "createdAt": "2025-05-01T07:00:00.000Z",
  "updatedAt": "2025-05-01T07:00:00.000Z"
}
```

---

## Berita (News)

**Base URL**: `/news`

### Mendapatkan Semua Berita
**Endpoint**: `GET /news`

**Response Sukses**:
```json
[
  {
    "id": 1,
    "title": "Upacara Bendera Memperingati Hari Kemerdekaan",
    "author": "Admin SD Jatingaleh 2",
    "content": "SD Jatingaleh 2 mengadakan upacara bendera khusus untuk memperingati hari Kemerdekaan Republik Indonesia...",
    "image": "public/uploads/news/image-1234567890.jpg",
    "kategori": "Kegiatan",
    "createdAt": "2025-05-01T07:00:00.000Z",
    "updatedAt": "2025-05-01T07:00:00.000Z"
  }
]
```

### Membuat Berita Baru
**Endpoint**: `POST /news`

**Request Format**: `multipart/form-data`

**Request Form Fields**:
- `title`: Judul berita (wajib)
- `content`: Isi berita (wajib)
- `author`: Penulis berita (opsional)
- `kategori`: Kategori berita (opsional, nilai default: "Pengumuman")
- `image`: File gambar berita (opsional)

**Response Sukses**:
```json
{
  "id": 2,
  "title": "Berita Baru",
  "author": "Admin",
  "content": "Isi berita baru...",
  "image": "public/uploads/news/image-9876543210.jpg",
  "kategori": "Artikel",
  "createdAt": "2025-05-01T07:00:00.000Z",
  "updatedAt": "2025-05-01T07:00:00.000Z"
}
```

---

## Aduan (Complaint)

**Base URL**: `/complaints`

### Membuat Aduan Baru
**Endpoint**: `POST /complaints`

**Request Body**:
```json
{
  "namaPengadu": "Pengadu Baru",
  "pesanAduan": "Isi aduan baru..."
}
```

**Response Sukses**:
```json
{
  "success": true,
  "message": "Aduan berhasil dikirim",
  "data": {
    "id": 2,
    "namaPengadu": "Pengadu Baru",
    "pesanAduan": "Isi aduan baru...",
    "status": "antrian",
    "createdAt": "2025-05-01T07:00:00.000Z",
    "updatedAt": "2025-05-01T07:00:00.000Z"
  }
}
```

---

## Galeri (Gallery)

**Base URL**: `/gallery`

### Membuat Item Galeri Baru
**Endpoint**: `POST /gallery`

**Request Format**: `multipart/form-data`

**Request Form Fields**:
- `nama`: Nama/judul item galeri (wajib)
- `foto`: File gambar (wajib)

**Response Sukses**:
```json
{
  "id": 2,
  "nama": "Galeri Baru",
  "foto": "public/image/gallery/foto-9876543210.jpg",
  "createdAt": "2025-05-01T07:00:00.000Z",
  "updatedAt": "2025-05-01T07:00:00.000Z"
}
```