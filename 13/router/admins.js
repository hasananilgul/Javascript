const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Book = require('../models/books'); // Kütüphane modelini dahil edin
const Admin = require('../models/admin'); // Admin modelini dahil edin
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Tüm kitapları getir
router.get('/gettall-book', async (req, res) => {
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
router.get('/gettall-user', async (req, res) => {
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
  const { username,gender,phone, email, password } = req.body;

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
router.get('/adminKayit', (req, res) => {
  res.render('adminKayit');
});
// Admin kayıt ol endpoint'i
router.post('/adminKayit', async (req, res) => {
  const { email, password } = req.body;

  // Yeni bir admin oluştur
  const admin = new Admin({
    email,
    password,
  });

  try {
    // Admini veritabanına kaydet
    const savedAdmin = await admin.save();
    console.log('Admin kaydedildi:', savedAdmin);
    // Başarılı bir yanıt gönder
    res.send('Admin kaydı başarılı.');
  } catch (err) {
    // Hata durumunda hata mesajını yakalayın
    console.error('Admin kaydı hatası:', err);
    // Hata yanıtı gönder
    res.status(500).send('Admin kaydı sırasında bir hata oluştu.');
  }
});

router.get('/adminGiris', (req, res) => {
  res.render('adminGiris');
});

// Admin giriş endpoint'i
router.post('/adminGiris', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Veritabanından admini arayın
    const admin = await Admin.findOne({ email });

    if (admin) {
      // Admini bulduysanız, şifreyi karşılaştırın
      const passwordMatched = await bcrypt.compare(password, admin.password);

      if (passwordMatched) {
        // Giriş başarılı 
        const token = jwt.sign({ email }, 'secretKey');
        res.send('Admin girişi başarılı. Token: ' + token);
      } else {
        // Şifre uyuşmuyor
        res.status(401).send('Hatalı şifre.');
      }
    } else {
      // Admin bulunamadı
      res.status(401).send('Admin bulunamadı.');
    }
  } catch (err) {
    console.error('Admin giriş hatası:', err);
    res.status(500).json({ error: 'Admin giriş işlemi sırasında bir hata oluştu.', details: err.message });

  }
});

// Tüm adminleri getir
router.get('/gettall-admin', async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (err) {
    console.error('Adminleri getirme hatası:', err);
    res.status(500).json({ error: 'Adminleri getirilirken bir hata oluştu.' });
  }
});

// Admin güncelleme
router.put('/admins/:id', async (req, res) => {
  const { email, password } = req.body;
  const adminId = req.params.id;

  try {
    const admin = await Admin.findByIdAndUpdate(adminId, {
      email,
      password
    });
    res.json(admin);
  } catch (err) {
    console.error('Admin güncelleme hatası:', err);
    res.status(500).json({ error: 'Admin güncellenirken bir hata oluştu.' });
  }
});

// Admin silme
router.delete('/admins/:id', async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await Admin.findByIdAndDelete(adminId);
    res.json(admin);
  } catch (err) {
    console.error('Admin silme hatası:', err);
    res.status(500).json({ error: 'Admin silinirken bir hata oluştu.' });
  }
});




module.exports = router;
