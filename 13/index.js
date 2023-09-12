const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;
const API_PREFIX = "/api/usersBookTask/";
const mongoose = require('./db'); // Veritabanı bağlantısı
const User = require('./models/user'); // Kullanıcı modeli
const Book = require('./models/books'); // Kitaplar modeli
const Admin = require('./models/admin');
const userRouter = require('./router/user'); // user.js dosyasını dahil edin

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use(`${API_PREFIX}user`, userRouter); // userRouter'ı bu endpoint altında kullanın

app.listen(port, () => {
  console.log(`Sunucu ${port} numarasında çalışıyor`);
});
