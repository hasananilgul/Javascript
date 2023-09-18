const mongoose = require('mongoose');

const whishListSchema = new mongoose.Schema({
    userId: 
    [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    bookId: 
    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    createdAt: Date,
    deletedAt: Date
  
});

const WhishList = mongoose.model('WhishList', whishListSchema);
module.exports = WhishList;

