import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'yamanote.proxy.rlwy.net',
  port: 41033,
  user: 'root',
  password: 'iHSAmKHblMoDtNomKuJoIJLKLGDjTTGx',
  database: 'railway'
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, name, specialty, experience, rating, city } = req.body;

    try {
      const [rows] = await db.execute('SELECT * FROM doctors WHERE id = ?', [id]);

      if (rows.length > 0) {
        return res.status(409).json({ message: 'Doctor already exists', success: false });
      }

      await db.execute(
        'INSERT INTO doctors (id, name, specialty, experience, rating, city) VALUES (?, ?, ?, ?, ?, ?)',
        [id, name, specialty, experience, rating, city]
      );

      res.status(201).json({ success: true, message: 'Doctor added successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
