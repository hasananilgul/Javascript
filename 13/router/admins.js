const express = require('express');
const router = express.Router();
const Book = require('../models/books'); // Kütüphane modelini dahil edin
const User = require('../models/user'); // Kullanıcı modelini dahil edin
const bcrypt = require('bcrypt');

// Tüm kitapları getir
router.get('/gettall', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error('Kitaplar getirme hatası:', err);
    res.status(500).json({ error: 'Kitaplar getirilirken bir hata oluştu.' });
  }
});

// Yeni bir kitap oluşturun
router.post('/books', async (req, res) => {
  const { title, writtenBy, inside, holderTime, createdAt } = req.body;

  try {
    const book = await Book.create({
      title,
      writtenBy,
      inside,
      holderTime,
      createdAt
    });
    res.json(book);
  } catch (err) {
    console.error('Kitap oluşturma hatası:', err);
    res.status(500).json({ error: 'Kitap oluşturulurken bir hata oluştu.' });
  }
});

// Kitap güncelleme
router.put('/books/:id', async (req, res) => {
  const { title, writtenBy, inside, holderTime, createdAt } = req.body;
  const bookId = req.params.id;

  try {
    const book = await Book.findByIdAndUpdate(bookId, {
      title,
      writtenBy,
      inside,
      holderTime,
      createdAt
    });
    res.json(book);
  } catch (err) {
    console.error('Kitap güncelleme hatası:', err);
    res.status(500).json({ error: 'Kitap güncellenirken bir hata oluştu.' });
  }
});

// Kitap silme
router.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByIdAndDelete(bookId);
    res.json(book);
  } catch (err) {
    console.error('Kitap silme hatası:', err);
    res.status(500).json({ error: 'Kitap silinirken bir hata oluştu.' });
  }
});

// Tüm kullanıcıları getir
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Kullanıcılar getirme hatası:', err);
    res.status(500).json({ error: 'Kullanıcılar getirilirken bir hata oluştu.' });
  }
});

// Yeni bir kullanıcı oluşturun
router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      gender,
      email,
      phone,
      password,
    });
    res.json(user);
  } catch (err) {
    console.error('Kullanıcı oluşturma hatası:', err);
    res.status(500).json({ error: 'Kullanıcı oluşturulurken bir hata oluştu.' });
  }
});

// Kullanıcı güncelleme
router.put('/users/:id', async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      username,
      gender,
      email,
      phone,
      password,
    });
    res.json(user);
  } catch (err) {
    console.error('Kullanıcı güncelleme hatası:', err);
    res.status(500).json({ error: 'Kullanıcı güncellenirken bir hata oluştu.' });
  }
});

// Kullanıcı silme
router.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.json(user);
  } catch (err) {
    console.error('Kullanıcı silme hatası:', err);
    res.status(500).json({ error: 'Kullanıcı silinirken bir hata oluştu.' });
  }
});

module.exports = router;
