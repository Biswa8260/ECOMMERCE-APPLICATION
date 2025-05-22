import multer from 'multer';

const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

// Temporarily disable fileFilter to allow all fields for debugging
// const fileFilter = (req, file, callback) => {
//     const allowedFields = ['image1', 'image2', 'image3', 'image4'];
//     if (allowedFields.includes(file.fieldname)) {
//         callback(null, true);
//     } else {
//         callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
//     }
// };

const upload = multer({ storage /*, fileFilter */ });

export default upload;
