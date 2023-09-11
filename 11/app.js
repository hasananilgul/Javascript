const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;

const mongoose = require('./models/db'); // Veritabanı bağlantısı
const User = require('./models/user'); // Kullanıcı modeli
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/kayit', (req, res) => {
  res.render('kayit'); // EJS kullanıyorsanız, bu sayfanın render edilmesi gerekiyor.
});

// Kayıt ol endpoint'i
app.post('/kayit', async (req, res) => {
  const kullaniciAdi = req.body.kullaniciAdi;
  const sifre = req.body.sifre;

  // Yeni bir kullanıcı oluştur
  const yeniKullanici = new User({
    kullaniciAdi: kullaniciAdi,
    sifre: sifre,
  });

  try {
    // Kullanıcıyı veritabanına kaydet
    const kaydedilenKullanici = await yeniKullanici.save();
    console.log('Kullanıcı kaydedildi:', kaydedilenKullanici);
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
  res.render('giris'); // EJS kullanıyorsanız, bu sayfanın render edilmesi gerekiyor.
});

app.post('/giris', async (req, res) => {
  const kullaniciAdi = req.body.kullaniciAdi;
  const girisSifresi = req.body.sifre;

  // Veritabanından kullanıcıyı arayın (örneğin, MongoDB)
  const kullanici = await User.findOne({ kullaniciAdi: kullaniciAdi });

  if (kullanici) {
    // Kullanıcıyı bulduysanız, şifreyi karşılaştırın
    const sifreEslesiyor = await bcrypt.compare(girisSifresi, kullanici.sifre);

    if (sifreEslesiyor) {
      // Giriş başarılı
      res.send('Giriş başarılı.');
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
app.put('/updateusername', async (req, res) => {
  try {
    const userId = req.query.id.trim(); 
    const newUsername = req.body.newUsername; 
    const updatedUser = await User.findByIdAndUpdate(userId, { kullaniciAdi: newUsername }, { new: true });

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
