import multer from 'multer';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      let fileName = file.originalname || 'default_filename';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, fileName + '-' + uniqueSuffix + path.extname(fileName));
    },
  }),
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true); // Accept the file
    } else {
      cb(null, false); // Reject the file
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024, // Limit the file size to 100MB
  },
});

export default upload;
