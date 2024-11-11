import multer from 'multer';
import path from 'path';

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('public/images/'));  // Use path.resolve for the destination path
    },
    filename: function (req, file, cb) {
      let fileName = file.originalname || 'default_filename';  // used if originalname is not present
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // 1E9=1*10exp=9 (billion)
        cb(null, fileName + '-' + uniqueSuffix + path.extname(fileName));
    }
  });

  const allowedFileTypes = ['image', 'video', 'audio'];
  const fileFilter = function (req, file, cb) {
    if (allowedFileTypes.some(type => file.mimetype.startsWith(type + '/'))) {
        cb(null, true);  // Allow the file to be uploaded
    } else {
        cb(null, false);  // reject file uploading
    }
  };

  const upload = multer({
      storage: storage,
      limits: { fileSize: 100 * 1024 * 1024 }, // 100MB file size limit
      fileFilter: fileFilter
  });

export default upload;
