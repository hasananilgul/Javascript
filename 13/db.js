const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://hasananilgul:Hasananil1234@nodeblog.epx7ynt.mongodb.net/nodeblog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB Atlas ile bağlantı kuruldu');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB Atlas bağlantı hatası:', err);
});


module.exports = mongoose;
