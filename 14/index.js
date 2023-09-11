const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;

const mongoose = require('./db'); // Veritabanı bağlantısı
const User = require('./models/user'); // Kullanıcı modeli
const Book = require('./models/books'); // Kitaplar modeli
const Admin = require('./models/admin');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/kayit', (req, res) => {
  res.render('kayit');
});

router.get('/example', (req, res) => {
  res.send('Example Route');
});

// Kayıt ol endpoint'i
app.post('/kayit', async (req, res) => {
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

app.get('/giris', (req, res) => {
  res.render('giris');
});

app.post('/giris', async (req, res) => {
  const { username, password } = req.body;

  // Veritabanından kullanıcıyı arayın (örneğin, MongoDB)
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
});

// Kullanıcıyı Silme endpoint'i
app.delete('/sil/:id', async (req, res) => {
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
app.put('/updateusername/:id', async (req, res) => {
  try {
    const userId = req.query.id.trim();
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



app.listen(port, () => {
  console.log(`Sunucu ${port} numarasında çalışıyor`);
});
