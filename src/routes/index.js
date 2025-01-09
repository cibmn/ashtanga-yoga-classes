const express = require('express');
const router = express.Router();

// Ruta para la página de inicio
router.get('/', (req, res) => {
  res.render('home', { title: 'Ashtanga Yoga' });
});

// Ruta para el login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login - Ashtanga Yoga' });
});

module.exports = router;
