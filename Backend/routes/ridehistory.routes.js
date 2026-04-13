const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const ridehistoryController = require('../controllers/ridehistory.controller')



router.get('/user-history',authMiddleware.authUser,ridehistoryController.getUserRideHistory);
router.get('/captain-history',authMiddleware.authCaptain,ridehistoryController.getCaptainRideHistory);

module.exports = router;