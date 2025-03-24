const express = require('express');
const path = require('path');
const serverless = require('serverless-http');

const app = express();

// Servir los archivos estáticos generados por React
app.use(express.static(path.join(__dirname, 'dist')));

// Cualquier ruta que no coincida se redirige al index.html (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports.handler = serverless(app);