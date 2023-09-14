require('dotenv').config(); // .env dosyasını yüklemek için
const mongoose = require('mongoose');

// MongoDB Atlas bağlantı URI'sini .env dosyasından alın veya doğrudan tanımlayın
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Atlas ile bağlantı kuruldu');
  })
  .catch((error) => {
    console.error('MongoDB Atlas bağlantı hatası:', error);
  });
module.exports = mongoose;