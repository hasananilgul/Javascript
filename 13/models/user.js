const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
username: { type: String, 
unique: true, 
required: true },
password: { type: String, 
required: true },
email: { type: String, 
unique: true, 
required: true },
gender: String,
phone: { type: String, 
unique: true },
role: { type: String, 
default: 'USER' },
deletedAt: Date,
deletedBy: String,
});

module.exports = mongoose.model('User', userSchema);
