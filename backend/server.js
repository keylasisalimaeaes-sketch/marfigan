require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: { trustServerCertificate: true }
};

app.post('/api/contacto', async (req, res) => {
  try {
    if (!req.body.nombre || !req.body.email || !req.body.mensaje) {
      return res.status(400).json({ error: 'Campos requeridos incompletos' });
    }
    
    await sql.connect(dbConfig);
    const request = new sql.Request();
    
    await request.query(`
      INSERT INTO MensajesContacto (Nombre, Email, Asunto, Mensaje)
      VALUES (@nombre, @email, @asunto, @mensaje)
    `, {
      '@nombre': req.body.nombre,
      '@email': req.body.email,
      '@asunto': req.body.asunto || null,
      '@mensaje': req.body.mensaje
    });
    
    res.status(200).json({ mensaje: '¡Mensaje recibido!' });
  } catch (err) {
    console.error('Error BD:', err);
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  } finally {
    sql.close();
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT || 3001}`);
});
