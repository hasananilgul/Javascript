const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const app = express();

app.set("view engine", "ejs");
const User = require("../models/user");

// const userSchema = new mongoose.Schema({
//   username: String,
//   gender: String,
//   email: String,
//   phone: String,
//   password: String,
// });

// userSchema.pre('save', async function (next) {
//   const user = this;

//   if (!user.isModified('password')) return next();

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(user.password, salt);
//   user.password = hash;
//   next();
// });

// userSchema.methods.correctPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// Kullanıcı kaydı
router.post("/register", async (req, res) => {
  try {
    const { username, gender, email, phone, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(409).send("Bu kullanıcı adı zaten kullanılıyor.");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      gender: gender,
      email: email,
      phone: phone,
      password: hash,
    });

    const savedUser = await newUser.save();
    console.log("Kullanıcı kaydedildi:", savedUser);
    res.status(200).send("Kayıt başarılı.");
  } catch (err) {
    console.error("Kayıt hatası:", err);
    res.status(500).send("Kayıt sırasında bir hata oluştu.");
  }
});

// user login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.query;
    console.log("username", username);
    const foundUser = await User.findOne({ username: username });

    if (foundUser) {
      const passwordMatches = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (passwordMatches) {
        res.send("Giriş başarılı.");
      } else {
        res.status(401).send("Hatalı şifre.");
      }
    } else {
      res.status(401).send("Kullanıcı bulunamadı.");
    }
  } catch (err) {
    console.error("Giriş hatası:", err);
    res.status(500).send("Giriş sırasında bir hata oluştu.");
  }
});

module.exports = router;
