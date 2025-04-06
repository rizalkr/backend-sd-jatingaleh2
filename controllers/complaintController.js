const Complaint = require('../models/Complaint');
const { Op } = require('sequelize');
const sequelize = require('../config/db');

// GET: Ambil semua data aduan (dapat difilter berdasarkan status & pencarian)
const getAllComplaints = async (req, res) => {
  try {
    const { status, search } = req.query;
    const whereClause = {};

    if (status) {
      whereClause.status = status;
    }

    if (search) {
      whereClause[Op.or] = [
        { namaPengadu: { [Op.like]: `%${search}%` } },
        { pesanAduan: { [Op.like]: `%${search}%` } }
      ];
    }

    const complaints = await Complaint.findAll({
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
};

// GET: Ambil detail aduan berdasarkan ID
const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findByPk(id, {
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
};

// POST: Buat aduan baru
const createComplaint = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { namaPengadu, pesanAduan } = req.body;

    if (!namaPengadu || !pesanAduan) {
      return res.status(400).json({
        success: false,
        message: 'Nama pengadu dan pesan aduan harus diisi'
      });
    }

    const newComplaint = await Complaint.create({
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
};

// PUT: Update status aduan berdasarkan ID
const updateComplaintStatus = async (req, res) => {
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

    const [updatedRowCount] = await Complaint.update(
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

    const updatedComplaint = await Complaint.findByPk(id, { transaction });
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
};

// DELETE: Hapus aduan berdasarkan ID
const deleteComplaint = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const deletedRowCount = await Complaint.destroy({
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
};

// GET: Filter aduan berdasarkan status
// Contoh endpoint: GET /api/aduan/status/antrian
const filterComplaintByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        // Validasi status harus salah satu dari nilai yang diizinkan
        if (!['antrian', 'dibaca', 'terselesaikan'].includes(status)) {
            return res.status(400).json({ 
                success: false,
                message: 'Status tidak valid. Status harus antrian, dibaca, atau terselesaikan'
            });
        }
        
        const complaints = await Complaint.findAll({
            where: { status },
            order: [['createdAt', 'DESC']]
        });
        
        return res.status(200).json({
            success: true,
            count: complaints.length,
            data: complaints
        });
    } catch (error) {
        console.error('Error filtering complaint by status:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat memfilter aduan',
            error: error.message
        });
    }
};

module.exports = {
    createComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaintStatus,
    deleteComplaint,
    filterComplaintByStatus
};