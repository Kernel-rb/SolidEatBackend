const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Define storage for the uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/')); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, uuidv4() + extension); // Append the extension to the generated UUID
    }
});

// Initialize Multer with the defined storage
const upload = multer({ storage: storage });

module.exports = upload;
