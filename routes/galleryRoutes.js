const express = require('express');
const galleryController = require('../controllers/GalerryController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Create gallery upload folder if it doesn't exist
const galleryFolder = path.join('public/image/gallery');
if (!fs.existsSync(galleryFolder)) {
  fs.mkdirSync(galleryFolder, { recursive: true });
}

// Configure storage for gallery images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, galleryFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported. Only JPEG, JPG, PNG, and WEBP files are allowed'), false);
  }
};

// Create multer instance for gallery uploads
const galleryUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Define routes and connect them to your existing controller functions
router.get('/', galleryController.getAllGalerry);
router.get('/:id', galleryController.getGalerryById);
router.post('/', galleryUpload.single('foto'), galleryController.createGalerry);
router.put('/:id', galleryUpload.single('foto'), galleryController.updateGalerry);
router.delete('/:id', galleryController.deleteGalerry);

module.exports = router;