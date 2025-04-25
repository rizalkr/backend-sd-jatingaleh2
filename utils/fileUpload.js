const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create storage folders if they don't exist
const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Configure storage for different entity types
const getStorage = (entityType) => {
  const folderPath = path.join('public/uploads', entityType);
  createFolder(folderPath);
  
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
  });
};

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported. Only JPEG, JPG, PNG, and WEBP files are allowed'), false);
  }
};

// Create multer instances for different entities
const teacherUpload = multer({
  storage: getStorage('teachers'),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const studentUpload = multer({
  storage: getStorage('students'),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

const newsUpload = multer({
  storage: getStorage('news'),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Helper function to remove old image file
const removeOldImage = (filePath) => {
  if (!filePath) return;
  
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath) && !fullPath.includes('default')) {
    fs.unlink(fullPath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });
  }
};

module.exports = {
  teacherUpload,
  studentUpload,
  newsUpload,
  removeOldImage
};