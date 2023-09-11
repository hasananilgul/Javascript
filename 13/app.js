const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;
const secretKey = "q!dB4*w119@";
const mongoose = require("./models/db"); // Veritabanı bağlantısı
app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/register', (req, res) => {
  res.render('register'); 
});
app.get('/login', (req, res) => {
  res.render('login'); 
});


// JWT Authentication Middleware
// const authenticateJWT = require("./middlewares/authenticate");
// app.use(authenticateJWT);

// User Routes
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

// Book Routes
const bookRoutes = require("./routes/book");
app.use("/book", bookRoutes);

// Admin Routes
const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

app.get('/kitap-kayit', (req, res) => {
  res.render('kayit');
});



app.listen(port, () => {
  console.log(`Sunucu ${port} numarasında çalışıyor`);
});
