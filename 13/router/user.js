const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Kullanıcı modelini doğru şekilde dahil edin
const Book = require('../models/books');
const WishList = require('../models/wishList');

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
  const { title } = req.body; // Kullanıcıdan gelen kitap adı
  try {
    const books = await Book.find({ title });
    res.json(books);
  } catch (err) {
    console.error('Kitap arama hatası:', err);
    res.status(500).json({ error: 'Kitap aranırken bir hata oluştu.' });
  }
});

router.post('/wishlist', async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    // Kullanıcıyı bulun
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    // Kullanıcının istek listesini kontrol edin
    if (!user.wishList) {
      user.wishList = []; // Eğer istek listesi yoksa boş bir dizi oluşturun
    }

    // Eğer kitap zaten istek listesinde ise tekrar eklemeyin
    if (user.wishList.includes(bookId)) {
      return res.status(400).json({ error: 'Kitap zaten istek listesinde.' });
    }

    // Kitabı istek listesine ekleyin
    user.wishList.push(bookId);
    await user.save();

    return res.send('Kitap istek listesine başarıyla eklendi.');
  } catch (err) {
    console.error('İstek listesine kitap ekleme hatası:', err);
    return res.status(500).json({ error: 'İstek listesine kitap eklenirken bir hata oluştu.' });
  }
});


// Kitabı istek listesinden sil
router.delete('/wishlist/', async (req, res) => {
  try {
    const { userId } = req.body;
    const { bookId } = req.params; // Silinmek istenen kitabın kimliği

    // Kullanıcının istek listesini bul
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    // Kitabı istek listesinden sil
    const index = user.wishList.indexOf(bookId);
    if (index > -1) {
      user.wishList.splice(index, 1);
      await user.save();
      return res.send('Kitap istek listesinden başarıyla silindi.');
    } else {
      return res.status(404).json({ error: 'Kitap istek listesinde bulunamadı.' });
    }
  } catch (err) {
    console.error('İstek listesinden kitap silme hatası:', err);
    return res.status(500).json({ error: 'İstek listesinden kitap silinirken bir hata oluştu.' });
  }
});
// Kullanıcının istek listesindeki kitaplarını listelemek için
router.get('/wishlist/', async (req, res) => {
  try {
    const { userId } = req.body; // Kullanıcının kimliği

    // Kullanıcının varlığını kontrol et
    const user = await User.findById(userId);
    if (!user) {
      console.log(userId)
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    // Kullanıcının istek listesini bul
    const wishList = user.wishList;

    if (wishList.length === 0) {
      return res.json("İstek listesi boş.");
    } else {
      // Kullanıcının istek listesindeki kitapları ayrı ayrı çekip ve kitap bilgileri ile birlikte listeleyin
      const populatedWishList = await Promise.all(
        wishList.map(async (item) => {
          const book = await Book.findById(item);
          return book;
        })
      );

      return res.json(populatedWishList);
    }
  } catch (err) {
    // Hata mesajını döndür
    console.error('İstek listesi görüntüleme hatası:', err);
    return res.status(500).json({ error: 'İstek listesi görüntülenirken bir hata oluştu.' });
  }
});

// Tarihe göre sıralanmış istek listesini görüntüleme
router.get('/wishlist/sorted-by-date/', async (req, res) => {
  try {
    const { userId } = req.body; // Kullanıcının kimliği

    // Kullanıcının varlığını kontrol et
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    // Kullanıcının istek listesini tarihe göre sırala
    const wishList = user.wishList.sort((a, b) => b.createdAt - a.createdAt);

    if (wishList.length === 0) {
      return res.json("İstek listesi boş.");
    } else {
      // Kullanıcının istek listesindeki kitapları ayrı ayrı çekin
      const populatedWishList = [];
      for (const item of wishList) {
        const book = await Book.findById(item);
        populatedWishList.push(book);
      }
      return res.json(populatedWishList);
    }
  } catch (err) {
    // Hata mesajını döndür
    console.error('Tarihe göre sıralanmış istek listesi görüntüleme hatası:', err);
    return res.status(500).json({ error: 'Tarihe göre sıralanmış istek listesi görüntülenirken bir hata oluştu.' });
  }
});






module.exports = router;
