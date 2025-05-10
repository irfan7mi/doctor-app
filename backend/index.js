const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'https://doctor-app-client-hazel.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));


const db = mysql.createConnection({
  host: 'yamanote.proxy.rlwy.net',
  port: 41033,
  user: 'root',
  password: 'iHSAmKHblMoDtNomKuJoIJLKLGDjTTGx',
  database: 'railway'
});

db.connect(err => {
  if (err) console.error('Connection error:', err);
  else console.log('MySQL connected');
});

app.post('/api/add-doctor', (req, res) => {
  const { id, name, specialty, experience, rating, city } = req.body;

  const checkSql = "SELECT * FROM doctors WHERE id = ?";
  db.query(checkSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      return res.status(409).json({ message: 'Doctor details already exist', success: false });
    }

    const insertSql = 'INSERT INTO doctors (id, name, specialty, experience, rating, city) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertSql, [id, name, specialty, experience, rating, city], (err) => {
      if (err) return res.status(500).json({ error: err.message, success: false });
      res.status(201).json({ message: 'Doctor added successfully', success: true });
    });
  });
});

app.get('/api/list-doctor-with-filter', (req, res) => {
  const { specialty, city, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  let sql = 'SELECT * FROM doctors WHERE 1=1';
  const params = [];

  if (specialty) {
    sql += ' AND specialty = ?';
    params.push(specialty);
  }
  if (city) {
    sql += ' AND city = ?';
    params.push(city);
  }

  sql += ' LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ page: Number(page), doctors: results });
  });
});

const PORT = 41033;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));