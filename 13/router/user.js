const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Kullanıcı modelini doğru şekilde dahil edin
const Book = require('../models/books')
// Kayıt ol endpoint'i
router.post('/kayit', async (req, res) => {
  const { username, gender, email, phone, password } = req.body;

  // Yeni bir kullanıcı oluştur
  const newUser = new User({
    username,
    gender,
    email,
    phone,
    password,
  });

  try {
    // Kullanıcıyı veritabanına kaydet
    const savedUser = await newUser.save();
    console.log('Kullanıcı kaydedildi:', savedUser);
    // Başarılı bir yanıt gönder
    res.send('Kayıt başarılı.');
  } catch (err) {
    // Hata durumunda hata mesajını yakalayın
    console.error('Kayıt hatası:', err);
    // Hata yanıtı gönder
    res.status(500).send('Kayıt sırasında bir hata oluştu.');
  }
});
router.get('/giris', (req, res) => {
  res.render('giris');
});

// Giriş endpoint'i
router.post('/giris', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Veritabanından kullanıcıyı arayın
    const user = await User.findOne({ username });

    if (user) {
      // Kullanıcıyı bulduysanız, şifreyi karşılaştırın
      const passwordMatched = await bcrypt.compare(password, user.password);

      if (passwordMatched) {
        // Giriş başarılı
        const token = jwt.sign({ username }, 'secretKey');
        res.send('Giriş başarılı. Token: ' + token);
      } else {
        // Şifre uyuşmuyor
        res.status(401).send('Hatalı şifre.');
      }
    } else {
      // Kullanıcı bulunamadı
      res.status(401).send('Kullanıcı bulunamadı.');
    }
  } catch (err) {
    console.error('Giriş hatası:', err);
    res.status(500).send('Giriş işlemi sırasında bir hata oluştu.');
  }
});


// Kullanıcıyı Silme endpoint'i
router.delete('/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id.trim(); // Gelen id'den gereksiz karakterleri kaldır
    const deletedUser = await User.findByIdAndRemove(userId);
    if (deletedUser) {
      res.send('Kullanıcı başarıyla silindi.');
    } else {
      res.status(404).send('Kullanıcı bulunamadı.');
    }
  } catch (err) {
    console.error('Kullanıcı silme hatası:', err);
    res.status(500).send('Kullanıcı silinirken bir hata oluştu.');
  }
});

// Kullanıcı Adını Güncelleme
router.put('/update-username/:id', async (req, res) => {
  try {
    const userId = req.params.id.trim();
    const newUsername = req.body.newUsername;
    const updatedUser = await User.findByIdAndUpdate(userId, { username: newUsername }, { new: true });

    if (updatedUser) {
      res.send('Kullanıcı adı başarıyla güncellendi.');
    } else {
      res.status(404).send('Kullanıcı bulunamadı.');
    }
  } catch (err) {
    console.error('Kullanıcı adı güncelleme hatası:', err);
    res.status(500).send('Kullanıcı adı güncellenirken bir hata oluştu.');
  }
});

// Kitap ismine göre arama yap 
router.get('/search-books', async (req, res) => {
  const { title } = req.query; // Kullanıcıdan gelen kitap adı
    try {
      const { title } = req.query;
      const books = await Book.find({ title });
  
      res.json(books);
    } catch (err) {
      console.error('Kitap arama hatası:', err);
      res.status(500).json({ error: 'Kitap aranırken bir hata oluştu.' });
    }
  });

module.exports = router;