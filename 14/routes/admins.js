const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

router.post('/admins', async (req, res) => {
    try {
      const admin = new Admin(req.body);
      await admin.save();
      res.status(201).json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Tüm adminleri getir
  router.get('/admins', async (req, res) => {
    try {
      const admins = await Admin.find();
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Belirli bir admini getir
  router.get('/admins/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Bir admini güncelle
  router.patch('/admins/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Bir admini sil
  router.delete('/admins/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const admin = await Admin.findByIdAndDelete(id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.json({ message: 'Admin deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;