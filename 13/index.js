// Express, app ve router nesnelerini içeri aktarır
const express = require('express');
const app = express();
const router = express.Router();

// Şifreleme ve kimlik doğrulama için gerekli modülleri içeri aktarır
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Uygulamanın çalıştırılacağı port numarasını belirler
const port = process.env.PORT || 3000;

// API rotalarının başına ekleyeceğimiz ön ek
const API_PREFIX = "/api/usersBookTask/";

// Veritabanı bağlantısını oluşturur
const mongoose = require('./db');

// Kullanıcı, Kitap ve Admin modellerini içeri aktarır
const User = require('./models/user'); // Kullanıcı modeli
const Book = require('./models/books'); // Kitaplar modeli
const Admin = require('./models/admin'); // Admin modeli

// Kullanıcı rotalarını içeren router dosyasını içeri aktarır
const userRouter = require('./router/user'); // user.js dosyasını dahil edin
//const booksRouter = require('./router/books'); // books.js dosyasını dahil edin
const adminsRouter = require('./router/admins'); // admins.js dosyasını dahil edin
// Express uygulamasının şablon motorunu EJS olarak ayarlar
app.set('view engine', 'ejs');

// URL kodlamasını kullanarak gelen verileri işler
app.use(express.urlencoded({ extended: true }));

// JSON verilerini işler
app.use(express.json());

// Ana rotayı kullanır ("/" yolunu ana rotanız olarak kullanır)
app.use("/", router);

// API rotaları için "/api/usersBookTask/user" altında userRouter'ı kullanır
app.use(`${API_PREFIX}user`, userRouter);
//? API rotaları için "/api/usersBookTask/books" altında userRouter'ı kullanır
//? app.use(`${API_PREFIX}books`, booksRouter);
// API rotaları için "/api/usersBookTask/admin" altında userRouter'ı kullanır
app.use(`${API_PREFIX}admin`, adminsRouter);
// Uygulamayı belirtilen portta dinlemeye başlar ve konsola çalıştığını bildirir
app.listen(port, () => {
  console.log(`Sunucu ${port} numarasında çalışıyor`);
});
