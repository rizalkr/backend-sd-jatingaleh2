const express = require('express');
const complaintController = require('../controllers/complaintController');

const router = express.Router();

// GET: Mendapatkan semua aduan
// Dapat menerima query params: status, search
router.get('/', complaintController.getAllComplaints);

// GET: Mendapatkan detail aduan berdasarkan ID
router.get('/:id', complaintController.getComplaintById);

// POST: Membuat aduan baru
router.post('/', complaintController.createComplaint);

// PUT: Memperbarui status aduan
router.put('/:id', complaintController.updateComplaintStatus);

// DELETE: Menghapus aduan
router.delete('/:id', complaintController.deleteComplaint);

// Endpoint  untuk filter complaint berdasarkan status
router.get('/filter/status/:status', complaintController.filterComplaintByStatus);

module.exports = router;