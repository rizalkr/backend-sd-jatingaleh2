const Aduan  = require('../models/Complaint');
const { Op } = require('sequelize');
const sequelize = require('../config/db');

const complaintController = {
  // Membuat aduan baru
  createComplaint: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { namaPengadu, pesanAduan } = req.body;
      
      if (!namaPengadu || !pesanAduan) {
        return res.status(400).json({ 
          success: false, 
          message: 'Nama pengadu dan pesan aduan harus diisi' 
        });
      }
      
      const newComplaint = await Aduan.create({
        namaPengadu,
        pesanAduan,
        status: 'antrian'
      }, { transaction });
      
      await transaction.commit();
      
      return res.status(201).json({
        success: true,
        message: 'Aduan berhasil dikirim',
        data: newComplaint
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating complaint:', error);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat membuat aduan',
        error: error.message
      });
    }
  },

  // Mendapatkan semua aduan
  getAllComplaints: async (req, res) => {
    try {
      const { status, search } = req.query;
      
      // Buat objek where untuk filter
      const whereClause = {};
      
      // Filter berdasarkan status jika disediakan
      if (status) {
        whereClause.status = status;
      }
      
      // Filter berdasarkan kata kunci jika disediakan
      if (search) {
        whereClause[Op.or] = [
          { namaPengadu: { [Op.like]: `%${search}%` } },
          { pesanAduan: { [Op.like]: `%${search}%` } }
        ];
      }
      
      const complaints = await Aduan.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'namaPengadu', 'pesanAduan', 'status', 'createdAt', 'updatedAt']
      });
      
      return res.status(200).json({
        success: true,
        count: complaints.length,
        data: complaints
      });
    } catch (error) {
      console.error('Error fetching complaints:', error);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil data aduan',
        error: error.message
      });
    }
  },

  // Mendapatkan detail aduan berdasarkan ID
  getComplaintById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const complaint = await Aduan.findByPk(id, {
        attributes: ['id', 'namaPengadu', 'pesanAduan', 'status', 'createdAt', 'updatedAt']
      });
      
      if (!complaint) {
        return res.status(404).json({
          success: false,
          message: 'Aduan tidak ditemukan'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: complaint
      });
    } catch (error) {
      console.error('Error fetching complaint:', error);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil detail aduan',
        error: error.message
      });
    }
  },

  // Mengupdate status aduan
  updateComplaintStatus: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!['antrian', 'dibaca', 'terselesaikan'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Status tidak valid. Status harus antrian, dibaca, atau terselesaikan'
        });
      }
      
      // Gunakan update dengan where clause
      const [updatedRowCount, updatedRows] = await Aduan.update(
        { status },
        { 
          where: { id },
          returning: true,
          transaction
        }
      );
      
      if (updatedRowCount === 0) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          message: 'Aduan tidak ditemukan'
        });
      }
      
      // Ambil data terbaru setelah update
      const updatedComplaint = await Aduan.findByPk(id, { transaction });
      
      await transaction.commit();
      
      return res.status(200).json({
        success: true,
        message: 'Status aduan berhasil diperbarui',
        data: updatedComplaint
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Error updating complaint:', error);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengupdate status aduan',
        error: error.message
      });
    }
  },

  // Menghapus aduan
  deleteComplaint: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      
      const deletedRowCount = await Aduan.destroy({
        where: { id },
        transaction
      });
      
      if (deletedRowCount === 0) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          message: 'Aduan tidak ditemukan'
        });
      }
      
      await transaction.commit();
      
      return res.status(200).json({
        success: true,
        message: 'Aduan berhasil dihapus'
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Error deleting complaint:', error);
      return res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat menghapus aduan',
        error: error.message
      });
    }
  }
};

module.exports = complaintController;