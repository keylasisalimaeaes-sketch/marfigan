require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// 🔒 Middlewares de seguridad
app.use(helmet());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// 🌐 CORS configurado
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5500,http://127.0.0.1:5500').split(',');
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido'));
    }
  },
  credentials: true
}));

// 🛡️ Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Demasiados intentos. Espera 1 minuto.'
});
app.use('/api/contacto', limiter);

// 📊 Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 🔌 Configuración BD
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER.replace('\\\\', '\\'),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    connectionTimeout: 15000,
    requestTimeout: 30000
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// 🌐 Endpoint contacto
app.post('/api/contacto', async (req, res) => {
  try {
    const { nombre, email, asunto, mensaje } = req.body;
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: 'Campos requeridos incompletos' });
    }
    
    if (nombre.length > 100 || email.length > 150 || mensaje.length > 10000) {
      return res.status(400).json({ error: 'Algun campo excede el límite permitido' });
    }

    const ipCliente = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').substring(0, 45);
    const userAgent = (req.headers['user-agent'] || '').substring(0, 500);

    await sql.connect(dbConfig);
    const request = new sql.Request();
    
    request.input('nombre', sql.NVarChar(100), nombre.trim());
    request.input('email', sql.NVarChar(150), email.trim());
    request.input('asunto', sql.NVarChar(200), asunto ? asunto.trim() : null);
    request.input('mensaje', sql.NVarChar(sql.MAX), mensaje.trim());
    request.input('ipCliente', sql.VarChar(45), ipCliente);
    request.input('userAgent', sql.NVarChar(500), userAgent);

    await request.query(`
      INSERT INTO MensajesContacto (Nombre, Email, Asunto, Mensaje, IP_Cliente, UserAgent)
      VALUES (@nombre, @email, @asunto, @mensaje, @ipCliente, @userAgent)
    `);

    console.log(`✅ Mensaje guardado: ${email}`);
    res.status(201).json({ 
      success: true, 
      message: '¡Gracias por contactarnos! Hemos recibido tu mensaje.' 
    });

  } catch (err) {
    console.error('❌ Error:', err.message);
    
    if (err.code === 'ECONNREFUSED') {
      return res.status(503).json({ error: 'Base de datos no disponible' });
    }
    if (err.code === 'ELOGIN') {
      return res.status(500).json({ error: 'Error de autenticación con BD' });
    }
    
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    sql.close();
  }
});

//  Health check
app.get('/api/health', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(503).json({ status: 'error', database: 'disconnected', error: err.message });
  } finally {
    sql.close();
  }
});

//  Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(` Servidor backend iniciado`);
  console.log(` Puerto: ${PORT}`);
  console.log(`  BD: ${process.env.DB_SERVER}\\${process.env.DB_DATABASE}`);
  console.log(`========================================\n`);
});
