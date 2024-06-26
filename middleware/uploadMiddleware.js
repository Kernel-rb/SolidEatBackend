const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const originalFileName = path.basename(file.originalname, extension);
        cb(null, originalFileName + '-' + uuidv4() + extension); 
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
