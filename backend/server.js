import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Inisialisasi express
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Daftar origin yang diizinkan untuk CORS
const allowedOrigins = [
  'http://localhost:3000', 
  'http://localhost:8080', 
  'http://localhost/StevanusFirman/',
  'http://localhost',
  'http://localhost:80',
  'http://20.92.167.203/StevanusFirman/',
  'http://20.92.167.203',
  'http://20.92.167.203:3000',
  'http://20.92.167.203:80'
];

// Middleware CORS
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, origin); // Izinkan
    } else {
      callback(new Error('Not allowed by CORS')); // Tolak
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}));

// Inisialisasi database
const connection = new sqlite3.Database('./db/aplikasi.db');

// Endpoint untuk mendapatkan user berdasarkan ID
app.get('/api/user/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ?`;
  connection.all(query, [req.params.id], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).send('Internal Server Error');
    }
    res.json(results);
  });
});

// Endpoint untuk mengubah email pengguna
app.post('/api/user/:id/change-email', (req, res) => {
  const newEmail = req.body.email;
  const userId = req.params.id;

  // Hindari mencatat informasi sensitif
  console.log(`User ID: ${userId} is trying to change their email.`);

  const query = `UPDATE users SET email = ? WHERE id = ?`;
  connection.run(query, [newEmail, userId], function (err) {
    if (err) throw err;
    if (this.changes === 0) res.status(404).send('User not found');
    else res.status(200).send('Email updated successfully');
  });
});

// Daftar file yang diizinkan (Contoh saja)
const allowedFiles = ['file1.txt', 'file2.txt', 'file3.txt'];

// Endpoint untuk mengakses file dengan validasi
app.get('/api/file', (req, res) => {
  const __filename = fileURLToPath(import.meta.url); 
  const __dirname = path.dirname(__filename); 

  // Validasi nama file
  const requestedFile = req.query.name;

  // Periksa apakah file yang diminta ada dalam whitelist
  if (!allowedFiles.includes(requestedFile)) {
    return res.status(403).send('Access denied: Invalid file requested.');
  }

  const filePath = path.join(__dirname, 'files', requestedFile);

  // Kirim file
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(err.status).end();
    }
  });
});

// Menjalankan server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
