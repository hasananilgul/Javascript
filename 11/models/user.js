const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  kullaniciAdi: { type: String, unique: true },
  sifre: String,
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('sifre')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.sifre, salt);
  user.sifre = hash;
  next();
});

userSchema.methods.dogruSifre = async function (sifre) {
  return await bcrypt.compare(sifre, this.sifre);
};

module.exports = mongoose.model('User', userSchema);
