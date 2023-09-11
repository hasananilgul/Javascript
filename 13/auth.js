const express = require('express');
const User = require('./models/user');

const app = express();

// Kullanıcı kimlik doğrulaması
app.post('/api/login', async (req, res) => {
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
const port = process.env.PORT || 3000;
