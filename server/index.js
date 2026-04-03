const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middlewares =====
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// ===== APIs =====
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// API routes
app.use('/api/admin', require('./api/admin.js'));
app.use('/api/customer', require('./api/customer.js'));

// ===== STATIC FILES (React build) =====

// Admin site
app.use('/admin', express.static(path.resolve(__dirname, '../client-admin/build')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-admin/build', 'index.html'));
});

// Customer site
app.use('/', express.static(path.resolve(__dirname, '../client-customer/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-customer/build', 'index.html'));
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});