const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    unique: true },
  password: String,
  email: { 
    type: String,
    unique: true },
  gender: String,
  phone: { 
    type: String,
    unique: true },
  role: { 
    type: String, 
    default: 'USER' },
  deletedAt: Date,
  deletedBy: String
}, { collection: 'users' });

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.dogrupassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;