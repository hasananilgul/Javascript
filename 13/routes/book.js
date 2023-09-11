const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Tüm kitapları listeleme
router.get('/', async (req, res) => {
  // Tüm kitapları listeleme işlemi burada
});

// Kitap ödünç alma işlemi
router.post('/borrow', async (req, res) => {
  // Kitap ödünç alma işlemi burada
});

// Diğer kitap işlemleri (iade, ekleme, silme) burada tanımlanmalıdır.

module.exports = router;
