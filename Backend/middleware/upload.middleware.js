const multer = require('multer');
const path = require('path');
const fs = require("fs");
const crypto = require('crypto');

const createUpload = (folder) =>{

    const uploadPath = path.join(__dirname, "..", `uploads/${folder}`);

      if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, uploadPath);
    },

    filename: (req,file,cb) =>{
        const uniqueName = crypto.randomBytes(12).toString('hex');
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

function checkFileType(file,cb){

    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    } else{
        cb(new Error('Only images are allowed'));
    }
}

return  multer({
      storage,
      limits:{fileSize:5000000} ,//5mb limit
      fileFilter: function (req, file, cb){
        checkFileType(file,cb);
      }
});

};

module.exports = createUpload;