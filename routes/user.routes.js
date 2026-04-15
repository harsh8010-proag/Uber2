const express= require('express');
const router= express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const createUpload = require('../middleware/upload.middleware');
const reviewController = require('../controllers/review.controller')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min:3 }).withMessage('First name must be at least 3 character long'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 long'),
],
   userController.registerUser
);

router.post('/login',[
   body('email').isEmail().withMessage('Invalid Email'),
   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 character')
],     
 userController.loginUser     
);

router.post('/review',authMiddleware.authUser,reviewController.addReview)
router.get('/profile',authMiddleware.authUser,userController.getUserProfile);
router.put('/profile-edit',authMiddleware.authUser,createUpload('user').single('profileImage'),userController.updateUserProfile)
router.get('/logout', authMiddleware.authUser, userController.logoutUser);



module.exports=router;