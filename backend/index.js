import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
require('dotenv').config();

const addDoctor = require('./api/add-doctor');
const listDoctorWithFilter = require('./api/list-doctor-with-filter');

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'https://doctor-app-client-hazel.vercel.app', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

const db = mysql.createConnection({
  host: 'yamanote.proxy.rlwy.net',
  port: 41033,
  user: 'root',
  password: 'iHSAmKHblMoDtNomKuJoIJLKLGDjTTGx',
  database: 'railway'
});

db.connect(err => {
  if (err) console.error('DB Connection Error:', err);
  else console.log('MySQL connected');
});

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to Doctor Web API!' });
});

app.post('/api/add-doctor', addDoctor);
app.get('/api/list-doctor-with-filter', listDoctorWithFilter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));