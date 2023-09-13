const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Book = require('../models/books');


// Kitap ödünç alma rotası
router.post('/borrow-book', async (req, res) => {
    try {
      const { bookId, userId } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
      }
  
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Kitap bulunamadı.' });
      }
  
      // Kullanıcının borrowedBooks alanını kontrol etmeden önce tanımlı olduğunu doğrulama
      if (!user.borrowedBooks) {
        user.borrowedBooks = [];
      }
  
      if (book.holdingUserId) {
        return res.status(400).json({ error: 'Kitap zaten ödünç alınmış.' });
      }
  
      if (user.borrowedBooks.length >= 3) {
        return res.status(400).json({ error: 'Maksimum 3 kitap ödünç alabilirsiniz.' });
      }
  
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7); // Ödünç alma süresi 7 gün
  
      book.holdingUserId = user._id;
      book.dueDate = dueDate;
      await book.save();
  
      user.borrowedBooks.push(book._id);
      await user.save();
  
      res.json({ message: 'Kitap ödünç alındı.', book });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  module.exports = router;