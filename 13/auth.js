const express = require('express');
const User = require('./models/user');
const admin=require('./models/admin');
const Admin = require('./models/admin');
const app = express();

// Kullanıcı kimlik doğrulaması
app.post('/api/usersBookTask/user/giris', async (req, res) => {
  // Kullanıcı verilerini al
  const { username, password } = req.body;

  // Kullanıcıyı veritabanından bul
  const user = await User.findOne({ username });

  // Kullanıcıyı doğrula
  if (!user || user.password !== password) {
    res.status(401).send({ message: 'Yetkisiz' });
    return;
  }

  // JWT oluştur
  const token = createJwt(user._id, user.username);

  // JWT'yi kullanıcıya gönder
  res.status(200).send({ token });
});

app.post('/api/usersBookTask/admin/adminsGiris', async (req, res) => {
  // Kullanıcı verilerini al
  const { email, password } = req.body;

  // Kullanıcıyı veritabanından bul
  const admin = await Admin.findOne({ email });

  // Kullanıcıyı doğrula
  if (!admin || admin.password !== password) {
    res.status(401).send({ message: 'Yetkisiz' });
    return;
  }

  // JWT oluştur
  const token = createJwt(admin._id, admin.email);

  // JWT'yi kullanıcıya gönder
  res.status(200).send({ token });
});
const port = process.env.PORT || 3000;
